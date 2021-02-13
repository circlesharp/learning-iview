import { padLeft, range, parseToYearAndMonth, isValidDate, flattern } from '../index';

describe('padLeft', () => {
  it('1 => 01', () => {
    expect(padLeft(1)).toEqual('01');
  });
  it('9 => 09', () => {
    expect(padLeft(9)).toEqual('09');
  });
  it('10 => 10', () => {
    expect(padLeft(10)).toEqual('10');
  });
});

describe('range', () => {
  it('range 3', () => {
    expect(range(3)).toEqual([0, 1, 2]);
  });
  it('range 5', () => {
    expect(range(5)).toEqual([0, 1, 2, 3, 4]);
  });
});

describe('parseToYearAndMonth', () => {
  it('有参数 2020/01/31', () => {
    expect(parseToYearAndMonth('2020/01/31')).toEqual({ year: 2020, month: 1 });
  });
  it('无参数 现在', () => {
    expect(parseToYearAndMonth()).toEqual({
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    });
  });
});

describe('isValidDate', () => {
  it('judge 2020/01/12', () => {
    expect(isValidDate('2020/01/12')).toEqual(true);
  });
  it('judge 2018/08/15', () => {
    expect(isValidDate('2018/08/15')).toEqual(true);
  });
  it('judge 2018-8-15', () => {
    expect(isValidDate('2018-08-15')).toEqual(true);
  });
  it('judge 2020/01/32', () => {
    expect(isValidDate('2020/01/32')).toEqual(false);
  });
});

describe('flattern', () => {
  it('flattern an array', () => {
    const arr = [{ id: '567', name: 'a' }, { id: '89', name: 'b' }];
    const rst = { 567: arr[0], 89: arr[1] };
    expect(flattern(arr)).toEqual(rst);
  });
});
