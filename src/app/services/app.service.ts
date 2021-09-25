import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Status} from "../interface/index";


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  addStatus(newStatus:Status):Observable<any>{
    console.log(newStatus)
    return this.http.post<any>('http://127.0.0.1:8000/api/add-status',newStatus)
  }
}
