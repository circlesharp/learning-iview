import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import MonthPicker from '../MonthPicker';

let props = {
  year: 2018,
  month: 8,
  onChange: jest.fn(),
};

let wrapper;
let dropdownToggle;

describe('test MonthPicker component', () => {
  /* 1 before each */
  beforeEach(() => {
    wrapper = mount(<MonthPicker {...props} />);
    dropdownToggle = wrapper.find('.dropdown-toggle').first();
  });

  /* 2 snapshot */
  it('should render the component to match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  /* 3 默认的状态 */
  it('默认的状态', () => {
    /* 按钮默认值为传入值 */
    const text = dropdownToggle.text();
    expect(text).toEqual(`2018年 08月`);

    /* 默认不显示下拉菜单 */
    expect(wrapper.find('.dropdown-menu').length).toEqual(0);

    /* state.isOpen 默认 false */
    expect(wrapper.state('isOpen')).toEqual(false);

    /* state.selectedYear 默认为传入的 props.year */
    expect(wrapper.state('selectedYear')).toEqual(props.year);
  });

  /* 4 点击后的状态 */
  it('点击后的状态', () => {
    /* 触发点击事件 */
    dropdownToggle.simulate('click');

    /* 显示下拉菜单 */
    expect(wrapper.find('.dropdown-menu').length).toEqual(1);

    /* state.isOpen 为 true */
    expect(wrapper.state('isOpen')).toEqual(true);

    /* 年份 years-range */
    expect(wrapper.find('.years-range .dropdown-item').length).toEqual(9);
    expect(wrapper.find('.years-range .dropdown-item.active').text()).toEqual('2018 年');
    expect(
      wrapper.find('.years-range .dropdown-item').first().text()
    ).toEqual(`${props.year - 4} 年`);


    /* 月份 months-range */
    expect(wrapper.find('.months-range .dropdown-item').length).toEqual(12);
    expect(wrapper.find('.months-range .dropdown-item.active').text()).toEqual('08 月');
    expect(
      wrapper.find('.months-range .dropdown-item').first().text()
    ).toEqual('01 月');
  });

  /* 5 行为 触发年份第一项点击事件 */
  it('行为 触发年份第一项点击事件', () => {
    /* 触发年份第一项点击事件 */
    dropdownToggle.simulate('click');
    wrapper.find('.years-range .dropdown-item').first().simulate('click');

    /* 检查是否有 active */
    expect(
      wrapper.find('.years-range .dropdown-item').first().hasClass('active')
    ).toEqual(true);

    /* 是否selecteddYear 修改 */
    expect(wrapper.state('selectedYear')).toEqual(2014);
  });

  /* 6 行为 触发月份第一项点击事件 */
  it('行为 触发月份第一项点击事件', () => {
    /* 触发月份第一项点击事件 */
    dropdownToggle.simulate('click');
    wrapper.find('.months-range .dropdown-item').first().simulate('click');

    /* 下拉菜单关闭 */
    expect(wrapper.state('isOpen')).toEqual(false);

    /* onChange 函数带参数调用 */
    expect(props.onChange).toHaveBeenCalledWith(2018, 1);
  });

  /* 7 模拟 document 点击事件 */
  it('模拟 document 点击事件', () => {
    /* 改写 addEventListener (拦截) */
    const eventMap = {};
    document.addEventListener = jest.fn((event, cb) => {
      eventMap[event] = cb;
    });

    const wrapper = mount(<MonthPicker {...props} />);
    wrapper.find('.dropdown-toggle').simulate('click');
    expect(wrapper.state('isOpen')).toEqual(true);
    expect(wrapper.find('.dropdown-menu').length).toEqual(1);

    /* 测试点击下拉菜单 */
    eventMap.click({
      target: ReactDOM.findDOMNode(wrapper.instance()),
    });
    expect(wrapper.state('isOpen')).toEqual(true);

    /* 测试点击 document */
    eventMap.click({ event: document });
    expect(wrapper.state('isOpen')).toEqual(false);
  })
});
