import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPolicyPage } from './user-policy.page';

describe('UserPolicyPage', () => {
  let component: UserPolicyPage;
  let fixture: ComponentFixture<UserPolicyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPolicyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPolicyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
