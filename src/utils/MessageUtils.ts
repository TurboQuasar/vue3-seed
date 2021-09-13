import { Notify } from 'quasar';
export const NotifyUtil = {
  warning: (message) => {
    Notify.create({
      message,
      icon: 'warning',
      color: 'warning',
      position: 'top',
      timeout: 1500,
    });
  },
};
