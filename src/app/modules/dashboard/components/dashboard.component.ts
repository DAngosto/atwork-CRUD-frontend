import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { AuthService } from '../../shared/services/auth.service';
import { DashboardService } from '../services/dashboard.service';
import { DashboardData } from '../model/dashboard-data';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { KnobModule } from 'primeng/knob';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    KnobModule,
    RouterModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private authService: AuthService = inject(AuthService);
  private dashboardService: DashboardService = inject(DashboardService);
  private fb: FormBuilder = inject(FormBuilder);

  public dashboardForm!: FormGroup;

  ngOnInit(): void {
    this.initializeForm();
    this.dashboardService
      .getDashboardData(this.authService.getUserId())
      .subscribe({
        next: (data: DashboardData) => {
          this.dashboardForm.patchValue({
            numberOfEmployees: data.numberOfEmployees,
            wellnessScoreAverage: data.wellnessScoreAverage,
            productivityScoreAverage: data.productivityScoreAverage,
          });
        },
        error: (e: any) => {
          console.log(e);
        },
      });
  }

  public getKnobColor(): string {
    const value = this.dashboardForm.get('productivityScoreAverage')?.value;
    if (value <= 40) {
      return 'lightcoral';
    } else if (value > 40 && value <= 70) {
      return 'lightsalmon';
    } else {
      return 'lightgreen';
    }
  }

  private initializeForm(): void {
    this.dashboardForm = this.fb.group({
      numberOfEmployees: 0,
      wellnessScoreAverage: 0,
      productivityScoreAverage: 0,
    });
  }
}
