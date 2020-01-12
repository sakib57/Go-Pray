import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewslistPage } from './newslist.page';

describe('NewslistPage', () => {
  let component: NewslistPage;
  let fixture: ComponentFixture<NewslistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewslistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewslistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
