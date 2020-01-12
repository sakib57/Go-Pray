import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoaPage } from './doa.page';

describe('DoaPage', () => {
  let component: DoaPage;
  let fixture: ComponentFixture<DoaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
