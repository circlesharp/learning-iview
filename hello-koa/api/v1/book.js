const Router = require("koa-router");
const { HttpException } = require(`${process.cwd()}/core/http-exception`);
const router = new Router();

/**
 * ps 前端向后端的 4 种常见传参方式
 * 1. params (动态路由)
 * 2. query
 * 3. header
 * 4. body
 */

router.post('/v1/:id/book/latest', (ctx, next) => {
	const { params } = ctx;
	const { query, header, body } = ctx.request;

	if (Math.random() > 0.5) {
		throw new HttpException('book 随机报错', 10001, 400);
	} else {
		ctx.body = {
			key: 'book',
			all_params: { params, query, header, body }
		};
	}
});

module.exports = router;
