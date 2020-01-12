import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MosquedashboardPage } from './mosquedashboard.page';

describe('MosquedashboardPage', () => {
  let component: MosquedashboardPage;
  let fixture: ComponentFixture<MosquedashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MosquedashboardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MosquedashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
