function drawShopShare(ctx, item,isLocalLife) {
	console.log(item, '---------')
	//商品图

	//绘制一个白色的背景

	let height = isLocalLife ? 240:0;
	
	ctx.drawImage(item.pic[0], 0, 0, 470, 470 -height);
	//商品名称
	// ctx.setFontSize(26)
	ctx.font = 'normal 300 26px sans-serif';
	ctx.setFillStyle('#333333')
	let goodsname  = item.name.replace(/\s/g, "")
	if (goodsname.length > 30) {
		ctx.fillText(goodsname.substring(0, 16), 25, 500 -height);
		ctx.fillText(goodsname.substring(16, 28) + '...', 25, 530 -height);
	} else if (goodsname.length > 16) {
		ctx.fillText(goodsname.substring(0, 16), 25, 500 -height);
		ctx.fillText(goodsname.substring(16), 25, 530 -height);
	} else {
		ctx.fillText(goodsname, 25, 500 -height);
	}
	// debugger
	// 商品价格
	ctx.font = 'normal bold 36px sans-serif';
	ctx.setFillStyle('#FE0000')
	// #ifdef H5
	let price = '￥' + item.sellingPrice
	//#endif
	// #ifdef MP-WEIXIN
	let price = '￥' + item.tagPrice
	//#endif
	
	let pricesub = '￥' + item.markingPrice
	ctx.fillText(price, 25, 576 -height);
	let pw = ctx.measureText(price).width

	ctx.font = 'normal 400 24px sans-serif';
	// 商品删除线价格
	let w = ctx.measureText(pricesub).width
	console.log(22222)
	ctx.lineWidth = 1
	ctx.moveTo(45 + pw, 568 -height)
	ctx.lineTo(45 + w + pw + 10, 568 -height)
	ctx.stroke()
	ctx.setFillStyle('#999999')
	ctx.fillText(pricesub, 45 + pw, 576 -height);
	//分割线
	ctx.lineWidth = 1
	ctx.strokeStyle = '#EBEBEB'
	ctx.moveTo(0, 590 -height)
	ctx.lineTo(470, 590 -height)
	ctx.stroke()
	ctx.restore();
	



	// 用户昵称
	ctx.font = 'normal bold 28px sans-serif';
	ctx.setFillStyle('#333333')

	ctx.fillText(item.userName, 120, 670 -height);
	// 备注信息
	ctx.setFillStyle('#999999')
	ctx.font = 'normal 400 20px sans-serif';
	ctx.fillText("新一代娱乐社交电商", 26, 730 -height);
	ctx.fillText("邀你体验从未有过的购物乐趣", 26, 756 -height);
	// 长按解锁
	ctx.fillText("长按解锁", 340, 756 -height);

	// 二维码logo
	ctx.drawImage("/static/logo.png", 370, 650 -height, 30, 30);
	
	// 用户头像
	ctx.beginPath();
	var r = 40;
	var cx = 66;
	var cy = 660 -height;
	ctx.arc(cx, cy, r, 0, 20 * Math.PI);
	ctx.setFillStyle('#ffffff')
	ctx.fill();
	ctx.clip();
	ctx.drawImage(item.avatar, 26, 620 -height, 80, 80);
	ctx.stroke();
	ctx.restore();

}


export default drawShopShare
