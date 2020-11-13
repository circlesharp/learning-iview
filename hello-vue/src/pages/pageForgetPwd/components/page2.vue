<template>
  <div class="wrap-page">
    <div class="desc">
      友朋将验证码发至 {{ account }}，接收验证码后，请在10分钟内验证。
    </div>
    <i-form class="form" ref="form" :model="formData" :rules="formRules">
      <FormItem prop="verifyingCode">
        <div class="wrap-verifying-code">
          <i-input
            type="text"
            v-model="formData.verifyingCode"
            :placeholder="`请输入${accountType}验证码`"
          />
          <Button
            type="primary"
            :ghost="!verifyingBtn.enable"
            @click="handleSendVerifyingCode"
          >
            {{ verifyingBtn.text }}
          </Button>
        </div>
      </FormItem>
      <FormItem>
        <Button long type="primary" @click="handleNextStep">
          下一步
        </Button>
      </FormItem>
    </i-form>
  </div>
</template>

<script>
const COUNT_DOWN = 6;

export default {
  props: {
    account: {
      type: [Number, String],
      default: `17665234119 (test)`,
    },
  },
  data() {
    return {
      accountType: /@/.test(this.account) ? '邮箱' : '手机',
      formData: {
        verifyingCode: '',
      },
      formRules: {
        verifyingCode: [
          {
            required: true,
            message: '请填写验证码。',
            trigger: 'blur',
          },
        ],
      },
      verifyingBtn: {
        text: '发送验证码',
        enable: true,
      },
    };
  },
  methods: {
    handleSendVerifyingCode() {
      // operators.account.sms.send
      this.onBtnCountDown();
    },
    onBtnCountDown() {
      this.verifyingBtn.enable = false;
      let countDown = COUNT_DOWN;
      const timer = setInterval(() => {
        countDown -= 1;
        this.verifyingBtn.text = `重新发送 (${countDown})`;
        if (countDown === 0) {
          clearInterval(timer);
          this.verifyingBtn.text = '重新发送';
          this.verifyingBtn.enable = true;
        }
      }, 1000);
    },
    handleNextStep() {
      this.$refs.form.validate(valid => {
        if (valid) this.onVerify();
        else this.$Message.error('请填写手机验证码');
      });
    },
    onVerify() {
      // operators.account.verify.code
      const rst = false;
      if (rst) {
        const msg = '验证码错误，请重新输入';
        this.$Message.error(msg);
      } else this.$emit('on-next');
    },
  },
};
</script>

<style lang="less" scoped>
.desc {
  margin-bottom: 20px;
}
.form {
  width: 300px;
  .ivu-form-item {
    margin-bottom: 27px;
  }
}
.wrap-verifying-code {
  display: flex;
  button {
    margin-left: 10px;
  }
}
</style>
