import {
	request,
	getUserInfo,
	jsonToParams
} from "@/m-subpack/base";

import {
	checkLogin,
	UserStore
} from "@/m-common/common"

import {
	chatAppKey,
	chatAppHost
} from "@/config"
// const io = require("weapp.socket.io");

const chatConfig = {
	host: chatAppHost,
	appKey: chatAppKey,
	httpPort: "",//:8082
	imKey: "im",
	apiTransport: "HTTPS",
	socketPort: "",
};

let socket = null;

export const init = async (callback) => {
	if (socket) return callback();
	UserStore.watch((data) => {
		if (!socket) {
			init(callback);
		}
	})

	checkLogin(); //http://api.dolaimi.org/socket.io
	socket = io.connect(`https://api.dolaimi.org/`);
	// socket = io.connect(`http://192.168.112.47:9092/`);
	socket.on("connect", async (data) => {
		console.log("connection created.", data);
		
		Login(callback);

	});

	socket.on("topic.downstream_message", (d) => {
		console.log("topic.downstream_message", d);
		uni.$emit("downstream_message", d);
		console.log('1')
	});
	socket.on("topic.upstream_message", (d) => {
		console.log("topic.upstream_message", d);
		console.log('2')
	});

	socket.on("topic.client", (d) => {
		console.log("topic.client", d);

	});

	socket.on("topic.history", (d) => {
		console.log("topic.history", d);
	});
	socket.on("disconnect", (d) => {
		console.log("disconnect", d);
		socket = null;
		init();
	});
	socket.on("topic.connection", (d) => {
		console.log('asas')
		console.log("topic.connection", d);
	});




};

export const sendMsg = async (option) => {
	const userInfo = await getUserInfo();
	await chatHttp({
		url: "/v1/upstream_message/send",
		method: "POST",
		data: {
			fromUser: userInfo.userId,
			toTarget: option.toTarget,
			id: option.id,
			status: option.status,
			way: option.way,
			type: option.type,
			body: option.body,
		},
	});
};

export const addFriend = async (option) => {
	return await chatHttp({
		url: "/v1/user_relation/add_friend",
		method: "POST",
		data: {
			auid: userInfo.userId,
		},
	});
}


export const register = async (userInfo, callback) => {
	await chatHttp({
		url: "/v1/user/add",
		method: "POST",
		data: {
			avatar: userInfo.avatar,
			email: userInfo.email,
			gender: userInfo.gender,
			mobile: userInfo.phone,
			name: userInfo.userName,
			auid: userInfo.userId,
			token: userInfo.userId,
		},
	});

	Login(callback);

};

export const Login = async (callback) => {
	const userInfo = await getUserInfo();
	const timestamp = new Date().getTime()
	const {id} = socket
	socket.emit("topic.connection", {
		appKey: chatConfig.appKey,
		auid: userInfo.userId,
		jwt: "",
		method: "authority/request",
		clientId: id,
		timestamp: timestamp,
		token: uni.getStorageSync('token'),
	}, (data) => {
		console.log(data, '消息token');
		switch (data.response.code) {
			case -203:
				register(userInfo, callback);
				break;
			default:
				// uni.setStorageSync("requestId", data.requestId);
				// uni.setStorageSync("chatToken", data.response.data);
				callback();
		}

	});
};
export const uploadFile = async (option)=>{
	if (!option.url.startsWith("http")) {
		option.url = `${chatConfig.apiTransport}://${chatConfig.host}:${chatConfig.httpPort}/${chatConfig.imKey}${option.url}`;
		if (option.params) {
			option.url = `${option.url}?${jsonToParams(option.params)}`;
		}
	}
	let token = uni.getStorageSync("token");
	uni.uploadFile({
		header:{
			// authorization:token,
			appKey:chatConfig.appKey
		},
		filePath: option.file,
		name: 'file',
		url:option.url,
		success(res) {
			option.cb(res)
		},
		fail(err){
			option.failCb(err)
		}
	})
}

export const chatHttp = async (option) => {
	if (!option.url.startsWith("http")) {
		option.url = `${chatConfig.apiTransport}://${chatConfig.host}:${chatConfig.httpPort}/${chatConfig.imKey}${option.url}`;
		if (option.params) {
			option.url = `${option.url}?${jsonToParams(option.params)}`;
		}
	}
	let token = uni.getStorageSync("token");
	// if (chatAppKey == 'DUOLAIMI') chatToken = uni.getStorageSync("token");
	option.sslVerify = false;
	option.dataType = "json";
	option.header = option.header || {};
	if (token) {
		// option.header.authorization = token;
	}
	option.header.appKey = chatConfig.appKey;
	const [error, {
		data,
		errorCode
	}] = await uni.request(option);
	
	// console.log(_data);
	if (data.code == 0) {
		return data;
	}else if (data.errorCode == 0 ){
		return data;
	}
	throw data;
};
