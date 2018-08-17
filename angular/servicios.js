var app = angular.module('paginacionApp.servicios',[]);

app.factory('Paises', ['$http', function($http){
		
		var self ={
			cargando: false,
			pagina: 1,
			total: 0,
			totalpaginas: 12,
			data:[{
				id:1,
				iso:"Es",
				nombre:"España"
			}],
			cargarUltima: function(){
				self.cargarData({
					pagina:self.totalpaginas
				});
			},
			cargarPrimera: function(){
				self.cargarData({
					pagina:1
				});
			},
			irA:function(pag){
				self.cargarData({
					pagina:pag
				});
			},
			cargarData:function( opciones ){
					self.cargando = true;
					self.pagina = opciones.pagina;

					$http.post('php/servicios/paises/getPaises.php',opciones)
					.success(function(data){
						console.log(data);
						self.cargando = false;
						self.totalpaginas = data.totalpaginas;
						self.total = data.total;
						self.data = data.data;

					})
					.error(function(error){
						console.log(error);
					});
			}
		}

		var defecto = {
			pagina:1
		};

		self.cargarData(defecto );

		return self;
}])