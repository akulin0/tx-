import {utils} from 'ethers';

/**
 * @description 判断是否处于tx app 打开
 * @author lecoler
 * @date 2022/8/31
 * @return Boolean
 */
export function isTx() {
    return navigator.userAgent.includes('TelegramXAPP');
}

/**
 * @description 跳转页面
 * @author lecoler
 * @date 2022/8/30
 * @param url:String 跳转路径
 */
export function toPage(url) {
    if (isTx()) {
        android.startNewActivity(true, `${window.location.host}/#${url}`);
    } else {
        uni.navigateTo({
            url: url
        });
    }
}

/**
 * @description 保存数据至本地
 * @author lecoler
 * @date 2022/8/30
 * @param key:String 键
 * @param value:String 值
 * @return xxx xxxx
 */
export function saveConfig(key, value) {
    const val = JSON.stringify(value)
    if (isTx()) {
        android.saveData(base64(key), base64(val));
    } else {
        uni.setStorageSync(base64(key), base64(val));
    }
}

/**
 * @description 从本地取数据
 * @author lecoler
 * @date 2022/8/31
 * @param key:String 键
 * @return String
 */
export function getConfig(key) {
    let data;
    if (isTx()) {
        data = android.getData(base64(key));
    } else {
        data = uni.getStorageSync(base64(key));
    }
    if (data) {
        return JSON.parse(unit8ArrayToString(utils.base64.decode(data)));
    }
    return null;
}

/**
 * @description 将string转化成Uint8Array
 * @author lecoler
 * @date 2022/8/31
 * @param str:String 需转换的字符
 * @return Uint8Array
 */
export function stringToUint8Array(str) {
    const arr = [];
    for (let i = 0; i < str.length; i++) {
        arr.push(str.charCodeAt(i));
    }
    return new Uint8Array(arr);
}

/**
 * @description 将Uint8Array转换成String字符
 * @author lecoler
 * @date 2022/8/31
 * @param data:Uint8Array 需转换的数据
 * @return String
 */
export function unit8ArrayToString(data) {
    let str = '';
    for (let i = 0; i < data.length; i++) {
        str += String.fromCharCode(data[i]);
    }
    return str;
}

/**
 * @description 将字符String进行base64加密
 * @author lecoler
 * @date 2022/8/31
 * @param str:String 待加密字符
 * @return String
 */
export function base64(str) {
    return Buffer.from(str, 'utf8').toString('base64');
}

