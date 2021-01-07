<template>
  <Table
    :data="tableData"
    :columns="tableColumns"
    v-bind="$attrs"
    @on-select="onSelect"
    @on-select-cancel="onSelectCancel"
    @on-select-all="onSelectAll"
    @on-select-all-cancel="onSelectAllCancel"
  >
    <div slot="footer" class="footer">
      <!-- 左边 当前页信息 -->
      <div class="bottom-left page-info">
        <label v-if="showPageInfo" style="color: #999;">
          显示第{{ indexStart }}至{{ indexEnd }}项，共{{ tableDataTotal }}项
        </label>
      </div>

      <!-- 右边 分页控制器 -->
      <div class="bottom-right page">
        <Page
          show-sizer
          ref="pager"
          :total="tableDataTotal"
          :current.sync="page"
          :page-size="pageSize"
          :page-size-opts="[10, 25, 50, 100]"
          @on-change="pageChange"
          @on-page-size-change="pageSizeChange"
        />
      </div>
    </div>
  </Table>
</template>

<script>
export default {
  name: 'TableWithPage',
  props: {
    tableData: Array,
    tableColumns: Array,
    tableDataTotal: Number,
    showPageInfo: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      page: 1,
      pageSize: 10,
    };
  },
  computed: {
    indexStart() {
      return (this.page - 1) * this.pageSize + 1;
    },
    indexEnd() {
      const end = this.page * this.pageSize;
      const maxLength = this.tableDataTotal;
      return Math.min(maxLength, end);
    },
  },
  methods: {
    /* 选择一个 */
    onSelect(_, e) {
      const IDs = [e.id];
      this.$emit('on-select-change', 'increase', IDs);
    },
    /* 选择全部 */
    onSelectAll() {
      const IDs = this.tableData.map(i => i.id);
      this.$emit('on-select-change', 'increase', IDs);
    },
    /* 取消选择一个 */
    onSelectCancel(_, e) {
      const IDs = [e.id];
      this.$emit('on-select-change', 'decrease', IDs);
    },
    /* 取消选择全部 */
    onSelectAllCancel() {
      const IDs = this.tableData.map(i => i.id);
      this.$emit('on-select-change', 'decrease', IDs);
    },

    /* 配合搜索参数变化，主要供父级调用。回到第一页，但 pageSize 不变 */
    handleReset() {
      this.page = 1;
      this.pageChange();
    },
    pageChange() {
      this.$emit('on-pages-change', this.page, this.pageSize);
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.$emit('on-pages-change', this.page, this.pageSize);
    },
  },
};
</script>

<style lang="less" scoped>
.footer {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  margin: 0 20px 10px 20px;
}
</style>
