import React from 'react';
import Ionicon from 'react-ionicons';
import { mount } from 'enzyme';
import CategorySelect from '../CategorySelect';

export const categories = [
  {
    id: '1',
    name: '旅行',
    type: 'outcome',
    iconName: 'ios-plane',
  },
  {
    id: '2',
    name: '理财',
    type: 'income',
    iconName: 'logo-yen',
  },
  {
    id: '3',
    name: '理财',
    type: 'income',
    iconName: 'logo-yen',
  },
];

let props = {
  categories,
  onSelectCategory: jest.fn(),
};

let props_with_category = {
  categories,
  onSelectCategory: jest.fn(),
  selectedCategory: categories[0],
};

describe('test CategorySelect component', () => {
  /* 1 初始化组件 */
  it('初始化组件', () => {
    const wrapper = mount(<CategorySelect {...props} />);
    const firstIcon = wrapper.find('.category-item').first().find(Ionicon);

    expect(wrapper.find('.category-item').length).toEqual(categories.length);
    expect(wrapper.find('.category-item.active').length).toEqual(0);

    expect(firstIcon.length).toEqual(1);
    expect(firstIcon.props().icon).toEqual(categories[0].iconName);
  });

  /* 2 带选中的初始化 */
  it('带选中的初始化', () => {
    const wrapper = mount(<CategorySelect {...props_with_category} />);
    expect(wrapper.find('.category-item').first().hasClass('active')).toEqual(true);
  });

  /* 3 点击触发回调 */
  it('点击触发回调', () => {
    const wrapper = mount(<CategorySelect {...props_with_category} />);
    wrapper.find('.category-item').at(1).simulate('click');

    expect(wrapper.find('.category-item').at(1).hasClass('active')).toEqual(true);
    expect(wrapper.find('.category-item').first().hasClass('active')).toEqual(false);
    expect(props_with_category.onSelectCategory).toHaveBeenCalledWith(categories[1]);
  });
});

