import { boot } from 'quasar/wrappers';
import { axios } from 'boot/axios';
import { Notify } from 'quasar';
import { mdiCached } from '@quasar/extras/mdi-v5';
import { config } from 'boot/config';

export default boot(({ router }) => {
  router.beforeEach(() => {
    axios
      .get(
        `${config.$PUBLIC_PATH}json/${
          config.$DOT_ENV
        }.json?timestamp=${+new Date()}`
      )
      .then((_) => {
        if (
          _.data.version !==
          require(`../../public/json/${config.$DOT_ENV}.json`).version
        ) {
          Notify.create({
            color: 'brand',
            icon: mdiCached,
            message: '版本更新，请刷新页面',
            timeout: 0,
            multiLine: true,
            position: 'top',
            actions: [
              {
                label: '刷新',
                color: 'yellow',
                handler: () => {
                  window.location.reload();
                },
              },
            ],
          });
        }
      });
  });
});
