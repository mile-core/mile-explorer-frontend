import Vue from 'vue';
import Router from 'vue-router';
import Blocks from './views/Blocks.vue';
import Transactions from './views/Transactions.vue';
import Wallet from './views/Wallet.vue';
import Playground from './views/Playground.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/playground',
    },
    {
      path: '/blocks',
      name: 'blocks',
      component: Blocks,
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: Transactions,
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: Wallet,
    },
    {
      path: '/playground',
      name: 'playground',
      component: Playground,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    // },
  ],
});
