import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphaFilterComponent } from './alpha-filter.component';

describe('AlphaFilterComponent', () => {
  let component: AlphaFilterComponent;
  let fixture: ComponentFixture<AlphaFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlphaFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlphaFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
