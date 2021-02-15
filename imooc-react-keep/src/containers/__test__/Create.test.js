import React from 'react';
import { mount } from 'enzyme';
import { Create } from '../Create';
import { flattern, createId, parseToYearAndMonth } from '../../utility';
import Loader from '../../components/Loader';
import CategorySelect from '../../components/CategorySelect';
import PriceForm from '../../components/PriceForm';
import { testCategories, testItems } from '../../testData';

const testItem = testItems[0];
const match = { params: { id: testItem.id } };
const history = { push: () => { } };
const createMatch = { params: { id: '' } };

const initData = {
  categories: {},
  items: {},
  isLoading: false,
  currentDate: parseToYearAndMonth(),
};

const withLoadingData = {
  categories: flattern(testCategories),
  items: flattern(testItems),
  isLoading: false,
  currentDate: parseToYearAndMonth(),
};

const loadingData = {
  ...initData,
  isLoading: true,
};

const actions = {
  /* mockReturnValue 模拟返回值 */
  getEditData: jest.fn().mockReturnValue(Promise.resolve({
    editItem: testItem,
    categories: flattern(testCategories),
  })),
  createItem: jest.fn().mockReturnValue(Promise.resolve({})),
  updateItem: jest.fn().mockReturnValue(Promise.resolve({})),
};

/* 1 测试初始化状态 */
describe('init behavior', () => {
  /* actions.getEditData 正常调用 */
  it('actions.getEditData 正常调用', () => {
    mount(
      <Create data={initData} actions={actions} match={match} />
    );
    expect(actions.getEditData).toHaveBeenCalledWith(testItem.id);
  });

  /* 显示 Loader */
  it('显示 Loader', () => {
    const wrapper = mount(
      <Create data={loadingData} actions={actions} match={match} />
    );
    expect(wrapper.find(Loader).length).toEqual(1);
  });
});

/* 2 测试创建状态 */
describe('in create mode', () => {
  const wrapper = mount(
    <Create
      data={withLoadingData}
      actions={actions}
      match={createMatch}
      history={history}
    />
  );

  const setInputValue = (selector, newValue) => {
    wrapper.find(selector).instance().value = newValue;
  };

  /* 不传 props 到 CategorySelect */
  it('不传 props 到 CategorySelect', () => {
    expect(wrapper.find(CategorySelect).props().selectedCategory).toEqual(null);
  });

  /* 不传 props 到 PriceForm */
  it('不传 props 到 PriceForm', () => {
    expect(wrapper.find(PriceForm).props().item).toEqual({});
  });

  /* 直接提交不触发提交函数 actions.createItem */
  it('接提交不触发提交函数 actions.createItem', () => {
    wrapper.find('form').simulate('submit');
    expect(actions.createItem).not.toHaveBeenCalled();
  });

  /* 填写好后，能触发提交函数 actions.createItem */
  it('填写好后，能触发提交函数 actions.createItem', () => {
    const inputItem = {
      title: 'title',
      price: 200,
      date: '2021-02-16',
    };

    setInputValue('#title', inputItem.title);
    setInputValue('#price', inputItem.price);
    setInputValue('#date', inputItem.date);
    wrapper.find('.category-item').first().simulate('click');
    wrapper.find('form').simulate('submit');
    expect(actions.createItem).toHaveBeenCalledWith(inputItem, testCategories[0].id);
  });
});

/* 2 测试编辑状态 */
describe('in edit mode', () => {
  const wrapper = mount(
    <Create
      data={withLoadingData}
      actions={actions}
      match={match}
      history={history}
    />
  );

  const setInputValue = (selector, newValue) => {
    wrapper.find(selector).instance().value = newValue;
  };

  const selectedCategory = testCategories.find(
    category => testItem.cid === category.id
  );

  /* 显示正确的类别 */
  it('显示正确的类别', () => {
    wrapper.update(); // 触发 componentDidMount
    expect(wrapper.find(CategorySelect).props().selectedCategory).toEqual(selectedCategory);
  });

  /* 触发 modifyItem */
  it('触发 modifyItem', () => {
    setInputValue('#title', 'new title');
    wrapper.find('form').simulate('submit');
    const testData = { ...testItem, title: 'new title' };
    expect(actions.updateItem).toHaveBeenCalledWith(testData, selectedCategory.id);
  });
});
