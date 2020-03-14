<template>
  <div id="app">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  created: function() {
    this.getUploads()
    console.log('Component has been created!')
  },
  data: function () {
    return {
      message: "Hello You!"
    }
  },
  methods: {
    async getUploads () {
      const { data } = await this.$http.get(
        '/uploads.json'
      );
      console.log(data);
      // example response: { id: 1, name: "something" }
    }
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
