document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector('.menu-button');
    const nav = document.querySelector('nav');

    menuButton.addEventListener('click', () => {
        nav.classList.toggle('show');
    });

    const filterButtons = document.querySelectorAll('.menu-container button');
    const productCards = document.querySelectorAll('.menu-card');
    const addToCartButtons = document.querySelectorAll('.more-button');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-filter');

            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

     function showNotification(message) {
        // Buat elemen notifikasi jika belum ada
        let notification = document.querySelector('.notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'notification';
            document.body.appendChild(notification);
        }
        
        notification.textContent = message;
        notification.classList.add('show');
        
        // Hilangkan notifikasi setelah 1 detik
        setTimeout(() => {
            notification.classList.remove('show');
        }, 1000);
    }

    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.menu-card');
            const title = productCard.querySelector('h1').textContent;
            const price = productCard.querySelector('p').textContent;
            const image = productCard.querySelector('img').getAttribute('src');

            const cart = JSON.parse(localStorage.getItem('cart')) || [];

            const existingItem = cart.find(item => item.title === title);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    title: title,
                    price: price,
                    image: image,
                    quantity: 1
                });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            showNotification(`${title} added to cart!`)
        });
    });
});