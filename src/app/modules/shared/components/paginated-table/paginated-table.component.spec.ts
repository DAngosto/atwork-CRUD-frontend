import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatedTableComponent } from './paginated-table.component';
import { ComponentRef } from '@angular/core';

describe('PaginatedTableComponent', () => {
  let component: PaginatedTableComponent;
  let componentRef: ComponentRef<PaginatedTableComponent>;
  let fixture: ComponentFixture<PaginatedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginatedTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginatedTableComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('dataService', false);
    componentRef.setInput('columns', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
