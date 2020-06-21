<template>
  <div>
    <!--  -->
    <article>
      <h4>基础用法</h4>
      <i-input
        v-model="value"
        placeholder="Enter something..."
      ></i-input>
    </article>

    <!--  -->
    <article>
      <h4>尺寸</h4>
      <i-input v-model="value" size="large" placeholder="large-size" />
      <br />
      <i-input v-model="value" placeholder="default-size" />
      <br />
      <i-input v-model="value" size="small" placeholder="small-size" />
      <br />
    </article>

    <!--  -->
    <article>
      <h4>可清空</h4>
      <i-input
        v-model="value" placeholder="可清空按钮 ->"
        clearable
      />
    </article>

    <!--  -->
    <article>
      <h4>输入长度限制</h4>
      <i-input
        v-model="value" placeholder="placeholder"
        maxlength='6'
        show-word-limit
      />
      <i-input
        v-model="value" placeholder="placeholder"
        maxlength='16'
        show-word-limit
      />
    </article>

    <!--  -->
    <article>
      <h4>密码框</h4>
      <i-input
        v-model="value" placeholder="placeholder"
        type="password"
        password
      />
    </article>

    <!--  -->
    <article>
      <h4>带Icon的输入框</h4>
      <i-input
        v-model="value" placeholder="placeholder"
        icon="ios-clock-outline"
        @on-click="value='you press the icon'"
      />
    </article>

    <!--  -->
    <article>
      <h4>前缀和后缀图标</h4>
      <p style="margin: 10px;">Props: <span style="font-size: 10px">这里没有 on-click 的回调</span></p>
      <i-input
        v-model="value" placeholder="placeholder"
        prefix="ios-contact"
      />
      <i-input
        v-model="value" placeholder="placeholder"
        suffix="ios-search"
      />
      <p style="margin: 10px;">Slot: </p>
      <i-input
        v-model="value" placeholder="placeholder"
      >
        <Icon type="ios-contact" slot="prefix" />
      </i-input>
      <i-input
        v-model="value" placeholder="placeholder"
      >
        <Icon type="ios-search" slot="suffix" />
      </i-input>
    </article>

    <!--  -->
    <article>
      <h4>搜索型</h4>
      <i-input
        v-model="value" placeholder="placeholder"
        search
      />
      <i-input
        v-model="value" placeholder="placeholder"
        search
        enter-button
      />
      <i-input
        v-model="value" placeholder="placeholder"
        search
        enter-button="Search"
        @on-search="value='it work'"
      />
    </article>

    <!--  -->
    <article>
      <h4>文本域</h4>
      <i-input
        v-model="value" placeholder="placeholder"
        type="textarea"
      />
      <i-input
        v-model="value" placeholder="placeholder"
        type="textarea"
        :rows="4"
      />
    </article>

    <!--  -->
    <article>
      <h4>适应文本高度的文本域</h4>
      <i-input
        v-model="value" placeholder="placeholder"
        type="textarea"
        autosize
      />
      <i-input
        v-model="value" placeholder="placeholder"
        type="textarea"
        :autosize="{minRows: 2, maxRows: 5}"
      />
    </article>

    <!--  -->
    <article>
      <h4>禁用状态</h4>
      <i-input
        v-model="value" placeholder="placeholder"
        disabled
      />
      <i-input
        v-model="value" placeholder="placeholder"
        disabled
        type="textarea"
      />
    </article>

    <!--  -->
    <article>
      <h4>复合型输入框: {{composed}}</h4>
      <i-input
        v-model="value" placeholder="placeholder"
        style="width: auto;"
      >
        <span slot="prepend">http://</span>
        <span slot="append">.com</span>
      </i-input>
      <br />
      <i-input
        v-model="value" placeholder="placeholder"
        style="width: auto;"
      >
        <Select
          v-model="select1"
          slot="prepend"
          style="width: 100px;"
        >
          <Option value="http">http://</Option>
          <Option value="https">https://</Option>
        </Select>
        <Select
          v-model="select2"
          slot="append"
          style="width: 80px;"
        >
          <Option value="com">.com</Option>
          <Option value="org">.org</Option>
          <Option value="io">.io</Option>
        </Select>
      </i-input>
    </article>

    <!--  -->
    <article>
      <h4>输入时格式化展示</h4>
      <Poptip trigger="focus">
        <i-input v-model="value" prefix="logo-usd" placeholder="enter a number" />
        <div slot="content">{{ formatNumber }}</div>
      </Poptip>
    </article>

  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      value: '',
      select1: 'http',
      select2: 'io'
    }
  },
  computed: {
    composed () {
      return `${this.select1}://${this.value}.${this.select2}`
    },
    formatNumber () {
      if (this.value === '') return 'please enter a number'
      const regex = /\B(?=(\d{3})+(?!\d))/g
      return '$ ' + this.value.toString().replace(regex, ',')
    },
  },
  mounted() {
    // console.log(this.$refs.search)
  }
}
</script>

<style lang="less" scoped>
  .ivu-input-wrapper {
    margin: 5px 10px;
    width: 200px;
  }
</style>
