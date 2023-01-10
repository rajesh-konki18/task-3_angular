import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  employ_subject = new Subject();
  job_subject = new Subject();
  department_subject = new Subject();
  flag_subject = new Subject();

  filters: any;
  alpha_flags: any;
  department_flags: any;
  job_flags: any;

  Employees = [
    this.newEmployee([
      '../assets/img-1.jpg',
      'Antony ',
      'Morris',
      'SharePoint Practice Head',
      'Antony',
      'IT Department',
      9876543210,
      'abc@gmail.com',
      3421783,
      'Seattle',
    ]),
    this.newEmployee([
      '../assets/img-2.jpg',
      'Helen ',
      'Zipperman',
      'Operations Manager',
      'Helen',
      'IT Department',
      9876543210,
      'abc@gmail.com',
      3421783,
      'Seattle',
    ]),
    this.newEmployee([
      '../assets/img-3.jpg',
      'Jonathan ',
      'Smith',
      'Product Manager',
      'Jonathan',
      'IT Department',
      9876543210,
      'abc@gmail.com',
      3421783,
      'India',
    ]),
    this.newEmployee([
      '../assets/img-4.jpg',
      'Angela ',
      'Bailey',
      'Talent Manager Jr.',
      'Angela',
      'HR Department',
      9876543210,
      'abc@gmail.com',
      3421783,
      'India',
    ]),
    this.newEmployee([
      '../assets/img-5.jpg',
      'Tami ',
      'Hopkins',
      'Lead Engineer Dot Net',
      'Tami',
      'IT Department',
      9876543210,
      'abc@gmail.com',
      3421783,
      'India',
    ]),
    this.newEmployee([
      '../assets/img-6.jpg',
      'Franklin ',
      'Humark',
      'Network Engineer',
      'Franklin',
      'IT Department',
      9876543210,
      'abc@gmail.com',
      3421783,
      'India',
    ]),
    this.newEmployee([
      '../assets/img-7.jpg',
      'Olivia ',
      'Watson',
      'UI Designer',
      'Olivia',
      'UX Department',
      9876543210,
      'abc@gmail.com',
      3421783,
      'India',
    ]),
    this.newEmployee([
      '../assets/img-8.jpg',
      'Robert ',
      'Mitchell',
      'Software Engineer',
      'Robert',
      'IT Department',
      9876543210,
      'abc@gmail.com',
      3421783,
      'India',
    ]),
  ];

  Departments = [
    this.newDepartment(['IT', 6]),
    this.newDepartment(['HR', 1]),
    this.newDepartment(['UX', 1]),
    this.newDepartment(['Sales', 1]),
  ];

  Jobs = [
    this.newJob(['SharePoint Practice Head', 1]),
    this.newJob(['Operations Manager', 1]),
    this.newJob(['Product Manager', 1]),
    this.newJob(['Talent Manager Jr.', 1]),
    this.newJob(['Lead Engineer Dot Net', 1]),
    this.newJob(['Network Engineer', 1]),
    this.newJob(['UI Designer', 1]),
    this.newJob(['Software Engineer', 1]),
  ];

  newDepartment (ar: any[]) {
    let new_department = {
      department: '',
      num: 1,
    };

    new_department.department = ar[0];
    new_department.num = ar[1];

    return new_department;
  }

  newJob(ar: any[]) {
    let job = {
      job: '',
      num: 1,
    };

    job.job = ar[0];
    job.num = ar[1];

    return job;
  }

  newEmployee(ar: any[]) {
    var employ_main = {
      src: '',
      FirstName: '',
      LastName: '',
      JobTitle: '',
      PreferredName: '',
      Department: '',
      PhoneNumber: 1,
      email: '',
      SkypeID: 1,
      office: '',
      src1: '../assets/card-end.jpg',
    };

    employ_main.src = ar[0];
    employ_main.FirstName = ar[1];
    employ_main.LastName = ar[2];
    employ_main.JobTitle = ar[3];
    employ_main.PreferredName = ar[4];
    employ_main.Department = ar[5];
    employ_main.PhoneNumber = ar[6];
    employ_main.email = ar[7];
    employ_main.SkypeID = ar[8];
    employ_main.office = ar[9];

    return employ_main;
  }

  getEmployees() {
    let e: any = localStorage.getItem('employees');
    return JSON.parse(e);
  }
  putEmployeesStorage() {
    if (localStorage.getItem('employees') == null) {
      localStorage.setItem('employees', JSON.stringify(this.Employees));
    }
  }
  getJobs() {
    let e: any = localStorage.getItem('jobs');
    return JSON.parse(e);
  }
  putJobsStorage() {
    if (localStorage.getItem('jobs') == null) {
      localStorage.setItem('jobs', JSON.stringify(this.Jobs));
    }
  }
  getDepartments() {
    let e: any = localStorage.getItem('departments');
    return JSON.parse(e);
  }
  putDepartmentsStorage() {
    if (localStorage.getItem('departments') == null) {
      localStorage.setItem('departments', JSON.stringify(this.Departments));
    }
  }

  flagAlphabets() {
    return this.alpha_flags.fill(0);
  }
  flagDepartments() {
    return this.department_flags.fill(0);
  }
  flagJobs() {
    return this.job_flags.fill(0);
  }

  createAlphabetFlag() {
    this.alpha_flags= new Array<number>(26).fill(0)
    return this.alpha_flags;
  }
  createJobFlag() {
    this.job_flags= new Array<number>(8).fill(0)
    return this.job_flags;
  }
  createDepartmentFlag() {
    this.department_flags= new Array<number>(4).fill(0)
    return this.department_flags;
  }

  constructor() {
  }

}
