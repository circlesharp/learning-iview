<template>
  <div>
    <div class="wrap-scroll">
      <Scroll
        :height="400"
        :distance-to-edge="10"
        :loading-text="loadingText"
        :on-reach-bottom="onReachBottom"
      >
        <div class="list" v-for="(item, idx) in lists" :key="idx">
          {{ idx }} - {{ item.Name }}
        </div>
      </Scroll>
    </div>
  </div>
</template>

<script>
import getRes from './mock/mock';

export default {
  data() {
    return {
      page: 0,
      loadingText: '加载中',
      lists: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      const res = getRes(this.page);
      if (!res) {
        this.loadingText = '没有了';
        return;
      }
      if (this.lists.length < res.total) {
        this.lists = this.lists.concat(res.data);
        this.page += 1;
      }
    },
    onReachBottom() {
      console.log('onReachBottom');
      return new Promise(resolve => {
        this.getList();
        resolve();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.wrap-scroll {
  background-color: #eee;
  padding: 10px;
  width: 300px;
  border: 1px solid #000;
  .list {
    background-color: #fff;
    border: 1px solid #000;
    height: 50px;
    margin-bottom: 5px;
  }
}
</style>
