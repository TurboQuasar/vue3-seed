// import something here

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
import { makeServer } from 'mock/index';

export default (/* { app, router, ... } */) => {
  // something to do
  if (process.env.DEV) {
    makeServer();
  }
};
