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
  hide_form=true;
  hide_savebtn=true;

  showEmployeeDetails(i : any){
    this.hide_form=false;
    this.hide_savebtn=false;
    this.NewEmployee.FirstName=this.employees_local[i].FirstName;
    this.NewEmployee.LastName=this.employees_local[i].LastName;
    this.NewEmployee.email=this.employees_local[i].email;
    this.NewEmployee.JobTitle=this.employees_local[i].JobTitle;
    this.NewEmployee.Department=this.employees_local[i].Department.split(" ")[0];
    this.NewEmployee.office=this.employees_local[i].office;
    this.NewEmployee.PhoneNumber=this.employees_local[i].PhoneNumber;
    this.NewEmployee.SkypeID=this.employees_local[i].SkypeID;

  }

  NewEmployee : any = {
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

  closeForm() {
    this.hide_form=true;
    this.hide_savebtn=true;
  }
  openForm() {
    this.hide_form=false;
    this.NewEmployee.FirstName="";
    this.NewEmployee.LastName="";
    this.NewEmployee.email="";
    this.NewEmployee.JobTitle="";
    this.NewEmployee.Department="";
    this.NewEmployee.office="";
    this.NewEmployee.PhoneNumber="";
    this.NewEmployee.SkypeID="";
  }

  addEmployee(first : any,last : any,email : any,job : any,office : any,depart : any,phn : any,skype : any,){
    
    if(first.value=="" || last.value=="" || email.value== "" || job.value=="" || depart.value=="" || phn.value=="" || skype.value==""){
      alert("Fill all details");
    }
    else{
      let new_employee= this.empService.newEmployee(["../assets/img-8.jpg",first.value,last.value,job.value,first.value,depart.value + " Department",phn.value,email.value,skype.value,office.value]);
      let e : any=localStorage.getItem("employees");
      let employee_array = JSON.parse(e);
      employee_array.push(new_employee);
      localStorage.removeItem("employees");
      localStorage.setItem("employees", JSON.stringify(employee_array));
      this.empService.employ_subject.next(employee_array);
      

      let new_job = new_employee.JobTitle;
      if (new_job == "SharePoint Practice Head") {
        this.jobs[0].num += 1;
      } else if (new_job == "Operations Manager") {
        this.jobs[1].num += 1;
      } else if (new_job == "Product Manager") {
        this.jobs[2].num += 1;
      } else if (new_job == "Talent Manager Jr.") {
        this.jobs[3].num += 1;
      } else if (new_job == "Lead Engineer Dot Net") {
        this.jobs[4].num += 1;
      }
      localStorage.removeItem("jobs");
      localStorage.setItem("jobs", JSON.stringify(this.jobs));
      this.empService.job_subject.next(this.jobs);

      let new_department = new_employee.Department.split(" ")[0];
      if (new_department.startsWith("IT")) {
        this.departments[0].num += 1;
      } else if (new_department=="HR") {
        this.departments[1].num += 1;
      } else if (new_department=="UX") {
        this.departments[2].num += 1;
      } else if (new_department=="Sales") {
        this.departments[3].num += 1;
      }
      localStorage.removeItem("departments");
      localStorage.setItem("departments", JSON.stringify(this.departments));
      this.empService.department_subject.next(this.departments);

    }
  }

  saveEmployeeChanges(first : any,last : any,email : any,job : any,office : any,depart : any,phn : any,skype : any){
    if(first.value=="" || last.value=="" || email.value== "" || job.value=="" || depart.value=="" || phn.value=="" || skype.value==""){
      alert("Fill all details");
    }
    else{
      let e : any= localStorage.getItem("employees");
      let save_employee : any = JSON.parse(e);
      save_employee[this.index].FirstName=first.value+" ";
      save_employee[this.index].LastName=last.value;
      save_employee[this.index].JobTitle=job.value;
      save_employee[this.index].Department=depart.value + " Department";
      save_employee[this.index].email=email.value;
      save_employee[this.index].PhoneNumber=phn.value;
      save_employee[this.index].SkypeID=skype.value;
      localStorage.removeItem("employees");
      localStorage.setItem("employees", JSON.stringify(save_employee));
      this.empService.employ_subject.next(save_employee);
    } 
  }

  ngOnInit(): void {
  }

}
