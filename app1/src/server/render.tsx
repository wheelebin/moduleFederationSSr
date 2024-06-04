import { Router } from "express";
import React, { ReactElement, ReactNode } from "react";
import { Helmet } from "react-helmet";
import { renderToPipeableStream } from "react-dom/server";

import App from "../client/components/App";

import { getComponents } from "../shared/loader";
import { revalidate } from "@module-federation/node/utils";

const revalidateCheck = async (res) => {
  const shouldReload = await revalidate();
  console.log("[SHOULD RELOAD]: ", shouldReload);

  if (shouldReload) {
    global.clearRoutes();
  }

  return shouldReload;
};

const componentsToRender = [
  {
    moduleId: "app2/Content",
    props: {
      content: "Hello",
    },
  },
];

export default async (req, res, next) => {
  revalidateCheck(res);

  const helmet = Helmet.renderStatic();
  let didError = false;

  const items = await getComponents(componentsToRender, true);

  const stream = renderToPipeableStream(<App items={items} />, {
    onAllReady() {
      res.statusCode = didError ? 500 : 200;
      res.setHeader("Content-type", "text/html");
      res.write(`<!DOCTYPE html`);
      res.write(`<html ${helmet.htmlAttributes.toString()}>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
      </head>
      <body>`);
      res.write(`<div id="root">`);
      stream.pipe(res);
      res.write(`</div>`);
      res.write(
        `<script async data-chunk="main" src="http://localhost:3000/static/main.js"></script>`
      );
      res.write(
        `<script>window.__INITIAL_DATA__ = ${JSON.stringify({
          componentsToRender,
        })}</script>`
      );
      res.write(`</body></html>`);
    },
    onShellError() {
      res.statusCode = 500;
      res.send(`<h1>An error occurred</h1>`);
    },
    onError(err) {
      didError = true;
      console.error(err);
    },
  });
};
