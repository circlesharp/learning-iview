import React from 'react';

const TotalPrice = ({income, outcome}) => {
  return (
    <React.Fragment>
      <span>收入：{income}</span>
      <span className="ms-5">支出：{outcome}</span>
    </React.Fragment>
  )
};

export default TotalPrice;
