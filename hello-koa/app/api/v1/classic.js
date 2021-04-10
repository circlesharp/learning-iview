const Router = require("koa-router");
const { Auth } = require('../../../middlewares/auth');
const { Flow } = require('../../models/flow');

const router = new Router({
	prefix: '/v1/classic',
});

router.get('/latest', async (ctx, next) => {
	const flow = await Flow.findOne({
		order: [
			['index', 'DESC']
		]
	});

	ctx.body = {
		key: 'classic',
		flow
	};
});

module.exports = router;
