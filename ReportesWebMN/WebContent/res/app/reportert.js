function ReporteRTController($scope){
	var ctrl = this;
	$scope.socket = {
		client: null,
		stomp: null
	};
	$scope.contador = 0;
	$scope.reportes = [];
	$scope.notify = function(/** Message */ message) {		
		var reporte = JSON.parse(message.body);//Reporte		
		$scope.reportes.push(reporte.titulo + "-" + $scope.contador);
		$scope.$apply(function(){
			$scope.contador++;
		});
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
		$scope.socket.client.onclose = $scope.reconnect;
	};
	
	$scope.initSockets();
	
	this.$onInit = function() {
		$scope.titulo_procesado = ctrl.titulo;		
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