import React from 'react';
import PropTypes from 'prop-types';
import Ionicon from 'react-ionicons';

const PriceList = ({ items, onModifyItem, onDeleteItem }) => {
  return (
    <ul className="list-group list-group-flush">
      {
        items.map(item => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={item.id}
          >
            <span className="col-1 badge">
              <Ionicon
                className="rounded-circle"
                fontSize="30px"
                color="#fff"
                icon={item.category.iconName}
                style={{ backgroundColor: '#007bff', padding: '5px' }}
              />
            </span>
            <span className="col-5">
              {item.title}
            </span>
            <span className="col-2 font-weight-bold">
              {item.category.type === 'income' ? '+' : '-'}
              {item.price}元
            </span>
            <span className="col-2">{item.date}</span>

            <span
              className="icon-modify col-1"
              onClick={() => {onModifyItem(item)}}
            >
              <Ionicon
                className="rounded-circle"
                fontSize="30px"
                color="#fff"
                icon="ios-create-outline"
                style={{ backgroundColor: '#28a745', padding: '5px' }}
              />
            </span>
            <span
              className="icon-delete col-1"
              onClick={() => {onDeleteItem(item)}}
            >
              <Ionicon
                className="rounded-circle"
                fontSize="30px"
                color="#fff"
                icon="ios-close"
                style={{ backgroundColor: '#dc3545', padding: '5px' }}
              />
            </span>
          </li>
        ))
      }
    </ul>
  );
};

/* 使用 PropTypes 进行 props 检查 */
/* https://reactjs.org/docs/typechecking-with-proptypes.html#gatsby-focus-wrapper */
PriceList.propTypes = {
  items: PropTypes.array.isRequired,
  onModifyItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
};

/* default props */
/* 与 vue 有点不一样，默认和必填不冲突 */
PriceList.defaultProps = {
  onDeleteItem: item => {console.error(item)},
};

export default PriceList;
