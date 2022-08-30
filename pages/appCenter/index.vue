<template>
  <!--  应用中心-->
  <view class="appCenter">
    <view class="box" v-for="(i,k) in list" :key="k">
      <view class="title">{{ i.title }}</view>
      <view class="listBox">
        <view class="item" :class="{'logo': item.id === 'logo'}" @click="toLink(item)" v-for="(item,key) in i.child"
              :key="key">
          <view class="icon" :style="{backgroundImage: 'url('+item.icon+')'}">
          </view>
          <view class="name">{{ item.name }}</view>
        </view>
      </view>
    </view>

    <!--    底栏-->
    <view class="footer">— 生活好服务，尽在TelegramX —</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 数据
      list: [
        {
          title: 'TX便民生活',
          child: [
            {
              id: 'logo',
              icon: '/static/appCenter/logo.png',
              name: '我的资产',
              path: '',
              url: '',
              num: '95'
            }, {
              id: '',
              icon: '/static/appCenter/ic-exchangeRate.png',
              name: '汇率换算',
              path: '',
              url: '',
              num: '80'
            },
            {
              id: '',
              icon: '/static/appCenter/ic-phone.png',
              name: '充值中心',
              path: '',
              url: '',
              num: '10'
            },
            {
              id: '',
              icon: '/static/appCenter/ic-life.png',
              name: '生活缴费',
              path: '',
              url: '',
              num: '5'
            },
            {
              id: '',
              icon: '/static/appCenter/ic-plain.png',
              name: 'TX打车',
              path: '',
              url: '',
              num: '1'
            },
            {
              id: '',
              icon: '/static/appCenter/ic-truck.png',
              name: 'TX快递',
              path: '',
              url: '',
            },
            {
              id: '',
              icon: '/static/appCenter/ic-travel.png',
              name: 'TX旅行',
              path: '',
              url: '',
              num: '5'
            },
            {
              id: '',
              icon: '/static/appCenter/ic-car.png',
              name: '车生活',
              path: '',
              url: '',
              num: '1'
            },

          ]
        },
        {
          title: 'TX购物娱乐',
          child: [
            {
              id: '',
              icon: '/static/appCenter/ic-ele.png',
              name: '饿了么',
              path: '',
              url: '',
            },
            {
              id: '',
              icon: '/static/appCenter/ic-video.png',
              name: '电影演出',
              path: '',
              url: '',
            },
            {
              id: '',
              icon: '/static/appCenter/ic-ball.png',
              name: 'TX体育',
              path: '',
              url: '',
            },
            {
              id: '',
              icon: '/static/appCenter/ic-lottery.png',
              name: 'TX彩票',
              path: '',
              url: '',
              num: '20'
            },
            {
              id: '',
              icon: '/static/appCenter/ic-vip.png',
              name: 'TX会员',
              path: '',
              url: '',
              num: '30'
            },
          ]
        },
        {
          title: 'TX财富管理',
          child: [
            {
              id: '',
              icon: '/static/appCenter/ic-bag.png',
              name: '红包',
              path: '',
              url: '',
              num: '70'
            },
            {
              id: '',
              icon: '/static/appCenter/ic-flower.png',
              name: 'TX信用',
              path: '',
              url: '',
              num: '30'
            },
            {
              id: '',
              icon: '/static/appCenter/ic-up.png',
              name: 'TX股票',
              path: '',
              url: '',
            },
            {
              id: '',
              icon: '/static/appCenter/ic-money.png',
              name: 'TX保险',
              path: '',
              url: '',
            },
            {
              id: '',
              icon: '/static/appCenter/ic-wallet.png',
              name: 'TX定投',
              path: '',
              url: '',
              num: '10'
            },
          ]
        },
        {
          title: 'TX教育公益',
          child: [
            {
              id: '',
              icon: '/static/appCenter/ic-sport.png',
              name: 'TX运动',
              path: '',
              url: '',
            },
            {
              id: '',
              icon: '/static/appCenter/ic-heart.png',
              name: 'TX公益',
              path: '',
              url: '',
            },
            {
              id: '',
              icon: '/static/appCenter/ic-course.png',
              name: 'TX课堂',
              path: '',
              url: '',
              num: '30'
            },
          ]
        },
      ]
    };
  },
  methods: {
    // 跳转集中处理
    toLink(item) {
      if (item.id === 'logo') {
        // 跳转至我的资产页
        this.toPage('/pages/appCenter/myAssets')

      } else {
        // 显示提示框
        uni.showToast({
          title: `研发进程 ${item.num || 1}%`,
          icon: 'none'
        });
      }

      console.log(item);
    }
  }

};
</script>

<style scoped lang="scss">
.appCenter {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background-color: #f7f7f7;
  overflow: scroll;

  .box {
    margin: 24rpx 30rpx 0;
    padding: 34rpx 40rpx 48rpx;
    background-color: #ffffff;
    box-shadow: 0 4rpx 16rpx 2rpx rgba(0, 0, 0, 0.03);
    border-radius: 20rpx;
    border: solid 1rpx #e8e8e8;

    .title {
      color: #000000;
      font-size: 32rpx;
      font-weight: bold;
      margin-bottom: 38rpx;
    }

    .listBox {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(4, auto);
      align-items: center;
      justify-content: space-between;

      .item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-bottom: 34rpx;

        .icon {
          width: 48rpx;
          height: 48rpx;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          margin-bottom: 23rpx;
        }

        .name {
          font-size: 26rpx;
          color: #000000;
          letter-spacing: 2rpx;
        }

      }
    }
  }

  .footer {
    padding: 135rpx 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #bcbcbc;
    font-size: 28rpx;
    letter-spacing: 1rpx;
  }
}
</style>