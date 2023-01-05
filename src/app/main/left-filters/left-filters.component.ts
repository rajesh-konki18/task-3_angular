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
  flag : any;
  
  expand() {
    this.hide_view=false;
  }
  compress() {
    this.hide_view=true;
  }

  department_fltr(dep : string, i : number){
    var val=dep.toLowerCase();

    this.department_flags=this.empService.flag_departments();
    this.job_flags=this.empService.flag_jobs();
    this.department_flags[i]=1;
    if(this.flag==null){
      let filteredcards=this.employees_local.filter(function (card : any) {
        return (
          card.Department.toLowerCase().startsWith(val)
        );
      });
      this.empService.employ_subject.next(filteredcards);
    }
    else {
      let filteredcards=this.employees_local.filter( (card : any) => {
        return (
          card.Department.toLowerCase().startsWith(val) && card.FirstName.startsWith(String.fromCharCode(this.flag+65)
        ))
      })
      this.empService.employ_subject.next(filteredcards);
    }
    
  }

  job_fltr(job : string, i: number){
    var val=job.toLowerCase().split(" ")[0];
    this.department_flags=this.empService.flag_departments();
    this.job_flags=this.empService.flag_jobs();
    this.job_flags[i]=1;
    if(this.flag==null){
      let filteredcards=this.employees_local.filter(function (card : any) {
        return (
          card.JobTitle.toLowerCase().startsWith(val)
        );
      })
      this.empService.employ_subject.next(filteredcards);
    }
    else {
      let filteredcards=this.employees_local.filter( (card : any) => {
        return (
          card.JobTitle.toLowerCase().startsWith(val) && card.FirstName.startsWith(String.fromCharCode(this.flag+65)
          ))
      })
      this.empService.employ_subject.next(filteredcards);
    }
    
  }
  
  constructor(private empService : EmployeeService) { 
    this.employees_local=this.empService.getEmployees();
    this.jobs=this.empService.getJobs();
    this.departments=this.empService.getDepartments();
    this.department_flags=this.empService.department();
    this.job_flags=this.empService.job();
  }

  ngOnInit(): void {
    this.empService.department_subject.subscribe(val => { this.departments=val;});
    this.empService.job_subject.subscribe(val => { this.jobs=val;});
    this.empService.flag_subject.subscribe(val =>{this.flag=val;});
    }
  }
