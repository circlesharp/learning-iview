import React from 'react';
import { withRouter } from 'react-router-dom';
import Ionicon from 'react-ionicons';

import withContext from '../WithContext';
import PriceList from '../components/PriceList';
import MonthPicker from '../components/MonthPicker';
import TotalPrice from '../components/TotalPrice';
import CreateBtn from '../components/CreateBtn';
import Loader from '../components/Loader';
import PieChart from '../components/PieChart';
import { Tabs, Tab } from '../components/Tabs';

import { LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME, generateChartDataByCategory } from '../utility';

export const newItem = {
  id: '4',
  title: 'new title',
  price: 10,
  date: '2021-01-26',
  cid: '2',
};

const tabsText = [LIST_VIEW, CHART_VIEW];

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabView: tabsText[0],
    };
  }

  componentDidMount() {
    this.props.actions.getInitialData();
  }

  changeView = index => {
    this.setState({ tabView: tabsText[index] });
  };
  changeDate = (year, month) => {
    this.props.actions.selectNewMonth(year, month);
  };
  modifyItem = item => {
    this.props.history.push(`/edit/${item.id}`);
  };
  createItem = () => {
    this.props.history.push('/create');
  };
  deleteItem = item => {
    this.props.actions.deleteItem(item);
  };

  render() {
    const { items, categories, currentDate, isLoading } = this.props.data;
    const { tabView } = this.state;
    const itemsWithCategory = Object.keys(items).map(id => {
      items[id].category = categories[items[id].cid];
      return items[id];
    });

    const chartOutcomeDateByCategory = generateChartDataByCategory(itemsWithCategory, TYPE_OUTCOME);
    const chartIncomeDateByCategory = generateChartDataByCategory(itemsWithCategory, TYPE_INCOME);

    let totalIncome = 0, totalOutcome = 0;
    itemsWithCategory.forEach(item => {
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
          {
            isLoading && <Loader />
          }

          {!isLoading &&
            <React.Fragment>
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
                  items={itemsWithCategory}
                  onModifyItem={this.modifyItem}
                  onDeleteItem={this.deleteItem}
                />
              }
              {
                tabView === CHART_VIEW &&
                <React.Fragment>
                  <PieChart title="本月支出" categoryData={chartOutcomeDateByCategory} />
                  <PieChart title="本月收入" categoryData={chartIncomeDateByCategory} />
                </React.Fragment>
              }
            </React.Fragment>
          }
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withContext(Home));
