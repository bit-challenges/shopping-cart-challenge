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
  if (!Number.isInteger(id) || id <= 0) return console.log("invalid product id provided");
  return true;
}

function validateQuantity(quantity) {
  if (!Number.isInteger(quantity) || quantity <= 0)
    return console.log(`invalid quantity entered, must be at least 1`);
  return true;
}

function lithuanianCurrencyFormat(amount) {
  return amount.toLocaleString("lt-LT", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Adds product to the cart
function addProduct(id, quantity) {
  if (!validateId(id) || !validateQuantity(quantity)) return;

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
  console.log(`${quantity}x '${productInStore.name}' (id: ${productInStore.id}) added to the cart`);
}

// Removes a product from the cart
function removeProduct(id) {
  if (!validateId(id)) return;

  const productInCartIndex = cart.findIndex((item) => item?.product?.id === String(id));

  if (productInCartIndex === -1)
    return console.log(`there is no product with id '${id}' in the cart`);

  const productInCart = cart[productInCartIndex];

  productInCart.product.stock += productInCart.quantity;

  cart.splice(productInCartIndex, 1);

  console.log(
    `product '${productInCart.product.name}' (id: ${productInCart.product.id}) removed from the cart`
  );
}

// Updates product quantity in the cart
function updateQuantity(id, quantity) {
  if (!validateId(id) || !validateQuantity(quantity)) return;

  const productInCart = cart.find((item) => item?.product?.id === String(id));
  if (!productInCart)
    return console.log(`there is no such product in the cart (id: ${id}) to update`);

  if (quantity === productInCart.quantity) return console.log(`cart already has ${quantity} items`);

  const totalAvailableQuantity = productInCart.product.stock + productInCart.quantity;
  if (quantity > totalAvailableQuantity)
    return console.log(
      `store doesnt have that many products, available stock is ${totalAvailableQuantity}`
    );

  console.log(
    `updated '${productInCart.product.name}' (id: ${id}) quantity from ${productInCart.quantity} to ${quantity}`
  );

  productInCart.product.stock -= quantity - productInCart.quantity;
  productInCart.quantity = quantity;
}

// Returns all cart items & total price
function printCartDetails() {
  let totalCost = 0;
  console.group("--------[Cart Details]--------");
  if (cart.length > 0) {
    for (const { product, quantity } of cart) {
      const cost = quantity * product.price;
      console.log(
        `# id: ${product.id} | name: ${
          product.name
        } | quantity: ${quantity} | cost: ${lithuanianCurrencyFormat(cost)} €`
      );
      totalCost += cost;
    }
    console.log(`* total price: ${lithuanianCurrencyFormat(totalCost)} €`);
  } else {
    console.log("* there is no products in the cart");
  }
  console.groupEnd();
  console.log("-".repeat(30));
}

// Returns all store items
function printStoreDetails() {
  console.group("--------[Store Inventory]--------");
  if (store.length > 0) {
    for (const { id, name, price, stock } of store) {
      console.log(
        `> id: ${id} | name: ${name} | price: ${lithuanianCurrencyFormat(price)} € | stock: ${stock}`
      );
    }
  } else {
    console.log("* there is no products in the store");
  }
  console.groupEnd();
  console.log("-".repeat(33));
}

// (EXTRA) Interactive shopping experience
function startShoppingWindow() {
  console.clear();
  rl.question(
    [
      "Available options:",
      "> type 'store' for display store inventory",
      "> type 'cart' for display cart inventory",
      "> type 'add [item id] [quantity]' to add items to the cart",
      "> type 'remove [item id]' to remove items from the cart",
      "> type 'update [item id] [quantity]' to change the quantity in the cart",
      "> type 'exit' to stop shopping",
      "Type the command: ",
    ].join("\n"),
    async (answer) => {
      const [ans, itemId, quantity] = answer.split(" ");
      switch (ans) {
        case "store": // displays all store items
          printStoreDetails();
          break;

        case "cart": // displays all cart items
          printCartDetails();
          break;

        case "add": // adds product to the cart
          if (!itemId || !quantity) {
            console.log("missing parameters, use 'add [item id] [quantity]'");
          } else {
            addProduct(Number(itemId), Number(quantity));
          }
          break;

        case "remove": // removes a product from the cart
          if (!itemId) {
            console.log("missing parameters, use 'remove [item id]'");
          } else {
            removeProduct(Number(itemId));
          }
          break;

        case "update": // updates product quantity in the cart
          if (!itemId || !quantity) {
            console.log("missing parameters, use 'update [item id] [quantity]'");
          } else {
            updateQuantity(Number(itemId), Number(quantity));
          }
          break;

        case "exit": // exits the application
          console.log("Exiting...");
          process.exit(0);

        default: // if invalid command
          console.log("invalid option entered, check command and try again... ");
          break;
      }

      process.stdout.write("Press any key to continue ");
      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.once("data", () => {
        rl.clearLine(process.stdout);
        process.stdin.setRawMode(false);
        startShoppingWindow();
      });
    }
  );
}

startShoppingWindow();
