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
			const data = { token: Taro.getStorageSync('token') };
			const rst = await request.post({ url, data });
			const toastTitle = rst?.result ? 'success' : 'fail';
			Taro.showToast({ title: toastTitle });
		} catch (error) {
			console.log(error);
		}
	};

	getClassicLatest = async () => {
		try {
			const url = 'http://localhost:3002/v1/classic/latest';
			const res = await request.get({ url, data: {} });
			console.log(res);
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
				<Button onClick={this.getClassicLatest}>获取最新期刊</Button>
			</View>
		);
	}
}

export default Login;
