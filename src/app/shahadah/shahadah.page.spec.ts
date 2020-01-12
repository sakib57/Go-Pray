import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShahadahPage } from './shahadah.page';

describe('ShahadahPage', () => {
  let component: ShahadahPage;
  let fixture: ComponentFixture<ShahadahPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShahadahPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShahadahPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
