import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {DbService} from "../../services/db.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Tasks} from "../../interface/index";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks:Tasks[]=[];
  form:FormGroup | any
  open:boolean = false

  constructor(private dbService:DbService, private http:HttpClient) { }

  ngOnInit() {
    this.form= new FormGroup({
      taskTitle:new FormControl('',[Validators.required])
    })

    this.fetchTasks()

  }


  // http request

  fetchTasks(){
    this.dbService.fetchTasks()
      .subscribe((data:any)=>{
        this.tasks=data
      })
  }

  addTask() {
    if(this.form.valid){
      this.dbService.addTask(<Tasks>{
        title:this.form.value.taskTitle

      })
        .subscribe((data:any)=>{
          this.fetchTasks()
        })
    }
  }


  removeStatus(id?: number) {
    this.dbService.removeStatus(id)
      .subscribe(data=>{
        this.fetchTasks()
      })
  }
// end http request

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

    }

    let cartId = event.container.id.split('-').pop()
    let id:any = event.container.data[event.currentIndex].id


    this.changeStatus({"taskId":id,"cartId":cartId})

  }

  changeStatus(cart:any){
     this.dbService.changeStatus(cart)
       .subscribe(data=>{
         // this.fetchTasks()
       })
  }

}
