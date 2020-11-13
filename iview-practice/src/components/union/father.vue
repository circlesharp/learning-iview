<template>
  <div>
    <button @click="change">change array ids</button>
  </div>
</template>

<script>
  export default{
    name: 'test',
    props: {
      ids: { type: Array, default: () => [] },
    },
    methods: {
      change() {
        
      },
    }
  }
</script>

<style>
</style>
