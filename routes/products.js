const express = require('express');
const { where } = require('underscore');
const router = express.Router();
  
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
    customerquery='SELECT c.customerNumber, o.orderNumber , o.orderDate , o2.productCode, p.productName, p.productLine, p.quantityInStock , customerName, contactLastName , contactFirstName FROM customers c INNER JOIN orders o on c.customerNumber = o.customerNumber Inner JOIN orderdetails o2 on o.orderNumber = o2.orderNumber INNER JOIN products p on p.productCode = o2.productCode ';
    customerquery=customerquery+' where c.customerNumber = '+customerNumber;
    console.log(customerquery); 
    connection.query(customerquery, (err, rows, fields) => {
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
      const schema = Joi.object({
          id: Joi.string().min(1).required(),
          name: Joi.string().min(3).required()
      });
      const validation = schema.validate(req.body);
      res.send(validation);
  
      if(!req.body.name || req.body.name.length < 3) {
          res.status(400).send("Name should be at least 3 characters");
          return;
      }
      const customer = {
          id: Customers.length + 1,
          name: req.body.name
      };
      Customers.push|(customer);
      res.send(customer);
  });

module.exports = router;