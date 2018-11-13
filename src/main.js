import 'normalize.css/normalize.css';
import 'hamburgers/dist/hamburgers.min.css';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import moment from 'moment';
import timeago from 'timeago.js';

Vue.config.productionTip = false;

Vue.filter('localTime', function (value) {
  var stillUtc = moment.utc(value).toDate();
  var local = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
  return timeago().format(local);
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
next()
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');

