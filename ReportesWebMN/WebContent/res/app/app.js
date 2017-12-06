angular.module("reportes", ["ngRoute", "ngResource", "angular-underscore"])
.config(function($routeProvider) {
    $routeProvider
    .when("/reporte1", {
        templateUrl : "res/tpl/reporte1.html"
    })
    .when("/reportex1", {
    	template: "<reporte titulo='reportex1' tipo='compDestino'></reporte>"
    })
    .when("/reportex2", {
    	template: "<reporte titulo='reportex2'></reporte>"
    })
    .when("/reportex3", {
    	template: "<reporte titulo='reportex3'></reporte>"
    })
    .when("/reportert", {
    	template: "<reportert titulo='reportert'></reportert>"
    })
})
.factory('RestAPI', function($resource) { 
	//?fromDate=01072016&toDate=31072016&shifts=N,D
	return $resource("api/:reporte", {reporte:'@reporte'}, {});
})
.controller("frecuentesCtrl", function($scope) {
    $scope.frecuentes = ["Flota"];    
    $scope.agregar = function(){
		$scope.frecuentes.push("Combustible" + $scope.frecuentes.length);
	}
})