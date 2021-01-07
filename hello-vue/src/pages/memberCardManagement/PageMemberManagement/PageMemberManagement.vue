<template>
  <div class="page-member-management">
    <div class="nothing">会员管理</div>

    <!-- 1 XX卡概况 -->
    <div class="wrap-overview wraper">
      <div class="title">{{ title.overview }}</div>
      <!-- 多张 overview 小卡片 -->
      <div class="wrap-cards">
        <Cards />
      </div>
    </div>

    <!-- 2 用户列表 -->
    <div class="wrap-userlist wraper">
      <div class="title">{{ title.userlist }}</div>
      <div class="content">
        <!-- part 1 搜索辅助器 -->
        <div class="wrap-search-helper">
          <SearchHelper @on-search="onSearch" />
        </div>

        <!-- part 2 多按钮操作区 -->
        <div class="wrap-multi-operator">
          <MultiOperator
            :isSelectedBatchDisabled="isSelectedBatchDisabled"
            @on-operate="onMultiOpearte"
          />
        </div>

        <!-- part 3 表格区 -->
        <div class="wrap-table">
          <!-- <TableWithPage border :columns="tableColumns" :data="tableData" /> -->
          <TableWithPage
            showPageInfo
            :loading="tableLoading"
            :tableData="tableData"
            :tableColumns="tableColumns"
            :tableDataTotal="tableDataTotal"
            @on-pages-change="onPagesChange"
            @on-select-change="onSelectionChange"
          />
        </div>
      </div>
    </div>

    <!-- 3 众多的 modals -->
    <div class="wrap-modals">
      <MultiModals ref="MultiModals" />
    </div>
  </div>
</template>

<script>
import Cards from './components/cards';
import SearchHelper from './components/searchHelper';
import MultiOperator from './components/multiOperator';
import TableWithPage from '../components/tableWithPage';
import MultiModals from './components/multiModals/multiModals';

import wrapRequest from '../components/mock';

/* 给目标数组的每项增加 _checked(boolean) 属性，表示在表格的选中上 */
const addSelectdProperty = (target, selectedIds) => {
  target.forEach(item => {
    item._checked = selectedIds.includes(item.id);
  });
  return target;
};

export default {
  name: 'PageMemberManagement',
  components: {
    Cards,
    SearchHelper,
    MultiOperator,
    TableWithPage,
    MultiModals,
  },
  data() {
    return {
      pageSize: 10,
      tableData: [],
      tableDataTotal: 0,
      tableLoading: false,
      selectedIds: [],
    };
  },
  computed: {
    title() {
      const card = this.cardName || 'test-member-card';
      const overview = `${card} - 概况`;
      const userlist = '用户列表';
      return { overview, userlist };
    },
    /* 是否禁用对表格选中项的批量操作 */
    isSelectedBatchDisabled() {
      return this.selectedIds.length === 0;
    },
    tableColumns() {
      return [
        {
          type: 'selection',
          width: 60,
          align: 'center',
        },
        {
          title: '姓名',
          key: 'name',
          width: 100,
        },
        {
          title: '联系方式',
          key: 'phone',
          width: 150,
        },
        {
          title: '会员卡编号',
          key: 'cardReadonly',
          width: 210,
        },
        {
          title: '会员卡串号',
          key: 'cardWritable',
          width: 210,
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
          title: '卡内余额',
          key: 'amount',
          width: 100,
        },
        {
          title: '创建时间',
          key: 'createAt',
          width: 150,
        },
        {
          title: '使用状态',
          key: 'status',
          width: 70,
        },
        {
          title: '操作',
          width: 300,
          render: (h, { row }) => {
            return h('div', [
              h(
                'Button',
                {
                  class: 'customized operator-btn',
                  props: { type: 'primary' },
                  on: { click: this.onItemEdit.bind(this, row) },
                },
                '编辑',
              ),
              h(
                'Button',
                {
                  class: 'customized operator-btn',
                  props: { type: 'primary' },
                  on: { click: this.onItemDeposit.bind(this, row) },
                },
                '充值',
              ),
              h(
                'Button',
                {
                  class: 'customized operator-btn',
                  props: { type: 'primary' },
                  on: { click: this.onItemTransationsLog.bind(this, row) },
                },
                '查看流水',
              ),
              h(
                'Button',
                {
                  class: 'customized operator-btn',
                  props: { type: 'primary' },
                  on: { click: this.onItemToggleUsage.bind(this, row) },
                },
                row.id % 2 ? '启用' : '停用',
              ),
              h(
                'Button',
                {
                  class: 'customized operator-btn',
                  props: { type: 'primary' },
                  on: { click: this.onItemQRCode.bind(this, row) },
                },
                '会员二维码',
              ),
            ]);
          },
        },
      ];
    },
  },
  created() {
    this.getMembers(null);
  },
  methods: {
    // ============ 请求相关 ================
    async getMembers(e) {
      this.tableLoading = true;
      const defaultParams = {
        page: 1,
        pageSize: this.pageSize,
      };
      const params = e || defaultParams;
      const res = await wrapRequest(params);
      this.tableDataTotal = res.total;
      this.tableData = addSelectdProperty(res.data, this.selectedIds);
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

    // ============ 多按钮操作区 ================
    onMultiOpearte(e) {
      const { operation } = e;
      switch (operation) {
        case 'addMember':
          this.$refs.MultiModals.handleShowAddMember();
          break;
        case 'batchAddMember':
          this.$refs.MultiModals.handleShowBatchAddMember();
          break;
        case 'batchDeposit':
          this.$refs.MultiModals.handleShowBatchDeposit();
          break;
        case 'onBatchTerminate':
          this.onBatchTerminate();
          break;
        case 'onBatchActivate':
          this.onBatchActivate();
          break;
        default:
          console.error('onMultiOpearte error: 不是期待的 operation');
          break;
      }
    },

    // ============ multi options 按钮组相关函数 ================
    onBatchTerminate() {
      const options = {
        title: '批量停用提醒',
        content: `是否批量停用所选的${this.selectedIds.length}位会员？`,
        onOk: this.handleBatchTerminate,
      };
      this.$Modal.confirm(options);
    },
    onBatchActivate() {
      const options = {
        title: '批量启用提醒',
        content: `是否批量启用所选的${this.selectedIds.length}位会员？`,
        onOk: this.handleBatchActivate,
      };
      this.$Modal.confirm(options);
    },
    handleBatchTerminate() {
      console.log('handleBatchTerminate', this.selectedIds);
      this.selectedIds = [];
      this.getMembers();
    },
    handleBatchActivate() {
      console.log('handleBatchActivate', this.selectedIds);
      this.selectedIds = [];
      this.getMembers();
    },

    // ============ 表格 ================
    /* 行内操作按钮 编辑 */
    onItemEdit(e) {
      this.$refs.MultiModals.handleShowEditMember(e);
    },
    /* 行内操作按钮 充值 */
    onItemDeposit(e) {
      this.$refs.MultiModals.handleShowDeposit(e);
    },
    /* 行内操作按钮 查看流水 */
    onItemTransationsLog(e) {
      const path = '/memberCardManagement/log';
      const query = { cardReadonly: e.cardReadonly };
      this.$router.push({ path, query });
    },
    /* 行内操作按钮 启用/停用 */
    onItemToggleUsage(e) {
      const options = {
        title: '会员操作提醒',
        content: `是否启用/停用 ${e.name} 会员账号？`,
        onOk: this.handleToggleUsage.bind(this, e),
      };
      this.$Modal.confirm(options);
    },
    handleToggleUsage(e) {
      console.log('handleToggleUsage', e);
    },
    /* 行内操作按钮 会员二维码 */
    onItemQRCode(e) {
      console.log('onItemQRCode', e);
    },
    /* 表格 各项的选择 */
    onSelectionChange(type, IDs) {
      if (type === 'increase') {
        const IDsSet = new Set([...this.selectedIds, ...IDs]);
        this.selectedIds = Array.from(IDsSet);
      }
      if (type === 'decrease') {
        this.selectedIds = this.selectedIds.filter(i => !IDs.includes(i));
      }
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

<style lang="less">
.page-member-management {
  min-width: 1200px;
  padding: 30px;
}
.wraper {
  .title {
    font-size: 18px;
    color: #000;
  }
}

.wrap-label {
  margin-bottom: 3px;
  .label {
    display: inline-block;
    margin-top: 3px;
    margin-right: 3px;
    padding: 0 3px;
    color: #fff;
    font-weight: 500;
    background-color: #3d8cf0;
    border-radius: 3px;
  }
}

.ivu-btn.operator-btn {
  margin-right: 3px;
  padding: 3px 5px;
  height: 24px;
  line-height: 14px;
}
</style>
