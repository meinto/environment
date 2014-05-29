function Wind(){

	var direction = 1;

	var intensityMax = 0.22;
	var intensityMin = 0.02;
	var intensity = randomBetweenExact(intensityMin, intensityMax);

	var speedMax = 20;
	var speed = 0;

	var _this = this;

	var gustDirection, gustIntensity;

	var active = true;
	var nextGust = 1000;
	function windController(){
		setTimeout(function(){
			if(active){
				_this.setDirection();
				_this.setIntensityAndSpeed();
				
				var gustObject = new GustOfWind(_this.getDirection(), _this.getIntensity(), _this.getSpeed());
				gustObject.gust();
				gustObject = null;

				nextGust = _this.getTimeToNextGust();
			}
			windController();
		}, nextGust);
	};
	windController();

	this.setDirection = function(){
		// -1 = ost;
		// 1 = west;
		direction = (randomBetweenExact(0,1) > 0.5) ? 1 : -1;
		$('#wind-direction').html((direction == 1) ? 'Westen' : 'Osten');
	};

	this.changeDirection = function(newDirection){
		direction = newDirection;
	};

	this.setIntensityAndSpeed = function(){
		var variance = randomBetweenExact(-0.005,0.005);
		if((intensity+variance) < intensityMax && (intensity+variance) > intensityMin)
			intensity += variance;
		$('#wind-intensity').html(Math.floor(1000/intensityMax*intensity)/10);

		var intensityPercent = 100/intensityMax*intensity;
		speed = speedMax*(1-(intensityPercent/100));
	};

	this.getTimeToNextGust = function(){
		return randomBetween(200,2000);
	};

	this.getDirection = function(){
		return direction;
	}

	this.getIntensity = function(){
		return intensity;
	}

	this.getSpeed = function(){
		return speed;
	}

	this.stopIt = function(){
		active = false;
	}
}

function GustOfWind(direction, intensity, speed) {
	var _this = this;

	this.direction = direction;
	this.intensity = intensity;
	this.speed = speed;

	direction = null;
	intensity = null;
	speed = null;

	var tempCulms = Environment.getCulms();
	var startingCulm = Math.floor((tempCulms.length-1) * Math.random());
	var endCulm =  Math.floor((tempCulms.length-1) * Math.random()) + startingCulm * this.direction;
	var culmNr = startingCulm;
	this.gust = function(){
		var timeout = setTimeout(function(){ doTheGust(); } , _this.speed);
	};

	function doTheGust(){
		tempCulms[culmNr].move(_this.intensity, _this.direction, 500);

		if(_this.direction > 0)
			culmNr++;
		else
			culmNr--;

		//console.log(culmNr);

		if((_this.direction > 0 && culmNr < endCulm && culmNr < tempCulms.length) || (_this.direction < 0 && culmNr >= endCulm && culmNr > 0))
			_this.gust();
		else {
			_this.direction = null;
			_this.intensity = null;
			_this.speed = null;
			_this = null;
		}
	};
}