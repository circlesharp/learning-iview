import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './containers/Home';
import Create from './containers/Create';
import { flattern, createId, parseToYearAndMonth } from './utility';
import { testItems, testCategories } from './testData';

export const AppContext = React.createContext();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: flattern(testItems),
      categories: flattern(testCategories),
    };
    this.actions = {
      deleteItem: item => {
        delete this.state.items[item.id];
        this.setState({
          items: this.state.items,
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
