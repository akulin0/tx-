import {ethers} from 'ethers';

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
            keystore
        };

    } catch (e) {
        console.log('-------Error-------', e);
    }
}

// export function get