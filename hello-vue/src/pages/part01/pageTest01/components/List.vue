<template>
  <div class="modal-list">
    <div class="wrap-title" :title="title">{{ title }}</div>
    <div class="wrap-pic">
      <div
        class="grid-pic"
        v-for="(i, k) in products.ProviderProducts"
        :key="k"
      >
        <div
          class="pic"
          :class="chosenIdx === k ? 'active' : ''"
          @click="onChoose(k)"
        >
          <img class="product-image" :src="i.ProviderImageUrl" />
          <div class="wrap-badge">
            <Icon type="md-checkmark" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: Object,
    idx: Number,
  },
  data() {
    return {
      chosenIdx: -1,
    };
  },
  computed: {
    title() {
      return `${this.idx + 1}、${this.products.Name}`;
    },
  },
  methods: {
    onChoose(idx) {
      if (this.chosenIdx === idx) this.chosenIdx = -1;
      else this.chosenIdx = idx;
      this.$emit('on-product-change', this.chosenIdx, this.idx);
    },
  },
};
</script>

<style lang="less" scoped>
@yp-orange: #ff8e05;

.wrap-title {
  margin-bottom: 10px;
  font-size: 14px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.wrap-pic {
  display: flex;
  flex-wrap: wrap;
  .grid-pic {
    display: flex;
    justify-content: center;
    flex: 0 0 25%;
  }
  .pic {
    position: relative;
    text-align: center;
    margin-bottom: 15px;
    width: 80px;
    height: 80px;
    .product-image {
      border: 1px solid #eee;
      width: 80px;
      height: 80px;
    }
    .wrap-badge {
      display: none;
    }
  }
  .pic.active {
    .product-image {
      border: 1px solid @yp-orange;
    }
    .wrap-badge {
      display: block;
      position: absolute;
      bottom: 0;
      right: 0;
      height: 0;
      border-width: 18px;
      border-style: solid;
      border-color: transparent @yp-orange @yp-orange transparent;
      .ivu-icon {
        position: absolute;
        bottom: -15px;
        right: -15px;
        font-size: 16px;
        color: #fff;
      }
    }
  }
}
</style>
