function ReporteController($scope, $http){
	var ctrl = this;
	var API_DESCARGAS = "api/descargas?fromDate=01072016&toDate=31072016&shifts=N,D";
	//TODO add filtros dinámicos
	$scope.categorias = [];
	$scope.graph = function(){
		Highcharts.chart('container', {
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
		        categories: $scope.categorias,
		        crosshair: true
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
    	$http.get(API_DESCARGAS)
        .then(function(response) {
        	console.log(response.data);
        	
        	var categorias_group = _.chain(response.data)
        	.groupBy(function(elem){return elem.categoria})
        	.map(function(value, key){//value del atributo del objeto
        	  //value;//array
        	  total = _.reduce(value, function(memo, obj){return memo + obj.tonelaje}, 0)
        	  return {categoria: key, total: total};
        	})
        	.sortBy(function(elem){return elem.categoria;})
        	.value();
        	
        	$scope.categorias = _.pluck(categorias_group, "categoria");
        	$scope.data = _.pluck(categorias_group, "total");
        	$scope.graph();
        	/*var series = $scope.chart.series[0];
        	for(var i = 0; i < response.data.length / 50 ; i++){
        		var elemento = response.data[i];
        		var point = [elemento.fecha, elemento.tonelaje];	 
        		// add the point
        		var shift = series.data.length > 20;        		
       			$scope.chart.series[0].addPoint(point, true, shift);
                console.log(i);
        	};*/
        	
        });
	};
}
angular.module('reportes')
.component("reporte", {
  templateUrl: "res/tpl/reporte.html",
  controller: ReporteController,
  bindings: {
	  titulo: '@'
  }
});