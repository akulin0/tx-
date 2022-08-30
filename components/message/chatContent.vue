<template>
	<view @click="checkReg(contents)" style="width: 100%;">
		<block v-for="item in contents">
			<text selectable="true" v-if="item.startsWith('http')" style="word-wrap:break-word" :class="{urlcolor:isUrl}">{{item}}</text>
			<text selectable="true" v-else-if="!item.startsWith('/static/')" style="word-wrap:break-word; " :class="{urlcolor:isUrl}">{{item}}</text>
		    <image v-else="item.startsWith('/static/')" :src="item" style="width: 52rpx;height: 52rpx;"></image>
		</block>
	</view>
</template>

<script>
	import {
		emojiList,
	} from "@/config";
	
	export default {

		data() {
			return {
				contents: '',
				emojiList: emojiList,
				isUrl:false
			}
		},
		props: ['content'],
		created() {
			let contents = this.content
			console.log(contents,'c')
			emojiList.map(item => {
				const reg = new RegExp(``, "gm")
				// console.log(reg)

				contents = contents.split(`[${item.name}];`).join(
					`,@@@@,${item.pic},@@@@,`
				);

			})
				
			this.contents = contents.split(",@@@@,")
			console.log(this.contents,'contents')
			const isHttp = this.contents[0].indexOf('http://') != -1 ? true : false
			const isHttps = this.contents[0].indexOf('https://') != -1 ? true : false
			if(isHttp) {
				console.log('1')
				if(this.contents[0].indexOf('http://') == 0 && this.contents[0].lastIndexOf('.com') == this.contents[0].length-4) {
					this.isUrl = true
				} 
					
			}
			else if(isHttps) {
				console.log('http')
				if(this.contents[0].indexOf('https://') == 0 && this.contents[0].lastIndexOf('.com') == this.contents[0].length-4) {
					this.isUrl = true
				} 
			}
			else {
				this.isUrl = false
			}
		},
		methods: {
			checkReg(v) {
				const isHttp = this.contents[0].indexOf('http://') != -1 ? true : false
				const isHttps = this.contents[0].indexOf('https://') != -1 ? true : false
				if(isHttp) {
					if(this.contents[0].indexOf('http://') == 0 && this.contents[0].lastIndexOf('.com') == this.contents[0].length-4) {
						let _url = v[0]
            this.toPage("/pages/webView?url=" + _url)
						// uni.navigateTo({
						// 	url: "/pages/webView?url=" + _url,
						// });
					} 
						
					
				}
				if(isHttps) {
					if(this.contents[0].indexOf('https://') == 0 && this.contents[0].lastIndexOf('.com') == this.contents[0].length-4) {
						let _url = v[0]
            this.toPage("/pages/webView?url=" + _url)
						// uni.navigateTo({
						// 	url: "/pages/webView?url=" + _url,
						// });
					} 
				}
				

			},
		}
	}
</script>

<style >
	.urlcolor {
		color: #2b71db;
	}
</style>
