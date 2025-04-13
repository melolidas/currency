<template>
  <div id="app">
    <AppHeader />
    <router-view />
  </div>
</template>
<style>
html,
body {
  margin: 0;
  padding: 0;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}
</style>
<script>
import AppHeader from './components/AppHeader.vue'

export default {
  components: {
    AppHeader,
  },
}
</script>
