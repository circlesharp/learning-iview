import React from 'react';
import { shallow } from 'enzyme';
import Ionicon from 'react-ionicons';
import PriceList from '../PriceList';
import { items, categories } from '../../containers/Home';

const itemsWithCategory = items.map(item => {
  item.category = categories[item.cid];
  return item;
});

const props = {
  items: itemsWithCategory,
  onModifyItem: jest.fn(),
  onDeleteItem: jest.fn(),
};

let wrapper;

describe('PriceList component', () => {
  /* 每次运行单个测试用例时，都会执行 */
  beforeEach(() => {
    wrapper = shallow(<PriceList {...props} />);
  });

  /* 运行后，会在 __snapshots__ 出现 xx.test.js.snap */
  it('shoule render the component to match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  /* 测试条目是否等于 itemsWithCategory 的项的个数 */
  it('should render correct price items length', () => {
    expect(wrapper.find('.list-group-item').length).toEqual(itemsWithCategory.length);
  });

  /* 测试每项是否渲染正确的 icon&price */
  it('should render correct icon and price for each item', () => {
    const iconList = wrapper.find('.list-group-item').first().find(Ionicon);
    expect(iconList.length).toEqual(itemsWithCategory.length);
    expect(iconList.first().props().icon)
      .toEqual(itemsWithCategory[0].category.iconName);
  });

  /* 测试点击按钮是否触发特定回调 */
  it('should trigger the correct funtion callbacks', () => {
    const firstItem = wrapper.find('.list-group-item').first();

    // 模拟 修改 按钮被点击
    firstItem.find('.icon-modify').simulate('click');
    // 检查该函数是否被调用
    expect(props.onModifyItem).toHaveBeenCalled();

    // 检查该函数是否被调用且传入合适的参数
    firstItem.find('.icon-delete').simulate('click');
    expect(props.onDeleteItem).toHaveBeenCalledWith(itemsWithCategory[0]);
  });
});
