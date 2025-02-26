
function addProduct(id, quantity) {
    let itemObj = {}; 
    let foundObject;
    for (let i = 0; i < store.length; i++)
    {
        if (id === store[i].id)
        {
            if (quantity <= store[i].stock)
            {
                //sukuriam nauja objekta
                itemObj = {id: store[i].id, name: store[i].name, price: store[i].price, stock: quantity};           
                //ieskome ar yra krepselyje toks objektas pagal id
                foundObject = cart.find(({id}) => id === itemObj.id);                                              
                if (foundObject === undefined) //jeigu nera
                    cart.push(itemObj);        //idedame i masyva                                                                    
                else if (foundObject.stock + quantity <= store[i].stock + foundObject.stock)  // jeiku randame, tada pridedame                                                          
                    foundObject.stock += quantity;                                                 
                else return 'Quantity exceeds...';
                store[i].stock -= quantity;
            }
            else return 'wrong quantity, try again';
        }
    }
    return 'added...';

}        // Adds product to the cart
function removeProduct(id) {
    let quantity = 0;
    for (let i = 0; i < cart.length; i++) {
        if (id === cart[i].id)
        {
            quantity = cart[i].stock;
            cart.splice(i, 1);
        }        
    }
    for (let i = 0; i < store.length; i++)
        if (id === store[i].id)
            store[i].stock += cart[i].stock;
    return 'deleted... ';

}     // Removes a product from the cart
function updateQuantity(id, quantity) {

    for (let i = 0; i < cart.length; i++)
    {
        for (let j = 0; j < store.length; j++)
        {
            if (cart[i].id === id && cart[i].id === store[j].id)
            {               
                store[j].stock += cart[j].stock;
                if (store[j].stock > quantity || quantity < 0)
                {
                    cart[i].stock = quantity;
                    store[j].stock -= cart[i].stock;  
                }
                else return 'wrong quantity selected...';  
            }
        }
    }
    return "updated...";
}    // Updates product quantity in the cart
function getCartDetails() {
    let totalPrice = 0;
    console.table(cart); 
    for (let i = 0; i < cart.length; i++)
        totalPrice += cart[i].price * cart[i].stock;    
    console.log(`Total price is ${totalPrice}`);
    return '';

}                // Returns all cart items & total price
function startShopping() {
const menu = `
Enter 1 for add product in your cart:
Enter 2 for remove item in you cart: 
Enter 3 for update your cart:
Enter 4 to get details of your cart:
Enter 5 to exit application.
`;
let id = '';
let quantity = '';
console.log(menu);
let choise = prompt();
    
// prideti patikrinima //
while (choise !== '5')
{   
    if (Number.isNaN(choise) || Number(choise) % 1 !== 0)
    {
        console.log('wrong choise, enter integer number ');
        continue;
    }
    if ((Number(choise) < 1 || Number(choise) > 5))
        continue;
    if (choise === '1' || choise === '3')
    {
        console.log('Enter item id');
        id = prompt();
        if (Number.isNaN(id) || Number(id) > store.length || Number(id) < 0){
            console.log('wrong id, try again');
            continue;
        }    
        console.log('Enter item quantity');
        quantity = prompt();
        if (Number.isNaN(quantity) || Number(quantity) < 0){ 
            console.log('wrong quantity, try again');
            continue;
        }    
        if (choise === '1')
            console.log(addProduct(id, Number(quantity)));
        else if (choise === '3')
            console.log(updateQuantity(id, Number(quantity)));        
    }
    else if (choise === '2')
    {
        console.log('Enter item id');
        id = prompt();
       
        if (Number(id) > store.length || Number(id) < 1 || Number.isNaN(id)){
            console.log('wrong id, try again');
            continue;
        }
        console.log(removeProduct(id));
    }
    else if (choise === '4')
        getCartDetails();
    console.log(menu);
    choise = prompt();
        
} 
    return 'Geros dienos Jums :)'; 
}

//==================================================================================================================================================================================================

const prompt = require('prompt-sync')();
const store = [
    { id: '1', name: '🥕 Carrot', price: 2, stock: 10 },
    { id: '2', name: '🍅 Tomato', price: 3, stock: 8 },
    { id: '3', name: '🥦 Broccoli', price: 4, stock: 5 },
];
const cart = [];
console.log(startShopping());
