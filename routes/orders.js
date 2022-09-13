const express = require('express');
const { where } = require('underscore');
const router = express.Router();

router.get('/', (req,res) => {
    const mysql = require('mysql')
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Griffith@99',
      database: 'classicmodels'
    })
    
    connection.connect()
    orderquery='SELECT *  FROM orders';
    console.log(orderquery); 
    connection.query(orderquery, (err, rows, fields) => {
      if (err) throw err
    
      console.log('The solution is: ', rows[0])
      res.send(rows);
    })
  });
  
  router.get('/:id', (req, res) => {
    const mysql = require('mysql')
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Griffith@99',
      database: 'classicmodels'
    })
    
    connection.connect()
    customerNumber= parseInt(req.params.id);
    orderquery='SELECT c.customerNumber, o.orderNumber , o.orderDate , customerName, contactFirstName, contactLastName FROM customers c INNER JOIN orders o on c.customerNumber = o.customerNumber';
    orderquery=orderquery+' where c.customerNumber = '+customerNumber;
    console.log(orderquery); 
    connection.query(orderquery, (err, rows, fields) => {
      if (err) throw err
    
      console.log('The solution is: ', rows[0])
      res.send(rows);
    })
    
    connection.end()

    //   const customer = Customers.find(c=> c.id == parseInt(req.params.id));
    //   if(!customer) res.status(404).send("The customer with the id does not exist");
    //   res.send(customer);
  });
  
  router.post('/', (req, res) => {
      // const schema = Joi.object({
      //     id: Joi.string().min(1).required(),
      //     name: Joi.string().min(3).required()
      // });
      // const validation = schema.validate(req.body);
      // res.send(validation);
  
      // if(!req.body.name || req.body.name.length < 3) {
      //     res.status(400).send("Name should be at least 3 characters");
      //     return;
      // }
      // const customer = {
      //     id: Customers.length + 1,
      //     name: req.body.name
      // };
      // Customers.push|(customer);
      // res.send(customer);
      const order = {
        orderNumber: req.body.orderNumber,
        orderDate: req.body.orderDate,
        requiredDate: req.body.requiredDate, 
        shippedDate: req.body.shippedDate, 
        status: req.body.status, 
        comments: req.body.comments, 
        customerNumber: req.body.customerNumber
       };
      console.log(order);
      const mysql = require('mysql')
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Griffith@99',
      database: 'classicmodels'
    })
    
    connection.connect()
    customerNumber= parseInt(req.params.id);
    orderquery='INSERT INTO classicmodels.orders (orderNumber, orderDate, requiredDate, shippedDate, status, comments, customerNumber)'
    orderquery=orderquery+ ' VALUES ('+order.orderNumber+" , '"+ order.orderDate+"'"
    orderquery=orderquery+" , '"+order.requiredDate+"'"
    orderquery=orderquery+" , '"+order.shippedDate+"'"
    orderquery=orderquery+" , '"+order.status+"'"
    orderquery=orderquery+" , '"+order.comments+"'"
    orderquery=orderquery+" , "+order.customerNumber+")";
    console.log(orderquery); 
    connection.query(orderquery, (err, result) => {
      if (err){
        res.status(202).send("Error: Order has already been placed")
      return;
     }
        else
        {
        res.status(200).send("Order successfully placed")
      return;
      }
  });
});

module.exports = router;