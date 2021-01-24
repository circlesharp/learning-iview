import React from 'react';

class Welcome extends React.Component {
  render() {
    const isLogin = false;

    /* jsx 就是 React.createElememt 的语法糖 */
    /* 该方法返回的是一个对象（ReactElement 对象） */
    /* 该对象最值交给 ReactDOM.render 挂载 */
    const test = <div>test jsx</div>;
    console.log(test);

    return (
      <div>
        <h1>Hello React</h1>
        { isLogin ? <p>已经登陆</p> : <p>请登陆</p> }
      </div>
    );
  }
}

export default Welcome;
