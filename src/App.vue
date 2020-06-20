<template>
<div>
  <h1>Learning iview</h1>
  <h2>basic-component</h2>
  <ButtonGroup shape="circle" style="margin: 20px 10px;">
    <Button to="/button" type="primary" ghost>Button</Button>
    <Button to="/icon" type="primary" ghost>Icon</Button>
    <Button to="/grid" type="primary" ghost>Grid</Button>
  </ButtonGroup>
  <h2>layout</h2>
  <ButtonGroup shape="circle" style="margin: 20px 10px;">
    <Button to="/layout/basic" type="primary" ghost>LayoutBasic</Button>
    <Button to="/layout/layout-1" type="primary" ghost>Layout-1</Button>
    <Button to="/layout/layout-2" type="primary" ghost>Layout-2</Button>
  </ButtonGroup>
  <router-view></router-view>
</div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
</style>
