/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

import Vue, { createApp } from 'vue';
import App from '../app.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import {VueMasonryPlugin} from 'vue-masonry';
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

const app = createApp(App);

app.use(VueAxios, axios);
app.use(VueMasonryPlugin);
app.component("infinite-loading", InfiniteLoading);

document.addEventListener('DOMContentLoaded', () => {
  app.mount('#app');
});
