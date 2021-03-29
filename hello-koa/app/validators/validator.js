const { LinValidator, Rule } = require(`../../core/lin-validator`);

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

class RegisterValidator extends LinValidator {
	constructor() {
		super();
		this.email = [
			// 'isInt' 字符串就是 validator.js 中的函数名
			new Rule('isEmail', '不符合 Email 规范', { min: 1 })
		];
		this.password1 = [
			new Rule('isLength', '密码 6 ~ 18 位', { min: 6, max: 18 }),
			new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z+$])[0-9a-zA-Z]'),
		];
		// this.password2 = this.password1;
		this.nickname = [
			new Rule('isLength', '密码 3 ~ 18 位', { min: 3, max: 18 }),
		];
	}

	// 自定义的检验规则函数，以 validate 开头
	validatePassword(vals) {
		const pwd1 = vals.body.password1;
		const pwd2 = vals.body.password2;
		if (pwd1 !== pwd2) {
			throw new Error('两个密码必须相同');
		}
	}
}

module.exports = {
	PositiveIntergerValidator,
	RegisterValidator,
};
