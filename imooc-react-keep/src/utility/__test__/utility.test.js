import { padLeft, range, parseToYearAndMonth, isValidDate, flattern, createId, generateChartDataByCategory } from '../index';
import { testCategories, testItems } from '../../testData';

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

describe('createId', () => {
  it('create a simple id', () => {
    const id = createId();
    expect(id.length).toEqual(10);
    expect(id[0]).toEqual('_');
  });
});

describe('generateChartDataByCategory', () => {
  const categoryMap = {};
  testCategories.forEach(category => {
    categoryMap[category.id] = category;
  });
  const itemsWithCategory = testItems.map(item => ({ ...item, category: categoryMap[item.cid] }));

  const incomeChartData = generateChartDataByCategory(itemsWithCategory);
  const outcomeChartData = generateChartDataByCategory(itemsWithCategory, 'outcome');

  const incomeRst = [
    { name: '理财', value: 1300, items: ['_1fg1wme63', '_qryggm5y8'] }
  ];
  const outcomeRst = [
    { name: '旅行', value: 100, items: ['_kly1klf4g'] },
    { name: '餐饮', value: 20000, items: ['_bd16bjeen'] },
    { name: '购物', value: 600, items: ['_jjfice21k', '_qryggm511'] }
  ];

  it('income chart data', () => {
    expect(incomeChartData).toEqual(incomeRst);
  });

  it('outcome chart data', () => {
    expect(outcomeChartData).toEqual(outcomeRst);
  });
});
