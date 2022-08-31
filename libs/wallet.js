import {ethers} from 'ethers';
import {saveConfig, getConfig} from './utils';

/**
 * @description 一键生成钱包
 * @author lecoler
 * @date 2022/8/30
 * @param password:String 钱包密码（用于解锁keystore）
 * @return Promise
 */
export async function createWallet(password) {
    try {
        const wallet = ethers.Wallet.createRandom();

        const privateKey = wallet.privateKey;
        const publicKey = wallet.publicKey;
        const address = wallet.address;
        const mnemonic = wallet.mnemonic;
        const keystore = await wallet.encrypt(password);

        return {
            privateKey,
            publicKey,
            address,
            mnemonic,
            keystore,
            wallet,
        };

    } catch (e) {
        console.log('-------Error-------', e);
    }
}

/**
 * @description 一键储存钱包信息至本地
 * @author lecoler
 * @date 2022/8/31
 * @param info:Object 信息，钱包名字、钱包密码提示信息、钱包密码、链名称、地址、私钥、公钥、助记词、keystore
 * @return Promise
 */
export function saveWallet({name, remark, pwd, chainName, address, privateKey, publicKey, mnemonic, keystore}) {
    return new Promise((resolve, reject) => {
        try {
            const walletList = getWalletList(chainName);
            walletList.push({
                address: address,
                name: name,
                remark: remark,
            });
            saveConfig(chainName, walletList);
            saveConfig(`${chainName}-${address}-privateKey`, privateKey);
            saveConfig(`${chainName}-${address}-publicKey`, publicKey);
            saveConfig(`${chainName}-${address}-mnemonic`, mnemonic);
            saveConfig(`${chainName}-${address}-keystore`, keystore);
            saveConfig(`${chainName}-${address}-pwd`, pwd);
            resolve();
        } catch (e) {
            reject(e);
        }
    });
}

/**
 * @description 获取本地钱包地址
 * @author lecoler
 * @date 2022/8/31
 * @param chainName:String 链名称（如 BSC/ETH/TRX/FIL/HT）
 * @return Array
 */
export function getWalletList(chainName) {
    return getConfig(chainName) || [];
}

/**
 * @description 获取本地钱包 私钥
 * @author lecoler
 * @date 2022/8/31
 * @param chainName:String 链名称
 * @param address:String 钱包地址
 * @return Promise
 */
export function getWalletPrivateKey(chainName, address) {
    return new Promise((resolve, reject) => {
        try {
            resolve(getConfig(`${chainName}-${address}-privateKey`));
        } catch (e) {
            reject(e);
        }
    });
}

/**
 * @description 获取本地钱包 公钥
 * @author lecoler
 * @date 2022/8/31
 * @param chainName:String 链名称
 * @param address:String 钱包地址
 * @return Promise
 */
export function getWalletPublicKey(chainName, address) {
    return new Promise((resolve, reject) => {
        try {
            resolve(getConfig(`${chainName}-${address}-publicKey`));
        } catch (e) {
            reject(e);
        }
    });
}

/**
 * @description 获取本地钱包 助记词
 * @author lecoler
 * @date 2022/8/31
 * @param chainName:String 链名称
 * @param address:String 钱包地址
 * @return Promise
 */
export function getWalletMnemonic(chainName, address) {
    return new Promise((resolve, reject) => {
        try {
            resolve(getConfig(`${chainName}-${address}-mnemonic`));
        } catch (e) {
            reject(e);
        }
    });
}

/**
 * @description 获取本地钱包 keystore
 * @author lecoler
 * @date 2022/8/31
 * @param chainName:String 链名称
 * @param address:String 钱包地址
 * @return Promise
 */
export function getWalletKeystore(chainName, address) {
    return new Promise((resolve, reject) => {
        try {
            resolve(getConfig(`${chainName}-${address}-keystore`));
        } catch (e) {
            reject(e);
        }
    });
}

/**
 * @description 获取本地钱包 密码
 * @author lecoler
 * @date 2022/8/31
 * @param chainName:String 链名称
 * @param address:String 钱包地址
 * @return Promise
 */
export function getWalletPwd(chainName, address) {
    return new Promise((resolve, reject) => {
        try {
            resolve(getConfig(`${chainName}-${address}-pwd`));
        } catch (e) {
            reject(e);
        }
    });
}

/**
 * @description 通过keystore创建钱包
 * @author lecoler
 * @date 2022/8/31
 * @param keystore:String keystore字符
 * @param password:String keystore密码
 * @return Promise
 */
export async function createWalletByKeystore(keystore, password) {
    try {
        const wallet = await ethers.Wallet.fromEncryptedJson(keystore, password);
        const privateKey = wallet.privateKey;
        const publicKey = wallet.publicKey;
        const address = wallet.address;
        const mnemonic = wallet.mnemonic;
        return {
            privateKey,
            publicKey,
            address,
            mnemonic,
            keystore,
            wallet,
        };
    } catch (e) {
        console.log('-------Error-------', e);
    }
}

/**
 * @description 通过助记词创建钱包
 * @author lecoler
 * @date 2022/8/31
 * @param mnemonic:String 助记词
 * @return Promise
 */
export async function createWalletByMnemonic(mnemonic) {
    try {
        const wallet = ethers.Wallet.fromMnemonic(mnemonic);
        const privateKey = wallet.privateKey;
        const publicKey = wallet.publicKey;
        const address = wallet.address;
        const keystore = await wallet.encrypt(password);

        return {
            privateKey,
            publicKey,
            address,
            mnemonic,
            keystore,
            wallet,
        };
    } catch (e) {
        console.log('-------Error-------', e);
    }
}

/**
 * @description 通过私钥创建钱包
 * @author lecoler
 * @date 2022/8/31
 * @param privateKey:String 私钥
 * @return Promise
 */
export async function createWalletByPrivateKey(privateKey) {
    try {
        const wallet = new ethers.Wallet(privateKey);
        const mnemonic = wallet.mnemonic;
        const publicKey = wallet.publicKey;
        const address = wallet.address;
        const keystore = await wallet.encrypt(password);
        return {
            privateKey,
            publicKey,
            address,
            mnemonic,
            keystore,
            wallet,
        };
    } catch (e) {
        console.log('-------Error-------', e);
    }
}