/* 储存常量 */

export const LIST_VIEW = 'list';
export const CHART_VIEW = 'chart';


/* 公共方法 */

export const padLeft = n => {
  if (+n < 10) return `0${+n}`;
  return `${n}`;
}

export const range = (size, startAt = 0) => {
  const arr = [];
  for (let i = 0; i < size; i++)
    arr[i] = startAt + i;

  return arr;
}
