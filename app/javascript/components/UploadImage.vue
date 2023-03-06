
<template>
  <div>


    <div v-if="message" class="alert alert-secondary" role="alert">
      {{ message }}
    </div>


    <div class="">
      <button
        type="button"
        @click="openModal"
        class="rounded-md bg-black px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
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
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-black p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-100"
              >
                Upload
              </DialogTitle>

              <div class="mt-2">
                <div class="row">
                  <div class="col-8">
                    <label class="btn btn-default p-0">
                      <input
                        type="file"
                        accept="image/*"
                        ref="file"
                        @change="selectImage"
                      />
                    </label>
                  </div>
                </div>

                <div v-if="currentImage" class="progress">
                  <div
                    class="progress-bar progress-bar-info"
                    role="progressbar"
                    :aria-valuenow="progress"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    :style="{ width: progress + '%' }"
                  >
                    {{ progress }}%
                  </div>
                </div>

                <div v-if="previewImage">
                  <div>
                    <img class="preview my-3" :src="previewImage" alt="" />
                  </div>
                </div>
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  :disabled="!currentImage"
                  @click="upload"
                >
                  Upload
                </button>
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
        imageInfos: [],
        uploadModalOpen: false,
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
        this.progress = 0;
        UploadService.upload(this.currentImage, (event) => {
          this.progress = Math.round((100 * event.loaded) / event.total);
        })
          .then((response) => {
            this.message = response.data.message;
            return UploadService.getFiles();
          })
          .then((images) => {
            this.imageInfos = images.data;
          })
          .catch((err) => {
            this.progress = 0;
            this.message = "Could not upload the image! " + err;
            this.currentImage = undefined;
          });
      },
      closeModal: function () {
        this.uploadModalOpen = false
      },
      openModal: function () {
        this.uploadModalOpen = true
      }
    },
    mounted() {
      UploadService.getFiles().then((response) => {
        this.imageInfos = response.data;
      });
    },
  };
</script>

<style scoped>

</style>
