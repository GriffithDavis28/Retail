const Joi = require('joi');
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
    customerquery='SELECT customerNumber, customerName, contactLastName , contactFirstName  FROM customers';
    console.log(customerquery); 
    connection.query(customerquery, (err, rows, fields) => {
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
    customerquery='SELECT customerNumber, customerName, contactLastName , contactFirstName  FROM customers';
    customerquery=customerquery+' where customerNumber = '+customerNumber;
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
      const customer = {
          id: req.body.customerNumber,
          customerName: req.body.customerName,
          contactLastName: req.body.contactLastName,
          contactFirstName: req.body.contactFirstName,
          phone: req.body.phone,
          addressLine1: req.body.addressLine1,
          addressLine2: req.body.addressLine2,
          city: req.body.city,
          state: req.body.state,
          postalCode: req.body.postalCode,
          country: req.body.country,
          salesRepEmployeeNumber: req.body.salesRepEmployeeNumber,
          creditLimit: req.body.creditLimit 
      };
      console.log(customer);
      const mysql = require('mysql')
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Griffith@99',
      database: 'classicmodels'
    })
    
    connection.connect()
    customerNumber= parseInt(req.params.id);
    customerquery='INSERT INTO classicmodels.customers (customerNumber, customerName, contactLastName, contactFirstName, phone, addressLine1, addressLine2, city, state, postalCode, country, salesRepEmployeeNumber, creditLimit)'
    customerquery=customerquery+ ' VALUES ('+customer.id+" , '"+ customer.customerName+"'"
    customerquery=customerquery+" , '"+customer.contactFirstName+"'"
    customerquery=customerquery+" , '"+customer.contactLastName+"'"
    customerquery=customerquery+" , '"+customer.phone+"'"
    customerquery=customerquery+" , '"+customer.addressLine1+"'"
    customerquery=customerquery+" , '"+customer.addressLine2+"'"
    customerquery=customerquery+" , '"+customer.city+"'"
    customerquery=customerquery+" , '"+customer.state+"'"
    customerquery=customerquery+" , '"+customer.postalCode+"'"
    customerquery=customerquery+" , '"+customer.country+"'"
    customerquery=customerquery+" , "+customer.salesRepEmployeeNumber+""
    customerquery=customerquery+" , "+customer.creditLimit+")";
    console.log(customerquery); 
    connection.query(customerquery, (err, result) => {
      if (err){
        res.status(202).send("Errors found")
      return;
     }
        else
        {
        res.status(200).send("Record added successfully")
      return;
      }
  });
})

module.exports = router;