<template>
  <div class="wrap-page">
    <div class="desc">
      设置8~16位含字母、数字的组合密码。
    </div>
    <i-form class="form" ref="form" :model="formData" :rules="formRules">
      <FormItem prop="newCode">
        <i-input
          type="password"
          v-model="formData.newCode"
          placeholder="请输入新的密码"
        />
      </FormItem>
      <FormItem prop="confirmCode">
        <i-input
          type="password"
          v-model="formData.confirmCode"
          placeholder="请再次输入密码"
        />
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
export default {
  data() {
    return {
      formData: {
        newCode: '',
        confirmCode: '',
      },
      formRules: {
        newCode: [
          {
            validator: (rule, value, callback) => {
              const reg = /(?!^([0-9]+|[a-zA-Z]+)$)^[a-zA-Z0-9]{8,16}$/;
              if (value === '') {
                callback(new Error('请输入新密码。'));
              } else if (!reg.test(value)) {
                callback(new Error('请输入8~16位含字母、数字的组合密码。'));
              } else {
                callback();
              }
            },
            trigger: 'blur',
          },
        ],
        confirmCode: [
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码。'));
              } else if (value !== this.formData.newCode) {
                callback(new Error('两次输入的密码不一致。'));
              } else {
                callback();
              }
            },
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    handleNextStep() {
      this.$refs.form.validate(valid => {
        if (valid) this.onNextStep();
        this.$Message.error('密码输入有误');
      });
    },
    onNextStep() {
      // operators.account.reset.pwd.v2
      const rst = false;
      if (rst) {
        const msg = '输入有误，请重新输入';
        this.$Message.error(msg);
      } else this.$emit('on-next');
    },
  },
};
</script>

<style lang="less" scoped>
.desc {
  margin-bottom: 20px;
  width: 300px;
}
.form {
  width: 300px;
  .ivu-form-item {
    margin-bottom: 27px;
  }
}
</style>
