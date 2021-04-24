class HttpException extends Error {
	constructor(msg = '服务器异常', errorCode = 10001, code = 400) {
		super();
		this.errorCode = errorCode; // error code
		this.code = code; // status code
		this.msg = msg; // error msg
	}
}

class ParameterException extends HttpException {
	constructor(msg = '参数错误', errorCode) {
		super(msg, errorCode, 400);
	}
}

class NotFound extends HttpException {
	constructor(msg = '资源未找到', errorCode) {
		super(msg, errorCode, 404);
	}
}

class AuthFailed extends HttpException {
	constructor(msg = '授权失败', errorCode = 10004) {
		super(msg, errorCode, 401);
	}
}

class Forbidden extends HttpException {
	constructor(msg = '禁止访问', errorCode = 10006) {
		super(msg, errorCode, 403);
	}
}

class Success extends HttpException {
	constructor(msg = 'ok', errorCode = 0) {
		// 200 查询成功  201 操作成功
		super(msg, errorCode, 201);
	}
}

class LikeError extends HttpException {
	constructor(msg = '您已点赞', errorCode = 60001) {
		super(msg, errorCode, 400);
	}
}

class DislikeError extends HttpException {
	constructor(msg = '您已取消点赞', errorCode = 60002) {
		super(msg, errorCode, 400);
	}
}

module.exports = {
	HttpException,
	ParameterException,
	NotFound,
	AuthFailed,
	Forbidden,
	Success,
	LikeError,
	DislikeError,
};
