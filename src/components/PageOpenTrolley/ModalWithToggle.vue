<template>
  <Modal v-model="modalShow"
         :width="900"
         @on-ok="ok"
         @on-cancel="cancel">
    <div class="yp-table">

      <!-- part 1 header -->
      <div class="tp-table-header">

        <!-- 1.1 radio group -->
        <div class="header-left">
          <RadioGroup type="button"
                      size="large"
                      v-model="modalTerminalType"
                      @on-change="handleTerminalTypeChange">
            <Radio label="all">全部设备</Radio>
            <Radio label="unselected">未禁止设备</Radio>
          </RadioGroup>
        </div>

        <!-- 1.2 search -->
        <div v-if="showSearch"
             class="header-right">
          <template v-if="showInput">
            <i-input class="search-box"
                     v-model="value"
                     :placeholder="searchPlaceholder"
                     @keyup.enter.native="searchClick">
            </i-input>
            <Button @click="searchClick">搜索</Button>
          </template>
        </div>
      </div>

      <!-- part 2 table -->
      <TableWithPage ref="TableWithPage"
                     :tableData="getData"
                     :tableColumn="getColumn"
                     @onSelect="onSelect"
                     @onSelectCancel="onSelectCancel"
                     @onSelectionChange="onSelectionChange">
      </TableWithPage>
    </div>
  </Modal>
</template>

<script>
const myData = [{"Code":"978644223236","Name":"","DeviceCode":"","id":"5e1832dbbb96f300105cdcee","ActiveStatus":0,"OnlineStatus":false},{"Code":"970686531274","Name":"null","DeviceCode":"自动","id":"5d9ec5ee74552a0010a2c3f7","ActiveStatus":0,"OnlineStatus":false},{"Code":"970686521132","Name":"激活测试","DeviceCode":"测试002","id":"5d9ec5ee74552a0010a2c3fc","ActiveStatus":0,"OnlineStatus":false},{"Code":"970686483672","Name":"自动绑定策略测试1","DeviceCode":"自动绑定策略测试1","id":"5d9ec5ee74552a0010a2c3f8","ActiveStatus":0,"OnlineStatus":false},{"Code":"965853680122","Name":"","DeviceCode":"","id":"5d5507a7fe922e00102a9a2d","ActiveStatus":0,"OnlineStatus":false},{"Code":"965853676065","Name":"","DeviceCode":"","id":"5d5507a7fe922e00102a9a34","ActiveStatus":0,"OnlineStatus":false},{"Code":"965853672460","Name":"1","DeviceCode":"1","id":"5d5507a7fe922e00102a9a2c","ActiveStatus":0,"OnlineStatus":false},{"Code":"965853633742","Name":"","DeviceCode":"","id":"5d5507a7fe922e00102a9a33","ActiveStatus":0,"OnlineStatus":false},{"Code":"963969134288","Name":"测试激活激活","DeviceCode":"002","id":"5d384613440aa000119ff69c","ActiveStatus":0,"OnlineStatus":false},{"Code":"963957721056","Name":"peizhi","DeviceCode":"peizhi","id":"5d38199e440aa000119ff4a1","ActiveStatus":0,"OnlineStatus":false},{"Code":"963957712022","Name":"测试....","DeviceCode":"","id":"5d38199e440aa000119ff4a0","ActiveStatus":0,"OnlineStatus":false},{"Code":"963267413540","Name":"新APK真机","DeviceCode":"新APK真机","id":"5d2d913759f4fa0011746fac","ActiveStatus":0,"OnlineStatus":false},{"Code":"963170916378","Name":"新APK横屏1","DeviceCode":"新APK横屏","id":"5d2c182a2a447f00110928a7","ActiveStatus":0,"OnlineStatus":false},{"Code":"962826742514","Name":"无屏1","DeviceCode":"无屏1","id":"5d26d7cc281a47001181fce5","ActiveStatus":0,"OnlineStatus":false},{"Code":"962744336382","Name":"新Apk竖屏","DeviceCode":"新Apk竖屏","id":"5d2595e56855090011e38f78","ActiveStatus":0,"OnlineStatus":false}]

import TableWithPage from './TableWithPage';

const modalCols = [
  {
    type: 'selection',
    title: '',
    width: 60,
    align: 'center',
  },
  {
    title: 'ID',
    key: 'id',
    display: false,
  },
  {
    title: '设备名称',
    key: 'Name',
  },
  {
    title: '设备编号',
    key: 'DeviceCode',
  },
  {
    title: '生产编号',
    key: 'Code',
  },
];

export default {
  name: 'ModalWithToggle',
  inheritAttrs: false,
  components: { TableWithPage },
  props: {
    show: { type: Boolean, default: false },
    showInput: { type: Boolean, default: true },
    showSearch: { type: Boolean, default: true },
    searchPlaceholder: { type: String, default: '请输入搜索条件' },
    blackListID: { type: Array, default: () => [] },
    allowedData: { type: Array, default: () => [] },
  },
  data() {
    return {
      modalShow: false,
      IDs: [],
      value: '',
      elpsy: [],
      list: [],
      modalTerminalType: 'all',
      form: {
        page: 1,
        per_page: 10,
        total: 1,
        filter: '',
      },
    };
  },
  computed: {
    getData() {
      this.markingSelect();
      return this.elpsy;
    },
    getColumn() {
      return modalCols;
    },
  },
  watch: {
    show(v) { // 显示 Modal 变启动搜索
      this.modalShow = v;
      if (v) {
        this.searchExecute();
      }
    },
    blackListID: {
      immediate: true,
      handler(v) {
        this.IDs = v;
      }
    },
  },
  methods: {
    /**
     * START header 的功能
     */
    handleTerminalTypeChange(radio) { // 获取 allowedData
      if (radio === 'all') {
        this.searchExecute();
      } else {
        this.elpsy = this.allowedData;
        this.$refs.TableWithPage.resetPage();
      }
    },
    searchExecute() {
      // this.$request({
      //   method: 'terminal.terminal.cooperator.select.list',
      //   params: {
      //     page: 1,
      //     pageSize: 1000,
      //     select: [ 'Name', 'Code', 'DeviceCode' ],
      //     filter,
      //   },
      // }).then((res) => {
      //   this.elpsy = res.data.data;
      //   this.modalTerminalType = 'all';
      //   this.$refs.TableWithPage.resetPage();
      // })
      this.elpsy = myData;
      this.modalTerminalType = 'all';
      this.$refs.TableWithPage.resetPage();
    },
    searchClick() {
      this.form.filter = this.value;
      this.form.page = 1;
      this.searchExecute(this.value);
    },
    /**
     * END header 的功能
     */

    /**
     * START table 的功能
     */
    onSelect(e) {
      this.IDs.unshift(e.id)
      this.markingSelect();
    },
    onSelectCancel(e) {
      this.IDs.splice(this.IDs.indexOf(e.id), 1);
      this.markingSelect();
    },
    onSelectionChange(status, selection, currentData) {
      if (!status) { return; }
      const currentIDs = currentData.map((row) => {
        return row.id;
      });
      // 取消全选
      if (status === 'CANCEL_SELECT_ALL') {
        currentIDs.forEach((id) => {
          const index = this.IDs.indexOf(id);
          if (index === -1) {
            return;
          } else {
            this.IDs.splice(index, 1);
          }
        });
      }
      // 全选
      if (status === 'SELECT_ALL') {
        currentIDs.forEach((id) => {
          const index = this.IDs.indexOf(id);
          if (index === -1) {
            this.IDs.unshift(id);
          }
        });
      }
      // 标记数据
      this.markingSelect();
    },
    markingSelect() {
      this.elpsy = this.elpsy.map((device) => {
        if (this.IDs.indexOf(device.id) !== -1) {
          device._checked = true;
        } else {
          delete device._checked;
        }
        return device;
      });
    },
    /**
     * END table 的功能
     */

    /**
     * START modal 的功能
     */
    ok() {
      this.$emit('ok', this.IDs);
    },
    cancel() {
      this.$emit('cancel');
    },
    /**
     * END modal 的功能
     */
  },
};
</script>

<style lang='less' scoped>
.yp-table {
  position: relative;
  margin-top: 20px;
  .tp-table-header {
    position: relative;
    margin: 10px 0;
    display: flex;
    justify-content: flex-end;
    .header-left {
      flex: 1 1 auto;
    }
    .header-right {
      flex: 0 0 auto;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .search-box {
        width: 240px;
        margin-right: 5px;
      }
    }
  }
  .yp-table-bottom {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin: 10px 0 0 0;
  }
}
</style>
