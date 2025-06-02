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
            alert(`${title} added to cart!`);
        });
    });
});