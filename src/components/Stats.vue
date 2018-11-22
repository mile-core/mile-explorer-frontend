<template lang="pug">
.separate-list
  .separate-list__item.separate-list__item_no-border
    strong stats for 24 hours:
  <!--.separate-list__item blocks: 4320-->
  .separate-list__item(v-if="stats.count") transactions: {{ stats.count }}
  template(v-for="asset in stats.assets")
    .separate-list__item.separate-list__item_no-border {{assets[asset['code']]['name']}}:&nbsp;
      <vue-numeric v-bind:value="asset['amount']" read-only="True" v-bind:precision="assets[asset['code']]['precision']"></vue-numeric>
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
      stats: {},
      assets: [],
    };
  },
  methods: {
    async fetchStats() {
      this.assets = await api.getAssets();
      const data = await api.getTurnovers();
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
