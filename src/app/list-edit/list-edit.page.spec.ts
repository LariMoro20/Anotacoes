import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEditPage } from './list-edit.page';

describe('ListEditPage', () => {
  let component: ListEditPage;
  let fixture: ComponentFixture<ListEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
