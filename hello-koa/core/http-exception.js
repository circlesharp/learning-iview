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

module.exports = {
	HttpException,
	ParameterException,
};
