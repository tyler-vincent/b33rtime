<template>
  <div id="app">

    <v-app>
      <h1 class="text-center">HELLO</h1>

      <uploader></uploader>

      <h1 class="text-center">New Vue</h1>

      <div v-infinite-scroll="getUploads" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <div v-masonry="containerId" transition-duration="0.3s" item-selector=".upload" gutter="0" fit-width="true" class="uploads-container" >
          <div class="upload" v-for="(item, index) in uploads" :key="index" v-masonry-tile @mouseover="$redrawVueMasonry()" @mouseleave="$redrawVueMasonry()">
            <img :src="item.thumbnail_url" class="thumbnail" />
          </div>
        </div>
      </div>
    </v-app>

  </div>
</template>

<script>
import uploader from './uploader.vue'

export default {
  created: function() {
    console.log('Component has been created!')
  },
  data: function () {
    return {
      page: 1,
      uploads: [],
      containerId: null
    }
  },
  components: {
    uploader
  },
  methods: {
    async getUploads () {
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
