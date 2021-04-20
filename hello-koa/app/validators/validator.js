const { LinValidator, Rule } = require(`../../core/lin-validator`);
const { User } = require('../models/user');
const { LoginType } = require('../lib/enum');

// 校验 正整数
class PositiveIntergerValidator extends LinValidator {
	constructor() {
		super();
		this.id = [
			// 'isInt' 字符串就是 validator.js 中的函数名
			new Rule('isInt', '需要是正整数', { min: 1 })
		];
	}
}

class LikeValidator extends PositiveIntergerValidator {
	constructor() {
		super();
		this.validateType = checkType;
	}
}

class RegisterValidator extends LinValidator {
	// 校验类型1 属性校验
	constructor() {
		super();
		this.email = [
			// 'isInt' 字符串就是 validator.js 中的函数名
			new Rule('isEmail', '不符合 Email 规范', { min: 1 })
		];
		this.password1 = [
			new Rule('isLength', '密码 6 ~ 18 位', { min: 6, max: 18 }),
			new Rule('matches', '密码不符合规范', '^[0-9a-zA-Z]'),
		];
		// this.password2 = this.password1;
		this.nickname = [
			new Rule('isLength', '昵称 3 ~ 18 位', { min: 3, max: 18 }),
		];
	}

	// 校验类型2 自定义检验 规则函数以 validate 开头
	validatePassword(vals) {
		const pwd1 = vals.body.password1;
		const pwd2 = vals.body.password2;
		if (pwd1 !== pwd2) {
			throw new Error('两个密码必须相同');
		}
	}

	async validateEmail(vals) {
		// 严重邮箱是否有重复
		const email = vals.body.email;
		const user = await User.findOne({
			where: { email },
		});
		if (user) {
			throw new Error('email 已存在');
		}
	}
}

class TokenValidator extends LinValidator {
	constructor() {
		super();
		this.account = [
			new Rule('isLength', '不符合账号规则', { min: 3, max: 108 }),
		];
		this.secret = [
			// 可以为空，因为登录多元化
			new Rule('isOptional'),
			new Rule('isLength', '6 ~ 18 个字符', { min: 6, max: 18 }),
		];

		this.validateLoginType = checkType;
	}
}

class NotEmptyValidator extends LinValidator {
	constructor() {
		super();
		this.token = [
			new Rule('isLength', '不允许为空', { min: 1 })
		];
	}
}

function checkType(vals) {
	const { type } = vals.body;
	if (!type) {
		throw new Error('type 是必须参数');
	}

	if (!LoginType.isThisType(type)) {
		throw new Error('type 参数不合法');
	}
}

module.exports = {
	PositiveIntergerValidator,
	LikeValidator,
	RegisterValidator,
	TokenValidator,
	NotEmptyValidator,
};
