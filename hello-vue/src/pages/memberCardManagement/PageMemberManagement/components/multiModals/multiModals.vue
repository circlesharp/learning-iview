<template>
  <div class="multi-modals">
    <!-- class 01 信息修改类 -->
    <div class="wrap-edit">
      <!-- 添加会员 & 编辑会员 -->
      <Modal
        v-model="modalShow.addOrEditMember"
        width="432"
        :title="modalTitle"
        @on-ok="onAddOrEditMemberOk"
      >
        <AddOrEditMember ref="addOrEditMember" />
      </Modal>

      <!-- 充值 -->
      <Modal v-model="modalShow.deposit" width="432" :title="modalTitle">
        <Deposit ref="deposit" @on-deposit-change="onDepositChange" />
        <div slot="footer" class="modal-depoist-footer">
          <div class="amount-after-deposit">
            充值后余额：{{ modalData.deposit.amountAfterDeposit }}
          </div>
          <Button type="primary" @click="onDepositOk">确认充值</Button>
        </div>
      </Modal>
    </div>

    <!-- class 02 批量操作类 -->
    <div class="wrap-batch-operate">
      <Modal
        v-model="modalShow.batch"
        width="432"
        :title="modalTitle"
        @on-ok="handleBatchOk"
      >
        <Batch ref="batch" />
      </Modal>
    </div>

    <!-- class 03 批量结果类 -->
    <div class="wrap-batch-result">
      <Modal
        v-model="modalShow.result"
        width="432"
        :title="modalTitle"
        @on-ok="handleResultOk"
      >
        <Result ref="result" />
      </Modal>
    </div>

    <!-- class 04 打印类 -->
    <div class="wrap-print"></div>
  </div>
</template>

<script>
import AddOrEditMember from './components/modalContent/class01-addOrEditMember';
import Deposit from './components/modalContent/class01-deposit';
import Batch from './components/modalContent/class02-batch';
import Result from './components/modalContent/class03-result';
import constant from '../../../constant/constant';

const { DEPOSIT_RATE } = constant;

const mock = (function makeMock() {
  const dataFailure = [];
  const numFailure = 55;
  for (let i = 0; i < numFailure; i += 1)
    dataFailure.push({
      name: `周杰伦${i}`,
      phone: `${17666220000 + i}`,
      cardReadonly: `read_only_${1020304050607000 - i}`,
      status: i % 2,
    });
  const data = {
    numSuccess: 123456,
    numFailure,
    dataFailure,
  };
  return data;
})();

export default {
  components: { AddOrEditMember, Deposit, Batch, Result },
  data() {
    return {
      modalTitle: '',
      modalShow: {
        addOrEditMember: false,
        deposit: false,
        batch: false,
        result: false,
      },
      modalData: {
        deposit: {
          amount: 0,
          amountAfterDeposit: 0,
        },
      },
    };
  },
  methods: {
    // ======= 添加会员 & 编辑会员 =========
    handleShowAddMember() {
      this.modalTitle = '添加会员';
      this.$refs.addOrEditMember.refreshFormData();
      this.modalShow.addOrEditMember = true;
    },
    handleShowEditMember(e) {
      this.modalTitle = '编辑会员';
      this.$refs.addOrEditMember.handleFormData(e);
      this.modalShow.addOrEditMember = true;
    },
    onAddOrEditMemberOk() {
      /* 获取表单 */
      const rst = this.$refs.addOrEditMember.formData;

      /* 处理表单内容 */
      console.log('onAddOrEditMemberOk', rst);

      /* 刷新数据 */
      this.$refs.addOrEditMember.refreshFormData();
    },

    // ======= 会员充值 =========
    handleShowDeposit(e) {
      this.modalTitle = '会员充值';
      this.modalData.deposit.amount = e.amount;
      this.modalData.deposit.amountAfterDeposit = e.amount; // 初始化充值后余额
      this.$refs.deposit.handleFormData(e);
      this.modalShow.deposit = true;
    },
    onDepositChange(val) {
      this.modalData.deposit.amountAfterDeposit =
        this.modalData.deposit.amount + val;
    },
    onDepositOk() {
      /* 获取表单 */
      const rst = this.$refs.deposit.formData;

      /* 关闭 modal */
      this.modalShow.deposit = false;

      /* 处理表单内容 */
      console.log('onDepositOk', rst);
      if (rst.deposit < 0) {
        this.onComfirmNegativeDeposit(rst);
      }
    },
    onComfirmNegativeDeposit(e) {
      const { name } = e;
      const deposit = Math.abs(e.deposit);
      const fee = deposit * DEPOSIT_RATE;
      const content = `
        <p>当前操作将 <span style="color: red; font-weight: 600;">扣除</span> ${name}卡内余额 ${deposit} 元。</p>
        <p style="margin-top: 5px;">本次操作将收取 ${fee} 元手续费。</p>
      `;
      this.$Modal.confirm({
        title: '减值充值操作提示',
        content,
        onOk: () => {
          this.$Message.info('结算成功');
        },
        onCancel: () => {
          this.$Message.info('已取消');
        },
      });
    },

    // ======= 批量操作：批量添加会员 & 批量充值 =========
    handleShowBatchAddMember() {
      this.modalTitle = '批量添加会员';
      this.$refs.batch.handleFormData({ batchType: 'addMember' });
      this.modalShow.batch = true;
    },
    handleShowBatchDeposit() {
      this.modalTitle = '批量充值';
      this.$refs.batch.handleFormData({ batchType: 'deposit' });
      this.modalShow.batch = true;
    },
    handleBatchOk() {
      const { batchType } = this.$refs.batch;
      if (batchType === 'addMember') {
        this.handleShowBatchAddMemberResult();
      }
      if (batchType === 'deposit') {
        this.handleShowBatchDepositResult();
      }
      console.log('handleBatchOk', batchType);
    },

    // ======= 批量操作结果 =========
    handleShowBatchAddMemberResult() {
      this.modalTitle = '会员信息导入结果';
      const options = {
        batchType: 'addMember',
        tableData: mock,
      };
      this.$refs.result.handleResultDate(options);
      this.modalShow.result = true;
    },
    handleShowBatchDepositResult() {
      this.modalTitle = '会员充值导入结果';
      const options = {
        batchType: 'deposit',
        tableData: mock,
        isBalanceWarnShow: true,
        num: 2333333,
      };
      this.$refs.result.handleResultDate(options);
      this.modalShow.result = true;
    },
    handleResultOk() {
      const { batchType } = this.$refs.result;
      console.log('handleResultOk', batchType);
    },
  },
};
</script>

<style lang="less" scoped>
.modal-depoist-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
