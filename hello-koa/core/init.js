const Router = require('koa-router');
const requireDirector = require('require-directory');

class InitManager {
	static initCore(app) {
		InitManager.app = app;

		// 自动引入 api 的 router
		InitManager.initLoadRouters();
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
}

module.exports = InitManager;
