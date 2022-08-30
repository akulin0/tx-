import {
	request
} from "@/m-subpack/base";

//钱包装饰器
let coinList = {};
let allCoin = uni.getStorageSync("allCoin");
let walletAll = [];
let assetAll = [];
export const Assets = () => {
  return (target: any) => {
	target.prototype.currentWallet = null;
	target.prototype.totalMoney = 0;
    target.prototype.coinLists = [];
	target.prototype.allCoin = allCoin;
	target.prototype.walletAll = walletAll;
	target.prototype.assetAll = assetAll;
	
	//获取当前的选择的钱包的代币
	target.prototype.getCoinList = async function(){
		let _coinList = coinList[this.currentWallet.id] || [];
	
		
			let {
				data,
				errorMessage
			} = await request({
				url: '/walletGetCoinBalanceByWalletId',
				method: 'get',
				data: {
					"wallet_id":this.currentWallet.id,
				}
			})
			_coinList = data.list;
			this.coinLists =_coinList;
			
			this.totalMoney = data.sum_value;
			
			// this.refreshWalletkBalance(true);
	
		
		this.coinLists =_coinList;
		
		
		// debugger
		coinList[this.currentWallet.id] = _coinList;
	}
	
	//获取资产余额
	target.prototype.getCoinBalance = async function(item){
		let {
			data,
			errorMessage
		} = await request({
			url: '/walletget-balance',
			method: 'get',
			params: {
				"coin_id": item.coin_id,
				"wallet_id": this.currentWallet.id,
			}
		})
		item.balance = Number(data.balance).toFixed(4)
		item.Moneys = Number(data.Total_amount).toFixed(4)
		
		// this.totalMoney += Number(item.Moneys);
		
		// console.log(this.totalMoney);
	}
	
	//刷新资产
	target.prototype.refreshWalletkBalance = async function(type){
		// if(!type)
		// uni.showLoading({
		//   title: "加载中",
		// });
		// this.totalMoney = 0;
		// this.coinLists.map(item=>{
		// 	this.getCoinBalance(item);
		// });
		
		// setTimeout(()=>{
		// 	uni.hideLoading();
		// },this.coinLists.length*200)
	}
	
	//所有钱包地址
	target.prototype.getWallet = async function(){
		// if(walletAll.length==0){
		// 	let {
		// 		data,
		// 		errorMessage
		// 	} = await request({
		// 		url: '/wallet-get-all-wallet-list',
		// 		method: 'get',
		// 	});
		//
		// 	walletAll  = data.map((item) => {
		// 		item.addressx = item.address.substring(0, 6) + '***' + item.address.substring(30)
		//
		// 		return item
		//
		// 	})
		//
		//
		// }
		this.walletAll = walletAll;
		this.currentWallet = null;
		for(let item of  walletAll){
			if(item.is_select){
				this.currentWallet =item;
				uni.setStorageSync("currentWallet",this.currentWallet);
				break;
			}
		}
		
	}
	
	//更改默认钱包地址
	target.prototype.changeCurrentWallet =async function(item){
		
		
		this.totalMoney  = 0;
		walletAll = [];
		await request({
			url: '/wallet-update-Wallet-State',
			method: 'get',
			params: {
				"walletId": item.id,
			}
		})
		await this.getWallet();
		await this.getCoinList();
		
		this.coinLists.map(item=>{
			console.log(item.Moneys)
			this.totalMoney += Number(item.Moneys|| 0);
		});
	}
	
	//获取所有代币列表
	target.prototype.getCoinAll = async function(){
	
		if(allCoin.length ==0){
			let {
				data,
				errorMessage
			} = await request({
				url: '/wallet-get-coin-list-un-page',
				method: 'POST',
			});
			allCoin = data;
			uni.setStorageSync("allCoin",allCoin);
		}
		this.allCoin = allCoin;
	}
	
	//更改选中状态
	target.prototype.changeCoinItem = async function(type,id){
		uni.showLoading({
		  title: "提交中",
		});
		try{
			
	
			let _coinLists = [];
		
			
			const {
				data
			} = await request({
				url: '/wallet-add-coin',
				method: "POST",
				data: {
					"coin_id": id,
					"wallet_id": this.currentWallet.id,
					"type": type
				}
			})
		
			coinList[this.currentWallet.id] = [];
			await this.getCoinList();
	
		}catch(e){}
		uni.hideLoading();
	}
	
	
	//初始化方法
	target.prototype.init = async function(){
		if(walletAll.length > 0){
			 this.refreshWalletkBalance();
		}
		this.getCoinAll();
		await this.getWallet();
		// debugger
		if(this.currentWallet){
			await this.getCoinList();
		}else{
			this.coinLists = [];
		}
		
		
	}
  };
};



export const clearWallet = ()=>{
	coinList = {};
	walletAll = [];
}



