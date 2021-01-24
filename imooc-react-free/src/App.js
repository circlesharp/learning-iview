import React from 'react';
import logo from './logo.svg';
import './App.css';

// import NameCard from './components/NameCard';
// import LikesButton from './components/LikesButton';
// import DigitalClock from './components/DigitalClock';
// import CommentBox from './components/CommentBox';
// import Comment from './components/Comment';

import ThemeContext from './theme-context';
import ThemeBar from './components/ThemeBar';

const themes = {
  light: {
    className: 'btn btn-primary',
    bgColor: '#eee',
    color: '#000',
  },
  dark: {
    className: 'btn btn-light',
    bgColor: '#222',
    color: '#fff',
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: 'light',
    };

    this.changeTheme = this.changeTheme.bind(this);
  }

  changeTheme(event) {
    this.setState({
      theme: event,
    });
  }

  render() {
    return (
      <ThemeContext.Provider value={ themes[this.state.theme] }>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <a
              href="#theme-switcher"
              className="btn btn-light"
              onClick={ () => { this.changeTheme('light'); } }
            >
              浅色主题
            </a>
            <a
              href="#theme-switcher"
              className="btn btn-secondary"
              onClick={ () => { this.changeTheme('dark'); } }
            >
              深色主题
            </a>
          </header>
  
          {/* props: NameCard */}
          {/* <NameCard
            name="viking"
            number={ 17665234116 }
            isHuman={ true }
            tags={ ['handsome', 'good heart'] }
          /> */}
  
          {/* state: LikesButton */}
          {/* <LikesButton /> */}
  
          {/* lifecycle: DigitalClock */}
          {/* <DigitalClock /> */}
  
          {/* form: CommentBox */}
          {/* <CommentBox /> */}
  
          {/* example: 状态提升 && 单向数据流（top-down data flow） */}
          {/* <Comment /> */}
  
          <ThemeBar />
        </div>
      </ThemeContext.Provider>
    );
  }
}

export default App;
