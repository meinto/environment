function Culm(x, y) {
    this.initX = x;
    this.initY = y;
    this.minHeight = this.maxHeight / 1.2;

    var _this = this;

    function animate(){
        if(!_this.anim_inCalculation && _this.currentAnimation_x != null){
            //if(getAnimationPoint(_this.currentAnimation_x) > _this.anim_a)
               // console.log(getAnimationPoint(_this.currentAnimation_x));
            //__this.obj.path(getPath(getAnimationPoint(_this.currentAnimation_x)));
            _this.currentAnimation_y = _this.getAnimationPoint(_this.currentAnimation_x);
            _this.obj.path(_this.getPath(_this.currentAnimation_y));
            if(_this.currentAnimation_x < 100){
                _this.currentAnimation_x = _this.currentAnimation_x + _this.anim_speed;
            }
        }
        requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
    this.obj = Environment.getDrawingArea().path(this.getPath());
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
Culm.prototype.anim_speed = 0.01;
Culm.prototype.anim_inCalculation = false;

Culm.prototype.recalculateCurrentAnimation_x = function(){
    if(this.currentAnimation_x == null || this.currentAnimation_x > 10){
        this.currentAnimation_x = 0;
    }else{

        var 
            firstAfterNull = false,
            firstBeforeNull = false, 
            fan = 0,
            fan_tmp = 0,
            fan_stop = false,
            fbn = 0,
            fbn_tmp = 0,
            fbn_stop = false,
            xia = 0, 
            xib = 0,
            stop = false,
            _this = this; 

        // function calc() {
        //     xib = xib - 0.05;
        //     xia = xia + 0.05;
        //     fbn = _this.getAnimationPoint(xib);
        //     fan = _this.getAnimationPoint(xia);

        //     alert(fbn+' '+fan+' ## '+_this.currentAnimation_y);

        //     if(Math.abs(fan) > Math.abs(_this.currentAnimation_y) || Math.abs(fbn) > Math.abs(_this.currentAnimation_y)){
        //         stop = true;
        //     }else{
        //         fan_tmp = fan;
        //         fbn_tmp = fbn;
        //     }
        //     requestAnimationFrame(calc);
        // }
        // requestAnimationFrame(calc);

        while(!stop){
            xib = xib - 0.5;
            xia = xia + 0.5;
            fbn = this.getAnimationPoint(xib);
            fan = this.getAnimationPoint(xia);

            if(Math.abs(fan) > Math.abs(this.currentAnimation_y) || Math.abs(fbn) > Math.abs(this.currentAnimation_y)){
                stop = true;
            }else{
                fan_tmp = fan;
                fbn_tmp = fbn;
            }
        }

        this.currentAnimation_x = xia;
        if(Math.abs(this.currentAnimation_y - fan_tmp) > Math.abs(this.currentAnimation_y - fbn_tmp))
            this.currentAnimation_x = xib;

        // var new_x = (Math.asin(
        //                 ((Math.PI / this.anim_b) * this.currentAnimation_x - this.anim_d) /
        //                 this.anim_sign * (Math.pow(2, -(this.currentAnimation_x/10)) * this.anim_a)
        //             ) + this.anim_c) / this.anim_b;

        // console.log(new_x);

        // if(new_x > 1/this.anim_b)
        //     new_x = new_x - 1/this.anim_b;

        // this.currentAnimation_x = new_x;
        // new_x = null;
    }
};

Culm.prototype.recalculateAnimParams = function(sign, a){
    this.anim_inCalculation = true;

    this.anim_sign = -sign;
    this.anim_a = a;
    // anim_b = b;
    // anim_c = c;
    // anim_d = d;

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

Culm.prototype.drawAnimationCurve = function(){
    var p = 'M500,500 ';
    for(var point = 0; point < 100; point = point+1){
        p = p+'L'+(500+(this.getAnimationPoint(point)))+','+(500-(point))+' ';
    }
    for(var point = 100; point > 0; point = point-1){
        p = p+'L'+(500+(this.getAnimationPoint(point)))+','+(500-(point))+' ';
    }
    Environment.getDrawingArea().path(p, {
        'stroke-width' : '2',
        'stroke' : 'black'
    });
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
