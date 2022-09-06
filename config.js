

//本地
// const host = "/api";
const host = "www.telegramx.space"

// const host = "192.168.2.233:8080";
// const host = "59.111.59.121:8091"
// const host = "192.168.1.11:8091";

// //更新版本记到修改  聊天为https
// const host = "api.dolaimi.org";
export const apiHost = `http://${host}/pocket`;
export const infoAppHost = `http://${host}/pocket`;


export const chatAppHost = host;



export const changeApi = (newHost) => {
	cacheHost = newHost;
	const _request = uni.request;
	uni.request = (option) => {
		option.url = option.url.replace(host, cacheHost);
		return _request(option)
	}

}


export const emojiList = [
	{
		name: "悲伤",
		icon: "bg-beishang",
		pic: "/static/emoji/bg-beishang.png",
	},
	{
		name: "闭嘴",
		icon: "bg-bizui",
		pic: "/static/emoji/bg-bizui.png",
	},
	{
		name: "大哭",
		icon: "bg-daku",
		pic: "/static/emoji/bg-daku.png",
	},
	{
		name: "大笑",
		icon: "bg-daxiao",
		pic: "/static/emoji/bg-daxiao.png",
	},
	{
		name: "恶魔",
		icon: "bg-emo",
		pic: "/static/emoji/bg-emo.png",
	},
	{
		name: "发怒",
		icon: "bg-fanu",
		pic: "/static/emoji/bg-fanu.png",
	},
	{
		name: "飞吻",
		icon: "bg-feiwen",
		pic: "/static/emoji/bg-feiwen.png",
	},
	{
		name: "搞怪",
		icon: "bg-gaoguai",
		pic: "/static/emoji/bg-gaoguai.png",
	},
	{
		name: "害羞",
		icon: "bg-haixiu",
		pic: "/static/emoji/bg-haixiu.png",
	},
	{
		name: "惊恐",
		icon: "bg-jingkong",
		pic: "/static/emoji/bg-jingkong.png",
	},
	{
		name: "囧",
		icon: "bg-jiong",
		pic: "/static/emoji/bg-jiong.png",
	},
	{
		name: "可爱",
		icon: "bg-keai",
		pic: "/static/emoji/bg-keai.png",
	},
	{
		name: "哭泣",
		icon: "bg-kuqi",
		pic: "/static/emoji/bg-kuqi.png",
	},
	{
		name: "流汗",
		icon: "bg-liuhan",
		pic: "/static/emoji/bg-liuhan.png",
	},
	{
		name: "流口水",
		icon: "bg-liukoushui",
		pic: "/static/emoji/bg-liukoushui.png",
	},
	{
		name: "努力",
		icon: "bg-nuli",
		pic: "/static/emoji/bg-nuli.png",
	},
	{
		name: "色",
		icon: "bg-se",
		pic: "/static/emoji/bg-se.png",
	},
	{
		name: "帅气",
		icon: "bg-shuaiqi",
		pic: "/static/emoji/bg-shuaiqi.png",
	},
	{
		name: "睡觉",
		icon: "bg-shuijiao",
		pic: "/static/emoji/bg-shuijiao.png",
	},
	{
		name: "贪财",
		icon: "bg-tancai",
		pic: "/static/emoji/bg-tancai.png",
	},
	{
		name: "叹气",
		icon: "bg-tanqi",
		pic: "/static/emoji/bg-tanqi.png",
	},
	{
		name: "调皮",
		icon: "bg-tiaopi",
		pic: "/static/emoji/bg-tiaopi.png",
	},
	{
		name: "偷笑",
		icon: "bg-touxiao",
		pic: "/static/emoji/bg-touxiao.png",
	},
	{
		name: "微笑",
		icon: "bg-weixiao",
		pic: "/static/emoji/bg-weixiao.png",
	},
	{
		name: "为难",
		icon: "bg-weinan",
		pic: "/static/emoji/bg-weinan.png",
	},
	{
		name: "笑哭",
		icon: "bg-xiaoku",
		pic: "/static/emoji/bg-xiaoku.png",
	},
	{
		name: "再见",
		icon: "bg-zaijian",
		pic: "/static/emoji/bg-zaijian.png",
	},
	{
		name: "OK",
		icon: "bg-ok",
		pic: "/static/emoji/bg-ok.png",
	},
	{
		name: "点赞",
		icon: "bg-dianzan",
		pic: "/static/emoji/bg-dianzan.png",
	},
	{
		name: "六",
		icon: "bg-liu",
		pic: "/static/emoji/bg-liu.png",
	},
	{
		name: "弱",
		icon: "bg-ruo",
		pic: "/static/emoji/bg-ruo.png",
	},
	{
		name: "伸手",
		icon: "bg-shenshou",
		pic: "/static/emoji/bg-shenshou.png",
	},
	{
		name: "耶",
		icon: "bg-yeah",
		pic: "/static/emoji/bg-yeah.png",
	},
	{
		name: "张手",
		icon: "bg-zhangshou",
		pic: "/static/emoji/bg-zhangshou.png",
	},
	{
		name: "指引",
		icon: "bg-zhiyin",
		pic: "/static/emoji/bg-zhiyin.png",
	}
];

/**
 * 资讯相关接口地址
 */
//项目名称
export const project = "DUOLAIMI";

//设备号
export const device_id = "DUOLAIMI";

//客服电话
export const customer = "15785748321";

//当前项目的logo文件地址
export const Logo = "/static/Logo1.png";



/**
 * type 支持类型 1 验证登录   2 账号密码登录
 * */
export const LoginTypes = [{
	title: "验证码登录",
	type: 1,
}, {
	title: "账号密码登录",
	type: 2,
}];

// 当前选择的登录方式
export const ActiveLoginTypes = 2;

// 是否必须登录
export const isMustLogin = false;

/**
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
 * */
export const setting = ["tx", "nc", "dqdj", "xgdlma", "sjh", "smrz", "bdzfb", "bdwx", "wdtjr", "zcsj"];

// 默认头像
export const userHead = "/static/logo.png";

// 分享海报图
export const shareImageList = [
	"/static/logo.png", "/static/logo.png", "/static/logo.png"
];

//分享顶部背景
export const shareBg = "/static/logo.png";

//二维码链接
export const shareLink = "http://124.70.162.179:8021/";

//二维码链接
export const shareOption = {
	title: "分享测试",
	summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！"
};

//用户协议的HTML
export const userAgreement = `
  <div style="font-size:14px">
  <p>
      DOLAIMI<span style="font-family: 宋体">服务协议</span>
  </p>
  <p>
      <span style="font-family:宋体">最近更新于：</span>2021<span style="font-family:宋体">年</span>4<span style="font-family:宋体">月</span>15<span style="font-family:宋体">日</span>
  </p>
  <p style="margin-bottom:20px">
      &nbsp;
  </p>
  <p style="margin-bottom:16px">
      <span style="font-family:宋体">尊敬的用户：</span>
  </p>
  <p>
      <span style="font-family:宋体">感谢您选择</span>DOLAIMI<span style="font-family:宋体">服务。《</span>DOLAIMI<span style="font-family:宋体">服务协议》（以下简称</span>“<span style="font-family:宋体">本协议</span>”<span style="font-family:宋体">）由美国（</span>Chain Fans Science And Technology. Ltd <span style="font-family:宋体">公司注册号：</span>#20211109930<span style="font-family:宋体">，美国加密货币业务政府备案号：</span>31000182616218<span style="font-family:宋体">）</span> <span style="font-family:宋体">成立的研究室推出的社交多链终端应用，（以下简称</span>“DOLAIMI”<span style="font-family:宋体">或</span>“<span style="font-family:宋体">我们</span>”<span style="font-family:宋体">）和用户（以下简称</span>“<span style="font-family:宋体">您</span>”<span style="font-family:宋体">或</span>“<span style="font-family:宋体">用户</span>”<span style="font-family:宋体">）签订，本协议在您与</span>DOLAIMI<span style="font-family:宋体">之间具有合同上的法律效力。</span>
  </p>
  <p>
      DOLAIMI<span style="font-family: 宋体">在此特别提醒您在使用</span>DOLAIMI<span style="font-family:宋体">之前，请认真阅读《</span>DOLAIMI<span style="font-family:宋体">服务协议》及后文提到的相关协议，尤其是本协议规定的</span>“<span style="font-family:宋体">免责及责任限制</span>”<span style="font-family:宋体">等条款将以<strong>加粗</strong>的形式体现，确保您充分理解本协议中各条款，并自主考虑风险。</span>
  </p>
  <p style="margin-bottom:20px">
      &nbsp;
  </p>
  <p>
      <span style="font-family:宋体">一、</span> <span style="font-family:宋体">关于本协议的确认与接纳</span>
  </p>
  <p>
      1) <span style="font-family:宋体">您理解本协议及有关协议适用于</span>DOLAIMI<span style="font-family:宋体">及</span>DOLAIMI<span style="font-family:宋体">上</span>DOLAIMI<span style="font-family:宋体">所自主开发和拥有的去中心化应用（简称</span>“DApp”<span style="font-family:宋体">）（排除第三方开发的</span>DApp<span style="font-family:宋体">）。</span>
  </p>
  <p>
      2) <span style="font-family:宋体">您下载</span>DOLAIMI<span style="font-family:宋体">软件并创建或导入钱包，即视为您已经充分阅读并接受本协议全部条款，本协议立即生效，对双方具有约束力。</span>
  </p>
  <p>
      3) <span style="font-family:宋体">本协议可由</span>DOLAIMI<span style="font-family:宋体">随时更新，经修改的协议一经在</span>DOLAIMI<span style="font-family:宋体">上公布，立即自动生效，恕不再另行通知。在</span>DOLAIMI<span style="font-family:宋体">公布修改协议条款后，如果您不接受修改后的条款，请立即停止使用</span>DOLAIMI<span style="font-family:宋体">，您继续使用</span>DOLAIMI<span style="font-family:宋体">将被视为接受修改后的协议。</span>
  </p>
  <p>
      4) <span style="font-family:宋体">如果您未满</span>18<span style="font-family:宋体">周岁，或者是无民事行为能力人或限制民事行为能力人，请在父母或监护人指导下使用</span>DOLAIMI<span style="font-family:宋体">。</span>
  </p>
  <p style="margin-bottom:20px">
      &nbsp;
  </p>
  <p>
      <span style="font-family:宋体">二、</span> <span style="font-family:宋体">定义</span>
  </p>
  <p>
      1) DOLAIMI<span style="font-family: 宋体">：指由</span>DOLAIMI<span style="font-family:宋体">基于</span> BTC<span style="font-family:宋体">、</span>ETH<span style="font-family:宋体">、</span>TRX<span style="font-family:宋体">、等区块链系统（及将来陆续支持的其他区块链系统）开发的区块链钱包，包括其他为方便用户使用区块链系统而开发的辅助工具。</span>
  </p>
  <p>
      2) <span style="font-family:宋体">用户：</span>
  </p>
  <p>
      A. <span style="font-family:宋体">用户必须是具备完全民事行为能力的自然人；</span>
  </p>
  <p>
      B. <span style="font-family:宋体">若您为</span>18<span style="font-family:宋体">周岁以下的未成年人使用</span>DOLAIMI<span style="font-family:宋体">服务，需要在您父母或监护人的指导下使用</span>DOLAIMI<span style="font-family:宋体">。无民事行为能力人使用</span>DOLAIMI<span style="font-family:宋体">或限制民事行为能力人超过其民事权利或行为能力范围从事交易的，造成的一切后果，</span>DOLAIMI<span style="font-family:宋体">有权要求您及您的父母或监护人负责。</span>
  </p>
  <p>
      3) <span style="font-family:宋体">使用相关</span>
  </p>
  <p>
      A. <span style="font-family:宋体">创建或导入钱包：指您使用</span>DOLAIMI<span style="font-family:宋体">，确认履行本协议并创建或导入钱包的过程。</span>
  </p>
  <p>
      B. <span style="font-family:宋体">钱包密码：指您在创建</span>DOLAIMI<span style="font-family:宋体">钱包过程中，软件操作界面提示您填写的密码，该密码用于加密保护私钥。作为去中心化的应用，钱包密码不存储在您的这台移动设备或</span>DOLAIMI<span style="font-family:宋体">的服务器，一旦丢失你需要借助明文私钥或助记词重置新密码。</span>
  </p>
  <p>
      <span style="font-family:宋体">信息提示：</span>DOLAIMI<span style="font-family:宋体">软件操作界面涉及的信息提示内容，建议用户按照相关步骤进行操作。</span>
  </p>
  <p>
      C. <span style="font-family:宋体">私钥：由</span>256<span style="font-family:宋体">位随机字符构成，是用户拥有并使用数字代币的核心。</span>
  </p>
  <p>
      D. <span style="font-family:宋体">公钥：由私钥借助密码学原理单向推导生成，并用以生成区块链数字钱包地址，数字钱包地址即为公开收款地址。</span>
  </p>
  <p>
      E. <span style="font-family:宋体">助记词：符合区块链</span>BIP39 <span style="font-family:宋体">行业标准，由随机算法生成的</span>12<span style="font-family:宋体">（或</span>15/18/21/24<span style="font-family:宋体">）个有序单词组成。是私钥的易记录表现形式，方便用户备份保管。</span>
  </p>
  <p>
      F. Keystore: <span style="font-family: 宋体">是私钥或助记词经过用户设置的钱包密码加密保存的文件形式，它只存储在您的这台移动设备中，不会同步至</span>DOLAIMI<span style="font-family:宋体">服务器。</span>
  </p>
  <p>
      G. <span style="font-family:宋体">数字代币：指</span>DOLAIMI<span style="font-family:宋体">目前支持的数字代币种类，包括但不限于</span>ETH<span style="font-family:宋体">、</span>TRX<span style="font-family:宋体">等。</span>
  </p>
  <p>
      H. <span style="font-family:宋体">资料：指</span>DOLAIMI<span style="font-family:宋体">上</span>“<span style="font-family:宋体">快讯</span>”<span style="font-family:宋体">等内容资料，这些资料均为</span>DOLAIMI<span style="font-family:宋体">所有，未经授权不得转载。</span>
  </p>
  <p>
      I. <span style="font-family:宋体">个人信息：指以电子或者其他方式记录的能够单独或者与其他信息结合识别用户个人身份的各种信息，包括但不限于自然人的姓名、出生日期、身份证件号码、个人生物识别信息、住址、电话号码、银行卡号、邮件地址、钱包地址、移动设备信息、操作记录、交易记录等，但不包括用户的钱包密码、私钥、助记词、</span>Keystore<span style="font-family:宋体">。</span>
  </p>
  <p style="margin-bottom:20px">
      &nbsp;
  </p>
  <p>
      <span style="font-family:宋体">三、</span> <span style="font-family:宋体">服务内容</span>
  </p>
  <p>
      1) <span style="font-family:宋体">创建或导入钱包。对</span>DOLAIMI<span style="font-family:宋体">支持的数字代币，您可以使用</span>DOLAIMI<span style="font-family:宋体">生成新钱包或导入相关区块链系统的其它钱包工具生成的兼容钱包。</span>
  </p>
  <p>
      2) <span style="font-family:宋体">转账、收款。您可以使用</span>DOLAIMI<span style="font-family:宋体">的转账、收款功能进行数字代币的管理，即运用私钥进行电子签名，对相关区块链的账本进行修改。转账是指付款方利用收款方的区块链地址进行转账操作，实际的转账、收款行为均在相关区块链系统（而非</span>DOLAIMI<span style="font-family:宋体">）发生。</span>
  </p>
  <p>
      3) <span style="font-family:宋体">行情查看。您可以使用</span>DOLAIMI<span style="font-family:宋体">查看所提供的数字代币汇率价格。</span>DOLAIMI<span style="font-family:宋体">通过抓取相应的数字代币汇率信息并展示在</span>DOLAIMI<span style="font-family:宋体">中的</span>“<span style="font-family:宋体">市场</span>”<span style="font-family:宋体">版块。</span>
  </p>
  <p>
      4) <span style="font-family:宋体">管理数字资产。您可以使用</span>DOLAIMI<span style="font-family:宋体">添加、保管并移除</span>DOLAIMI<span style="font-family:宋体">所支持的数字代币（</span>ETH<span style="font-family:宋体">除外）。</span>
  </p>
  <p>
      5) <span style="font-family:宋体">浏览</span>DApp<span style="font-family:宋体">。用户通过在</span>DOLAIMI<span style="font-family:宋体">上的链接，可以跳转至</span>DApp<span style="font-family:宋体">并使用该</span>DApp<span style="font-family:宋体">（包括</span>DOLAIMI<span style="font-family:宋体">自己的</span>DApp<span style="font-family:宋体">和第三方</span>DApp<span style="font-family:宋体">）提供的服务。</span>
  </p>
  <p>
      6) <span style="font-family:宋体">交易记录。我们将通过区块链系统拷贝您全部或部分的交易记录。但交易记录以区块链系统的记载为准。</span>
  </p>
  <p>
      7) <span style="font-family:宋体">暂停服务。您知悉基于区块链系统交易</span>“<span style="font-family:宋体">不可撤销</span>”<span style="font-family:宋体">的属性，我们不能为您暂停或撤销转账交易等操作，但在一定情况下，我们可以暂停或者限制某位用户对</span>DOLAIMI<span style="font-family:宋体">软件的操作。</span>
  </p>
  <p>
      8) <span style="font-family:宋体">在</span>DOLAIMI <span style="font-family:宋体">上（</span>TRX<span style="font-family:宋体">体系有效去中心解决方案）钱包注册所需的助记词，邮箱，或手机号增加的</span>Owner<span style="font-family:宋体">权限归属于</span>DOLAIMI<span style="font-family:宋体">，我们将在注册开始向您做出特别提示，如果选择使用该功能，则视为您同意并认可所有条款。</span>
  </p>
  <p>
      A. <span style="font-family:宋体">使用</span>DOLAIMI<span style="font-family:宋体">手机号码、邮箱注册功能（</span> TRX<span style="font-family:宋体">体系有效去中心解决方案）过程中会收集您的手机号码或邮箱地址作为一个凭证，并默认增加多签的</span>Owner<span style="font-family:宋体">权限，以便于私钥找回。</span>
  </p>
  <p>
      B. <span style="font-family:宋体">我们在手机号码、邮箱注册方式中（</span>TRX<span style="font-family:宋体">体系有效去中心解决方案）会把</span>DOLAIMI<span style="font-family:宋体">的</span>Owner<span style="font-family:宋体">权限进行多签设置，最大程度的保证用户的权限安全。且区块信息可查，最大程度公开透明化，账号的每一次操作均可查询对应的发起者。</span>
  </p>
  <p>
      9) <span style="font-family:宋体">其他</span>DOLAIMI<span style="font-family:宋体">认为有必要提供的服务。</span>
  </p>
  <p style="margin-bottom:20px">
      &nbsp;
  </p>
  <p>
      <span style="font-family:宋体">四、</span> <span style="font-family:宋体">用户接受</span>DOLAIMI<span style="font-family:宋体">提供的上述服务时应了解以下常见问题</span>
  </p>
  <p>
      1) <span style="font-family:宋体">秉承着区块链的去中心化特点，并为了保护用户的数字代币安全，</span>DOLAIMI<span style="font-family:宋体">提供的是去中心化服务，大大区别于银行业金融机构。用户了解</span>DOLAIMI<span style="font-family:宋体">（去中心化方案）不提供以下服务：</span>
  </p>
  <p>
      A. <span style="font-family:宋体">存储用户的钱包密码（即用户创建</span>/<span style="font-family:宋体">导入钱包时设置的密码）、私钥、助记词、</span>Keystore<span style="font-family:宋体">；</span>
  </p>
  <p>
      B. <span style="font-family:宋体">找回用户的钱包密码、私钥、助记词、</span>Keystore<span style="font-family:宋体">；</span>
  </p>
  <p>
      C. <span style="font-family:宋体">冻结钱包；</span>
  </p>
  <p>
      D. <span style="font-family:宋体">挂失钱包；</span>
  </p>
  <p>
      E. <span style="font-family:宋体">恢复钱包；</span>
  </p>
  <p>
      F. <span style="font-family:宋体">交易回滚。</span>
  </p>
  <p>
      2) <span style="font-family:宋体">由于</span>DOLAIMI<span style="font-family:宋体">不提供上述服务，因此用户应当自行保管含有</span>DOLAIMI<span style="font-family:宋体">的移动设备、备份</span>DOLAIMI<span style="font-family:宋体">、备份钱包密码、助记词、私钥及</span>Keystore<span style="font-family:宋体">。如用户遗失移动设备、删除且未备份</span>DOLAIMI<span style="font-family:宋体">、删除且未备份钱包、钱包被盗或遗忘钱包密码、私钥、助记词、</span>Keystore<span style="font-family:宋体">，</span>DOLAIMI<span style="font-family:宋体">均无法还原钱包或找回钱包密码、私钥、助记词、</span>Keystore<span style="font-family:宋体">；如用户进行交易时误操作（例如输错转账地址），</span>DOLAIMI<span style="font-family:宋体">亦无法取消交易。</span>
  </p>
  <p>
      3) DOLAIMI<span style="font-family: 宋体">和</span>DOLAIMI<span style="font-family:宋体">所能够提供的数字代币管理服务并未包括所有已存在的数字代币，请勿通过</span>DOLAIMI<span style="font-family:宋体">操作任何</span>DOLAIMI<span style="font-family:宋体">不支持的数字代币。</span>
  </p>
  <p>
      4) DOLAIMI<span style="font-family: 宋体">仅是用户的数字代币管理工具，并非交易所或交易平台。虽然本协议将多次提及</span>“<span style="font-family:宋体">交易</span>”<span style="font-family:宋体">，其行为泛指用户使用。</span>DOLAIMI<span style="font-family:宋体">进行的转账和收款操作，这与交易所或交易平台上进行的</span>“<span style="font-family:宋体">交易</span>”<span style="font-family:宋体">有本质区别。</span>
  </p>
  <p>
      5) DOLAIMI<span style="font-family: 宋体">上集成的</span>DApp<span style="font-family:宋体">包括</span>DOLAIMI<span style="font-family:宋体">自主拥有的</span>DApp<span style="font-family:宋体">和第三方平台提供的</span>DApp<span style="font-family:宋体">。对于第三方平台提供的</span>DApp<span style="font-family:宋体">，</span>DOLAIMI<span style="font-family:宋体">仅为用户进入</span>DApp<span style="font-family:宋体">提供区块链浏览器。用户在第三方</span>DApp<span style="font-family:宋体">上接受服务或进行交易前应自行判断和评估该第三方</span>DApp<span style="font-family:宋体">提供的服务或交易是否存在风险。</span>
  </p>
  <p style="margin-bottom:20px">
      &nbsp;
  </p>
  <p>
      <span style="font-family:宋体">五、</span> <span style="font-family:宋体">您的权利义务</span>
  </p>
  <p>
      1) <span style="font-family:宋体">创建或导入钱包</span>
  </p>
  <p>
      A. <span style="font-family:宋体">创建或导入钱包：您有权在您的移动设备上通过</span>DOLAIMI<span style="font-family:宋体">创建和</span>/<span style="font-family:宋体">或导入钱包，有权设定钱包的钱包密码等信息，并有权通过</span>DOLAIMI<span style="font-family:宋体">应用程序，使用自己的钱包在区块链上进行转账和收款等交易。</span>
  </p>
  <p>
      B. <span style="font-family:宋体">身份验证：按照有关法律法规和政策要求，特定用户在使用</span>DOLAIMI<span style="font-family:宋体">提供的有关服务时，应当按照</span>DOLAIMI<span style="font-family:宋体">的提示及时完成相关身份验证，要求您提交包括但不限于您的姓名、身份证号码、手机号码、银行卡号信息等个人信息。否则该特定用户将无法使用有关服务，因特定用户拖延造成的损失由您自行承担。</span>
  </p>
  <p>
      C. DOLAIMI<span style="font-family: 宋体">可能为不同的终端设备开发不同的软件版本，您应当根据实际需要选择下载合适的版本进行安装。如果您从未经合法授权的第三方获取本软件或与本软件名称相同的安装程序，</span>DOLAIMI<span style="font-family:宋体">将无法保证该软件能否正常使用，也无法保证其安全性，因此造成的损失由您自行承担。</span>
  </p>
  <p>
      D. <span style="font-family:宋体">本软件新版本发布后，旧版软件可能无法使用。</span>DOLAIMI<span style="font-family:宋体">不保证旧版软件的安全性、继续可用性及提供相应的客户服务。请您随时核对并下载最新版本。</span>
  </p>
  <p>
      2) <span style="font-family:宋体">使用</span>
  </p>
  <p>
      A. <span style="font-family:宋体">用户应自行妥善保管移动设备、钱包密码、私钥、助记词、</span>Keystore<span style="font-family:宋体">等信息。</span>DOLAIMI<span style="font-family:宋体">不负责为用户保管以上信息。因您遗失移动设备、主动或被动泄露、遗忘钱包密码、私钥、助记词、</span>Keystore<span style="font-family:宋体">或遭受他人攻击、诈骗等所引起的一切风险、责任、损失、费用应由您自行承担。</span>
  </p>
  <p>
      B. <span style="font-family:宋体">遵循信息提示。您了解并同意遵循</span>DOLAIMI<span style="font-family:宋体">对您做出的信息提示，按照信息提示的内容进行操作，否则，由此引起的一切风险、责任、损失、费用等应由您自行承担。</span>
  </p>
  <p>
      C. <span style="font-family:宋体">您知悉并理解</span>DOLAIMI<span style="font-family:宋体">没有义务对链接的第三方</span>DApp<span style="font-family:宋体">服务或交易履行尽职调查义务，您应当理性做出投资决策并自主承担相应的投资风险。</span>
  </p>
  <p>
      D. <span style="font-family:宋体">积极完成身份验证。当</span>DOLAIMI<span style="font-family:宋体">合理认为您的交易行为或交易情况出现异常的，或认为您的身份信息存在疑点的，或</span>DOLAIMI<span style="font-family:宋体">认为应核对您身份证件或其他必要文件的情形时，请您积极配合</span>DOLAIMI<span style="font-family:宋体">核对您的有效身份证件或其他必要文件，及时完成相关的身份验证。</span>
  </p>
  <p>
      E. <span style="font-family:宋体">使用</span>DOLAIMI<span style="font-family:宋体">手机号码、邮箱注册方式（</span>TRX<span style="font-family:宋体">体系有效去中心解决方案），您可以选择导出私钥功能来获得私钥以更好的管理您的账户，您也知悉您可以将默认添加的多签</span>owner<span style="font-family:宋体">权限进行删除，并且了解并明白删除默认添加的多签</span>owner<span style="font-family:宋体">权限，</span>DOLAIMI<span style="font-family:宋体">将无法帮助您进行私钥恢复。</span>
  </p>
  <p>
      3) <span style="font-family:宋体">转账。</span>
  </p>
  <p>
      A. <span style="font-family:宋体">您知悉对于</span>DOLAIMI<span style="font-family:宋体">服务中您可使用的日计转账限额和笔数，可能因为您使用该转账服务时所处的国家</span>/<span style="font-family:宋体">地区、监管要求、转账目的、</span>DOLAIMI<span style="font-family:宋体">风险控制、身份验证等事由而不同。</span>
  </p>
  <p>
      B. <span style="font-family:宋体">您理解基于区块链操作的</span>“<span style="font-family:宋体">不可撤销</span>”<span style="font-family:宋体">属性，当您使用</span>DOLAIMI<span style="font-family:宋体">转账功能时，您应当自行承担因您操作失误而导致的后果（包括但不限于因您输错转账地址、您自身选择转账节点服务器的问题）。</span>
  </p>
  <p>
      C. <span style="font-family:宋体">您知悉在使用</span>DOLAIMI<span style="font-family:宋体">服务时，以下情况的出现可能导致转账</span>“<span style="font-family:宋体">交易失败</span>”<span style="font-family:宋体">或</span>“<span style="font-family:宋体">打包超时</span>”<span style="font-family:宋体">：</span>
  </p>
  <p>
      a) <span style="font-family:宋体">钱包余额不足；</span>
b) <span style="font-family:宋体">交易矿工费不足；</span>
c) <span style="font-family:宋体">区块链执行合约代码失败；</span>
d) <span style="font-family:宋体">超出监管部门、</span>DOLAIMI<span style="font-family:宋体">或法律法规规定的付款额度；</span>
e) <span style="font-family:宋体">网络、设备等技术故障；</span>
f) <span style="font-family:宋体">区块链网络拥堵、故障等原因引起交易被抛弃；</span>
g) <span style="font-family:宋体">您的地址或交易对方地址被识别为特殊地址</span>, <span style="font-family:宋体">如高风险地址、交易所地址、</span>ICO <span style="font-family:宋体">地址、</span>Token<span style="font-family:宋体">地址等。</span>
  </p>
  <p>
      D. <span style="font-family:宋体">您知悉</span>DOLAIMI<span style="font-family:宋体">仅向您提供转账工具，在您使用</span>DOLAIMI<span style="font-family:宋体">完成转账后，</span>DOLAIMI<span style="font-family:宋体">即完成了当次服务的所有义务，</span>DOLAIMI<span style="font-family:宋体">对其他纠纷争议，不负担任何义务。</span>
  </p>
  <p>
      E. <span style="font-family:宋体">合法合规。您知悉在</span>DOLAIMI<span style="font-family:宋体">进行操作时或利用</span>DOLAIMI<span style="font-family:宋体">上的</span>DApp<span style="font-family:宋体">进行交易时，您应当遵循有关法律法规、国家政策的要求。</span>
  </p>
  <p>
      F. <span style="font-family:宋体">公告通知。</span>DOLAIMI<span style="font-family:宋体">会以网站公告、电子邮件、发送短信、电话、消息中心信息、弹窗提示或客户端通知等方式向您发送通知，例如通知您交易进展情况，或者提示您进行相关操作，请您及时予以关注。</span>
  </p>
  <p>
      4) <span style="font-family:宋体">服务费用与纳税义务：</span>
  </p>
  <p>
      A. DOLAIMI<span style="font-family: 宋体">暂时不向您收取任何形式的服务费或手续费，将来需对某些服务进行收费时将另行约定或公布规则；</span>
  </p>
  <p>
      B. <span style="font-family:宋体">您使用</span>DOLAIMI<span style="font-family:宋体">进行转账时应支付矿工费，金额由您自行决定。矿工费由相关区块链系统收取；</span>
  </p>
  <p>
      C. <span style="font-family:宋体">您知悉在特定情况下，因为您所处的环境及网络状态不稳定，导致您的转账操作未完成时，亦会被相关区块链系统收取矿工费；</span>
  </p>
  <p>
      D. <span style="font-family:宋体">您因在</span>DOLAIMI<span style="font-family:宋体">进行交易而发生的所有应纳税负及其它方面的费用均由您负责支付。</span>
  </p>
  <p style="margin-bottom:20px">
      &nbsp;
  </p>
  <p>
      <strong><span style="text-decoration:underline;"><span style="font-family:宋体">六、</span> </span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">风险提示</span></span></strong>
  </p>
  <p>
      <strong><span style="text-decoration:underline;">1) </span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">您了解并知悉，由于数字代币领域的法律法规政策尚未健全，该领域的数字代币可能会产生无法兑现、技术不稳定等重大风险。且数字代币的价格波动幅度远高于其他金融资产。我们谨慎提醒您应当根据自身财务状况和风险偏好，理性选择持有或处置任何一种数字代币。</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">提供的行情查看功能仅系抓取部分交易所的数字代币汇率信息的搜索结果，并不表示为最新行情或最佳报价。</span></span></strong>
  </p>
  <p>
      <strong><span style="text-decoration:underline;">2) </span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">在使用</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">服务时，若您或您的相对方未遵从本协议或相关网站说明、交易、支付页面中之操作提示、规则，</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">并不保证交易会顺利完成，且</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">不承担损害赔偿责任。若发生前述情形，而款项已先行入账您的或您的交易方账号中。</span></span></strong>
  </p>
  <p>
      <strong><span style="text-decoration:underline;">3) DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">钱包或第三方钱包，您理解区块链操作具有的</span>“</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">不可逆</span>”</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">属性，以及相关交易具有</span>“</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">不可撤销</span>”</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">的特征，由您及您的相对方自行承担相应的风险后果。</span></span></strong>
  </p>
  <p>
      <strong><span style="text-decoration:underline;">4) </span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">在您使用</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">集成的第三方</span>DApp</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">服务或进行交易时，为了您的利益，</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">建议您仔细阅读本协议及</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">提示，了解交易对象及产品信息，谨慎评估风险后再采取行动。所有您在第三方</span>DApp</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">进行的交易行为系您的个人行为，有约束力的合同关系在您和您的相对方之间建立，与</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">无关。</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">对因您的交易行为所引起的一切风险、责任、损失、费用不承担任何责任。</span></span></strong>
  </p>
  <p>
      <strong><span style="text-decoration:underline;">5) </span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">您在交易过程中应当自行判断对方是否为完全民事行为能力人并自行决定是否与对方进行交易或转账给对方等，且您自行承担与此相关的所有风险。</span></span></strong>
  </p>
  <p>
      <strong><span style="text-decoration:underline;">6) </span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">在转账过程中，如果出现</span>“</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">交易失败</span>”</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">、</span>“</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">打包超时</span>”</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">等类似的异常信息提示时，您应通过相关区块链系统的官方途径或其他的区块链查询工具进行再次确认，以避免重复转账；否则，由此所引起的一切损失和费用应由您自行承担。</span></span></strong>
  </p>
  <p>
      <strong><span style="text-decoration:underline;">7) </span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">您理解当您在</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">上创建或导入钱包之后，您的</span>Keystore</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">、私钥、助记词等信息仅存储在当前的这台移动设备中，不存储在</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">或</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">的服务器上。您可以按照</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">提供的操作指南采取同步钱包等方式更换移动设备。但若您未保存或备份钱包密码、私钥、助记词、</span>Keystore</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">等信息且在您移动设备丢失的情况下，您的数字代币将因此丢失，</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">无法为您找回，您需自行承担相应损失。若您在导出、保存或备份钱包密码、私钥、助记词、</span>Keystore</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">等信息的时候泄密，或保存或备份上述信息的设备或服务器被黑客攻击或控制等情况下，您的数字代币将因此丢失，</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">无法为您找回，您需自行承担相应损失。</span></span></strong>
  </p>
  <p>
      <strong><span style="text-decoration:underline;">8) </span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">我们建议您在创建或导入钱包时对您钱包的钱包密码、私钥、助记词及</span>Keystore</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">等信息做好安全备份。我们提请您注意，请不要采用以下备份方式：截图、邮件、记事本、短信、等电子备份方式。我们建议您在纸质记事本上抄写助记词和</span>Keystore</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">等信息，同时您亦可将电子数据保管至密码管理器。</span></span></strong>
  </p>
  <p>
      <strong><span style="text-decoration:underline;">9) </span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">我们建议您在安全的网络环境中使用</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">，确保您的移动设备没有越狱或</span>Root</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">，</span> </span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">以避免可能存在的安全隐患。</span></span></strong>
  </p>
  <p>
      <strong><span style="text-decoration:underline;">10) </span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">您在使用我们的服务过程中，警惕非</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">官方的诈骗行为。一旦发现此类行为，我们鼓励您第一时间告知我们。</span></span></strong>
  </p>
  <p style="margin-bottom:20px">
      &nbsp;
  </p>
  <p>
      <span style="font-family:宋体">七、</span> <span style="font-family:宋体">服务的变更、中断、终止</span>
  </p>
  <p>
      1) <span style="font-family:宋体">您同意</span>DOLAIMI<span style="font-family:宋体">为保证自主业务经营权可以暂时提供部分服务功能，或于将来暂停部分服务功能或开通新的服务功能。当任何功能减少或者增加或者变化时，只要您仍然使用</span>DOLAIMI<span style="font-family:宋体">提供的服务，表示您仍然同意本协议或者本协议修正后的条款。</span>
  </p>
  <p>
      2) <span style="font-family:宋体">您理解存在如下情形时，</span>DOLAIMI<span style="font-family:宋体">将暂停提供服务：</span>
  </p>
  <p>
      A. <span style="font-family:宋体">因设备、区块链系统维修、升级、故障和通信中断等技术原因而中断业务；</span>
  </p>
  <p>
      B. <span style="font-family:宋体">因台风、地震、海啸、洪水、停电、战争或恐怖袭击等不可抗力因素，病毒、木马、黑客攻击、系统不稳定或政府行为等原因，造成</span>DOLAIMI<span style="font-family:宋体">系统不能提供服务或</span>DOLAIMI<span style="font-family:宋体">合理认为继续提供服务会有较大风险的；</span>
  </p>
  <p>
      C. <span style="font-family:宋体">发生</span>DOLAIMI<span style="font-family:宋体">无法控制或合理预见的其他情形。</span>
  </p>
  <p>
      D. <span style="font-family:宋体">当您出现如下情况时，</span>DOLAIMI<span style="font-family:宋体">可单方面中止或终止您使用</span>DOLAIMI<span style="font-family:宋体">的部分或全部功能</span>:
  </p>
  <p>
      1.<span style="font-family:宋体">用户死亡；</span>
2.<span style="font-family:宋体">盗用他人的钱包信息或移动设备；</span>
3.<span style="font-family:宋体">填写个人信息时提供虚假信息；</span>
4.<span style="font-family:宋体">拒绝</span>DOLAIMI<span style="font-family:宋体">为提升</span>DOLAIMI<span style="font-family:宋体">功能而发起的强制更新操作；</span>
5.<span style="font-family:宋体">将</span>DOLAIMI<span style="font-family:宋体">用于违法或犯罪活动；</span>
6.<span style="font-family:宋体">妨碍其他用户正常使用；</span>
7.<span style="font-family:宋体">伪称</span>DOLAIMI<span style="font-family:宋体">的工作人员或管理人员；</span>
8.<span style="font-family:宋体">攻击、侵入、更改或以任何其他方式威胁</span>DOLAIMI<span style="font-family:宋体">计算机系统的正常运作；</span>
9.<span style="font-family:宋体">利用</span>DOLAIMI<span style="font-family:宋体">宣传垃圾广告；</span>
10.<span style="font-family:宋体">散布谣言，损害</span>DOLAIMI<span style="font-family:宋体">和</span>DOLAIMI<span style="font-family:宋体">商誉；</span>
11.<span style="font-family:宋体">违法行为，其他违反本协议的行为，及</span>DOLAIMI<span style="font-family:宋体">合理认为应当暂停功能的情形。</span>
  </p>
  <p>
      3) <span style="font-family:宋体">当您与</span>DOLAIMI<span style="font-family:宋体">之间的服务关系变更、中断、终止时，您仍有权在合理时间内导出您钱包等信息。</span>
  </p>
  <p style="margin-bottom:20px">
      &nbsp;
  </p>
  <p>
      <span style="font-family:宋体">八、</span> <span style="font-family:宋体">您合法使用</span>DOLAIMI<span style="font-family:宋体">服务的承诺</span>
  </p>
  <p>
      1) <span style="font-family:宋体">您应遵守所在国相关法律法规及您所居住的国家或地区的法律法规，不得将</span>DOLAIMI<span style="font-family:宋体">用于任何非法目的，也不得以任何非法方式使用</span>DOLAIMI<span style="font-family:宋体">服务。</span>
  </p>
  <p>
      2) <span style="font-family:宋体">您不得利用</span>DOLAIMI<span style="font-family:宋体">从事违法或犯罪的行为，包括但不限于：</span>
  </p>
  <p>
      3) <span style="font-family:宋体">从事任何违法犯罪行为，包括但不限于洗钱、非法集资等；</span>
  </p>
  <p>
      4) <span style="font-family:宋体">通过使用任何自动化程序、软件、引擎、网络爬虫、网页分析工具、数据挖掘工具或类似工具，接入</span>DOLAIMI<span style="font-family:宋体">服务、收集或处理</span>DOLAIMI<span style="font-family:宋体">所提供的内容，干预或试图干预任何用户或任何其他方式接入</span>DOLAIMI<span style="font-family:宋体">服务的行为；</span>
  </p>
  <p>
      5) <span style="font-family:宋体">提供赌博资讯或以任何方式引诱他人参与赌博；</span>
  </p>
  <p>
      6) <span style="font-family:宋体">侵入他人</span>DOLAIMI<span style="font-family:宋体">钱包盗取数字代币；</span>
  </p>
  <p>
      7) <span style="font-family:宋体">进行与交易对方宣称的交易内容不符的交易，或不真实的交易；</span>
  </p>
  <p>
      8) <span style="font-family:宋体">从事任何侵害或可能侵害</span>DOLAIMI<span style="font-family:宋体">服务系统、数据之行为；</span>
  </p>
  <p>
      9) <span style="font-family:宋体">其他违法以及</span>DOLAIMI<span style="font-family:宋体">有正当理由认为不适当的行为。</span>
  </p>
  <p>
      10) <span style="font-family:宋体">您理解并同意，如因您违反有关法律（包括但不限于海关及税务方面的监管规定）或者本协议之规定，使</span>DOLAIMI<span style="font-family:宋体">遭受任何损失、受到任何第三方的索赔或任何行政管理部门的处罚，您应对</span>DOLAIMI<span style="font-family:宋体">进行赔偿，包括合理的律师费用。</span>
  </p>
  <p>
      11) <span style="font-family:宋体">您承诺按时缴纳</span>DOLAIMI<span style="font-family:宋体">的服务费用（如有），否则</span>DOLAIMI<span style="font-family:宋体">有权暂停或中止对您提供的服务。</span>
  </p>
  <p style="margin-bottom:20px">
      &nbsp;
  </p>
  <p>
      <span style="font-family:宋体">九、</span> <span style="font-family:宋体">隐私条款</span>
  </p>
  <p>
      DOLAIMI<span style="font-family: 宋体">十分重视对用户隐私的保护，相关隐私保护政策请参考</span>DOLAIMI<span style="font-family:宋体">公布并不时更新的《</span>DOLAIMI<span style="font-family:宋体">隐私政策》。</span>

  </p>
  <p style="margin-bottom:20px">
      &nbsp;
  </p>
  <p>
      <strong><span style="text-decoration:underline;"><span style="font-family:宋体">十、</span> </span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">免责及责任限制</span></span></strong>
  </p>
  <p>
      <strong><span style="text-decoration:underline;">1) DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">仅对本协议中所列明的义务承担责任。</span></span></strong>
  </p>
  <p>
      <strong><span style="text-decoration:underline;">2) </span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">您理解和同意，在法律所允许的范围内，</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">只能按照现有的技术水平和条件提供服务。因下列原因导致</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">无法正常提供服务，</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">不承担责任：</span></span></strong>
  </p>
  <p>
      <strong><span style="text-decoration:underline;">A. DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">系统停机维护或升级；</span></span></strong>
  </p>
  <p>
      <strong><span style="text-decoration:underline;">B. </span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">因台风、地震、洪水、雷电或恐怖袭击等不可抗力原因；</span></span></strong>
  </p>
  <p>
      <strong><span style="text-decoration:underline;">C. </span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">您的移动设备软硬件和通信线路、供电线路出现故障的；</span></span></strong>
  </p>
  <p>
      <strong><span style="text-decoration:underline;">D. </span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">您操作不当或未通过</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">授权或认可的方式使用</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">服务的；</span></span></strong>
  </p>
  <p>
      <strong><span style="text-decoration:underline;">E. </span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">因病毒、木马、恶意程序攻击、网络拥堵、系统不稳定、系统或设备故障、通讯故障、电力故障、银行等原因或政府行为等原因；</span></span></strong>
  </p>
  <p>
      <strong><span style="text-decoration:underline;">F. </span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">非因</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">的原因而引起的任何其它原因。</span></span></strong>
  </p>
  <p>
      <strong><span style="text-decoration:underline;">3) DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">对以下情形不承担责任：</span></span></strong>
  </p>
  <p>
      <strong><span style="text-decoration:underline;">A. </span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">因用户遗失移动设备、删除且未备份</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">、删除且未备份钱包、钱包被盗或遗忘钱包密码、私钥、助记词、</span>Keystore</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">而导致的数字代币丢失。</span></span></strong>
  </p>
  <p>
      <strong><span style="text-decoration:underline;">B. </span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">因用户自行泄露钱包密码、私钥、助记词、</span>Keystore</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">，或借用、转让或授权他人使用自己的移动设备或</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">钱包，或未通过</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">官方渠道下载</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">应用程序或其他不安全的方式使用</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">应用程序导致的数字代币丢失；</span></span></strong>
  </p>
  <p>
      <strong><span style="text-decoration:underline;">C. </span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">因用户误操作（包括但不限于您输错转账地址、您自身选择转账节点服务器的问题）导致的数字代币丢失；</span></span></strong>
  </p>
  <p>
      <strong><span style="text-decoration:underline;">D. </span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">因用户不理解区块链技术的性质而进行误操作导致的数字代币丢失；</span></span></strong>
  </p>
  <p>
      <strong><span style="text-decoration:underline;">E. </span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">因时间滞后、区块链系统不稳定等原因导致</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">拷贝用户在区块链上的交易记录发生偏差；</span></span></strong>
  </p>
  <p>
      <strong><span style="text-decoration:underline;">4) DOLAIMI </span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">助记词、手机号码、邮箱注册方式（</span>TRX</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">体系有效去中心解决方案）下，用户是可选导出私钥的，因为用户更改</span>Owner</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">和</span>Active</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">权限后导致的私钥丢失或被盗造成的财产损失均与</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">无关。</span></span></strong>
  </p>
  <p>
      <strong><span style="text-decoration:underline;">5) DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">助记词、手机号码、邮箱注册方式（</span>TRX</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">体系有效去中心解决方案）默认情况下，由于用户的原因导致无法通过手机号码找回的（无法补办手机卡等情况），不能提供私钥找回服务。</span></span></strong>
  </p>
  <p>
      <strong><span style="text-decoration:underline;">6) </span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">由于用户个人原因（包括但不限于助记词、手机号码、邮箱丢失，验证码泄露，个人公开私钥，用户个人信息被黑客入侵）及不可抗拒因素导致的资产丢失，均与</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">无关。</span></span></strong>
  </p>
  <p>
      <strong><span style="text-decoration:underline;">7) </span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">用户在第三方</span>DApp</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">上操作产生的风险和后果。您理解</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">仅作为您数字代币管理的工具。</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">不能控制第三方</span>DApp</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">提供的产品及服务的质量、安全或合法性，信息的真实性或准确性，以及相对方履行其在与您签订的协议项下的各项义务的能力。所有您在第三方</span>DApp</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">进行的交易行为系您的个人行为，有约束力的合同关系在您和您的相对方之间建立，与</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">无关。</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">提醒您应该通过自己的谨慎判断确定登录</span>DApp</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">及相关信息的真实性、合法性和有效性。您与任何第三方交易所产生的风险亦应由您自行承担。</span></span></strong>
  </p>
  <p>
      <strong><span style="text-decoration:underline;">DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">可能同时为您及您的交易对手方提供服务，您同意对</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">可能存在的该等行为予以明确豁免任何实际或潜在的利益冲突，并不得以此来主张</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">在提供服务时存在法律上的瑕疵，也不因此而加重</span>DOLAIMI</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">的责任或注意义务。</span></span></strong>
  </p>
  <p style="margin-bottom:20px">
      &nbsp;
  </p>
  <p>
      <span style="font-family:宋体">十一、</span> DOLAIMI<span style="font-family:宋体">不提供以下形式的保证：</span>
  </p>
  <p>
      1) DOLAIMI<span style="font-family: 宋体">服务将符合您的全部需求；</span>
  </p>
  <p>
      2) <span style="font-family:宋体">您经由</span>DOLAIMI<span style="font-family:宋体">服务取得的任何技术、产品、服务、资讯将符合您的期望；</span>
  </p>
  <p>
      3) DOLAIMI<span style="font-family: 宋体">从第三方交易所抓取的数字代币市场交易行情等信息的及时性、准确性、完整性、可靠性做出保证；</span>
  </p>
  <p>
      4) <span style="font-family:宋体">您在</span>DOLAIMI<span style="font-family:宋体">上的交易各方会及时履行其在与您达成的交易协议中各项义务。</span>
  </p>
  <p>
      5) <span style="font-family:宋体">在任何情况下，</span>DOLAIMI<span style="font-family:宋体">对本协议所承担的违约赔偿责任总额不超过</span>1<span style="font-family:宋体">）</span>0.1<span style="font-family:宋体">个以太币；或</span>2<span style="font-family:宋体">）人民币</span>500<span style="font-family:宋体">元，以较高的为准。</span>
  </p>
  <p>
      6) <span style="font-family:宋体">您理解</span>DOLAIMI<span style="font-family:宋体">仅作为用户管理数字代币、显示交易信息的工具，</span>DOLAIMI<span style="font-family:宋体">不提供法律、税务或投资建议等服务。您应当自行向法律、税务、投资方面的专业人士寻求建议，且您在使用我们服务过程中所遭受的投资损失、数据损失等，</span>DOLAIMI<span style="font-family:宋体">概不负责。</span>
  </p>
  <p>
      7) <span style="font-family:宋体">您理解根据有关政策法规的要求，我们可能不时更改我们的用户准入标准，限定向某一特定群体提供服务的范围和方式等。</span>
  </p>
  <p style="margin-bottom:20px">
      &nbsp;
  </p>
  <p>
      <span style="font-family:宋体">十二、</span> <span style="font-family:宋体">完整协议</span>
  </p>
  <p>
      1) <span style="font-family:宋体">本协议由《</span>DOLAIMI<span style="font-family:宋体">服务协议》、《</span>DOLAIMI<span style="font-family:宋体">隐私政策》及</span>DOLAIMI<span style="font-family:宋体">不时公布的各项规则（包括</span>“<span style="font-family:宋体">帮助中心</span>”<span style="font-family:宋体">的内容）组成。</span>
  </p>
  <p>
      2) <span style="font-family:宋体">本协议部分内容被有管辖权的法院认定为违反或无效的，不因此影响其他内容的效力。</span>
  </p>
  <p>
      3) <span style="font-family:宋体">本协议的任何译文版本仅为方便用户而提供，无意对本协议的条款进行修改。如果本协议的中文版本与非中文版本之间存在冲突，应以中文版本为准。</span>
  </p>
  <p style="margin-bottom:20px">
      &nbsp;
  </p>
  <p>
      <span style="font-family:宋体">十三、</span> <span style="font-family:宋体">知识产权保护</span>
  </p>
  <p>
      DOLAIMI<span style="font-family: 宋体">系</span>DOLAIMI<span style="font-family:宋体">开发并拥有知识产权的应用程序。</span> DOLAIMI<span style="font-family:宋体">中显示的任何内容（包括本协议、公告、文章、视频、音频、图片、档案、资讯、资料、商标或标识）的知识产权归</span>DOLAIMI<span style="font-family:宋体">或第三方权利人所有。用户仅可为持有和管理数字代币之目的使用</span>DOLAIMI<span style="font-family:宋体">应用程序及其中的内容。未经</span>DOLAIMI<span style="font-family:宋体">或第三方权利人的事先书面同意，任何人不得擅自使用、修改、反向编译、复制、公开传播、改变、散布、发行或公开发表上述应用程序及内容。</span>
  </p>
  <p style="margin-bottom:20px">
      &nbsp;
  </p>
  <p>
      <span style="font-family:宋体">十四、</span> <span style="font-family:宋体">法律适用与争议解决</span>
  </p>
  <p>
      1) <span style="font-family:宋体">本协议及其修订版之效力、解释、变更、执行与争议解决均适用美国法律，如无相关法律规定，则应当适用国际商业惯例和（或）行业惯例。</span>
  </p>
  <p>
      2) <span style="font-family:宋体">若您和</span>DOLAIMI<span style="font-family:宋体">之间发生任何纠纷或争议，首先应友好协商解决，协商不成的，任何一方可提交</span>DOLAIMI<span style="font-family:宋体">所在地有管辖权的法院管辖。</span>
  </p>
  <p style="margin-bottom:20px">
      &nbsp;
  </p>
  <p>
      <span style="font-family:宋体">十五、</span> <span style="font-family:宋体">其他</span>
  </p>
  <p>
      3) <span style="font-family:宋体">如您是美国以外用户，您需全面了解并遵守您所在司法辖区与使用</span>DOLAIMI<span style="font-family:宋体">服务所有相关法律、法规及规则。</span>
  </p>
  <p>
      4) <span style="font-family:宋体">您在使用</span>DOLAIMI<span style="font-family:宋体">服务过程中，如遇到任何问题，您可以通过在</span>DOLAIMI<span style="font-family:宋体">提交反馈等方式联系我们。</span>
  </p>
  <p style="margin-bottom:20px">
      5) <span style="font-family:宋体">您可以在</span>DOLAIMI<span style="font-family:宋体">中查看本协议。</span> DOLAIMI<span style="font-family:宋体">鼓励您在每次访问</span>DOLAIMI<span style="font-family:宋体">时都查阅</span>DOLAIMI<span style="font-family:宋体">的服务协议。</span>
  </p>
  <p>
      <span style="font-family:宋体">本协议自</span>2021<span style="font-family:宋体">年</span>4<span style="font-family:宋体">月</span>15<span style="font-family:宋体">日起适用。</span>
  </p>
  <p>
      <span style="font-family:宋体">本协议未尽事宜，您需遵守</span>DOLAIMI<span style="font-family:宋体">不时更新的公告及相关规则。</span>
  </p>
  <p style="text-align:right">
      Chain Fans Science And Technology. Ltd
  </p>
  <p style="text-align:right">
      <span style="font-family: 宋体">公司注册号：</span>#20211109930
  </p>
  <p>
      <br/>
  </p></div>`;

//隐私政策HTML
export const privacyPolicy = `<div style="font-size:14px"><p>
    DOLAIMI<span style="font-family: 宋体">隐私政策</span>
</p>
<p>
    <span style="font-family:宋体">最近更新于：</span>2021<span style="font-family:宋体">年</span>04<span style="font-family:宋体">月</span>15<span style="font-family:宋体">日</span>
</p>
<p style="margin-bottom:20px">
    &nbsp;
</p>
<p>
    <span style="font-family:宋体">尊敬的用户：</span>
</p>
<p style="margin-bottom:16px">
    &nbsp;
</p>
<p>
    DOLAIMI<span style="font-family: 宋体">多链社交应用终端由美国（</span>Chain Fans Science And Technology. Ltd <span style="font-family:宋体">公司注册号：</span>#20211109930<span style="font-family:宋体">，美国加密货币业务政府备案号：</span>#31000182616218<span style="font-family:宋体">）成立的多链研究室推出（以下简称</span>“<span style="font-family:宋体">本公司</span>”<span style="font-family:宋体">或</span>“<span style="font-family:宋体">我们</span>”<span style="font-family:宋体">）尊重并保护用户（以下简称</span>“<span style="font-family:宋体">您</span>”<span style="font-family:宋体">或</span>“<span style="font-family:宋体">用户</span>”<span style="font-family:宋体">）的隐私，当您进行以下行为时，本公司按照本隐私政策（以下简称</span>“<span style="font-family:宋体">本政策</span>”<span style="font-family:宋体">）收集、披露和处理您的个人信息：</span>
</p>
<p style="margin-bottom:20px">
    &nbsp;
</p>
<p>
    (a)<span style="font-family:宋体">进入或使用我们的网站或移动应用（</span>“<span style="font-family:宋体">应用</span>”<span style="font-family:宋体">）及服务；和</span>/<span style="font-family:宋体">或</span>
</p>
<p>
    (b)<span style="font-family:宋体">向我们提供您的个人信息，无论通过何种媒介提供。</span>
</p>
<p>
    <span style="font-family:宋体">本公司建议您在使用应用之前仔细阅读并理解本政策全部内容</span>, <span style="font-family:宋体">针对免责声明等条款在内的重要信息将以<strong>加粗</strong>的形式体现。本政策有关关键词定义与本公司《</span>DOLAIMI<span style="font-family:宋体">服务协议》保持一致。如果本政策中使用的定义或术语与《</span>DOLAIMI<span style="font-family:宋体">服务协议》中的不一致，以本政策为准。</span>
</p>
<p>
    <span style="font-family:宋体">您向我们提供您的个人信息，即代表您同意我们根据本政策的规定收集、使用、披露（包括传输）和处理您的个人信息。如您不接受本政策，请勿</span> <span style="font-family:宋体">向我们提供任何个人信息。</span>
</p>
<p>
    <span style="font-family:宋体">本政策可由本公司在线随时更新，不另行通知。更新后的政策一经公布在我们的应用上即为生效，并代替原来的政策。修改后的政策将立刻适用于您向我们提供的个人信息。如果您不接受修改后的条款，请立即停止使用应用，您继续使用应用将被视为接受修改后的政策。</span>
</p>
<p style="margin-bottom:20px">
    &nbsp;
</p>
<p>
    <span style="font-family:宋体">一、我们收集您的哪些信息</span>
</p>
<p>
    1.<span style="font-family:宋体">我们将收集您的移动设备信息、操作记录、交易记录、钱包地址等个人信息。</span>
</p>
<p>
    2.<span style="font-family:宋体">为满足您的特定服务需求，我们将收集您的个人信息，包括但不限于您的姓名、银行卡号、手机号码、邮件地址等信息。</span>
</p>
<p>
    3.<span style="font-family:宋体">您知悉：您在应用上的钱包密码、私钥、助记词、</span>Keystore<span style="font-family:宋体">并不存储或同步至本公司服务器。本公司不提供找回您的钱包密码、私钥、助记词、</span>Keystore<span style="font-family:宋体">的服务。</span>
</p>
<p>
    4.<span style="font-family:宋体">我们可能要求向您收集更多的个人信息，以使得您可以使用应用上的某些特定功能。如您不同意提供该等个人信息，则视为您放弃使用应用的特定功能。</span>
</p>
<p>
    5.<span style="font-family:宋体">在法律法规允许的范围内，本公司可能会在以下情形中收集并使用您的个人信息，且无需征得您的授权同意：</span>
</p>
<p>
    <span style="font-family:宋体">（</span>1<span style="font-family:宋体">）与国家安全、国防安全有关的；</span>
</p>
<p>
    <span style="font-family:宋体">（</span>2<span style="font-family:宋体">）与公共安全、公共卫生、重大公共利益有关的；</span>
</p>
<p>
    <span style="font-family:宋体">（</span>3<span style="font-family:宋体">）与犯罪侦查、起诉、审判和判决执行等有关的；</span>
</p>
<p>
    <span style="font-family:宋体">（</span>4<span style="font-family:宋体">）所收集的个人信息处于公共领域；</span>
</p>
<p>
    <span style="font-family:宋体">（</span>5<span style="font-family:宋体">）从合法公开披露的信息中收集您的个人信息，如合法的新闻报道，政府信息公开等渠道；</span>
</p>
<p>
    <span style="font-family:宋体">（</span>6<span style="font-family:宋体">）用于维护服务的安全和合规所必需的，例如发现、处理产品和服务的故障；</span>
</p>
<p>
    <span style="font-family:宋体">（</span>7<span style="font-family:宋体">）法律法规允许的其他情形。</span>
</p>
<p>
    6.<span style="font-family:宋体">我们收集信息的方式如下：</span>
</p>
<p>
    <span style="font-family:宋体">（</span>1<span style="font-family:宋体">）当您主动向我们提供信息，无论以何种理由；</span>
</p>
<p>
    <span style="font-family:宋体">（</span>2<span style="font-family:宋体">）当您授权我们向第三方获取您的信息；</span>
</p>
<p>
    <span style="font-family:宋体">（</span>3<span style="font-family:宋体">）您使用我们的应用和服务；</span>
</p>
<p>
    <span style="font-family:宋体">（</span>4<span style="font-family:宋体">）当您通过各种交流渠道与我们的员工联系或互动，例如通过社交平台、通讯平台、当面会议、电话、邮件、传真和书信等；</span>
</p>
<p>
    <span style="font-family:宋体">（</span>5<span style="font-family:宋体">）当您与我们发生交易、与我们联系或要求我们联系您；</span>
</p>
<p>
    <span style="font-family:宋体">（</span>6<span style="font-family:宋体">）当您要求订阅我们的邮件；和</span>/<span style="font-family:宋体">或</span>
</p>
<p>
    <span style="font-family:宋体">（</span>7<span style="font-family:宋体">）我们通过区块链系统，拷贝您全部或部分的交易记录。但您的交易记录应当以区块链系统的记载为准。</span>
</p>
<p>
    7.<span style="font-family:宋体">我们的应用可能包含一些收集个人信息的技术，具体的收集方式将在本政策（见下文第五条）或适用的条款和条件中说明。</span>
</p>
<p>
    8.<span style="font-family:宋体">您向我们提供个人信息系您的主动行为，您可以随时撤回同意。但是，如您选择拒绝向我们提供我们要求的个人信息，您可能无法使用应用，我们可能无法与您联系或向您提供您需要的产品或服务。</span>
</p>
<p>
    9.<span style="font-family:宋体">在某些情况下，您可能向我们提供非您本人的个人信息。如您提供他人信息，您应当保证您已获得该等信息主体的同意，允许我们收集该信息主体的个人信息，并且信息主体同意您向我们披露其个人信息。您同意，如该等信息主体就我们根据本政策条款收集、使用和披露其个人信息向我们提出索赔，您将向我们进行赔偿并使我们免责。</span>
</p>
<p>
    10.<span style="font-family:宋体">您应确保您向我们提供的个人信息真实、准确和完整。在您的个人信息发生变化时，您应当通知我们。</span>
</p>
<p style="margin-bottom:20px">
    &nbsp;
</p>
<p>
    <span style="font-family:宋体">二、我们如何使用您的信息</span>
</p>
<p>
    1.<span style="font-family:宋体">我们将出于以下一个或多个目的收集、使用或披露您的个人信息：</span>
</p>
<p>
    <span style="font-family:宋体">（</span>1<span style="font-family:宋体">）向您提供您要求的产品和</span>/<span style="font-family:宋体">或服务；</span>
</p>
<p>
    <span style="font-family:宋体">（</span>2<span style="font-family:宋体">）处理您与我们的关系；</span>
</p>
<p>
    <span style="font-family:宋体">（</span>3<span style="font-family:宋体">）促进您的使用体验；</span>
</p>
<p>
    <span style="font-family:宋体">（</span>4<span style="font-family:宋体">）通过您移动设备的唯一序列号，确认您与您的钱包的对应关系；</span>
</p>
<p>
    <span style="font-family:宋体">（</span>5<span style="font-family:宋体">）向您及时发送重要通知，如软件更新、服务协议及本政策条款的变更；</span>
</p>
<p>
    <span style="font-family:宋体">（</span>6<span style="font-family:宋体">）通过钱包地址和提供的移动设备信息，协助您处理您的提问、反馈、投诉和要求；</span>
</p>
<p>
    <span style="font-family:宋体">（</span>7<span style="font-family:宋体">）告知您我们的产品、服务、项目和活动；</span>
</p>
<p>
    <span style="font-family:宋体">（</span>8<span style="font-family:宋体">）解决争议、调查任何投诉、索赔或争议、或任何实际或可以的非法行为；</span>
</p>
<p>
    <span style="font-family:宋体">（</span>9<span style="font-family:宋体">）进行本公司内部审计、数据分析和研究；</span>
</p>
<p>
    <span style="font-family:宋体">（</span>10<span style="font-family:宋体">）通过跟踪用户对应用的使用情况进行用户行为分析；</span>
</p>
<p>
    <span style="font-family:宋体">（</span>11<span style="font-family:宋体">）遵守法律法规规定及与监管机构的要求；</span>
</p>
<p>
    <span style="font-family:宋体">（</span>12<span style="font-family:宋体">）遵守国际法律法规对于安全以及反洗钱或反恐的要求；</span>
</p>
<p>
    <span style="font-family:宋体">（</span>13<span style="font-family:宋体">）履行我们的义务以及合同条款条件；和</span>/<span style="font-family:宋体">或</span>
</p>
<p>
    <span style="font-family:宋体">（</span>14<span style="font-family:宋体">）任何与前述目的有关的合理目的。</span>
</p>
<p>
    2.<span style="font-family:宋体">如您同意，我们将为其他目的不时使用您的个人信息，例如告知您我们的战略合作伙伴或关联方推出的最新的活动、优惠和推广信息。</span>
</p>
<p>
    3.<span style="font-family:宋体">我们在</span>DOLAIMI<span style="font-family:宋体">的</span>“<span style="font-family:宋体">使用设置</span>”<span style="font-family:宋体">中为您提供</span>“<span style="font-family:宋体">指纹或面容登录</span>”<span style="font-family:宋体">选项，让您便捷地管理您的数字代币。</span>
</p>
<p>
    4.<span style="font-family:宋体">我们在</span>DOLAIMI<span style="font-family:宋体">中为您提供</span>“<span style="font-family:宋体">免密支付</span>”<span style="font-family:宋体">选项，免密支付将您钱包密码通过安全加密算法存储至至您手机设备的</span>Keychain/Keystore<span style="font-family:宋体">中，交易时调用您的生物识别（指纹或面容）鉴权，快速完成支付与签名。</span>
</p>
<p style="margin-bottom:20px">
    &nbsp;
</p>
<p>
    <span style="font-family:宋体">三、您如何控制自己的信息</span>
</p>
<p>
    <span style="font-family:宋体">您在应用中拥有以下对您个人信息自主控制权：</span>
</p>
<p style="margin-bottom:20px">
    &nbsp;
</p>
<p>
    1.<span style="font-family:宋体">您可以通过同步钱包的方式，将您的其他钱包导入应用中，或者将您在应用的钱包导入到其他数字代币管理钱包中。应用将向您显示导入钱包的信息。</span>
</p>
<p>
    2.<span style="font-family:宋体">您知悉您可以通过</span>“<span style="font-family:宋体">资产</span>”<span style="font-family:宋体">版块内容修改您的数字代币种类、进行转账及收款等活动。</span>
</p>
<p>
    3.<span style="font-family:宋体">您知悉在应用</span>“<span style="font-family:宋体">我</span>”<span style="font-family:宋体">的版块您可以自由选择进行如下操作：</span>
</p>
<p>
    <span style="font-family:宋体">（</span>1<span style="font-family:宋体">）在</span>“<span style="font-family:宋体">使用设置</span>”<span style="font-family:宋体">中，您可以选择不开启</span>“<span style="font-family:宋体">指纹或面容登录</span>”<span style="font-family:宋体">选项，即您可以选择不使用</span>Touch ID<span style="font-family:宋体">或</span>Face ID<span style="font-family:宋体">验证服务；</span>
</p>
<p>
    <span style="font-family:宋体">（</span>2<span style="font-family:宋体">）在</span>“<span style="font-family:宋体">提交反馈</span>”<span style="font-family:宋体">中，您可以随时向我们提出您对应用问题及改进建议，我们将非常乐意与您沟通并积极改进我们的服务。</span>
</p>
<p>
    4.<span style="font-family:宋体">您知悉您可以选择不开启</span>“<span style="font-family:宋体">免密支付</span>”<span style="font-family:宋体">选项，即您可以选择不在交易时调用您的生物识别（指纹或面容）鉴权。</span>
</p>
<p>
    5.<span style="font-family:宋体">您知悉，您及我们对于您交易记录是否公开并没有控制权，因为基于区块链交易系统的开源属性，您的交易记录在整个区块链系统中公开透明。</span>
</p>
<p>
    6.<span style="font-family:宋体">我们的应用将包含链接，可链接至非由我们所有、运营、开发或维护的其他网站、应用或智能合约。这些链接系为您方便而提供。本政策仅适用于我们的应用。当您使用第三方服务时，您知悉，我们的《</span>DOLAIMI<span style="font-family:宋体">服务协议》、《</span>DOLAIMI<span style="font-family:宋体">隐私政策》将不再适用。我们建议您详细阅读并了解其隐私规则和有关用户服务协议等内容。</span>
</p>
<p>
    7.<span style="font-family:宋体">您有权要求我们更新、更改、删除您的个人信息和</span>/<span style="font-family:宋体">或撤回您给予我们的同意。如果您希望撤回您曾给予我们的同意，或如您希望更新、更改、删除或访问我们持有的个人信息，或您不接受我们对于本政策的修改，您可以联系我们：邮件地址：</span><a href="mailto:service@dllaimi.org">service@dllaimi.org</a>
</p>
<p>
    8.<span style="font-family:宋体">为使您管理由我们持有的个人信息，或使您获得有关我们在您提出该等请求前一年内的时间使用（或可能使用）您的个人信息的方式，我们可能向您收取一定的费用。如果我们向您收费，我们将提前告知您收费金额，并在您付费之后满足您的请求。我们将尽力在您提出请求后的三十（</span>30<span style="font-family:宋体">）日内答复您。如果我们无法在三十（</span>30<span style="font-family:宋体">）日内答复，我们将告知您具体的答复时间。</span>
</p>
<p>
    9.<span style="font-family:宋体">在许多情况下，我们需要获得您的个人信息，以使得我们可以向您提供您要求的产品或服务。如您选择拒绝向我们提供我们要求的个人信息或撤回曾给予我们的同意，我们可能无法继续向您提供您要求的产品和服务。</span>
</p>
<p style="margin-bottom:20px">
    &nbsp;
</p>
<p>
    <span style="font-family:宋体">四、我们可能分享或传输您的信息</span>
</p>
<p>
    1.<span style="font-family:宋体">我们将为业务和法律的目的存储您的个人信息。</span>
</p>
<p>
    2.<span style="font-family:宋体">未经过您的同意，我们不会向第三方出售、交易或转让您的个人信息。</span>
</p>
<p>
    3.<span style="font-family:宋体">如果您同意我们向战略合作方或关联方披露您的个人信息，我们可能将您的个人信息披露给该等实体。该等实体将仅为您已同意的目的使用您的个人信息。</span>
</p>
<p>
    4.<span style="font-family:宋体">您同意，我们可能向以下第三方披露或共享您的个人信息：</span>
</p>
<p>
    <span style="font-family:宋体">（</span>1<span style="font-family:宋体">）代表我们并向我们提供服务的服务提供商和数据处理方，例如为我们进行</span>KYC<span style="font-family:宋体">检查、会计、数据处理或管理服务、网站托管、维护及运营服务、邮件信息服务、分析服务、支付交易处理、市场营销等；</span>
</p>
<p>
    <span style="font-family:宋体">（</span>2<span style="font-family:宋体">）我们的咨询师和专业顾问（例如会计师、律师、审计师）。</span>
</p>
<p>
    5.<span style="font-family:宋体">如果为了上述的目的，我们需要将您的个人信息传输至任何其他国家，我们将获得您的同意，并且确保个人信息的接收方具备和我们同等级的个人信息保护措施。如果该等国家或地区尚无可适用于我们与您之间关系的个人信息保护法律，我们将与个人信息接收方签订可合法执行的协议。</span>
</p>
<p>
    6.<span style="font-family:宋体">未经您事先同意，本公司不会将您的个人信息向任何第三方共享或转让，但以下情况除外：</span>
</p>
<p>
    <span style="font-family:宋体">（</span>1<span style="font-family:宋体">）所收集的个人信息是您自行向社会公众公开的；</span>
</p>
<p>
    <span style="font-family:宋体">（</span>2<span style="font-family:宋体">）所收集的个人信息系从合法公开披露的信息中收集，如合法的新闻报道，政府信息公开等渠道；</span>
</p>
<p>
    <span style="font-family:宋体">（</span>3<span style="font-family:宋体">）根据适用的法律法规、法律程序的要求、行政机关或司法机关的要求进行提供或执行本政策以保护我们或其他方的权利、财产或安全；</span>
</p>
<p>
    <span style="font-family:宋体">（</span>4<span style="font-family:宋体">）在涉及合并、收购时，如涉及到个人信息转让，本公司将要求个人信息接收方继续接受本政策的约束。</span>
</p>
<p style="margin-bottom:20px">
    &nbsp;
</p>
<p>
    <span style="font-family:宋体">五、自动数据收集技术</span>
</p>
<p>
    1.<span style="font-family:宋体">我们在应用中使用自动数据收集技术。例如：</span>
</p>
<p>
    <span style="font-family:宋体">（</span>1<span style="font-family:宋体">）</span>Cookies<span style="font-family:宋体">（或浏览器</span>cookies<span style="font-family:宋体">）。</span>Cookies<span style="font-family:宋体">是网站或应用运营方设置的小型文本文件，以识别您的浏览器或设备。我们可能在我们的应用上使用</span>cookies<span style="font-family:宋体">技术存储并跟踪信息，例如用户数量及使用频率、用户分布以及用户的线上偏好。</span>cookies<span style="font-family:宋体">不抓取能够识别您身份的信息，但其收集的信息可协助我们对应用的使用情况进行分析，以提高您的使用体验。您可以在浏览器设置中关闭</span>cookies<span style="font-family:宋体">。但是，这可能影响应用的功能。</span>
</p>
<p>
    <span style="font-family:宋体">（</span>2<span style="font-family:宋体">）网络分析。网络分析是收集、评估网页和移动应用访问者行为的一种方法。这包括对流量模式进行分析，例如确定网站或移动应用某部分功能的访问频率，或用以了解访问者最感兴趣的信息或服务。我们的应用使用的是第三方工具提供的网络分析服务。</span>
</p>
<p style="margin-bottom:20px">
    &nbsp;
</p>
<p>
    <span style="font-family:宋体">六、我们如何保护您的信息</span>
</p>
<p>
    1.<span style="font-family:宋体">如本公司停止运营，本公司将停止继续收集您个人信息的活动，并采取措施对所持有的您的个人信息在合理期限内进行删除或匿名化处理。</span>
</p>
<p>
    2.<span style="font-family:宋体">为了保护您的个人信息，本公司将采取数据安全技术措施，提升内部合规水平，增加内部员工信息安全培训，并对相关数据设置安全访问权限等方式安全保护您的隐私信息。</span>
</p>
<p>
    3.<span style="font-family:宋体">我们将在</span>DOLAIMI“<span style="font-family:宋体">消息中心</span>”<span style="font-family:宋体">中向您发送有关信息安全的消息，并不时在</span>DOLAIMI“<span style="font-family:宋体">帮助中心</span>”<span style="font-family:宋体">版块更新钱包使用及信息保护的资料，供您参考。</span>
</p>
<p style="margin-bottom:20px">
    &nbsp;
</p>
<p>
    <span style="font-family:宋体">七、对未成年人的保护</span>
</p>
<p>
    <span style="font-family:宋体">我们对保护未满</span>18<span style="font-family:宋体">周岁的未成年人做出如下特别约定：</span>
</p>
<p>
    1.<span style="font-family:宋体">未成年人应当在父母或监护人指导下使用本公司相关服务。</span>
</p>
<p>
    2.<span style="font-family:宋体">我们建议未成年人的父母和监护人应当在阅读本政策、《</span>DOLAIMI<span style="font-family:宋体">服务协议》及我们的其他有关规则的前提下，指导未成年人使用应用。</span>
</p>
<p>
    3.<span style="font-family:宋体">本应用将根据适用的法律法规的规定保护未成年人的个人信息的保密性及安全性。</span>
</p>
<p style="margin-bottom:20px">
    &nbsp;
</p>
<p>
    <strong><span style="text-decoration:underline;"><span style="font-family:宋体">八、免责声明</span></span></strong>
</p>
<p>
    <strong><span style="text-decoration:underline;">1.</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">您确认，您使用第三方服务之后，本政策将不再适用于该等第三方对您个人信息的收集、使用、披露和传输行为。本公司无法保证该等第三方会采取合理的安全保护措施。</span></span></strong>
</p>
<p>
    <strong><span style="text-decoration:underline;">2.</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">您将自行对使用第三方服务的行为承担责任，并且您同意，如第三方收集、使用、披露和传输您个人信息，导致您受到损失或损害的，您不得要求本公司承担责任。</span></span></strong>
</p>
<p>
    <strong><span style="text-decoration:underline;">3. </span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">您确认并接受，在适用的法律允许的最大限度下，本公司将在现有技术水平条件下，基于</span>“</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">根据现状</span>”</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">、</span>“</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">根据可用</span>”</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">、</span>“</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">不保证无瑕疵</span>”</span></strong><strong><span style="text-decoration:underline;"><span style="font-family:宋体">的原则，尽可能采取合理的安全措施保护您的个人信息，以避免信息的泄露、篡改或者毁损。本公司系利用无线方式传输数据，因此，本公司无法确保通过无线网络传输数据的隐私性和安全性。</span></span></strong>
</p>
<p style="margin-bottom:20px">
    &nbsp;
</p>
<p>
    <span style="font-family:宋体">九、其他</span>
</p>
<p>
    1.<span style="font-family:宋体">您需全面了解并遵守您所在司法辖区与使用本公司服务所有相关法律、法规及规则。</span>
</p>
<p>
    2.<span style="font-family:宋体">法律适用和争议解决：</span>
</p>
<p>
    <span style="font-family:宋体">（</span>1<span style="font-family:宋体">）本政策适用美利坚共和国法律，并应据此解释。</span>
</p>
<p>
    <span style="font-family:宋体">（</span>2<span style="font-family:宋体">）因本政策引起的或与之相关的任何争议（包括任何有关其存在、有效性、终止的问题），双方应首先寻求和解。如果该争议在该和解程序开始后的</span>30<span style="font-family:宋体">天内仍未解决，双方应将该争议提交至美国国际仲裁中心，并通过遵循美国国际仲裁中心届时有效的仲裁规则（该规则被视为通过引用并入本条款），最终以仲裁的方式在美国予以解决。仲裁庭由一名仲裁员组成，仲裁语言为英语。每一方不可撤销地接受美国法院之非专属管辖权，以支持和协助根据本段前述内容进行的仲裁程序，包括在该程序的结果作出之前给予临时救济（如必要）。</span>
</p>
<p>
    3.<span style="font-family:宋体">您可以在我们的应用中查看本政策及本公司其他服务规则。我们鼓励您在每次访问应用时都查阅本公司的服务协议及隐私政策。</span>
</p>
<p>
    4.<span style="font-family:宋体">本政策的任何译文版本仅为方便用户而提供，无意对本政策的条款进行修改。如果本政策的英文版本与非英文版本之间存在冲突，应以英文版本为准。</span>
</p>
<p>
    5.<span style="font-family:宋体">本政策自</span>2021<span style="font-family:宋体">年</span>04<span style="font-family:宋体">月</span>15<span style="font-family:宋体">日起适用。</span>
</p>
<p style="margin-bottom:20px">
    &nbsp;
</p>
<p>
    <span style="font-family:宋体">本政策未尽事宜，您需遵守本公司不时更新的公告及相关规则。</span>
</p>
<p style="margin-bottom:20px">
    &nbsp;
</p>
<p style="text-align:right">
    Chain Fans Science And Technology. Ltd
</p>
<p style="text-align:right">
    <span style="font-family: 宋体">公司注册号：</span>#20211109930
</p>
<p>
    <br/>
</p></div>`;

//关于我们的HTML
export const about = `
<p>
    中文
</p>
<p>
    公司注册号：Chain Fans Science And Technology. Ltd&nbsp; #20211109930
</p>
<p>
    业务备案号：MSB#: 31000182616218
</p>
<p>
    邮箱：<span>service@dllaimi.org</span>
</p>
<p>
    <br/>
</p>`;

//等级说明HTML
export const grade = "<p>等级说明</p>";

//玩法介绍
export const Playgame = "<p>玩法介绍</p>";

//等级状态
export const level = {
	0: "普通用户"
};

//风险提示
export const riskWarning = `<p style="text-align:center">
    安全自测 保障资产 风险提示
</p>
<p style="margin-bottom:20px">
    &nbsp;
</p>
<p>
    DOLAIMI 新用户常见问题
</p>
<p style="margin-bottom:20px">
    &nbsp;
</p>
<p>
    1、你的数字代币 (各种代币/Token) 存储在哪里? 答案D
</p>
<p>
    &nbsp;
</p>
<p>
    A.&nbsp;存储在自己的手机设备上
</p>
<p>
    B.&nbsp;存储在银行&nbsp;
</p>
<p>
    C.&nbsp;存储在DOLAIM的服务器上 &nbsp;
</p>
<p>
    D.&nbsp;存储区块链上
</p>
<p style="margin-bottom:20px">
    &nbsp;
</p>
<p>
    2、对于基于区块链的数字资产的拥有者来说, 最重要的是保护好自己的? 答案C
</p>
<p>
    &nbsp;
</p>
<p>
    A.&nbsp;TXID&nbsp;
</p>
<p>
    B.&nbsp;公钥
</p>
<p>
    C.&nbsp;私钥
</p>
<p>
    D.&nbsp;钱包地址
</p>
<p style="margin-bottom:20px">
    &nbsp;
</p>
<p>
    3、链上识别钱包身份的唯一凭证是? 答案C
</p>
<p>
    &nbsp;
</p>
<p>
    A.邮箱&nbsp;&nbsp;&nbsp;
</p>
<p>
    B.密码&nbsp; &nbsp;
</p>
<p>
    C.私钥&nbsp;&nbsp;
</p>
<p style="margin-bottom:20px">
    &nbsp;
</p>
<p style="text-align:center">
    <strong><span style="text-decoration:underline;">风险提示</span></strong>
</p>
<p>
    <span style="text-decoration:underline;">因区块链行业发展目前各国都处于探索阶段各国法律也尚未健全，出于行业自律引导良性发展，坚决抵制任何形式的洗钱行为，警惕任何以数字代币的形式的诈骗行为，警惕承诺固定周期高额回报的集资行为，加强学习理性对待数字经济的时代红利，时刻要有风险意识切勿误导及向他人夸大宣传。</span>
</p>
<p>
    <br/>
</p>`;
/**
 * image 图片地址
 * msg 文字描述
 * */
export const noData = {
	image: "/static/noData.png",
	msg: "暂无数据",
};

/**
 * 图片上传接口地址
 * */
export const upLoadHost = "/group/Image/UploadByFile";

/**
 * 文件所在路径，默认：/default/
 * */
export const upLoadPath = "/group/";


export const buttonStyle = {
	disable: {
		background: "#e5e5e5!important",
		borderRadius: "100rpx",
		color: "#fff!important",
		height: "96rpx",
		border: "none!important",
	},
	main: {
		background:  "#2DA5E1",
		borderRadius: "100rpx",
		color: "#fff",
		height: "96rpx",
		border: "none",
	}
}
