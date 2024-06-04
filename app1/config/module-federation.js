const deps = require("../package.json").dependencies;
const { ModuleFederationPlugin } = require("@module-federation/enhanced");
const { UniversalFederationPlugin } = require('@module-federation/node');

module.exports = {
  client: new ModuleFederationPlugin({
    name: "app1",
    filename: "remoteEntry.js",
    exposes: {
      "./Test": "./src/client/components/Test",
    },
    shared: {
      react: {
        version: deps.react,
        singleton: true,
      },
      "react-dom": {
        version: deps['react-dom'],
        singleton: true,
      },
  },
  }),
  server: [
    new UniversalFederationPlugin({
      name: "app1",
      isServer: true,
      library: { type: "commonjs-module", name: "app2" },
      filename: "remoteEntry.js",
      useRuntimePlugin: true,
    }),
  ],
};
