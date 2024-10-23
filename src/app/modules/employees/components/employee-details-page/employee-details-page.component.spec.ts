import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeDetailsPageComponent } from './employee-details-page.component';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute } from '@angular/router';

describe('EmployeeDetailsPageComponent', () => {
  let component: EmployeeDetailsPageComponent;
  let fixture: ComponentFixture<EmployeeDetailsPageComponent>;
  let employeeServiceSpy: jasmine.SpyObj<EmployeeService>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    employeeServiceSpy = jasmine.createSpyObj('EmployeeService', [
      'getEmployee',
    ]);

    activatedRoute = new ActivatedRoute();

    await TestBed.configureTestingModule({
      imports: [EmployeeDetailsPageComponent],
      providers: [
        { provide: EmployeeService, useValue: employeeServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeDetailsPageComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
