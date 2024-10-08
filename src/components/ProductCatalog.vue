<template>
  <v-container>
    <v-row v-if="products.length">
      <v-col v-for="product in products" :key="product.id" cols="12" md="6" lg="4">
        <v-card class="mx-auto" outlined>
          <v-card-title>{{ product.name }}</v-card-title>
          <v-img
              :src="getProductImage(product.image)"
              height="200px"
              class="mb-4"
          ></v-img>
          <v-card-subtitle>{{ product.description }}</v-card-subtitle>
          <v-card-text>
            <p><strong>Precio:</strong> {{ product.price }} USD</p>
            <p><strong>Stock disponible:</strong> {{ Math.max(product.stock, 0) }} unidades</p>

            <v-select
                v-if="product.stock > 0"
                v-model="product.quantity"
                :items="getQuantityItems(product.stock)"
                label="Cantidad"
                outlined
            ></v-select>
            <p v-else class="text-red"><strong>¡Agotado!</strong></p>
          </v-card-text>

          <v-card-actions v-if="product.stock > 0" class="justify-end">
            <v-btn
                @click="addToCart(product)"
                :disabled="!product.stock"
                color="primary"
                variant="elevated"
            >
              Agregar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" persistent max-width="420">
      <v-card>
        <v-card-title>Producto fué agregado</v-card-title>
        <v-card-actions class="justify-space-between">
          <v-btn color="success" variant="elevated" class="mx-2 flex-grow-1" @click="goToCart">Ir a Orden</v-btn>
          <v-btn color="primary" variant="elevated" class="mx-2 flex-grow-1" @click="continueShopping">Continuar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      dialog: false,
    };
  },
  async created() {
    const username = import.meta.env.VITE_BASIC_AUTH_USER;
    const password = import.meta.env.VITE_BASIC_AUTH_PASSWD;
    const credentials = btoa(`${username}:${password}`);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });
      const products = await response.json();

      this.products = products.map(product => ({
        ...product,
        quantity: 1
      }));
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  },
  methods: {
    getProductImage(image) {
      return `${import.meta.env.VITE_IMAGES_URL}/${image}`;
    },
    addToCart(product) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      const existingProduct = cart.find(item => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        cart.push({ ...product, quantity: product.quantity, image: product.image });
      }

      localStorage.setItem('cart', JSON.stringify(cart));

      this.dialog = true;
    },
    goToCart() {
      this.dialog = false;
      this.$router.push('/cart');
    },
    continueShopping() {
      this.dialog = false;
    },

    getQuantityItems(stock) {
      const maxItems = stock > 5 ? 5 : stock;
      return Array.from({ length: maxItems }, (_, i) => i + 1);
    },
  },
};
</script>

<style>
.text-red {
  color: red;
}
</style>