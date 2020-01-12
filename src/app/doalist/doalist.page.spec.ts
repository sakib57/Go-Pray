import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoalistPage } from './doalist.page';

describe('DoalistPage', () => {
  let component: DoalistPage;
  let fixture: ComponentFixture<DoalistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoalistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoalistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
