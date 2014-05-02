function Environment(){

	// enviromnent parameter

	var windowWidth = $(window).width();
	var windowHeight = $(window).height();

	var drawingAreaId = 'environment';
	
	// should only be manipulated via getter and setter methods
	var drawingArea, drawingArea_right, drawingArea_left;

	// Lawn
	var culmStartingPointVarianz_x = 40;
	var culmStartingPointVarianz_y = 40;
	var culmDistance = 5;
	var firstCulmStartingPoint_x = 0;
	var firstCulmStartingPoint_y = windowHeight-40;
	var numberOfDynamicCulmsOnLawn = 100;



	// 
	var wind;
	var culms = [];
	var _this = this;

	/*
	 *	private functions
	 */
	$(window).resize(function(){
		windowWidth = $(window).width();
		windowHeight = $(window).height();
		redrawLawn();
	});

	function redrawLawn(){
		var mostRightCulm_x = culms[culms.length-1].getX();

		if(mostRightCulm_x > windowWidth){
			removeCulmFromLawn();
		}

		if(mostRightCulm_x < windowWidth){
			pushCulmToLawn();
		}
	}

	function pushCulmToLawn(){
		var x = firstCulmStartingPoint_x+(culmDistance*culms.length)+randomBetween(0,culmStartingPointVarianz_x);
		var y = firstCulmStartingPoint_y+randomBetween(0,culmStartingPointVarianz_y);
		createCulm(x,y);
		var mostRightCulm_x = culms[culms.length-1].getX();
		if(mostRightCulm_x < windowWidth){
			pushCulmToLawn();
		}
	}

	function removeCulmFromLawn(){
		culms[culms.length-1].obj.remove();
		culms[culms.length-1].obj.delete();
		delete culms[culms.length-1].obj;
		culms.splice(culms.length-1,1);
		var mostRightCulm_x = culms[culms.length-1].getX();
		if(mostRightCulm_x > windowWidth){
			removeCulmFromLawn();
		}
	}

	function createCulm(x,y){
		culms[culms.length] = new Culm(x,y);
	};
	
	/*
	 *	object functions
	 */
	this.setDrawingArea = function(customDrawingAreaId){
		drawingAreaId = customDrawingAreaId;
		if(!!drawingAreaId){
			drawingArea = new Snap(drawingAreaId);
			firstCulmStartingPoint_y = $(drawingArea.node).outerHeight() - 60;
		}
	}

	/*
	 *		TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	 */
	// this.prepareEndlessDrawingAreaX = function(){
	// 	var wrapper = $('<div class="environmentWrapper"></div>');
	// 	wrapper.css({
	// 		width:$(drawingAreaId).css('width'),
	// 		height:$(drawingAreaId).css('height'),
	// 		position:'relative',
	// 	});
	// 	$(drawingAreaId).wrap(wrapper);
	// 	var leftPart = $('<div class="left-part"></div>');
	// 	var rightPart = $('<div class="right-part"></div>');
	// 	var css = {
	// 		position:'absolute',

	// 	}
	// 	$(drawingAreaId).before(leftPart);
	// 	$(drawingAreaId).after(rightPart);
	// }

	this.makeWind = function(){
		wind = new Wind();
	}

	this.stoppWind = function(){
		wind.stopIt();
	}
	
	this.drawCulm = function(startX, startY){
		createCulm(startX,startY);
	}

	this.drawLawn = function(startX, startY, single){
		if(!!startX)
			firstCulmStartingPoint_x = startX;
		if(!!startY)
			firstCulmStartingPoint_y = startY;
		if(!!single)
			createCulm(startX,startY);
		else
			pushCulmToLawn();
	}

	/* 
	 * global functions
	 */
	Environment.getDrawingArea = function(){
		if(!drawingArea){
			drawingArea = new SVG(drawingAreaId);
		}
		return drawingArea;
	};

	Environment.getCulms = function(){
		return culms;
	};

	// this.stopMoving = function(){

	// };

	// this.moveRight = function(){
	// 	var drawingAreaWidth = $(drawingAreaId).css('width');
	// 	var drawingAreaMargin = $(drawingAreaId).css('margin-left');
	// 	$(drawingAreaId).animate({width:"+=500", marginLeft:"-=500"}, 20000, 'linear', function(){
	// 		_this.moveRight();
	// 	});
	// };

	this.developMode = function(){
        $.each(culms, function(index, object){
        	object.developMode();
        });
    };
}