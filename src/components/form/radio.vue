<template>
  <div>
    <!--  -->
    <article>
      <h4>单独使用</h4>
      <Radio v-model="single">Radio</Radio>
    </article>

    <!--  -->
    <article>
      <h4>组合使用<span>: {{phone}}</span> + on-change</h4>
      <RadioGroup v-model="phone"
        @on-change="handleRadioGroupChange"
      >
        <Radio label="apple">
          <Icon type="logo-apple"></Icon>
          <span>Apple</span>
        </Radio>
        <Radio label="android">
          <Icon type="logo-android"></Icon>
          <span>Android</span>
        </Radio>
        <Radio label="windows">
          <Icon type="logo-windows"></Icon>
          <span>Windows</span>
        </Radio>
      </RadioGroup>
    </article>

    <!--  -->
    <article>
      <h4>不可用 + size</h4>
      <Radio v-model="disableSingle" disabled size="large">disabled</Radio>
      <RadioGroup v-model="disableGroup" size="small">
        <Radio label="pig" disabled></Radio>
        <Radio label="dog"></Radio>
        <Radio label="bird"></Radio>
      </RadioGroup>
    </article>

    <!--  -->
    <article>
      <h4>垂直</h4>
      <RadioGroup v-model="phone" vertical>
        <Radio label="apple">
          <Icon type="logo-apple"></Icon>
          <span>Apple</span>
        </Radio>
        <Radio label="android">
          <Icon type="logo-android"></Icon>
          <span>Android</span>
        </Radio>
        <Radio label="windows">
          <Icon type="logo-windows"></Icon>
          <span>Windows</span>
        </Radio>
      </RadioGroup>
    </article>

    <!--  -->
    <article>
      <h4>按钮样式</h4>
      <RadioGroup v-model="button" type="button">
        <Radio label="BeiJing"></Radio>
        <Radio label="ShangHai" disabled></Radio>
        <Radio label="ShenZhen"></Radio>
        <Radio label="HangZhou"></Radio>
      </RadioGroup>
    </article>

    <!--  -->
    <article>
      <h4>显示边框</h4>
      <RadioGroup v-model="border">
        <Radio border label="BeiJing"></Radio>
        <Radio border label="ShangHai" disabled></Radio>
        <Radio border label="ShenZhen"></Radio>
        <Radio border label="HangZhou"></Radio>
      </RadioGroup>
    </article>
  </div>
</template>

<script>
export default {
  name: 'radio',
  data() {
    return {
      single: false,
      phone: 'windows',
      disableSingle: true,
      disableGroup: 'dog',
      button: 'ShenZhen',
      border: 'BeiJing'
    }
  },
  methods: {
    handleRadioGroupChange(rst) {
      // 通过修改外部的数据改变时不会触发
      console.log('handleRadioGroupChange ->', this.phone, rst)
    }
  }
}
</script>script>  

<style lang="less" scoped>

</style>
