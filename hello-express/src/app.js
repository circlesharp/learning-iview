const express = require('express');

const app = express();

// for parsing application/json
app.use(express.json());
// for parsing application/xwww-form-urlencoded
app.use(express.urlencoded());

/* 查询任务列表 */
app.get('/list/:status/:page', async (req, res, next) => {
  res.json({
    list: [],
  });
});

/* 新增一个任务 */
app.post('/create', async (req, res, next) => {
  const { name, deadline, content } = req.body;
  res.json({
    todo: {}, name, deadline, content,
  });
});

/* 编辑一个任务 */
app.post('/update', async (req, res, next) => {
  const { name, deadline, content, id } = req.body;
  res.json({
    todo: {}, name, deadline, content, id,
  });
});

/* 修改一个任务的状态 / 删除一个任务 */
app.post('/update_status', async (req, res, next) => {
  const { id, status } = req.body;
  res.json({
    todo: {}, id, status,
  });
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