// To see this message, add the following to the `<head>` section in your
// views/layouts/application.html.erb
//
//    <%= vite_client_tag %>
//    <%= vite_javascript_tag 'application' %>
console.log('Vite ⚡️ Rails')

// If using a TypeScript entrypoint file:
//     <%= vite_typescript_tag 'application' %>
//
// If you want to use .jsx or .tsx, add the extension:
//     <%= vite_javascript_tag 'application.jsx' %>

console.log('Visit the guide for more information: ', 'https://vite-ruby.netlify.app/guide/rails')

// Example: Load Rails libraries in Vite.
//
// import * as Turbo from '@hotwired/turbo'
// Turbo.start()
//
// import ActiveStorage from '@rails/activestorage'
// ActiveStorage.start()
//
// // Import all channels.
// const channels = import.meta.globEager('./**/*_channel.js')

// Example: Import a stylesheet in app/frontend/index.css
// import '~/index.css'

import "virtual:windi.css";
import 'virtual:windi-devtools';
import { createApp } from 'vue';
import App from '~/app.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import {VueMasonryPlugin} from 'vue-masonry';
import InfiniteLoading from "v3-infinite-loading";

const app = createApp(App);

app.use(VueAxios, axios);
app.use(VueMasonryPlugin);
app.component("infinite-loading", InfiniteLoading);

document.addEventListener('DOMContentLoaded', () => {
  app.mount('#app');
});
