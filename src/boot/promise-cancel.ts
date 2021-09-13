import { boot } from 'quasar/wrappers';
import { pendingRequest } from 'boot/axios';

export default boot(({ router }) => {
  router.beforeEach(() => {
    pendingRequest.forEach((value, key) => {
      value && value(key);
    });
    pendingRequest.clear();
  });
});
