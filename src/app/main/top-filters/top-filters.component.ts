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

  @Output() clear_event = new EventEmitter();


  clear(value : any){
    value.value=null;
    this.clear_event.emit();
    this.empService.flagAlphabets();
    this.empService.flagDepartments();
    this.empService.flagJobs();
  }

  searchFilter(value : any) {
    let filtered_cards;
    if(this.name==true){
      let e=value.target.value.toLowerCase();
      if(this.flag==null){
        filtered_cards=this.employees_local.filter(function (card : any) {
          return (
            card.FirstName.toLowerCase().startsWith(e)
          );
        })
      }
      else {
        filtered_cards=this.employees_local.filter( (card : any) => {
          return (
            card.FirstName.toLowerCase().startsWith(e) && card.FirstName.startsWith(String.fromCharCode(this.flag+65))
            )})
      }
    }

    else if(this.department==true){
      let e=value.target.value.toLowerCase();
      if(this.flag==null){
        filtered_cards=this.employees_local.filter(function (card : any) {
          return (
            card.Department.toLowerCase().startsWith(e)
          );
        });
      }
      else {
        filtered_cards=this.employees_local.filter( (card : any) => {
          return (
            card.Department.toLowerCase().startsWith(e) && card.FirstName.startsWith(String.fromCharCode(this.flag+65))
          );
        });
      }
    }

    else if(this.job==true){
      let e=value.target.value.toLowerCase();
      if(this.flag==null){
        filtered_cards=this.employees_local.filter(function (card : any) {
          return (
            card.JobTitle.toLowerCase().startsWith(e)
          );
        })
      }

      else {
        console.log(456);
        filtered_cards=this.employees_local.filter( (card : any) => {
          return (
            card.JobTitle.toLowerCase().startsWith(e) && card.FirstName.startsWith(String.fromCharCode(this.flag+65))
          );
        })
      } 
    }
    
    this.empService.employ_subject.next(filtered_cards);
  }
  
  dropFilter(drop : any) {
    let filtered_cards;
    if (drop.target.value == "Preferred Name") {
      this.name=true;
      this.department=false;
      this.job=false;
      filtered_cards=this.employees_local.sort((a : any, b : any) =>
      a.PreferredName < b.PreferredName ? -1 : 1
      )
    }
    else if (drop.target.value == "Department") {
      this.name=false;
      this.department=true;
      this.job=false;
      filtered_cards=this.employees_local.sort((a : any, b : any) =>
      a.Department < b.Department ? -1 : 1
    );
    } 
    else if (drop.target.value == "Job Title") {
      this.name=false;
      this.department=false;
      this.job=true;
      filtered_cards=this.employees_local.sort((a : any, b : any) =>
      a.JobTitle < b.JobTitle ? -1 : 1
    );
    }
    this.empService.employ_subject.next(filtered_cards);
    }
  constructor(private empService : EmployeeService) {
    this.employees_local=this.empService.getEmployees(); 
  }

  flag : any;

  ngOnInit(): void {
    this.empService.createAlphabetFlag();
    this.empService.createDepartmentFlag();
    this.empService.createJobFlag();
    this.empService.flag_subject.subscribe(value =>{this.flag=value;});
  }

}
