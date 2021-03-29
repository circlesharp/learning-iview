const Router = require('koa-router');
const requireDirector = require('require-directory');

class InitManager {
	static initCore(app) {
		InitManager.app = app;

		// 自动引入 api 的 router
		InitManager.initLoadRouters();

		// 将自定义异常挂到 global
		InitManager.loadHttpException();

		// 将项目配置挂到 global
		InitManager.loadConfig();
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
	}

	static loadConfig(path = process.cwd()) {
		const configPath = `${path}/config/config.js`;
		const config = require(configPath);
		global.$config = config;
	}
}

module.exports = InitManager;
