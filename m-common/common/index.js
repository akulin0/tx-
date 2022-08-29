import {
	guid,
	request
} from "@/m-subpack/base";

import { project } from "@/config.js";

class _UserStore {
	_watch = {};
	data = uni.getStorageSync("Base-UserInfo") || {};

	watch(callBack, reload) {
		const uuid = guid();
		this._watch[uuid] = {
			callBack,
		};
		if (reload) {
			this.reload();
		}
	}

	async reload() {

		if (isLogin()) {
			let _returnCitySN = {};
			try {
				_returnCitySN = returnCitySN;
			} catch (error) {}
			const {
				data
			} = await request({
				url: "/base/user/NewGetInfo",
				method: "POST",
				data: _returnCitySN
			});
			uni.setStorageSync("Base-UserInfo", data);

			this.changeData({
				...data,
				isLogin: true,
			});
		} else {
			this.changeData({
				isLogin: false,
			});
		}
	}

	changeData(data) {
		Object.keys(this._watch).map((item) => {
			const _item = this._watch[item];
			if (_item._isDestroyed) {
				delete this._watch[item];
			} else {
				_item.callBack(data);
			}
		});
	}
}

export const UserStore = new _UserStore();

export const isLogin = () => {
	return !!uni.getStorageSync("token");
};

export const checkLogin = () => {
	if (!isLogin()) {
		uni.$emit("__login", "code");
		throw "no Login";
	}
};

export const Login = (token) => {
	uni.setStorageSync("token", token);
	uni.setStorageSync("userInfo", "");
	uni.setStorageSync("Base-UserInfo", "");
	UserStore.reload();
};

export const LoginOut = () => {
	uni.setStorageSync("token", "");
	if(project=='law') {
		uni.switchTab({
			url: "/pages/index/index",
		});
	}else {
		uni.switchTab({
			url: "/pages/index/index2",
		});
	}
	UserStore.reload();
};
