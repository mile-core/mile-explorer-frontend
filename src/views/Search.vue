<template lang="pug">
  .search
    h1.title Oops!
    p.description Error!
    button.btn(@click="$router.push({ name: 'home' })") Back Home
</template>
