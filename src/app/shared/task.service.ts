/*
============================================
; Title:  task.service.ts
; Author: Professor Krasso
; Date:   29 March 2021
; Modified by: Karina Alvarez
; Description: task service file
;===========================================
*/

//These are files being imported from external files
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { item } from './item.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  constructor(private http: HttpClient) { }

  /**
   *
   * @param empId string for the employee
   * @returns an observable of type any
   */
  findAllTasks(empId: string): Observable<any> {
    //specifying the API call
    return this.http.get(`/api/employees/${empId}/tasks`)
  }

  /**
   *
   * @param empId string for the employee
   * @param task string for the tasks
   * @returns and observable of type any
   */
  createTask(empId: string, task: string): Observable<any> {
    return this.http.post(`/api/employees/${empId}/tasks`, {
      text: task
    })
  }

  /**
   *
   * @param empId string for the employee
   * @param todo string of items
   * @param done string of items
   * @returns an observable of type any
   */
  updateTask(empId: string, todo: item[], done: item[]): Observable<any> {
    return this.http.put(`/api/employees/${empId}/tasks`, {
      todo,
      done
    })
  }

  /**
   *
   * @param empId string for the employee
   * @param taskId string for the task Id
   * @returns An observable of type any
   */
  deleteTask(empId: string, taskId: string): Observable<any> {
    return this.http.delete(`/api/employees/${empId}/tasks/${taskId}`)
  }
}
