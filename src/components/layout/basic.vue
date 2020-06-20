<template>
  <div>
    <h4>1</h4>
    <Layout>
      <Header>Header</Header>
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Layout>

    <h4>2</h4>
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Sider hide-trigger>Sider</Sider>
        <Content>Content</Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>

    <h4>3</h4>
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Content>Content</Content>
        <Sider hide-trigger>Sider</Sider>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>

    <h4>4</h4>
    <Layout>
      <Sider hide-trigger>Sider</Sider>
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>

  </div>
</template>

<script>
export default {
  name: 'basic',

}
</script>

<style lang="less" scoped>
.ivu-layout-header {
  background: #999;
}
.ivu-layout-content {
  height: 100px;
  background: #aaa;
}
.ivu-layout-footer {
  background: #ccc;
}
</style>
