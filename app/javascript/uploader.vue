<template>

  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on }">
      <v-btn absolute dark fab top right color="pink" v-on="on">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title></v-card-title>
      <v-card-text>
        <v-file-input class="my-4" v-model="selectedFile" hide-details="true" :prepend-icon="false" clear-icon="mdi-close" filled accept="image/png, image/jpeg, image/gif" placeholder="Select a file" :show-size="1024" @change="setupCropper"></v-file-input>
      </v-card-text>

      <v-card-text>
        <v-row v-if="objectUrl">
          <v-col class="text-center" cols="12" sm="6">
            <div class="overline">Original</div>
            <div class="image-container elevation-4"><img class="image-preview" ref="source" :src="objectUrl" /></div>
            <div class="d-flex justify-center">
              <v-btn icon="icon" small="small" @click="resetCropper">
                <v-icon small="small">mdi-aspect-ratio</v-icon>
              </v-btn>
              <v-btn icon="icon" small="small" @click="rotateLeft">
                <v-icon small="small">mdi-rotate-left</v-icon>
              </v-btn>
              <v-btn icon="icon" small="small" @click="rotateRight">
                <v-icon small="small">mdi-rotate-right</v-icon>
              </v-btn>
            </div>
          </v-col>
          <v-col class="text-center" cols="12" sm="6">
            <div class="overline">Thumbnail</div>
            <div class="image-container elevation-4"><img class="image-preview" :src="previewCropped" /></div>
          </v-col>
        </v-row>

        <v-row v-if="objectUrl">
          <v-col class="text-center" cols="12" sm="12">
            <v-combobox multiple v-model="tags" label="Tags" append-icon chips deletable-chips class="tag-input" :search-input.sync="search" @keyup.tab="updateTags" @paste="updateTags"></v-combobox>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn depressed :disabled="!objectUrl" color="primary" @click="uploadImage">Upload</v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>




</template>


<script>
  import Cropper from 'cropperjs'
  import debounce from 'lodash/debounce'

  export default {
    data () {
      return {
        cropper: null,
        objectUrl: null,
        previewCropped: null,
        selectedFile: null,
        debouncedUpdatePreview: debounce(this.updatePreview, 257),
        dialog: false,
        tags: [],
        items: [],
        search: ""
      }
    },

    methods: {
      resetCropper () {
        this.cropper.reset()
      },
      rotateLeft () {
        this.cropper.rotate(-90)
      },
      rotateRight () {
        this.cropper.rotate(90)
      },
      setupCropper (selectedFile) {
        if (this.cropper) {
          this.cropper.destroy()
        }

        if (this.objectUrl) {
          window.URL.revokeObjectURL(this.objectUrl)
        }

        if (!selectedFile) {
          this.cropper = null
          this.objectUrl = null
          this.previewCropped = null
          return
        }

        this.objectUrl = window.URL.createObjectURL(selectedFile)
        this.$nextTick(this.setupCropperInstance)
      },
      setupCropperInstance () {
        this.cropper = new Cropper(this.$refs.source, {
          aspectRatio: 1,
          crop: this.debouncedUpdatePreview
        })
      },
      updatePreview (event) {
        const canvas = this.cropper.getCroppedCanvas()
        this.previewCropped = canvas.toDataURL('image/png')
      },
      updateTags() {
        this.$nextTick(() => {
          this.tags.push(...this.tags.split(","));
          this.$nextTick(() => {
            this.search = "";
          });
        });
      },
      uploadImage() {
        let formData = new FormData()
        let canvas = this.cropper.clear().getCroppedCanvas();
        console.log(this);
        console.log(canvas);

        console.log(canvas.toBlob);

        canvas.toBlob((blob) => {
          formData.append("upload[image]", blob);

          this.axios.post('http://localhost:3000/uploads.json', formData, {
            headers: {
              'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
              'Content-Type': 'application/json'
            }
          }).then(function (response) {
            console.log(response)
          }).catch(function (error) {
            console.log(error)
          });


        });

      },
    }
  }
</script>


<style lang="scss" scoped>
  .image-container {
    display: inline-block;
  }

  .image-preview {
    display: block;
    max-height: 229px;
    max-width: 100%;
  }

  .tag-input span.chip {
    background-color: #1976d2;
    color: #fff;
    font-size: 1em;
  }

  .tag-input span.v-chip {
    background-color: #1976d2;
    color: #fff;
    font-size:1em;
    padding-left:7px;
  }

  .tag-input span.v-chip::before {
      content: "label";
      font-family: 'Material Icons';
      font-weight: normal;
      font-style: normal;
      font-size: 20px;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      display: inline-block;
      white-space: nowrap;
      word-wrap: normal;
      direction: ltr;
      -webkit-font-feature-settings: 'liga';
      -webkit-font-smoothing: antialiased;
  }
</style>

<style lang="sass">
  @import 'cropperjs/dist/cropper.css'
</style>
