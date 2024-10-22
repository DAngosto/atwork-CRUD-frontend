import {
  Component,
  EventEmitter,
  inject,
  model,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { CountryService } from '../../../../shared/services/country.service';
import { EmailUtils } from '../../../../../utils/email-utils';
import { EmployeeService } from '../../../services/employee.service';
import { CreateEmployeeRequest } from '../../../model/requests/create-employee-request';
import { AuthService } from '../../../../shared/services/auth.service';
import { Employee } from '../../../model/employee';

@Component({
  selector: 'app-create-employee-dialog',
  standalone: true,
  imports: [
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    DropdownModule,
    InputMaskModule,
    ButtonModule,
  ],
  templateUrl: './create-employee-dialog.component.html',
  styleUrl: './create-employee-dialog.component.scss',
})
export class CreateEmployeeDialogComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private countryService: CountryService = inject(CountryService);
  private employeeService: EmployeeService = inject(EmployeeService);
  private authService: AuthService = inject(AuthService);

  public createEmployeeForm!: FormGroup;
  public showDialog = model.required<boolean>();
  public countries = this.countryService.countries;
  public countriesLoading = this.countryService.countriesLoading;

  public saveInProgress = false;
  @Output() creationSuccesfully: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  ngOnInit(): void {
    this.initializeForm();
    this.countryService.getAllCountries();
  }

  public onCancel() {
    this.showDialog.set(false);
  }

  public onSave() {
    if (
      this.createEmployeeForm.valid &&
      EmailUtils.isValidEmail(this.createEmployeeForm.get('email')?.value)
    ) {
      this.saveInProgress = true;
      this.employeeService
        .createEmployee(this.getCreateEmployeeRequest())
        .subscribe({
          next: (_data: Employee) => {
            this.saveInProgress = false;
            this.creationSuccesfully.emit(true);
            this.showDialog.set(false);
          },
          error: (e: any) => {
            console.log(e);
            this.saveInProgress = false;
          },
        });
    }
  }

  private initializeForm(): void {
    this.createEmployeeForm = this.fb.group({
      firstName: [undefined, Validators.required],
      lastName: [undefined, Validators.required],
      secondLastName: undefined,
      email: [undefined, Validators.required],
      jobTitle: [undefined],
      address: [undefined, Validators.required],
      phone: [undefined, Validators.required],
      country: [undefined, Validators.required],
      pictureUrl: [undefined],
    });
  }

  private getCreateEmployeeRequest(): CreateEmployeeRequest {
    return {
      userId: this.authService.getUserId(),
      firstName: this.createEmployeeForm.get('firstName')?.value,
      lastName: this.createEmployeeForm.get('lastName')?.value,
      secondLastName: this.createEmployeeForm.get('secondLastName')?.value,
      email: this.createEmployeeForm.get('email')?.value,
      jobTitle: this.createEmployeeForm.get('jobTitle')?.value,
      address: this.createEmployeeForm.get('address')?.value,
      phone: this.createEmployeeForm.get('phone')?.value,
      country: this.createEmployeeForm.get('country')?.value,
      pictureUrl: this.createEmployeeForm.get('pictureUrl')?.value,
    } as CreateEmployeeRequest;
  }
}
