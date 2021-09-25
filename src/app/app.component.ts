import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppService} from "./services/app.service";
import {Status} from "./interface/index";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit{


  formStatus:FormGroup | any
  status:Status[]=[]

  constructor(private appService:AppService) {
  }

  ngOnInit() {
    this.formStatus= new FormGroup({
      nameStatus:new FormControl('',[Validators.required])
    })
  }

  addStatus() {
    this.appService.addStatus({
      title:this.formStatus.value.nameStatus
    }).subscribe(data=>{

    })
  }


}
