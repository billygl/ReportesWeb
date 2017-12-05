function ReporteRTController($scope){
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
		console.log(cargas);
		//procesar datos
		//data = [[x, y], [x, y], [x, y], [x, y]]
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
		  date.setHours(+key);
		  return [date.getTime(), total];
		})
		.value();
        $scope.chart.series[0].setData(data);//data
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