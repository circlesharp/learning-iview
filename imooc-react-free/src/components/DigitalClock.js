/* 声明周期 */
import React from 'react';

class DigitalClock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
    };
  }

  /* 声明周期 初始化 */
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ date: new Date() });
    }, 3000);
  }

  /* 声明周期 更新 */
  componentDidUpdate(currentProps, currentState) {
    console.log(currentProps, currentState);
  }

  /* 声明周期 卸载 */
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div className="digital-clock-component jumbotron">
        <h1>{ this.state.date.toLocaleTimeString() }</h1>
      </div>
    );
  }
}

export default DigitalClock;
