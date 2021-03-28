const Router = require('koa-router');
const requireDirector = require('require-directory');

class InitManager {
	static initCore(app) {
		InitManager.app = app;

		// 自动引入 api 的 router
		InitManager.initLoadRouters();

		// 将自定义异常挂到 global
		InitManager.loadHttpException();
	}

	static initLoadRouters() {
		requireDirector(
			module,
			`${process.cwd()}/api`,
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
}

module.exports = InitManager;
