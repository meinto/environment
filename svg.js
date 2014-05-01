function inherit(proto) {
	function F() {};
	F.prototype = proto;
	return new F;
}

function SVG(id){
	if(!!id) this.setDrawingArea(id); 
}
SVG.prototype = {
	drawingArea : document.getElementById('environment'),
	svgNameSpace : 'http://www.w3.org/2000/svg',
	setDrawingArea : function(id){
		this.drawingArea = document.getElementById(id);
	},
	path : function(options){
		console.log(this.drawingArea);
		var p = new Path(this.drawingArea);
		var _po = $.extend({}, p._do, options); // pathOptions
		p.draw(_po);
	}
}

function Path(drawingArea){
	if(!!drawingArea) this.drawingArea = drawingArea; 
}
Path.prototype = inherit(SVG.prototype);
Path.prototype._do = {
	'fill' : '#008000'
}
Path.prototype.draw = function(options){
	var p = document.createElementNS(svg.svgNameSpace , 'path');
	p.setAttributeNS(null, 'd', options.path);
	p.setAttributeNS(null, 'fill', options.fill);
	this.drawingArea.appendChild(p);
}