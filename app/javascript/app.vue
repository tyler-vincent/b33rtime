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
