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
    // 白名单
    const whiteList = [
        '/pages/my/wallet',
        '/pages/my/addressBook',
        '/pages/my/customer',
        '/pages/my/invite',
        '/pages/agreementList',
        '/pages/index/addcreate',
        '/pages/index/userMoney',
        '/pages/index/getMoney',
        '/pages/index/hotToken',
        '/pages/index/TokenDetails',
        '/pages/wallet/walletDetail',
    ];

    if (isTx() && whiteList.some(i=>url.startsWith(i))) {
        android.startNewActivity(true, `${window.location.host}/#${url}`);
    } else if (url.startsWith('http')) {
        window.location.href = url;
    } else {
        uni.navigateTo({
            url: url
        });
    }
}

/**
 * @description 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
 * @author lecoler
 * @date 2022/8/31
 * @param url:String 需要跳转的 tabBar 页面的路径（需在 pages.json 的 tabBar 字段定义的页面），路径后不能带参数
 * @param index:Number 需要跳转的 tabBar 页面的index （0资产 1市场 2发现 3电报 4我的）
 */
export function toTabBar(url, index) {
    if (isTx()) {
        android.refresh(index);
    } else {
        uni.switchTab({
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
    const val = JSON.stringify(value);
    if (isTx()) {
        android.saveData(key, val);
    } else {
        uni.setStorageSync(key, val);
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
        data = android.getData(key);
    } else {
        data = uni.getStorageSync(key);
    }
    if (data) {
        return JSON.parse(data);
    }
    return null;
}


/**
 * @description 移除本地数据
 * @author lecoler
 * @date 2022/9/1
 * @param key:String 键
 */
export function delConfig(key) {
    if (isTx()) {
        android.remove(key);
    } else {
        uni.removeStorageSync(key);
    }
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


