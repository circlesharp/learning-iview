/* form */
import React from 'react';

/* controlled components 受控组件 */
class CommentBoxControled extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    })
  }

  handleSubmit(event) {
    this.props.onAddComment(this.state.value); // 回调函数（父组件传入的）
    event.preventDefault(); // 禁止默认行为
  }

  render() {
    return (
      <form
        className="p-5"
        onSubmit={ this.handleSubmit }
      >
        <div className="form-group">
          <label>留言内容</label>
          <input
            type="text"
            className="form-control"
            placeholder="please input content"
            value={ this.state.value }
            onChange={ this.handleChange }
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
        >
          留言
        </button>

        <p>已有{ this.props.commentsLength }条评论</p>
      </form>
    );
  }
}

/* 不受控组件 */
class CommentBoxNotControled extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert(this.textInput.value);
    event.preventDefault(); // 禁止默认行为
  }

  render() {
    return (
      <form
        className="p-5"
        onSubmit={ this.handleSubmit }
      >
        <div className="form-group">
          <label>留言内容</label>
          <input
            type="text"
            className="form-control"
            placeholder="please input content"
            ref={ ref => { this.textInput = ref } } // 非受控组件
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
        >
          留言
        </button>
      </form>
    );
  }
}

export default CommentBoxControled;
// export default CommentBoxNotControled;
