import React from 'react';
import { mount } from 'enzyme';
import PriceForm from '../PriceForm';
import { testItems } from '../../testData';

let props = {
  onFormSubmit: jest.fn(),
  onCancelSubmit: jest.fn(),
};

let props_with_item = {
  item: testItems[0],
  onFormSubmit: jest.fn(),
  onCancelSubmit: jest.fn(),
};

let wrapper, wrapper2, formInstance;

export const getInputValue = (selector, wrapper) =>
  wrapper.find(selector).instance().value;

export const setInputValue = (selector, newValue, wrapper) => {
  wrapper.find(selector).instance().value = newValue;
};

describe('test PriceForm component', () => {
  beforeEach(() => {
    wrapper = mount(<PriceForm {...props} />);
    wrapper2 = mount(<PriceForm {...props_with_item} />);
    formInstance = wrapper.find(PriceForm).instance();
  });

  /* 1 snapshot */
  it('snapshot', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper2).toMatchSnapshot();
  });

  /* 2 Price with no item */
  describe('Price with no item', () => {
    /* 含 3 inputs, 1 form */
    it('含 3 inputs, 1 form', () => {
      expect(wrapper.find('input').length).toEqual(3);
      expect(wrapper.find('form').length).toEqual(1);
    });

    /* 默认表单空 */
    it('默认表单空', () => {
      expect(getInputValue('#title', wrapper)).toEqual('');
      expect(getInputValue('#price', wrapper)).toEqual('');
      expect(getInputValue('#date', wrapper)).toEqual('');
    });

    /* 提交空表单 */
    it('提交空表单', () => {
      wrapper.find('form').simulate('submit');

      expect(formInstance.state.validatePass).toEqual(false);
      expect(wrapper.find('.alert').length).toEqual(1);
      expect(props.onFormSubmit).not.toHaveBeenCalled(); // ??
    });

    /* 提交不合法的价格 */
    it('提交不合法的价格', () => {
      setInputValue('#title', 'test', wrapper);
      setInputValue('#price', '-20', wrapper);
      wrapper.find('form').simulate('submit');
      expect(formInstance.state.validatePass).toEqual(false);
    });

    /* 提交不合法的日期 */
    it('提交不合法的日期', () => {
      setInputValue('#title', 'test', wrapper);
      setInputValue('#price', '20', wrapper);
      setInputValue('#date', 'wrong date', wrapper);
      wrapper.find('form').simulate('submit');
      expect(formInstance.state.validatePass).toEqual(false);
    });

    /* 表单校验通过并触发提交回调 */
    it('表单校验通过', () => {
      const newItem = { title: 'test', price: 20, date: '2021-02-11' };
      setInputValue('#title', newItem.title, wrapper);
      setInputValue('#price', newItem.price, wrapper);
      setInputValue('#date', newItem.date, wrapper);
      wrapper.find('form').simulate('submit');
      expect(props.onFormSubmit).toHaveBeenCalledWith(newItem, false);
    });

    /* 触发取消回调 */
    it('触发取消回调', () => {
      wrapper.find('button').last().simulate('click');
      expect(props.onCancelSubmit).toHaveBeenCalled();
    });
  });

  /* 3 测试带有初始值 */
  describe('test PriceForm with item date', () => {
    /* 显示初始值 */
    it('显示初始值', () => {
      expect(getInputValue('#title', wrapper2)).toEqual(props_with_item.item.title);
      expect(getInputValue('#price', wrapper2)).toEqual(props_with_item.item.price.toString());
      expect(getInputValue('#date', wrapper2)).toEqual(props_with_item.item.date);
    });

    it('修改默认值', () => {
      const newItem = { title: 'test2', price: 22, date: '2021-02-12' };
      setInputValue('#title', newItem.title, wrapper2);
      setInputValue('#price', newItem.price, wrapper2);
      setInputValue('#date', newItem.date, wrapper2);
      wrapper2.find('form').simulate('submit');

      expect(formInstance.state.validatePass).toEqual(true);
      expect(wrapper2.find('.alert').length).toEqual(0);
      expect(props_with_item.onFormSubmit).toHaveBeenCalledWith(newItem, true);
    });
  });
});
