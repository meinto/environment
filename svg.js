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
}

/********************************************
 *	prototype : svg
 ********************************************/
SVG.prototype = {
	drawingArea : document.getElementById('environment'),
	svgNameSpace : 'http://www.w3.org/2000/svg',
	xmlNameSpace : 'http://www.w3.org/2000/xmlns/',
	type : 'svg',
	setDrawingArea : function(id){
		this.drawingArea = document.getElementById(id);
	},
	path : function(pathString, options){
		var p;
		if(this.type == 'svg')
			p = new Path(this.drawingArea);
		else
			p = this.getObject();
		p.pathString = pathString;
		if($.type(options) == 'object')
			p.attrs = $.extend({}, p.attrs, options); // pathOptions
		p = p.draw();

		pathString = null;
		options = null;

		if(this.type == 'svg')
			return p;
	}
}

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
}
Path.count = 0;

/********************************************
 *	prototype : path - inherits : svg
 ********************************************/
Path.prototype = inherit(SVG.prototype);
Path.prototype.initialized = false;
Path.prototype.type = 'path';
Path.prototype._id = 'path-0';
Path.prototype.attrs = {
	'fill' : '#008000'
};
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
		p.setAttributeNS(null, 'fill', this.attrs.fill);
		p.setAttributeNS(null, 'id', this._id);
		this.drawingArea.appendChild(p);
		return this;
	}
}

/* 
###################################################################### 
######################################################################
*/