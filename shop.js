// let currentPage = 1;
// const productsPerPage = 9;

// // const showLoader = () => {
// //     document.getElementById("loader").style.display = "block";
// // };

// // const hideLoader = () => {
// //     document.getElementById("loader").style.display = "none";
// // };

// const getProducts = async () => {
//     try {
//         const response = await fetch("http://makeup-api.herokuapp.com/api/v1/products.json");
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error("Error fetching the products:", error);
//         return [];
//     }
// };

// const displayProducts = async (page = 1) => {
//     // showLoader();

//     const products = await getProducts();
//     // hideLoader();

//     if (products.length > 0) {
//         const startIndex = (page - 1) * productsPerPage;
//         const endIndex = startIndex + productsPerPage;
//         const paginatedProducts = products.slice(startIndex, endIndex);

//         const result = paginatedProducts
//             .map((product) => {
//                 return `
//                     <div class="product-card">
//                         <img src="${product.image_link}" alt="${product.name}">
//                         <div class="product-details">
//                             <h2>${product.name}</h2>
//                             <p>${product.description}</p>
//                             <p class="price">${product.price_sign}${product.price} ${product.currency}</p>
//                             <p class="tags">${product.tag_list.map(tag => `<span>${tag}</span>`).join(' ')}</p>
//                         </div>
//                     </div>
//                 `;
//             })
//             .join("");

//         document.querySelector(".product-container").innerHTML += result;

//         // Load more products when the user scrolls to the bottom of the page
//         const loadMore = document.createElement("button");
//         loadMore.innerText = "Load More";
//         loadMore.classList.add("load-more");
//         loadMore.onclick = () => {
//             currentPage++;
//             displayProducts(currentPage);
//             loadMore.remove(); // Remove the button after it's clicked
//         };

//         document.querySelector(".product-container").appendChild(loadMore);
//     } else {
//         document.querySelector(".product-container").innerHTML = "<p>No products found</p>";
//     }
// };

// // Initial call to display the first set of products
// displayProducts();



let currentPage = 1;
const productsPerPage = 9;
let filters = {};

const getProducts = async () => {
    let url = "http://makeup-api.herokuapp.com/api/v1/products.json";

    if (filters.brand || filters.category || filters.minPrice || filters.maxPrice) {
        url += "?"; // Start query string

        if (filters.brand) {
            url += `brand=${filters.brand}&`;
        }
        if (filters.category) {
            url += `product_type=${filters.category}&`;
        }
        if (filters.minPrice) {
            url += `price_greater_than=${filters.minPrice}&`;
        }
        if (filters.maxPrice) {
            url += `price_less_than=${filters.maxPrice}&`;
        }
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching the products:", error);
        return [];
    }
};

const displayProducts = async (page = 1) => {
    const products = await getProducts();

    if (products.length > 0) {
        const startIndex = (page - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const paginatedProducts = products.slice(startIndex, endIndex);

        const result = paginatedProducts
            .map((product) => {
                return `
                    <div class="product-card">
                        <img src="${product.image_link}" alt="${product.name}">
                        <div class="product-details">
                            <h2>${product.name}</h2>
                            <p class="product-description">${product.description}</p>
                            <p class="price">$${product.price}</p>
                            <p class="tags">${product.tag_list.map(tag => `<span>${tag}</span>`).join(' ')}</p>
                        </div>
                    </div>
                `;
            })
            .join("");

        if (page === 1) {
            document.querySelector(".product-container").innerHTML = result;
        } else {
            document.querySelector(".product-container").innerHTML += result;
        }

        if (products.length > endIndex) {
            const loadMore = document.createElement("button");
            loadMore.innerText = "Load More";
            loadMore.classList.add("load-more");
            loadMore.onclick = () => {
                currentPage++;
                displayProducts(currentPage);
                loadMore.remove(); // Remove the button after it's clicked
            };
            document.querySelector(".product-container").appendChild(loadMore);
        }
    } else {
        document.querySelector(".product-container").innerHTML = '<img src="./imgs/nproduct.png" alt="No Product found" style="width: 100%; height: auto;">';
    }
};

const applyFilters = () => {
    const selectedCategory = document.querySelector('input[name="category"]:checked')?.value;
    const selectedBrand = document.querySelector('input[name="brand"]:checked')?.value;
    const minPrice = document.getElementById('price-greater-than').value;
    const maxPrice = document.getElementById('price-less-than').value;

    filters = {
        category: selectedCategory,
        brand: selectedBrand,
        minPrice: minPrice ? parseFloat(minPrice) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
    };

    currentPage = 1; // Reset to first page when filters are applied
    displayProducts(currentPage);
};

// Attach event listeners for the filters
document.querySelectorAll('input[name="category"], input[name="brand"]').forEach(input => {
    input.addEventListener('change', applyFilters);
});

document.querySelectorAll('.price-filter').forEach(input => {
    input.addEventListener('change', applyFilters);
});

const clearCategoryFilter = () => {
    const categoryRadioButtons = document.querySelectorAll('input[name="category"]');
    categoryRadioButtons.forEach(button => button.checked = false);
    applyFilters(); // Apply filters after clearing
};

const clearPriceFilter = () => {
    document.getElementById('price-greater-than').value = '';
    document.getElementById('price-less-than').value = '';
    applyFilters(); // Apply filters after clearing
};

const clearBrandFilter = () => {
    const brandRadioButtons = document.querySelectorAll('input[name="brand"]');
    brandRadioButtons.forEach(button => button.checked = false);
    applyFilters(); // Apply filters after clearing
};

// Attach event listeners to the "Clear" buttons
document.querySelector('.clear-category').addEventListener('click', clearCategoryFilter);
document.querySelector('.clear-price').addEventListener('click', clearPriceFilter);
document.querySelector('.clear-brand').addEventListener('click', clearBrandFilter);


// Initial call to display the first set of products
displayProducts();


// document.querySelector('.bars-menu1').addEventListener('click', function () {
//     document.querySelector('.sidebar').classList.toggle('active');
// });

document.querySelector('.bars-menu1').addEventListener('click', function () {
    document.querySelector('.sidebar').classList.toggle('active');
});

// Close the sidebar when a filter is selected
const filterInputs = document.querySelectorAll('.sidebar input[type="radio"], .sidebar input[type="checkbox"]');

filterInputs.forEach(input => {
    input.addEventListener('change', function () {
        document.querySelector('.sidebar').classList.remove('active');
    });
});

// Close the sidebar when a "Clear Filter" button is clicked
const clearButtons = document.querySelectorAll('.sidebar .clear-category, .sidebar .clear-price, .sidebar .clear-brand');

clearButtons.forEach(button => {
    button.addEventListener('click', function () {
        document.querySelector('.sidebar').classList.remove('active');
    });
});

document.querySelector('.back-button').addEventListener('click', function() {
    document.querySelector('.sidebar').classList.remove('active');
});