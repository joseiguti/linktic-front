<template>
  <v-app>
    <ProductMenu />
    <v-main class="main-content">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import ProductMenu from './components/ProductMenu.vue';

export default {
  name: 'App',
  components: { ProductMenu },
};
</script>

<style>
.main-content {
  margin-top: 5px;
}
</style>