import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetLocationPage } from './set-location.page';

describe('SetLocationPage', () => {
  let component: SetLocationPage;
  let fixture: ComponentFixture<SetLocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetLocationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
