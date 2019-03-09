<template>
  <div>
  
      <Nav />
      <Matrixmxn />
  
  </div>
</template>

<script>
// @ is an alias to /src
import Matrixmxn from '@/components/Matrixmxn.vue'
import Nav from '@/components/Nav.vue'

export default {
  name: 'matrixmxn',
  components: {
    Matrixmxn,
    Nav
  }
}
</script>