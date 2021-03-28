const Koa = require('koa');
const parser = require('koa-bodyparser');
const catchError = require('./middlewares/exception');
const InitManager = require('./core/init');

const app = new Koa();

// 全局的错误处理
app.use(catchError);

app.use(parser());

InitManager.initCore(app);

app.listen(3002);
