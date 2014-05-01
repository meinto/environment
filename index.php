<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<style type="text/css">
		* {
			margin:0;
			box-sizing:border-box;
		}
		#log {
			width:80%;
			height:100px;
			background-color:#ccc;
			position:absolute;
			top:20px;
			left:50%;
			margin-left:-40%;
			padding:20px;
		}
	</style>
	<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
	<script type="text/javascript" src="snap.svg.js"></script>
</head>
<body>
	<svg id="environment"></svg>
	<div id="log">
		<div id="wind">
			<h3>Wind</h3>
			<p>Aktueller Windstoß kommt von <span id="wind-direction"></span></p>
			<p>Windstärke und Windgeschwindigkeit: <span id="wind-intensity"></span>%</p>
		</div>
	</div>
	<script type="text/javascript" src="gamecore.js"></script>
	<script type="text/javascript" src="helper.js"></script>
	<script type="text/javascript" src="environment.js"></script>
	<script type="text/javascript" src="culm.js"></script>
	<script type="text/javascript" src="wind.js"></script>
	<script type="text/javascript">
		var environment = new Environment();

		//environment.drawCulm(200,400);
		//Environment.getCulms()[0].moveStatic(-0.22);
		

		environment.drawLawn();
		//environment.developMode();
		//environment.prepareEndlessDrawingAreaX();
		//environment.moveRight();
		environment.makeWind();
	</script>
</body>
</html>