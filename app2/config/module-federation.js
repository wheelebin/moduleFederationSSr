const deps = require("../package.json").dependencies;
const { ModuleFederationPlugin } = require("@module-federation/enhanced");
const { UniversalFederationPlugin } = require("@module-federation/node");

module.exports = {
  client: new ModuleFederationPlugin({
    name: "app2",
    filename: "remoteEntry.js",
    exposes: {
      "./Content": "./src/client/components/Content",
    },
    shared: {
      react: {
        version: deps.react,
        singleton: true,
      },
      "react-dom": {
        version: deps["react-dom"],
        singleton: true,
      },
    },
  }),
  server: [
    new UniversalFederationPlugin({
      name: "app2",
      library: { type: "commonjs-module" },
      isServer: true,
      filename: "remoteEntry.js",
      useRuntimePlugin: true,
      exposes: {
        "./Content": "./src/client/components/Content",
        "./userRoute": "./src/server/routes/user",
      },
      shared: {
        react: {
          version: deps.react,
          singleton: true,
        },
        "react-dom": {
          version: deps["react-dom"],
          singleton: true,
        },
      },
    }),
  ],
};
