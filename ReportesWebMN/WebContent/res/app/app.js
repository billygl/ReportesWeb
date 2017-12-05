angular.module("reportes", ["ngRoute", "angular-underscore"])
.config(function($routeProvider) {
    $routeProvider
    .when("/reporte1", {
        templateUrl : "res/tpl/reporte1.html"
    })
    .when("/reportex1", {
    	template: "<reporte titulo='reporte x1'></reporte>"
    })
    .when("/reportex2", {
    	template: "<reporte titulo='reporte x2'></reporte>"
    })
    .when("/reportex3", {
    	template: "<reporte titulo='reporte x3'></reporte>"
    })
    .when("/reportert", {
    	template: "<reportert titulo='reporte rt'></reportert>"
    })
})
.controller("frecuentesCtrl", function($scope) {
    $scope.frecuentes = ["Flota"];    
    $scope.agregar = function(){
		$scope.frecuentes.push("Combustible" + $scope.frecuentes.length);
	}
});