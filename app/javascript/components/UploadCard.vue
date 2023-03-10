
<template>
  <div>

    <div  class="flip m-1 w-64 h-64 cursor-pointer bg-slate-900">
      <div v-if="visible" className="flip-content">
        <div className="inset-0 w-full h-full justify-center items-center bg-gray-900 overflow-hidden flip-front">
          <img :src="thumbnailUrl" class="thumbnail z-20" />
          <div class="animate-pulse bg-gray-700 z-10 h-64 w-64"></div>
        </div>
        <div className="w-full h-full text-white bg-black flip-back">
          <div class="container mx-auto p-6 h-full">
            <input :value="fullUrl" ref="clone" readonly v-on:focus="$event.target.select()" type="text" class="mt-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">

            <div class="grid grid-cols-2 gap-0 mt-6 place-items-center items-center">
              <div>
                <button @click="redirectToImage(fullUrl)" class="px-6 py-3 text-blue-100 no-underline bg-blue-500 rounded hover:bg-blue-600 hover:text-blue-200">
                  View
                </button>
              </div>
              <div>
                <button @click="copy" class="px-6 py-3 text-blue-100 no-underline bg-blue-500 rounded hover:bg-blue-600 hover:text-blue-200">
                  Copy
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import inViewport from 'vue-in-viewport-mixin';

  export default {
    name: "upload-card",
    props: {
      thumbnailUrl: String,
      fullUrl: String
    },
    mixins: [ inViewport ],
    watch: {
      'inViewport.now': function(isVisible) {
        this.visible = isVisible;
      }
    },
    data() {
      return {
        visible: true
      };
    },
    methods: {
      copy() {
        this.$refs.clone.focus();
        document.execCommand('copy');
      },
      redirectToImage(href) {
        window.open(href, '_blank');
      }
    }
  };
</script>

<style scoped>

  .thumbnail {
    width: 100%;
    height: 100%;
  }

  .flip {
    perspective: 600px;
  }

  .flip-content {
    width: 100%;
    height: 100%;
    transition: transform 0.2s;
    transform-style: preserve-3d;
  }

  .flip:hover .flip-content {
    transform: rotateY(180deg);
    transition: transform 0.2s;
  }

  .flip-front, .flip-back {
    position: absolute;
    backface-visibility: hidden;
  }

  .flip-back {
    transform: rotateY(180deg);
  }

</style>
