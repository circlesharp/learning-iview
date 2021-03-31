"use strict";

var _mobx = require("mobx");

const todoState = (0, _mobx.observable)({
  a: {
    b: {
      c: {
        d: {
          e: 5
        }
      }
    }
  }
});
(0, _mobx.autorun)(() => {
  console.log(todoState.a.b.c.d.e);
});
todoState.a.b.c.d.e = 6;