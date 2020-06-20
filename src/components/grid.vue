<template>
  <div>
    <h4>基本用法</h4>
    <Row>
      <i-col span="12">col-12</i-col>
      <i-col span="12">col-12</i-col>
    </Row>
    <Row>
      <i-col span="8">col-8</i-col>
      <i-col span="8">col-8</i-col>
      <i-col span="8">col-8</i-col>
    </Row>
    <Row>
      <i-col span="6">col-6</i-col>
      <i-col span="6">col-6</i-col>
      <i-col span="6">col-6</i-col>
      <i-col span="6">col-6</i-col>
    </Row>
    <h4>区块间隔</h4>
    <Row :gutter="16">
      <i-col span="6"><div class="gutter-div">col-6</div></i-col>
      <i-col span="6"><div class="gutter-div">col-6</div></i-col>
      <i-col span="6"><div class="gutter-div">col-6</div></i-col>
      <i-col span="6"><div class="gutter-div">col-6</div></i-col>
    </Row>
    <!-- 注意 type 与 className 的变化 -->
    <h4>栅格顺序(Flex)</h4>
    <Row type="flex">
      <i-col span="6" order="4">1 | order-4</i-col>
      <i-col span="6" order="3">2 | order-3</i-col>
      <i-col span="6" order="2">3 | order-2</i-col>
      <i-col span="6" order="1">4 | order-1</i-col>
    </Row>

    <!--  -->
    <h4>栅格排序(push, pull)</h4>
    <Row>
      <i-col span="18" push="6">col-18 | push-6</i-col>
      <i-col span="6" pull="18">col-6 | pull-18</i-col>
    </Row>

    <!--  -->
    <h4>左右偏移</h4>
    <Row>
      <i-col span="8">col-8</i-col>
      <i-col span="8" offset="8">col-8 | offset-8</i-col>
    </Row>
    <br />
    <Row>
      <i-col span="6" offset="8">col-6 | offset-8</i-col>
      <i-col span="6" offset="4">col-6 | offset-4</i-col>
    </Row>
    <br />
    <Row>
      <i-col span="12" offset="8">col-12 | offset-8</i-col>
      <br>
      <i-col span="12" push="8">col-12 | push-8</i-col>
    </Row>
    <br />

    <!--  -->
    <h4>Flex布局</h4>
    <p>子元素向左排列</p>
    <Row type="flex" justify="start">
      <i-col span="4">col-4</i-col>
      <i-col span="4">col-4</i-col>
      <i-col span="4">col-4</i-col>
      <i-col span="4">col-4</i-col>
    </Row>
    <p>子元素向右排列</p>
    <Row type="flex" justify="end">
      <i-col span="4">col-4</i-col>
      <i-col span="4">col-4</i-col>
      <i-col span="4">col-4</i-col>
      <i-col span="4">col-4</i-col>
    </Row>
    <p>子元素居中排列</p>
    <Row type="flex" justify="center">
      <i-col span="4">col-4</i-col>
      <i-col span="4">col-4</i-col>
      <i-col span="4">col-4</i-col>
      <i-col span="4">col-4</i-col>
    </Row>
    <p>子元素等宽排列</p>
    <Row type="flex" justify="space-between">
      <i-col span="4">col-4</i-col>
      <i-col span="4">col-4</i-col>
      <i-col span="4">col-4</i-col>
      <i-col span="4">col-4</i-col>
    </Row>
    <p>子元素分散排列</p>
    <Row type="flex" justify="space-around">
      <i-col span="4">col-4</i-col>
      <i-col span="4">col-4</i-col>
      <i-col span="4">col-4</i-col>
      <i-col span="4">col-4</i-col>
    </Row>

    <!--  -->
    <h4>Flex对齐</h4>
    <p>顶部对齐</p>
    <Row type="flex" justify="center" align="top" style="height: 120px;">
      <i-col span="4"><p style="height: 80px;">col-4</p></i-col>
      <i-col span="4"><p style="height: 30px;">col-4</p></i-col>
      <i-col span="4"><p style="height: 100px;">col-4</p></i-col>
      <i-col span="4"><p style="height: 60px;">col-4</p></i-col>
    </Row>
    <p>底部对齐</p>
    <Row type="flex" justify="center" align="bottom" style="height: 120px;">
      <i-col span="4"><p style="height: 80px;">col-4</p></i-col>
      <i-col span="4"><p style="height: 30px;">col-4</p></i-col>
      <i-col span="4"><p style="height: 100px;">col-4</p></i-col>
      <i-col span="4"><p style="height: 60px;">col-4</p></i-col>
    </Row>
    <p>居中对齐</p>
    <Row type="flex" justify="center" align="middle" style="height: 120px;">
      <i-col span="4"><p style="height: 80px;">col-4</p></i-col>
      <i-col span="4"><p style="height: 30px;">col-4</p></i-col>
      <i-col span="4"><p style="height: 100px;">col-4</p></i-col>
      <i-col span="4"><p style="height: 60px;">col-4</p></i-col>
    </Row>

    <!--  -->
    <h4>响应式布局</h4>
    <Row>
      <i-col :xs="2" :sm="4" :md="6" :lg="8">Col</i-col>
      <i-col :xs="20" :sm="16" :md="12" :lg="8">Col</i-col>
      <i-col :xs="2" :sm="4" :md="6" :lg="8">Col</i-col>
    </Row>

    <!--  -->
    <h4>其它属性的响应式</h4>
    <Row>
      <i-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">Col</i-col>
      <i-col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }">Col</i-col>
      <i-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">Col</i-col>
    </Row>

  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="less" scoped>
.ivu-row >*:nth-child(odd) {
  background: #ececec;
}
.ivu-row >*:nth-child(even) {
  background: #ddd;
}
.ivu-row-flex >*:nth-child(odd) {
  background: #ececec;
}
.ivu-row-flex >*:nth-child(even) {
  background: #ddd;
}
.ivu-col {
  margin-top: 10px;
  margin-bottom: 10px;
  // height: 30px;
}
.gutter-div {
  height: 100%;
  background: #ccc;
}
</style>
