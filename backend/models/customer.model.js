const sql = require("./db.js");

// constructor
const Customer = function (customer) {
  this.titulo = customer.titulo;
  this.descricao = customer.descricao;
  this.statu = customer.statu;
};

Customer.create = (newCustomer, result) => {
  sql.query("INSERT INTO taks SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
};

Customer.getAll = (result) => {
  sql.query("SELECT * FROM taks", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("taks: ", res);
    result(null, res);
  });
};

Customer.remove = (id, result) => {
  sql.query("DELETE FROM taks WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted taks with id: ", id);
    result(null, res);
  });
};

module.exports = Customer;
