
function Environment(){
	Environment.self = this;
};

Environment.windowWidth = $(window).width();
Environment.windowHeight = $(window).height();
Environment.self = null;
Environment.redrawLawn = function(){
	var mostRightCulm_x = Environment.self.culms[Environment.self.culms.length-1].getX();

	if(mostRightCulm_x > this.windowWidth){
		Environment.self.removeCulmFromLawn();
	}

	if(mostRightCulm_x < this.windowWidth){
		Environment.self.pushCulmToLawn();
	}
};
Environment.getDrawingArea = function(){
	if(!Environment.self.drawingArea){
		Environment.self.drawingArea = new SVG(Environment.self.drawingAreaId);
	}
	return Environment.self.drawingArea;
};
Environment.getCulms = function(){
	return Environment.self.culms;
};

Environment.prototype = {

	drawingAreaId : 'environment',
	
	// should only be manipulated via getter and setter methods
	drawingArea : null, 
	drawingArea_right : null, 
	drawingArea_left : null,

	// Lawn
	culmStartingPointVarianz_x : 40,
	culmStartingPointVarianz_y : 40,
	culmDistance : 5,
	firstCulmStartingPoint_x : 0,
	firstCulmStartingPoint_y : Environment.windowHeight-40,
	numberOfDynamicCulmsOnLawn : 100,

	wind : null,
	culms : [],

	pushCulmToLawn : function(){
		var x = this.firstCulmStartingPoint_x+(this.culmDistance*this.culms.length)+randomBetween(0,this.culmStartingPointVarianz_x);
		var y = this.firstCulmStartingPoint_y+randomBetween(0,this.culmStartingPointVarianz_y);
		this.createCulm(x,y);
		var mostRightCulm_x = this.culms[this.culms.length-1].getX();
		if(mostRightCulm_x < Environment.windowWidth){
			this.pushCulmToLawn();
		}
	},

	removeCulmFromLawn : function(){
		this.culms[this.culms.length-1].obj.remove();
		this.culms[this.culms.length-1].obj.delete();
		delete this.culms[this.culms.length-1].obj;
		this.culms.splice(this.culms.length-1,1);
		var mostRightCulm_x = this.culms[this.culms.length-1].getX();
		if(mostRightCulm_x > Environment.windowWidth){
			this.removeCulmFromLawn();
		}
	},

	createCulm : function(x,y){
		this.culms[this.culms.length] = new Culm(x,y);
	},

	setDrawingArea : function(customDrawingAreaId){
		this.drawingAreaId = customDrawingAreaId;
		if(!!this.drawingAreaId){
			this.drawingArea = new Snap(this.drawingAreaId);
			this.firstCulmStartingPoint_y = $(this.drawingArea.node).outerHeight() - 60;
		}
	},

	makeWind : function(){
		this.wind = new Wind();
	},

	stoppWind : function(){
		this.wind.stopIt();
	},

	drawCulm : function(startX, startY){
		this.createCulm(startX,startY);
	},

	drawLawn : function(startX, startY, single){
		if(!!startX)
			this.firstCulmStartingPoint_x = startX;
		if(!!startY)
			this.firstCulmStartingPoint_y = startY;
		if(!!single)
			this.createCulm(startX,startY);
		else
			this.pushCulmToLawn();
	},

	developMode : function(){
        $.each(this.culms, function(index, object){
        	object.developMode();
        });
    }
};

$(window).resize(function(){
	Environment.windowWidth = $(window).width();
	Environment.windowHeight = $(window).height();
	Environment.redrawLawn();
});