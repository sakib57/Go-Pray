import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralPolicyPage } from './general-policy.page';

describe('GeneralPolicyPage', () => {
  let component: GeneralPolicyPage;
  let fixture: ComponentFixture<GeneralPolicyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralPolicyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralPolicyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
