
// ==========================================
// NIA SKIN - JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", function() {

    // ======================================
    // 1. WELCOME MESSAGE
    // ======================================

    alert("Welcome to NIA SKIN");


    // ======================================
    // 2. PRODUCT DETAILS MODAL
    // ======================================

    const buttons = document.querySelectorAll(".view-details");

    const modal = document.getElementById("productModal");

    const modalTitle = document.getElementById("modalTitle");

    const modalDescription = document.getElementById("modalDescription");

    const closeButton = document.getElementById("closeModal");

    const products = {
        Cleanser: "Helps in removing dirt and excess oil.",
        Moisturizer: "Helps to keep the skin hydrated.",
        Sunscreen: "Helps to protect skin from UV exposure."
    };


    // Open product details

    buttons.forEach(function(button) {

        button.addEventListener("click", function() {

            const productName = button.dataset.product;

            modalTitle.textContent = productName;

            modalDescription.textContent = products[productName];

            modal.classList.add("show");

        });

    });


    // Close modal using close button

    closeButton.addEventListener("click", function() {

        modal.classList.remove("show");

    });


    // Close modal by clicking outside the content

    modal.addEventListener("click", function(event) {

        if (event.target === modal) {

            modal.classList.remove("show");

        }

    });


    // ======================================
    // 3. SHOPPING CART
    // ======================================

    const cartButtons = document.querySelectorAll(".add-to-cart");

    const cartCount = document.getElementById("cartCount");

    const cartItems = document.getElementById("cartItems");

    const cartTotal = document.getElementById("cartTotal");


    // Load previously saved cart

    let cart = JSON.parse(localStorage.getItem("niaCart")) || [];


    // Add products to cart

    cartButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            const productName = button.dataset.product;

            const productPrice = Number(button.dataset.price);

            const product = {
                name: productName,
                price: productPrice
            };

            cart.push(product);

            updateCart();

        });

    });


    // Update shopping cart

    function updateCart() {

        // Save cart in browser storage

        localStorage.setItem("niaCart", JSON.stringify(cart));


        // Update number of products

        cartCount.textContent = cart.length;


        // Clear previous cart display

        cartItems.innerHTML = "";


        // Calculate total price

        let total = 0;


        cart.forEach(function(product, index) {

            total += product.price;


            // Create cart item container

            const item = document.createElement("div");


            // Create product name and price

            const productName = document.createElement("span");

            productName.textContent = product.name + " - TZS " +
                product.price.toLocaleString("en-TZ");


            // Create remove button

            const removeButton = document.createElement("button");

            removeButton.textContent = "Remove";


            // Remove selected product

            removeButton.addEventListener("click", function() {

                cart.splice(index, 1);

                updateCart();

            });


            // Add elements to cart

            item.appendChild(productName);

            item.appendChild(removeButton);

            cartItems.appendChild(item);

        });


        // Display total price

        cartTotal.textContent = total.toLocaleString("en-TZ");

    }


    // Display saved cart when page loads

    updateCart();


    // ======================================
    // 4. NEWSLETTER
    // ======================================

    const newsletterForm = document.querySelector(".newsletter");


    if (newsletterForm) {

        newsletterForm.addEventListener("submit", function(event) {

            event.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');

            alert("Thank you for joining NIA SKIN, " + emailInput.value + "!");

            emailInput.value = "";

        });

    }


    // ======================================
    // END OF NIA SKIN JAVASCRIPT
    // ======================================

});

