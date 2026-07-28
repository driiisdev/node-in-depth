const EventEmitter = require("node:events");

const emitter = new EventEmitter();

// multiple listeners can subscribe to the same event; they run in the order they were registered, synchronously, when emit() is called
emitter.on("order-pizza", (size, toppings) => {
  console.log(`Order received! Making a ${size} pizza with the following toppings: ${toppings.join(", ")}`);
});

emitter.on("order-pizza", (size, toppings) => {
  if (size === "large") {
    console.log("Large pizza ordered! Adding a free drink to the order.");
  }
});

// non blocking code test
console.log("Before emitting the event");

// emit() runs all "order-pizza" listeners immediately (synchronously) before moving to the next line, so "Event emitted!" logs after the listener output
emitter.emit("order-pizza", "large", ["pepperoni", "mushrooms", "extra cheese"]);

console.log("Event emitted!");
