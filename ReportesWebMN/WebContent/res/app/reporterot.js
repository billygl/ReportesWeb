function ReporteRotController($scope, $http, RestAPI, $timeout){
	var ctrl = this;

	
	this.$onInit = function() {
		$scope.titulo_procesado = ctrl.titulo;
		$timeout(function(){
			$('.rotativos').slick({
				  dots: true,
				  slidesToShow: 1,
				  slidesToScroll: 1,
				  autoplay: true,
				  autoplaySpeed: 7000,
		      });
		}, 1500);
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