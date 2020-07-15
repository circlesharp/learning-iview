<template>
  <div icon="ios-cart">
    <span slot="title">开启购物车</span>
    <div slot="content">

      <!-- part 2 禁止开启购物车设备 -->
      <card class="content-card" v-if="isTrolleyOpened">
        <p slot="title">禁止开启购物车设备</p>

        <Form :model="trolleyOpen"
              label-position="left">
          <FormItem>
            <div class="table-view">
              <div class="toolbar">
                <p class="form-tips">已关闭 {{ blackList.length }} 台设备</p>
                <Button type="primary"
                        size="small"
                        icon="plus"
                        style=""
                        @click="() => (trolleyBan.showModal = true)">
                  增加
                </Button>
              </div>
              <TableWithPage :tableData="blackList"
                             :tableColumn="bannedTerminalCols"
                             :showNowPage="false">
              </TableWithPage>
            </div>
          </FormItem>
        </Form>
      </card>

      <!-- 底部按钮组 -->
      <p style="text-align: center; margin-top: 20px;">
        <Button type="error"
                style="margin-right: 40px;"
                @click="handleCancel">
          取消
        </Button>
        <Button type="primary" @click="handleSave">
          保存
        </Button>
      </p>

      <!-- modal 2 选择设备 -->
      <ModalWithToggle :allowedData="whiteList"
            :show="trolleyBan.showModal"
            :blackListID="bannedIDs"
            @ok="modifyBannedIDs"
            @cancel="()=>{trolleyBan.showModal = false}">
      </ModalWithToggle>

    </div>
  </div>
</template>

<script>
const myData = [{"Code":"978644223236","Name":"","DeviceCode":"","id":"5e1832dbbb96f300105cdcee","ActiveStatus":0,"OnlineStatus":false},{"Code":"970686531274","Name":"null","DeviceCode":"自动","id":"5d9ec5ee74552a0010a2c3f7","ActiveStatus":0,"OnlineStatus":false},{"Code":"970686521132","Name":"激活测试","DeviceCode":"测试002","id":"5d9ec5ee74552a0010a2c3fc","ActiveStatus":0,"OnlineStatus":false},{"Code":"970686483672","Name":"自动绑定策略测试1","DeviceCode":"自动绑定策略测试1","id":"5d9ec5ee74552a0010a2c3f8","ActiveStatus":0,"OnlineStatus":false},{"Code":"965853680122","Name":"","DeviceCode":"","id":"5d5507a7fe922e00102a9a2d","ActiveStatus":0,"OnlineStatus":false},{"Code":"965853676065","Name":"","DeviceCode":"","id":"5d5507a7fe922e00102a9a34","ActiveStatus":0,"OnlineStatus":false},{"Code":"965853672460","Name":"1","DeviceCode":"1","id":"5d5507a7fe922e00102a9a2c","ActiveStatus":0,"OnlineStatus":false},{"Code":"965853633742","Name":"","DeviceCode":"","id":"5d5507a7fe922e00102a9a33","ActiveStatus":0,"OnlineStatus":false},{"Code":"963969134288","Name":"测试激活激活","DeviceCode":"002","id":"5d384613440aa000119ff69c","ActiveStatus":0,"OnlineStatus":false},{"Code":"963957721056","Name":"peizhi","DeviceCode":"peizhi","id":"5d38199e440aa000119ff4a1","ActiveStatus":0,"OnlineStatus":false},{"Code":"963957712022","Name":"测试....","DeviceCode":"","id":"5d38199e440aa000119ff4a0","ActiveStatus":0,"OnlineStatus":false},{"Code":"963267413540","Name":"新APK真机","DeviceCode":"新APK真机","id":"5d2d913759f4fa0011746fac","ActiveStatus":0,"OnlineStatus":false},{"Code":"963170916378","Name":"新APK横屏1","DeviceCode":"新APK横屏","id":"5d2c182a2a447f00110928a7","ActiveStatus":0,"OnlineStatus":false},{"Code":"962826742514","Name":"无屏1","DeviceCode":"无屏1","id":"5d26d7cc281a47001181fce5","ActiveStatus":0,"OnlineStatus":false},{"Code":"962744336382","Name":"新Apk竖屏","DeviceCode":"新Apk竖屏","id":"5d2595e56855090011e38f78","ActiveStatus":0,"OnlineStatus":false}]

import ModalWithToggle from './ModalWithToggle'
import TableWithPage from './TableWithPage';

export default {
  name: 'OpenTrolley',
  components: { ModalWithToggle, TableWithPage },
  data() {
    return {
      isTrolleyOpened: false,
      bannedIDs: [],

      // part 1 购物车设置
      trolleyOpen: {
        switch: false,
        showModal: false,
        agreeCheckbox: false, // 勾选同意开启
      },

      // part 2 禁止开启购物车设备
      trolleyBan: {
        showModal: false,
        modalTerminalType: 'all',
      },
      roster: [],
      whiteList: [],
      blackList:[],

      // part 3 菜单栏配置
      trolleyMenu: {
        unsalableOnTop: false,
        categoryType: 1, // 1 按商品分类展示  2 按品牌分类展示
      },
      
      // 用于提交的东西
      toSubmit: {
        // 0. 基本信息
        OID: 1111, // -> 
        // 1. 购物车是否开启
        Status: 0, // -> isTrolleyOpened
        // 2. 哪些设备禁止开启
        ExcludeTIDList: [], // -> roster
        // 3. 菜单栏的配置
        UnsalableOnTop: false, // -> trolleyMenu.unsalableOnTop
        CategoryType: 1, // -> trolleyMenu.categoryType
      },
      // 黑名单的 col
      bannedTerminalCols: [
        // { type: 'selection', width: 60, align: 'center' },
        { title: '设备名称', key: 'Name' },
        { title: '设备编号', key: 'DeviceCode' },
        { title: '设备类型', key: 'aDeviceType' },
        { title: '设备地址', key: 'District' },
        {
          title: '货道类型',
          key: 'CargoType',
          render: (h, { row }) => {
            let str;
            switch (row.CargoType) {
              case 0: str = '弹簧'; break;
              case 1: str = '蛇形货道'; break;
              case 2: str = '履带'; break;
              case 3: str = '格子'; break;
              default: str = '弹簧';
            }
            return h('span', str);
          },
        },
        { title: '售卖状态', key: 'status' },
        {
          title: '操作',
          key: 'District',
          render: (h, { row, index }) => {
            const attrs = {};
            attrs.props = { type: 'error', size: 'small' };
            attrs.on = {
              click: () => { this.deleteRow(row, index) },
            };
            return h('Button', attrs, '移除');
          },
        },
      ],
      // Modal(花名册/白名单)的 col
      selectTerminalCols: [
        { type: 'selection', title: '', width: 60, align: 'center' },
        { title: 'ID', key: 'id', display: false },
        { title: '设备名称', key: 'Name' },
        { title: '设备编号', key: 'DeviceCode' },
        { title: '生产编号', key: 'Code' },
      ],
    };
  },
  watch: {
    bannedIDs() {
      if (this.roster.length > 0) {
        this.$emit('idChange', 123)
        this.sortDevice();
      }
    },
  },
  created() {
    this.init();
  },
  methods: {
    /**
     * BEGIN part0 请求相关的方法
     */
    // 数据初始化
    init() {
      this.getTrolleyInfo();
      this.getTerminalInfo();
    },
    // 获取页面最初的数据
    getTrolleyInfo() {
      // 检查是否允许设置购物车
      const status = true;
      this.isTrolleyOpened = status;
      this.trolleyOpen.switch = status;
    },
    // 应该是当 bannedIDs 出来之后才去执行
    getTerminalInfo() {
      // 获取黑名单的id
      const bannedIDs = [ '5d2d913759f4fa0011746fac', '5d38199e440aa000119ff4a1', '5d5507a7fe922e00102a9a2c', '5d5507a7fe922e00102a9a31' ];

      this.bannedIDs = bannedIDs;

      // 获取设备：得到花名册之后开始洗数据
      // this.$request({
      //   method: 'terminal.terminal.list.all',
      //   params: {
      //     select: [ 'Name', 'Code', 'DeviceCode' ],
      //   },
      // })
      //   .then((res) => {
      //     this.roster = res.data;
      //     this.sortDevice(bannedIDs);
      //   })
      this.roster = myData;
      this.sortDevice(bannedIDs);
    },
    // 数据整理：洗数据，得出黑白名单
    sortDevice() { // ids -> arr
      const bannedDevices = [];
      const allowedDevices = [];
      this.roster.forEach((device) => {

        if (this.bannedIDs.indexOf(device.id) === -1) { // 不在禁止列表中
          allowedDevices.push(device);
        } else {
          bannedDevices.push(device);
        }
      });
      this.blackList = bannedDevices;
      this.whiteList = allowedDevices;
      console.log(this.blackList, this.whiteList)
    },
    /**
     * END part0 请求相关的方法
     */

    /**
     * BEGIN part1 是否同意开启购物车
     */
    // 切换同意开启购物车的 switch
    toggleAgreeShowTrolley(bool) {
      if (bool) {
        this.trolleyOpen.showModal = true;
      } else {
        this.isTrolleyOpened = false;
      }
    },
    // 同意开启购物车
    agreeOpenTrolley() {
      this.trolleyOpen.showModal = false;
      // todo: 告诉后端
      this.isTrolleyOpened = true;
      // 重新获取数据
      this.init();
    },
    // 不同意开启购物车
    disagreeOpenTrolley() {
      this.trolleyOpen.switch = false;
      this.trolleyOpen.agreeCheckbox = false;
      this.trolleyOpen.showModal = false; // 先取消 checkbox, 再关 modal
    },
    /**
     * END part1 是否同意开启购物车
     */

    /**
     * BEGIN part2 禁止开启购物车设备
     */
    // 移出黑名单（洗白）
    deleteRow(row) {
      this.bannedIDs.splice(this.bannedIDs.indexOf(row.id), 1);
      this.$Message.success('操作成功');
    },
    // 移入黑名单（准确来说：变动黑名单）
    modifyBannedIDs(ids) {
      this.bannedIDs = ids;
      this.trolleyBan.showModal = false;
    },
    /**
     * END part2 禁止开启购物车设备
     */

    /**
     * BEGIN 页脚按钮组
     */
    handleSave() {
      const toSubmit = {
        OID: 1111, // 要获取
        Status: this.isTrolleyOpened,
        ExcludeTIDList: this.roster,
        UnsalableOnTop: this.trolleyMenu.unsalableOnTop,
        CategoryType: this.trolleyMenu.categoryType,
      };
      console.log(toSubmit);
    },
    handleCancel() {
      this.init();
    },
    /**
     * END 页脚按钮组
     */
  },
};
</script>

<style lang="less" scoped>
  .content-card {
    margin-bottom: 20px;
    .card-title {
      width: 100%;
      text-align: left;
      margin-bottom: 10px;
      > h3 {
        font-size: 16.2px;
        display: inline-block;
        margin-right: 10px;
      }
    }
  }
  .table-view {
    max-width: 1200px;
    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }
  }
  .menu-radio-group {
    display: flex;
    flex-direction: column;
    width: 132px;
    .ivu-radio-wrapper {
      margin-bottom: 40px;
      border: 1px solid #dddee1;
      border-radius: 4px;
      &.ivu-radio-wrapper-checked {
        border: 1px solid #57a3f3;
        box-shadow: none!important; // 这个样式有毒~
      }
    }
  }
</style>
