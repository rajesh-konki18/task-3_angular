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

  index=0;

  clearFilters() {
    this.employees_local=this.empService.getEmployees();
    this.empService.flagAlphabets();
    this.empService.flag_subject.next(null);
  }

  employees : any;
  employees_local : any;
  jobs_local : any;
  departments_local : any;

  constructor(private empService : EmployeeService){
    // localStorage.clear();
    this.empService.putEmployeesStorage();
    this.empService.putDepartmentsStorage();
    this.empService.putJobsStorage();

    this.employees_local=this.empService.getEmployees();
    this.jobs_local =this.empService.getJobs();
    this.departments_local=this.empService.getDepartments();
    
  }

  showEmployeeDetails(index : any){
    this.AddEditComponent.showEmployeeDetails(index);
    this.index=index;
  }
 
  ngOnInit(): void {
    this.empService.employ_subject.subscribe(value => { this.employees_local=value;});
  }
}
