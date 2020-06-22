<template>
  <div style="padding: 10px;">
    <!--  -->
    <article>
      <h4>基础用法</h4>
      <i-table :data="data1" :columns="columns1" />
    </article>

    <!--  -->
    <article>
      <h4>斑马纹</h4>
      <i-table stripe :data="data1" :columns="columns1" />
    </article>

    <!--  -->
    <article>
      <h4>带边框 + 固定表头(高度固定)</h4>
      <i-table border height="200" :data="data1" :columns="columns1" />
    </article>

    <!--  -->
    <article>
      <h4>带边框 + 固定列</h4>
      <i-table border width="550" :data="data1" :columns="columns2" />
    </article>

    <!--  -->
    <article>
      <h4>特定样式: 注意 td 选择器的使用</h4>
      <p>row-class-name -> Custom row styles</p>
      <i-table :row-class-name="rowClassName" :data="data1" :columns="columns1" />
      <p>className -> Custom column styles</p>
      <i-table :data="data1" :columns="columns9" />
      <p>cellClassName -> Custom arbitraty cell styles</p>
      <i-table :data="data8" :columns="columns1" />
    </article>

    <!--  -->
    <article>
      <h4>Render写法</h4>
      <i-table :data="data1" :columns="columns7" />
    </article>

    <!--  -->
    <article>
      <h4>基础用法</h4>
      <i-table :data="data1" :columns="columns1" />
    </article>

    <!--  -->
    <article>
      <h4>基础用法</h4>
      <i-table :data="data1" :columns="columns1" />
    </article>
  </div>
</template>

<script>
export default {
  name: "itable",
  data() {
    return {
      data1: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        }
      ],
      data8: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          cellClassName: {
            age: "demo-table-info-cell-age",
            address: "demo-table-info-cell-address"
          }
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          cellClassName: {
            name: "demo-table-info-cell-name"
          }
        }
      ],
      columns1: [
        { title: "Name", key: "name" },
        { title: "Age", key: "age" },
        { title: "Address", key: "address" }
      ],
      columns2: [
        { title: "Name", key: "name", width: 120, fixed: "left" },
        { title: "Age", key: "age", width: 100 },
        { title: "Address", key: "address", width: 240 },
        { title: "Date", key: "date", width: 240, fixed: "right" }
      ],
      columns9: [
        { title: "Name", key: "name" },
        { title: "Age", key: "age", className: "demo-table-info-column" },
        { title: "Address", key: "address" }
      ],
      columns7: [
        {
          title: "Name",
          key: "name",
          render: (h, { row }) =>
            h("div", [
              h("Icon", { props: { type: "logo-windows" }, style: { marginRight: '10px' } }),
              h('strong', row.name)
            ])
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        },
        {
          title: 'Action',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, { index }) => h('div', [
            h('Button', {
              props: { type: 'primary', size: 'small' },
              style: { marginRight: '5px' },
              on: { click: () => { this.show(index) }}
            }, 'View'),
            h('Button', {
              props: { type: 'error', size: 'small' },
              on: { click: () => { this.remove(index) }}
            }, 'Delete')
          ])
        }
      ]
    };
  },
  methods: {
    rowClassName(row, index) {
      if (index === 1) {
        return "domo-table-info-row";
      } else if (index === 3) {
        return "domo-table-error-row";
      }
      return "";
    },
    show(index) {
      this.$Modal.info({
        title: `User Info (index: ${index})`,
        content: `<strong>Name：</strong>${this.data1[index].name}<br>Age：${this.data1[index].age}<br>Address：${this.data1[index].address}`
      })
    },
    remove(index) {
      this.data1.splice(index, 1)
    },
  }
};
</script>

<style lang="less">
.ivu-table .domo-table-info-row td {
  background: #2db7f5;
  color: #fff;
}
.ivu-table .domo-table-error-row td {
  background: #ff6600;
  color: #fff;
}
.ivu-table td.demo-table-info-column {
  background-color: #2db7f5;
  color: #fff;
}
.ivu-table .demo-table-info-cell-name {
  background-color: #2db7f5;
  color: #fff;
}
.ivu-table .demo-table-info-cell-age {
  background-color: #ff6600;
  color: #fff;
}
.ivu-table .demo-table-info-cell-address {
  background-color: #187;
  color: #fff;
}
</style>
