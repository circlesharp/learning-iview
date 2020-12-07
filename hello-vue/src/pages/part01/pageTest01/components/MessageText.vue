<template>
  <div class="wrap-message">
    <div class="ivu-message-notice-content-text">
      <div class="ivu-message-custom-content ivu-message-warning">
        <i class="ivu-icon ivu-icon-ios-alert"></i>
        <span>提示：以下商品存在多个包装，请选择实际售卖商品</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.wrap-message {
  display: inline-block;
  padding-left: 20px;
  padding-right: 40px;
  height: 40px;
  line-height: 36px;
  font-size: 16px;
  background-color: #fff2dc;
  border-radius: 5px;
}
.ivu-icon {
  padding-right: 4px;
}
</style>
