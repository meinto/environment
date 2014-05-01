function Culm(x, y) {

    var initX = x;
    var initY = y;

    var maxHeight = 200;
    var minHeight = maxHeight / 1.2;

    var
            tilt = 0,
            initUx1 = 0,
            initUx2 = 0,
            initUx = 0,
            initUy1 = 0,
            initUy2 = 0,
            initUy = 0,
            thickness1 = 0,
            thickness2 = 0;

    var _this = this;

    this.getX = function(){
        return initX;
    }

    this.getY = function(){
        return initY;
    }

    function getPath(windDirectionIntensity) {

        var _pathThis = this;

        this.windDirectionIntensity = windDirectionIntensity;

        windDirectionIntensity = null;

        var p = "M" + initX + "," + initY + " ";

        if (Math.random() > 0.5 && tilt == 0) {
            tilt = 1;
        } else if (tilt == 0) {
            tilt = -1;
        }


        var ux1, ux2, ux, uy1, uy2, uy;
        // path up
        if (uy1 == 0 || uy2 == 0 || uy == 0 || thickness1 == 0 || thickness2 == 0) {
            initUy1 = -(Math.floor(Math.random() * (minHeight / 2 - minHeight / 3)) + minHeight / 3);
            initUy2 = -(Math.floor(Math.random() * (minHeight - minHeight / 2)) + minHeight / 2);
            initUy = -(Math.floor(Math.random() * (maxHeight - minHeight)) + minHeight);
            thickness1 = (Math.floor(Math.random() * -initUy / 40) + -(initUy / 60));
            thickness2 = (Math.floor(Math.random() * -initUy / 40) + -(initUy / 60));
            initUx1 = -initUy / 20 * Math.random() * tilt;
            initUx2 = -initUy / 20 * Math.random() * tilt;
            initUx = -initUy / 30 * Math.random() * tilt;
        }
        if (typeof _pathThis.windDirectionIntensity == "undefined") {
            ux1 = initUx1;
            ux2 = initUx2;
            ux = initUx;
            uy1 = initUy1;
            uy2 = initUy2;
            uy = initUy;
        } else {
            var windDirectionIntensity = -_pathThis.windDirectionIntensity;
            //console.log(windDirectionIntensity);
            ux1 = initUy1 * windDirectionIntensity * 0.6;
            ux2 = initUy2 * windDirectionIntensity * 0.2;
            ux = initUy * windDirectionIntensity;
            //console.log('ux '+ux);
            uy1 = -Math.sqrt((initUy1 * initUy1) - (ux1 * ux1));
            uy2 = -Math.sqrt((initUy2 * initUy2) - (ux2 * ux2));
            uy = -Math.sqrt((initUy * initUy) - (ux * ux));
            //console.log('uy '+uy);
        }
        //alert(uy1+","+uy2+","+uy);
        p += "c" + ux1 + "," + uy1 + " " + ux2 + "," + uy2 + " " + ux + "," + uy;
        // path down
        var dx1, dx2, dx, dy1, dy2, dy;
        dx1 = ux2 - ux + thickness1;
        dx2 = ux1 - ux + thickness2;
        dx = -ux;
        dy1 = -(uy - uy2);
        dy2 = -(uy - uy1);
        dy = -uy;
        p += "c" + dx1 + "," + dy1 + " " + dx2 + "," + dy2 + " " + dx + "," + dy;

        this.windDirectionIntensity = null;
        _pathThis = null;

        return p;
    }

    this.move = function(windDirectionIntensity, animationTime) {

        var _moveThis = this;

        this.windDirectionIntensity = windDirectionIntensity;
        this.animationTime = animationTime;

        windDirectionIntensity = null;
        animationTime = null;

        var animationPath = getPath(this.windDirectionIntensity);
        _this.obj.stop().animate({path: animationPath}, _moveThis.animationTime, function() {
            var backToTheRootsPath = getPath();
            _this.obj.stop().animate({path: backToTheRootsPath}, 4000, mina.elastic);
        });

        this.windDirectionIntensity = null;
        this.animationTime = null;
        _moveThis = null;
    };

    this.moveStatic = function(windDirectionIntensity){
        Environment.getDrawingArea().path(getPath(windDirectionIntensity)).attr({fill: "blue"});
    }

    this.developMode = function(){
        Environment.getDrawingArea().circle(initX, initY, -initUy).attr({"fill-opacity":0.2});
    };

    this.delete = function(){
        delete _this;
    }
    
    this.obj = Environment.getDrawingArea().path(getPath()).attr({fill: "green"});
}