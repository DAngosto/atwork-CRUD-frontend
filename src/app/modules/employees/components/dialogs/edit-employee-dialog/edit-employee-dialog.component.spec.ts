import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmployeeDialogComponent } from './edit-employee-dialog.component';
import { MessageService } from 'primeng/api';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentRef } from '@angular/core';

describe('EditEmployeeDialogComponent', () => {
  let component: EditEmployeeDialogComponent;
  let componentRef: ComponentRef<EditEmployeeDialogComponent>;
  let fixture: ComponentFixture<EditEmployeeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEmployeeDialogComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MessageService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditEmployeeDialogComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('showDialog', false);
    componentRef.setInput('employeeIdToEdit', '');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
