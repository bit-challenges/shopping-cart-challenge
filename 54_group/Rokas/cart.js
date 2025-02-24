console.log("   Pirkinių krepšelis");

const store = [
  { id: "1", name: "🥕 Carrot", price: 2, stock: 10 }, // i [0]
  { id: "2", name: "🍅 Tomato", price: 3, stock: 8 }, // i [1]
  { id: "3", name: "🥦 Broccoli", price: 4, stock: 5 }, // i [2]
  { id: "4", name: "🥑 Avocado", price: 5, stock: 12 }, // i [3]
  { id: "5", name: "🍌 Banana", price: 2, stock: 20 }, // i [4]
];

const cart = []; // Empty shopping cart

// Adds product to the cart
function addProduct(id, quantity) {
  if (quantity <= store[id - 1].stock) {
    store[id - 1].stock -= quantity;
    cart.push(store[id - 1]);
    store[id - 1].quantityReserved = quantity;
    return `✅ Added ${quantity} ${store[id - 1].name}`;
  }
  if (quantity > store[id - 1].stock) {
    return `❌ Error: Only ${store[id - 1].stock} ${
      store[id - 1].name
    } available!`;
  }
}

function removeProduct(id) {} // Removes a product from the cart
// - If an item is removed from the cart, its **stock is restored**.
// - The ```removeProduct(id)``` function **removes the item completely** from the cart.

function updateQuantity(id, quantity) {} // Updates product quantity in the cart
// - The ```updateQuantity(id, quantity)``` function changes the quantity of an item in the cart.

function getCartDetails() {} // Returns all cart items & total price
// - The ```getCartDetails()``` function should return a **summary of the cart**, including the total price.

function startShopping() {} // (EXTRA) Interactive shopping experience

console.log(addProduct("1", 5)); // ✅ Adds 5 Carrots 🥕;
console.log(addProduct("2", 10)); // ❌ Error: Only 8 Tomatoes 🍅 available!
console.log(addProduct("5", 8));

updateQuantity("1", 2); // ✅ Updates Carrots to 2 in the cart
removeProduct("1"); // ✅ Completely removes Carrots, stock is restored

console.log(getCartDetails());
