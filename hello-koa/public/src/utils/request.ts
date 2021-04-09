import Taro from '@tarojs/taro';

interface Request {
	(config: RequestConfig): Promise<Response>
	get: (config: RequestConfig) => Promise<Response>
	post: (config: RequestConfig) => Promise<Response>
}

interface RequestConfig {
	url: string
	method?: keyof Taro.request.method
	data?: any
}

interface Response {
	statusCode: number
	data: any
}

const request: Request = (config: RequestConfig) => {
	const { method = 'GET', url, data } = config;
	return new Promise((resolve, reject) => {
		Taro.request({
			method,
			url,
			data,
			success(res: Response) {
				const { statusCode } = res;
				if (statusCode.toString().startsWith('2')) {
					resolve(res.data);
				}
			},
			fail(err) {
				reject(err);
			},
		});
	});
};

request.get = (config: RequestConfig) => {
	return request({ ...config, method: 'GET' })
}

request.post = (config: RequestConfig) => {
	return request({ ...config, method: 'POST' })
}

export default request

