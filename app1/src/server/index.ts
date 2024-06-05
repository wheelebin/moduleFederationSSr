import express from "express";
import initMiddleware from "./middleware";

const app = express();
const PORT = 3000;

const init = (reset = false) => {
  if (reset) {
    /*
    Got the idea from here: https://github.com/module-federation/core/issues/1475#issuecomment-1744054474
    Then I looked at: https://github.com/vercel/next.js/blob/ff366ed08d8ea32657a45e71db33b8c70a3a0dfb/packages/next/src/build/webpack/plugins/nextjs-require-cache-hot-reloader.ts#L29

    This could be useful info about clearing req cache: 
      * https://github.com/nodejs/help/issues/2751
      * https://ar.al/2021/02/22/cache-busting-in-node.js-dynamic-esm-imports/

    TODO: Figure out a proper way to do this, I don't want to clear everything, just the files that I need to reload
    */
    console.log("CLEARING ALL KEYS");
    Object.keys(require.cache).forEach((k) => {
      delete require.cache[k];
    });
  }

  initMiddleware(express, app);
};

global.clearRoutes = () => {
  app._router.stack = app._router.stack.filter(
    (k) => !(k && k.route && k.route.path)
  );

  init(true);
};

let httpServer = null;
const done = () => {
  if (httpServer) {
    httpServer.close(() => {
      console.log("Server closed!");
      httpServer = app.listen(PORT, () => {
        console.info(
          `[${new Date().toISOString()}]`,
          `Shell App is running: 🌎 http://localhost:${PORT}`
        );
      });
    });
    return;
  }
  httpServer = app.listen(PORT, () => {
    console.info(
      `[${new Date().toISOString()}]`,
      `Shell App is running: 🌎 http://localhost:${PORT}`
    );
  });
};

init();
done();
