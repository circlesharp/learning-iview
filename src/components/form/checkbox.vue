<template>
  <div>
    <!--  -->
    <article>
      <h4>单独使用</h4>
      <Checkbox v-model="single">Checkbox</Checkbox>
    </article>

    <!--  -->
    <article>
      <h4>组合使用</h4>
      <CheckboxGroup v-model="fruit">
        <p>the result: {{!!fruit.length ? fruit : 'no choice yet'}}</p>
        <Checkbox label="香蕉"></Checkbox>
        <Checkbox label="苹果"></Checkbox>
        <Checkbox label="西瓜"></Checkbox>
      </CheckboxGroup>
    </article>

    <!--  -->
    <article>
      <h4>与其它组件通信</h4>
      <Checkbox v-model="checked" :disabled="disabled">
        <span v-if="checked">Checked</span>
        <span v-else>Unchecked</span>
        -
        <span v-if="!disabled">Usable</span>
        <span v-else>Disabled</span>
      </Checkbox>
      <br>
      <Button type="primary" ghost size="small"
        @click="checked = !checked"
      >toggleChecked</Button>
      <Button type="primary" ghost size="small"
        @click="disabled = !disabled"
      >toggleDisabled</Button>
    </article>

    <!--  -->
    <article>
      <h4>全选（代码挺巧妙的）</h4>
        <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
        <Checkbox
          :indeterminate="indeterminate"
          :value="checkAll"
          @click.prevent.native="handleCheckAll"
        >全选</Checkbox>
        <CheckboxGroup
          v-model="checkAllGroup"
          @on-change="checkAllGroupChange"
        >
          <Checkbox label='bj'></Checkbox>
          <Checkbox label='sz'></Checkbox>
          <Checkbox label='sh'></Checkbox>
        </CheckboxGroup>
    </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'checkbox',
  data() {
    return {
      single: false,
      fruit: [], // 初始化的时候就需要使数组
      checked: true,
      disabled: false,
      indeterminate: true,
      checkAll: false,
      checkAllGroup: [],
      allCity: ['bj', 'sz', 'sh'],
    }
  },
  methods: {
    handleCheckAll() {
      if (this.indeterminate) { // 状态未知
        this.checkAll = false
      } else {
        this.checkAll = !this.checkAll
      }
      this.indeterminate = false // 结束未知状态

      if (this.checkAll) {
        this.checkAllGroup = this.allCity
      } else {
        this.checkAllGroup = []
      }
    },
    checkAllGroupChange(rst) { // 事件带参数
      if (rst.length === this.allCity.length) {
        this.indeterminate = false
        this.checkAll = true
      } else if (rst.length > 0) {
        this.indeterminate = true
        this.checkAll = false
      } else {
        this.indeterminate = false
        this.checkAll = false
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
