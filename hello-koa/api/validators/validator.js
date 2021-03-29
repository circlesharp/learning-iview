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

module.exports = {
	PositiveIntergerValidator
};
