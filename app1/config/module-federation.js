const deps = require("../package.json").dependencies;
const { ModuleFederationPlugin } = require("@module-federation/enhanced");
const { UniversalFederationPlugin } = require("@module-federation/node");

module.exports = {
  client: new ModuleFederationPlugin({
    name: "app1",
    filename: "remoteEntry.js",
    remotes: {
      app2: "app2@http://localhost:3001/static/remoteEntry.js",
      app1: "app1@http://localhost:3000/static/remoteEntry.js",
    },
    exposes: {
      "./Test": "./src/client/components/Test",
    },
    shared: [{ react: deps.react, "react-dom": deps["react-dom"] }],
  }),
  server: [
    new UniversalFederationPlugin({
      remoteType: "script",
      isServer: true,
      name: "app1",
      library: { type: "commonjs-module" },
      filename: "remoteEntry.js",
      remotes: {
        app2: "app2@http://localhost:3001/server/remoteEntry.js",
      },
      shared: [{ react: deps.react, "react-dom": deps["react-dom"] }],
      // runtimePlugins: [require.resolve('./pick-remote.js')],
      useRuntimePlugin: true,
    }),
  ],
};
