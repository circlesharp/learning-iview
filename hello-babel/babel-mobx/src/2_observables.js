import {observable, autorun} from 'mobx';

const todoState = observable({
  a: {b: {c: {d: {e: 5}}}}
})

autorun(() => {
  console.log(todoState.a.b.c.d.e);
})

todoState.a.b.c.d.e = 6;
