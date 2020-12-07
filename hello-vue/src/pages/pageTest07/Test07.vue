<template>
  <div>
    <h1>test 07: request params test</h1>

    <div class="wrap-operation"></div>

    <div class="wrap-btn">
      <Button @click="onChange">change</Button>
      <Button @click="onRequest">request</Button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      type: 'a',
      link: ['github', 'google', 'taobao'],
      userInfo: {
        name: 'Jimmy',
        sex: 'male',
      },
      a: {
        b: {
          c: 1,
          d: 2,
        },
        e: {
          f: 3,
          g: {
            h: 4,
            i: 5,
          },
        },
      },
    };
  },
  methods: {
    onChange() {
      this.type = 'b';
      this.link = ['github', 'taobao', 'youtube'];
      this.a.e = null;
    },
    onRequest() {
      const params = {
        page: this.page,
        type: this.type,
        link: this.link,
        a: this.a,
        userInfo: this.userInfo,
      };
      this.checkRequestParams(params);
      this.page += 1;
    },
  },
};
</script>

<style lang="less" scoped></style>
