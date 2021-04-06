/*
============================================
; Title:  not-found.component.ts
; Author: Professor Krasso
; Date:   2 April 2021
; Modified by: Karina Alvarez
; Description: Not found component file
;===========================================
*/

//These are files being imported from external files
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
