const store = [
    { id: "1", name: "👖 Jeans", price: 80, stock: 15 },
    { id: "2", name: "👟 Shoes", price: 120, stock: 10 },
    { id: "3", name: "👕 T-shirts", price: 15, stock: 50 },
    { id: "4", name: "🧥 Jackets", price: 200, stock: 5 },
    { id: "5", name: "🧢 Caps", price: 35, stock: 30 },
];

console.log("\n       Store warehouse");
console.table(store);


const cart = [];

    const addItemToCart = (id, quantity) => {
        const item = store.find(product => product.id === id);
    
        if (!item) return `❌ Item not found!`;
    
        if (quantity > item.stock) {
            return `❌ Sorry, only ${item.stock} ${item.name} left!`;
        }
    
        item.stock -= quantity;
        cart.push({ ...item, quantityReserved: quantity });
    
        return `✅ Added ${quantity} ${item.name}`;
    };
      
console.log(addItemToCart("1", 5));  // ✅ Added 5 Jeans
console.log(addItemToCart("1", 20)); // ❌ Sorry, only X left!
console.log(addItemToCart("4", 5));  // ✅ Added 5 Jackets
console.log(addItemToCart("4", 1));  // ❌ Jackets are out of stock!
console.table(store);