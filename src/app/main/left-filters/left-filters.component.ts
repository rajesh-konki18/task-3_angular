import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-left-filters',
  templateUrl: './left-filters.component.html',
  styleUrls: ['../main.component.css']
})
export class LeftFiltersComponent implements OnInit {

  hide=true;
  flag=0;
  jobs : any;
  departments : any;
  employees_local : any;
  dp : any;
  jb : any;
  al_flag : any;
  
  expand() {
    this.hide=false;
  }
  compress() {
    this.hide=true;
  }

  dep_fltr(dep : string, i : number){
    var val=dep.toLowerCase();
    // this.empService.al=this.empService.flag_alpha();

    this.dp=this.empService.flag_departments();
    this.jb=this.empService.flag_jobs();
    this.dp[i]=1;
    if(this.f==null){
      let filteredcards=this.employees_local.filter(function (card : any) {
        return (
          card.Department.toLowerCase().startsWith(val)
        );
      });
      this.empService.employ$.next(filteredcards);
    }
    else {
      let filteredcards=this.employees_local.filter( (card : any) => {
        return (
          card.Department.toLowerCase().startsWith(val) && card.FirstName.startsWith(String.fromCharCode(this.f+65)
        ))
      })
      this.empService.employ$.next(filteredcards);
    }
    
  }

  job_fltr(job : string, i: number){
    var val=job.toLowerCase().split(" ")[0];
    this.dp=this.empService.flag_departments();
    this.jb=this.empService.flag_jobs();
    this.jb[i]=1;
    if(this.f==null){
      let filteredcards=this.employees_local.filter(function (card : any) {
        return (
          card.JobTitle.toLowerCase().startsWith(val)
        );
      })
      this.empService.employ$.next(filteredcards);
    }
    else {
      let filteredcards=this.employees_local.filter( (card : any) => {
        return (
          card.JobTitle.toLowerCase().startsWith(val) && card.FirstName.startsWith(String.fromCharCode(this.f+65)
          ))
      })
      this.empService.employ$.next(filteredcards);
    }
    
  }
  f : any;
  constructor(private empService : EmployeeService) { 
    this.employees_local=empService.getEmployees();
    this.jobs=empService.getJobs();
    this.departments=empService.getDepartments();
    this.dp=this.empService.department();
    this.jb=this.empService.job();
  }

  ngOnInit(): void {
    this.empService.department$.subscribe(val => { this.departments=val;});
    this.empService.job$.subscribe(val => { this.jobs=val;});
    this.empService.flag_alpha$.subscribe(val =>{this.f=val;});
    // this.empService.employ$.subscribe(val => {this.employees_local=val;});
    }
  }
