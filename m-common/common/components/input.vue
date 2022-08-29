<template>
	<view>
		<view class="input-label" v-if="label">{{ label }}</view>
		<view class="input-box">
			<input class="input" ref="input" :value="passwordMask" placeholder-style="color:#CCCCCC" :placeholder="placeholder" :type="type" :maxlength="maxlength"
			 :focus="focus" @input="onInput" @blur="onInput" />
			<slot></slot>
		</view>
		<view class="err">{{ error }}</view>
	</view>
</template>

<script>
	import {
		guid
	} from "@/m-subpack/base";
	export default {
		props: {
			value: {
				type: String,
				default: "",
			},
			type: {
				type: String,
				default: "text",
			},
			rules: {
				type: Object,
				default () {
					return {};
				},
			},

			maxlength: {
				type: Number,
				default: 9999,
			},
			password: {
				type: Boolean,
				default: false,
			},
			label: {
				type: String,
				default: "",
			},
			placeholder: {
				type: String,
				default: "请输入内容",
			},
		},
		data() {
			return {
				error: "",
				focus: false,
				data: [],
				dataString: "",
				passwordMask: "",
			};
		},
		mounted() {
			this.name = `input-${guid()}`;
			this.parent = this.$u.$parent.call(this, "u-form");
			const rules = this.rules;
			const value = this.value;
			this.parent.addRules(this.name, rules, value);

			this.setPasswordMask(value);
		},
		methods: {
			setPasswordMask(value) {
				if (this.password) {
					let passwordMask = "";
					const _value = `${value}`.split("");
					let data = [];
					for (let o = 0; o < _value.length; o++) {
						if (_value[o] == "*") {
							data.push(this.data[o]);
						} else {
							data.push(_value[o]);
						}
						passwordMask += "*";
					}

					this.data = data;
					this.dataString = data.join("");

					this.$emit("input", this.dataString);
					this.passwordMask = passwordMask;
				} else {
					this.dataString = value;
					this.passwordMask = value;
					this.$emit("input", this.dataString);

				}
			},
			passwordClick() {
				this.focus = true;
			},
			onInput(e) {
				const value = e.detail.value;
				this.setPasswordMask(value);
				this.error = this.parent.validationItem(this.name, this.dataString);
			},
			isError() {
				this.error = this.parent.validationItem(this.name, this.dataString);
				return !!this.error;
			},
		},
	};
</script>
<style scoped lang="scss">
	.input-label {
		color: #666;
		font-size: 26rpx;
		font-weight: 500;
	}

	.input-box {
		display: flex;
		align-items: center;
		width: 650rpx;
		height: 100rpx;
		background: #F5F5F5;
		border-radius: 50px;

		.input {
			flex: 1;
			height: 100rpx;
			line-height: 100rpx;
			padding-left: 44rpx;
		}
	}

	.err {
		padding: 16rpx 0;
		margin-left: 44rpx;
		font-size: 24rpx;
		color: $uni-color-error;
	}
</style>
