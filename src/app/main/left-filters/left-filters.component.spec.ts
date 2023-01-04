import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftFiltersComponent } from './left-filters.component';

describe('LeftFiltersComponent', () => {
  let component: LeftFiltersComponent;
  let fixture: ComponentFixture<LeftFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeftFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
