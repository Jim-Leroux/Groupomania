<template>
  <router-view></router-view>
  <Footer />
</template>

<script>
import './assets/sass/style.scss'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Footer
  }
}
</script>

<style>
#app {
  font-family: 'Courier New', Courier, monospace;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
