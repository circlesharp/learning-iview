import React from 'react';
import Ionicon from 'react-ionicons';

import PriceList from '../components/PriceList';
import MonthPicker from '../components/MonthPicker';
import TotalPrice from '../components/TotalPrice';
import CreateBtn from '../components/CreateBtn';
import { Tabs, Tab } from '../components/Tabs';

import { LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME, parseToYearAndMonth, padLeft } from '../utility';

export const categories = {
  '1': {
    id: '1',
    name: '旅行',
    type: 'outcome',
    iconName: 'ios-plane',
  },
  '2': {
    id: '2',
    name: '工资',
    type: 'income',
    iconName: 'ios-cash-outline',
  },
};

export const items = [
  {
    id: '1',
    title: '去云南旅游',
    price: 200,
    date: '2020-12-26',
    cid: '1',
  },
  {
    id: '2',
    title: '捡到钱',
    price: 8000,
    date: '2021-01-26',
    cid: '2',
  },
  {
    id: '3',
    title: '去北京旅游',
    price: 2200,
    date: '2021-01-26',
    cid: '1',
  },
  {
    id: '4',
    title: '去梧村旅游',
    price: 1100,
    date: '2021-02-09',
    cid: '1',
  },
];

export const newItem = {
  id: '4',
  title: 'new title',
  price: 10,
  date: '2021-01-26',
  cid: '2',
};

const tabsText = [LIST_VIEW, CHART_VIEW];

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items,
      currentDate: parseToYearAndMonth('2021-01-26'),
      tabView: tabsText[0],
    };
  }

  changeView = index => {
    this.setState({ tabView: tabsText[index] });
  };
  changeDate = (year, month) => {
    this.setState({
      currentDate: { year, month },
    });
  };
  modifyItem = modifiedItem => {
    const modifiedItems = this.state.items.map(item => {
      if (item.id === modifiedItem.id)
        return { ...item, title: 'modified title' };
      return item;
    });
    this.setState({
      items: modifiedItems,
    });
  };
  createItem = () => {
    this.setState({
      items: [newItem, ...this.state.items],
    });
  };
  deleteItem = deletedItem => {
    const deletedItems = this.state.items.filter(item => item.id !== deletedItem.id);
    this.setState({
      items: deletedItems,
    });
  };

  render() {
    const { items, currentDate, tabView } = this.state;
    const itemsWithCategory = items.map(item => {
      item.category = categories[item.cid];
      return item;
    });
    const itemsFiltByDate = itemsWithCategory.filter(item =>
      item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`)
    );

    let totalIncome = 0, totalOutcome = 0;
    itemsFiltByDate.forEach(item => {
      if (item.category.type === TYPE_INCOME)
        totalIncome += item.price;
      if (item.category.type === TYPE_OUTCOME)
        totalOutcome += item.price;
    });

    return (
      // 空结点
      <React.Fragment>
        <header className="App-header">
          <div className="row">
            <div className="col-4">
              <MonthPicker
                year={currentDate.year}
                month={currentDate.month}
                onChange={this.changeDate}
              />
            </div>
            <div className="col-8">
              <TotalPrice
                income={totalIncome}
                outcome={totalOutcome}
              />
            </div>
          </div>
        </header>

        <div className="content-area py-3 px-3">
          <Tabs
            activeIndex={0}
            onTabChange={this.changeView}
          >
            <Tab>
              <Ionicon
                className="rounded-circle mr-2"
                fontSize="25px"
                color="#007bff"
                icon='ios-paper'
              />
              列表模式
            </Tab>
            <Tab>
              <Ionicon
                className="rounded-circle mr-2"
                fontSize="25px"
                color="#007bff"
                icon='ios-pie'
              />
              图表模式
            </Tab>
          </Tabs>
          <CreateBtn onCreateBtnClick={this.createItem} />
          {
            tabView === LIST_VIEW &&
            <PriceList
              items={itemsFiltByDate}
              onModifyItem={this.modifyItem}
              onDeleteItem={this.deleteItem}
            />
          }
          {
            tabView === CHART_VIEW &&
            <h1 className="chart-title">CHART_VIEW</h1>
          }
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
