(function () {
	function Step() {
		this.init();
		return this.step;
	}

	Step.prototype = {
		init: function () {
			var _this = this;
			_this.flag = false;
			_this.step = {
				count: 0,
				timestamp: null
			};

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
						_this.step.count++;
						_this.step.timestamp = new Date().getTime();
						_this.flag = false;
					};

				}
			}

			if (window.DeviceMotionEvent && window.DeviceOrientationEvent) {
				window.addEventListener("devicemotion", motionHandler, false);
				window.addEventListener("deviceorientation", orientationHandler, false);
				return _this.step;
			}
		},
	}
	window.Step = Step;
})();
