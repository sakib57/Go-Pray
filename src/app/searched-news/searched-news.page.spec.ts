import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedNewsPage } from './searched-news.page';

describe('SearchedNewsPage', () => {
  let component: SearchedNewsPage;
  let fixture: ComponentFixture<SearchedNewsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchedNewsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchedNewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
