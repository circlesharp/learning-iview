const express = require('express');

const userRouter = require('./router/user_router');
const { error_handle_middleware, not_found_middleware, } = require('./middleware/error_middleware');

const app = express();

// express静态方法作为中间件
app.use(express.static('static', {
  extensions: ['html', 'htm'],
}));

// 路由作为中间件 可以配父级路由
app.use('/user', userRouter);

app.get('/error', () => {
  throw new Error('fuck!');
});

// 处理404 express 中，404 不是异常
app.use(not_found_middleware);

// 异常处理 作为兜底
app.use(error_handle_middleware);

app.listen(3000, () => {
  console.log('hello, express');
});
