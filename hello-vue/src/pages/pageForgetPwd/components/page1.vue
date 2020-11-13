<template>
  <div class="wrap-page">
    <i-form class="form" ref="form" :model="formData" :rules="formRules">
      <FormItem prop="account">
        <i-input
          type="text"
          v-model="formData.account"
          placeholder="请输入手机/邮箱账号"
        />
      </FormItem>
      <FormItem prop="captcha">
        <div class="wrap-captcha">
          <i-input
            type="text"
            v-model="formData.captcha"
            placeholder="请输入图形验证码"
          />
          <span class="captcha">captcha</span>
        </div>
      </FormItem>
      <FormItem style="margin-bottom: 16px;">
        <Button long type="primary" @click="handleSubmit">
          下一步
        </Button>
      </FormItem>
      <FormItem>
        <Button ghost long type="primary" @click="handleBack">
          返回登录页
        </Button>
      </FormItem>
    </i-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        account: '',
        captcha: '',
      },
      formRules: {
        account: [
          {
            required: true,
            message: '请填写手机/邮箱账号。',
            trigger: 'blur',
          },
        ],
        captcha: [
          {
            required: true,
            message: '请填写图形验证码。',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  created() {
    this.getCaptcha();
  },
  methods: {
    getCaptcha() {
      // operators.account.captcha.svg
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.onVerify();
        } else {
          this.$Message.error('请填写账号和验证码');
        }
      });
    },
    onVerify() {
      // operators.account.verify
      // 图形验证码错误，请重新输入
      // 该账号未注册
      // 出错了！您尝试输入账号次数过多。
      const rst = false;
      if (rst) {
        const msg = '图形验证码错误，请重新输入';
        this.$Message.error(msg);
      } else this.$emit('on-next', 0, { account: this.formData.account });
    },
    handleBack() {
      console.log('handleBack');
    },
  },
};
</script>

<style lang="less" scoped>
.form {
  width: 300px;
  .ivu-form-item {
    margin-bottom: 27px;
  }
}
.wrap-captcha {
  display: flex;
  .captcha {
    margin-left: 10px;
    background-color: #eee;
    width: 80px;
  }
}
</style>
