import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import PriceList from './components/PriceList';
import ViewTab from './components/ViewTab';
import MonthPicker from './components/MonthPicker';

import { LIST_VIEW, CHART_VIEW } from './utility';

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
      iconName: 'ios-plane',
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
      iconName: 'ios-plane',
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
        />
        <ViewTab
          activeTab={LIST_VIEW}
          onTabChange={() => {}}
        />
        <MonthPicker
          year={2021}
          month={1}
          onChange={(y, m) => {console.log(y, m)}}
        />
      </div>
    );
  }
}

export default App;
