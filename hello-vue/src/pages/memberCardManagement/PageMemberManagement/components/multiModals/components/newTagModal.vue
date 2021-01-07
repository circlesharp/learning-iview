<template>
  <div class="new-tag-modal">
    <Modal v-model="isShow" title="添加标签" width="300">
      <Form :model="modalData" :rules="modalRules" :label-width="60">
        <FormItem prop="name" label="新标签名">
          <Input v-model="modalData.tagContent" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="handleAddTag">确定添加</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import constant from '../../../../constant/constant';

const { MAXLENGTH } = constant.LABEL;

const originModalData = {
  tagContent: '',
};

export default {
  data() {
    return {
      /* 此modal的显示隐藏 */
      isShow: false,
      /* 每个tag的字数 */
      tagMaxLength: MAXLENGTH,
      /* form 的 data */
      modalData: JSON.parse(JSON.stringify(originModalData)),
      /* form 的 rules */
      modalRules: {},
    };
  },
  methods: {
    show() {
      this.isShow = true;
    },
    hide() {
      /* 刷新数据 */
      this.refreshModalData();

      this.isShow = false;
    },
    /* 处理标签 增加一个标签 */
    handleAddTag() {
      /* 触发事件，此处只保证单个 tag 的字数长度合法，父组件判断是否超过 tags 的个数 */
      this.$emit('on-add-tag', this.modalData);

      this.hide();
    },
    refreshModalData() {
      this.modalData = JSON.parse(JSON.stringify(originModalData));
    },
  },
};
</script>

<style></style>
