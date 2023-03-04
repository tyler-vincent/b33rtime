<template>
  <div>
    <h1 class="text-center">Upload</h1>

    <upload-image></upload-image>

    <h1 class="text-center">Images</h1>

    <div v-masonry="containerId" transition-duration="0.3s" item-selector=".upload" gutter="0" fit-width="true" class="uploads-container" >
      <div class="upload" v-for="(item, index) in uploads" :key="index" v-masonry-tile @mouseover="$redrawVueMasonry()" @mouseleave="$redrawVueMasonry()">
        <img :src="item.thumbnail_url" class="thumbnail" />
      </div>
    </div>

    <infinite-loading target="#app" @infinite="getUploads"></infinite-loading>

<div class="w-full max-w-sm rounded bg-white h-96 m-auto shadow flex flex-col">
    <div class="mx-8 shadow rounded-full h-10 mt-4 flex p-1 relative items-center">
        <div class="w-full flex justify-center">
            <button>Left</button>
        </div>
        <div class="w-full flex justify-center">
            <button>Right</button>
        </div>
        <span
        class="elSwitch bg-indigo-600 shadow text-white flex items-center justify-center w-1/2 rounded-full h-8 transition-all top-[4px] absolute left-1 ">
        Text
        </span>
    </div>


    <div class="mx-8 shadow rounded border h-10 mt-4 flex p-1 relative items-center bg-gray-200">
        <div class="w-full flex justify-center">
            <button>Left</button>
        </div>
        <div class="w-full flex justify-center">
            <button>Right</button>
        </div>
        <span
        class="elSwitch bg-white shadow text-gray-800 flex items-center justify-center w-1/2 rounded h-8 transition-all top-[4px] absolute left-1 ">
        Text
        </span>
    </div>

<div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
  <img src="/img/beams.jpg" alt="" class="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" width="1308" />
  <div class="absolute inset-0 bg-[url(/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
  <div class="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
    <div class="mx-auto max-w-md">
      <img src="/img/logo.svg" class="h-6" alt="Tailwind Play" />
      <div class="divide-y divide-gray-300/50">
        <div class="space-y-6 py-8 text-base leading-7 text-gray-600">
          <p>An advanced online playground for Tailwind CSS, including support for things like:</p>
          <ul class="space-y-4">
            <li class="flex items-center">
              <svg class="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
              <p class="ml-4">
                Customizing your
                <code class="text-sm font-bold text-gray-900">tailwind.config.js</code> file
              </p>
            </li>
            <li class="flex items-center">
              <svg class="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
              <p class="ml-4">
                Extracting classes with
                <code class="text-sm font-bold text-gray-900">@apply</code>
              </p>
            </li>
            <li class="flex items-center">
              <svg class="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
              <p class="ml-4">Code completion with instant preview</p>
            </li>
          </ul>
          <p>Perfect for learning how the framework works, prototyping a new idea, or creating a demo to share online.</p>
        </div>
        <div class="pt-8 text-base font-semibold leading-7">
          <p class="text-gray-900">Want to dig deeper into Tailwind?</p>
          <p>
            <a href="https://tailwindcss.com/docs" class="text-sky-500 hover:text-sky-600">Read the docs &rarr;</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

</div>


  </div>
</template>

<script>
import UploadImage from "~/components/UploadImage.vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
import 'virtual:windi.css';


export default {
  created: function() {
    console.log('Component has been created!')
  },
  mounted: function() {
    this.getUploads();
  },
  data: function () {
    return {
      page: 1,
      uploads: [],
      containerId: null
    }
  },
  components: {
    UploadImage,
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel
  },
  methods: {
    async getUploads () {
      console.log(`Loading Page ${this.page}`);
      const response = await this.$http.get(`/uploads.json?page=${this.page}`);
      this.uploads = this.uploads.concat(response.data);
      this.page++;
    },
    setImage: function (resizedFile) {
      console.log(this.$refs.fileUpload.$el.children[1].files[0])
      console.log(resizedFile)
    }
  }
}
</script>

<style lang="scss" scoped>
  .uploads-container {
    display: block;
    margin: auto;
  }

  .upload {
    width: 150px;
    height: 150px;

    .thumbnail {
      width: 100%;
      height: 100%;
    }

    &:hover {
      width: 300px;
      height: 300px;
    }
  }
</style>
