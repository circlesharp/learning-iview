<template>
  <div>
    <Table :data="table.dataShow"
           :columns="table.columns"
           @on-select="onSelect"
           @on-select-cancel="onSelectCancel"
           @on-selection-change="onSelectionChange">
      <div slot="footer" class="footer">
        <div class="bottom-left">
          <label v-if="showNowPage"
                 style="color: #999;">
            显示第{{ indexStart }}至{{ indexEnd }}项，共{{ tableData.length }}项
          </label>
        </div>
        <Page show-sizer
              ref="pager"
              :current.sync="page.current"
              :total="page.total"
              :page-size="page.size"
              :page-size-opts="[10, 20, 30]"
              @on-change="pageChange"
              @on-page-size-change="pageSizeChange"/>
      </div>
    </Table>
  </div>
</template>

<script>

export default {
  name: 'TableWithPage',
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    tableColumn: {
      type: Array,
      default: () => [],
    },
    showNowPage: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      table: {
        dataTotal: [], // 所有数据，不直接显示，配合分页
        dataShow: [], // 直接显示的数据
        columns: [],
      },
      page: {
        total: 0,
        current: 1,
        size: 10,
      },
    }
  },
  computed: {
    indexStart() {
      return (this.page.current - 1) * this.page.size + 1;
    },
    indexEnd() {
      const end = this.page.current * this.page.size;
      const maxLength = this.tableData.length;
      return end > maxLength ? maxLength : end;
    },
  },
  watch: {
    tableData() {
      this.init();
    },
  },
  methods: {
    // 数据改动后调用，整理 table 组件的数据并进行展示逻辑
    init() {
      this.table.dataTotal = this.tableData;
      this.table.columns = this.tableColumn;
      this.refreshDisplay();
    },

    // 展示逻辑：过滤出要展示的数据
    refreshDisplay() {
      if (this.table.dataTotal) {
        this.table.dataShow = this.table.dataTotal.filter((item, idx) => {
          const start = (this.page.current - 1) * this.page.size
          const end = this.page.current * this.page.size
          if (idx >= start && idx < end) {
            return item
          }
        })
      }
      this.page.total = this.table.dataTotal.length
    },

    /**
     * START 选项改变，交给外部处理
     */
    onSelect(selection, row) {
      this.$emit('onSelect', row);
    },
    onSelectCancel(selection, row) {
      this.$emit('onSelectCancel', row);
    },
    onSelectionChange(selection) {
      let status;
      if (selection.length === this.table.dataShow.length) {
        status = 'SELECT_ALL';
      } else if (selection.length === 0) {
        status = 'CANCEL_SELECT_ALL';
      }
      this.$emit('onSelectionChange', status, selection, this.table.dataShow);
    },
    /**
     * END 选项改变，交给外部处理
     */

    /**
     * START Page组件的行为
     */
    pageChange(currentPage) {
      this.page.current = currentPage
      this.refreshDisplay()
    },
    pageSizeChange(pageSize) {
      this.page.size = pageSize
      this.refreshDisplay()
    },
    // 这个方法很丑陋，而且还要父组件直接调用...
    resetPage() {
      this.$refs.pager.currentPage = 1;
      this.page.current = 1;
    },
    /**
     * END Page组件的行为
     */
  },
}
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
