<!doctype html>
<!--[if lt IE 7 ]> <html lang="en" class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="no-js ie8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="en" class="no-js"><!--<![endif]-->

<head>
	<title>Flakes Example Usage</title>

	<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-touch-fullscreen" content="yes">
	<meta charset="UTF-8" />

	<link rel="stylesheet" type="text/css" href="res/css/all.css">
	
</head>

<body ng-app="reportes">
	<!--[if lt IE 7]>
		<p class="chromeframe" style="background:#eee; padding:10px; width:100%">Your browser is <em>ancient!</em> <a href="http://browsehappy.com/">Upgrade to a different browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to experience this site.</p>
	<![endif]-->

	<div class="flakes-frame">

		<div class="flakes-navigation">
			<a href="/" class="logo">
				<img src="res/img/logo.png" width="120">
			</a>

			<ul>
				<li class="title">Reportes</li>
				<li><a href="#!reporte1">Reporte 1</a></li>
				<li><a href="#!reportex1">Reporte X 1</a></li>
				<li><a href="#!reportex2">Reporte X 2</a></li>
				<li><a href="#!reportex3">Reporte X 3</a></li>
			</ul>

			<p class="foot">
				Bienvenido, <b>user</b><br>
				<a href="">Mi cuenta</a> &bullet; <a href="">Salir</a>
			</p>
		</div>

		<div class="flakes-content">

			<div class="flakes-mobile-top-bar">
				<a href="" class="logo-wrap">
					<img src="res/img/logo.png" height="30px">
				</a>

				<a href="" class="navigation-expand-target">
					<img src="res/img/site-wide/navigation-expand-target.png" height="26px">
				</a>
			</div>

			<div class="view-wrap">	
				<div ng-controller="frecuentesCtrl">
				<button class="button-darkblue" ng-click="agregar()">Agregar frecuente</button><br>				
				Frecuentes: <span ng-repeat="reporte in frecuentes">- {{reporte}}</span><br>
				Nro. Frecuentes: {{frecuentes.length}}
				</div>				
				<div ng-view>REPORTE</div>
			</div>
		</div>
	</div>
	<link rel="stylesheet" type="text/css" href="res/css/gridforms.css">
	<script src="res/js/angular.min.js"></script>
	<script src="res/js/angular-route.min.js"></script>	
	<script src="res/js/jquery.min.js"></script>
	<script src="res/js/snap.min.js"></script>
	<script src="res/js/responsive-elements.js"></script>
	<script src="res/js/gridforms.js"></script>
	<script src="res/js/flask.js"></script>
	<script src="res/app/app.js"></script>		
	<script src="res/app/reporte.js"></script>		
</body>
</html>