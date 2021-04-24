const Router = require("koa-router");
const { Auth } = require('../../../middlewares/auth');
const { Flow } = require('../../models/flow');
const { Art } = require('../../models/art');
const { PositiveIntegerValidator, ClassicValidator } = require("../../validators/validator");
const { Favor } = require("../../models/favor");

const router = new Router({
	prefix: '/v1/classic',
});

/**
 * 最新一期期刊
 */
router.get('/latest', async (ctx) => {
	const flow = await Flow.findOne({
		order: [['index', 'DESC']],
	});

	const art = await Art.getData(flow.artId, flow.type);

	art.setDataValue('index', flow.index);

	ctx.body = art;
});

/**
 * 查询下一期刊数据
 */
router.get('/:index/next', new Auth().m, async ctx => {
	const v = new PositiveIntegerValidator();
	await v.validate(ctx, { id: 'index' });

	const tmpIdx = await v.get('path.index');
	const flow = await Flow.findOne({ where: { index: tmpIdx + 1 } });

	if (!flow) {
		throw new global.$errs.NotFound();
	}

	const { artId, type, index } = flow;
	const art = await Art.getData(artId, type);
	const likeStatus = await Favor.userLikeIt(artId, type, ctx.auth.uid);

	art.setDataValue('index', index);
	art.setDataValue('likeStatus', likeStatus);

	ctx.body = art;
});

/**
 * 查询上一期刊数据
 */
router.get('/:index/previous', new Auth().m, async ctx => {
	const v = new PositiveIntegerValidator();
	await v.validate(ctx, { id: 'index' });

	const tmpIdx = await v.get('path.index');
	const flow = await Flow.findOne({ where: { index: tmpIdx - 1 } });

	if (!flow) {
		throw new global.$errs.NotFound();
	}

	const { artId, type, index } = flow;
	const art = await Art.getData(artId, type);
	const likeStatus = await Favor.userLikeIt(artId, type, ctx.auth.uid);

	art.setDataValue('index', index);
	art.setDataValue('likeStatus', likeStatus);

	ctx.body = art;
});

/**
 * 获取点赞信息
 */
router.get('/:type/:id/favor', new Auth().m, async ctx => {
	const v = new ClassicValidator();
	await v.validate(ctx);

	const id = +v.get('path.id');
	const type = +v.get('path.type');

	const art = await Art.getData(id, type);
	if (!art) {
		throw new global.$errs.NotFound();
	}
	const likeStatus = await Favor.userLikeIt(id, type, ctx.auth.uid);

	ctx.body = {
		favNums: art.favNums,
		likeStatus,
	};
});

module.exports = router;
