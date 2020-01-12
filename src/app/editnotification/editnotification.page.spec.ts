import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditnotificationPage } from './editnotification.page';

describe('EditnotificationPage', () => {
  let component: EditnotificationPage;
  let fixture: ComponentFixture<EditnotificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditnotificationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditnotificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
