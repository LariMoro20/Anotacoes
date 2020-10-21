import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListManagerPage } from './list-manager.page';

describe('ListManagerPage', () => {
  let component: ListManagerPage;
  let fixture: ComponentFixture<ListManagerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListManagerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
