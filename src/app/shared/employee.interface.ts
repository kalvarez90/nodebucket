/*
============================================
; Title:  employee.interface.ts
; Author: Professor Krasso
; Date:   29 March 2021
; Modified by: Karina Alvarez
; Description: employee interface
;===========================================
*/

//These are files being imported from external files
import { item } from './item.interface';

export interface Employee {
  empId: string;
  todo: item[];
  done: item[];
}
