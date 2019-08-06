<template>
    <v-toolbar dark color="primary">
    <nav id="nav" class="w3-bar w3-card-4">
       <!-- <v-container justify-space-between="true">
        <v-toolbar-side-icon>
            <span></span>
        </v-toolbar-side-icon> -->

       
        <router-link to="/" class="w3-button"> <v-icon>home</v-icon> Home </router-link>
        <router-link to="/matrix2x2" class="w3-button"> 2X2 </router-link>
        <router-link to="/matrix3x3" class="w3-button"> <v-icon>apps</v-icon> 3X3 </router-link>
        <router-link to="/matrixmxn" class="w3-button"> <v-icon>view_module</v-icon> MXN </router-link>
        
       <!-- </v-container>-->
    </nav>
    </v-toolbar>
</template>

<script>
export default {
    name: 'Nav'
}
</script>

<style lang="scss" scoped>

#nav {
    text-decoration: none;
    a {
        padding: 0px 20px 0ox 20px;
        color: #ffffff;
        &.router-link-exact-active {
            color: #ffffff;
            font-weight: 800;
        }
    }
}


</style>


