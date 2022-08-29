//---------------------------------------------------------------------
// github https://github.com/Sansnn/uQRCode
//---------------------------------------------------------------------

let uQRCode = {};

(function() {
	

	uQRCode = {
		
		defaults: {
			size: 258,
			margin: 0,
			backgroundColor: '#ffffff',
			foregroundColor: '#000000',
			fileType: 'png', // 'jpg', 'png'
			correctLevel: 3,
			typeNumber: -1,
			x:0,
			y:0,
		},

		make: function(options) {
			var defaultOptions = {
				canvasId: options.canvasId,
				componentInstance: options.componentInstance,
				text: options.text,
				size: this.defaults.size,
				margin: this.defaults.margin,
				backgroundColor: this.defaults.backgroundColor,
				foregroundColor: this.defaults.foregroundColor,
				fileType: this.defaults.fileType,
				correctLevel: this.defaults.correctLevel,
				typeNumber: this.defaults.typeNumber,
				x:this.defaults.x,
				y:this.defaults.y,
			};
			if (options) {
				for (var i in options) {
					defaultOptions[i] = options[i];
				}
			}
			options = defaultOptions;
			if (!options.canvasId) {
				console.error('uQRCode: Please set canvasId!');
				return;
			}

			function createCanvas() {
				// debugger
				var ctx = uni.createCanvasContext(options.canvasId, options.componentInstance);
				// options.width = options.size;
				// options.height = options.size;
				options.drawShopShare(ctx);
				// ctx.setFillStyle(options.backgroundColor);
				// ctx.fillRect(options.x, options.y, options.size, options.size);
				setTimeout(function() {
					ctx.draw(false, function() {
						setTimeout(function() {
							uni.canvasToTempFilePath({
								canvasId: options.canvasId,
								fileType: options.fileType,
								// width: options.width,
								// height: options.height,
								// destWidth: options.width*2,
								// destHeight: options.height*2,
								success: function(res) {
									options.success && options.success(res.tempFilePath);
								},
								fail: function(error) {
									options.fail && options.fail(error);
								},
								complete: function(res) {
									options.complete && options.complete(res);
								}
							}, options.componentInstance);
						}, options.text.length + 100);
					});
				}, 150);
			}
			
			createCanvas();
		}

	}

})()

export default uQRCode


function drawShopShare(ctx,ITEM){
	//商品图
	ctx.drawImage(ITEM.imgUrl,0,0,450,750);
	//商品名称
	ctx.fillText(ITEM.name,options.drawUserText.x,options.drawUserText.y);
}