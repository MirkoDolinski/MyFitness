document.addEventListener('DOMContentLoaded', () => {
    const botones = document.querySelectorAll('.opcionOperacion');

    botones.forEach(boton => {
        boton.addEventListener('click', (evento) => {
            mostrarNuevoContenedorOperacion(evento.target);
        });
    });
});

function mostrarNuevoContenedorOperacion(botonOrigen){
    const contenedorPanelOperacion = document.getElementById('panelOperacion');
    const accionBoton = botonOrigen.id;
    if (accionBoton === 'verStock'){
        mostrarStock(contenedorPanelOperacion);
    } else if (accionBoton === 'registrarCompra'){
        registrarCompra(contenedorPanelOperacion);
    } else if (accionBoton === 'ingresarMaterial'){
        calcularIngresarMaterial(contenedorPanelOperacion);
    }
}

async function mostrarStock(contenedorPanelOperacion) {
    document.getElementById('panelOperacion').innerHTML = `<h3>Consultar Stock</h3>`;
    
    try {
        const response = await fetch('obtenerStock.php');
        const stock = await response.json();

        if (stock.length === 0) {
            contenedorPanelOperacion.innerHTML += `<p>No hay productos en stock.</p>`;
            return;
        }

        stock.forEach(producto => {
            let itemProductoStock = document.createElement('li');
            itemProductoStock.textContent = `${producto.nombre_producto}: ${producto.cantidad_producto} en stock`;
            contenedorPanelOperacion.appendChild(itemProductoStock);
        });
    } catch (error) {
        console.error('Error al obtener el stock:', error);
        contenedorPanelOperacion.innerHTML = `<p>Error al obtener el stock.</p>`;
    }
}

function registrarCompra(contenedorPanelOperacion) {
    contenedorPanelOperacion.innerHTML = `<h3>Elija el tipo de compra a realizar</h3>`;
    
    const botonCompraSuelta = document.createElement('button');
    botonCompraSuelta.textContent = 'Compra suelta';
    botonCompraSuelta.className = 'opcionRegistroCompra';
    botonCompraSuelta.id = 'botonCompraSuelta';

    const botonCompraKit = document.createElement('button');
    botonCompraKit.textContent = 'Compra de Kit o familia de equipamiento';
    botonCompraKit.className = 'opcionRegistroCompra';
    botonCompraKit.id = 'botonCompraKit';

    const contenedorFormularioCompra = document.createElement('div');
    contenedorFormularioCompra.id = 'contenedorFormularioCompra';

    contenedorPanelOperacion.appendChild(botonCompraSuelta);
    contenedorPanelOperacion.appendChild(botonCompraKit);
    contenedorPanelOperacion.appendChild(contenedorFormularioCompra);

    botonCompraSuelta.addEventListener('click', () => {
        mostrarFormularioCompraSuelta(contenedorFormularioCompra);
    });    
    botonCompraKit.addEventListener('click', () => {
        mostrarFormularioCompraKit(contenedorFormularioCompra);
    });
}

function mostrarFormularioCompraSuelta(contenedorFormularioCompra) {
    contenedorFormularioCompra.innerHTML = ''; 

    const formularioCompraSuelta = document.createElement('form');
    formularioCompraSuelta.innerHTML = `<h3>Registrar Compra Suelta</h3>`;
    formularioCompraSuelta.id = 'formCompraSuelta';

    fetch('obtenerStock.php')
    .then(response => response.json())
    .then(stock => {
        stock.forEach(producto => {
            const etiquetaCampo = document.createElement('label');
            etiquetaCampo.textContent = `${producto.nombre_producto} (${producto.cantidad_producto} disponibles)`;
            etiquetaCampo.setAttribute('for', `cantidad-${producto.nombre_producto}`);
            formularioCompraSuelta.appendChild(etiquetaCampo);

            const selectorCantidad = document.createElement('input');
            selectorCantidad.type = 'number';
            selectorCantidad.min = 0;
            selectorCantidad.max = producto.cantidad_producto;
            selectorCantidad.id = `cantidad-${producto.nombre_producto}`;
            selectorCantidad.placeholder = `0`;
            formularioCompraSuelta.appendChild(selectorCantidad);
        });

        const botonSubmitSuelta = document.createElement('button');
        botonSubmitSuelta.type = 'submit';
        botonSubmitSuelta.textContent = 'Registrar Compra';
        formularioCompraSuelta.appendChild(botonSubmitSuelta);

        formularioCompraSuelta.addEventListener('submit', (event) => {
            event.preventDefault();
            console.log('Formulario enviado');
        });

        contenedorFormularioCompra.appendChild(formularioCompraSuelta);
    })
    .catch(error => {
        console.error('Error al obtener el stock:', error);
    });
}