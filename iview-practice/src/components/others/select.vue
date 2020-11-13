<template>
  <div>
    <article>
      <h4>基础用法 + 尺寸</h4>
      <i-select v-model="model1" size="small" style="width: 200px">
        <i-option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</i-option>
      </i-select>
    </article>

    <article>
      <h4>禁用 + 可清空</h4>
      <i-select v-model="model1" size="small" style="width: 200px" clearable>
        <i-option value="New York">New York</i-option>
        <i-option value="Beijing" disabled>Beijing</i-option>
        <i-option value="London">London</i-option>
        <!-- <i-option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</i-option> -->
      </i-select>
    </article>

    <article>
      <h4>分组</h4>
      <i-select v-model="model2" style="width: 200px">
        <OptionGroup label="Hot Cities">
          <i-option v-for="item in cityList1" :value="item.value" :key="item.value">{{item.label}}</i-option>
        </OptionGroup>
        <OptionGroup label="Other Cities">
          <i-option v-for="item in cityList2" :value="item.value" :key="item.value">{{item.label}}</i-option>
        </OptionGroup>
      </i-select>
    </article>

    <article>
      <h4>自定义模板</h4>
      <i-select v-model="model3" style="width: 200px">
        <i-option
          v-for="item in cityList3" :key="item.value"
          :value="item.value" :label="item.value"
        >
          <span>{{item.value}}</span>
          <span style="float: right; color: #ccc;">{{item.country}}</span>
        </i-option>
      </i-select>
    </article>

    <article>
      <h4>多选</h4>
      <p><span>{{model4}}</span></p>
      <i-select v-model="model4" style="width: 260px;" multiple>
        <i-option v-for="item in cityList" :value="item.value" :key="item.value">{{item.label}}</i-option>
      </i-select>
    </article>

    <article>
      <h4>标签集合</h4>
      <i-select></i-select>
    </article>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      cityList: [
        {
          value: "New York",
          label: "New York"
        },
        {
          value: "London",
          label: "London"
        },
        {
          value: "Sydney",
          label: "Sydney"
        },
        {
          value: "Ottawa",
          label: "Ottawa"
        },
        {
          value: "Paris",
          label: "Paris"
        },
        {
          value: "Canberra",
          label: "Canberra"
        }
      ],
      cityList1: [
        {
          value: "New York",
          label: "New York"
        },
        {
          value: "London",
          label: "London"
        },
        {
          value: "Sydney",
          label: "Sydney"
        }
      ],
      cityList2: [
        {
          value: "Ottawa",
          label: "Ottawa"
        },
        {
          value: "Paris",
          label: "Paris"
        },
        {
          value: "Canberra",
          label: "Canberra"
        }
      ],
      cityList3: [
        { value: 'New York', country: 'America' },
        { value: 'London', country: 'U.K.' },
        { value: 'Sydney', country: 'Australian' },
      ],
      model1: "",
      model2: "",
      model3: "",
      model4: "",
    };
  }
};
</script>

<style lang="less" scoped>
</style>
