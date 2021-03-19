/*
============================================
; Title:  employee-routes.js
; Author: Professor Krasso
; Date:   18 March 2021
; Modified by: Karina Alvarez
; Description: employee routes application
;===========================================
*/

//require files to export
const express = require('express');
const Employee = require("../db-models/employee");
const BaseResponse = require('../service/base-response');
const { $ } = require('protractor');

//It defines router variables
const router = express.Router();

// each API will go through this route -> http://localhost:3000/api/employees/:empId

/**
 * API: findEmployeeById
 * @param empId
 * @returns Employee document (MongoDb) or null
 */
router.get('/:empId', async(req, res) => {

  try
  {
    //this is how we are filtering the data
    Employee.findOne({'empId': req.params.empId}, function(err, employee) {

      if (err)
      {
        console.log(err);

        const mongoDBErrorResponse = new BaseResponse('500', `MongoDB native Error: ${err}`, null );

        res.json(mongoDBErrorResponse.toObject());
      }
      else
      {
        console.log(employee);

        const employeeResponse = new BaseResponse('200', 'Successful query', employee);

        res.json(employeeResponse.toObject());

      }
    } )
  }
  catch (e)
  {
    console.log(e);

    const findEmployeeCatchError = new BaseResponse('500', `Internal Server Error: ${e.message}`, null );

        res.json(findEmployeeCatchError.toObject());
  }
})

module.exports = router;
