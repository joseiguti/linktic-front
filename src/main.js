import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Importa los estilos de Vuetify
import { aliases, mdi } from 'vuetify/iconsets/mdi'; // Si usas íconos
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import router from './router';

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
});

createApp(App)
    .use(router)
    .use(vuetify)
    .mount('#app');