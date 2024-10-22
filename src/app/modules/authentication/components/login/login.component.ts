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
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private authService: AuthService = inject(AuthService);
  private fb: FormBuilder = inject(FormBuilder);

  public signInForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.initializeForm();
  }

  public onSignIn(): void {
    if (
      this.signInForm.valid &&
      this.isValidEmail(this.signInForm.get('email')?.value)
    ) {
      this.authService.login(
        this.signInForm.get('email')?.value,
        this.signInForm.get('password')?.value,
      );
    }
  }

  private initializeForm(): void {
    this.signInForm = this.fb.group({
      email: ['test@gmail.com', Validators.required],
      password: ['string', Validators.required],
    });
  }

  private isValidEmail(email: string): boolean {
    const emailRegex =
      /^(?=[A-Z])[A-Z0-9_\-\.]+@(?=(([A-Z0-9_\-]+\.)+))\1[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  }
}
