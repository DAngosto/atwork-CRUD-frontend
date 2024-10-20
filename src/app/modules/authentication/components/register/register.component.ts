import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
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
  selector: 'app-register',
  standalone: true,
  imports: [
    InputTextModule,
    RouterModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  private authService: AuthService = inject(AuthService);
  private fb: FormBuilder = inject(FormBuilder);

  public registerForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.initializeForm();
  }

  public onCreate(): void {
    if (
      this.registerForm.valid &&
      this.isValidEmail(this.registerForm.get('email')?.value)
    ) {
      this.authService.register(
        this.registerForm.get('email')?.value,
        this.registerForm.get('password')?.value
      );
    }
  }

  private initializeForm(): void {
    this.registerForm = this.fb.group({
      email: [undefined, Validators.required],
      password: [undefined, Validators.required],
    });
  }

  private isValidEmail(email: string): boolean {
    const emailRegex =
      /^(?=[A-Z])[A-Z0-9_\-\.]+@(?=(([A-Z0-9_\-]+\.)+))\1[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  }
}
