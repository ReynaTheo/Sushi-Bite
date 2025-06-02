document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector('.menu-button');
    const nav = document.querySelector('nav');

    menuButton.addEventListener('click', () => {
        nav.classList.toggle('show');
    });

    const cartItemsContainer = document.querySelector('.order-items');
    const totalPriceElement = document.getElementById('total-price');
    const placeOrderButton = document.querySelector('.place-order');
    const cancelOrderButton = document.querySelector('.cancel-order');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function formatPriceToNumber(priceStr) {
        return parseFloat(priceStr.replace(/[^\d.]/g, ''));
    }

    function formatNumberToPrice(num) {
        return `¥${num.toFixed(2)}`;
    }

    function updateTotal() {
        const total = cart.reduce((sum, item) => {
            return sum + (formatPriceToNumber(item.price) * item.quantity);
        }, 0);
        totalPriceElement.textContent = formatNumberToPrice(total);
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function renderCart() {
        cartItemsContainer.innerHTML = '';

        cart.forEach((item, index) => {
            const itemPrice = formatPriceToNumber(item.price);
            const subtotal = itemPrice * item.quantity;

            const itemDiv = document.createElement('div');
            itemDiv.classList.add('order-items-details');

            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div>
                    <h3>${item.title}</h3>
                    <p>${formatNumberToPrice(itemPrice)} × ${item.quantity} = ${formatNumberToPrice(subtotal)}</p>
                    <div class="order-quantity">
                        <button class="decrease" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase" data-index="${index}">+</button>
                    </div>
                </div>
            `;

            cartItemsContainer.appendChild(itemDiv);
        });

        updateTotal();
    }

    function setupButtonEvents() {
        cartItemsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('increase') || e.target.classList.contains('decrease')) {
                const index = e.target.dataset.index;
                if (e.target.classList.contains('increase')) {
                    cart[index].quantity += 1;
                } else if (e.target.classList.contains('decrease')) {
                    if (cart[index].quantity > 1) {
                        cart[index].quantity -= 1;
                    } else {
                        cart.splice(index, 1);
                    }
                }
                saveCart();
                renderCart();
            }
        });
    }

    placeOrderButton.addEventListener('click', () => {
        localStorage.removeItem('cart');
        alert('Thank you for your order! Your delicious sushi is on its way!');
        window.location.href = '../html/home.html';
    });

    cancelOrderButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to cancel your order?')) {
            localStorage.removeItem('cart');
            window.location.href = '../html/menu.html';
        }
    });

    renderCart();
    setupButtonEvents();
});