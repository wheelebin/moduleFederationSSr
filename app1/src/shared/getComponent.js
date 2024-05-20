import React from "react";
import {
  init,
  loadRemote,
  registerRemotes,
  loadShare,
  getRemoteInfo,
  preloadRemote,
} from "@module-federation/enhanced/runtime";

import nodeRuntimePlugin from "@module-federation/node/runtimePlugin";

// SEE: https://module-federation.io/guide/basic/runtime.html

const remotesMap = {
  client: [
    {
      name: "app2",
      alias: "app2",
      entry: "http://localhost:3001/static/mf-manifest.json",
    },
    {
      name: "tripresultkit",
      alias: "tripresultkit",
      entry: "http://localhost:7779/static/comp/client/mf-manifest.json",
    },
  ],
  server: [
    {
      name: "app2",
      alias: "app2",
      entry: "http://localhost:3001/server/mf-manifest.json",
    },
    {
      name: "tripresultkit",
      alias: "tripresultkit",
      entry: "http://localhost:7779/static/comp/server/mf-manifest.json",
    },
  ],
};

export const initMF = async (isServer) => {
  const remotes = remotesMap[isServer ? "server" : "client"];
  console.log("initMF", remotes);
  init({
    name: "app1",
    remotes,
    shared: {
      react: {
        shareConfig: {
          singleton: true,
          requiredVersion: "^18.0.0",
        },
      },
      "react-dom": {
        shareConfig: {
          singleton: true,
          requiredVersion: "^18.0.0",
        },
      },
    },
  });
};

export const loadRemotes = async (isServer) => {
  const remotes = remotesMap[isServer ? "server" : "client"];
  console.log("loadRemotes", remotes);
  registerRemotes(remotes, {
    force: true,
  });

  await preloadRemote(remotes.map(({ name }) => ({ nameOrAlias: name })));

  const resp = await loadRemote("app2/Content");
  console.log("resp", resp);
};

export const reloadRemotes = async (components, isServer) => {
  const uniqueRemotes = components.reduce((acc, { app, entries }) => {
    acc[app] = entries;
    return acc;
  }, {});

  const remotes = Object.entries(uniqueRemotes).map(([app, entries]) => ({
    name: app,
    alias: app,
    entry: entries[isServer ? "server" : "client"],
  }));

  loadRemotes(isServer);
};

const getComponent = async ({ name }) => {
  const { default: Component } = await loadRemote(name);
  return Component;
};

const getComponents = async (components, isServer) => {
  const items = await Promise.all(
    components.map(async (item) => {
      const Component = await getComponent(item);
      return {
        name: item.name,
        component: Component,
        props: item.props,
      };
    })
  );

  return items;
};

export default getComponents;
