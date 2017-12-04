function ReporteController($scope, $http){
	var ctrl = this;
	this.$onInit = function() {
		$scope.titulo_procesado = ctrl.titulo;
		//foreach de mybatis funciona con [N,D,] coma al final del arreglo
		//TODO why?
		$http.get("api/descargas?fromDate=01072016&toDate=31122016&shifts=[N,D,]")
	    .then(function(response) {
	    	//[{"fecha":1451797200000,"turno":"D","tonelaje":292.0,"categoria":"Desmonte","compDestino":"Botadero"}
	    	var data_procesada = [];
	    	console.log(response.data);
	    	for(var i = 0; i < response.data.length ; i++){
	    		var elemento = response.data[i];
	    		data_procesada.push([elemento.fecha, elemento.tonelaje]);	    		
	    	};
	    	console.log(data_procesada);
	    	Highcharts.chart({
	    		chart: {
	                renderTo: 'container',
	                defaultSeriesType: 'spline'	                
	            },
	            title: {
	                text: ctrl.titulo
	            },
	            xAxis: {
	                type: 'datetime',
	                tickPixelInterval: 150,
	                maxZoom: 20 * 1000
	            },
	            yAxis: {
	                minPadding: 0.2,
	                maxPadding: 0.2,
	                title: {
	                    text: 'Value',
	                    margin: 80
	                }
	            },
	            series: [{
	                name: 'Descargas',
	                data: data_procesada
	            }]
	    		
	    	});
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