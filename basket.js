document.addEventListener('DOMContentLoaded', function() {
    const basketItemsContainer = document.querySelector('.basket-items');
    const totalPriceElement = document.getElementById('total-price');
    const cartItems = localStorage.getItem('cart');
    let cart = cartItems ? JSON.parse(cartItems) : [];
    let total = 0;

    function displayBasketItems() {
        basketItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            basketItemsContainer.innerHTML = '<p>Ваш кошик порожній.</p>';
            totalPriceElement.textContent = '0₴';
            return;
        }

        cart.forEach(book => {
            const basketItem = document.createElement('div');
            basketItem.classList.add('book-card', 'basket-item'); 
            basketItem.innerHTML = `
                <img src="${book.img}" alt="${book.title}">
                <div class="book-info">
                    <p class="book-title">${book.title}</p>
                    <p class="book-author">${book.author}</p>
                    <span class="book-price">${book.price}</span>
                </div>
                <div class="book-actions">
                    <button class="remove-from-basket cart-btn" data-title="${book.title}">Видалити</button>
                </div>
            `;
            basketItemsContainer.appendChild(basketItem);

            const priceNumber = parseFloat(book.price.replace('₴', ''));
            if (!isNaN(priceNumber)) {
                total += priceNumber;
            }
        });

        totalPriceElement.textContent = `${total.toFixed(2)}₴`; 
        attachRemoveListeners(); 
    }

    function attachRemoveListeners() {
        const removeButtons = document.querySelectorAll('.remove-from-basket');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const titleToRemove = this.dataset.title;
                cart = cart.filter(item => item.title !== titleToRemove);
                localStorage.setItem('cart', JSON.stringify(cart));
                total = 0; 
                displayBasketItems(); 
            });
        });
    }

    displayBasketItems();
});