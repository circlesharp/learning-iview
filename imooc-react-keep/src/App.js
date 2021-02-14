import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './containers/Home';
import Create from './containers/Create';
import { flattern, createId, parseToYearAndMonth } from './utility';

export const AppContext = React.createContext();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      items: {},
      categories: {},
      currentDate: parseToYearAndMonth('2018-11-11'),
    };

    /* 天才 这是我的改造 */
    const withLoading = cb =>
      async (...args) => {
        this.setState({ isLoading: true });
        const rst = await cb(...args);
        this.setState({ isLoading: false });

        return rst;
      };

    this.actions = {
      getInitialData: withLoading(async () => {
        const { currentDate } = this.state;
        const getURLWithDate = `/items?monthCategory=${currentDate.year}-${currentDate.month}&_sort=timestamp&_order=desc`;
        const promiseArr = [axios.get('/categories'), axios.get(getURLWithDate)];
        const [categories, items] = await Promise.all(promiseArr);

        this.setState({
          items: flattern(items.data),
          categories: flattern(categories.data),
        });
      }),
      selectNewMonth: withLoading(async (year, month) => {
        const getURLWithDate = `/items?monthCategory=${year}-${month}&_sort=timestamp&_order=desc`;
        const items = await axios.get(getURLWithDate);
        this.setState({
          items: flattern(items.data),
          currentDate: { year, month },
        });

        return items;
      }),
      deleteItem: withLoading(async item => {
        const deletedItem = await axios.delete(`/items/${item.id}`);
        delete this.state.items[item.id];
        this.setState({
          items: this.state.items,
        });

        return deletedItem;
      }),
      createItem: (data, categoryId) => {
        const newId = createId();
        const parseDate = parseToYearAndMonth(data.date);
        data.monthCategory = `${parseDate.year}-${parseDate.month}`;
        data.timestamp = new Date(data.date).getTime();
        const newItem = { ...data, id: newId, cid: categoryId };

        this.setState({
          items: { ...this.state.items, [newId]: newItem },
        });
      },
      updateItem: (item, updateCategoryId) => {
        const modifiedItem = {
          ...item,
          cid: updateCategoryId,
          timestamp: new Date(item.date).getTime(),
        };
        this.setState({
          items: { ...this.state.items, [modifiedItem.id]: modifiedItem },
        });
      },
    };
  }

  render() {
    return (
      <div className="App">
        <AppContext.Provider value={{
          state: this.state,
          actions: this.actions,
        }}>
          <Router>
            <ul>
              {/* 不能用 a 标签，因为 a 标签不是会跳转，不符合 SPA 概念 */}
              <Link to="/">Home</Link>
              <Link to="/create">Create</Link>
              <Link to="/edit/10">Edit</Link>
            </ul>
            <div className="container pb-5">
              <Route path="/" exact component={Home}></Route>
              <Route path="/create" component={Create}></Route>
              <Route path="/edit/:id" component={Create}></Route>
            </div>
          </Router>
        </AppContext.Provider>
      </div>
    );
  }
}

export default App;
