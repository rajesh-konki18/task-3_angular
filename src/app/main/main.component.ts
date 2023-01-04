import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { AddEditComponent } from './add-edit/add-edit.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @ViewChild(AddEditComponent) AddEditComponent : any;

  flag=0;
  index=0;

  clear() {
    this.flag=0;
    this.employees_local=this.empService.getEmployees();
  }

  employees : any;
  employees_local : any;
  jobs_local : any;
  departments_local : any;
  filteredcards : any;

  constructor(private empService : EmployeeService){
    // localStorage.clear();
    this.empService.putEmployeesLocalBegin();
    this.empService.putDepartmentsLocalBegin();
    this.empService.putJobsLocalBegin();

    this.employees_local=this.empService.getEmployees();
    this.jobs_local =this.empService.getJobs();
    this.departments_local=this.empService.getDepartments();
    
  
  }

  employee_new : any = {
    FirstName: "",
    LastName : "",
    JobTitle: "",
    PreferredName: "",
    Department: "",
    PhoneNumber: "",
    email: "",
    SkypeID: "",
    office: "",
  }

  show(i : any){
    this.AddEditComponent.show(i);
    this.index=i;
  }
 
  ngOnInit(): void {
    this.empService.employ$.subscribe(val => { this.employees_local=val;});
  }
}
