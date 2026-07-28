const EventEmitter = require('node:events');

// extending EventEmitter gives Order its own on()/emit() API, so consumers can listen for "order-pizza" directly on an Order instance
class Order extends EventEmitter {
  constructor() {
    super(); // must call super() first to initialize EventEmitter's internal listener state
    this.orderNumber = 0;
  }

  placeOrder(size, toppings) {
    this.orderNumber++;
    this.emit("order-pizza", size, toppings);
  }

  displayOrderNumber() {
    console.log(`Current order number: ${this.orderNumber}`);
  }
}

module.exports = Order;
