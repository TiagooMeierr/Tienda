
let cart = [];

const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.card');
        const productName = card.querySelector('.card-title').innerText;
        const productImage = card.querySelector('img').src;
        const productPrice = "Precio" 
        const existingProduct = cart.find(item => item.name === productName);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ name: productName, image: productImage, price: productPrice, quantity: 1 });
        }

        alert(`${productName} ha sido agregado al carrito`);
        updateCartCount();
        updateCartItems();
    });
});


function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
}


function updateCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = 'El carrito está vacío.';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="d-flex align-items-center mb-2">
                <img src="${item.image}" width="50" class="me-2" alt="${item.name}">
                <span>${item.name}</span>
                <span class="mx-2">x ${item.quantity}</span>
                <button class="btn btn-danger btn-sm ms-auto remove-item" data-name="${item.name}">Eliminar</button>
            </div>
        `).join('');
    }


    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-name');
            cart = cart.filter(item => item.name !== productName);
            updateCartCount();
            updateCartItems();
        });
    });
}


document.getElementById('cart-icon').addEventListener('click', () => {
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
    updateCartItems();
});
