import { Component, OnInit,Input, EventEmitter } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  @Input() index: any;

  constructor(private empService : EmployeeService) {
    this.employees_local=this.empService.getEmployees();
    this.jobs=this.empService.getJobs();
    this.departments=this.empService.getDepartments();
  }

  jobs : any[] = [];
  departments : any[] = [];
  employees_local : any;
  pop_up=true;
  hide_save=true;

  show(i : any){
    this.pop_up=false;
    this.hide_save=false;
    this.employee_new.FirstName=this.employees_local[i].FirstName;
    this.employee_new.LastName=this.employees_local[i].LastName;
    this.employee_new.email=this.employees_local[i].email;
    this.employee_new.JobTitle=this.employees_local[i].JobTitle;
    this.employee_new.Department=this.employees_local[i].Department.split(" ")[0];
    this.employee_new.office=this.employees_local[i].office;
    this.employee_new.PhoneNumber=this.employees_local[i].PhoneNumber;
    this.employee_new.SkypeID=this.employees_local[i].SkypeID;

  }

  employee(ar : any[]) {
    var employ_main = {
      src: "",
      FirstName: "",
      LastName: "",
      JobTitle: "",
      PreferredName: "",
      Department: "",
      PhoneNumber: 1,
      email: "",
      SkypeID: 1,
      office: "",
      src1: "../assets/card-end.jpg",
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

  close() {
    this.pop_up=true;
  }
  open() {
    this.pop_up=false;
    this.employee_new.FirstName="";
    this.employee_new.LastName="";
    this.employee_new.email="";
    this.employee_new.JobTitle="";
    this.employee_new.Department="";
    this.employee_new.office="";
    this.employee_new.PhoneNumber="";
    this.employee_new.SkypeID="";
  }

  add(frst : any,lst : any,email : any,job : any,office : any,depart : any,phn : any,skype : any,){
    if(frst.value=="" || lst.value=="" || email.value== "" || job.value=="" || depart.value=="" || phn.value=="" || skype.value==""){
      alert("Fill all details");
    }
    else{
      let new_employee= this.employee(["../assets/img-8.jpg",frst.value,lst.value,job.value,frst.value,depart.value + " Department",phn.value,email.value,skype.value,office.value]);
      let e : any=localStorage.getItem("employees");
      let employee_array = JSON.parse(e);
      employee_array.push(new_employee);
      localStorage.removeItem("employees");
      localStorage.setItem("employees", JSON.stringify(employee_array));
      this.empService.employ$.next(employee_array);
      

      let new_jobs = new_employee.JobTitle;
      if (new_jobs == "SharePoint Practice Head") {
        this.jobs[0].num += 1;
      } else if (new_jobs == "Operations Manager") {
        this.jobs[1].num += 1;
      } else if (new_jobs == "Product Manager") {
        this.jobs[2].num += 1;
      } else if (new_jobs == "Talent Manager Jr.") {
        this.jobs[3].num += 1;
      } else if (new_jobs == "Lead Engineer Dot Net") {
        this.jobs[4].num += 1;
      }
      localStorage.removeItem("jobs");
      localStorage.setItem("jobs", JSON.stringify(this.jobs));
      this.empService.job$.next(this.jobs);

      let new_dep = new_employee.Department.split(" ")[0];
      if (new_dep.startsWith("IT")) {
        this.departments[0].num += 1;
      } else if (new_dep=="HR") {
        this.departments[1].num += 1;
      } else if (new_dep=="UX") {
        this.departments[2].num += 1;
      } else if (new_dep=="Sales") {
        this.departments[3].num += 1;
      }
      localStorage.removeItem("departments");
      localStorage.setItem("departments", JSON.stringify(this.departments));
      this.empService.department$.next(this.departments);

    }
  }

  save(frst : any,lst : any,email : any,job : any,office : any,depart : any,phn : any,skype : any){
    if(frst.value=="" || lst.value=="" || email.value== "" || job.value=="" || depart.value=="" || phn.value=="" || skype.value==""){
      alert("Fill all details");
    }
    else{
      let e : any= localStorage.getItem("employees");
      let save_employ : any = JSON.parse(e);
      save_employ[this.index].FirstName=frst.value+" ";
      save_employ[this.index].LastName=lst.value;
      save_employ[this.index].JobTitle=job.value;
      save_employ[this.index].Department=depart.value + " Department";
      save_employ[this.index].email=email.value;
      save_employ[this.index].PhoneNumber=phn.value;
      save_employ[this.index].SkypeID=skype.value;
      localStorage.removeItem("employees");
      localStorage.setItem("employees", JSON.stringify(save_employ));
      this.empService.employ$.next(save_employ);
    } 
  }

  ngOnInit(): void {
  }

}
