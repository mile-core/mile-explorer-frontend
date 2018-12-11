<template lang="pug">
  footer.footer
    .footer__panel
      .content-wrapper
        Stats
    .footer__inner.content-wrapper(style="height: 100%")
      .footer__copyright.indent-symbol
        p(v-html="$t('copyright')")
      .footer__text
        p(v-html="$t('blockTimeInfo')")
      nav.footer__menu.bottom-menu
        router-link(to="/playground") API Playground
</template>

<script>
import api from '@/api';
import Stats from '@/components/Stats.vue';

export default {
  components: {
    Stats,
  },
  methods: {
    async fetchStats() {
      const data = await api.getStatistics('turnover-24');
      const res = {
        amount: 0,
      };

      if (data.assets) {
        data.assets.forEach((asset) => {
          res.amount += asset.amount;
        });
      }

      if (data.count) {
        res.count = data.count;
      }

      return res;
    },
  },
};
</script>

<style lang="sass" scoped>

</style>
