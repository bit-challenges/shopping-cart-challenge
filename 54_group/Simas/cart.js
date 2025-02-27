const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Store inventory
const store = [
    { id: '1', name: '🥕 Carrot', price: 2, stock: 10 },
    { id: '2', name: '🍅 Tomato', price: 3, stock: 8 },
    { id: '3', name: '🥦 Broccoli', price: 4, stock: 5 },
];

// Shopping cart
const cart = [];

/**
 * Validates product input.
 * Ensures ID exists and quantity is a positive integer.
 * @param {string} id - The product ID
 * @param {number} quantity - The desired quantity
 * @returns {string|null} - Error message or null if valid
 */
function validateProductInput(id, quantity) {
    if (typeof id !== 'string') return `ERROR: Invalid product ID format.`;
    if (!store.find(p => p.id === id)) return `ERROR: No product found with the given ID.`;
    if (typeof quantity !== 'number' || !isFinite(quantity) || quantity % 1 !== 0) return `ERROR: Quantity must be a whole number.`;
    if (quantity <= 0) return `ERROR: Quantity must be greater than zero.`;
    return null;
}

/**
 * Adds a product to the cart or updates its quantity.
 * Checks stock availability before proceeding.
 * @param {string} id - The product ID
 * @param {number} quantity - The quantity to add
 * @returns {string} - Success or error message
 */
function addProduct(id, quantity) {
    const validationError = validateProductInput(id, quantity);
    if (validationError) return validationError;

    const storeProduct = store.find(p => p.id === id);
    if (quantity > storeProduct.stock) return `ERROR: Insifficient stock. Only ${storeProduct.stock} units available.`;

    storeProduct.stock -= quantity;
    const cartProduct = cart.find(p => p.id === id);

    if (cartProduct) {
        cartProduct.quantity += quantity;
        return `SUCCESS: Product ${cartProduct.name} quantity updated in the cart.`;
    } else {
        cart.push({
            id,
            name: storeProduct.name,
            price: storeProduct.price,
            quantity,
        });
        return `SUCCESS: Product ${storeProduct.name} has been added to the cart.`;
    }
}

/**
 * Updates the quantity of an existing product in the cart.
 * @param {string} id - The product ID
 * @param {number} quantity - The new quantity
 * @returns {string} - Success or error message
 */
function updateQuantity(id, quantity) {
    const validationError = validateProductInput(id, quantity);
    if (validationError) return validationError;

    const cartProduct = cart.find(p => p.id === id);
    if (!cartProduct) return `ERROR: The product does not exist in the cart.`;

    const storeProduct = store.find(p => p.id === id);
    if (!storeProduct) return `ERROR: Product not found in store inventory.`;

    const quantityDiff = quantity - cartProduct.quantity;
    if (quantityDiff > 0 && storeProduct.stock < quantityDiff) {
        return `ERROR: Insifficient stock. Only ${storeProduct.stock} additional units available.`;
    }

    storeProduct.stock -= quantityDiff;
    cartProduct.quantity = quantity;
    return `SUCCESS: Quantity updated for '${cartProduct.name}' in the cart.`;
}

/**
 * Removes a product from the cart completely.
 * Restores stock in the inventory.
 * @param {string} id - The product ID to remove
 * @returns {string} - Success or error message
 */
function removeProduct(id) {
    if (typeof id !== 'string') return `ERROR: Invalid product ID format`;

    const cartProduct = cart.find(p => p.id === id);
    if (!cartProduct) return `ERROR: The product does not exist in the cart.`;

    const storeProduct = store.find(p => p.id === id);
    if (storeProduct) storeProduct.stock += cartProduct.quantity;

    cart.splice(cart.findIndex(p => p.id === id), 1);
    return `SUCCESS: '${cartProduct.name}' has been removed from the cart.`;
}

/**
 * Retrieves cart details including total price.
 * @returns {Object} - Object containing cart items and total price
 */
function getCartDetails() {
    if (cart.length === 0) {
        return { cartItems: [], totalPrice: 0 };
    }
    const cartItems = cart.map(p => ({
        name: p.name,
        quantity: p.quantity,
        price: p.price,
        total: Number((p.quantity * p.price).toFixed(2))
    }));

    return {
        cartItems,
        totalPrice: Number(cartItems.reduce((sum, p) => sum + p.total, 0).toFixed(2))
    };
}

/**
 * Starts an interactive shopping experience.
 * Displays available products and prompts user for actions.
 */
function startShopping() {
    console.log(`🛍️ Welcome to the Shopping Console! 🛍️`);
    console.log(`Available products:`);
    store.forEach(p => console.log(`${p.id}: ${p.name} - ${p.price} EUR (${p.stock} in stock)`));
    askUser();
}

/**
 * Handles user input for shopping actions.
 * Allows adding, updating, removing, and viewing cart details.
 */
function askUser() {
    rl.question(`\nWhat would you like to do? (add, update, remove, cart, exit): `, (action) => {
        switch (action.toLowerCase()) {
            case 'add':
                rl.question(`Enter product ID: `, (id) => {
                    rl.question(`Enter quantity: `, (quantity) => {
                        console.log(addProduct(id, parseInt(quantity)));
                        askUser();
                    });
                });
                break;
            case 'update':
                rl.question(`Enter product ID to update: `, (id) => {
                    rl.question(`Enter new quantity: `, (quantity) => {
                        console.log(updateQuantity(id, parseInt(quantity)));
                        askUser();
                    });
                });
                break;
            case 'remove':
                rl.question(`Enter product ID to remove: `, (id) => {
                    console.log(removeProduct(id));
                    askUser();
                });
                break;
            case 'cart':
                const cartData = getCartDetails();
                if (cartData.cartItems.length === 0) {
                    console.log(`INFO: Your cart is empty.`);
                } else {
                    console.table(cartData.cartItems);
                    console.log(`Total: ${cartData.totalPrice} EUR`);
                }
                askUser();
                break;
            case 'exit':
                console.log(`👋 Thanks for shopping! See you next time.`);
                rl.close();
                break;
            default:
                console.log(`❌ Invalid command. Try again.`);
                askUser();
                break;
        }
    });
}

startShopping();