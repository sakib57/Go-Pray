import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasbihPage } from './tasbih.page';

describe('TasbihPage', () => {
  let component: TasbihPage;
  let fixture: ComponentFixture<TasbihPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasbihPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasbihPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
