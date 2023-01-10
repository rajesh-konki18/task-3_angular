import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-left-filters',
  templateUrl: './left-filters.component.html',
  styleUrls: ['../main.component.css']
})
export class LeftFiltersComponent implements OnInit {

  hide_view=true;
  jobs : any;
  departments : any;
  employees_local : any;
  department_flags : any;
  job_flags : any;
  flag : any = null;
  
  expand() {
    this.hide_view=false;
  }
  compress() {
    this.hide_view=true;
  }

  filterDepartments(department : string, i : number){
    let value=department.toLowerCase();
    this.department_flags=this.empService.flagDepartments();
    this.job_flags=this.empService.flagJobs();
    this.department_flags[i]=1;
    if(this.flag==null){
      let filtered_cards=this.employees_local.filter(function (card : any) {
        return (
          card.Department.toLowerCase().startsWith(value)
        );
      });
      this.empService.employ_subject.next(filtered_cards);
    }
    else {
      let filtered_cards=this.employees_local.filter( (card : any) => {
        return (
          card.Department.toLowerCase().startsWith(value) && card.FirstName.startsWith(String.fromCharCode(this.flag+65)
        ))
      })
      this.empService.employ_subject.next(filtered_cards);
    }
    
  }

  filterJobs(job : string, i: number){
    var value=job.toLowerCase().split(" ")[0];
    this.department_flags=this.empService.flagDepartments();
    this.job_flags=this.empService.flagJobs();
    this.job_flags[i]=1;
    if(this.flag==null){
      let filtered_cards=this.employees_local.filter(function (card : any) {
        return (
          card.JobTitle.toLowerCase().startsWith(value)
        );
      })
      this.empService.employ_subject.next(filtered_cards);
    }
    else {
      let filtered_cards=this.employees_local.filter( (card : any) => {
        return (
          card.JobTitle.toLowerCase().startsWith(value) && card.FirstName.startsWith(String.fromCharCode(this.flag+65)
          ))
      })
      this.empService.employ_subject.next(filtered_cards);
    }
    
  }
  
  constructor(private empService : EmployeeService) { 
    this.employees_local=this.empService.getEmployees();
    this.jobs=this.empService.getJobs();
    this.departments=this.empService.getDepartments();
    this.department_flags=this.empService.createDepartmentFlag();
    this.job_flags=this.empService.createJobFlag();
  }

  ngOnInit(): void {
    this.empService.department_subject.subscribe(value => { this.departments=value;});
    this.empService.job_subject.subscribe(value => { this.jobs=value;});
    this.empService.flag_subject.subscribe(value =>{this.flag=value;});
    }
  }
