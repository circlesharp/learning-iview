/* state */

import React from 'react';

class LikesButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 0,
    };

    // 绑定this 方法1 bind绑定
    // this.increaseLikes = this.increaseLikes.bind(this);
  }

  increaseLikes() {
    this.setState({ likes: this.state.likes + 1 });
  }

  render() {
    return (
      <div className="likes-button-component">
        <button
          type="button"
          className="btn btn-outline-primary btn-lg"
          onClick={ () => { this.increaseLikes() } } // 绑定this 方法2 箭头函数
        >
          👍 { this.state.likes }
        </button>
      </div>
    );
  }
}

export default LikesButton;
