# 🛒 Shopping Cart System

This project is a simple shopping cart system implemented in JavaScript. It allows users to manage a store inventory, add items to a cart, update quantities, remove items, and view a cart summary with a loyalty discount option.

# 🌟 About

This project is for educational porpuses only. Pull request are welcome, but priority for project authors! Thank you for your cooperation!

Site published at: https://github.com/MantasKukulskis/shopping_cart_challenge

# 🎯 Project features/goals

- Github pages
- Working with arrays & objects.
- Implementing business logic (inventory magaement).
- Using functions effectively.
- Creating an interactive shopping experience (EXTRA).

# ✨ Features

📦 Store Inventory Management: Displays available products with stock levels.

➕ Add Items to Cart: Users can add products to their cart while ensuring stock availability.

❌ Remove Items from Cart: Users can remove items, restoring stock to the inventory.

🔄 Update Item Quantity: Users can modify item quantities in the cart.

🏷 Cart Summary: Displays total cost with an optional 20% loyalty discount.

# 📂 Data Structure

```js
Store Inventory

const store = [
    { id: "1", name: "👖 Jeans", price: 80, stock: 15 },
    { id: "2", name: "👟 Shoes", price: 120, stock: 10 },
    { id: "3", name: "👕 T-shirts", price: 15, stock: 50 },
    { id: "4", name: "🧥 Jackets", price: 200, stock: 5 },
    { id: "5", name: "🧢 Caps", price: 35, stock: 30 }
];

# Cart Structure

const cart = [];

# ⚙️ Functions

🛍 addItemToCart(id, quantity)

Adds an item to the cart while ensuring stock availability.

console.log(addItemToCart("1", 10)); // ✅ Added 10 Jeans
console.log(addItemToCart("3", 5)); // ✅ Added 5 T-shirts

🗑 removeItemFromCart(id)

Removes an item from the cart and restores stock.

console.log(removeItemFromCart("1")); // ✅ Removed 10 Jeans from cart

🔢 updateItemQuantity(id, quantity)

Modifies the quantity of an item in the cart.

console.log(updateItemQuantity("1", 8)); // 🔄 Updated Jeans to 8 pcs.

🛍 getCartSummary(hasLoyaltyCard)

Displays cart items, total price, and discount details.

console.log(getCartSummary(true));

```

# 🚀 How to Start the Project

Clone the repository or copy the script file.

Open a terminal and navigate to the project folder.

Run the script using Node.js:

node shoppingCart.js

Interact with the cart system using the provided functions.

Observe the store and cart updates using:

console.table(store);
console.table(cart);

# 📝 Notes

The system prevents adding items beyond available stock.

Loyalty card holders receive a 20% discount.

The cart summary updates dynamically based on actions.

Enjoy shopping! 🛒

```

```
