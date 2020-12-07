<template>
  <div>
    <div class="wrap-input">
      <Input
        :value="value"
        placeholder="Enter something..."
        style="width: 300px"
        :type="typeInput"
        @on-change="onChange"
      />
      <Icon :type="iconType" @click="toggleShowPwd" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
  },
  data() {
    return {
      showPwd: false,
    };
  },
  computed: {
    iconType() {
      const eye = 'ios-eye';
      const eyeOff = 'ios-eye-off';
      return this.showPwd ? eye : eyeOff;
    },
    typeInput() {
      return this.showPwd ? 'password' : 'text';
    },
  },
  methods: {
    toggleShowPwd() {
      this.showPwd = !this.showPwd;
    },
    onChange(e) {
      this.$emit('input', e.target.value);
    },
  },
};
</script>

<style lang="less" scoped>
.wrap-input {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  .ivu-icon {
    font-size: 18px;
    position: absolute;
    top: 50%;
    translate: 0 -50%;
    right: 25px;
  }
}
</style>
