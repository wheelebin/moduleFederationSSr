const express = require('express');
const initMiddleware = require('./middleware');

const app = express();
const PORT = 3000;

global.clearRoutes = () => {
  // console.log('APP ROUTES STACK: ', app._router.stack);
  app._router.stack = app._router.stack.filter(
    (k) => !(k && k.route && k.route.path)
  );
};

const done = () => {
  return app.listen(PORT, () => {
    console.info(
      `[${new Date().toISOString()}]`,
      `Shell App is running: 🌎 http://localhost:${PORT}`
    );
  });
};

initMiddleware(express, app, done);

module.exports = app;

