<template>

    <v-content>
      <Nav /> 
      <NumberSystems />
    </v-content>

</template>

<script>
// @ is an alias to /src
import NumberSystems from '@/components/NumberSystems.vue'
import Nav from '@/components/Nav.vue'

export default {
  name: 'numbersystems',
  components: {
    NumberSystems,
    Nav
  }
}
</script>