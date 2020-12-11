<template>
  <Dropdown
    :transfer="true"
    trigger="click"
    placement="bottom-end"
    class="table-folder"
  >
    <Button icon="android-settings" type="primary">
      更多支付方式
    </Button>
    <DropdownMenu slot="list">
      <CheckboxGroup v-model="displayCols" @on-change="handleOptionChange">
        <template v-for="(item, index) in options">
          <div v-show="item.key" :key="index">
            <Checkbox
              :label="item.key"
              class="checkbox"
              style="width: 100%; margin: 0;"
            >
              {{ item.title }}
            </Checkbox>
          </div>
        </template>
      </CheckboxGroup>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
export default {
  name: 'TableFolder',
  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      displayCols: [],
    };
  },
  computed: {
    current() {
      return this.options.filter(e => this.displayCols.indexOf(e.key) > -1);
    },
  },
  created() {
    this.options.forEach(e => {
      if (!(e.display === false)) {
        this.displayCols.push(e.key);
      }
    });
    this.$nextTick(() => {
      if (this.displayCols.length) {
        this.$emit('option-change', this.current);
      }
    });
  },
  methods: {
    handleOptionChange() {
      this.$emit('option-change', this.current);
    },
  },
};
</script>

<style lang="less">
.table-folder {
  .checkbox {
    padding: 5px 10px;
  }
}
.ivu-dropdown-menu {
  // height: 400px;
  // overflow: auto;
}
</style>
