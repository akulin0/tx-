import { guid } from "@/m-subpack/base";
class Store {
  _watch = {};
  data = {};

  watch(callBack) {
    const uuid = guid();
    this._watch[uuid] = {
      callBack,
    };
	console.log(this);
	callBack(this.data);
  }
  del() {
	  this.data = {}
  }
  changeData(data) {
	this.data = data;
    Object.keys(this._watch).map((item) => {
      const _item = this._watch[item];
      if (_item._isDestroyed) {
        delete this._watch[item];
      } else {
        _item.callBack(data);
      }
    });
  }
}


export const CaseStore = new Store()