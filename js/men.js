let usuario
const usuarioLS = localStorage.getItem('user')
if (usuarioLS) {
    usuario = usuarioLS
}
Swal.fire(`Welcome to Men's section, ${usuario}. Choose your favourite clothes`)

/* CARRITO */
const carro = document.querySelector('#boton-carrito')
carro.addEventListener('click', () => {
    Toastify({
        text: `Go to"Home" -> "Your products" to buy!`,
        duration: 5000,
        gravity: 'top',
        className: 'UkeBJJ',
        style: {
            background: "linear-gradient(to right, lightblue , blue)",
          }
    }).showToast()
})

/* BOTON SWITCH */
const btnSwitch = document.querySelector('#switch');
btnSwitch.addEventListener('click', () => {
    document.body.classList.toggle('white');
    btnSwitch.classList.toggle('active');
});

const compra = document.querySelector('#compra')
compra.addEventListener('click', () => {

    Toastify({
        text: 'Please, scroll down to start shopping',
        duration: 5000,
        gravity: 'top',
        className: 'UkeBJJ',
        style: {
            background: "linear-gradient(to right, #383938 , #1A1A1A)",
          }
    }).showToast()
})

/* REMOVER DATOS DEL STORAGE */
const clearData = () => {
    localStorage.removeItem('user')
    localStorage.removeItem("nombre")
    localStorage.removeItem("apellido")
    localStorage.removeItem("numero")
    localStorage.removeItem("mail") 
    localStorage.removeItem('carrito') 
    window.location.reload()
}

document.querySelector("#clear-data").addEventListener('click', clearData)

const stockProductos = [
    {
        "id": 1,
        "nombre": "Kingz - Gi - White",
        "descripcion": "Material RipStop",
        "img": "../images/kingzwhite.webp",
        "precio": 100,
        "cantidad": 1
    },
    {
        "id": 2,
        "nombre": "Kingz - Gi - White",
        "descripcion": "Ultra Light",
        "img": "../images/kingzwhite2.webp",
        "precio": 90,
        "cantidad": 1
    },
    {
        "id": 3,
        "nombre": "Kingz - Gi - Grey",
        "descripcion": "The ONE",
        "img": "../images/kingzgrey.jpg",
        "precio": 200,
        "cantidad": 1
    },
    {
        "id": 4,
        "nombre": "Kingz - Gi - Green",
        "descripcion": "Ultra Light 2.0",
        "img": "../images/kingzgreen.webp",
        "precio": 150,
        "cantidad": 1
    },
    {
        "id": 5,
        "nombre": "Kingz - Gi - Blue",
        "img": "../images/kingzblue.webp",
        "precio": 100,
        "cantidad": 1
    },
    {
        "id": 6,
        "nombre": "Kingz - Gi - Black",
        "img": "../images/kingzblack.webp",
        "precio": 140,
        "cantidad": 1
    },
    {
        "id": 13,
        "nombre": "Koral - No Gi",
        "descripcion": "Pursue the Gentle Art",
        "img": "../images/koralycraman.jpg",
        "precio": 140,
        "cantidad": 1
    },
    {
        "id": 14,
        "nombre": "Koral - No Gi",
        "descripcion": "Pursue the Gentle Art",
        "img": "../images/koralycraman2.jpg",
        "precio": 140,
        "cantidad": 1
    },
    {
        "id": 15,
        "nombre": "Koral - No Gi",
        "descripcion": "Black & purple",
        "img": "../images/koralycraman3.jpg",
        "precio": 80,
        "cantidad": 1
    }
]


const productosContainer = document.querySelector('#productos-container')
const carritoContenedor = document.querySelector('#carrito-contenedor')

const contadorCarrito = document.querySelector('#contadorCarrito')
const precioTotal = document.querySelector('#precioTotal')
const btnVaciar = document.getElementById('vaciarCarrito')
const carritoEnLS = JSON.parse( localStorage.getItem('carrito') ) 

// generar el DOM de todos los productos
stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
            <img src="${producto.img}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p class="precioProducto">Precio: $${producto.precio}</p>
            <button id="cart" onclick="agregarAlCarrito(${producto.id})" class="btn btn-primary"><strong>Add to cart</strong><i class="fas fa-shopping-cart"></i></button>
         `
        productosContainer.append(div)   
})

const agregarAlCarrito = (productId) => {
    const itemInCart = carrito.find((producto) => producto.id === productId)
    if (itemInCart) {
        itemInCart.cantidad ++
        showMensaje(itemInCart.nombre)
    } else {
        const {id, nombre, precio} = stockProductos.find((producto) => producto.id === productId) 
        const itemToCart = {
        id,
        nombre, 
        precio, 
        cantidad: 1
    } 
    carrito.push(itemToCart)
    showMensaje(nombre, id)
    }

    localStorage.setItem('carrito', JSON.stringify(carrito))
    console.log(carrito)
    renderCarrito()
    renderCantidad()
    renderTotal()
}

// TOASTIFY AGREGAR PRODUCTO

const showMensaje = (nombre) => {

    Toastify({
        text: `Has been added "${nombre}"`,
        duration: 2000,
        gravity: 'bottom',
        position: 'right',
        style: {
            background: '#0d6efd',
        }
    }).showToast()
}

const removerDelCarrito = (id) => {
    const item = carrito.find((producto) => producto.id === id)
    deletedMensaje(item.nombre)

    item.cantidad -= 1
    if (item.cantidad === 0){
        const indice = carrito.indexOf(item)
        carrito.splice(indice, 1)
    }

    localStorage.setItem('carrito', JSON.stringify(carrito))
    renderCarrito()
    renderCantidad()
    renderTotal()
}

const deletedMensaje = (producto) => {
    Toastify({
        text: `"${producto}" has been deleted`,
        duration: 2000,
        gravity: 'bottom',
        position: 'right',
        style: {
            background: '#dc3545',
        }
    }).showToast()
}

const vaciarCarrito = () => {
    carrito.length = 0
    localStorage.setItem('carrito', JSON.stringify(carrito))
    renderCarrito()
    renderCantidad()
    renderTotal()
}

btnVaciar.addEventListener('click', () => {
    Swal.fire({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover the cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#dc3545',
        confirmButtonText: 'I agree',
        cancelButtonText: 'Cancel'
        
      }).then((result) => {
        if (result.isConfirmed) {
            vaciarCarrito ()
            Toastify({
                text: 'The cart has been deleted',
                position: 'center',
                gravity: 'center',
                duration: 4000,
                style:{
                    background: '#dc3545'
                }
            }).showToast ()
        }
      });
})

const renderCarrito = () => {
    carritoContenedor.innerHTML = ''
    carrito.forEach((item) => {
        const div = document.createElement('div')
        div.classList.add('productoEnCarrito')
        div.innerHTML = ` 
            <h3>${item.nombre}</h3>
            <p>${item.descripcion}</p>
            <p>Precio: $${item.precio}</p>
            <p class="card-text text-dark">Cantidad: ${item.cantidad}<p>
            <button onclick="removerDelCarrito(${item.id})" class="btn btn-warning"><i class="fas fa-trash-alt"></i></button>
            `
        carritoContenedor.append(div)
    })
}
/*             <img src="${item.img}"> */

const renderCantidad = () => {
    contadorCarrito.innerText = carrito.reduce((acc, producto) => acc + producto.cantidad, 0)
}

const renderTotal = () => {
    let total = 0
    carrito.forEach((producto) => {
        total += producto.precio * producto.cantidad
    })
    precioTotal.innerText = total
}

if (carritoEnLS) {
    carrito = carritoEnLS

    renderCarrito()
    renderCantidad()
    renderTotal()
} else {
    carrito = []
}