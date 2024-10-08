<template>
  <v-card>
    <v-card-title>Completa tus datos</v-card-title>
    <v-card-text>
      <v-form ref="orderForm" v-model="formValid">
        <v-text-field
            label="Nombre del cliente"
            v-model="order.customer_name"
            :rules="[v => !!v || 'El nombre es requerido']"
            required
        ></v-text-field>
        <v-text-field
            label="Correo Electrónico"
            v-model="order.customer_email"
            :rules="[v => !!v || 'El correo es requerido', v => /.+@.+\..+/.test(v) || 'Correo inválido']"
            required
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="$emit('cancel')" color="error" variant="elevated">Cancelar</v-btn>
      <v-btn :disabled="!formValid" @click="submitOrder" color="success" variant="elevated">Confirmar Orden</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      formValid: false,
    };
  },
  methods: {
    submitOrder() {
      if (this.formValid) {
        this.$emit('checkout');
      }
    }
  }
};
</script>