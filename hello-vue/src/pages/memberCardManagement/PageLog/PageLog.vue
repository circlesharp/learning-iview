<template>
  <div class="page-member-log">
    <div class="nothing">流水记录</div>

    <!-- 1 XX卡概况 -->
    <div class="wrap-overview wraper">
      <div class="title">{{ title.overview }}</div>
      <!-- 多张 overview 小卡片 -->
      <div class="wrap-cards">
        (多张 overview 小卡片)
      </div>
    </div>

    <!-- 2 流水记录 -->
    <div class="wrap-logs wraper">
      <div class="title">{{ title.logs }}</div>
      <div class="wrap-tabs">
        <Tabs value="logDeposit">
          <TabPane label="充值流水" name="logDeposit">
            <TabDeposit ref="tabDeposit" />
          </TabPane>
          <TabPane label="消费流水" name="logConsume">
            <TabConsume ref="tabConsume" />
          </TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script>
import TabDeposit from './components/TabDeposit/TabDeposit';
import TabConsume from './components/TabConsume/TabConsume';

export default {
  name: 'PageLog',
  components: { TabDeposit, TabConsume },
  data() {
    return {};
  },
  computed: {
    title() {
      const card = this.cardName || 'test-member-card';
      const overview = `${card} - 概况`;
      const logs = '流水记录';
      return { overview, logs };
    },
  },
  mounted() {
    this.handleGetTabsData();
  },
  methods: {
    handleGetTabsData() {
      /* 1 检查是否有 query */
      const { query } = this.$route;
      const cardReadonly = query && query.cardReadonly;

      /* 2 准备请求 params */
      let params = {
        page: 1,
        pageSize: 10,
        critiria: { cardReadonly },
      };
      if (cardReadonly == null) params = null;

      /* 3 调用 tabs 的请求方法 */
      this.$refs.tabDeposit.getMembers(params);
      this.$refs.tabConsume.getMembers(params);
    },
  },
};
</script>

<style lang="less" scoped>
.page-member-log {
  min-width: 1200px;
  padding: 30px;
}
.wraper {
  .title {
    font-size: 18px;
    color: #000;
  }
}
</style>
