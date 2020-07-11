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
  { name: 'Tom1', age: 1, country: 'China' },
  { name: 'Tom2', age: 2, country: 'China' },
  { name: 'Tom3', age: 3, country: 'China' },
  { name: 'Tom4', age: 4, country: 'China' },
  { name: 'Tom5', age: 5, country: 'China' },
  { name: 'Tom6', age: 6, country: 'China' },
  { name: 'Tom7', age: 7, country: 'China' },
  { name: 'Tom8', age: 8, country: 'China' },
  { name: 'Tom9', age: 9, country: 'China' },
  { name: 'Tom10', age: 10, country: 'China' },
  { name: 'Tom11', age: 11, country: 'China' },
  { name: 'Tom12', age: 12, country: 'China' },
  { name: 'Tom13', age: 13, country: 'China' },
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
          { title: 'Name', key: 'name' },
          { title: 'Age', key: 'age' },
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
      row = { name: 'TomAdd', age: 66, country: 'China' }
      this.table.unshiftArr.unshift(row)
      this.table.dataTotal.unshift(row)
      this.refreshDisplay()
    },
    deleteRow(row, index) {
      const deleteItem = this.table.dataTotal.splice(index, 1)
      this.table.deleteArr.push(deleteItem[0])
      this.refreshDisplay()
      this.$Message.success(`You have deleted NO. ${index}: ${ row.name }!`)
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
      console.log(`现在要提交的内容有: `)
      console.log(submitData)
    },
  },
}
</script>

<style lang="less" scoped>

</style>
