<template lang="pug">
  footer.footer
    .footer__panel
      .separate-list.content-wrapper
        .separate-list__item blocks: 5169
        .separate-list__item transactions: 37748
        .separate-list__item(v-if="stats.amount") per day: {{ stats.amount }}
        .separate-list__item wallet: 15237748394876
    .footer__inner.content-wrapper(style="height: 100%")
      .footer__copyright
        p(v-html="$t('copyright')")
      .footer__text
        p(v-html="$t('blockTimeInfo')")
      nav.footer__menu.bottom-menu
        router-link(to="/playground") API Playground
</template>

<script>
import api from '@/api';

export default {
  data() {
    return {
      stats: {},
    };
  },
  methods: {
    async fetchStats() {
      const data = await api.getTurnovers();
      const res = {
        amount: 0,
      };

      if (data.assets) {
        data.assets.forEach((asset) => {
          res.amount += asset.amount;
        });
      }

      return res;
    },
  },
  created() {
    const that = this;

    function fetchStats() {
      that.fetchStats().then((res) => {
        that.stats = res;
      });
    }

    fetchStats();

    setInterval(() => {
      fetchStats();
    }, 60000);
  },
};
</script>

<style lang="sass" scoped>

</style>
