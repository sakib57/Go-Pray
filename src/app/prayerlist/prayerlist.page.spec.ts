import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrayerlistPage } from './prayerlist.page';

describe('PrayerlistPage', () => {
  let component: PrayerlistPage;
  let fixture: ComponentFixture<PrayerlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrayerlistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrayerlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
