import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectthemePage } from './selecttheme.page';

describe('SelectthemePage', () => {
  let component: SelectthemePage;
  let fixture: ComponentFixture<SelectthemePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectthemePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectthemePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
