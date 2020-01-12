import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuadetailsPage } from './duadetails.page';

describe('DuadetailsPage', () => {
  let component: DuadetailsPage;
  let fixture: ComponentFixture<DuadetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuadetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuadetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
