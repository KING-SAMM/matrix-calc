<template>

    <v-content>
      <Nav /> 
      <BasicScientific />
    </v-content>

</template>

<script>
// @ is an alias to /src
import BasicScientific from '@/components/BasicScientific.vue'
import Nav from '@/components/Nav.vue'

export default {
  name: 'basicscientific',
  components: {
    BasicScientific,
    Nav
  }
}
</script>