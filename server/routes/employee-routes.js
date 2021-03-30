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

        if (employee)
        {
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

        //If invalid ID a different response will be output
        } else {
          console.log('Invalid employeeId')
          const invalidEmployeeIdResponse = new BaseResponse ('200', `Invalid Employee ID`, null);
          res.status(200).send(invalidEmployeeIdResponse.toObject());
        }

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


/**
 * API: findAllTasks
 */

//creating a new record to findAllTasks
router.get('/:empId/tasks', async(req, res) => {
  try
  {
    //51 minutes get comments
    Employee.findOne({'empId': req.params.empId}, 'empId todo done', function(err, employee) {

      if(err)
      {
        console.log(err)

        const mongoDBFindAllTasksException = new BaseResponse ('500', `Internal server error ${err.message}`, null);
        res.status(500).send(mongoDBFindAllTasksException.toObject());
      }

      //if errors does not occur
      else {
        console.log(employee)

        const employeeTaskResponse = new BaseResponse('200', 'Query successful', employee);
        res.status(200).send(employeeTaskResponse.toObject());
      }

    })
  }
  catch (e)
  {

    console.log(e)

    const errorCatchResponse = new BaseResponse('500', `Internal server error ${e.message}`, null);
    res.status(500).send(errorCatchResponse.toObject());
  }
})


/**
 * API: updateTask
 */

router.put('/:empId/tasks', async(req, res) => {

  try
  {

    //filtering by the empId
    Employee.findOne({'empId': req.params.empId}, function(err, employee) {

      //if error message, it will be logged by this function
      if (err)
      {
        console.log(err);

        const updateTaskMongodbException = new BaseResponse('500', `Internal server error ${err.message}`, null );
        res.status(500).send(updateTaskMongodbException.toObject());
      }
      else
      {
        console.log(employee);

        //this will help determine whether or not an employee record gets return from the system
        if (employee)
        {
          //if employee record is not null
          //sends over an array of todo and done item
          employee.set({
            todo: req.body.todo,
            done: req.body.done
          });

          employee.save(function(err, updatedEmployee) {
            if (err)
            {
              console.log(err);

              const updateTaskMongoDbError = new BaseResponse('500', `Internal server error ${err.message}`, null);
              res.status(500).send(updateTaskMongoDbError.toObject());
            }

            //if no error message then it will be updated successfully
            else
            {
              console.log(updatedEmployee);

              const updatedTaskSuccessResponse = new BaseResponse('200', 'Query Successful', updatedEmployee);
              res.status(200).send(updatedTaskSuccessResponse.toObject());
            }
          })
        }
        //if null, then it will be logged that it was an invalid ID
        else {
          console.log(`Invalid employee Id: the passed-in value was ${req.params.empId}`);

          const invalidEmployeeIdResponse = new BaseResponse('200', 'Invalid employee ID', null);
          res.status(200).send(invalidEmployeeIdResponse.toObject());
        }
      }
    })
  }
  catch(e)
  {
    console.log(e);

    const updateTaskCatchResponse = new BaseResponse('500', `Internal server error ${e.message}`, null);
    res.status(500).send(updateTaskCatchResponse.toObject());
  }
})

/**
 * API: deleteTask
 */
 router.delete('/:empId/tasks/:taskId', async(req, res) => {

  try
  {
    //this will help find the employee record
    Employee.findOne({'empId': req.params.empId}, function(err, employee) {
      //error handling
      if (err)
      {
        console.log(err);

        const deleteTaskMongoDbError = new BaseResponse('500', `Internal server error ${err.message}`, null);
        res.status(500).send(deleteTaskMongoDbError.toObject());
      }
      else
      {
        console.log(employee);

        //variable to hold the result of the find query against the todo array
        //it will find if the ID is in that array (todo or done)

        const todoItem = employee.todo.find(item => item._id.toString() === req.params.taskId);

        const doneItem = employee.done.find(item => item._id.toString() === req.params.taskId);

        //this will determine which of the above items is not null
        if (todoItem)
        {

          console.log(todoItem);

          employee.todo.id(todoItem._id).remove();

          employee.save(function(err, updatedTodoItemEmployee) {
            //if null, then it will not be removed
            if (err)
            {
              console.log(err);

              const deleteTodoItemMongodbError = new BaseResponse('500', `Internal server error ${err.message}`, null);
              res.status(500).send(deleteTodoItemMongodbError.toObject());
            }
            //if not null it will be removed from the array
            else{
              console.log(updatedTodoItemEmployee);

              const deleteTodoItemSuccess = new BaseResponse('200', 'Query Successful', updatedTodoItemEmployee);
              res.status(200).send(deleteTodoItemSuccess.toObject());
            }
          })

          //if null, it will be logged into the console
        } else if (doneItem) {
          console.log(doneItem);

          employee.done.id(doneItem._id).remove();

          employee.save(function(err, updatedDoneItemEmployee) {
            if (err)
            {
              console.log(err);

              const deleteDoneItemMongodbError = new BaseResponse('500', `Invalid server error ${err.message}`, null);
              res.status(500).send(deleteDoneItemMongodbError.toObject());
            }
            else
            {
              console.log(updatedDoneItemEmployee);
              const deleteDoneItemSuccess = new BaseResponse('200', 'Query successful', updatedDoneItemEmployee);
              res.status(200).send(deleteDoneItemSuccess.toObject());
            }
          })
        }

        //if todo and done item are null, then invalid task ID was entered
        else
        {
          console.log(`Invalid task ID: passed-in value ${req.params.taskId}`)
          const invalidTaskIdResponse = new BaseResponse('200', 'Invalid task ID', null);

          res.status(200).send(invalidTaskIdResponse.toObject());
        }
      }
    })

  }
  catch (e)
  {
    console.log(e);

    const deleteTaskCatchError = new BaseResponse('500', `Internal server error ${e.message}`, null);
    res.status(500).send(deleteTaskCatchError.toObject());
  }
 })


module.exports = router;
