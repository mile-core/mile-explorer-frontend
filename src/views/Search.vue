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
.search
	text-align: center

	> pre
		display: block
		padding: 9.5px
		width: 80%
    margin: 0 auto
		font-size: 13px
		line-height: 1.42857143
		color: #333
		word-break: break-all
		word-wrap: break-word
		background-color: #f5f5f5
		border: 1px solid #ccc
		border-radius: 4px
</style>