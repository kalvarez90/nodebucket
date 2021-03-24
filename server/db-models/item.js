/*
============================================
; Title:  item.js
; Author: Professor Krasso
; Date:   22 March 2021
; Modified by: Karina Alvarez
; Description: item file - help map into the emp.
;===========================================
*/

//importing mongoose - require array
const mongoose = require('mongoose');
const Schema = mongoose.Schema

//new item schema
let itemSchema = new Schema ({
  text: { type: String }
})

//returning the itemSchema
//this will  help to be accessible in other files
module.exports = itemSchema
