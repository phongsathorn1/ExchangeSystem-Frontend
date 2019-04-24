<template>
  <div id="app">
    <navbar></navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar
  }
};
</script>


<style lang="scss">
@import "assets/custom.scss";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #ffffff;
  min-height: 100vh;
  font-family: 'Athiti', sans-serif;
  font-size: 1.02em;
}

</style>
