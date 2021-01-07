<template>
  <div class="modal-slot patch">
    <!-- part 1 download -->
    <div class="wrapper wrap-download">
      <div class="title">{{ downloadTitle }}</div>
      <div class="content">
        <Button @click="onDownload">下载CSV模板</Button>
      </div>
    </div>

    <!-- part 2 upload -->
    <div class="wrapper wrap-upload">
      <div class="title">{{ uploadTitle }}</div>
      <div class="content">
        <Upload
          multiple
          type="drag"
          action="//jsonplaceholder.typicode.com/posts/"
        >
          <div style="padding: 20px 0">
            <Icon
              type="ios-cloud-upload"
              size="52"
              style="color: #3399ff"
            ></Icon>
            <p>将文件拖入虚线框内，仅支持CSV模板导入</p>
          </div>
        </Upload>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      batchType: 'addMember',
    };
  },
  computed: {
    downloadTitle() {
      if (this.batchType === 'addMember')
        return '1.请先下载会员信息表，并按要求填写。';
      if (this.batchType === 'deposit')
        return '1.下载会员信息表，在表格内填写充值金额';
      return '1.请下载模板，并按模板格式填写';
    },
    uploadTitle() {
      if (this.batchType === 'addMember')
        return '2.上传已填写的批量会员添加信息表';
      if (this.batchType === 'deposit')
        return '2.上传已填写的批量会员充值信息表';
      return '2.上传已填写的会员信息表';
    },
  },
  methods: {
    handleFormData(params) {
      this.batchType = params.batchType;
    },

    onDownload() {
      if (this.batchType === 'addMember') this.downAddMember();
      if (this.batchType === 'deposit') this.downDeposit();
    },
    downAddMember() {
      console.log('downAddMember');
    },
    downDeposit() {
      console.log('downDeposit');
    },
  },
};
</script>

<style lang="less" scoped>
.modal-slot.patch {
  width: 400px;
  padding-right: 15px;
}

.wrapper {
  margin-bottom: 20px;
  .title {
    margin-bottom: 10px;
    font-size: 14px;
  }
  .content {
    margin-left: 20px;
  }
}
</style>
