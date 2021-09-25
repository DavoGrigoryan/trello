import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tasks} from "../interface/index";

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient) { }

  fetchTasks():Observable<Tasks[]>{
    return this.http.get<Tasks[]>('http://127.0.0.1:8000/api/all-tasks')
  }

  addTask(newTask:Tasks):Observable<any>{
    return this.http.post<any>('http://127.0.0.1:8000/api/add-task',newTask)
  }

  removeStatus(id: number | undefined):Observable<void>{
    return this.http.delete<void>(`http://127.0.0.1:8000/api/remove-status/${id}`)
  }

  changeStatus(cart:any):Observable<any>{
    return this.http.put<any>("http://127.0.0.1:8000/api/change-status/",cart)
  }

}
