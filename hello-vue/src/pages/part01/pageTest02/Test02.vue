<template>
  <div class="input-with-eyes">
    <div class="wrap-input">
      <InputWithEyes v-model="value" />
    </div>
    <Button>test: {{ value }}</Button>
  </div>
</template>

<script>
import InputWithEyes from './components/InputWithEyes';

export default {
  components: { InputWithEyes },
  data() {
    return {
      value: '',
      showPwd: false,
    };
  },
  methods: {},
};
</script>

<style lang="less" scoped></style>
