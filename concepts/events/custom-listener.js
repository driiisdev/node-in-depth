const Order = require('./custom-emitter');
const DrinkMachine = require('./dispense-func');

const order = new Order();
const drinkMachine = new DrinkMachine();

// listener registered before placeOrder() runs, since emit() only calls listeners that are already subscribed at the time it fires
order.on("order-pizza", (size, toppings) => {
  console.log(`Order received! Making a ${size} pizza with the following toppings: ${toppings.join(", ")}`);
  drinkMachine.serveDrink(size);
});

// placeOrder() increments orderNumber and emits "order-pizza", triggering the listener above
order.placeOrder("large", ["pepperoni", "mushrooms", "extra cheese"]);

order.displayOrderNumber();
