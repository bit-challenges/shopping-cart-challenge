# 🛍️ Shopping Cart Challenge

Welcome to the **Shopping Cart Challenge**! 🚀 Your task is to create a shopping cart system that interacts with a store inventory. This challenge will test your skills in **JavaScript objects, arrays and functions**.

---

## 📌 Challenge Overview

You need to implement a **shopping cart system** that allows users to:
✅ Add products to the cart (if available in stock).
✅ Remove products from the cart completely.
✅ Update the quantity of a product in the cart.
✅ Get cart details (items + total price).
✅ Ensure stock updates when adding / removing items.
✅ (**EXTRA**) Use **prompts** to make it interactive! 🖥️

---

## 📦 Store Inventory

Here`s an **example** of store products. You can change them if you want!

```js
const store = [
  { id: "1", name: "🥕 Carrot", price: 2, stock: 10 },
  { id: "2", name: "🍅 Tomato", price: 3, stock: 8 },
  { id: "3", name: "🥦 Broccoli", price: 4, stock: 5 },
];
```

📌 **You can modify products!** Add more items or change their names, prices and stock.

When product is added to the cart, its **stock decreases**.

If the product is removed, the stock **increases back**.

---

## 🛠️ Functions You Need to Implement

You must create the following functions:

```js
const cart = []; // Empty shopping cart

function addProduct(id, quantity) {} // Adds product to the cart
function removeProduct(id) {} // Removes a product from the cart
function updateQuantity(id, quantity) {} // Updates product quantity in the cart
function getCartDetails() {} // Returns all cart items & total price
function startShopping() {} // (EXTRA) Interactive shopping experience
```

### 📌Rules:

- You **cannot add more items than available in stock**.
- If an item is removed from the cart, its **stock is restored**.
- The `updateQuantity(id, quantity)` function changes the quantity of an item in the cart.
- The `removeProduct(id)` function **removes the item completely** from the cart.
- The `getCartDetails()` function should return a **summary of the cart**, including the total price.

---

## 🚀 Example Usage

Copy - paste this into your **browser console** or a **JavaScript file** to test your functions:

```js
addProduct("1", 5); // ✅ Adds 5 Carrots 🥕
addProduct("2", 10); // ❌ Error: Only 8 Tomatoes 🍅 available!
updateQuantity("1", 2); // ✅ Updates Carrots to 2 in the cart
removeProduct("1"); // ✅ Completely removes Carrots, stock is restored

console.log(getCartDetails());
```

---

## 🎮 EXTRA: Interactive Mode!

🔹Want to make your program **interactive**?

1. Use **prompt()** to ask the user what they want to do (add, remove, update, view, exit).
2. If the user chooses **"add"**, as for the **product ID** and **quantity**.
3. If the user chooses **"remove"**, ask for the **product ID** and completely remove it from the cart.
4. If the user chooses **"update"**, ask for the **product ID** and new **quantity**.
5. If the user chooses **"view"**, display the cart details in the console.
6. If the user chooses **"exit"**, end the program.

📌 **Run a loop** to keep asking the user until they choose **"exit"**!

---

## 📂 Folder Structure

Each student must create their own folder inside `54_group/` with their implementation:

```
54_group/
    student_name/
        cart.js     (Your solution)
        README.md   (Optional documentation)
```

---

## 🎯 Goals

This challenge will help you practise:

- ✅ Working with arrays & objects.
- ✅ Implementing business logic (inventory magaement).
- ✅ Using functions effectively.
- ✅ Creating an interactive shopping experience (EXTRA).

---

## 🎉 Ready? Start Coding!

1. Fork the repository.
2. Create your own folder inside `54_group/`
3. Write your `cart.js` solution.
4. Push your solution and submit a pull request!

**Good luck! 🚀🔥**
