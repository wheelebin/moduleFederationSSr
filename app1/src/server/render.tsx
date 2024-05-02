import React, { ReactElement, ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import { renderToPipeableStream } from 'react-dom/server';

import App from '../client/components/App';

import getComponent from '../shared/getComponent';

const componentsToRender = [
  {
    name: 'app2/Content',
    props: {
      content: 'Hello',
    },
  },
];

export default async (req, res, next) => {
  const helmet = Helmet.renderStatic();
  let didError = false;

  const items = await Promise.all(componentsToRender.map(async item => getComponent(item)));

  console.log('items', items);

  // Give list of remote components to App on the server, use them to SSR
  // Give list of remote component names to init data, use them and fetch the remote components on the clients bootstrap
  //  - We then take those remote components and pass them to the App component on the client

  const stream = renderToPipeableStream(<App items={items} />, {
    onAllReady() {
      res.statusCode = didError ? 500 : 200;
      res.setHeader('Content-type', 'text/html');
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
        `<script async data-chunk="main" src="http://localhost:3000/static/main.js"></script>`,
      );
      res.write(
        `<script>window.__INITIAL_DATA__ = ${JSON.stringify({ componentsToRender })}</script>`,
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
