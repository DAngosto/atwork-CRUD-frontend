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
import { RegisterRequest } from '../../../shared/model/requests/register-request';
import { InputMaskModule } from 'primeng/inputmask';
import { EmailUtils } from '../../../../utils/email-utils';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    InputTextModule,
    RouterModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputMaskModule,
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
      EmailUtils.isValidEmail(this.registerForm.get('email')?.value)
    ) {
      this.authService.register(this.getRegisterRequest());
    }
  }

  private initializeForm(): void {
    this.registerForm = this.fb.group({
      email: ['test@gmail.com', Validators.required],
      password: ['test', Validators.required],
      company: ['test', Validators.required],
      phone: ['123-456-789', Validators.required],
    });
  }

  private getRegisterRequest(): RegisterRequest {
    return {
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      company: this.registerForm.get('company')?.value,
      phone: this.registerForm.get('phone')?.value,
    } as RegisterRequest;
  }
}
