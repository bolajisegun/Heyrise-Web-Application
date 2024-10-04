fetch('https://api.escuelajs.co/api/v1/products')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const productsContainer = document.createElement('div');
        productsContainer.className = "flex flex-wrap justify-between items-center w-[90%] mx-auto";
        document.querySelector('main').appendChild(productsContainer);

        // Function to render products
        const renderProducts = (products) => {
    productsContainer.innerHTML = "";
    products.forEach(product => {
        const productCard = `
            <a href="./products-details.html?id=${product.id}">
                <div class="w-[350px] md:w-[300px] bg-white rounded-md shadow-sm product-card">
                    <img src="https://dummyimage.com/250x250/c4c4c4/ffffff.jpg" alt="${product.title}" class="w-full h-full object-cover product-img">
                    <div class="flex flex-col items-start justify-start py-2 product-details">
                        <h4 class="text-[16px] font-semibold product-name">${product.title}</h4>
                        <p class="text-[12px] text-gray-600 product-price">$${product.price}</p>
                    </div>
                </div>
            </a>`;
        productsContainer.innerHTML += productCard;
    });
};


        // Initial render
        renderProducts(data);
        
        // Filter function
        const filterProducts = () => {
            const searchQuery = document.querySelector('input[type="text"]').value.toLowerCase();
            const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(input => input.nextElementSibling.innerText);
            const sortOrder = document.querySelector('select').value;
            
            let filteredProducts = data.filter(product => {
                const matchesSearch = product.title.toLowerCase().includes(searchQuery);
                const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
                return matchesSearch && matchesCategory;
            });

            // Sort products
            filteredProducts.sort((a, b) => sortOrder === "Ascending" ? a.price - b.price : b.price - a.price);
            
            // Update product count
            document.querySelector('h4.font-bold').textContent = `Products Count: ${filteredProducts.length}`;
            
            // Render filtered products
            renderProducts(filteredProducts);
        };

        // Search box event listener
        document.querySelector('input[type="text"]').addEventListener('input', filterProducts);

        // Category checkboxes event listener
        document.querySelectorAll('input[name="category"]').forEach(checkbox => {
            checkbox.addEventListener('change', filterProducts);
        });

        // Sort dropdown event listener
        document.querySelector('select').addEventListener('change', filterProducts);
    })
    .catch(error => console.error('Error fetching products:', error));

    function selectOnlyThis(checkbox) {
    const checkboxes = document.getElementsByName('category');
    checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false;
    });
  }

