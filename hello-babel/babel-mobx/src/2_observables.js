import {observable, autorun, computed, when, reaction, action, configure, runInAction, flow} from 'mobx';

// ====================== helpers ======================
function fetchProjectsSomehow(arr = ['A', 'B', 'c']) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(arr);
    }, 1000);
  })
}

// observable 包装 对象实例
(function() {
  const todoState = observable({
    a: {b: {c: {d: {e: 5}}}}
  })
  
  autorun(() => {
    console.log(todoState.a.b.c.d.e);
  })
  
  todoState.a.b.c.d.e = 6;
});

// @observable 包装类的属性
(function() {
  class TaskStore {
    @observable.shallow
    tasks = [1];

    @observable
    id = 0;
  }

  const taskStore = new TaskStore();
  autorun(() => {
    console.log(taskStore.tasks, taskStore.id)
  })

  taskStore.id = 2
  taskStore.tasks.push({a: 1})
  taskStore.tasks[1].a = 3 // 由于 @observable.shallow 不能监测
});

// @computed 包装类的 getter
(function() {
  class OrderLine {
    @observable price = 0;
    @observable amount = 1;

    constructor(price) {
      this.discountRate = 0.1;
      this.price = price;
    }

    @computed get total() {
      return this.price * this.amount
    }

    @computed get discount() {
      return this.total * this.discountRate;
    }
  }

  const orderLine = new OrderLine(10);

  autorun(() => {
    console.log(orderLine.total, orderLine.discount);
  })

  orderLine.price = 8;
});

// when 只会执行一次
(function() {
  class MyAge {
    @observable age = 14;

    constructor() {
      when(
        () => this.age >= 18,
        this.celebrate,
      )
    }

    // 建议改名为 dispose，因为只能执行一次
    celebrate = () => {
      console.log(`yeah! I am ${this.age}! I will miss my Adult Ceremony.`);
    }
  }

  const myAge = new MyAge();

  myAge.age += 3;
  myAge.age += 3;
  myAge.age += 3;
});

// when 的第二种用法，因为函数可以调用多次，所以不违背 when 只执行一次的规则
(function() {
  class EmailChecker {
    @observable hasNewEmail = false;

    goCheck = async () => {
      await when(() => this.hasNewEmail);
      console.log('Boss, here is new Email');
    }
  }

  const emailChecker = new EmailChecker();

  emailChecker.hasNewEmail = true;
  emailChecker.goCheck();
  emailChecker.goCheck();
});

// reaction(数据函数, 效果/副作用函数) => 清理函数
// reaction(() => data, (data, reaction) => { sideEffect }, options?)
(function() {
  // reaction 是 autorun 的变种，不同的是
  //  1. 创建时 效果函数不会直接运行
  //  2. 在执行 效果 函数时访问的任何 observable 都不会被追踪
  // reaction 是 语法糖
  //  1. computed(expression).observe(action(sideEffect))
  //  2. autorun(() => {action(sideEffect)(expression)})
  const todos = observable([
    { title: 'Make coffee', done: false, },
    { title: 'Find biscuit', done: false, },
  ]);

  // reaction 错误用法
  const reaction1 = reaction(
    () => todos.length,
    length => {
      console.log(`reaction 1: ${todos.map(todo => todo.title).join(', ')}`);
    }
  )

  // reaction 正确用法
  const reaction2 = reaction(
    () => todos.map(todo => todo.title),
    titles => {
      console.log(`reaction 2: ${titles.join(', ')}`);
    }
  )

  const reaction3 = reaction(
    () => todos.map(todo => todo.done).filter(todo => todo).length,
    dones => {
      console.log(todos.filter(todo => todo.done).map(todo => todo.title).join(', '));
    }
  )

  // (1, 1, 1)
  todos.push({ title: 'Explain reactions', done: true });

  // (1, 1, 0)
  todos.push({ title: 'Touch fish', done: false });

  // (0, 1, 0)
  todos[0].title = 'Make tea';

  // (0, 0, 1)
  todos[1].done = true;
});

// action 1
// 动作 action 用来修改状态的东西
(function() {
  class Ticker {
    @observable tick = 0;

    // action.bound 绑定了 this, 不能用 箭头函数
    @action.bound
    increment() {
      this.tick++
    }
  }

  const ticker = new Ticker();
  autorun(() => {
    console.log(ticker.tick);
  })
  setInterval(() => {
    ticker.increment();
  }, 1000);
});

// action 2 异步编写 action
// 包装 action 的回调函数
(function() {
  // 开启强制动作
  configure({ enforceActions: 'always' });

  class Store {
    @observable projects = [];
    @observable state = 'pending';

    @action
    fetchProjects(arr) {
      this.state = 'pending';
      fetchProjectsSomehow(arr).then(this.fetchSuccess)
    }

    @action.bound
    fetchSuccess(projects) {
      this.projects = projects.map(project => project.toUpperCase())
      this.state = 'done'
    }
  }

  const store = new Store();

  reaction(
    () => store.projects,
    () => console.log(store.projects),
  )

  store.fetchProjects();
  store.fetchProjects(['a', 'b', 'd']);
});

// action 3 异步编写 action
// runInAction
//  1. 不用为整个回调创建一个 action
//  2. 不用到处写 action
(function() {
  configure({ enforceActions: 'always' });

  class Store {
    @observable projects = [];
    @observable state = 'pending';

    @action
    fetchProjects(arr) {
      this.state = 'pending';
      fetchProjectsSomehow(arr).then(projects => {
        runInAction(() => {
          this.projects = projects.map(project => project.toUpperCase())
          this.state = 'done'
        })
      })
    }
  }

  const store = new Store();

  reaction(
    () => store.projects,
    () => console.log(store.projects),
  )

  store.fetchProjects();
  store.fetchProjects(['a', 'b', 'd']);
});

// action 4 异步编写 action
// async / await
// 每个 await 之后, 状态修改代码应该被包装成动作
(function() {
  configure({ enforceActions: 'always' });

  class Store {
    @observable projects = [];
    @observable state = 'pending';

    @action
    async fetchProjects(arr) {
      this.state = 'pending';
      try {
        const projects = await fetchProjectsSomehow(arr);
        runInAction(() => {
          this.projects = projects.map(project => project.toUpperCase());
          this.state = 'done';
        });
      } catch (error) {
        runInAction(() => {
          this.projects = [];
          this.state = 'error';
        });
      }
    }
  }

  const store = new Store();

  reaction(
    () => store.projects,
    () => console.log(store.projects),
  )

  store.fetchProjects();
  store.fetchProjects(['a', 'b', 'd']);
});

// action 5 异步编写 action
// flow 自动包装异步代码
(function() {
  // An arrow function expression is a compact alternative to a traditional function expression, but is limited and can't be used in all situations.
  // Differences & Limitations:

  // Does not have its own bindings to this or super, and should not be used as methods.
  // Does not have arguments, or new.target keywords.
  // Not suitable for call, apply and bind methods, which generally rely on establishing a scope.
  // Can not be used as constructors.
  // Can not use yield, within its body.
  configure({ enforceActions: 'always' });

  class Store {
    @observable projects = [];
    @observable state = 'pending';

    // 不需要手动 @action (除非想要绑定 this)
    @action.bound
    fetchProjects = flow(function * (arr) {
      this.state = 'pending';
      try {
        const projects = yield fetchProjectsSomehow(arr);
        this.projects = projects.map(project => project.toUpperCase());
        this.state = 'done';
      } catch (error) {
        this.projects = [];
        this.state = 'error';
      }
    })
  }

  const store = new Store();
  const fetchProjects = store.fetchProjects;

  reaction(
    () => store.projects,
    () => console.log(store.projects),
  )

  fetchProjects();
  fetchProjects(['a', 'b', 'd']);
})();
