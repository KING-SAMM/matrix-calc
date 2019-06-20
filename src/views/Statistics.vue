<template>

    <v-content>
      <Nav /> 
      <Statistics />
    </v-content>

</template>

<script>
// @ is an alias to /src
import Statistics from '@/components/Statistics.vue'
import Nav from '@/components/Nav.vue'

export default {
  name: 'statistics',
  components: {
    Statistics,
    Nav
  }
}
</script>