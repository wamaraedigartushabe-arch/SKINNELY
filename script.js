
// ==========================================
// NIA SKIN - JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // 1. WELCOME MESSAGE

    alert("Welcome to NIA SKIN");


    // 2. PRODUCT DETAILS MODAL

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

    function closeModal() {
        if (modal) {
            modal.classList.remove("show");
        }
    }

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            const productName = button.dataset.product;

            if (!products[productName] || !modal) {
                return;
            }

            modalTitle.textContent = productName;
            modalDescription.textContent = products[productName];

            modal.classList.add("show");

        });

    });

    if (closeButton) {
        closeButton.addEventListener("click", closeModal);
    }

    if (modal) {

        modal.addEventListener("click", function (event) {

            if (event.target === modal) {
                closeModal();
            }

        });

    }

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeModal();
        }

    });


    // 3. SHOPPING CART ELEMENTS

    const cartButtons = document.querySelectorAll(".add-to-cart");

    const cartCount = document.getElementById("cartCount");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    const clearCartButton = document.getElementById("clearCart");


    // 4. CHECKOUT ELEMENTS

    const checkoutButton = document.getElementById("checkoutButton");
    const checkoutSection = document.getElementById("checkoutSection");
    const checkoutForm = document.getElementById("checkoutForm");

    const checkoutItems = document.getElementById("checkoutItems");
    const checkoutTotal = document.getElementById("checkoutTotal");


    // 5. LOAD AND VALIDATE SAVED CART

    let cart = [];

    try {

        const savedCart = JSON.parse(
            localStorage.getItem("niaCart")
        );

        if (Array.isArray(savedCart)) {

            cart = savedCart
                .filter(function (product) {

                    return (
                        product &&
                        typeof product.name === "string" &&
                        Number.isFinite(Number(product.price)) &&
                        Number(product.price) > 0
                    );

                })
                .map(function (product) {

                    return {
                        name: product.name,
                        price: Number(product.price),
                        quantity:
                            Number.isInteger(Number(product.quantity)) &&
                            Number(product.quantity) > 0
                                ? Number(product.quantity)
                                : 1
                    };

                });

        }

    } catch (error) {

        console.error("Could not load saved cart:", error);

        cart = [];

    }


    // 6. FORMAT TANZANIAN CURRENCY

    function formatPrice(amount) {

        return Number(amount).toLocaleString("en-TZ");

    }


    // 7. ADD PRODUCTS TO CART

    cartButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const productName = button.dataset.product;
            const productPrice = Number(button.dataset.price);

            if (
                !productName ||
                !Number.isFinite(productPrice) ||
                productPrice <= 0
            ) {
                alert("Invalid product information.");
                return;
            }

            const existingProduct = cart.find(function (product) {

                return product.name === productName;

            });

            if (existingProduct) {

                existingProduct.quantity++;

            } else {

                cart.push({

                    name: productName,
                    price: productPrice,
                    quantity: 1

                });

            }

            updateCart();

        });

    });


    // 8. CLEAR ENTIRE SHOPPING CART

    if (clearCartButton) {

        clearCartButton.addEventListener("click", function () {

            cart = [];

            updateCart();

        });

    }


    // 9. OPEN CHECKOUT

    if (checkoutButton) {

        checkoutButton.addEventListener("click", function () {

            if (cart.length === 0) {

                alert("Your shopping cart is empty!");

                return;

            }

            updateCheckoutSummary();

            if (checkoutSection) {

                checkoutSection.classList.add("show");

                checkoutSection.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    }


    // 10. PROCESS CUSTOMER ORDER

    if (checkoutForm) {

        checkoutForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (cart.length === 0) {

                alert("Your shopping cart is empty!");

                return;

            }

            const customerName =
                document.getElementById("customerName").value.trim();

            const customerPhone =
                document.getElementById("customerPhone").value.trim();

            const customerAddress =
                document.getElementById("customerAddress").value.trim();

            let orderTotal = 0;

            cart.forEach(function (product) {

                orderTotal += product.price * product.quantity;

            });

            alert(

                "Thank you, " + customerName + "!\n\n" +

                "Your order has been received.\n" +

                "Phone: " + customerPhone + "\n" +

                "Delivery Address: " + customerAddress + "\n" +

                "Total: TZS " + formatPrice(orderTotal)

            );

            cart = [];

            updateCart();

            checkoutForm.reset();

            if (checkoutSection) {
                checkoutSection.classList.remove("show");
            }

        });

    }


    // 11. UPDATE SHOPPING CART

    function updateCart() {

        localStorage.setItem("niaCart", JSON.stringify(cart));

        if (!cartCount || !cartItems || !cartTotal) {
            return;
        }

        let itemCount = 0;
        let total = 0;

        cart.forEach(function (product) {

            itemCount += product.quantity;

            total += product.price * product.quantity;

        });

        cartCount.textContent = itemCount;

        cartTotal.textContent = formatPrice(total);

        cartItems.innerHTML = "";


        // DISPLAY EACH PRODUCT

        cart.forEach(function (product, index) {

            const item = document.createElement("div");

            const productName = document.createElement("span");

            productName.textContent =

                product.name + " - TZS " +

                formatPrice(product.price) +

                " x " + product.quantity;


            // INCREASE QUANTITY

            const increaseButton = document.createElement("button");

            increaseButton.type = "button";

            increaseButton.textContent = "+";

            increaseButton.setAttribute(
                "aria-label",
                "Increase " + product.name + " quantity"
            );

            increaseButton.addEventListener("click", function () {

                product.quantity++;

                updateCart();

            });


            // DECREASE QUANTITY

            const decreaseButton = document.createElement("button");

            decreaseButton.type = "button";

            decreaseButton.textContent = "-";

            decreaseButton.setAttribute(
                "aria-label",
                "Decrease " + product.name + " quantity"
            );

            decreaseButton.addEventListener("click", function () {

                if (product.quantity > 1) {

                    product.quantity--;

                } else {

                    cart.splice(index, 1);

                }

                updateCart();

            });


            // REMOVE PRODUCT

            const removeButton = document.createElement("button");

            removeButton.type = "button";

            removeButton.textContent = "Remove";

            removeButton.addEventListener("click", function () {

                cart.splice(index, 1);

                updateCart();

            });


            // ADD ELEMENTS TO CART

            item.appendChild(productName);

            item.appendChild(increaseButton);

            item.appendChild(decreaseButton);

            item.appendChild(removeButton);

            cartItems.appendChild(item);

        });


        // KEEP CHECKOUT SUMMARY UPDATED

        if (
            checkoutSection &&
            checkoutSection.classList.contains("show")
        ) {

            updateCheckoutSummary();

        }

    }


    // 12. UPDATE CHECKOUT SUMMARY

    function updateCheckoutSummary() {

        if (!checkoutItems || !checkoutTotal) {
            return;
        }

        checkoutItems.innerHTML = "";

        let total = 0;

        cart.forEach(function (product) {

            const subtotal = product.price * product.quantity;

            total += subtotal;

            const item = document.createElement("p");

            item.textContent =

                product.name + " x " +

                product.quantity + " = TZS " +

                formatPrice(subtotal);

            checkoutItems.appendChild(item);

        });

        checkoutTotal.textContent = formatPrice(total);

    }


    // 13. DISPLAY SAVED CART WHEN PAGE LOADS

    updateCart();


    // 14. NEWSLETTER

    const newsletterForm = document.querySelector(".newsletter");

    if (newsletterForm) {

        newsletterForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const emailInput = this.querySelector(
                'input[type="email"]'
            );

            if (!emailInput || !emailInput.value.trim()) {
                return;
            }

            alert(

                "Thank you for joining NIA SKIN, " +

                emailInput.value + "!"

            );

            emailInput.value = "";

        });

    }

});
