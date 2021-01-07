<template>
  <div class="tab-deposit">
    <div class="wrap-search-helper">
      <SearchHelper @on-search="onSearch" />
    </div>

    <div class="wrap-multi-operator">
      <Button type="primary" @click="onExportDepositLog">
        导出
      </Button>
    </div>

    <div class="wrap-table">
      <TableWithPage
        showPageInfo
        :loading="tableLoading"
        :tableData="tableData"
        :tableColumns="tableColumns"
        :tableDataTotal="tableDataTotal"
        @on-pages-change="onPagesChange"
      />
    </div>
  </div>
</template>

<script>
import SearchHelper from './components/SearchHelper';
import TableWithPage from '../../../components/tableWithPage';
import wrapRequest from '../../../components/mock';

export default {
  components: { SearchHelper, TableWithPage },
  data() {
    return {
      pageSize: 10,
      tableData: [],
      tableDataTotal: 0,
      tableLoading: false,
    };
  },
  computed: {
    tableColumns() {
      return [
        {
          title: '姓名',
          key: 'name',
          width: 100,
        },
        {
          title: '用户手机号',
          key: 'phone',
          width: 150,
        },
        {
          title: '会员卡编号',
          key: 'cardReadonly',
          width: 210,
        },
        {
          title: '充值金额',
          key: 'depositAmount',
          width: 100,
        },
        {
          title: '充值来源',
          key: 'depositWay',
          width: 100,
        },
        {
          title: '会员标签',
          key: 'labels',
          minWidth: 300,
          render: (h, { row }) => {
            return h(
              'div',
              { class: 'wrap-label' },
              row.labels.map(i => h('div', { class: 'label' }, i)),
            );
          },
        },
        {
          title: '充值时间',
          key: 'depositTime',
          width: 150,
        },
        {
          title: '操作人',
          key: 'depositOperator',
          width: 100,
        },
      ];
    },
  },
  methods: {
    async getMembers(e) {
      this.tableLoading = true;
      const defaultParams = {
        page: 1,
        pageSize: this.pageSize,
      };
      const params = e || defaultParams;
      const res = await wrapRequest(params);
      this.tableDataTotal = res.total;
      this.tableData = res.data;
      this.tableLoading = false;
    },
    onSearch(e) {
      /* 清除选中记录 */
      this.selectedIds = [];

      /* 处理搜索 */
      const params = {
        page: 1,
        pageSize: this.pageSize,
      };
      params.critiria = e;
      this.getMembers(params);
      console.log('onSearch', params);
    },

    /* 导出充值流水 */
    onExportDepositLog() {
      console.log('onExportDepositLog');
    },

    /* 表格 分页的变化 */
    onPagesChange(page, pageSize) {
      this.pageSize = pageSize;
      const params = { page, pageSize };
      this.getMembers(params);
    },
  },
};
</script>

<style lang="less" scoped>
.wrap-search-helper {
  margin-bottom: 10px;
}
.wrap-multi-operator {
  margin-bottom: 10px;
}
</style>
