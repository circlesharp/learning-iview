<template>
  <div class="modal-slot result">
    <!-- 1 成功 / 失败信息 -->
    <div class="wrap-infos">
      <div class="info wrap-success">
        <Icon type="md-checkmark-circle" class="icon" style="color: #19be6b;" />
        <span>{{ infos.success }}</span>
        <p></p>
      </div>

      <div class="info wrap-failure">
        <Icon type="md-close-circle" class="icon" style="color: #ed4014;" />
        <span>{{ infos.failure }}</span>
      </div>
    </div>

    <!-- 2 分割线 -->
    <div class="wrap-divider">
      <span>失败明细，请重新导入</span>
    </div>

    <!-- 3 失败表格（显示前5项） -->
    <div class="wrap-table" v-if="isTableShow">
      <table class="detail-table">
        <!-- part 1 列头 -->
        <tr style="padding-bottom: 5px;">
          <th
            v-for="(item, idx) in tableColumns"
            :key="idx"
            :class="[`col-${item.key}`]"
          >
            {{ item.title }}
          </th>
        </tr>

        <!-- part 2 表格数据 -->
        <tr
          style="padding-bottom: 3px;"
          v-for="(row, idx) in tableData"
          :key="idx"
        >
          <td
            v-for="(column, i) in tableColumns"
            :key="i"
            :class="[`col-${column.key}`]"
          >
            {{ row[column.key] }}
          </td>
        </tr>

        <!-- part 3 省略 -->
        <tr v-if="isOmitTipsShow">
          <td class="omit-tips">
            (共 {{ result.numFailure }} 条失败明细，可导出失败信息查看详情)
          </td>
        </tr>
      </table>
    </div>

    <!-- 4 余额不足提醒 -->
    <div class="wrap-balance-warn" v-if="isBalanceWarnShow">
      <div class="warn">充值失败，当前会员卡额度不足扣除；</div>
      <div class="warn">
        {{ balanceWarnText }}
      </div>
    </div>
  </div>
</template>

<script>
/* 只显示前 OMIT_THRESHOLD 条失败记录 */
const OMIT_THRESHOLD = 5;

export default {
  data() {
    return {
      batchType: 'addMember',
      isBalanceWarnShow: false,
      balanceWarnText: '',
      result: {
        numSuccess: 0,
        numFailure: 0,
        dataFailure: [],
      },
    };
  },
  computed: {
    isTableShow() {
      return !this.isBalanceWarnShow;
    },
    isOmitTipsShow() {
      return (
        this.isTableShow && this.result.dataFailure.length > OMIT_THRESHOLD
      );
    },
    tableData() {
      return this.result.dataFailure.slice(0, OMIT_THRESHOLD);
    },
    tableColumns() {
      const columns = [
        { title: '姓名', key: 'name' },
        { title: '联系方式', key: 'phone' },
        { title: '会员卡编号', key: 'cardReadonly' },
        { title: '错误详情', key: 'status' },
      ];
      return columns;
    },
    infos() {
      let success;
      let failure;
      if (this.batchType === 'addMember') {
        success = `导入成功：${this.result.numSuccess} 个会员信息`;
        failure = `导入失败：${this.result.numFailure} 个会员信息`;
      }
      if (this.batchType === 'deposit') {
        success = `充值成功：${this.result.numSuccess} 条充值记录`;
        failure = `充值失败：${this.result.numFailure} 条充值记录`;
      }
      return { success, failure };
    },
  },
  methods: {
    /* 处理数据 */
    handleResultDate(e) {
      console.log(e);
      this.batchType = e.batchType;
      this.handleResultTableDate(e);
      this.handleBalanceWaraData(e);
    },
    /* 处理失败详情表格数据 */
    handleResultTableDate(e) {
      const { tableData } = e;
      this.result.numSuccess = tableData.numSuccess;
      this.result.numFailure = tableData.numFailure;
      this.result.dataFailure = tableData.dataFailure || [];
    },
    /* 处理余额不足提醒 */
    handleBalanceWaraData(e) {
      this.isBalanceWarnShow = e.isBalanceWarnShow;
      this.balanceWarnText = `本次充值总金额：￥ ${e.num}。`;
    },
  },
};
</script>

<style lang="less" scoped>
.modal-slot.result {
  width: 400px;
  padding-right: 15px;
}

.wrap-infos {
  font-size: 15px;
  .info {
    span {
      margin-left: 10px;
      line-height: 35px;
      height: 35px;
    }
    .icon {
      margin-left: 15px;
      font-size: 35px;
    }
  }
}

.wrap-divider {
  padding: 15px 0;
  position: relative;
  text-align: center;
  transform-style: preserve-3d;
  span {
    padding: 0 10px;
    background-color: #fff;
  }
  &::after {
    content: '';
    width: 100%;
    height: 1px;
    background-color: #ececec;
    position: absolute;
    display: block;
    bottom: 50%;
    z-index: 1;
    left: 0;
    transform: translateZ(-1px);
  }
}

.detail-table {
  width: 100%;
  text-align: center;
  tr {
    display: flex;
    justify-content: space-between;
    .col-name {
      width: 80px;
    }
    .col-phone {
      width: 100px;
    }
    .col-cardReadonly {
      flex: 1;
    }
    .col-status {
      width: 60px;
    }
    .omit-tips {
      flex: 1;
      padding-top: 10px;
    }
  }
}

.wrap-balance-warn {
  text-align: center;
  font-size: 15px;
  .warn {
    padding-bottom: 5px;
  }
}
</style>
