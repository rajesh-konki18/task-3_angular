import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-top-filters',
  templateUrl: './top-filters.component.html',
  styleUrls: ['./top-filters.component.css']
})
export class TopFiltersComponent implements OnInit {

  employees_local : any;
  name : boolean = false;
  department : boolean = false;
  job : boolean = false;

  @Output() clr_event = new EventEmitter();


  clear(val : any){
    val.value=null;
    this.clr_event.emit();
    this.empService.flag_alpha();
    this.empService.flag_departments();
    this.empService.flag_jobs();
  }

  srch_fltr(val : any) {
    let filteredcards;
    if(this.name==true){
      let e=val.target.value.toLowerCase();
      if(this.f==null){
        filteredcards=this.employees_local.filter(function (card : any) {
          return (
            card.FirstName.toLowerCase().startsWith(e)
          );
        })
      }
      else {
        filteredcards=this.employees_local.filter( (card : any) => {
          return (
            card.FirstName.toLowerCase().startsWith(e) && card.FirstName.startsWith(String.fromCharCode(this.f+65))
            )})
      }
    
    }

    else if(this.department==true){
      let e=val.target.value.toLowerCase();
      if(this.f==null){
        filteredcards=this.employees_local.filter(function (card : any) {
          return (
            card.Department.toLowerCase().startsWith(e)
          );
        });
      }
      else {
        filteredcards=this.employees_local.filter( (card : any) => {
          return (
            card.Department.toLowerCase().startsWith(e) && card.FirstName.startsWith(String.fromCharCode(this.f+65))
          );
        });
      }
      
    }
    else if(this.job==true){
      let e=val.target.value.toLowerCase();
      if(this.f==null){
        console.log(e,);
        filteredcards=this.employees_local.filter(function (card : any) {
          return (
            card.JobTitle.toLowerCase().startsWith(e)
          );
        })
      }
      else {
        console.log(456);
        filteredcards=this.employees_local.filter( (card : any) => {
          return (
            card.JobTitle.toLowerCase().startsWith(e) && card.FirstName.startsWith(String.fromCharCode(this.f+65))
          );
        })
      }
      
    }
    this.empService.employ$.next(filteredcards);
  }
  
  drp_fltr(drop : any) {
    let filteredcards;
    if (drop.target.value == "Preferred Name") {
      this.name=true;
      this.department=false;
      this.job=false;
      filteredcards=this.employees_local.sort((a : any, b : any) =>
      a.PreferredName < b.PreferredName ? -1 : 1
      )
    }
    else if (drop.target.value == "Department") {
      this.name=false;
      this.department=true;
      this.job=false;
      filteredcards=this.employees_local.sort((a : any, b : any) =>
      a.Department < b.Department ? -1 : 1
    );
    } 
    else if (drop.target.value == "Job Title") {
      this.name=false;
      this.department=false;
      this.job=true;
      filteredcards=this.employees_local.sort((a : any, b : any) =>
      a.JobTitle < b.JobTitle ? -1 : 1
    );
    }
    this.empService.employ$.next(filteredcards);
    }
  constructor(private empService : EmployeeService) {
    this.employees_local=this.empService.getEmployees();
    
  }

  f : any;

  ngOnInit(): void {
    this.empService.alpha();
    this.empService.department();
    this.empService.job();
    this.empService.flag_alpha$.subscribe(val =>{this.f=val;});
  }

}
