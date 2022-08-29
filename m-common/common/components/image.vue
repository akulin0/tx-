<template>
    <image :src="srcData || src || error" @error="imgError" />
</template>
<script>
export default {
  props: ["src", "error"],
  data() {
    return {
      srcData: "",
    };
  },
  methods: {
    imgError() {
      this.srcData = this.error;
    },
  },
};
</script>
<style scoped>
image{
  width: 100%;
  height: 100%;
}
</style>
