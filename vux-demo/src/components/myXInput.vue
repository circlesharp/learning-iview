<template>
  <div class="wrap-x-input">
    x-input;
    validPassword {{ validPassword }}
    <group title="x-input">
      <x-input
        ref="pwd"
        title="测试密码"
        placeholder="会验证的"
        v-model="password"
        :is-type="passwordValidate"
      />
      <x-button type="primary" @click.native="test">primary</x-button>
    </group>
  </div>
</template>

<script>

import { XInput, Group, XButton } from 'vux';
export default {
  components: { XInput, Group, XButton },
  data() {
    return {
      password: '',
      validPassword: false,
    };
  },
  methods: {
    test() {
      console.log(this.validPassword);
    },
    passwordValidate(value) {
      const reg = /(?!^([0-9]+|[a-zA-Z]+)$)^[a-zA-Z0-9]{8,16}$/;
      if (reg.test(value)) {
        this.validPassword = true;
        return { valid: true };
      }
      this.validPassword = false;
      return { valid: false, msg: 'PASSWORD_LENGTH_ERROR' };
    },
  },
};
</script>

<style>

</style>
