<template>
  <div class="search-helper">
    <Form
      ref="searchHelperForm"
      :model="formContent"
      label-position="right"
      :label-width="90"
    >
      <div class="wrap-row">
        <FormItem label="充值时间">
          <DatePicker
            transfer
            type="daterange"
            placement="bottom-end"
            placeholder="请选择充值时间"
            style="width: 100%"
            v-model="formContent.date"
          />
        </FormItem>
        <FormItem label="用户手机号">
          <i-input v-model="formContent.phone" />
        </FormItem>
        <FormItem label="会员卡编号">
          <i-input v-model="formContent.cardReadonly" />
        </FormItem>
      </div>

      <div class="wrap-row">
        <FormItem label="充值来源">
          <ButtonGroup>
            <Button
              v-for="(item, idx) in depositWay"
              :key="idx"
              :type="idx === depositWayIdx ? 'primary' : 'default'"
              @click="onStatusChange(item, idx)"
            >
              {{ item.label }}
            </Button>
          </ButtonGroup>
        </FormItem>
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
  phone: '', // 手机号
  cardReadonly: '', // 会员卡编号
  depositWay: '', // 充值来源
};

export default {
  data() {
    return {
      depositWayIdx: 0,
      formContent: JSON.parse(JSON.stringify(originFormContent)),
      depositWay: [
        { label: '全部', value: 0 },
        { label: '退款', value: 111 },
        { label: '余额充值', value: 222 },
      ],
    };
  },
  methods: {
    onStatusChange(item, idx) {
      this.depositWayIdx = idx;
      this.formContent.depositWay = item.value;
      console.log(item, idx);
    },
    onClear() {
      this.depositWayIdx = 0;
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
