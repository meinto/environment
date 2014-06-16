/********************************************
 *	helper functions
 ********************************************/

function inherit(proto) {
	function F() {};
	F.prototype = proto;
	return new F;
}

window.requestAnimFrame = (function(){
  return   window.requestAnimationFrame       ||
	       window.webkitRequestAnimationFrame ||
	       window.mozRequestAnimationFrame    ||
	       window.oRequestAnimationFrame      ||
	       window.msRequestAnimationFrame     ||
	       function (callback) {
	           setTimeout(callback, 16);
	       };
})();

/* 
###################################################################### 
######################################################################
*/

/********************************************
 *	instance : svg
 ********************************************/
function SVG(id){
	if(!!id) this.setDrawingArea(id);
};

/********************************************
 *	prototype : svg
 ********************************************/
SVG.prototype = {
	drawingArea : document.getElementById('environment'),
	svgNameSpace : 'http://www.w3.org/2000/svg',
	xmlNameSpace : 'http://www.w3.org/2000/xmlns/',
	basetype : 'svg',
	setDrawingArea : function(id){
		this.drawingArea = document.getElementById(id);
	},
	path : function(pathString, options){
		if(this.basetype !== 'path' && this.basetype !== 'svg') return;

		var p;
		if(this.basetype == 'svg' || !this.getObject())
			p = new Path(this.drawingArea);
		else
			p = this.getObject();

		p.pathString = pathString;
		
		var normalizedPathString = p.pathString.replace(/[a-zA-Z]/g, '');
		normalizedPathString = normalizedPathString.replace(/\s|,/g, ':');
		pathArrayNumbers = normalizedPathString.split(':');
		p.initX = pathArrayNumbers[0];
		p.initY = pathArrayNumbers[1];

		if($.type(options) == 'object')
			p.attrs = $.extend({}, p.attrs, options); // pathOptions
		p = p.draw();

		pathString = null;
		options = null;

		if(this.basetype == 'svg' || !this.getObject())
			return p;
	},
	circle : function(x, y, r, options){
		if(this.basetype !== 'circle' && this.basetype !== 'svg') return;

		var c;
		
	}
};

/* 
###################################################################### 
######################################################################
*/

/********************************************
 *	instance : path
 ********************************************/
function Path(drawingArea){
	if(!!drawingArea) this.drawingArea = drawingArea;
	Path.count++;
};
Path.count = 0;

/********************************************
 *	prototype : path - inherits : svg
 ********************************************/
Path.prototype = inherit(SVG.prototype);
Path.prototype.initialized = false;
Path.prototype.basetype = 'path';
Path.prototype.type = 'path';
Path.prototype._id = 'path-0';
Path.prototype.attrs = {
	'fill' : '#008000'
};
Path.prototype.initX = 0;
Path.prototype.initY = 0;
Path.prototype.getObject = function(){
	return this;
};
Path.prototype.draw = function(){
	var p = this.drawingArea.getElementById(this._id);
	var newPath = false;
	if(!p){
		this._id = 'path-'+Path.count;
		p = document.createElementNS(this.svgNameSpace , 'path');
		newPath = true;
	}

	p.setAttributeNS(null, 'd', this.pathString);
	
	if(newPath){
		$.each(this.attrs, function(key, val){
			p.setAttributeNS(null, key, val);
		});
		p.setAttributeNS(null, 'id', this._id);
		this.drawingArea.appendChild(p);
	}
	return this;
};

/* 
###################################################################### 
######################################################################
*/

/********************************************
 *	instance : circle
 ********************************************/

function Circle(drawingArea){
	if(!!drawingArea) this.drawingArea = drawingArea;
	Circle.count++;
};
Circle.count = 0;

 /********************************************
 *	prototype : circle - inherits : svg
 ********************************************/
Circle.prototype = inherit(SVG.prototype);
Circle.prototype.initialized = false;
Circle.prototype.type = 'circle';
Circle.prototype._id = 'circle-0';
Circle.prototype.attrs = {
	'fill' : '#008000'
};
Circle.prototype.initX = 0;
Circle.prototype.initY = 0;