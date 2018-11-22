import 'normalize.css/normalize.css';
import 'hamburgers/dist/hamburgers.min.css';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import moment from 'moment';
import timeago from 'timeago.js';
import { routerHistory, writeHistory } from 'vue-router-back-button';

Vue.config.productionTip = false;

Vue.filter('timeAgo', (value) => {
  const stillUtc = moment.unix(value).utc().toDate();
  return timeago().format(stillUtc);
});

Vue.filter('dateUTC', (value) => {
  return moment.unix(value).utc().format('HH:mm:ss DD.MM.YYYY') + ' UTC';
});

Vue.filter('backButtonText', (value) => {
  if (!value) { return value; }

  const arPath = value.split('/');

  if (arPath[1]) {
    switch (arPath[1]) {
      case 'transactions':
        if (arPath[2]) { return 'transaction'; }
        return arPath[1];
      case 'blocks':
        if (arPath[2]) { return 'block'; }
        return arPath[1];
      case 'wallet':
        return arPath[1];
      default:
        return 'main';
    }
  } else {
    return 'main';
  }
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

router.afterEach(writeHistory);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
