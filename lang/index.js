import Vue from 'vue'
import VueI18n from 'vue-i18n'
import langEnUS from './en-US'
import langZhCN from './zh-CN'

Vue.use(VueI18n)


// debugger


let currentLang = uni.getStorageSync('CURRENT_LANG') || "zh-CN"


uni.setStorageSync("CURRENT_LANG",currentLang);

const i18n = new VueI18n({
	// 默认选择的语言
	locale: currentLang,
	messages: {
		'en-US': langEnUS,
		'zh-CN': langZhCN
	}
})


export const changeLang = (locale)=>{
	i18n.locale = locale;
	uni.setStorageSync("CURRENT_LANG",locale);
	if(!uni.getStorageSync("token")){
		uni.reLaunch({
			url:"/pages/login/login"
		})
	}else{
		uni.reLaunch({
			url:"/pages/my/setting/setting"
		})
	}
	
	
	
}
export default i18n
