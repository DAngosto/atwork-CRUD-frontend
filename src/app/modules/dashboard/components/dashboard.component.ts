import { Component, inject, OnDestroy, OnInit } from '@angular/core';
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
import { Subscription } from 'rxjs/internal/Subscription';

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
export class DashboardComponent implements OnInit, OnDestroy {
  //#region Services
  private authService: AuthService = inject(AuthService);
  private dashboardService: DashboardService = inject(DashboardService);
  private fb: FormBuilder = inject(FormBuilder);
  //#endregion Services

  //#region Forms
  public dashboardForm!: FormGroup;
  //#endregion Forms

  //#region Signals
  //#endregion Signals

  //#region Computed signals
  //#endregion Computed signals

  //#region Properties
  private subscriptions: Subscription[] = [];
  //#endregion Properties

  ngOnInit(): void {
    this.initializeForm();
    this.getUserDashboard();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  //#region Event handlers
  //#endregion Event handlers

  //#region Public functions
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
  //#endregion Public functions

  //#region Private functions
  private initializeForm(): void {
    this.dashboardForm = this.fb.group({
      numberOfEmployees: 0,
      wellnessScoreAverage: 0,
      productivityScoreAverage: 0,
    });
  }

  private getUserDashboard(): void {
    this.subscriptions.push(
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
        }),
    );
  }
  //#endregion Private functions
}
