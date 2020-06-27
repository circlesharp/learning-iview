<template>
  <div style="padding: 10px;">
    <!--  -->
    <article>
      <h4>异步树形数据</h4>
      <i-table :data="data1" :columns="columns1" row-key="id" :load-data="handleLoadData" />
    </article>

    <!--  -->
    <article>
      <h4>可展开</h4>
      <i-table :data="data2" :columns="columns2" />
    </article>

    <!-- <expendRow :row="{ interest: 'sb' }"></expendRow> -->
  </div>
</template>

<script>
import { Vue } from '../../main'

const expendRow = Vue.component('expendRow', {
  props: { row: Object },
  render (h) {
    return h('div', [
      h('Row',[
        h('Col', { attrs: {span: 8 } }, [ h('span', 'Job: '), h('span', this.row.job) ]),
        h('Col', { attrs: {span: 8 } }, [ h('span', 'Interset: '), h('span', this.row.interest) ]),
        h('Col', { attrs: {span: 8 } }, [ h('span', 'Birthday: '), h('span', this.row.birthday) ]),
      ]),
      h('Row',[
        h('Col', { attrs: {span: 8 } }, [ h('span', 'Favorite book: '), h('span', this.row.book) ]),
        h('Col', { attrs: {span: 8 } }, [ h('span', 'Favorite movie: '), h('span', this.row.movie) ]),
        h('Col', { attrs: {span: 8 } }, [ h('span', 'Favorite music: '), h('span', this.row.music) ]),
      ]),
    ])
  }
})

export default {
  name: "itable",
  data() {
    return {
      columns1: [
        { title: "Name", key: "name", tree: true },
        { title: "Age", key: "age" },
        { title: "Address", key: "address" }
      ],
      data1: [
        { id: "100", name: "sb100", age: 18, address: "ad100" },
        {
          id: "101",
          name: "sb101",
          age: 18,
          address: "ad101",
          _loading: false,
          children: []
        },
        { id: "102", name: "sb102", age: 18, address: "ad102" },
        { id: "103", name: "sb103", age: 18, address: "ad103" }
      ],
      columns2: [
        {
          type: "expand",
          width: 50,
          render: (h, { row }) => h(expendRow, { props: { row }})
        },
        {
          title: "Name",
          key: "name"
        },
        {
          title: "Age",
          key: "age"
        },
        {
          title: "Address",
          key: "address"
        }
      ],
      data2: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          job: "Data engineer",
          interest: "badminton",
          birthday: "1991-05-14",
          book: "Steve Jobs",
          movie: "The Prestige",
          music: "I Cry"
        },
        {
          name: "Jim Green",
          age: 25,
          address: "London No. 1 Lake Park",
          job: "Data Scientist",
          interest: "volleyball",
          birthday: "1989-03-18",
          book: "My Struggle",
          movie: "Roman Holiday",
          music: "My Heart Will Go On"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          job: "Data Product Manager",
          interest: "tennis",
          birthday: "1992-01-31",
          book: "Win",
          movie: "Jobs",
          music: "Don’t Cry"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          job: "Data Analyst",
          interest: "snooker",
          birthday: "1988-7-25",
          book: "A Dream in Red Mansions",
          movie: "A Chinese Ghost Story",
          music: "actor"
        }
      ]
    };
  },
  methods: {
    handleLoadData(item, callback) {
      // console.log(item, callback) // item 用于占位，是该对象
      setTimeout(() => {
        const childrenData = [
          { id: "10100", name: "sb10100", age: 11, address: "ad10100" },
          { id: "10101", name: "sb10101", age: 12, address: "ad10101" }
        ];
        callback(childrenData);
      }, 1000);
    }
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
.expand-row {
  margin-bottom: 16px;
}
</style>
