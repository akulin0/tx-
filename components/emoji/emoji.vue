<template>
    <view class="emotion-box" :style="{height: height + 'px'}">
        <view class="emotion-item" v-for="(item, index) in list" :key="index" @click="clickHandler(item)">
            <image :src="url1 + item.icon + url2" style="width: 68upx;height: 68upx;float: left;padding: 6upx;"></image>
        </view>
    </view>
</template>

<script>
    export default {
        props: {
            height: {
                type: Number,
                default: 200
            }
        },
        data() {
            return {
               list: [
                {
                	name: "微笑",
                	icon: "bg-weixiao",
                	pic: "/static/emoji/bg-weixiao.png",
                },
                {
                	name: "害羞",
                	icon: "bg-haixiu",
                	pic: "/static/emoji/bg-haixiu.png",
                },
                {
                	name: "努力",
                	icon: "bg-nuli",
                	pic: "/static/emoji/bg-nuli.png",
                },
                {
                	name: "惊恐",
                	icon: "bg-jingkong",
                	pic: "/static/emoji/bg-jingkong.png",
                },
                {
                	name: "笑哭",
                	icon: "bg-xiaoku",
                	pic: "/static/emoji/bg-xiaoku.png",
                },
                {
                	name: "悲伤",
                	icon: "bg-beishang",
                	pic: "/static/emoji/bg-beishang.png",
                },
                {
                	name: "帅气",
                	icon: "bg-shuaiqi",
                	pic: "/static/emoji/bg-shuaiqi.png",
                },
                {
                	name: "贪财",
                	icon: "bg-tancai",
                	pic: "/static/emoji/bg-tancai.png",
                },
                {
                	name: "偷笑",
                	icon: "bg-touxiao",
                	pic: "/static/emoji/bg-touxiao.png",
                },
                
                {
                	name: "闭嘴",
                	icon: "bg-bizui",
                	pic: "/static/emoji/bg-bizui.png",
                },
                {
                	name: "大哭",
                	icon: "bg-daku",
                	pic: "/static/emoji/bg-daku.png",
                },
                {
                	name: "大笑",
                	icon: "bg-daxiao",
                	pic: "/static/emoji/bg-daxiao.png",
                },
                {
                	name: "恶魔",
                	icon: "bg-emo",
                	pic: "/static/emoji/bg-emo.png",
                },
                {
                	name: "发怒",
                	icon: "bg-fanu",
                	pic: "/static/emoji/bg-fanu.png",
                },
                {
                	name: "飞吻",
                	icon: "bg-feiwen",
                	pic: "/static/emoji/bg-feiwen.png",
                },
                {
                	name: "搞怪",
                	icon: "bg-gaoguai",
                	pic: "/static/emoji/bg-gaoguai.png",
                },
                {
                	name: "囧",
                	icon: "bg-jiong",
                	pic: "/static/emoji/bg-jiong.png",
                },
                {
                	name: "可爱",
                	icon: "bg-keai",
                	pic: "/static/emoji/bg-keai.png",
                },
                {
                	name: "哭泣",
                	icon: "bg-kuqi",
                	pic: "/static/emoji/bg-kuqi.png",
                },
                {
                	name: "流汗",
                	icon: "bg-liuhan",
                	pic: "/static/emoji/bg-liuhan.png",
                },
                {
                	name: "流口水",
                	icon: "bg-liukoushui",
                	pic: "/static/emoji/bg-liukoushui.png",
                },
                {
                	name: "色",
                	icon: "bg-se",
                	pic: "/static/emoji/bg-se.png",
                },
                {
                	name: "睡觉",
                	icon: "bg-shuijiao",
                	pic: "/static/emoji/bg-shuijiao.png",
                },
                {
                	name: "叹气",
                	icon: "bg-tanqi",
                	pic: "/static/emoji/bg-tanqi.png",
                },
                {
                	name: "调皮",
                	icon: "bg-tiaopi",
                	pic: "/static/emoji/bg-tiaopi.png",
                },
                {
                	name: "为难",
                	icon: "bg-weinan",
                	pic: "/static/emoji/bg-weinan.png",
                },
                {
                	name: "再见",
                	icon: "bg-zaijian",
                	pic: "/static/emoji/bg-zaijian.png",
                },
                {
                	name: "OK",
                	icon: "bg-ok",
                	pic: "/static/emoji/bg-ok.png",
                },
                {
                	name: "点赞",
                	icon: "bg-dianzan",
                	pic: "/static/emoji/bg-dianzan.png",
                },
                {
                	name: "六",
                	icon: "bg-liu",
                	pic: "/static/emoji/bg-liu.png",
                },
                {
                	name: "弱",
                	icon: "bg-ruo",
                	pic: "/static/emoji/bg-ruo.png",
                },
                {
                	name: "伸手",
                	icon: "bg-shenshou",
                	pic: "/static/emoji/bg-shenshou.png",
                },
                {
                	name: "耶",
                	icon: "bg-yeah",
                	pic: "/static/emoji/bg-yeah.png",
                },
                {
                	name: "张手",
                	icon: "bg-zhangshou",
                	pic: "/static/emoji/bg-zhangshou.png",
                },
                {
                	name: "指引",
                	icon: "bg-zhiyin",
                	pic: "/static/emoji/bg-zhiyin.png",
                }
               ],
                reg: '/\S{1,3}/gi',
                item: [],
                url1: "/static/emoji/",
                url2: ".png"
            }
        },

        methods: {
            clickHandler(i) {
				let emotion = `[${i.name}];`;
                this.$emit('emotion', emotion)
            },
        }
    }
</script>

<style scoped>
    .emotion-box {
        margin: 0 auto;
        width: 100%;
        box-sizing: border-box;
        padding: 5px;
        overflow: hidden;
        overflow-y: auto;
        position: relative;
        bottom: 0;
        background: #FFFFFF;
    }

    .emotion-box-line {
        display: flex;
    }

    .emotion-item {
        flex: 1;
        text-align: center;
        cursor: pointer;
    }
</style>
