import React from 'react';

const TotalPrice = ({income, outcome}) => {
  return (
    <div className="row">
      <div className="col income">
        收入：<span>{income}</span>
      </div>
      <div className="col outcome ms-5">
        支出：<span>{outcome}</span>
      </div>
    </div>
  )
};

export default TotalPrice;
