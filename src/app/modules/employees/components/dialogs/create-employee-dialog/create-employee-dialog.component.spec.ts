import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmployeeDialogComponent } from './create-employee-dialog.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ComponentRef } from '@angular/core';

describe('CreateEmployeeDialogComponent', () => {
  let component: CreateEmployeeDialogComponent;
  let componentRef: ComponentRef<CreateEmployeeDialogComponent>;
  let fixture: ComponentFixture<CreateEmployeeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEmployeeDialogComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MessageService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEmployeeDialogComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('showDialog', false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
