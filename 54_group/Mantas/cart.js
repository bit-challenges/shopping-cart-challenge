const store = [
    { id: "1", name: "👖 Jeans", price: 80, stock: 15 },
    { id: "2", name: "👟 Shoes", price: 120, stock: 10 },
    { id: "3", name: "👕 T-shirts", price: 15, stock: 50 },
    { id: "4", name: "🧥 Jackets", price: 200, stock: 5 },
    { id: "5", name: "🧢 Caps", price: 35, stock: 30 },
];

console.log("\n       Store warehouse");
console.table(store);
console.log('-----------');


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
      
console.log(addItemToCart("1", 10));  // ✅ Added 5 Jeans
console.log(addItemToCart("1", 20)); // ❌ Sorry, only X left!
console.log(addItemToCart("3", 5));  // ✅ Added 5 Jackets
console.log(addItemToCart("4", 1));  // ❌ Jackets are out of stock!
console.table(store);
console.log('-----------');


const removeItemFromCart = (id) => {
    const index = cart.findIndex(product => product.id === id);
    if (index === -1) return `❌ Item not in cart!`;

    const removedItem = cart.splice(index, 1)[0]; // Remove item from cart
    const storeItem = store.find(product => product.id === id);
    if (storeItem) storeItem.stock += removedItem.quantityReserved; // Restore stock

    return `✅ Removed ${removedItem.quantityReserved} ${removedItem.name} from cart`;
}  

console.log(removeItemFromCart("2"));
console.table(store);
console.log('-----------');


const updateItemQuantity = (id, quantity) => {
    const cartItem = cart.find(product => product.id === id);
    const storeItem = store.find(product => product.id === id);

    if (!cartItem) return `❌ Item not in cart!`;
    if (!storeItem) return `❌ Item not in store!`;

    const stockDifference = quantity - cartItem.quantityReserved;
    if (quantity === 0) {
        return removeItemFromCart(id); 
    }
    if (stockDifference > storeItem.stock) {
        return `❌ Not enough stock! Only ${storeItem.stock} available.`;
    }
    storeItem.stock -= stockDifference;
    cartItem.quantityReserved = quantity;

    return `🔄 Updated ${cartItem.name} to ${quantity} pcs.`;
}
console.log(updateItemQuantity("1", 8));
console.log(updateItemQuantity("2", 6));
console.log(updateItemQuantity("3", 4)); 
console.table(cart);
console.log('-----------');

const getCartSummary = (hasLoyaltyCard = false) => {
    if (cart.length === 0) return "🛒 Your cart is empty.";

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantityReserved, 0);
    const discount = hasLoyaltyCard ? totalPrice * 0.2 : 0;  // 20% discount if loyalty card is used
    const finalPrice = totalPrice - discount;

    return {
        cartItems: cart,
        totalPrice: `$${totalPrice.toFixed(2)}`,
        discount: hasLoyaltyCard ? `$${discount.toFixed(2)}` : "No discount applied",
        finalPrice: `$${finalPrice.toFixed(2)}`
    };
}
console.log(getCartSummary(true));
console.table(store);
console.log('-----------');