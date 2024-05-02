import React from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./components/App";

import getComponent from "../shared/getComponent";

const render = async (App) => {
  const root = document.getElementById("root");
  const { componentsToRender } = window.__INITIAL_DATA__;

  const items = await Promise.all(
    componentsToRender.map(async (item) => getComponent(item))
  );

  console.log("items", items);

  // Testing to get a component from within this app (app1)
  // Will be needed for hydration of dynamic stuffs
  const Test = await getComponent({ name: "app1/Test" });

  console.log("Test", Test);

  ReactDOMClient.hydrateRoot(root, <App items={items} />);
};

render(App);

/*

- We will still need to send "serialized" stuff between servers and also server and client
- This is because we need the component names and the props
- But we can replace the in-house module loading with module federation
  - So replace the homegrown getModule stuff for server usage and hopefully importmaps for client usage as well

- Other than this, everything else should be the same as it is today



// New day new thoughts
- In this repo there's an example of loading a remote express router...
- This makes me think that we could also just load a remote method (resultList*)
  - We give it props like, classifications, geo, hotelProducts and etc
  - The component can then take care of data fetching and run as usual and return an array of card components


*/
