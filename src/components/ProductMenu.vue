<template>
  <v-app-bar app>
    <v-toolbar-title>Tienda <b>LinkTic1</b></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text to="/">Catálogo</v-btn>
    <v-btn text to="/cart">Orden</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'MenuComponent',
};
</script>