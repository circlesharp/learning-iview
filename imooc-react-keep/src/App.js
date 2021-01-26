import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import PriceList from './components/PriceList';

const items = [
  {
    id: '1',
    title: '去云南旅游',
    price: 200,
    date: '2021-01-26',
    category: {
      id: '1',
      name: '旅行',
      type: 'outcome',
    }
  },
  {
    id: '2',
    title: '去北京旅游',
    price: 2200,
    date: '2021-01-26',
    category: {
      id: '1',
      name: '旅行',
      type: 'outcome',
    }
  },
];

class App extends React.Component {
  render() {
    return (
      <div>
        <PriceList
          items={items}
          onModifyItem={item => {alert(item.id)}}
          onDeleteItem={item => {alert(item.id)}}
        />
      </div>
    );
  }
}

export default App;
