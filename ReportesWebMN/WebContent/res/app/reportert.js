function ReporteRTController($scope){
	var ctrl = this;
	$scope.socket = {
		client: null,
		stomp: null
	};
	$scope.contador = 0;
	$scope.reportes = [];
	$scope.chart = {};
	$scope.notify = function(/** Message */ message) {		
		var reporte = JSON.parse(message.body);//Reporte		
		$scope.reportes.push(reporte.titulo + "-" + $scope.contador);
		$scope.$apply(function(){
			$scope.contador++;
		});
		var point = [(new Date()).getTime(), 50];
		var series = $scope.chart.series[0],
        shift = series.data.length > 20; // shift if the series is 
                                         // longer than 20
	    // add the point
        $scope.chart.series[0].addPoint(point, true, shift);  
	};	
	$scope.reconnect = function() {
		setTimeout($scope.initSockets, 10000);
	};	
	$scope.send = function(){
		$scope.socket.stomp.send("/app/getreporte", {},
				JSON.stringify({id:0, titulo: "titulo 1", descripcion:""}));		
	}
	$scope.initSockets = function() {
		var CHANNEL1= "/reporte/reporte1";
		$scope.socket.client = new SockJS('socket');
		$scope.socket.stomp = Stomp.over($scope.socket.client);
		$scope.socket.stomp.connect({}, function() {
			$scope.socket.stomp.subscribe(CHANNEL1, $scope.notify);
		});
		$scope.socket.stomp.debug = null;
		$scope.socket.client.onclose = $scope.reconnect;
	};
	
	$scope.initSockets();
	
	this.$onInit = function() {
		$scope.titulo_procesado = ctrl.titulo;
		$scope.chart = new Highcharts.Chart({
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
	            name: 'Random data',
	            data: []
	        }]
	    });  
	};
}
angular.module('reportes')
.component("reportert", {
  templateUrl: "res/tpl/reportert.html",
  controller: ReporteRTController,
  bindings: {
	  titulo: '@'
  }
});