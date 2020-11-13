<template>
  <div class="wrap-page">
    <div class="wrap-text">
      <Icon type="md-checkmark-circle" />
      恭喜，重置密码成功
    </div>
    <div class="wrap-btn">
      <Button
        ghost
        long
        type="primary"
        :disabled="!btn.enable"
        @click="handleGoBack"
      >
        {{ btn.text }}
      </Button>
    </div>
  </div>
</template>

<script>
const COUNT_DOWN = 10;

export default {
  props: {
    teleNumber: {
      type: [Number, String],
      default: `17665234119 (test)`,
    },
  },
  data() {
    return {
      btn: {
        text: '返回登录页',
        timer: null,
        enable: true,
      },
    };
  },
  created() {
    this.onBtnCountDown();
  },
  methods: {
    handleGoBack() {
      clearInterval(this.btn.timer);
      this.btn.text = '... 正在跳转';
      this.btn.enable = false;
      this.$emit('on-navigate-back');
    },
    onBtnCountDown() {
      let countDown = COUNT_DOWN;
      this.btn.timer = setInterval(() => {
        countDown -= 1;
        this.btn.text = `返回登录页 (${countDown})`;
        if (countDown === 0) {
          this.handleGoBack();
        }
      }, 1000);
    },
  },
};
</script>

<style lang="less" scoped>
.wrap-text {
  margin-bottom: 40px;
  font-size: 20px;
  .ivu-icon {
    font-size: 40px;
    color: #19be6b;
  }
}
.wrap-btn {
  width: 300px;
}
</style>
