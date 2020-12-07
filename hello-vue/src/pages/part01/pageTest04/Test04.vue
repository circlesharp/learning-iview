<template>
  <div>
    window.open
    <Button @click="goBaidu">url-baidu</Button>
    <Button @click="goGithub">url-github</Button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: {
        baidu: 'http://www.baidu.com',
        github: 'http://www.github.com',
      },
      cnt: 0,
    };
  },
  methods: {
    goBaidu() {
      this.cnt += 1;
      const name = `name-baidu-${this.cnt}`; // 如果名字不变的话，会覆盖掉
      window.open(this.url.baidu, name);
    },
    goGithub() {
      this.cnt += 1;
      const name = `name-github-${this.cnt}`;
      window.open(this.url.github, name);
    },
  },
};
</script>
