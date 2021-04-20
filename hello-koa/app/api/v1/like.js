const Router = require("koa-router");
const { Auth } = require('../../../middlewares/auth');
const { Favor } = require("../../models/favor");
const { LikeValidator } = require("../../validators/validator");

const router = new Router({ prefix: '/v1/like' });

router.post('/', new Auth(global.$scope.USER).m, async ctx => {
	const v = new LikeValidator();
	await v.validate(ctx);

	const artId = v.get('body.artId');
	const type = v.get('body.type');
	const uid = ctx.auth.uid;

	await Favor.like(artId, type, uid);

	global.$success();
});

module.exports = router;
