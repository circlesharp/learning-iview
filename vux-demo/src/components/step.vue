<template>
  <div class="wrap-steps">
    <div class="steps">
      <div class="step" :class="idx === steps.length - 1 ? 'last-step' : 'not-last-step'"  v-for="(item, idx) in steps" :key="idx">
        <div class="head" :class="onClassHead(idx)"></div>
        <div class="rear" :class="onClassRear(idx)" v-if="idx < steps.length - 1"></div>
        <div class="wrap-desc">
          <div class="desc" :class="onClassDesc(idx)">{{ item }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    steps: {
      type: Array,
      default() {
        return ['验证账号', '发送验证码', '修改密码', '完成'];
      },
    },
    current: {
      type: Number,
      default: 2,
    },
  },
  methods: {
    onClassHead(idx) {
      if (idx < this.current) return 'actived';
      else if (idx === this.current) return 'activing';
      return 'unactived';
    },
    onClassRear(idx) {
      if (idx < this.current) return 'actived';
      return 'unactived';
    },
    onClassDesc(idx) {
      if (idx < this.current) return 'actived';
      else if (idx === this.current) return 'activing';
      return 'unactived';
    },
  }
};
</script>

<style lang="less" scoped>
@head-actived: purple;
@head-activing: red;
@head-unactived: pink;
@rear-actived: blue;
@rear-unactived: skyblue;
@desc-active: black;
@desc-unactived: grey;

@yp-yellow: #f4b32e;
@yp-grey: #e6e6e6;

.wrap-steps {
  padding-bottom: 20px;
}
.steps {
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  height: 50px;
  .step {
    position: relative;
    display: flex;
    align-items: center;
    .head {
      width: 10px;
      height: 10px;
      &.actived {
        background: @head-actived;
      }
      &.activing {
        background: @head-activing;
      }
      &.unactived {
        background: @head-unactived;
      }
    }
    .rear {
      flex: 1;
      height: 1px;
      &.actived {
        background: @rear-actived;
      }
      &.unactived {
        background: @rear-unactived;
      }
    }
    .wrap-desc {
      position: absolute;
      bottom: -10px;
      display: flex;
      justify-content: center;
      height: 20px;
      width: 10px;
      .desc {
        display: inline-block;
        flex-shrink: 0;
        height: 10px;
        font-size: 8px;
        line-height: 13px;
        &.actived {
          color: @desc-active;
        }
        &.activing {
          color: @desc-active;
          font-size: 13px;
          font-weight: 500;
        }
        &.unactived {
          color: @desc-unactived;
        }
      }
    }
  }
  .step.not-last-step {
    flex: 1;
  }
}
</style>
