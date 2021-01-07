<template>
  <div class="modal-slot deposit">
    <!-- 主弹框 -->
    <Form :model="formData" :rules="formRules" :label-width="80">
      <FormItem prop="name" label="用户姓名">
        {{ formData.name || '--' }}
      </FormItem>
      <FormItem prop="phone" label="联系方式">
        {{ formData.phone || '--' }}
      </FormItem>
      <FormItem prop="cardReadonly" label="会员卡编号">
        {{ formData.cardReadonly || '--' }}
      </FormItem>
      <FormItem prop="cardWritable" label="卡内余额">
        {{ formData.amount || '--' }}
      </FormItem>
      <FormItem prop="cardWritable" label="充值金额">
        <div class="deposit-input">
          <InputNumber
            v-model="formData.deposit"
            @on-change="onInputChange"
          />元
        </div>
        <div class="deposit-intut-tips">
          充值时，若减值充值，平台默认为充值额度，将扣取 5‰ 的手续费
        </div>
      </FormItem>
      <FormItem prop="labels" label="标签">
        <div class="wrap-labels">
          <Tag
            v-for="(item, idx) in formData.labels"
            :key="idx"
            closable
            color="primary"
            @on-close="onTagDel(idx)"
          >
            {{ item }}
          </Tag>
          <Button icon="ios-add" type="dashed" size="small" @click="onTagAdd">
            添加标签
          </Button>
        </div>
      </FormItem>
    </Form>
    <!-- 派生弹框 添加新标签弹框 -->
    <div class="wrap-new-tag-modal">
      <NewTagModal ref="newTagModal" @on-add-tag="handleAddTag" />
    </div>
  </div>
</template>

<script>
import constant from '../../../../../constant/constant';
import NewTagModal from '../newTagModal';

const { MAXSIZE } = constant.LABEL;
export default {
  components: { NewTagModal },
  data() {
    return {
      formData: {
        name: '',
        phone: '',
        cardReadonly: '',
        amount: '',
        deposit: null, // number
        labels: [],
      },
      formRules: {},
    };
  },
  methods: {
    /* 用于初始化充值表单，父级传入 params */
    handleFormData(params) {
      if (!params) return;
      this.formData.name = params.name;
      this.formData.phone = params.phone;
      this.formData.cardReadonly = params.cardReadonly;
      this.formData.amount = params.amount;
      this.formData.deposit = null;
      this.formData.labels = params.labels;
    },
    onInputChange() {
      if (!Number.isNaN(+this.formData.deposit))
        this.$emit('on-deposit-change', +this.formData.deposit);
    },
    /* 处理标签 删除一个标签 */
    onTagDel(idx) {
      this.formData.labels.splice(idx, 1);
    },
    /* 处理标签 点击添加标签 */
    onTagAdd() {
      if (this.formData.labels.length >= MAXSIZE) {
        const title = '提示';
        const content = `标签最多不能超过${MAXSIZE}个`;
        this.$Modal.warning({ title, content });
        return;
      }
      this.$refs.newTagModal.show();
    },
    /* 处理标签 添加一个标签 */
    handleAddTag(e) {
      this.formData.labels.push(e.tagContent);
    },
  },
};
</script>

<style lang="less" scoped>
.modal-slot.deposit {
  width: 400px;
  padding-right: 15px;
}
.deposit-input {
  display: flex;
  .ivu-input-number {
    margin-right: 10px;
    width: 100px;
  }
}
.deposit-intut-tips {
  line-height: 15px;
  height: 15px;
  margin-top: 10px;
  color: #ed4014;
}
</style>
