import { boot } from 'quasar/wrappers';
import { sync } from 'vuex-router-sync';

export default boot(({ router, store }) => {
  // something to do
  const unsync = sync(store, router);
});
