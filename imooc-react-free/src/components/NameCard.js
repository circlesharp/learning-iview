/* props 作为纯函数的参数 */

import React from 'react';

class NameCardClass extends React.Component {
  render() {
    const { name, number, isHuman, tags } = this.props;
    return (
      <div className="alert alert-success">
        <h4 className="alert-heading">{ name }</h4>
        <ul>
          <li>电话：{ number }</li>
          <li>{ isHuman ? '人类' : '外星人' }</li>
          <hr />
          <p>
            { tags.map(
              (tag, idx) =>
                <span className="badge badge-pill badge-primary" key={ idx }>
                  { tag }
                </span>
            )}
          </p>
        </ul>
      </div>
    );
  }
}

/* 像纯函数一样使用 props */
const NameCardFun = props => {
  const { name, number, isHuman, tags } = props;
  return (
    <div className="alert alert-success">
      <h4 className="alert-heading">{ name }</h4>
      <ul>
        <li>电话：{ number }</li>
        <li>{ isHuman ? '人类' : '外星人' }</li>
        <hr />
        <p>
          { tags.map(
            (tag, idx) =>
              <span className="badge badge-pill badge-primary" key={ idx }>
                { tag }
              </span>
          )}
        </p>
      </ul>
    </div>
  );
};

// export default NameCardClass;
export default NameCardFun;
