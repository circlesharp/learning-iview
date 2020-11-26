<template>
  <div class="modal-content">
    <div
      class="wrap-list"
      v-for="(products, idx) in multipleProducts"
      :key="idx"
    >
      <List
        :products="products"
        :idx="idx"
        @on-product-change="onProductChange"
      />
    </div>
  </div>
</template>

<script>
import List from './List';
export default {
  components: { List },
  props: {
    multipleProducts: Array,
  },
  data() {
    return {
      chosenRst: null,
    };
  },
  created() {
    this.chosenRst = new Array(this.multipleProducts.length).fill(null);
  },
  methods: {
    onProductChange(productIdx, rowIdx) {
      this.chosenRst[rowIdx] =
        this.multipleProducts[rowIdx].ProviderProducts[productIdx] || null;
      this.$emit('on-product-change', this.chosenRst);
    },
  },
};
</script>

<style lang="less" scoped>
.modal-content {
  display: flex;
  flex-wrap: wrap;
}
.wrap-list {
  flex: 0 0 50%;
  padding: 0 20px;
}
</style>
