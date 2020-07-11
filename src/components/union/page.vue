<template>
  <div>
    <Card>
      <div slot="title"><h3>table with page</h3></div>
      <div slot="extra" style="display: flex; justify-content: flex-end; align-item: center">
        <Button type="primary"
                @click="submit">
          submit
        </Button>
      </div>
      <Table :data="table.dataShow"
            :columns="table.columns">
        <div slot="header" style="display: flex; justify-content: flex-end; align-item: center">
          <Button type="primary"
                  @click="addRow">
            Add
          </Button>
        </div>
        <div slot="footer" style="display: flex; justify-content: flex-end; align-item: center">
          <Page show-sizer
                :total="page.total"
                :page-size="page.size"
                :page-size-opts="[4, 8, 12]"
                @on-change="pageChange"
                @on-page-size-change="pageSizeChange"/>
        </div>
      </Table>
    </Card>
  </div>
</template>

<script>
const listData = [
  { name: 'Tom1', id: 1, country: 'China' },
  { name: 'Tom2', id: 2, country: 'China' },
  { name: 'Tom3', id: 3, country: 'China' },
  { name: 'Tom4', id: 4, country: 'China' },
  { name: 'Tom5', id: 5, country: 'China' },
  { name: 'Tom6', id: 6, country: 'China' },
  { name: 'Tom7', id: 7, country: 'China' },
  { name: 'Tom8', id: 8, country: 'China' },
  { name: 'Tom9', id: 9, country: 'China' },
  { name: 'Tom10', id: 10, country: 'China' },
  { name: 'Tom11', id: 11, country: 'China' },
  { name: 'Tom12', id: 12, country: 'China' },
  { name: 'Tom13', id: 13, country: 'China' },
]

export default {
  name: '',
  data() {
    return {
      table: {
        dataTotal: [],
        dataShow: [],
        unshiftArr: [],
        deleteArr: [],
        columns: [
          { title: 'Id', key: 'id' },
          { title: 'Name', key: 'name' },
          { title: 'Country', key: 'country' },
          {
            title: 'Option',
            key: 'option',
            render: (h, { row, index }) => {
              const attrs = {
                on: {
                  click: () => { this.deleteRow(row, index) },
                },
                props: {
                  type: 'error',
                },
              }
              return h('Button', attrs, 'delete')
            },
          },
        ]
      },
      page: {
        total: 0,
        current: 1,
        size: 4,
      },
      fakeId: 60,
    }
  },
  created() {
    this.getTableData()
    this.refreshDisplay()
  },
  methods: {
    getTableData() {
      this.table.dataTotal = listData
      this.refreshDisplay()
    },
    addRow(row) {
      row = { name: 'TomAdd', id: this.fakeId++, country: 'China' }
      this.table.unshiftArr.unshift(row)
      this.table.dataTotal.unshift(row)
      this.refreshDisplay()
    },
    deleteRow(row, index) {
      const deleteItem = this.table.dataTotal.splice(index, 1)
      console.log(deleteItem[0].id)
      this.table.deleteArr.push(deleteItem[0])
      this.refreshDisplay()
      this.$Message.success(`You have deleted NO. ${row.id}: ${ row.name }!`)
    },
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
    pageChange(currentPage) {
      this.page.current = currentPage
      this.refreshDisplay()
    },
    pageSizeChange(pageSize) {
      this.page.size = pageSize
      this.refreshDisplay()
    },
    submit() {
      const submitData = {
        add: this.table.unshiftArr,
        del: this.table.deleteArr,
      }
      console.log('submit add: ', submitData.add.map(i => i.id))
      console.log('submit del: ', submitData.del.reduce((rst, i) => (rst + ' ' + i.id)))
    },
  },
}
</script>

<style lang="less" scoped>

</style>
