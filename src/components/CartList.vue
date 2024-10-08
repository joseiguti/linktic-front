<template>
  <v-card v-if="cart.length">
    <v-card-title>Tu orden</v-card-title>
    <v-card-subtitle>Total: {{ total }} USD</v-card-subtitle>
    <v-card-text>
      <v-row v-for="item in cart" :key="item.id">
        <v-col cols="2">
          <v-img :src="getProductImage(item.image)" height="50px"></v-img>
        </v-col>
        <v-col>{{ item.name }}</v-col>
        <v-col>{{ item.quantity }}</v-col>
        <v-col>{{ item.price }} USD (C/U)</v-col>
        <v-col>
          <v-btn @click="$emit('remove', item.id)" color="error" variant="elevated">
            Eliminar
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    cart: {
      type: Array,
      required: true,
    },
  },
  computed: {
    total() {
      return this.cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
    },
  },
  methods: {
    getProductImage(image) {
      return `${import.meta.env.VITE_IMAGES_URL}/${image}`;
    },
  },
};
</script>