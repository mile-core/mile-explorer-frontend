<template lang="pug">
.separate-list(v-if=(stats && assets))
  .separate-list__item.separate-list__item_no-border
    strong stats for 24 hours:
  <!--.separate-list__item blocks: 4320-->
  .separate-list__item(v-if="stats && stats.count") transactions: {{ stats.count }}
  .separate-list__item.separate-list__item_no-border(v-if="stats && stats.assets") {{assets[stats.assets[1]['code']]['ticker-name']}}&nbsp;turnover:&nbsp;
    <vue-numeric v-bind:value="stats.assets[1]['amount']" read-only="True" v-bind:precision="assets[stats.assets[1]['code']]['precision']"></vue-numeric>
  .separate-list__item.separate-list__item_no-border(v-if="stats && stats.assets") {{assets[stats.assets[0]['code']]['ticker-name']}}&nbsp;turnover:&nbsp;
    <vue-numeric v-bind:value="stats.assets[0]['amount']" read-only="True" v-bind:precision="assets[stats.assets[0]['code']]['precision']"></vue-numeric>
</template>

<script>
import api from '@/api';
import VueNumeric from 'vue-numeric';

export default {
  components: {
    VueNumeric,
  },
  data() {
    return {
      stats: null,
      assets: [],
    };
  },
  methods: {
    async fetchStats() {
      this.assets = await api.getAssets();
      const data = await api.getStatistics('turnover-24');

      const res = {
        amount: 0,
        assets: [],
      };

      if (data.count) {
        res.count = data.count;
      }
      if (data.assets) {
        res.assets = data.assets;
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
