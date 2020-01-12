import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorregisterPage } from './authorregister.page';

describe('AuthorregisterPage', () => {
  let component: AuthorregisterPage;
  let fixture: ComponentFixture<AuthorregisterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorregisterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorregisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
