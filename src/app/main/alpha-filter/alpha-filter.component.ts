import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-alpha-filter',
  templateUrl: './alpha-filter.component.html',
  styleUrls: ['../main.component.css'],
})
export class AlphaFilterComponent implements OnInit {
  employees_local: any;

  letters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  alpha_flags: any = [];

  alpha_fltr(alpha: string, i: number) {
    let val = alpha.toLowerCase();
    this.alpha_flags = this.empService.flag_alphabets();
    this.empService.department_flags = this.empService.flag_departments();
    this.empService.job_flags = this.empService.flag_jobs();
    this.alpha_flags[i] = 1;
    let filteredcards = this.employees_local.filter(function (card: any) {
      return card.FirstName.toLowerCase().startsWith(val);
    });
    this.empService.employ_subject.next(filteredcards);
    this.empService.flag_subject.next(i);
  }

  constructor(private empService: EmployeeService) {
    this.employees_local = this.empService.getEmployees();
  }

  ngOnInit(): void {
    this.empService.alpha();
  }
}
