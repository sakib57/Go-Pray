import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoaaddPage } from './doaadd.page';

describe('DoaaddPage', () => {
  let component: DoaaddPage;
  let fixture: ComponentFixture<DoaaddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoaaddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoaaddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
