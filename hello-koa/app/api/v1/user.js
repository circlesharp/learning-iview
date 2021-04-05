const Router = require('koa-router');
const { RegisterValidator } = require('../../validators/validator');
const { User } = require('../../models/user');

const router = new Router({
	prefix: '/v1/user',
});

router.post('/register', async (ctx) => {
	const v = new RegisterValidator();
	await v.validate(ctx);

	const user = {
		email: v.get('body.email'),
		password: v.get('body.password1'),
		nickname: v.get('body.nickname'),
	};

	User.create(user);
});

module.exports = router;
