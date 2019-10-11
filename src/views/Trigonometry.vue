<template>

    <v-content>
      <Nav /> 
      <Trigonometry />
    </v-content>

</template>

<script>
// @ is an alias to /src
import Trigonometry from '@/components/Trigonometry.vue'
import Nav from '@/components/Nav.vue'

export default {
  name: 'trigonometry',
  components: {
    Trigonometry,
    Nav
  }
}
</script>