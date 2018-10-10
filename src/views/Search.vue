<template lang="pug">
  .search
    h1.title Oops!
    p.description Error! Missing search term.
    button.btn(@click="this.$router.push({ name: 'home' })") Back Home
</template>
