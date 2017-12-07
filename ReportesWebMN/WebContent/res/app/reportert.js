function ReporteRTController($scope, $timeout){
	var ctrl = this;
	$scope.socket = {
		client: null,
		stomp: null
	};
	$scope.contador = 0;
	$scope.reportes = [];
	$scope.chart = {};
	$scope.notify = function(/** Message */ message) {};
	$scope.notify2 = function(message) {		
		var cargas = JSON.parse(message.body);//array de cargas		
		//procesar datos
		//data = [[x, y], [x, y], [x, y], [x, y]]
		if(cargas.length == 0)return;
		var acumulado = 0;
		var data = _.chain(cargas)
		.groupBy(function(obj){
			return obj.hora;
		})
		.map(function(list, key){
		  total = _.reduce(list, function(memo, obj){return memo + obj.tonelaje}, 0);
		  date = new Date();//timestamp desde sql
		  date.setMilliseconds(0);
		  date.setSeconds(0);
		  date.setMinutes(0);
		  date.setHours(+key);//-+GMT
		  acumulado += total;
		  return {
			  tonelaje: [date.getTime(), total],
			  acumulado: [date.getTime(), acumulado]
			  }
		})
		.value();
        $scope.chart.series[0].setData(_.pluck(data, 'tonelaje'));
        $scope.chart.series[1].setData(_.pluck(data, 'acumulado'));
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
		var CHANNEL2= "/reporte/reporte2";
		$scope.socket.client = new SockJS('socket');
		$scope.socket.stomp = Stomp.over($scope.socket.client);
		$scope.socket.stomp.connect({}, function() {
			$scope.socket.stomp.subscribe(CHANNEL1, $scope.notify);
			$scope.socket.stomp.subscribe(CHANNEL2, $scope.notify2);
		});
		$scope.socket.stomp.debug = null;
		$scope.socket.client.onclose = $scope.reconnect;
	};
	$scope.graph = function(){
		$scope.chart = Highcharts.chart($scope.container, {
	        chart: {
	            defaultSeriesType: 'spline',
	            events: {
	            	load: $scope.initSockets
	            }
	        },
	        title: {
	            text: ctrl.titulo
	        },
	        xAxis: {
	            type: 'datetime',
	            tickPixelInterval: 50,
	            maxZoom: 20 * 1000
	        },
	        yAxis: [
	        	{
					minPadding: 0.2,
					maxPadding: 0.2,
					labels: {
						style: {
							color: Highcharts.getOptions().colors[1]
						}
					},
					title: {
						text: '(Kt)',
						margin: 10
					}
				}, { // Secondary yAxis
					labels: {
						style: {
							color: Highcharts.getOptions().colors[1]
						}
					},
					title: {
						text: 'Acumulado',
						style: {
							color: Highcharts.getOptions().colors[1]
						}
					},					
					opposite: true
				}	        	
	        ],
	        series: [{
				name: 'Tonelaje',
				type: 'column',
				data: []
				}, {
					name: 'Acumulado',
					type: 'spline',
					yAxis: 1,
					color: '#cc0000',
					data: []
				}
			]
	    }); 
	}
	this.$onInit = function() {
		$scope.titulo_procesado = ctrl.titulo;
		$scope.container = 'cnrptrt'  + ctrl.titulo;
		//$scope.graph();
		//TODO improve
		$timeout($scope.graph, 1500);//la vista carga despues de $scope.graph. Esperamos 2 segundos
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