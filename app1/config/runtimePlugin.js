/**
 * Remote Router Runtime Plugin for Module Federation
 * -------------------------------------------------
 * This plugin extends the capabilities of the module federation runtime by customizing the behavior of the application at runtime.
 *
 * Functionality:
 * 1. The plugin provides several hooks to customize the behavior of the application at runtime.
 * 2. It handles the loading of remote microfrontends and provides a way to handle errors that may occur during this process.
 *
 * How it Works:
 * - The 'errorLoadRemote' method is called when there's an error loading a remote microfrontend. It logs the error and returns a module that displays an error message.
 * - The 'init' method is called when the plugin is initialized. It simply returns the arguments it was called with.
 * - The 'beforeRequest' method is called before a request is made to load a remote microfrontend. It modifies the entry property of the remotes to point to the correct URLs.
 *
 * Usage:
 * - The plugin is a crucial part of the host application as it handles the loading of remote microfrontends.
 *
 * Notes:
 * - This plugin provides a flexible way to control the loading of remote microfrontends, optimizing the loading process and handling errors efficiently.
 */
export default function () {
    return {
      name: "remote-router",
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
        //console.log(args.origin.remoteHandler);
  
        const { options, id } = args;
        console.log("beforeRequest: ", id);
        const remoteName = id.split("/").shift();
        console.log("remoteName: ", remoteName);
        const remote = options.remotes.find(
          (remote) => remote.name === remoteName
        );
        console.log("remote: ", remote);
        if (remote.entry.includes("?t=")) {
          return args;
        }
  
        remote.entry = `${remote.entry}?t=${Date.now()}`;
        return args;
      },
      afterResolve(args) {
        console.log("afterResolves: ");
        return args;
      },
      onLoad(args) {
        console.log("onLoad: ");
        return args;
      },
      handlePreloadModule(args) {
        console.log("handlePreloadModule: ");
        return args;
      },
      errorLoadRemote(args) {
        console.log("errorLoadRemote: ");
        return args;
      },
      beforeLoadShare(args) {
        console.log("beforeLoadShare: ");
        return args;
      },
      /* resolveShare(args) {
        console.log("resolveShare: ");
      }, */
      beforeLoadRemote(args) {
        console.log("beforeLoadRemote: ");
        return args;
      },
      /* generatePreloadAssets(args) {
        console.log("generatePreloadAssets: ");
        return args;
      }, */
      createScript(args) {
        console.log("createScript: ");
        return args;
      },
    };
  }