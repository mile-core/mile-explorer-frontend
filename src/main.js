import 'normalize.css/normalize.css';
import 'hamburgers/dist/hamburgers.min.css';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';

Vue.config.productionTip = false;

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

