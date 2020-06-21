<template>
  <div>
    <!--  -->
    <article>
      <h4>基础用法 + 禁用右上角 + 禁用遮罩层</h4>
      <Button type="primary" @click="modal1=true">Display</Button>
      <Modal
        v-model="modal1"
        ref="modal1"
        title="Common Modal"
        :closable="false"
        :mask-closable="false"
        @on-ok="ok"
        @on-cancel="cancel"
      >基础用法 + 禁用右上角 + 禁用遮罩层</Modal>
    </article>

    <!--  -->
    <article>
      <h4>自定义样式</h4>
      <Button @click="modal2 = true">Custom header and footer</Button>
      <Button @click="modal3 = true">i18n</Button>
      <Modal v-model="modal2" width="360" ref="modal2">
        <p slot="header" style="color: #f60; text-align: center">
          <Icon type="ios-information-circle"></Icon>
          <span>Custom header</span>
        </p>
        <div style="text-align=center">
          <p>content</p>
          <p>placeholder</p>
        </div>
        <div slot="footer">
          <Button type="primary" @click="costomSubmit">提交</Button>
        </div>
      </Modal>
      <Modal v-model="modal3" title="this is a title" ok-text="ok" cancel-text="Cancel">
        <p>please use English!</p>
        <p>i18n just means the title, ok-text, cancel-text in English.</p>
      </Modal>
    </article>

    <!--  -->
    <article>
      <h4>异步关闭</h4>
      <Button @click="modal4 = true">异步关闭</Button>
      <Modal
        v-model="modal4"
        ref="modal4"
        title="Title"
        ok-text="ok"
        :loading="loading"
        @on-ok="asyncOK"
      >this modal will close in 2 seconds only after you click ok</Modal>
    </article>

    <!--  -->
    <article>
      <h4>自定义位置</h4>
      <Button @click="modal5=true">20px from the top</Button>
      <!-- 仔细看，是 :styles 这个 props， 影响的是 .ivu-modal -->
      <Modal title="20px from the top" v-model="modal5" :styles="{top: '20px'}">20px from the top</Modal>
      <Button @click="modal6=true">Vertical center</Button>
      <!-- 若要魔改样式，可以通过 class-name 设置，但是 不能 scoped -->
      <Modal
        title="Vertical center"
        v-model="modal6"
        class-name="vertical-center-modal"
      >Vertical center</Modal>
    </article>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,
      modal5: false,
      modal6: false,
      loading: true
    };
  },
  methods: {
    ok() {
      this.$Message.info("clicked ok");
    },
    cancel() {
      this.$Message.warning("clicked cancel");
    },
    costomSubmit() {
      this.$refs.modal2.ok();
    },
    asyncOK() {
      setTimeout(() => {
        this.modal4 = false; // 这么简单?
        this.ok();
      }, 500);
    },
    __theFalseAsyncOK() {
      // 错误示范
      console.log("countdown 2s");
      setTimeout(() => {
        console.log("2s runs out");
        this.$refs.modal4.ok();
      }, 2000);
    }
  }
};
</script>

<style lang="less">
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal {
    top: 0px;
  }
}
</style>
