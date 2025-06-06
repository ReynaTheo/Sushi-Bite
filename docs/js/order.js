document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector('.menu-button');
    const nav = document.querySelector('nav');

    menuButton.addEventListener('click', () => {
        nav.classList.toggle('show');
    });

    // Order functionality
    const cartItemsContainer = document.querySelector('.order-items');
    const totalPriceElement = document.getElementById('total-price');
    const placeOrderButton = document.querySelector('.place-order');
    const cancelOrderButton = document.querySelector('.cancel-order');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Format currency helper functions
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

    // Initialize
    renderCart();
    setupButtonEvents();
});


const overlay = document.getElementById('popupOverlay');
    const popupContent = document.getElementById('popupContent');

    const showPopup = (html) => {
      popupContent.innerHTML = html;
      overlay.style.display = 'flex';
    };

    const hidePopup = () => {
      overlay.style.display = 'none';
    };

    document.getElementById('placeOrderBtn').addEventListener('click', () => {
      showConfirmation();
    });

    const showConfirmation = () => {
      showPopup(`
        <p>Are you sure you want to place this order?</p>
        <button class="yes" onclick="handleConfirmYes()">Yes</button>
        <button class="no" onclick="handleConfirmNo()">No</button>
      `);
    };

    const handleConfirmYes = () => {
      const transactionId = Math.floor(Math.random() * 1000000);
      showPopup(`
        <p>Thank you for your order! Your delicious sushi is on its way!</p>
        <img src="../assets/barcode.png" alt="Order Barcode" id="qr-code">
        <p>Transaction ID: ${transactionId}</p>
        <p id="click"><small>Click anywhere to return to the menu</small></p>
      `);

       setTimeout(() => {
        overlay.onclick = () => {
        window.location.href = "menu.html";
    };
  }, 100); 
};
    const handleConfirmNo = () => {
      hidePopup();
    };

    // const cancelYes = () => {
    //   window.location.href = "menu.html";
    // };

    // const cancelNo = () => {
    //   hidePopup();
    // };

    document.getElementById('cancelOrderBtn').addEventListener('click', () => {
      showCancelConfirmation();
    });

    const showCancelConfirmation = () => {
      showPopup(`
        <p>Are you sure you want to cancel this order?</p>
        <button class="yes" onclick="cancelYes()">Yes</button>
        <button onclick="cancelNo()">No</button>
      `);
    };

    const cancelYes = () => {
      window.location.href = "menu.html";
    };

    const cancelNo = () => {
      hidePopup();
    };
   