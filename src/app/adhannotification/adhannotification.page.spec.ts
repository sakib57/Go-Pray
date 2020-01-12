import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhannotificationPage } from './adhannotification.page';

describe('AdhannotificationPage', () => {
  let component: AdhannotificationPage;
  let fixture: ComponentFixture<AdhannotificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdhannotificationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdhannotificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
