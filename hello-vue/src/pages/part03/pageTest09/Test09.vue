<template>
  <div>
    <div class="section red">section-up</div>
    <div class="section wrap-drop-down">
      <Tabs v-model="tabLabel">
        <TabPane label="label01" name="label01">
          <DropDown :options="dropDownOpt" @option-change="handleOptChange" />
        </TabPane>
        <TabPane label="label02" name="label02">
          label02
        </TabPane>
        <TabPane label="label03" name="label03">
          label03
        </TabPane>
      </Tabs>
    </div>
    <div class="section blue">section-up</div>
  </div>
</template>

<script>
import DropDown from './components/DropDown';
import mock from './components/mock';

export default {
  components: { DropDown },
  data() {
    return {
      dropDownOpt: mock,
      tabLabel: 'label01',
    };
  },
  created() {
    console.log(mock);
  },
  methods: {
    handleOptChange(e) {
      console.log(e);
    },
  },
};
</script>

<style lang="less">
.section {
  height: 300px;
  background-color: #eee;
  &.red {
    z-index: 9999;
    background-color: rgb(148, 101, 101);
  }
  &.blue {
    z-index: 9999;
    background-color: rgb(82, 82, 107);
  }
}
</style>
