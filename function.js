//判断为空
function isEmpty(obj) {
	if (obj == null || obj == undefined || obj == '') {
		return true;
	} else {
		return false;
	}
}

function checkInputEmpty(obj, msg) {
	if (isEmpty(obj)) {
		uni.showModal({
			title: '信息提示',
			showCancel: false,
			content: msg
		})
		return true;
	} else {
		return false;
	}
}

function urlToJSON(url) {
	var params = url.split("?")[1];
	var paramArr = params.split('&');
	var res = {};
	for (var i = 0; i < paramArr.length; i++) {
		var str = paramArr[i].split('=');
		res[str[0]] = str[1];
	}
	return res;

}
function inputChangeMoney(money){
	return  money = money.replace(/[^\d]/g, '');
}


function regname(regname) {
	if (/^[\u2E80-\u9FFF]+$/.test(regname)) {
		return true;
	} else {
		return false;
	}
}

function phonenum(phonenum) {
	if (/^1[0-9]{10}$/.test(phonenum)) {
		return true;
	} else {
		return false;
	}
}

function regemail(num) {
	if (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(num)) {
		return true;
	} else {
		return false;
	}
}
// 验证由数字和26个英文字母组成的字符串
function regAZaz(num) {
	if (/^[A-Za-z0-9]+$/.test(num)) {
		return true;
	} else {
		return false;
	}
}


function Overnum(num) {
	if (/^[1,2,3,4,5,6,7,8,9,0]\d{20}$/.test(num)) {
		return true;
	} else {
		return false;
	}
}

function regnum(num) {
	if (/^\d{6}$/.test(num)) {
		return true;
	} else {
		return false;
	}
}

function getNotNullSplit(str) {
	var list = [];
	if (isEmpty(str)) {
		return list;
	} else {
		var arr = str.split(",");

		for (var i = 0; i < arr.length; i++) {
			if (!isEmpty(arr[i])) {
				list.push(arr[i])
			}
		}

		return list;
	}
}

function formatDateTime(dateTime) {
	if (isEmpty(dateTime)) {
		return ""
	} else {

		var index = dateTime.indexOf(" ");
		var data = dateTime.substring(0, index)
		console.log('---', index)
		console.log(data)
		return data;
	}
}

function getNowDate() {
	var date = new Date();
	var seperator1 = "-";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
	return currentdate
}

function formatDate(dateTime) {
	if (isEmpty(dateTime)) {
		return ""
	} else {
		var date = dateTime.replace(/\//g, '-');
		date = date.replace("T", " ");
		var arr = date.split(" ");
		return arr[0];
	}
}



function getNowDateTime() {
	var date = new Date();
	var seperator1 = "-";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}

	var myHours = date.getHours() // 获取当前小时(0-23)	
	var myMinu = date.getMinutes() // 获取当前分钟(0-59)	
	var mySec = date.getSeconds() // 获取当前秒数(0-59)

	if (myHours >= 0 && myHours <= 9) {
		myHours = "0" + myHours;
	}

	if (myMinu >= 0 && myMinu <= 9) {
		myMinu = "0" + myMinu;
	}


	if (mySec >= 0 && mySec <= 9) {
		mySec = "0" + mySec;
	}

	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + myHours + ":" + myMinu + ":" +
		mySec;
	return currentdate
}






function dateCompare(date_1, date_2) {
	var date1 = new Date(date_1)
	var date2 = new Date(date_2)
	var s1 = date1.getTime(),
		s2 = date2.getTime();
	var total = (s2 - s1) / 1000;
	var day = parseInt(total / (24 * 60 * 60)); //计算整数天数	
	var afterDay = total - day * 24 * 60 * 60; //取得算出天数后剩余的秒数	
	var hour = parseInt(afterDay / (60 * 60)); //计算整数小时数	
	var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60; //取得算出小时数后剩余的秒数	
	var min = parseInt(afterHour / 60); //计算整数分	
	var afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60; //取得算出分后剩余的秒数


	var item = {
		total: total,
		day: day,
		hour: hour,
		min: min
	}

	return item
}


function getDateJSON(val) {
	var date = new Date(val);

	var weekList = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]

	var item = {
		year: date.getFullYear(),
		month: date.getMonth() + 1,
		day: date.getDate(),
		week: date.getDay(),
		weekStr: weekList[date.getDay()],
		hour: date.getHours(),
		min: date.getMinutes(),
		sec: date.getSeconds()
	}
	console.log(item)
	return item;

}



function getWeek(date) {
	var week;
	if (date.getDay() == 0) week = '周日';
	if (date.getDay() == 1) week = '周一';
	if (date.getDay() == 2) week = '周二';
	if (date.getDay() == 3) week = '周三';
	if (date.getDay() == 4) week = '周四';
	if (date.getDay() == 5) week = '周五';
	if (date.getDay() == 6) week = '周六';
	return week;
}


function validMoney(money) {
	var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
	if (reg.test(money)) {
		return true;
	} else {
		return false;
	};
	//000 错
	//0 对
	//0. 错
	//0.0 对
	//050 错
	//00050.12错
	//70.1 对
	//70.11 对
	//70.111错
	//500 正确
}


//判断请求的数据success
function CheckData(res) {
	if (res.statusCode != 200) {
		if (res.statusCode == 401) {
			uni.clearStorageSync('token');
			
			uni.navigateTo({
				
				url: '/pages/login/login.vue'
			})
		}
		return false;
	} else {
		if (res.data.errorCode == 0) {
			return true;
		} else {
			return false
		}
	}
}

function validateIdCard(idCard) {
	//15位和18位身份证号码的正则表达式
	var regIdCard =
		/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

	//如果通过该验证，说明身份证格式正确，但准确性还需计算
	if (regIdCard.test(idCard)) {
		if (idCard.length == 18) {
			var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
			var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
			var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
			for (var i = 0; i < 17; i++) {
				idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
			}
			var idCardMod = idCardWiSum % 11; //计算出校验码所在数组的位置
			var idCardLast = idCard.substring(17); //得到最后一位身份证号码
			//如果等于2，则说明校验码是10，身份证号码最后一位应该是X
			if (idCardMod == 2) {
				if (idCardLast == "X" || idCardLast == "x") {
					return true
				} else {
					return false
				}
			} else {
				//用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
				if (idCardLast == idCardY[idCardMod]) {
					return true
				} else {
					return false
				}
			}
		}
	} else {
		return false
	}
}	
export default {
	isEmpty,
	CheckData,
	getWeek,
	getNowDate,
	getNowDateTime,
	dateCompare,
	formatDate,
	getDateJSON,
	validMoney,
	urlToJSON,
	getNotNullSplit,
	formatDateTime,
	phonenum,
	regnum,
	regname,
	Overnum,
	regemail,
	validateIdCard,
	regAZaz,
	inputChangeMoney
}
