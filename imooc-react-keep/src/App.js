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
      items: {},
      categories: {},
      currentDate: parseToYearAndMonth('2018-11-11'),
    };
    this.actions = {
      getInitialData: () => {
        const { currentDate } = this.state;
        const getURLWithDate = `/items?monthCategory=${currentDate.year}-${currentDate.month}&_sort=timestamp&_order=desc`;
        const promiseArr = [axios.get('/categories'), axios.get(getURLWithDate)];
        Promise.all(promiseArr).then(([categories, items]) => {
          this.setState({
            items: flattern(items.data),
            categories: flattern(categories.data),
          });
        });
      },
      selectNewMonth: (year, month) => {
        const getURLWithDate = `/items?monthCategory=${year}-${month}&_sort=timestamp&_order=desc`;
        axios.get(getURLWithDate).then(items => {
          this.setState({
            items: flattern(items.data),
            currentDate: { year, month },
          });
        });
      },
      deleteItem: item => {
        axios.delete(`/items/${item.id}`).then(() => {
          delete this.state.items[item.id];
          this.setState({
            items: this.state.items,
          });
        });
      },
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
      }
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
