
function Showcase(drawingAreaId) {
	if(drawingAreaId) this.drawingAreaId = drawingAreaId;
};

Showcase.prototype.drawingAreaId = 'environment';

/***************************
** showcase culm animation
***************************/

Showcase.prototype.culmAnimation = function(x, y){
	var culm = new Culm(x, y, this.drawingAreaId);
	culm.setAnimationSpeed(0.1);
	culm.recalculateAnimParams(-1, 80);
	var initPath = culm.drawAnimationCurve();
	console.log(initPath.initX);
	// setTimeout(function(){
	// 	culm.recalculateAnimParams(1, 100);
	// 	var secPath = culm.drawAnimationCurve();
	// },100);
	// culm.startAnimation();
}

/***************************
** culm extensions
***************************/

Culm.prototype.drawAnimationCurve = function(){
	var initX = this.getX();
	var initY = this.getY() - this.getHeight() - 30;
    var p = 'M'+initX+','+initY+' ';
    for(var point = 0; point < 100; point = point+1){
        p = p+'L'+(initX-(this.getAnimationPoint(point)))+','+(initY-point)+' ';
    }
    for(var point = 100; point > 0; point = point-1){
        p = p+'L'+(initX-(this.getAnimationPoint(point)))+','+(initY-point)+' ';
    }

    var path = new Path(this.dawingArea);
    path.path(p, {
        'stroke-width' : '2',
        'stroke' : 'black'
    });

    return path;
};