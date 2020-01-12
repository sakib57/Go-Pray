import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZakatPage } from './zakat.page';

describe('ZakatPage', () => {
  let component: ZakatPage;
  let fixture: ComponentFixture<ZakatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZakatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZakatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
