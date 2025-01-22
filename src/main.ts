import router from '@/router';
import { createApp } from 'vue';
import App from './App.vue';

import 'uno.css';
import '@/assets/main.css';

const app = createApp(App);

app.use(router);

app.mount('#app');
