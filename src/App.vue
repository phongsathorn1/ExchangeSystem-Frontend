<template>
  <div id="app">
    <navbar></navbar>
    <router-view/>
    {{ user }}
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'

export default {
  components: {
    Navbar
  },
  created() {
    this.loadUserToken()
    this.loadUser()
  },
  methods: {
    ...mapActions([
      'loadUserToken',
      'loadUser'
    ])
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
      userToken: 'getUserToken'
    })
  }
};
</script>


<style lang="scss">
@import "assets/custom.scss";
@import 'assets/icofont/icofont.min.css';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #ffffff;
  min-height: 100vh;
  font-family: 'Athiti', sans-serif;
  font-size: 1.02em;
}

</style>
