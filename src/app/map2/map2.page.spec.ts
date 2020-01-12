import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Map2Page } from './map2.page';

describe('Map2Page', () => {
  let component: Map2Page;
  let fixture: ComponentFixture<Map2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Map2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Map2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
