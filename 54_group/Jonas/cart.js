const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");

const rl = readline.createInterface({ input, output });

const store = [
  { id: "1", name: "🥕 Carrot", price: 2, stock: 10 },
  { id: "2", name: "🍅 Tomato", price: 3, stock: 8 },
  { id: "3", name: "🥦 Broccoli", price: 4, stock: 5 },
];

const cart = [];

function validateId(id) {
  if (typeof id !== "number" || isNaN(id) || id % 1 !== 0 || id <= 0)
    return console.log("invalid id entered");
  return true;
}

function validateQuantity(quantity) {
  if (typeof quantity !== "number" || isNaN(quantity) || quantity % 1 !== 0 || quantity <= 0)
    return console.log(`invalid quantity entered, must be at least 1`);
  return true;
}

// Adds product to the cart
function addProduct(id, quantity) {
  if (!validateId(id)) return;
  if (!validateQuantity(quantity)) return;

  const productInStore = store.find((item) => item.id === String(id));
  if (!productInStore) return console.log(`product with id ${id} doesn't exists in the store`);

  if (quantity > productInStore.stock)
    return console.log(
      `store doesn't have enough products, available stock is ${productInStore.stock}`
    );

  const isProductInCart = cart.some((item) => item?.product?.id === String(id));
  if (isProductInCart)
    return console.log(
      `cannot add product '${productInStore.name}' (id: ${productInStore.id}), it's already in the cart. Use 'update [item id] [quantity]' instead.`
    );

  cart.push({ product: productInStore, quantity });
  productInStore.stock -= quantity;
  console.log(
    `${quantity}x '${productInStore.name}' (id: ${productInStore.id}) added to the cart`
  );
}

// Removes a product from the cart
function removeProduct(id) {
  if (!validateId(id)) return;

  const productInCartIndex = cart.findIndex((item) => item?.product?.id === String(id));

  if (productInCartIndex === -1)
    return console.log(`there is no such product in the cart (id: ${id}) in the cart to remove`);

  const productInCart = cart[productInCartIndex];

  productInCart.product.stock += productInCart.quantity;

  cart.splice(productInCartIndex, 1);

  console.log(
    `product '${productInCart.product.name}' (id: ${productInCart.product.id}) removed from the cart`
  );
}

// Updates product quantity in the cart
function updateQuantity(id, quantity) {
  if (!validateId(id)) return;
  if (!validateQuantity(quantity)) return;

  const productInCart = cart.find((item) => item?.product?.id === String(id));
  if (!productInCart)
    return console.log(`there is no such product in the cart (id: ${id}) to update`);

  if (quantity === productInCart.quantity) return console.log(`cart already has ${quantity} items`);

  const totalAvailableQuantity = productInCart.product.stock + productInCart.quantity;
  if (quantity > totalAvailableQuantity) {
    return console.log(
      `store doesnt have that many products, available stock is ${totalAvailableQuantity}`
    );
  } else {
    console.log(
      `updated '${productInCart.product.name}' (id: ${id}) quantity from ${productInCart.quantity} to ${quantity}`
    );

    productInCart.product.stock -= quantity - productInCart.quantity;
    productInCart.quantity = quantity;
  }
}

// Returns all cart items & total price
function printCartDetails() {
  let totalCost = 0;
  console.group("--------[Cart Details]--------");
  if (cart.length > 0) {
    for (const { product, quantity } of cart) {
      const cost = quantity * product.price;
      console.log(
        `# id: ${product.id} | name: ${product.name} | quantity: ${quantity} | cost: €${Number(
          cost
        ).toFixed(2)}`
      );
      totalCost += cost;
    }
    console.log(`* Total price: €${Number(totalCost).toFixed(2).toLowerCase("lt")}`);
  } else {
    console.log("* There is no products in the cart");
  }
  console.groupEnd();
  console.log("-".repeat(30));
}

function printStoreDetails() {
  console.group("--------[Store Inventory]--------");
  if (store.length > 0) {
    for (const { id, name, price, stock } of store) {
      console.log(`> id: ${id} | name: ${name} | price: €${price} | stock: ${stock}`);
    }
  } else {
    console.log("* There is no products in the store");
  }
  console.groupEnd();
  console.log("-".repeat(33));
}

// (EXTRA) Interactive shopping experience
function startShoppingWindow() {
  console.clear();
  rl.question(
    `Select options:\n` +
      [
        "> type 'store' for display store inventory",
        "> type 'cart' for display cart inventory",
        "> type 'add [item id] [quantity]' to add items to the cart",
        "> type 'remove [item id]' to remove items from the cart",
        "> type 'update [item id] [quantity]' to change the quantity in the cart",
        "> type 'exit' to stop shopping",
      ].join("\n") +
      "\nEnter: ",
    async (answer) => {
      const [ans, itemId, quantity] = answer.split(" ");
      switch (ans) {
        case "store":
          printStoreDetails();
          break;
        case "cart":
          printCartDetails();
          break;
        case "add":
          addProduct(Number(itemId), Number(quantity));
          break;
        case "remove":
          removeProduct(Number(itemId));
          break;
        case "update":
          updateQuantity(Number(itemId), Number(quantity));
          break;
        case "exit":
          console.log("Exitting...");
          process.exit(0);
        default:
          console.log("Invalid option entered, try again... ");
          break;
      }

      showPressEnterWindow();
    }
  );
}

function showPressEnterWindow() {
  process.stdout.write("Press any key to continue ");
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.once("data", () => {
    rl.clearLine(process.stdout);
    process.stdin.setRawMode(false);
    startShoppingWindow();
  });
}

startShoppingWindow();
