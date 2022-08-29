module.exports =[{
	key:"apiHost",
	describe:`//接口地址`,
	value:`"http://testapi.cdridge.com"`,
},{
	key:"project",
	describe:`//项目名称`,
	value:`"group"`,
},{
	key:"customer",
	describe:`//客服电话`,
	value:`"15785748321"`,
},{
	key:"Logo",
	describe:`//当前项目的logo文件地址`,
	value:`"https://mfc-pt.oss-cn-chengdu.aliyuncs.com/static/logo.png"`,
},{
	key:"LoginTypes",
	describe:`/**
	 * type 支持类型 1 验证登录   2 账号密码登录
	 * */`,
	value:`[{
	title:"验证码登录",
	type:1,
},{
	title:"账号密码登录",
	type:2,
}]`,
},{
	key:"ActiveLoginTypes",
	describe:`// 当前选择的登录方式`,
	value:`2`,
},{
	key:"isMustLogin",
	describe:`// 是否必须登录`,
	value:`false`,
},{
	key:"setting",
	describe:`/**
 *  数组内容说明
 *  tx 头像
 *  nc 昵称
 * 	dqdj 当前等级
 * 	cgdlma 修改登录密码
 * 	sjh 手机号
 * 	smrz 实名认证
 * 	bdzfb 绑定支付宝
 *  bdwx 绑定微信
 *  wdtjr 我的推荐人
 *  zcsj 注册时间
 * */`,
	value:`["tx","nc","dqdj","xgdlma","sjh","smrz","bdzfb","bdwx","wdtjr","zcsj"]`,
},{
	key:"userHead",
	describe:`// 默认头像`,
	value:`"https://mfc-pt.oss-cn-chengdu.aliyuncs.com/static/logo.png"`,
},{
	key:"shareImageList",
	describe:`// 分享海报图`,
	value:`[
 "https://mfc-pt.oss-cn-chengdu.aliyuncs.com/static/logo.png","https://mfc-pt.oss-cn-chengdu.aliyuncs.com/static/logo.png","https://mfc-pt.oss-cn-chengdu.aliyuncs.com/static/logo.png"
]`,
},{
	key:"shareBg",
	describe:`//分享顶部背景`,
	value:`"https://mfc-pt.oss-cn-chengdu.aliyuncs.com/static/logo.png"`,
},{
	key:"shareLink",
	describe:`//二维码链接`,
	value:`"http://124.70.162.179:8021/"`,
},{
	key:"shareOption",
	describe:`//二维码链接`,
	value:`{
		title:"分享测试",
		summary:"我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！"
	}`,
},{
	key:"userAgreement",
	describe:`//用户协议的HTML`,
	value:`"<p>用户协议</p>"`,
},{
	key:"privacyPolicy",
	describe:`//隐私政策HTML`,
	value:`"<p>隐私政策</p>"`,
},{
	key:"about",
	describe:`//关于我们的HTML`,
	value:`"<p>关于我们的</p>"`,
},{
	key:"grade",
	describe:`//等级说明HTML`,
	value:`"<p>等级说明</p>"`,
},{
	key:"Playgame",
	describe:`//玩法介绍`,
	value:`"<p>玩法介绍</p>"`,
},
{
	key:"level",
	describe:`//等级状态`,
	value:`{
		0:"普通用户"
	}`,
},{
	key:"noData",
	describe:`/**
	 * image 图片地址
	 * msg 文字描述
	 * */`,
	value:`{
		image:"https://mfc-pt.oss-cn-chengdu.aliyuncs.com/static/noData.png",
		msg:"暂无数据",
	}`,
},{
	key:"upLoadHost",
	describe:`/**
	 * 图片上传接口地址
	 * */`,
	value:`"/group/Image/UploadByFile"`,
},{
	key:"upLoadPath",
	describe:`/**
	 * 文件所在路径，默认：/default/
	 * */`,
	value:`"/group/"`,
}]

