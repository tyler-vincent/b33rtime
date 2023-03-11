
<template>
  <div>

    <div v-if="message" class="alert alert-secondary" role="alert">
      {{ message }}
    </div>

    <div class="">
      <button
        type="button"
        @click="openModal"
        class="rounded-md bg-slate-200 mr-8 px-6 py-3 text-slate-800 font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Upload
      </button>
    </div>

    <TransitionRoot appear :show="uploadModalOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded bg-slate-200 p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-slate-700"
                >
                  Upload Image
                </DialogTitle>


                <div v-if="!previewImage" class="max-w-xl">
                  <label
                      class="flex justify-center w-full h-32 px-4 mt-4 mb-4 transition border-2 bg-slate-200 border-slate-400 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-600 focus:outline-none">
                      <span class="flex items-center space-x-2">
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-slate-500" fill="none" viewBox="0 0 24 24"
                              stroke="currentColor" stroke-width="2">
                              <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <span class="font-medium text-slate-500">
                              Drop file or
                              <span class="text-blue-600 underline">browse</span>
                          </span>
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        ref="file"
                        @change="selectImage"
                        class="block overlayed"
                      />
                  </label>
                </div>

                <div v-if="previewImage" class="mt-4">
                  <div class="relative">
                    <img class="w-full aspect-square overflow-hidden" :src="previewImage">
                    <button @click="upload" class="py-3 px-6 absolute bottom-0 m-auto left-0 right-0 bg-blue-500 text-white p-2 rounded hover:bg-blue-800 mb-8">Upload</button>
                  </div>
                </div>

                <div v-if="uploadInProgress" class="progress mt-2">
                  <div class="w-full bg-gray-200 h-1.5 mb-4 dark:bg-gray-700">
                    <div class="bg-blue-600 h-1.5 dark:bg-blue-500" :class="{ 'animate-pulse': uploadProcessing }" :style="{ width: progress + '%' }"></div>
                  </div>
                </div>

              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

  </div>
</template>

<script>
  import UploadService from "../services/UploadFilesService";
  import { ref } from 'vue';
  import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
  } from '@headlessui/vue';


  export default {
    name: "upload-image",
    data() {
      return {
        currentImage: undefined,
        previewImage: undefined,
        progress: 0,
        message: "",
        uploadModalOpen: false,
        uploadInProgress: false,
        uploadProcessing: true,
      };
    },
    components: {
      TransitionRoot,
      TransitionChild,
      Dialog,
      DialogPanel,
      DialogTitle
    },
    methods: {
      selectImage() {
        this.currentImage = this.$refs.file.files.item(0);
        this.previewImage = URL.createObjectURL(this.currentImage);
        this.progress = 0;
        this.message = "";
      },
      upload() {
        this.progress = 100;
        UploadService.upload(this.currentImage, (event) => {
          this.uploadInProgress = true;
          this.progress = Math.round((100 * event.loaded) / event.total);

          if (this.progress == 100) {
            this.uploadProcessing = true;
          }
        })
          .then((response) => {
            this.message = response.data.message;
            this.$emit("new-upload-added", response.data);
            this.uploadInProgress = false;
            this.resetUploader();
            this.closeModal();
          })
          .catch((err) => {
            this.progress = 0;
            this.message = "Could not upload the image! " + err;
            this.currentImage = undefined;
          });
      },
      resetUploader() {
        this.currentImage = undefined;
        this.previewImage = undefined;
        this.progress = 0;
        this.uploadProcessing = false;
        this.message = "";
      },
      closeModal: function () {
        this.uploadModalOpen = false
      },
      openModal: function () {
        this.uploadModalOpen = true
      }
    },
    mounted() {
    },
  };
</script>

<style scoped>
  .overlayed {
    @apply absolute top-0 left-0 right-0 bottom-0 w-full block;
    opacity: 0;
  }
</style>
