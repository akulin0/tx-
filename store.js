class Store {
	data = {};
	//监听页面状态改变
	watch(uniapp,key) {
		const data = getCurrentPages();
		let _data = data.pop();
		_data[this.key] = key;
		_data.uniapp = uniapp;
		uniapp[key] = this.data;
	}
	//设置页面状态
	setData(data) {
		const _pages = getCurrentPages();
		this.data = data;
		_pages.map((item) => {
			const key = item[this.key];
			if (key) {
				item.uniapp[key] = data;
			}
		});
	}
}
export default Store;
