import {base64} from 'ethers/lib/utils';

/**
 * @description 跳转页面
 * @author lecoler
 * @date 2022/8/30
 * @param url:String 跳转路径
 */
export function toPage(url) {
    if (navigator.userAgent.includes('TelegramXAPP')) {
        android.startNewActivity(true, `${window.location.host}/#${url}`);
    } else {
        uni.navigateTo({
            url: url
        });
    }
}

/**
 * @description 保存数据至本地文件
 * @author lecoler
 * @date 2022/8/30
 * @param fileName:String 文件名
 * @param fileContent:String 内容
 * @return xxx xxxx
 */
export function saveConfig(fileName, fileContent) {

    if (navigator.userAgent.includes('TelegramXAPP')) {

    } else {
        // uni.setStorageSync(fileName, base64.decode(fileContent));
    }
}