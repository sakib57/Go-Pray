import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectprayertimePage } from './selectprayertime.page';

describe('SelectprayertimePage', () => {
  let component: SelectprayertimePage;
  let fixture: ComponentFixture<SelectprayertimePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectprayertimePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectprayertimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
