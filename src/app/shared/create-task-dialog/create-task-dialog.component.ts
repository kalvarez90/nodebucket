/*
============================================
; Title: create-task-dialog.component.ts
; Author: Professor Krasso
; Date:   31 March 2021
; Modified by: Karina Alvarez
; Description: create task component
;===========================================
*/

//These are files being imported from external files
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css']
})
export class CreateTaskDialogComponent implements OnInit {

  taskForm: FormGroup

  constructor(private dialogRef: MatDialogRef<CreateTaskDialogComponent>, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      text: [null, Validators.compose([Validators.required, Validators.minLength(10)])]
    })
  }

  //when submit is clicked, the data will be the form value
  // enter can be pressed to submit
  createTask() {
    this.dialogRef.close(this.taskForm.value)
  }

  // cancel will close the form
  cancel() {
    this.dialogRef.close();
  }

}
