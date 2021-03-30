/*
============================================
; Title:  base-layout.component.ts
; Author: Professor Krasso
; Date:   8 March 2021
; Modified by: Karina Alvarez
; Description: base layout file
;===========================================
*/

//These are files being imported from external files
import { item } from './item.interface';

export interface Employee {
  empId: string;
  todo: item[];
  done: item[];
}
