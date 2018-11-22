<template lang="pug">
  footer.footer
    .footer__panel
      .footer__stats.separate-list.content-wrapper
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

      if (data.count) {
        res.count = data.count;
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
