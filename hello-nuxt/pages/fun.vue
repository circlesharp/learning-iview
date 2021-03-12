<template>
  <div>
    <h1>Page Fun</h1>

    <div class="helper">
      <div>{{ content }}</div>
      <button @click="refresh">Refresh</button>
    </div>

    <div class="router">
      two kinds of routing
      <NuxtLink to="/">Home page</NuxtLink>
      <a href="https://nuxtjs.org/docs/2.x/get-started/routing">nuxt routing</a>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'blog',
  asyncData() {
    return {
      content: 'Created At: ' + new Date(),
    };
  },
  methods: {
    refresh() {
      this.$nuxt.refresh();
    },
  },
};
</script>
