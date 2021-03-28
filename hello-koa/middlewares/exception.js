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
		}
	}
};

module.exports = catchError;
