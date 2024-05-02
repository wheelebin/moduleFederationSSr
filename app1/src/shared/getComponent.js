import React from 'react';
import { init, loadRemote } from '@module-federation/enhanced/runtime';

// SEE: https://module-federation.io/guide/basic/runtime.html

/* 

This can be used to add new remotes during runtime if needed.

init({
  name: 'app1',
  remotes: [
    {
      name: 'app3',
      entry: 'http://localhost:3001/remoteEntry.js',
      alias: 'app2',
    },
  ],
}); */

const getComponent = async ({ name, props }) => {
  const { default: Component } = await loadRemote(name);
  return <Component {...props} />;
};

export default getComponent;
