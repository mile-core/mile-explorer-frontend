<template lang="pug">
  .api-playground
    .help
      h4 'help'
      button(@click="request('help')") 'help'
      br
      mile-loader(v-if="loading.help")
      pre(v-else) {{ results.help }}
    hr
    .get-block
      h4 'get-block'
      input(type="number" v-model.number="params.getBlock")
      button(@click="request('getBlock')") 'get-block'
      br
      mile-loader(v-if="loading.getBlock")
      pre(v-else) {{ results.getBlock }}
</template>

<script>
import api from '@/api';
import MileLoader from './MileLoader.vue';

export default {
  components: {
    MileLoader,
  },
  data() {
    return {
      loading: {
        help: false,
        getBlock: false,
      },
      params: {
        getBlock: 0,
      },
      results: {
        help: {},
        getBlock: {},
      },
    };
  },
  methods: {
    async request(method) {
      this.loading[method] = true;
      this.results[method] = await api[method](this.params[method]);
      this.loading[method] = false;
    },
  },
};
</script>
