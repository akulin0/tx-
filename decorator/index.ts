import { sleep } from "@/utils/tools";

let _loadingTime = 0;
//加载中装饰器
export const Loading = (title?: string) => {
  return (target: any, methodName: any, desc: any) => {
    let isLoding = false;
    const oMethod = desc.value;
    desc.value = async function () {
      if (isLoding) return;
      isLoding = true;

      if (_loadingTime == 0) {
        uni.showLoading({
          title: title,
        });
		
      }
     
		_loadingTime++;
      try {
        await oMethod.apply(this, arguments);
      } catch (e) {}

      setTimeout(() => {
        _loadingTime--;
        if (_loadingTime <= 0) {
          _loadingTime = 0;
          uni.hideLoading();
        }

        isLoding = false;
      }, 500);
    };
  };
};

//表单提交初始
export const Form = (rules: any) => {
  return (target: any) => {
    let formData: any = {};
    target.prototype.formNames = Object.keys(rules).map((item) => {
      formData[item] = "";
      return item;
    });
    target.prototype.formData = formData;
    target.prototype.formRules = rules;
  };
};

//验证装饰器
export const Validation = (names?: any[]) => {
  return (target: any, methodName: any, desc: any) => {
    const oMethod = desc.value;
    desc.value = async function () {
      let errors: string[] = [];
      const _names: string[] = names || this.formNames;
      _names.map((item: string) => {
        const rules = this.formRules[item];
        if (rules) {
          const error = rules.call(this, this.formData[item]);
          if (error) {
            errors.push(error);
          }
        }
      });
      if (errors.length > 0) {
        uni.showModal({
          content: errors.join("\n"),
          showCancel: false,
        });
        throw errors;
      }
      await oMethod.apply(this, arguments);
    };
  };
};

//发送验证码装饰器
export const SendCode = (time?: any) => {
  return (target: any, methodName: any, desc: any) => {
    target.sendCodeTime = -1;
    const oMethod = desc.value;
    const downTime = (target: any) => {
      setTimeout(() => {
        target.sendCodeTime--;
        if (target.sendCodeTime >= 0) {
          downTime(target);
        }
      }, 1000);
    };

    desc.value = async function () {
      if (this.sendCodeTime >= 0) return;
      await oMethod.apply(this, arguments);
      this.sendCodeTime = time || 60;
      downTime(this);
    };
  };
};

//权限校验装饰器
export const Auth = () => {
  return (target: any, methodName: any, desc: any) => {
    const oMethod = desc.value;
    desc.value = async function () {
      const token = uni.getStorageSync("token");
      if (!token) {
        uni.showToast({
          icon: "none",
          title: "登录已失效",
        });

        await sleep(1000);
        uni.reLaunch({
          url: "/pages/login",
        });

        return;
      }
      await oMethod.apply(this, arguments);
    };
  };
};

//获取用户信息装饰器
export const UserInfo = () => {
  return (target: any) => {
    target.prototype.userInfo = {};
  };
};

//配置信息装饰器
export const Configs = () => {};
