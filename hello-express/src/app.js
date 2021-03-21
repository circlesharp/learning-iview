const express = require('express');
const models = require('../db/models'); // [ model[], sequelize, Sequelize ]

const app = express();

// for parsing application/json
app.use(express.json());
// for parsing application/xwww-form-urlencoded
app.use(express.urlencoded());

/* 查询任务列表 */
app.get('/list/:status/:page', async (req, res, next) => {
  // 1. 状态 -1 删除, 0 代办, 1 完成, 2 全部
  // 2. 分页的状态 limit page_size, offset page
  const { status, page } = req.params;
  const limit = 10;
  const offset = (page - 1) * limit;

  let where = {};
  if (+status !== 2)
    where.status = status;

  let list = await models.Todo.findAndCountAll({ where, limit, offset });
  res.json({ list });
});

/* 新增一个任务 */
app.post('/create', async (req, res, next) => {
  try {
    const { name, deadline, content } = req.body;
    let todo = await models.Todo.create({ name, deadline, content });
    res.json({ todo, name, deadline, content });
  } catch (err) {
    next(err);
  }
});

/* 编辑一个任务 */
app.post('/update', async (req, res, next) => {
  try {
    const { name, deadline, content, id } = req.body;
    let todo = await models.Todo.findOne({ where: { id } });
    if (todo) {
      todo = await todo.update({ name, deadline, content });
    }
    res.json({ todo, name, deadline, content, id });
  } catch (err) {
    next(err);
  }
});

/* 修改一个任务的状态 / 删除一个任务 */
app.post('/update_status', async (req, res, next) => {
  try {
    const { id, status } = req.body;
    let todo = await models.Todo.findOne({ where: { id } });
    if (todo && status !== todo.status) {
      todo = await todo.update({ status });
    }
    res.json({ todo, id, status });
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

app.listen(3000, () => {
  console.log('todo list 启动成功');
});