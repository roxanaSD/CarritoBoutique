//BASE DE DATOS
	var IVA = 0.16;
	var uniUser;

	pro=[
		{"nombre":"Blusa","imagen":"productos/p1.jpg","precio":"120","stock":"8"},
		{"nombre":"Pantal&oacute;n Mezclilla","imagen":"productos/p2.jpg","precio":"275","stock":"15"},
		{"nombre":"Vestido Flores","imagen":"productos/p3.jpg","precio":"380","stock":"4"},
		{"nombre":"Chamarra","imagen":"productos/p4.jpg","precio":"510","stock":"4"},
		{"nombre":"Short","imagen":"productos/p5.jpg","precio":"150","stock":"6"},
		{"nombre":"Sueter","imagen":"productos/p9.jpg","precio":"250","stock":"4"},
		{"nombre":"Blusa Casual","imagen":"productos/p10.jpg","precio":"100","stock":"5"},
		{"nombre":"Vestido","imagen":"productos/p13.jpg","precio":"350","stock":"2"},
		{"nombre":"Camisa Corta","imagen":"productos/p6.jpg","precio":"170","stock":"3"},
		{"nombre":"Traje","imagen":"productos/p7.jpg","precio":"540","stock":"5"},
		{"nombre":"Chamarra","imagen":"productos/p8.jpg","precio":"480","stock":"4"},
		{"nombre":"Sudadera","imagen":"productos/p11.jpg","precio":"180","stock":"3"},
		{"nombre":"Playera Deportiva","imagen":"productos/p12.jpg","precio":"120","stock":"8"},
		{"nombre":"Gorra","imagen":"productos/p14.jpg","precio":"170","stock":"6"},
		{"nombre":"Sort","imagen":"productos/p15.jpg","precio":"250","stock":"4"}
	];

//JAVASCRIPT A EJECUTARSE UNA VEZ CARGADA LA PAGINA:
	window.onload = function(){


		//Se cargan los productos dentro del HTML de forna dinamica haciendo uso de los datos de la base de datos, como si de un PHP se tratase:
		var DIVS = document.getElementById("menuProducto");
		for (i in pro){
			DIVS.innerHTML = DIVS.innerHTML + '<div class=" col-xl-2 card col-md-4 card-deck mb-5 text-center mt-5 ml-5 pl-1"><b><span id="pro'+i+'">'+pro[i].nombre+ '<br/><hr></span><img id="imgP'+i+'" class="rounded-circle" src="' +pro[i].imagen+ '"><br/>Precio:$<span id="pre'+i+'">' +pro[i].precio+ '</span><div class="stock">Hay disponible <span id="uni'+i+'">' +pro[i].stock+ '</span> unidades<br/>Cuantas quiere?:<br/><input class="uniBien" type="number" "id="uniUser'+i+'" name="uniUser" value="0" size="3"/></div></div>';
	}

		//Botones que llevaran a cabo la ejecucion de determinadas secuencias de codigo JavaScript:
		document.getElementById("botonTotal").onclick = validaLasUnidades;
	}

//FUNCION DE VALIDACION DE UNIDADES:
	function validaLasUnidades(elEvento) {

		var todoBien = true;
		uniUser = document.getElementsByName("uniUser");

		for (i in pro ){

			if ( uniUser[i].value == "" || uniUser[i].value > pro[i].stock || uniUser[i].value < 0 ){

				todoBien = false;
				uniUser[i].className = "uniMal";
				alert("Ya no hay productos existentes");

				//Modifica el css para quitar los formularios:
				document.getElementById("todo").className = "todoNo";
				document.getElementById("menu").className = "menuNo";
				document.getElementById("divTotal").className = "divsNo";

				//Con solo un error se para la validacion de unidades:
				return;
			}
			else{
				todoBien = true;
				uniUser[i].className = "uniBien";
			}
		}

		//Si no ha habido ni un solo error, se ejecuta la siguiente funcion que se encarga de cargar el carro de la compra:
		if (todoBien){
			calculaElTotal();
		}
	}

//FUNCION QUE MUSTRA EL CARRO DE LA COMPRA:
	function calculaElTotal(elEvento) {

		//Aniade el encabezado de la tabla
		document.getElementById("tablaTotal").innerHTML = '<tr><td class="pro"><b>Producto</b><td class="im"><b>Imagen</b></td><td class="uni"><b>Unidades</b></td><td class="preUni"><b>Precio Unidad</b></td><td class="preTotal"><b>Precio Total</b></td></tr>';

		//Inicializacion de las variables para esta funcion:
		var carroTotal = 0;
		var numProductos = 0;

		//Muestra el carrito de la compra
		for (i in pro){

			var tablaTotal = document.getElementById("tablaTotal").innerHTML;
			var preTotal = 0;

			if (uniUser[i].value != 0){

				//Modifica el css para hacer hueco a los formularios
				document.getElementById("todo").className = "todoSi";
				document.getElementById("menu").className = "menuSi";
				document.getElementById("divTotal").className = "divsSi";

				//Calcula el totalUnidades y rellena el carro de la compra
				preTotal = pro[i].precio * uniUser[i].value;
				carroTotal = carroTotal + preTotal;
				document.getElementById("tablaTotal").innerHTML = tablaTotal + '<tr class="proCarrito"><td><td> <img src="'+pro[i].imagen + '" alt="'+ pro[i] +'"></td>' +pro[i].nombre+ '</td><td>' +uniUser[i].value+ '</td><td>' +"$"+pro[i].precio+ '</td><td id="preTotal' +i+'" name="preTotal">' +"$"+preTotal+ '</td></tr>';
			}
		}

		if (carroTotal>0) {
			var totalIVA = (carroTotal * IVA);
			var totalAPagar = carroTotal + totalIVA;
		}

		totalIVA = totalIVA * 100;
		totalIVA = Math.floor (totalIVA);
		totalIVA = totalIVA/100;

		totalAPagar = totalAPagar * 100;
		totalAPagar = Math.floor(totalAPagar);
		totalAPagar = totalAPagar/100;

		//Se aniade a la tabla el TOTAL que suma el carrito:
		tablaTotal = document.getElementById("tablaTotal").innerHTML;
		document.getElementById("tablaTotal").innerHTML = tablaTotal + '<tr><td>&nbsp;</td>&nbsp;<td></td><td class="preUni"><b>Subtotal: </b></td><td class="preTotal"><b>' +"$ "+carroTotal+ '</b></td></tr>' + '<tr><td>&nbsp;</td>&nbsp;<td></td><td class="preUni"><b>IVA ('+(IVA*100)+'%): </b></td><td class="preTotal"><b>' +"$ "+totalIVA+ '</b></td></tr>' + '<tr><td>&nbsp;</td>&nbsp;<td></td><td class="preUni"><b>Total: </b></td><td class="preTotal" id="totalAPagar"><b>' +"$ "+totalAPagar+ ' </b></td></tr>';

		alert("Gracias por su compra");
	}
