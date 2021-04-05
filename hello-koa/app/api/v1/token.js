const Router = require('koa-router');
const { TokenValidator } = require('../../validators/validator');
const { LoginType } = require('../../lib/enum');
const { User } = require('../../models/user');

const router = new Router({
	prefix: '/v1/token',
});

router.post('/', async ctx => {
	const v = new TokenValidator();
	await v.validate(ctx);

	switch (v.get('body.type')) {
		case LoginType.USER_EMAIL:
			await emailLoging(v.get('body.account'), v.get('body.secret'));
			break;
		case LoginType.USER_MINI_PROGRAM:
			break;
		default:
			throw new global.$errs.ParameterException('没有相应的登录方式');
	}
});

async function emailLoging(account, secret) {
	const user = await User.verifyEmailPassword(account, secret);
}

module.exports = router;
