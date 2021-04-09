import Taro from '@tarojs/taro';
import { Component } from 'react';
import { View, Button } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import request from '../../utils/request';

import './island.styl';

@inject('store')
@observer
class Login extends Component {
	handleGetToken = () => {
		Taro.login({
			success: async res => {
				const { code } = res;
				if (!res.code) {
					return;
				}

				const url = 'http://localhost:3002/v1/token';
				const data = {
					account: code,
					type: 100,
				};

				try {
					const { token } = await request.post({ url, data });
					Taro.setStorageSync('token', token);
				} catch (err) {
					console.log(err);
				}
			}
		});
	};

	handleVerifyToken = async () => {
		try {
			const url = 'http://localhost:3002/v1/token/verify';
			const token = Taro.getStorageSync('token');
			const rst = await request('post', url, { token });
			console.log(rst?.result);
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		return (
			<View className='index'>
				island api test
				<Button onClick={this.handleGetToken}>获取 token</Button>
				<Button onClick={this.handleVerifyToken}>验证 token</Button>
			</View>
		);
	}
}

export default Login;
