const Router = require('koa-router');
const requireDirector = require('require-directory');
const { AuthScope } = require('../app/lib/enum');

class InitManager {
	static initCore(app) {
		InitManager.app = app;

		// 将项目配置挂到 global
		InitManager.loadConfig();

		// 将自定义异常挂到 global
		InitManager.loadHttpException();

		// 将权限配置挂到 global
		InitManager.loadAuthScope();

		// 自动引入 api 的 router
		InitManager.initLoadRouters();
	}

	static initLoadRouters() {
		requireDirector(
			module,
			`${process.cwd()}/app/api`,
			{
				visit: function whenLoadModule(obj) {
					if (obj instanceof Router) {
						InitManager.app.use(obj.routes());
					}
				},
			},
		);
	}

	static loadHttpException() {
		global.$errs = require(`${process.cwd()}/core/http-exception`);
		global.$success = (msg, errorCode) => {
			throw new global.$errs.Success(msg, errorCode);
		};
	}

	static loadConfig(path = process.cwd()) {
		const configPath = `${path}/config/config.js`;
		const config = require(configPath);
		global.$config = config;
	}

	static loadAuthScope() {
		global.$scope = AuthScope;
	}
}

module.exports = InitManager;
