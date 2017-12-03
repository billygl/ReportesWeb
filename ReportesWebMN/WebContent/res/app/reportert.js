function ReporteRTController($scope){
	var ctrl = this;
	$scope.socket = {
		client: null,
		stomp: null
	};
	$scope.notify = function(/** Message */ message) {		
		console.log(message.body);//Reporte
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