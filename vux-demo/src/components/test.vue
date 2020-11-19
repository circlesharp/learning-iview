<template>
  <div class="test">
    <Step :current="2"/>
    <XInput />
  </div>
</template>

<script>
import Step from './step';
import XInput from './myXInput';

export default {
  components: { Step, XInput },
};
</script>

<style lang="less" scoped>

</style>
