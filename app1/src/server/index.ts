const express = require("express");

const app = express();
const PORT = 3000;

const init = (reset = false) => {
  if (reset) {
    console.log("CLEARING ALL KEYS");
    Object.keys(require.cache).forEach((k) => {
      delete require.cache[k];
    });
  }
  const initMiddleware = require("./middleware");
  initMiddleware(express, app);
};

global.clearRoutes = () => {
  // console.log('APP ROUTES STACK: ', app._router.stack);
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

module.exports = app;
