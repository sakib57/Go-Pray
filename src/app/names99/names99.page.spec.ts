import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Names99Page } from './names99.page';

describe('Names99Page', () => {
  let component: Names99Page;
  let fixture: ComponentFixture<Names99Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Names99Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Names99Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
