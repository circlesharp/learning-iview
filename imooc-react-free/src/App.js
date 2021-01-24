import logo from './logo.svg';
import './App.css';
import NameCard from './components/NameCard';
import LikesButton from './components/LikesButton';
import DigitalClock from './components/DigitalClock';
import CommentBox from './components/CommentBox';
import Comment from './components/Comment';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
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
      <Comment />
    </div>
  );
}

export default App;
