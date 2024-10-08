import { createRouter, createWebHistory } from 'vue-router';
import Catalog from '../components/ProductCatalog.vue';
import Cart from '../components/ProductCart.vue';

const routes = [
    { path: '/', component: Catalog },
    { path: '/cart', component: Cart },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;