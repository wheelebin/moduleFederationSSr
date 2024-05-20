import React, { ReactElement, ReactNode } from "react";
import { Helmet } from "react-helmet";
import { renderToPipeableStream } from "react-dom/server";

import App from "../client/components/App";

import getComponents from "../shared/getComponent";

const componentsToRender = [
  {
    app: "app2",
    entries: {
      client: "http://localhost:3001/static/mf-manifest.json",
      server: "http://localhost:3001/server/mf-manifest.json",
    },
    name: "app2/Content",
    props: {
      content: "Hello",
    },
  },
  {
    app: "tripresultkit",
    entries: {
      client: "http://localhost:7779/static/comp/client/mf-manifest.json",
      server: "http://localhost:7779/static/comp/server/mf-manifest.json",
    },
    name: "tripresultkit/HotelCard",
    props: {
      guestRating: 0,
      imageTags: [],
      description: "HOLLA",
      bullets: ["WiFi: Ja", "Restaurang: Ja", "Bar: Ja"],
      ksps: ["Gym", "Spa"],
      image: "/dp1/lodging/1000000/20000/17800/17762/72603f9a_z.jpg",
      price: 23690,
      pricePerPerson: 11845,
      rating: 10,
      subtitle: "Bologna",
      name: "Grand Hotel Majestic",
      tripadvisorRating: 4.5,
      buttonText: "TREK",
      numberOfAdults: 2,
      numberOfChildren: 0,
      url: "/italien/bologna/grand-hotel-majestic-gia-baglioni?QueryDepID=26178&QueryResID=25021&HotelId=166532&ItemId=166532&QueryDepDate=20240811&QueryAges=42,42&QueryRoomAges=42,42&QueryUnits=1&QueryRetDate=20240818&QueryChkInDate=20240811&QueryChkOutDate=20240818&QueryDur=-1&QueryType=IndependentPackage&&qf=flowDynamic",
      includedText: "Flyg och hotell, 2 natter, 2 vuxna",
      departureText: "Avresa 11 augusti 2024 fran Stockholm Arlanda",
      _classifications: {
        mainKey: "classifications",
        queryKey: "filterCl",
        data: [
          {
            uniqueID: "SPA_MASSAGE",
            shortID: "SPMA0C",
            name: "Spa",
            parents: ["WELLNESS"],
          },
        ],
      },
      originalPrice: null,
    },
  },
];

export default async (req, res, next) => {
  console.log("[RENDERING]");
  const helmet = Helmet.renderStatic();
  let didError = false;

  const items = await getComponents(componentsToRender, true);

  // Give list of remote components to App on the server, use them to SSR
  // Give list of remote component names to init data, use them and fetch the remote components on the clients bootstrap
  //  - We then take those remote components and pass them to the App component on the client

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
