function Culm(x, y, drawingAreaId) {
    this.initX = x;
    this.initY = y;
    this.minHeight = this.maxHeight / 1.2;

    var _this = this;

    function animate(){
        if(_this.anim_inCalculation) console.log(1);
        if(!_this.anim_inCalculation && _this.currentAnimation_x != null){
            _this.currentAnimation_y = _this.getAnimationPoint(_this.currentAnimation_x);
            _this.obj.path(_this.getPath(_this.currentAnimation_y));
            if(_this.currentAnimation_x < _this.anim_duration){
                _this.currentAnimation_x = _this.currentAnimation_x + _this.anim_speed;
            }
        }
        requestAnimationFrame(animate);
    };
    if(!drawingAreaId){
        this.obj = Environment.getDrawingArea().path(this.getPath());
    }else{
        this.setDrawingArea(drawingAreaId);
        this.obj = this.path(this.getPath());
    }

    requestAnimationFrame(animate);
};

/********************************************
 *  prototype : culm - inherits : path
 ********************************************/
Culm.prototype = inherit(Path.prototype);
Culm.prototype.getObject = function(){ return this.obj; };

Culm.prototype.currentAnimation_x = null;
Culm.prototype.currentAnimation_y = null;
Culm.prototype.anim_sign = 1;
Culm.prototype.anim_a = 100;
Culm.prototype.anim_b = 10;
Culm.prototype.anim_c = 0;
Culm.prototype.anim_d = 0;
Culm.prototype.anim_speed = 0.5;
Culm.prototype.anim_duration = 100;
Culm.prototype.anim_inCalculation = false;

//Culm.prototype.startAnimation = function() { this.currentAnimation_x = 0; };
Culm.prototype.setAnimationSpeed = function(speed){ this.anim_speed = speed; };

Culm.prototype.recalculateCurrentAnimation_x = function(){
    if(this.currentAnimation_x == null || this.currentAnimation_x > this.anim_duration){
        this.currentAnimation_x = 0;
    }else{

        var 
            fan = 0,
            fan_final_x = false,
            fbn = 0,
            xia = 0,
            xia_add = 1, 
            xib = 0,
            xib_add = -1,
            stop = false; 

        while(!stop){
            xib = xib + xib_add;
            xia = xia + xia_add;
            fbn = this.getAnimationPoint(xib);
            fan = this.getAnimationPoint(xia);

            //alert(fbn+' '+fan+' '+this.currentAnimation_y);

            if(Math.ceil(fbn*10) == Math.ceil(this.currentAnimation_y*10)){
                stop = true;
            }

            if(Math.ceil(fan*10) == Math.ceil(this.currentAnimation_y*10) && fan_final_x === false){
                fan_final_x = xia;
            }

            if(
                (
                    (this.currentAnimation_y > 0 && fbn > this.currentAnimation_y) ||
                    (this.currentAnimation_y < 0 && fbn < this.currentAnimation_y) 
                ) &&
                !stop
            ){
                xib = xib - xib_add;
                xib_add = xib_add / 2;
            }

            if(
                fan_final_x === false &&
                !stop &&
                (
                    (this.currentAnimation_y > 0 && fan > this.currentAnimation_y) ||
                    (this.currentAnimation_y < 0 && fan < this.currentAnimation_y) 
                )
            ){
                xia = xia - xia_add;
                xia_add = xia_add / 2;
            }
        }

        this.currentAnimation_x = fan_final_x;
        if(fan_final_x === false || (0 + xib) > (0 - fan_final_x)) this.currentAnimation_x = xib;
    }
};

Culm.prototype.recalculateAnimParams = function(sign, a){
    this.anim_inCalculation = true;

    this.anim_sign = -sign;
    this.anim_a = a;

    this.recalculateCurrentAnimation_x();

    this.anim_inCalculation = false;
};

Culm.prototype.getAnimationPoint = function(x){
    var point =  (Math.floor((
        //-(1/Math.PI)*(Math.log(this.anim_a)/Math.log(2))
        //this.anim_sign * Math.pow(2, -(x+(-(1/Math.PI)*(Math.log(this.anim_a)/Math.log(2)))-1)) * Math.sin(this.anim_b * Math.PI * x - this.anim_c) + this.anim_d
        //this.anim_sign * Math.pow(2, -(x+(-(Math.log(this.anim_a)/Math.log(2))-1))) * Math.sin(this.anim_b * Math.PI * x - this.anim_c) + this.anim_d
        //this.anim_sign * Math.pow(2, -(x+(-((Math.log(this.anim_a)-(1/(2*this.anim_b))*Math.log(2))/Math.log(2))-1))) * Math.sin(this.anim_b * Math.PI * x - this.anim_c) + this.anim_d
        this.anim_sign * (Math.pow(2, -(x/10)) * this.anim_a) * Math.sin((Math.PI / this.anim_b) * x - this.anim_c) + this.anim_d
        )*1000000)/1000000
    );
    return point;
};

Culm.prototype.move = function(windIntensity, windDirection, animationTime) {
        this.recalculateAnimParams(windDirection, windIntensity);
};

Culm.prototype.maxHeight = 200;
Culm.prototype.minHeight = null;
Culm.prototype.tilt = 0;
Culm.prototype.initUx1 = 0;
Culm.prototype.initUx2 = 0;
Culm.prototype.initUx = 0;
Culm.prototype.initUy1 = 0;
Culm.prototype.initUy2 = 0;
Culm.prototype.initUy = 0;
Culm.prototype.thickness1 = 0;
Culm.prototype.thickness2 = 0;

Culm.prototype.getX = function(){ return this.initX; };
Culm.prototype.getY = function(){ return this.initY; };
Culm.prototype.getHeight = function(){ return -this.initUy; }

Culm.prototype.getPath = function(windDirectionIntensity) {

    var this_windDirectionIntensity = windDirectionIntensity;
    windDirectionIntensity = null;

    var p = "M" + this.initX + "," + this.initY + " ";

    if (Math.random() > 0.5 && this.tilt == 0) {
        this.tilt = 1;
    } else if (this.tilt == 0) {
        this.tilt = -1;
    }


    var ux1, ux2, ux, uy1, uy2, uy;
    // path up
    if (uy1 == 0 || uy2 == 0 || uy == 0 || this.thickness1 == 0 || this.thickness2 == 0) {
        this.initUy1 = -(Math.floor(Math.random() * (this.minHeight / 2 - this.minHeight / 3)) + this.minHeight / 3);
        this.initUy2 = -(Math.floor(Math.random() * (this.minHeight - this.minHeight / 2)) + this.minHeight / 2);
        this.initUy = -(Math.floor(Math.random() * (this.maxHeight - this.minHeight)) + this.minHeight);
        this.thickness1 = (Math.floor(Math.random() * -this.initUy / 40) + -(this.initUy / 60));
        this.thickness2 = (Math.floor(Math.random() * -this.initUy / 40) + -(this.initUy / 60));
        this.initUx1 = -this.initUy / 20 * Math.random() * this.tilt;
        this.initUx2 = -this.initUy / 20 * Math.random() * this.tilt;
        this.initUx = -this.initUy / 30 * Math.random() * this.tilt;
    }
    if (
        typeof this_windDirectionIntensity == "undefined"
    ) {
        ux1 = this.initUx1;
        ux2 = this.initUx2;
        ux = this.initUx;
        uy1 = this.initUy1;
        uy2 = this.initUy2;
        uy = this.initUy;
    } else {
        var windDirectionIntensity = -this_windDirectionIntensity;
        //console.log(windDirectionIntensity);
        // ux1 = this.initUy1 * windDirectionIntensity * 0.6;
        // ux2 = this.initUy2 * windDirectionIntensity * 0.2;
        // ux = this.initUy * windDirectionIntensity;
        // //console.log('ux '+ux);
        // uy1 = -Math.sqrt((this.initUy1 * this.initUy1) - (ux1 * ux1));
        // uy2 = -Math.sqrt((this.initUy2 * this.initUy2) - (ux2 * ux2));
        // uy = -Math.sqrt((this.initUy * this.initUy) - (ux * ux));
        // //console.log('uy '+uy);

        // ux1 = this.initUx1;
        // ux2 = this.initUx2;
        // ux = this.initUx;
        // uy1 = this.initUy1;
        // uy2 = this.initUy2;
        // uy = this.initUy;


        ux1 = this.initUx1 + windDirectionIntensity  * 0.1;
        ux2 = this.initUx2 + windDirectionIntensity  * 0.2;
        ux = this.initUx + windDirectionIntensity;
        //console.log('ux '+ux);
        uy1 = -Math.sqrt((this.initUy1 * this.initUy1) - (ux1 * ux1));
        uy2 = -Math.sqrt((this.initUy2 * this.initUy2) - (ux2 * ux2));
        uy = -Math.sqrt((this.initUy * this.initUy) - (ux * ux));
    }
    //alert(uy1+","+uy2+","+uy);
    p += "c" + ux1 + "," + uy1 + " " + ux2 + "," + uy2 + " " + ux + "," + uy;
    // path down
    var dx1, dx2, dx, dy1, dy2, dy;
    dx1 = ux2 - ux + this.thickness1;
    dx2 = ux1 - ux + this.thickness2;
    dx = -ux;
    dy1 = -(uy - uy2);
    dy2 = -(uy - uy1);
    dy = -uy;
    p += "c" + dx1 + "," + dy1 + " " + dx2 + "," + dy2 + " " + dx + "," + dy;

    this_windDirectionIntensity = null;

    return p;
};

Culm.prototype.moveStatic = function(windDirectionIntensity){
    //console.log( Environment.getCulms()[0]);
    Environment.getCulms()[0].path(this.getPath(windDirectionIntensity));
};

Culm.prototype.developMode = function(){
    Environment.getDrawingArea().circle(this.initX, this.initY, -this.initUy).attr({"fill-opacity":0.2});
};

Culm.prototype.delete = function(){
    delete this;
};
