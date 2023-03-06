<template>
  <div>
    <header class="sticky top-0 flex w-full items-center justify-between py-6 bg-white z-50">
      b33rti.me
      <upload-image></upload-image>
    </header>
    <main class=relative>
      <h1 class="text-center">Images</h1>

      <div v-masonry="containerId" transition-duration="0.3s" item-selector=".upload" gutter="0" fit-width="true" class="uploads-container" >
        <div class="upload" v-for="(item, index) in uploads" :key="index" v-masonry-tile @mouseover="$redrawVueMasonry()" @mouseleave="$redrawVueMasonry()">

          <upload-card :thumbnail-url="item.thumbnail_url" :full-url="item.full_url"></upload-card>


        </div>
      </div>

      <infinite-loading target="#app" @infinite="getUploads"></infinite-loading>
    </main>
    <footer></footer>
  </div>
</template>

<script>
import UploadImage from "~/components/UploadImage.vue";
import UploadCard from "~/components/UploadCard.vue";

export default {
  created: function() {
    console.log('Main component has been created!')
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
    UploadCard
  },
  methods: {
    async getUploads () {
      console.log(`Loading Page ${this.page}`);
      const response = await this.$http.get(`/uploads.json?page=${this.page}`);
      this.uploads = this.uploads.concat(response.data);
      console.log(this.uploads);
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
</style>
