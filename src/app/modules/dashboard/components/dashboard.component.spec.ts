import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { AuthService } from '../../shared/services/auth.service';
import { DashboardService } from '../services/dashboard.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let dashboardServiceSpy: jasmine.SpyObj<DashboardService>;
  let formBuilder: FormBuilder;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getUserId']);
    dashboardServiceSpy = jasmine.createSpyObj('DashboardService', [
      'getDashboardData',
    ]);

    formBuilder = new FormBuilder();
    activatedRoute = new ActivatedRoute();

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: DashboardService, useValue: dashboardServiceSpy },
        { provide: FormBuilder, useValue: formBuilder },
        { provide: ActivatedRoute, useValue: activatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    authServiceSpy.getUserId.and.returnValue('12345');
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
