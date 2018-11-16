<template lang="pug">
  .search
    h1.title Oops!
    p.description The search string you entered was:
    pre {{query}}
    p.description Sorry! This is an invalid search string.
    button.btn(@click="$router.push({ name: 'home' })") Back Home
</template>
<script>
export default {
  components: {
  },
  props: {
    query: {
      type: String,
      required: true,
    },
  },
  computed: {

  },
};
</script>
<style lang="sass" scoped>

</style>
