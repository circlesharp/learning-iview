<template>
  <div class="search-helper">
    <Form
      ref="searchHelperForm"
      :model="formContent"
      label-position="right"
      :label-width="90"
    >
      <div class="wrap-row">
        <FormItem label="姓名">
          <i-input v-model="formContent.name" />
        </FormItem>
        <FormItem label="手机号">
          <i-input v-model="formContent.phone" />
        </FormItem>
        <FormItem label="会员卡编号">
          <i-input v-model="formContent.cardReadonly" />
        </FormItem>
      </div>

      <div class="wrap-row">
        <FormItem label="标签">
          <i-input v-model="formContent.label" />
        </FormItem>
        <FormItem label="使用状态">
          <ButtonGroup>
            <Button
              v-for="(item, idx) in status"
              :key="idx"
              :type="idx === statusIdx ? 'primary' : 'default'"
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
  name: '', // 姓名
  phone: '', // 手机号
  cardReadonly: '', // 会员卡编号
  label: '', // 标签
  status: '', // 使用状态
};

export default {
  data() {
    return {
      statusIdx: 0,
      formContent: JSON.parse(JSON.stringify(originFormContent)),
      status: [
        { label: '全部', value: 0 },
        { label: '使用中', value: 111 },
        { label: '停用', value: 222 },
        { label: '未认证激活', value: 333 },
      ],
    };
  },
  methods: {
    onStatusChange(item, idx) {
      this.statusIdx = idx;
      this.formContent.status = item.value;
      console.log(item, idx);
    },
    onClear() {
      this.statusIdx = 0;
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
