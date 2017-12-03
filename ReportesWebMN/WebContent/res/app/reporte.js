function ReporteController($scope){
	var ctrl = this;
	this.$onInit = function() {
		$scope.titulo_procesado = ctrl.titulo;		
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