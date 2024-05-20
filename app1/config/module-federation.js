const deps = require("../package.json").dependencies;
const { ModuleFederationPlugin } = require("@module-federation/enhanced");

module.exports = {
  client: new ModuleFederationPlugin({
    name: "app1",
    filename: "remoteEntry.js",
    remotes: {
      app2: "app2@http://localhost:3001/static/mf-manifest.json",
      app1: "app1@http://localhost:3000/static/remoteEntry.js",
      tripresultkit:
        "tripresultkit@http://localhost:7779/static/comp/client/mf-manifest.json",
    },
    runtimePlugins: [require.resolve("./runtimePlugin")],
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
      "@bwoty-web/ui-kit": {
        version: deps['@bwoty-web/ui-kit'],
        singleton: true,
      },
  },
  }),
  server: [
    new ModuleFederationPlugin({
      remoteType: "script",
      name: "app1",
      library: { type: "commonjs-module" },
      filename: "remoteEntry.js",
      remotes: {
        app2: "app2@http://localhost:3001/server/mf-manifest.json",
        tripresultkit:
          "tripresultkit@http://localhost:7779/static/comp/server/mf-manifest.json",
      },
      runtimePlugins: [
        require.resolve("@module-federation/node/runtimePlugin"),
        require.resolve("./runtimePlugin"),
      ],
      shared: {
        react: {
          //version: deps.react,
          singleton: true,
        },
        "react-dom": {
          //version: deps["react-dom"],
          singleton: true,
        },
        "@bwoty-web/ui-kit": {
          //version: deps["@bwoty-web/ui-kit"],
          singleton: true,
        },
      },
    }),
  ],
};
