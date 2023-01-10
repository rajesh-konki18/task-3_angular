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
  alphabet_flags: any = [];

  filterAlphabets(alphabet: string, i: number) {
    let value = alphabet.toLowerCase();
    this.alphabet_flags = this.empService.flagAlphabets();
    this.empService.department_flags = this.empService.flagDepartments();
    this.empService.job_flags = this.empService.flagJobs();
    this.alphabet_flags[i] = 1;
    let filtered_cards = this.employees_local.filter(function (card: any) {
      return card.FirstName.toLowerCase().startsWith(value);
    });
    this.empService.employ_subject.next(filtered_cards);
    this.empService.flag_subject.next(i);
  }

  constructor(private empService: EmployeeService) {
    this.employees_local = this.empService.getEmployees();
  }

  ngOnInit(): void {
    this.empService.createAlphabetFlag();
  }
}
