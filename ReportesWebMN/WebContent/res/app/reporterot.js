function ReporteRotController($scope, $http, RestAPI, $filter){
	var ctrl = this;
	ctrl.slides = ["1", "2", "3", "4"];//not working last item
	
	this.$onInit = function() {
		$scope.titulo_procesado = ctrl.titulo;
		
	};
}
angular.module('reportes')
.component("reporterot", {
  templateUrl: "res/tpl/reporterot.html",
  controller: ReporteRotController,
  bindings: {
	  titulo: '@',
	  tipo: '@'
  }
});