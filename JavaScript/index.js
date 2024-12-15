// 1
let cantidad = 1;
let cart = [];

// 2
async function loadProducts() {
    try {
        const response = await fetch ('../productos.json');
        const productos = await response.json();
        displayProductos(productos);
    } catch (error) {
        console.error('Error al cargar los productos:', error);

    }
}
// 3
function  displayProductos(productos) {
    const productList = document.querySelector('.cards');
    productos.forEach(product => { 
        const article = document.createElement('article');
        article.classList.add('cards__card');
        article.innerHTML = `
            <div class="card__img">
                <img src="${product.imagen}" alt="${product.nombre}">
            </div>
            <div class="card_descripcion">
                <h4 class="descripcion_categoria">${product.categoria}</h4>
                <h2 class="descripcion_nombre">${product.nombre}</h2>
                <p class="descripcion_precio">$${product.precio}</p>
            </div>
            <button onclick="addToCart(${product.id}, this)" class="card__btn-shop">
               <i class="ri-shopping-bag-line"></i>
                Añadir al carrito
            </button>
            <div class="card__cantidad" id="card__cantidad-${product.id}">
                <button class="cantidad__btn-remove" onclick="decrementarProducto(${product.id})">
                   <i class="ri-close-circle-line"></i>
               </button>
                <div class="cantidad__numero" id="cantidad-${product.id}" data-id="${product.id}">
                    1
                </div>
                 <button class="cantidad__btn-add" onclick="incrementarProducto(${product.id})">
                    <i class="ri-add-circle-line"></i>
                </button>
            </div>
        `;
        productList.appendChild(article);
    });
}

// 4
function addToCart(productId, buttonElement) {
    const cantidadElement = document.getElementById(`cantidad-${productId}`);
    const quantity = parseInt(cantidadElement.textContent, 10);

    const existingProduct = cart.find(item => item.id === productId);
    
    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        fetch('../productos.json')    
        .then(response => response.json())
        .then(productos => {
            const product = productos.find(p => p.id === productId);
            if (product) {
                cart.push({...product, quantity: quantity});
                displayCart();
            }
        })
        .catch(error => console.error('Error al obtener el producto', error));
    }

    buttonElement.style.display = 'none';

    const cantidadContainer = buttonElement.nextElementSibling;
    cantidadContainer.style.display = 'flex';

    const cardImgElement = buttonElement.closest('.cards_card').querySelector('.card_img');
    cardImgElement.classList.add('active');
}

// 5
    function incrementarProducto(productId) {
        const cantidadElemento = document.getElementById(`cantidad-${productId}`);
        let cantidad = parseInt(cantidadElemento.textContent, 10);
        cantidad++;
        cantidadElemento.textContent = cantidad;

        const producto = cart.find(item => item.id === productId);
        if (producto) {
            producto.quantity = cantidad;
        }

        displayCart();
    }

// 6
    function decrementarProducto(productId) {
        const cantidadElemento = document.getElementById(`cantidad-${productId}`);
        let cantidad = parseInt(cantidadElemento.textContent, 10);

        if (cantidad > 1) {
            cantidad--;
            cantidadElemento.textContent = cantidad;
        } else {
            cantidad = 0;

            cart = cart.filter(item => item.id !== productId);

            const cantidadContainer = cantidadElemento.parentElement;
            const buttonElement = cantidadContainer.previousElementSibling;
            cantidadContainer.style.display = 'none';
            buttonElement.style.display = 'inline-block';

            const cardImgElement = buttonElement.closest(`.cards__card`).querySelector(`.card__img`);
            cardImgElement.classList.remove('active');
        }

        const producto = cart.find(item => item.id === productId);
        if (producto) {
            producto.quantity = cantidad;
        }

        displayCart();
    }
// 7
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);

        const cantidadContainer = document.getElementById(`cantidad-${productId}`).parentElement;
        const buttonElement = cantidadContainer.previousElementSibling;
        cantidadContainer.style.display = 'none';
        buttonElement.style.display = 'inline-block';

        const cantidadElemento = document.getElementById(`cantidad-${productId}`);
        cantidadElemento.textContent = 1;

        const cardImgElement = buttonElement.closest('.cards__card').querySelector('.card__img');
        cardImgElement.classList.remove('active');

        displayCart();
    }  

// 8
    function displayCart() {
        const cartList = document.querySelector('.cart-list__items');
        const cartHeader = document.querySelector('.cart-list h2');
        cartList.innerHTML = '';  

        let total = 0;

        if (cart.length === 0) { 
            cartList.innerHTML = `
                <div class="items__img">
                    <img src="../assets/images/barrita.png" alt="Barrita">
                </div>
                <p> Tus suplementos aparecerán acá </p>
            `;
        } else {
            cart.forEach(item => {
                total += item.precio * item.quantity;
                cartList.innerHTML += `
                    <div class="items__item">
                            <h4>${item.nombre}</h4>
                        <div class="item__detalles">
                                <p>${item.quantity} x <span>${item.precio.toFixed(2)}</span></p>
                                <p>$${(item.precio * item.quantity).toFixed(2)}</p>
                            <button onclick="removeFromCart(${item.id})">
                                <i class="ri-close-line"></i>
                            </button>
                        </div>
                    </div>
                `;
            });

            const totalContainer = document.createElement('div');
            totalContainer.classList.add('item__total');
            totalContainer.innerHTML = `
                <div>
                    <span>Total a pagar</span>
                     <span class="total__monto">${total.toFixed(2)}</span>
                </div>
                <button class="btn" id="btn-checkout">Realizar pedido</button>
            `;
            cartList.appendChild(totalContainer);
        }

        const checkoutButton = document.getElementById('btn-checkout');
        if (checkoutButton) {
            // checkoutButton.addEventListener('click', mostrarModalPedido);
        }

        const totalItems = cart.reduce((acc,item) => acc + item.quantity, 0);
        cartHeader.textContent = `Tu carrito (${totalItems})`;
    }

// 9
    function mostrarModalPedido() {
        const pedidoDetalle = document.querySelector(".pedido__detalle");
        pedidoDetalle.innerHTML = '';

        let total = 0;


        cart.forEach(item => {
            total += item.precio * item.quantity;

            const detalleItem = document.createElement('div');
            detalleItem.classList.add('detalle__item');
            detalleItem.innerHTML = `
                <div class="item__pedido">
                    <div class="pedido__img">
                        <img src="${item.imagen}" alt="${item.nombre}">
                </div>
                    <div class="pedido__lista">
                    <p>${item.nombre}</p>
                    <p>${item.quantity} x <span>$${(item.precio).toFixed(2)}</span></p>
                </div>
                    <p>$${((item.precio).toFixed(2) * item.quantity).toFixed(2)}</p>
                </div>
            `;
            pedidoDetalle.appendChild(detalleItem);
        });

        const totalElement = document.createElement('div');
        totalElement.classList.add('pedido__total');
        totalElement.innerHTML = `
            <h4>Total:</h4>
            <h4>$${total.toFixed(2)}</h4>
        `;
        pedidoDetalle.appendChild(totalElement);

        document.getElementById('overlay').classList.add('active');
        document.getElementById('modal-pedido').classList.add('active');


    }

// 10

    function cerrarModalPedido () {
        document.getElementById('overlay').classList.remove('active');
        document.getElementById('modal-pedido').classList.remove('active');

        const cardImages = document.querySelectorAll('.card__img.active');
        cardImages.forEach(cardImg => {
            cardImg.classList.remove('active');
        });

        const cantidadContainers = document.querySelectorAll('.card__cantidad');
        cantidadContainers.forEach(cantidadContainers => {
            cantidadContainer.querySelector('.cantidad__numero').textContent = '1';
            cantidadContainer.style.display = 'none';

            const addToCartButton = cantidadContainer.previousElementSibling;
            if (addToCartButton.classList.contains('card__btn-shop')) {
                addToCartButton.style.display = 'block';
            }
        });

        const cartHeader = document.querySelector('.cart-list h2');
        cartHeader.textContent = 'Tu carrito (0)';

        cart.length = 0;
        displayCart();
    }

document.getElementById('btn-close').addEventListener('click', cerrarModalPedido);
// 
loadProducts();