import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoaeditPage } from './doaedit.page';

describe('DoaeditPage', () => {
  let component: DoaeditPage;
  let fixture: ComponentFixture<DoaeditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoaeditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoaeditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
