const axios = require('axios');
const util = require('util');
const { User } = require('../models/user');
const { generateToken } = require('../../core/util');

class WXManager {
	static async codeToToken(code) {
		const { loginUrl, appId, appSecret } = global.$config.wx;
		const url = util.format(loginUrl, appId, appSecret, code);

		const result = await axios.get(url);
		if (result.status !== 200) {
			throw new global.$errs.AuthFailed('openid 获取失败');
		}

		const { errcode, errmsg, openid } = result.data;
		if (errcode) {
			throw new global.$errs.AuthFailed(`openid 获取失败: ${errcode}, ${errmsg}`);
		}

		let user = await User.getUserByOpenid(openid);
		if (!user) {
			user = await User.registerByOpenid(openid);
		}

		return generateToken(user.isSoftDeleted, global.$scope.USER);
	}
}

module.exports = {
	WXManager,
};
