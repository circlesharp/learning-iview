<template>
  <div>
    <Button @click="test">{{ modalOperatorCompleted }}</Button>

    <div class="wrap-modal">
      <div class="wrap-message">
        <MassageText />
      </div>

      <div class="wrap-content" v-if="multipleProducts.length">
        <ModalContent
          :multipleProducts="multipleProducts"
          @on-product-change="onProductChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MassageText from './components/MessageText';
import ModalContent from './components/ModalContent';
import mock from './components/mock';

export default {
  components: { MassageText, ModalContent },
  data() {
    return {
      multipleProducts: [],
      chosenRst: null,
      modalOperatorCompleted: false, // 操作是否完整(不含 null)
    };
  },
  created() {
    setTimeout(() => {
      this.multipleProducts = mock;
    }, 500);
  },
  methods: {
    test() {
      if (!this.modalOperatorCompleted) {
        this.$Message.error('请完整选择商品售卖包装');
        return;
      }
    },
    onProductChange(chosenRst) {
      this.chosenRst = chosenRst;
      console.log(chosenRst);
      if (!chosenRst) this.modalOperatorCompleted = false;
      this.modalOperatorCompleted = !chosenRst.includes(null);
    },
  },
};
</script>

<style lang="less" scoped>
.wrap-modal {
  width: 800px;
  padding: 10px;
  border: 1px solid red;
}

.wrap-message {
  margin-bottom: 10px;
}
</style>
