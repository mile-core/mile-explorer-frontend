import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import Block from './views/Block.vue';
import Blocks from './views/Blocks.vue';
import Search from './views/Search.vue';
import Wallet from './views/Wallet.vue';
import Playground from './views/Playground.vue';
import Transaction from './views/Transaction.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {title: 'Home'},
    },
    {
      path: '/blocks',
      name: 'blocks',
      component: Blocks,
      meta: {title: 'Blocks'},
    },
    {
      path: '/blocks/:blockId',
      name: 'block',
      component: Block,
      props: true,
      meta: {title: 'Block info'},
    },
    {
      path: '/transactions/:publicKey/:transactionId',
      name: 'transaction',
      component: Transaction,
      props: true,
      meta: {title: 'Transaction info'},
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      meta: {title: 'Search'},
    },
    {
      path: '/wallet',
      name: 'publicKey',
      component: Wallet,
      meta: {title: 'Wallet'}
    },
    {
      path: '/wallet/:publicKey',
      name: 'wallet',
      component: Wallet,
      props: true,
      meta: {title: 'Public key info'},
    },
    {
      path: '/wallet/:publicKey/transactions/:transactionId',
      name: 'transaction',
      component: Transaction,
      props: true,
      meta: {title: 'Tranasction info'},
    },
    {
      path: '/playground',
      name: 'playground',
      component: Playground,
      meta: {title: 'Playground'},
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
