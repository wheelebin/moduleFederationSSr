const deps = require("../package.json").dependencies;
const { ModuleFederationPlugin } = require("@module-federation/enhanced");

module.exports = {
  client: new ModuleFederationPlugin({
    name: "app2",
    filename: "remoteEntry.js",
    exposes: {
      "./Content": "./src/client/components/Content",
    },
    remotes: {},

    shared: {
      react: {
        version: deps.react,
        singleton: true,
      },
      "react-dom": {
        version: deps["react-dom"],
        singleton: true,
      },
      "@bwoty-web/ui-kit": {
        version: deps["@bwoty-web/ui-kit"],
        singleton: true,
      },
    },
  }),
  server: [
    new ModuleFederationPlugin({
      name: "app2",
      library: { type: "commonjs-module", name: "app2" },
      remoteType: "script",
      filename: "remoteEntry.js",
      exposes: {
        "./Content": "./src/client/components/Content",
        "./userRoute": "./src/server/routes/user",
      },
      runtimePlugins: [
        require.resolve("@module-federation/node/runtimePlugin"),
      ],
      remotes: {},
      shared: {
        react: {
          version: deps.react,
          singleton: true,
        },
        "react-dom": {
          version: deps["react-dom"],
          singleton: true,
        },
        "@bwoty-web/ui-kit": {
          version: deps["@bwoty-web/ui-kit"],
          singleton: true,
        },
      },
    }),
  ],
};
