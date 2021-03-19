/*
============================================
; Title:  login.component.ts
; Author: Professor Krasso
; Date:   17 March 2021
; Modified by: Karina Alvarez
; Description: login component file
;===========================================
*/

//These are files being imported from external files
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private cookieService: CookieService,
              private http: HttpClient, private snackBar: MatSnackBar ) { }

  //creating a new Angular form
   //Angular built-in required Validator only accepting numeric values. Field is required.
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      empId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
    });
  }

  //this is the login function needed to help the employee login with a valid ID
  // If an invalid ID is entered, the else..if will handle this by showing a warning message
  login() {
    const empId = this.loginForm.controls['empId'].value;
    console.log(empId);

    this.http.get('/api/employees/' + empId).subscribe(res => {
      if (res['data'])
      {
        this.cookieService.set('session_user', empId, 1);
        this.router.navigate(['/']);
      }
      else if (!(res['data']) && (res['httpCode'] === '200'))
      {
        this.openSnackBar('Invalid employeeId, please try again', 'WARNING');
      }
      else
      {
        this.openSnackBar(res['message'], 'ERROR');
      }

  })
}

//this will help display the error or warning message for three seconds
openSnackBar(message: string, notificationType: string) : void {
  this.snackBar.open(message, notificationType, {
    duration: 3000,
    verticalPosition: 'top'
  })
}
}
