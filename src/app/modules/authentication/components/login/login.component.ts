import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../../shared/services/auth.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CardModule } from 'primeng/card';
import { EmailUtils } from '../../../../utils/email-utils';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CheckboxModule,
    InputTextModule,
    RouterModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  //#region Services
  private authService: AuthService = inject(AuthService);
  private fb: FormBuilder = inject(FormBuilder);
  //#endregion Services

  //#region Forms
  public signInForm!: FormGroup;
  //#endregion Forms

  //#region Signals
  //#endregion Signals

  //#region Computed signals
  //#endregion Computed signals

  //#region Properties
  //#endregion Properties

  constructor() {}

  ngOnInit(): void {
    this.initializeForm();
  }

  //#region Event handlers
  public onSignIn(): void {
    if (
      this.signInForm.valid &&
      EmailUtils.isValidEmail(this.signInForm.get('email')?.value)
    ) {
      this.authService.login(
        this.signInForm.get('email')?.value,
        this.signInForm.get('password')?.value,
      );
    }
  }
  //#endregion Event handlers

  //#region Public functions
  //#endregion Public functions

  //#region Private functions
  private initializeForm(): void {
    this.signInForm = this.fb.group({
      email: ['admin@admin.com', Validators.required],
      password: ['admin', Validators.required],
    });
  }
  //#endregion Private functions
}
