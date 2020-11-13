<template>
  <div>
    <div class="wrap-step">
      <Steps :current="current">
        <Step title="验证账号"></Step>
        <Step title="发送验证码"></Step>
        <Step title="修改密码"></Step>
        <Step title="完成"></Step>
      </Steps>
    </div>
    <div class="wrap-content">
      <Page1 v-if="current === 0" @on-next="onNext" />
      <Page2 v-if="current === 1" :account="account" @on-next="onNext" />
      <Page3 v-if="current === 2" @on-next="onNext" />
      <Page4 v-if="current === 3" @on-navigate-back="onNavigateBack" />
    </div>
  </div>
</template>

<script>
import Page1 from './components/page1';
import Page2 from './components/page2';
import Page3 from './components/page3';
import Page4 from './components/page4';

export default {
  components: { Page1, Page2, Page3, Page4 },
  data() {
    return {
      current: 0,
      account: '',
    };
  },
  methods: {
    onNext(step, msg) {
      switch (step) {
        case 0:
          this.account = msg.account;
          this.current += 1;
          return;
        default:
          this.current += 1;
      }
    },
    onNavigateBack() {
      console.log('onNavigateBack');
    },
  },
};
</script>

<style lang="less" scoped>
.wrap-step {
  width: 80%;
  padding-left: 20%;
  margin-bottom: 40px;
}
.wrap-content {
  /deep/ .wrap-page {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
