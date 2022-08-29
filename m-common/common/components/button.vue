<template>
  <u-button
    :custom-style="disabled?buttonStyle.disable:buttonStyle.main"
	type="primary"
    :ripple="true"
    :hair-line="false"
    :disabled="disabled"
    :loading="isLoading"
    @click="buttonClick"
   
    >{{ title }}</u-button
  >
</template>

<script>
import {buttonStyle} from "@/config.js"
export default {
  props: ["title", "submit","disable"],
  data() {
    return {
		buttonStyle,
      isLoading: false,
      disabled:this.disable || false,
    };
  },
  created() {
    this.parent = this.$u.$parent.call(this, "u-form");
    if (this.parent.name == "_form") {
      this.parent.setChangeDisable((type) => {
        console.log(type);
        this.disabled = !type;
      });
    }
  },
   watch:{
	  disable(value){
		  console.log(value);
		  this.disabled = value;
	  }
  },
  methods: {
    buttonClick() {
      this.isLoading = true;
      this.$emit("submit");
    },
    hideLoading() {
      this.isLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
