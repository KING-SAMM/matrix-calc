<template>
  <div class="home w3-animate-opacity">
    <img alt="Vue logo" src="../assets/logo.png">
    <Home msg="Welcome to Your Vue.js App"/>
    <HomeNav />
  </div>
</template>

<script>
// @ is an alias to /src
import Home from '@/components/Home.vue'
import HomeNav from '@/components/HomeNav.vue'

export default {
  name: 'home',
  components: {
    Home,
    HomeNav
  }
}
</script>
