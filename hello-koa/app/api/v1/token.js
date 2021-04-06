const Router = require('koa-router');
const { TokenValidator } = require('../../validators/validator');
const { LoginType } = require('../../lib/enum');
const { User } = require('../../models/user');
const { generateToken } = require('../../../core/util');
const { Auth } = require('../../../middlewares/auth');
const { WXManager } = require('../../services/wx');

const router = new Router({
	prefix: '/v1/token',
});

router.post('/', async ctx => {
	const v = new TokenValidator();
	await v.validate(ctx);
	let token;

	switch (+v.get('body.type')) {
		case LoginType.USER_EMAIL:
			token = await emailLoging(v.get('body.account'), v.get('body.secret'));
			break;
		case LoginType.USER_MINI_PROGRAM:
			token = await WXManager.codeToToken(v.get('body.account'));
			break;
		default:
			throw new global.$errs.ParameterException('没有相应的登录方式');
	}

	ctx.body = { token };
});

async function emailLoging(account, secret) {
	const user = await User.verifyEmailPassword(account, secret);
	const token = generateToken(user.id, Auth.USER);

	return token;
}

module.exports = router;
