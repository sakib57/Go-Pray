import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitteeMembersPage } from './committee-members.page';

describe('CommitteeMembersPage', () => {
  let component: CommitteeMembersPage;
  let fixture: ComponentFixture<CommitteeMembersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitteeMembersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitteeMembersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
