const { HttpException } = require(`${process.cwd()}/core/http-exception`);

const catchError = async (ctx, next) => {
	try {
		await next();
	} catch (error) {
		if (error instanceof HttpException) {
			// 已知错误
			ctx.status = error.code;
			ctx.body = {
				msg: error.msg,
				error_code: error.errorCode,
				request: `${ctx.method} ${ctx.path}`
			};
		} else {
			// 未知异常

			if (global.$config.environment === 'dev') {
				// 开发环境 直接报错
				throw error;
			}

			// 生产环境 告诉客户端
			ctx.status = 500;
			ctx.body = {
				msg: 'we made a mistake (；′⌒`)',
				error_code: 999,
				request: `${ctx.method} ${ctx.path}`,
			};
		}
	}
};

module.exports = catchError;
