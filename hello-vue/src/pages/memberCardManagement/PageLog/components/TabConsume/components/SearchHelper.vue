<template>
  <div class="search-helper">
    <Form
      ref="searchHelperForm"
      :model="formContent"
      label-position="right"
      :label-width="90"
    >
      <div class="wrap-row">
        <FormItem label="消费时间">
          <DatePicker
            transfer
            type="daterange"
            placement="bottom-end"
            placeholder="请选择消费时间"
            style="width: 100%"
            v-model="formContent.date"
          />
        </FormItem>
        <FormItem label="订单号">
          <i-input v-model="formContent.orderID" />
        </FormItem>
        <FormItem label="会员卡编号">
          <i-input v-model="formContent.cardReadonly" />
        </FormItem>
      </div>

      <div class="wrap-row">
        <FormItem label="设备名称">
          <i-input v-model="formContent.devideName" />
        </FormItem>
        <!-- 占位用 -->
        <FormItem></FormItem>
        <FormItem>
          <div class="wrap-btns">
            <Button class="btn" type="primary" ghost @click="onClear">
              重置
            </Button>
            <Button class="btn" type="primary" @click="onSearch">
              搜索
            </Button>
          </div>
        </FormItem>
      </div>
    </Form>
  </div>
</template>

<script>
/* 本组件主要的贡献是处理 params */

const originFormContent = {
  date: '', // 时间
  orderID: '', // 订单号
  cardReadonly: '', // 会员卡编号
  devideName: '', // 设备名称
};

export default {
  data() {
    return {
      formContent: JSON.parse(JSON.stringify(originFormContent)),
    };
  },
  methods: {
    onClear() {
      this.formContent = JSON.parse(JSON.stringify(originFormContent));
    },
    onSearch() {
      const params = this.formContent;
      this.$emit('on-search', params);
    },
  },
};
</script>

<style lang="less" scoped>
.search-helper {
  padding-top: 20px;
  padding-right: 30px;
  border: 1px solid #eee;
  border-radius: 10px;
}
.wrap-row {
  display: flex;
  & > div {
    flex: 1;
  }
  .wrap-btns {
    text-align: right;
    .btn {
      display: inline-block;
      margin-right: 20px;
    }
  }
}
</style>
