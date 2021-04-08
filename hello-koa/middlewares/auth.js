const basicAuth = require('basic-auth');
const jwt = require('jsonwebtoken');

class Auth {
	constructor(level) {
		// 从配置文件中读出权限并设置
		const AuthScope = global.$scope;
		for (const scope in AuthScope) {
			Auth[scope] = AuthScope[scope];
		}

		// 设置当前接口的权限 level
		this.level = level || Auth.VISITOR;
	}

	get m() {
		return async (ctx, next) => {
			// postman 给 token 加密
			// basic-token 从 node 的 request 对象中把 token 解密
			const userToken = basicAuth(ctx.req);
			const { secretKey } = global.$config.security;
			let errMsg = 'token 不合法';
			let decode; // jwt 在验证 token 后的信息

			if (!userToken || !userToken.name) {
				throw new global.$errs.Forbbiden(errMsg);
			}

			try {
				decode = jwt.verify(userToken.name, secretKey);
			} catch (err) {
				// token过期 or token不合法
				if (err.name === 'TokenExpiredError') {
					errMsg = 'token 已过期';
				}
				throw new global.$errs.Forbbiden(errMsg);
			}

			const { uid, scope } = decode;
			ctx.auth = { uid, scope };

			if (scope < this.level) {
				errMsg = '权限不足';
				throw new global.$errs.Forbbiden(errMsg);
			}

			await next();
		};
	}

	static verifyToken(token) {
		try {
			const { secretKey } = global.$config.security;
			jwt.verify(token, secretKey);
			return true;
		} catch (err) {
			return false;
		}
	}
}

module.exports = {
	Auth
};
