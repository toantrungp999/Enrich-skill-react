/* eslint-disable no-alert */
/* eslint-disable no-undef */
import { Workbox } from 'workbox-window';

export default function registerServiceWorker() {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }
  // Check if the serviceWorker Object exists in the navigator object ( means if browser supports SW )
  if ('serviceWorker' in navigator) {
    const wb = new Workbox('serviceWorker.js');

    wb.addEventListener('installed', event => {
      /**
       * We have the condition - event.isUpdate because we don't want to show
       * this message on the very first service worker installation,
       * only on the updated
       */
      if (event.isUpdate) {
        if (confirm('New app update is available!. Click OK to refresh')) {
          window.location.reload();
        }
      }
    });

    wb.register();
  }
}
