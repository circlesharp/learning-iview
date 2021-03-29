const Router = require("koa-router");
const { PositiveIntergerValidator } = require('../../validators/validator');

const router = new Router();

// 获取前端给传参的4中方式
const generateAllParams = ctx => {
	/**
		* ps 前端向后端的 4 种常见传参方式
		* 1. params (动态路由)
		* 2. query
		* 3. header
		* 4. body
	 */
	const { params } = ctx;
	const { query, header, body } = ctx.request;

	return { params, query, header, body };
};
const getAllParamsByValidator = v => {
	// const params = v.get('');
	const query = v.get('path');
	// const header = v.get('request.header');
	// const body = v.get('request.body');
	// return { query, header, body };
	return query;
};

router.post('/v1/:id/basic', (ctx, next) => {
	const v = new PositiveIntergerValidator();
	v.validate(ctx);
	v.get('path.id');

	if (Math.random() > 0.5) {
		throw new global.$errs.ParameterException('basic 随机报错', -1);
	} else {
		ctx.body = {
			key: 'basic',
			// all_params: generateAllParams(ctx), // 方法一
			all_params: getAllParamsByValidator(v), // 方法二
		};
	}
});

module.exports = router;
