const decreaseButton = document.getElementById('decrease');
const increaseButton = document.getElementById('increase');
const quantityInput = document.getElementById('quantity');

decreaseButton.addEventListener('click', function () {
      let quantity = parseInt(quantityInput.value);
      if (quantity > 1) {
        quantityInput.value = quantity - 1;
      }
 });

increaseButton.addEventListener('click', function () {
      let quantity = parseInt(quantityInput.value);
      quantityInput.value = quantity + 1;
});

document.addEventListener('DOMContentLoaded', () => {
    // Get the product ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        // Fetch the product details based on the ID
        fetch(`https://api.escuelajs.co/api/v1/products/${productId}`)
            .then(response => response.json())
            .then(product => {
                // Update the product details on the page
                document.querySelector('.product-title').textContent = product.title;
                document.querySelector('.product-price').textContent = `EUR ${product.price}`;
                document.querySelector('.product-description').textContent = product.description;

                // Update product images
                const slider = document.querySelector('.slider');
                slider.innerHTML = '';
                product.images.forEach(image => {
                    const imgElement = document.createElement('div');
                    imgElement.className = "snap-center shrink-0 w-48 h-48 bg-gray-300";
                    imgElement.style.backgroundImage = `url(${image})`;
                    imgElement.style.backgroundSize = 'cover';
                    imgElement.style.backgroundPosition = 'center';
                    slider.appendChild(imgElement);
                });
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
            });
    }
});

