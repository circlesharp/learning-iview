<template>
  <div>
    <h1>router</h1>
    <p>user id: {{ userId }}</p>

    <div class="wrap-scroll">
      <TestScroll />
    </div>

    <div class="wrap-children">
      here is the router-view
      <router-view></router-view>
    </div>

    <div class="warp-btn">
      <Button @click="onGo">go</Button>
      <Button @click="onGoBack">goBack</Button>
    </div>
  </div>
</template>

<script>
import TestScroll from '../pageTest05/Test05';

export default {
  components: { TestScroll },
  data() {
    return {};
  },

  computed: {
    userId() {
      return this.$route.params.id;
    },
  },
  watch: {
    $route(to, from) {
      // 动态路由匹配会复用组件，生命周期钩子不起作用
      // 所以可以通过 watch $route 来发现
      // 或者，路由卫士
      console.log(to, from);
    },
  },
  created() {
    this.showRoute();
  },
  methods: {
    showRoute() {
      console.log('this.$route', this.$route);
      console.log('this.$router', this.$router); // this.$router 就是 router
    },
    onGo() {
      this.pushUsingName();
      // this.pushUsingPath();
    },
    onGoBack() {
      this.$router.go(-1);
    },
    pushUsingName() {
      this.$router.push({
        name: 'test06',
        params: {
          id: 'circlesharp',
        },
        query: {
          q: 'q',
        },
      });
    },
    pushUsingPath() {
      /* 如果提供了 path, params 会被忽略（query 不会） */
      this.$router.push({
        path: '/test05?q=path',
        query: {
          p: 'never',
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.wrap-children {
  min-height: 50px;
  background-color: #eee;
  border: 1px solid #fff;
}
</style>
