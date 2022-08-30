import Vue from 'vue'
import App from './App'
//应用uview
// import "common:uview-ui";
// import "common:mescroll-uni";
// import "common:common";
// import "common:m-chat";
// // 应用基础组件
// import base from "subpack:base";



import uView from "@/m-common/uview-ui"
Vue.use(uView);

// Vue.prototype.base = base;
Vue.config.productionTip = false;
import  '@/js/flutter/flutterName';
import i18n from '@/lang/index'

App.mpType = 'app'



const app = new Vue({
	i18n,
    ...App
})
app.$mount()


// let methodChannel;

// import {
// 	MethodChannel
// } from '@/js/flutter/flutter.js';
// try {
// 	methodChannel = new MethodChannel('topMain');
// } catch (e) {}


// let methodChannelData;



// methodChannel.$on('flutterView', e => {
// 	console.log('flutterView', e);
// 	console.log("flutterView",methodChannelData);
// 	if (e.callbackId) {
// 		// callbackId存在说明，需要回调数据
// 		methodChannel.callback(e.callbackId, methodChannelData);
// 	} else {
// 		uni.showToast({
// 			title: JSON.stringify(e),
// 			icon: 'none'
// 		});
// 	}
// });