const Router = require("koa-router");
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

router.post('/v1/:id/basic', (ctx, next) => {
	if (Math.random() > 0.5) {
		throw new global.$errs.ParameterException('book 随机报错', -1);
	} else {
		ctx.body = {
			key: 'basic',
			all_params: generateAllParams(ctx),
		};
	}
});

module.exports = router;
