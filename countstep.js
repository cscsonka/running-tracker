(function () {
	function Countstep() {
		this.init();
		return this.count;
	}

	Countstep.prototype = {
		init: function () {
			var _this = this;
			_this.flag = false;
			_this.count = 0;

			function motionHandler(event) {
				var accGravity = event.accelerationIncludingGravity;
				_this.yg = accGravity.y;
				return false;
			}

			function orientationHandler(event) {
				if ((_this.yg - 10 * Math.sin(event.beta * Math.PI / 180)) > 1) {
					_this.flag = true;
				}
				if ((_this.yg - 10 * Math.sin(event.beta * Math.PI / 180)) < -1) {
					if (_this.flag == true) {
						_this.count++;
						_this.timestamp = new Date().getTime();
						_this.flag = false;
					};

				}
			}

			if (window.DeviceMotionEvent && window.DeviceOrientationEvent) {
				window.addEventListener("devicemotion", motionHandler, false);
				window.addEventListener("deviceorientation", orientationHandler, false);
				return _this.count;
			}
		},
	}
	window.Countstep = Countstep;
})();
