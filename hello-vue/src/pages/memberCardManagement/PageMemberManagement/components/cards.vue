<template>
  <div class="content">
    <Card v-for="(item, idx) in overviewInfo" :key="idx">
      <div class="card-content">
        <div class="value">{{ item.value }}</div>
        <div class="title">{{ item.title }}</div>
      </div>
    </Card>
    <Card>
      <div
        class="the-last-card"
        v-for="(item, idx) in overviewLastInfo"
        :key="idx"
      >
        <div class="title">{{ item.title }}</div>
        <div class="value">{{ item.value }}</div>
      </div>
    </Card>
  </div>
</template>

<script>
const tempNum = 12345;

export default {
  data() {
    return {};
  },
  computed: {
    overviewInfo() {
      const memberCnt = { title: '会员人数（人）' };
      const accMoney = { title: '累计充值余额（元）' };
      const curMoney = { title: '会员当前总余额 （元）' };
      memberCnt.value = tempNum;
      accMoney.value = tempNum;
      curMoney.value = tempNum;
      return { memberCnt, accMoney, curMoney };
    },
    overviewLastInfo() {
      const notActivited = { title: '未认证激活' };
      const using = { title: '使用中' };
      const notUsing = { title: '停用' };
      notActivited.value = tempNum;
      using.value = tempNum;
      notUsing.value = tempNum;
      return { notActivited, using, notUsing };
    },
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.wrap-overview .content {
  display: flex;
  .ivu-card {
    width: 270px;
    height: 115px;
    border-radius: 10px;
    background-color: #eee;
    + .ivu-card {
      margin-left: 10px;
    }
  }
  .card-content {
    .value {
      font-size: 30px;
    }
    .title {
      font-size: 10px;
    }
  }
  .the-last-card {
    display: flex;
    align-items: center;
    font-size: 16px;
    .title {
      font-size: 10px;
    }
  }
}
</style>
