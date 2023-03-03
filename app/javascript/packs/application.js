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

import Vue from 'vue'
import App from '../app.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {VueMasonryPlugin} from 'vue-masonry'
import infiniteScroll from 'vue-infinite-scroll'
import VueTailwind from 'vue-tailwind'
import TModal from 'vue-tailwind/dist/t-modal'


Vue.use(VueAxios, axios)
Vue.use(VueMasonryPlugin)
Vue.use(infiniteScroll)

const settings = {

}

Vue.use(VueTailwind, settings)

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    render: h => h(App)
  }).$mount()
  document.body.appendChild(app.$el)

  console.log(app)
})
