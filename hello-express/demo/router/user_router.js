const express = require('express');

const name_middle_ware = require('../middleware/user_middleware');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({});
});

// 中间件可以写在中括号中 路由内部使用
router.get('/name', [name_middle_ware], (req, res) => {
  res.json({ from: 'user' });
});

// 路由发生的错误可以转交控制权，如果错误却转交，会给404意外捕获
router.get('/error/:error_code', (req, res, next) => {
  try {
    const { error_code } = req.params;
    if (error_code === '200') {
      res.json({ error_code, message: 'no error' });
    } else {
      throw new Error(`error in /user, code is ${error_code}`);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
