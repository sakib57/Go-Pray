import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewseditPage } from './newsedit.page';

describe('NewseditPage', () => {
  let component: NewseditPage;
  let fixture: ComponentFixture<NewseditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewseditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewseditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
