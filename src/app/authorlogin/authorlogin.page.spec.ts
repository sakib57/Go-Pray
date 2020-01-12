import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorloginPage } from './authorlogin.page';

describe('AuthorloginPage', () => {
  let component: AuthorloginPage;
  let fixture: ComponentFixture<AuthorloginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorloginPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorloginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
