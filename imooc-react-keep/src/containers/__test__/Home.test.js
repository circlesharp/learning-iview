import React from 'react';
import { mount } from 'enzyme';
import Home, { newItem } from '../Home';
import PriceList from '../../components/PriceList';
import MonthPicker from '../../components/MonthPicker';
import CreateBtn from '../../components/CreateBtn';

let wrapper;

describe('test Home container component', () => {
  beforeEach(() => {
    wrapper = mount(<Home />);
  });

  /* 1 默认状态 */
  it('默认状态', () => {
    expect(wrapper.find(PriceList).length).toEqual(1);
    expect(wrapper.find(MonthPicker).props().year).toEqual(2021);
    expect(wrapper.find(MonthPicker).props().month).toEqual(1);
    expect(wrapper.find(PriceList).props().items.length).toEqual(2);
  });

  /* 2 改变 view tab */
  it('改变 view tab', () => {
    wrapper.find('.nav-item a').last().simulate('click');
    expect(wrapper.find(PriceList).length).toEqual(0);
    expect(wrapper.find('.chart-title').length).toEqual(1);
  });

  /* 3 改变日期选择 */
  it('改变日期选择', () => {
    wrapper.find('.dropdown-toggle').simulate('click');
    wrapper.find('.months-range .dropdown-item').at(1).simulate('click');
    expect(wrapper.find(PriceList).props().items.length).toEqual(1);

    wrapper.find('.dropdown-toggle').simulate('click');
    wrapper.find('.months-range .dropdown-item').at(2).simulate('click');
    expect(wrapper.find(PriceList).props().items.length).toEqual(0);
  });

  /* 4 点击添加按钮 */
  it('点击添加按钮', () => {
    wrapper.find(CreateBtn).find('button').simulate('click');
    expect(wrapper.find(PriceList).props().items.length).toEqual(3);
    expect(wrapper.state('items')[0]).toEqual(newItem);
  });
});
