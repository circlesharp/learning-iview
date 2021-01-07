<template>
  <div class="multi-operator">
    <div class="area-left">
      <Button
        v-for="(item, idx) in leftBtns"
        type="primary"
        :key="idx"
        :disabled="isSelectedBatchDisabled"
        @click="item.method"
      >
        {{ item.label }}
      </Button>
    </div>
    <div class="area-right">
      <Button
        v-for="(item, idx) in rightBtns"
        type="primary"
        :key="idx"
        :icon="item.icon"
        @click="item.method"
      >
        {{ item.label }}
      </Button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isSelectedBatchDisabled: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      leftBtns: [
        {
          label: '批量导出会员二维码',
          method: this.onBatchExportMemberQR,
        },
        {
          label: '批量停用',
          method: this.onBatchTerminate,
        },
        {
          label: '批量启用',
          method: this.onBatchActivate,
        },
      ],
      rightBtns: [
        {
          label: '添加会员',
          method: this.addMember,
          icon: 'ios-add-circle-outline',
        },
        {
          label: '批量添加会员',
          method: this.onBatchAddMember,
          icon: 'ios-cloud-upload-outline',
        },
        {
          label: '批量充值',
          method: this.onBatchDeposit,
          icon: 'ios-cloud-upload-outline',
        },
      ],
    };
  },
  methods: {
    /* 按钮操作 批量导出会员二维码 */
    onBatchExportMemberQR() {
      console.log('onBatchExportMemberQR');
    },
    /* 按钮操作 批量停用 */
    onBatchTerminate() {
      this.$emit('on-operate', { operation: 'onBatchTerminate' });
    },
    /* 按钮操作 批量启用 */
    onBatchActivate() {
      this.$emit('on-operate', { operation: 'onBatchActivate' });
    },
    /* 按钮操作 添加会员 */
    addMember() {
      this.$emit('on-operate', { operation: 'addMember' });
    },
    /* 按钮操作 批量添加会员 */
    onBatchAddMember() {
      this.$emit('on-operate', { operation: 'batchAddMember' });
    },
    /* 按钮操作 批量充值 */
    onBatchDeposit() {
      this.$emit('on-operate', { operation: 'batchDeposit' });
    },
  },
};
</script>

<style lang="less" scoped>
.multi-operator {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  .area-left {
    .ivu-btn {
      margin-right: 10px;
    }
  }
  .area-right {
    .ivu-btn {
      margin-left: 10px;
    }
  }
}
</style>
