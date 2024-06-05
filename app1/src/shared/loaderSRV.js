import {
  loadRemote,
  registerRemotes,
  preloadRemote,
  init,
  loadShareSync,
} from "@module-federation/runtime";
import nodeRuntimePlugin from "@module-federation/node/runtimePlugin";

import * as react from "react";
import * as reactDom from "react-dom";

const runtimePlugin = function () {
  return {
    name: "app1-runtime-plugin",
    beforeInit(args) {
      console.log("beforeInit: ");
      return args;
    },
    init(args) {
      console.log("init: ");
      return args;
    },
    beforeRequest(args) {
      console.log("beforeRequest: ");
      const { id, options } = args;
      console.log(id, options);

      args.options.remotes.forEach((r) => {
        r.entry = `${r.entry}?v=${Date.now()}`;
      });

      console.log(id, options);

      return args;
    },
    afterResolve(args) {
      console.log("afterResolves: ");
      const {
        id,
        pkgNameOrAlias,
        expose,
        remote,
        options,
        remoteInfo,
        remoteSnapshot,
      } = args;
      console.log({
        id,
        pkgNameOrAlias,
        expose,
        remote,
        options,
        remoteInfo,
        remoteSnapshot,
      });
      return args;
    },
    onLoad(args) {
      console.log("onLoad: ");
      const {
        id,
        pkgNameOrAlias,
        expose,
        remote,
        options,
        exposeModule,
        exposeModuleFactory,
        moduleInstance,
      } = args;
      console.log({
        id,
        pkgNameOrAlias,
        expose,
        remote,
        options,
        exposeModule,
        exposeModuleFactory,
        moduleInstance,
      });
      return args;
    },
    handlePreloadModule(args) {
      console.log("handlePreloadModule: ");
      return args;
    },
    errorLoadRemote(args) {
      console.log("errorLoadRemote: ");
      console.log(args);
      return args;
    },
    beforeLoadShare(args) {
      console.log("beforeLoadShare: ");
      return args;
    },
    beforeLoadRemote(args) {
      console.log("beforeLoadRemote: ");
      return args;
    },
    createScript(args) {
      console.log("createScript: ");
      return args;
    },
  };
};

export const loadSharedDep = (name) => {
  return loadShareSync(name);
};

export const initialize = (remotes = []) => {
  const isServer = typeof window === "undefined";

  const plugins = [nodeRuntimePlugin()];
  if (isServer) {
    // plugins.push(runtimePlugin());
  }

  const instance = init({
    name: "app1",
    remotes,
    plugins,
    shared: {
      react: {
        version: "18",
        lib: () => react,
        shareConfig: {
          singleton: true,
        },
      },
      "react-dom": {
        version: "18",
        lib: () => reactDom,
        shareConfig: {
          singleton: true,
        },
      },
    },
  });
  //console.log("Initialized", instance);
};

const globalRemotesMap = {
  client: [
    {
      name: "app1",
      alias: "app1",
      entry: "http://localhost:3000/static/mf-manifest.json",
    },
    {
      name: "app2",
      alias: "app2",
      entry: "http://localhost:3001/static/mf-manifest.json",
    },
  ],
  server: [
    {
      name: "app2",
      alias: "app2",
      entry: "http://localhost:3001/server/mf-manifest.json",
    },
  ],
};

export const loadRemotes = async (isServer, wasRevalidated = false) => {
  const remotes = globalRemotesMap[isServer ? "server" : "client"];

  initialize(remotes);

  registerRemotes(remotes, {
    force: false, //isServer,
  });

  console.log("Finished loading remotes");
};

export const getModule = async (id) => {
  console.log("getModule: ", id);
  const { default: Component } = await loadRemote(id, {
    from: "runtime",
  });

  console.log("Module fetched");

  return Component;
};

export const getComponents = async (components = []) => {
  const isServer = typeof window === "undefined";

  await loadRemotes(isServer);

  const items = await Promise.all(
    components.map(async ({ moduleId, props }) => {
      const Component = await getModule(moduleId);
      return {
        moduleId,
        props,
        Component,
      };
    })
  );

  return items;
};
