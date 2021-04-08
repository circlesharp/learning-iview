import Taro from '@tarojs/taro';

export const request = (method = 'get', url, data) => {
	return new Promise((resolve, reject) => {
		Taro.request({
			method,
			url,
			data,
			success(res) {
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

export default {
	request,
};
