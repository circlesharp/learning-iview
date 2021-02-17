/* 储存常量 */

export const LIST_VIEW = 'list';
export const CHART_VIEW = 'chart';
export const TYPE_INCOME = 'income';
export const TYPE_OUTCOME = 'outcome';

export const Colors = {
  blue: '#347eff',
  deepBlue: '#61dafb',
  green: '#28a745',
  red: '#dc3545',
  gray: '#555',
  lightGray: '#efefef',
  white: '#fff',
};


/* 公共方法 */

export const padLeft = n => {
  if (+n < 10) return `0${+n}`;
  return `${n}`;
};

export const range = (size, startAt = 0) => {
  const arr = [];
  for (let i = 0; i < size; i++)
    arr[i] = startAt + i;

  return arr;
};

export const parseToYearAndMonth = str => {
  const date = str ? new Date(str) : new Date();

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
  };
};

export const isValidDate = dateString => {
  const regExp = /^\d{4}[-/]\d{2}[-/]\d{2}$/;
  if (!dateString.match(regExp))
    return false;

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime()))
    return false;

  return true;
};

export const flattern = arr =>
  arr.reduce((whole, part) => {
    whole[part.id] = part;
    return whole;
  }, {});

export const createId = () =>
  `_${Math.random().toString(36).substr(2, 9)}`;

export const generateChartDataByCategory = (items, type = TYPE_INCOME) => {
  const categoryMap = {};
  items.filter(item => item.category.type === type)
    .forEach(item => {
      if (categoryMap[item.cid]) {
        categoryMap[item.cid].value += +item.price;
        categoryMap[item.cid].items.push(item.id);
      } else {
        categoryMap[item.cid] = {
          name: item.category.name,
          value: +item.price,
          items: [item.id],
        };
      }
    });

  return Object.keys(categoryMap).map(mapKey => categoryMap[mapKey]);
};
