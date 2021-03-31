"use strict";

var _mobx = require("mobx");

var todoStore = (0, _mobx.observable)({
  /* 一些观察的状态 */
  todos: [],

  /* 推导值 */
  get completedCount() {
    return this.todos.filter(todo => todo.completed).length;
  }

});
/* 观察状态改变的函数 */

(0, _mobx.autorun)(function () {
  console.log("Completed %d of %d items", todoStore.completedCount, todoStore.todos.length);
}); // -> 同步打印 'Completed 0 of 0 items'

/* ..以及一些改变状态的动作 */

todoStore.todos[0] = {
  title: "Take a walk",
  completed: false
}; // -> 同步打印 'Completed 0 of 1 items'

todoStore.todos[0].completed = true; // -> 同步打印 'Completed 1 of 1 items'