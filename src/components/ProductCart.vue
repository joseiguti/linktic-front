<template>
  <v-container>
    <v-dialog v-model="orderForm" persistent max-width="600">
      <OrderForm
          :order="order"
          @cancel="cancelOrder"
          @checkout="checkout"
      />
    </v-dialog>
    <v-row>
      <v-col cols="12">
        <CartList :cart="cart" @remove="removeFromCart" />
        <v-card v-if="!cart.length">
          <v-card-title>Tu orden</v-card-title>
          <v-card-subtitle>Tu orden está vacía</v-card-subtitle>
          <v-card-text>
            Añade productos a tu orden para continuar.
          </v-card-text>
        </v-card>

        <v-card-actions v-if="cart.length">
          <v-btn @click="showOrderForm" color="primary" variant="elevated">Confirmar tu Orden</v-btn>
        </v-card-actions>

        <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout" top>
          {{ snackbar.message }}
          <v-btn color="white" text @click="snackbar.show = false">Cerrar</v-btn>
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CartList from './CartList.vue';
import OrderForm from './OrderForm.vue';

export default {
  components: {
    CartList,
    OrderForm
  },
  data() {
    return {
      cart: [],
      orderForm: false,
      order: {
        customer_name: '',
        customer_email: '',
        total_price: 0,
      },
      snackbar: {
        show: false,
        message: '',
        color: '',
        timeout: 2000
      },
      purchaseComplete: false,
    };
  },
  computed: {
    total() {
      return this.cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
    },
  },
  watch: {
    cart: {
      deep: true,
      handler() {
        this.order.total_price = this.total;
      }
    }
  },
  created() {
    this.cart = JSON.parse(localStorage.getItem('cart')) || [];
  },
  methods: {
    removeFromCart(id) {
      this.cart = this.cart.filter(item => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    showOrderForm() {
      this.orderForm = true;
    },
    cancelOrder() {
      this.orderForm = false;
    },
    async checkout() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa(`${import.meta.env.VITE_BASIC_AUTH_USER}:${import.meta.env.VITE_BASIC_AUTH_PASSWD}`)}`
          },
          body: JSON.stringify({
            customer_name: this.order.customer_name,
            customer_email: this.order.customer_email,
            total_price: this.order.total_price,
            products: this.cart
          }),
        });

        const data = await response.json();

        if (response.ok) {
          this.showSnackbar('¡Compra exitosa!', 'success');
          this.purchaseComplete = true;
          this.clearCart();
          this.orderForm = false;
        } else if (data.error && data.error === 'stock') {
          this.showSnackbar('Stock insuficiente, ajusta tu pedido.', 'error');
          this.orderForm = false;
        } else {
          this.showSnackbar('Error al procesar la orden', 'error');
        }
      } catch (error) {
        console.error('Error en la compra:', error);
        this.showSnackbar('Error en la conexión', 'error');
      }
    },
    clearCart() {
      localStorage.removeItem('cart');
      this.cart = [];
      this.$router.push('/');
    },
    showSnackbar(message, color) {
      this.snackbar.message = message;
      this.snackbar.color = color;
      this.snackbar.show = true;
      this.snackbar.timeout = 2000;
    },
  },
};
</script>