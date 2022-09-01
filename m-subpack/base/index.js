import {
	apiHost,
	infoAppHost,
	isMustLogin,
	project
} from "@/config";

import md5Libs from "@/m-common/uview-ui/libs/function/md5";

import { clearWallet } from "@/decorator/wallet"

/**
 * 获取检查登录状态
 * */
export const checkLogin = () => {
	const isLogin = !!uni.getStorageSync("token");
	if (!isLogin) {
		// #ifndef MP

		uni.setStorageSync("isMustLogin", 2);
		uni.navigateTo({
			url: "/m-subpack/base/pages/Login",
		});
		throw "no Login";

		// #endif
	}
};

/**
 * 微信登录
 * */

/**
 * 获取检查登录状态
 * */
export const isLogin = () => {
	const isLogin = !!uni.getStorageSync("token");
	// console.log(isLogin)
	return isLogin;
};

/**
 * 存储token
 * token
 * */
export const Login = (token) => {
	uni.setStorageSync("token", token);
	const _isMustLogin = uni.getStorageSync("isMustLogin");
	console.log("_isMustLogin", _isMustLogin);
	if (isMustLogin == 1) {
		uni.switchTab({
			url: "/pages/index/index",
		});
	} else {
		uni.navigateBack({
			delta: 1,
		});
	}
};

/**
 * 退出登录
 * link 是否跳转
 * */
export const LoginOut = (link) => {
	// const {
	// 	keys,
	// 	currentSize,
	// 	limitSize
	// } = uni.getStorageInfoSync();

	// keys.map((item) => {
	// 	if (!item.startsWith("store-")) {
	// 		console.log(item);
	// 		uni.removeStorageSync(item);
	// 	}
	// });
	uni.removeStorageSync("token");
	clearWallet();
	uni.clearStorage();
	if (link) {
		if (isMustLogin) {
			LoginView();
		} else {

			uni.switchTab({
				url: "/pages/index/index",
			});


		}
	}
};

/**
 * 获取用户信息
 * reload 是否刷新
 * */
export const getUserInfo = async (reload) => {
	let _returnCitySN = {};
	try {
		_returnCitySN = returnCitySN;
	} catch (error) {}
	if (!reload) {
		const data = uni.getStorageSync("Base-UserInfo");
		if (data) return data;
	}
	console.log(uni.getStorageSync("token"));
	const {
		data
	} = await request({
		url: "/base/user/NewGetInfo",
		method: "POST",
		data: _returnCitySN,
	});
	uni.setStorageSync("Base-UserInfo", data);
	console.log("userInfo", data);
	return data;
};

export const infoRequest = async (option) => {
	// const key = md5(JSON.stringify(option))
	// if(!!cache[key]) return;
	// cache[key] = key;


	// #ifndef  MP-WEIXIN

	const token = uni.getStorageSync("token");
	// #endif

	if (!option.url.startsWith("http")) {
		option.url = `${infoAppHost}${option.url}`;
		if (option.params) {
			option.url = `${option.url}?${jsonToParams(option.params)}`;
		}
	}
	option.sslVerify = false;
	option.dataType = "json";
	option.header = option.header || {};
	//语言
	let lang = uni.getStorageSync('CURRENT_LANG') == 'en-US' ? ' en' : 'zh-Hans';
	if (token) {
		//加入header
		option.header = {
			...option.header,
			// Authorization: token,
			lang: lang
		};
	}
	option.header.token = project;
	const [error, {
		data,
		errorMessage,
		statusCode
	}] = await uni.request(option);
	// delete cache[key];
	if (data.errorCode === 0) {
		return data;
	}
	if (data.errorCode === 401) {
		// #ifndef  MP-WEIXIN
		uni.showToast({
			title: "登录已失效",
			icon: "none",
		});
		LoginOut(true);
		// #endif
		// #ifdef  MP-WEIXIN
		if (isLogin()) {
			await wxToken();
			return await request(option);
		}
		// #endif
		// return data;
		throw data;
	} else if (!!data.errorCode) {
		if (!option.hideToast) {
			uni.showToast({
				title: data.errorMessage,
				icon: "none",
			});
		}
		throw data;
	}
	console.log(statusCode, data);

	switch (statusCode) {
		case 401:
			// #ifndef  MP-WEIXIN
			uni.showToast({
				title: "登录已失效",
				icon: "none",
			});
			LoginOut(true);
			// #endif
			// #ifdef  MP-WEIXIN
			if (isLogin()) {
				await wxToken();
				return await request(option);
			}
			// #endif
			break;
		default:
	}
	throw statusCode;
};
export const genSignParams = (inObject) => {
	if (!inObject) {
		return;
	}
	var sorter = function(inObject) {
		var sortedJson = {};
		var sortedKeys = Object.keys(inObject).sort();
		for (var i = 0; i < sortedKeys.length; i++) {
			sortedJson[sortedKeys[i]] = inObject[sortedKeys[i]]
		}
		return sortedJson;
	}

	var sortedParam = sorter(inObject);

	var needSignatureStr = "";
	for (var key in sortedParam) {
		var value = sortedParam[key];
		needSignatureStr = needSignatureStr + key + '=' + (value.toString()).replace(/(^\s*)|(\s*$)/g, "") + '&';
	}
	return needSignatureStr;
};


export const request = async (option) => {

	const token = uni.getStorageSync("token");

	if (!option.url.startsWith("http")) {
		option.url = `${apiHost}${option.url}`;
		if (option.params) {
			option.url = `${option.url}?${jsonToParams(option.params)}`;
		}
	}
	option.sslVerify = false;
	option.dataType = "json";
	option.header = option.header || {};
	//语言
	let lang = uni.getStorageSync('CURRENT_LANG') == 'en-US' ? ' en' : 'zh';

	if (token) {
		//加入header
		option.header = {
			...option.header,
			// Authorization: token,
		};
	}
	option.header.lang = lang;
	option.header.token = project;

	//参数排序存储 sign

	let timestamp = new Date().getTime();

	option.header.timestamp = timestamp;

	let dataObj = { ...option.data || option.params, timestamp: timestamp };
	//去掉对象的空对象值
	let myFunction = (item, index) => {

		var key = dataObj[item];
		if (key === null || key === "" || key === undefined) {
			delete dataObj[item];
		}
	};
	//去掉空对象值
	Object.keys(dataObj).forEach(myFunction);
	option.header.sign = md5(`${genSignParams(dataObj)}key=DLM_XXL_!@^%$~`);


	const [error, {
		data,
		errorMessage,
		statusCode
	}] = await uni.request(option);


	if (data.errorCode === 0) {
		console.log("errorCode")
		uni.setStorageSync("safetyList", []);
		return data;
	}
	if (data.errorCode === 401) {
		// #ifndef  MP-WEIXIN
		// uni.showToast({
		// 	title: "登录已失效",
		// 	icon: "none",
		// });

		//注册页tonken
		// LoginOut(true);

		// #endif
		// #ifdef  MP-WEIXIN
		// if (isLogin()) {
		// 	await wxToken();
		// 	return await request(option);
		// }
		// #endif
		// return data;
		// throw data;
	} else if (data.errorCode === 403) {
		//验证字典
		uni.setStorageSync("safetyList", data.data);
		//存储参数
		uni.setStorageSync("option", option);
		uni.navigateTo({
			url: `/pages/my/setting/safety`
		})

	} else if (!!data.errorCode) {
		if (!option.hideToast) {
			uni.showToast({
				title: data.errorMessage,
				icon: "none",
			});
		}
		throw data;
	}
	console.log(statusCode, data);

	// switch (statusCode) {
	// 	case 401:
	// 		// #ifndef  MP-WEIXIN
	// 		uni.showToast({
	// 			title: "登录已失效",
	// 			icon: "none",
	// 		});
	// 		LoginOut(true);
	// 		// #endif
	// 		// #ifdef  MP-WEIXIN
	// 		if (isLogin()) {
	// 			await wxToken();
	// 			return await request(option);
	// 		}
	// 		// #endif
	// 		break;
	// 	default:
	// }
	throw statusCode;
};

const wxToken = async () => {
	const [err, {
		code
	}] = await uni.login({
		provider: "weixin",
	});
	// debugger
	const [error, _data] = await uni.request({
		url: `${apiHost}/base/Login/UserLogin`,
		method: "POST",
		header: {
			token: project,
		},
		data: {
			code,
		},
	});
	console.log("------", _data);
	//if (_data.data.errorMessage == "用户不存在") {
	//	uni.$emit("__login", "code");
	//}
	// debugger
	// console.log(_data);
	let token = _data.data.data;
	uni.setStorageSync("token", token);
	return token;
};

// json to Params
export const jsonToParams = (json) => {
	return Object.keys(json)
		.map(function(key) {
			// body...
			return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
		})
		.join("&");
};

export const md5 = (string) => {
	const data = md5Libs.md5(string);
	return data;
};

/**
 * 弹出登录弹窗
 *
 * */
export const LoginView = () => {
	uni.setStorageSync("isMustLogin", 1);
	uni.reLaunch({
		url: "/m-subpack/base/pages/Login",
	});
};
/**
 * 分享
 *
 * */
export const goshare = () => {
	uni.navigateTo({
		url: "/m-subpack/base/pages/share",
	});
};
/**
 * 关于我们列表
 *
 * */
export const aboutView = () => {
	uni.navigateTo({
		url: "/m-subpack/base/pages/agreementList",
	});
};
/**
 * 弹出选择收货地址
 * type  1--地址选择返回状态
 * */
export const addressSelect = async () => {
	return await navigateTo("/m-subpack/base/pages/address/index?type=1");
};
/**
 * 弹出收货地址
 *
 * */

export const addressIndex = () => {
	uni.navigateTo({
		url: "/m-subpack/base/pages/address/index",
	});
};

//城市选择
export const citySelect = async () => {
	return await navigateTo("/m-subpack/base/pages/citySelect");
};

//休眠函数
export const sleep = (ms) => {
	return new Promise(function(resolve, reject) {
		setTimeout(resolve, ms);
	});
};
//去掉首位空格
export const trimStr = (str) => {
	console.log(str, 'str');

	const reg = /(^\s*)|(\s*$)/g;
	return str.replace(reg, "");
};
//手机号验证
export const mobileVar = (value) => {
	const reg = /^1[0-9]{10}$/;
	return reg.test(value);
};

//身份证号验证
export const isCardNo = (value) => {
	const reg = /^\d{15}|\d{}18$/;
	return reg.test(value);
};

//设置页面
export const settingView = (value) => {
	uni.navigateTo({
		url: "/m-subpack/base/pages/setting/index",
	});
};
//等级页面
export const agreementView = (value) => {
	uni.navigateTo({
		url: "/m-subpack/base/pages/agreement?type=4",
	});
};
//意见反馈
export const customerView = (value) => {
	uni.navigateTo({
		url: "/m-subpack/base/pages/customer",
	});
};

export const navigateTo = (url) => {
	return new Promise(function(resolve, reject) {
		uni.navigateTo({
			url,
		});
		uni.$off("backData").$on("backData", function(data) {
			resolve(data);
			uni.$off("backData");
			console.log(`来志${url}的返回 ，携带参数为：`, data);
		});
	});
};

export const navigateBack = (data) => {
	uni.$emit("backData", data);
	uni.navigateBack({
		delta: 1,
	});
};

export const guid = () => {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
		var r = (Math.random() * 16) | 0,
			v = c == "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
};


export const alipayAuth = async () => {
	const {
		data
	} = await request({
		url: "/base/User/alipayoauth"
	})
	console.log("------", data);
	const _data = await FL.aliPayAuth(data)
	console.log("------", JSON.stringify(_data));
	if (_data.resultStatus == "9000") {
		let vars = _data.result.split("&");
		let _code;
		for (let i = 0; i < vars.length; i++) {
			let pair = vars[i].split("=");
			if (pair[0] == "auth_code") {
				_code = pair[1];
				break;
			}
		}
		await request({
			url: "/base/User/alipaybind",
			method: "POST",
			data: {
				code: _code,
			}
		})

		console.log("------", _code);
	} else {
		throw _data;
	}
}
