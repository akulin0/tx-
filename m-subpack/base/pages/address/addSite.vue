<template>
	<view class="wrap page">

		<u-navbar is-fixed :title="title" backgroundColor="#fff" />
		<view class="top">

			<view class="item">
				<view class="left">姓名</view>
				<input placeholder="请填写收货人姓名" id="userName"  @input="onInput" placeholder-style="color:#B3B3B3;font-size:28rpx;" @blur="onInput" v-model="formData.userName"  />
			</view>
			<view v-if="errors.userName" class="input-error">{{errors.userName}} </view>
			<view class="line"></view>
			<view class="item">
				<view class="left">手机</view>
				<input placeholder="请填写收货人手机号" id="tel" maxlength="11"  @input="onInput" placeholder-style="color:#B3B3B3;font-size:28rpx;" @blur="onInput" v-model="formData.tel"  />
			</view>
			<view v-if="errors.tel" class="input-error">{{errors.tel}} </view>
			<view class="line"></view>
			<view class="item" @tap="showRegionPicker">
				<view class="left">地区</view>
				<input placeholder="省市区县、乡镇等" id="area" disabled="true" placeholder-style="color:#B3B3B3;font-size:28rpx;"  @input="onInput" @blur="onInput" v-model="formData.area"  />
			</view>
			<view v-if="errors.area" class="input-error">{{errors.area}} </view>
			<view class="line"></view>
			<view class="item address">
				<view class="left">地址</view>
				 <textarea  @input="onInput" style="margin-left: 28rpx;" placeholder-style="color:#B3B3B3;font-size:28rpx;" placeholder="街道、楼牌等" @blur="onInput" id="address" auto-height  v-model="formData.address" />
			</view>
			<view  v-if="errors.address"  class="input-error">{{errors.address}} </view>
			<view class="line"></view>
			<!-- <view class="site-clipboard">
				<textarea placeholder-class="line" value="" placeholder="粘贴文本,可自动识别姓名和地址等" />
				<view class="clipboard">
					地址粘贴板
					<u-icon name="arrow-down" class="icon" :size="20"></u-icon>
				</view>
			</view> -->
		</view>
		<view class="bottom">

			<view class="default">
				<view class="left">
					<view class="set">设置默认地址</view>
					<view class="tips">提醒：每次下单会默认推荐该地址</view>
					<view class="tips" style="line-height: 1.3;padding-bottom: 10rpx;">港澳台、新疆、西藏、内蒙、青海等暂时无法发货，请勿下单。</view>
				</view>
				<u-switch v-model="checked" size="40" style="margin-bottom: 20rpx;"   active-color="#FA7528" @change="setDefault"></u-switch>
			</view>
		</view>

		<base-button ref="button" class="button" @submit="submit" :disable="disable" v-if="type==0" title="完成" />
		<base-button ref="button" class="button" style="bottom: 180rpx;" @submit="submit" :disable="disable" v-if="type==1"  title="确认修改" />

		<button class="buttons" @click="del()" v-if="type==1" >删除地址</button>
		<u-picker mode="region" ref="uPicker" @confirm="confirm" v-model="show" />
		<u-modal v-model="showModel" :content="'您确认要删除该收货地址吗？'" @confirm="delsure()" :show-cancel-button="true" confirm-color="#FA7528"></u-modal>
	</view>
</template>

<script>
	import {
		mobileVar,
		request,
		sleep
	} from "@/m-subpack/base";
export default {
	data() {
		return {
			show: false,//地区选择弹出框
			showModel:false,//提示框
			disable:true,
			height: 100,
			autoHeight: true,
			checked: false,
			lng:'',//经度
			lat:"",//纬度
			formData: {
				userName: "",
				tel: "",
				address:"",
				area:"",
			},
			//错误信息
			errors: {
				userName: "",
				tel: "",
				address:"",
				area:"",
			},
			province :"",
			city :"",
			area:"",
			title:'新增地址',
			type:0,// 0--新增地址 1--编辑地址
			addressId:null //地址id
		};
	},
	onLoad(o) {
		if(o.id) {
			this.title ="编辑地址";
			this.type=1
			this.addressId = o.id;
			this.editAddree()
		}
	},
	methods: {
		async editAddree() {
			
			let {data} = await request({
				url:"/base/User/GetAddressDetail",
				method:"GET",
				params:{
					  "id": this.addressId,
				}
			})
			this.formData.userName = data.userName
			this.formData.tel = data.userPhone
			this.formData.area = data.address
			this.formData.address = data.houseNumber
			
			this.checked = data.isDefault==1?true:false;
			this.disableChange();
		},
		// 是否默认地址
		setDefault() {
			console.log(this.checked)
		},
		//删除地址提示框
		del() {
			this.showModel= true;
			
		},
		//确认删除
		async delsure() {
			let {errorCode} = await request({
				url:"/base/User/BaerDelAddress",
				method:"GET",
				params:{
					  "id": this.addressId,
				}
			})
			if(errorCode==0) {
				uni.showToast({
					title:"删除成功！",
					duration:1000,
					icon:'none',
					async success() {
						await sleep(1000)
						uni.navigateBack()
					}
				})
			}
		},
		//地区选择弹出框
		showRegionPicker() {
			this.show = true;
			// uni.chooseLocation({
			// 	    success: function (res) {
			// 	        console.log('位置名称：' + res.name);
			// 	        console.log('详细地址：' + res.address);
			// 	        console.log('纬度：' + res.latitude);
			// 	        console.log('经度：' + res.longitude);
			// 			this.formData.area = res.address
			// 			this.lng = res.longitude
			// 			this.lat = res.latitude
			// 	    }
			// })
		},
		// 地区选择填充
		confirm(e) {
			this.formData.area = e.province.label+e.city.label+e.area.label
			this.province = e.province.label
			this.city = e.city.label
			this.area = e.area.label
		},
		// 确认提交事件
		async submit() {
			
			try {
				
			
				
			var data = {
				"userName": this.formData.userName,
				"userPhone": this.formData.tel,
				"address":this.formData.area,
				"province":this.province ,
				"city":this.city ,
				"county":this.area,
				"houseNumber":this.formData.address,
				"isDefault":this.checked?1:0
			}
			if(this.type==1) {
				data = {"id":this.addressId,...data}
			}
			let {errorCode} = await request({
				url:this.type==0?"/base/User/BaseAddAddress":"/base/User/UpdateAddress",
				method:"POST",
				data:data
			})
			if(errorCode==0) {
				uni.showToast({
					title: this.$t('ibinz.msg64',['提交成功']),
					duration:1000,
					icon:'none',
					async success() {
						await sleep(1000)
						uni.navigateBack()
					}
				})
			}
			} catch (error) {
				
			}
			this.$refs.button.hideLoading();
		},
		onInput(e) {
			if(e.currentTarget.id=='area') {
				this.verification(e.currentTarget.id,this.formData.area);
			} else {
				this.verification(e.currentTarget.id, e.detail.value);
			}
		},
		verification(name, value) {
			console.log(value)
			switch (name) {
				case "tel":
					this.errors.tel = "";
					if (!value) {
						this.errors.tel = "请输入手机号"
					} else if (!mobileVar(value)) {
						this.errors.tel = "请输入正确的手机号"
					}
					break;
				case "userName":
					this.errors.userName = "";
					if (!value) {
						this.errors.userName = "请输入姓名！"
					}
					break;
				case "area":
					this.errors.area = "";
					if (!value) {
						this.errors.area = "请选择地区"
					}
					break;
				case "address":
					this.errors.address = "";
					if (!value) {
						this.errors.address = "请填写详情地址！"
					}
					break;
			}
			this.disableChange();
		
		},
		disableChange() {
			const formData = {...this.formData};
			for (let o in formData) {
				this.disable = !!this.errors[o] || !formData[o];
				if (this.disable) break;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import "@/m-subpack/base/scss/main.scss";
/deep/ .line {
	color: $u-light-color;
	font-size: 28rpx;
}
.wrap {
	background-color: #FFF;
	min-height: 100vh;
	.top {
		background-color: #ffffff;
		border-top: solid 2rpx $u-border-color;
		padding: 22rpx;
		.line {
			height: 1px  ;
			background-color: #E6E6E6;
			margin: 0 30rpx;
		}
		.item {
			display: flex;
			font-size: 32rpx;
			line-height: 100rpx;
			align-items: center;
			margin: 0 30rpx;
			.left {
				width: 180rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
			}
			input {
				text-align: left;
				display: flex;
				flex: 1;
			}

	
		}
		.input-error {
			color: red;
			font-size: 24rpx;
			margin-left: 180rpx;
			margin-bottom: 10rpx;
		}
		.address {
			padding: 20rpx 0;
			textarea {
				// width: 100%;
				height: 150rpx;
				background-color: #fff;
				line-height: 60rpx;
				margin: 40rpx auto;
				padding: 20rpx;
			}
		}
		.site-clipboard {
			padding-right: 40rpx;
			textarea {
				// width: 100%;
				height: 150rpx;
				background-color: #f7f7f7;
				line-height: 60rpx;
				margin: 40rpx auto;
				padding: 20rpx;
				
			}
			.clipboard {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 26rpx;
				color: $u-tips-color;
				height: 80rpx;
				.icon {
					margin-top: 6rpx;
					margin-left: 10rpx;
				}
			}
		}
	}
	.bottom {
		margin-top: 20rpx;
		padding: 40rpx 0;
		padding-right: 0;
		background-color: #ffffff;
		font-size: 28rpx;
		.tag {
			display: flex;
			.left {
				width: 160rpx;
			}
			.right {
				display: flex;
				flex-wrap: wrap;
				.tags {
					width: 140rpx;
					padding: 16rpx 8rpx;
					border: solid 2rpx $u-border-color;
					text-align: center;
					border-radius: 50rpx;
					margin: 0 10rpx 20rpx;
					display: flex;
					font-size: 28rpx;
					align-items: center;
					justify-content: center;
					color: $u-content-color;
					line-height: 1;
				}
				.plus {
					//padding: 10rpx 0;
				}
			}
		}
		.default {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: solid 2rpx $u-border-color;
			line-height: 64rpx;
			margin: 0 30rpx;
			.tips {
				font-size: 24rpx;
			}
			.right {
			}
		}
	}
	.button {
			display: flex;
			justify-content: space-around;
			height: 88rpx;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 60rpx;
			margin: 0 30rpx;
			// background: $base-address-bgColor;
			border-radius: 60rpx;
			font-size: 30rpx;
		
			.add {
				display: flex;
				align-items: center;
				color: #ffffff;
		
				.icon {
					margin-right: 10rpx;
				}
			}
	}
	.buttons {
		display: flex;
		justify-content: space-around;
		height: 88rpx;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 60rpx;
		margin: 0 30rpx;
		// background: $base-address-bgColor;
		border-radius: 60rpx;
		font-size: 30rpx;
		border: 1px solid #fea86e;
		color: #FA7528;
		font-weight: bold;
		line-height: 88rpx;
	}
}
</style>
