<template>
<div>
  <h1>Learning iview</h1>
  <ButtonGroup shape="circle" style="margin: 20px 0;">
    <Button to="/button" type="primary" ghost>Button</Button>
    <Button to="/icon" type="primary" ghost>Icon</Button>
    <Button to="/grid" type="primary" ghost>Grid</Button>
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
