function ReporteController($scope, $http, RestAPI, $filter){
	var ctrl = this;
	
	//TODO add filtros dinámicos
	$scope.categorias = [];
	$scope.isGraph = false;
	$scope.parse = function(data){
		if(!ctrl.tipo){
    		ctrl.tipo = 'categoria';
    	}
    	var data_group = _.chain(data)
    	.groupBy(function(elem){return elem[ctrl.tipo]})
    	.map(function(value, key){//value del atributo del objeto
    	  //value;//array
    	  total = _.reduce(value, function(memo, obj){return memo + obj.tonelaje}, 0)
    	  return {grupo: key, total: total};
    	})
    	.sortBy(function(elem){return elem.grupo;})
    	.value();
    	
    	$scope.categorias = _.pluck(data_group, "grupo");
    	$scope.data = _.pluck(data_group, "total");
    	
    	if(!$scope.isGraph){
    		$scope.graph();
    	}else{    		
    		$scope.chart.xAxis[0].setCategories($scope.categorias);
    		$scope.chart.series[0].setData($scope.data);
    	}
	};
	$scope.search = function(){
		//var API_DESCARGAS = "api/descargas?fromDate=01072016&toDate=31072016&shifts=N,D";
		RestAPI.query({
			reporte: "descargas",
			fromDate: $filter('date')($scope.fromDate, "ddMMyyyy"),
			toDate: $filter('date')($scope.toDate, "ddMMyyyy"),
			shifts: _.values($scope.turno)//"N,D"
		}).$promise.then(function(data) {
		      $scope.parse(data);
	    });
	}
	$scope.graph = function(){
		$scope.chart = Highcharts.chart('container' + ctrl.titulo, {
		    chart: {
		        type: 'column'
		    },
		    title: {
		        text: $scope.titulo_procesado
		    },
		    subtitle: {
		        text: '...'
		    },
		    xAxis: {		        
		        crosshair: true,
		        categories: $scope.categorias
		    },
		    yAxis: {
		        min: 0,
		        title: {
		            text: '... Tonelaje'
		        }
		    },
		    tooltip: {
		        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
		        footerFormat: '</table>',
		        shared: true,
		        useHTML: true
		    },
		    plotOptions: {
		        column: {
		            pointPadding: 0.2,
		            borderWidth: 0
		        }
		    },
		    series: [{
		        name: '... serie 1',
		        data: $scope.data
		    }]
		});	
	};
	this.$onInit = function() {
		$scope.titulo_procesado = ctrl.titulo;
		var hoy = new Date();
		hoy.setDate(hoy.getDate()-7);
		$scope.fromDate = hoy;
		$scope.toDate = new Date();
		$scope.turno = {d: "D", n: "N"};
		console.log(ctrl.titulo);
	};
}
angular.module('reportes')
.component("reporte", {
  templateUrl: "res/tpl/reporte.html",
  controller: ReporteController,
  bindings: {
	  titulo: '@',
	  tipo: '@'
  }
});