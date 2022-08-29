<template>
  <view class="form"><slot /></view>
</template>
<script>
const reg = {
  mobile: /^1[0-9]{10}$/,
};
export default {
  name: "u-form",
  created() {
    this.name = "_form";
    this.rules = {};
    this.formData = {};
    this.errors = {};
  },
  methods: {
    setChangeDisable(callback) {
      this.setChangeDisable = callback;
    },
    addRules(name, rules, value) {
      this.rules[name] = rules;
      this.formData[name] = value;
      this.validationItem(name, value);
    },
    validationItem(name, value) {
      const rules = this.rules[name];
      this.formData[name] = value;
      let errorMsg = "";
      this.errors[name] = true;

      for (let o of Object.keys(rules)) {
        const msg = rules[o];
        //必填验证
        if (o === "require" && !value) {
          errorMsg = msg;
          this.errors[name] = false;
          break;
        }
        //手机号验证
        if (o === "mobile" && !reg.mobile.test(value)) {
          errorMsg = msg;
          this.errors[name] = false;
          break;
        }
        if ("custom" == o) {
          errorMsg = rules[o](value);
          this.errors[name] = !errorMsg;
          break;
        }
      }
      this.disableChange();
      return errorMsg;
    },

    disableChange() {
      for (let o of Object.keys(this.errors)) {
        if (!this.errors[o]) {
          return this.setChangeDisable(this.errors[o]);
        }
      }
      this.setChangeDisable(true);
    },
  },
};
</script>
