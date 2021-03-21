// 中间件
// 1. 是一个函数
// 2. 入参 err, req, res, next
const name_middle_ware = (req, res, next) => {
  const { name } = req.query;
  if (!name) {
    res.json({ message: 'missing name' });
  } else {
    req.name = name;
    // 控制权转交下一步
    next();
  }
};

module.exports = name_middle_ware;
