<template>
  <div class="modal-slot add-member">
    <!-- 主弹框 -->
    <Form :model="formData" :rules="formRules" :label-width="80">
      <FormItem prop="name" label="用户姓名">
        <i-input v-model="formData.name" />
      </FormItem>
      <FormItem prop="phone" label="联系方式">
        <i-input v-model="formData.phone" />
      </FormItem>
      <FormItem prop="cardReadonly" label="会员卡编号">
        <i-input v-model="formData.cardReadonly" />
      </FormItem>
      <FormItem prop="cardWritable" label="会员卡串号">
        <i-input v-model="formData.cardWritable" />
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

const originFormData = {
  name: '',
  phone: '',
  cardReadonly: '', // 只读 会员卡编号
  cardWritable: '', // 可写 会员卡串号
  labels: [],
};

export default {
  components: { NewTagModal },
  data() {
    return {
      formData: JSON.parse(JSON.stringify(originFormData)),
      formRules: {},
    };
  },
  methods: {
    /* 用于编辑会员信息，父级传入 params */
    handleFormData(params) {
      if (!params) return;
      this.formData.name = params.name;
      this.formData.phone = params.phone;
      this.formData.cardReadonly = params.cardReadonly;
      this.formData.cardWritable = params.cardWritable;
      this.formData.labels = params.labels;
    },
    /* 用于刷新表单数据，父级主动调用 */
    refreshFormData() {
      this.formData = JSON.parse(JSON.stringify(originFormData));
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
.modal-slot.add-member {
  width: 400px;
  padding-right: 15px;
}
</style>
