import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoadetailsPage } from './doadetails.page';

describe('DoadetailsPage', () => {
  let component: DoadetailsPage;
  let fixture: ComponentFixture<DoadetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoadetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoadetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
