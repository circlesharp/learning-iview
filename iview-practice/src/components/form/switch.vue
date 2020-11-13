<template>
  <div>
    <article>
      <h4>基本 {{switch1}} + size</h4>
      <i-switch
        v-model="switch1"
        size="small"
        @on-change="change"
      ></i-switch>
    </article>

    <!--  -->
    <article>
      <h4>文字和图标</h4>
      <i-switch v-model="switch1" @on-change="change">
        <span slot="open">开</span>
        <span slot="close">关</span>
      </i-switch>
      <i-switch v-model="switch1" @on-change="change">
        <Icon type="md-checkmark" slot="open">开</Icon>
        <Icon type="md-close" slot="close">关</Icon>
      </i-switch>
    </article>

    <article>
      <h4>加载中</h4>
      <i-switch :value="true" loading />
    </article>

    <article>
      <h4>自定义颜色 + 阻止切换</h4>
      <i-switch v-model="switch1" @on-change="change"
        true-color="#13ce66"
        false-color="#ececec"
        :before-change="handleBeforeChange"
      />
    </article>

  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      switch1: false,
    }
  },
  methods: {
    change(status) {
      this.$Message.info('开关状态：'+ status)
    },
    handleBeforeChange() {
      return new Promise(resolve => {
        this.$Modal.confirm({
          title: '确认切换',
          content: 'are you sure to switch?',
          onOk: () => resolve(),
        })
      })
    }
  }
}
</script>script>  

<style lang="less" scoped>

</style>
