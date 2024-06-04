import express from "express";
import path from "path";

const app = express();
const PORT = 3000;



let httpServer;

const done = () => {
  return app.listen(PORT, () => {
    console.info(
      `[${new Date().toISOString()}]`,
      `Shell App is running: 🌎 http://localhost:${PORT}`
    );
  });
};

const initMiddleware = async (express, app) => {
  // static path where files such as images and js will be served from
  app.use("/static", express.static(path.join(process.cwd(), "dist/client")));

  // =================== WARNING ===================
  // ATTENTION this will expose ALL server files
  // =================== WARNING ===================
  app.use("/server", express.static(path.join(process.cwd(), "dist/server")));

  const initAsyncBoundryRoutes = async () => {
    // Routes that utalisize module federation need to be imported async
    const renderThunk = (await import("./server-entry")).default;
    const serverRender = renderThunk();
    app.get("/", serverRender);
  };

  await initAsyncBoundryRoutes();
};

const start = async () => {
  if (httpServer) {
    httpServer.close(async () => {
      console.info("Server closed");
      await initMiddleware(express, app)
      done();
    });
  } else {
    await initMiddleware(express, app);
    httpServer = done();
  }
}

start();

global.clearRoutes = () => {
  // console.log('APP ROUTES STACK: ', app._router.stack);
  app._router.stack = app._router.stack.filter(
    (k) => !(k && k.route && k.route.path)
  );

  initMiddleware(express, app)
  //start();
};

export default app;
