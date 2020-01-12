import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HijricalenderPage } from './hijricalender.page';

describe('HijricalenderPage', () => {
  let component: HijricalenderPage;
  let fixture: ComponentFixture<HijricalenderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HijricalenderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HijricalenderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
