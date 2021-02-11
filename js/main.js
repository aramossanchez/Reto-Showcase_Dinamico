let precioProducto = 0;
let PrecioTotal = 0;
let numArticulo = 0;
let cantidadArticulo = 0;
let nomArticulo = "";
let articuloLista = "";
let precioArticuloLista = 0;

const apuntarPrecio = (e) => {
    precioProducto = e;
    console.log(e);
    nomArticulo = event.target.alt;
}

const precioTotal = (event) => {
    if (precioProducto!=0){/*DE ESTA MANERA EVITAMOS QUE AL METER UN PRODUCTO DE LA LISTA, SE AÑADA ESE MISMO PRODUCTO PERO CON PRECIO 0*/
        if (numArticulo==0){
            let lista = document.getElementById("lista").innerHTML;
            lista = lista + `<p id="precio-final">Precio final: <span id="precio-total">0</span> euros.</p>`;
            document.getElementById("lista").innerHTML = lista;
        }
        
        if (cantidadArticulo>8 & precioProducto!=0) {
            window.alert("No puedes añadir más de 9 artículos a tu menú.")
            
        }else{
            numArticulo++;
            cantidadArticulo++;
        event.preventDefault();
        PrecioTotal = PrecioTotal + precioProducto;
        let lista = document.getElementById("lista").innerHTML;
        lista = lista + `<p id="articulo${numArticulo}" class="articulo-comprado" draggable="true" ondragstart="obtenerArticuloLista(event)" ondrag="encenderPapelera()" ondragend="apagarPapelera()">${nomArticulo}: ${precioProducto} euros.</p>`;
        document.getElementById("lista").innerHTML =lista;
        document.getElementById("precio-total").innerHTML = PrecioTotal.toFixed(2);
        precioProducto = 0;
        }
        
    }
}

const encenderCesta = () => document.getElementById("cesta").style.backgroundColor = "red";

const apagarCesta = () => {
    document.getElementById("cesta").style.backgroundColor = "initial"; 
    precioProducto=0;
}

const permitirDrop = (event) => event.preventDefault();

const obtenerArticuloLista = (event) => {
    articuloLista = (event.target.id);
    let buscarPrecio = document.getElementById(articuloLista).innerHTML;
    let primerCaracter = buscarPrecio.indexOf(":");
    let ultimoCaracter = buscarPrecio.indexOf("euros");
    primerCaracter=primerCaracter+2;
    ultimoCaracter--;
    let precio = buscarPrecio.slice(primerCaracter,ultimoCaracter);
    precioArticuloLista = parseFloat(precio);
    console.log(precioArticuloLista);
}

const borrarArticuloLista = (event) => {
    event.preventDefault();
    cantidadArticulo--;
    let lista = document.getElementById("lista");
    let parrafo = document.getElementById(articuloLista);
    lista.removeChild(parrafo);
    PrecioTotal = PrecioTotal - precioArticuloLista;
    if (PrecioTotal <= 0){/*CON ESTO EVITAMOS POSIBLES ERRORES DE PRECIOS NEGATIVOS EN EL REDONDEO DEL PRECIO FINAL*/
        PrecioTotal = 0;
    }
    document.getElementById("precio-total").innerHTML = PrecioTotal.toFixed(2);
}

const encenderPapelera = () => document.getElementById("papelera").style.backgroundColor = "red";

const apagarPapelera = () => document.getElementById("papelera").style.backgroundColor = "initial";