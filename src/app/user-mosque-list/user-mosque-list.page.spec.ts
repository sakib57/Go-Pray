import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMosqueListPage } from './user-mosque-list.page';

describe('UserMosqueListPage', () => {
  let component: UserMosqueListPage;
  let fixture: ComponentFixture<UserMosqueListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMosqueListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMosqueListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
