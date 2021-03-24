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
const { create } = require('../db-models/employee');

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

/**
 * API: createTask
 */
//creating a new record
router.post('/:empId/tasks', async(req, res) => {

  //try_catch will help catch any exception occurring in the application
  try {

    //findOne object to find employee
    Employee.findOne({'empId': req.params.empId}, function(err, employee) {
      if(err)
      {
        // if an error occurs, console.log will help log this error
        console.log(err);

        const createTaskMongoDbError = new BaseResponse('500', `MongoDB Exception: ${e.message}`, null)
        res.status(500).send(createTaskMongoDbError.toObject());
      } else {
        console.log(employee);

        //item literal
        const item = {
          text: req.body.text
        };

        employee.todo.push(item);

        employee.save(function(err, updateEmployee) {
          if (err)
          {
            console.log(err);

            const createTaskCatchException= new BaseResponse('500', `MongoDB onsave() exception: ${err.message}`, null);
            res.status(500).send(createTaskOnSaveMongoDbError.toObject());
          } else {
            console.log(updateEmployee);
            const createTaskOnSaveSuccessResponse = new BaseResponse('200', 'Successful query', updateEmployee);
            res.status(200).send(createTaskOnSaveSuccessResponse.toObject());
          }
        })
      }
    })
  } catch (e) {
    //if production application this would be a log file or database
    console.log(e);

    //if error or exception occurs, this function will handle that
    const createTaskCatchException = new BaseResponse('500', `Internal Server Error: ${e.message}`, null)
    res.json(createTaskCatchException.toObject());
  }
})

module.exports = router;
