/*
============================================
; Title:  employee.js
; Author: Professor Krasso
; Date:   15 March 2021
; Modified by: Karina Alvarez
; Description: employee file
;===========================================
*/

//importing mongoose to interact with the database
const mongoose = require('mongoose');
const Item = require('./item');

//employee schema that creates the structure of the document
let employeeSchema = mongoose.Schema({
  empId: { type: String, unique: true },

  //todo and done are the field with an array of item
  //nested item collection
  todo: [Item],
  done: [Item]
}, { collection: "employees"})

//map schema to model and export it
module.exports = mongoose.model("Employee", employeeSchema);

