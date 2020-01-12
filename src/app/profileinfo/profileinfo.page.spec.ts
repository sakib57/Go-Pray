import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileinfoPage } from './profileinfo.page';

describe('ProfileinfoPage', () => {
  let component: ProfileinfoPage;
  let fixture: ComponentFixture<ProfileinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileinfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
