module.exports = (app) => {
  const customers = require("../controllers/customer.controller.js");

  // Create a new Customer
  app.post("/tasks", customers.create);

  // Retrieve all Customers
  app.get("/tasks", customers.findAll);

  // Delete a Customer with customerId
  app.delete("/tasks/:customerId", customers.delete);
};
