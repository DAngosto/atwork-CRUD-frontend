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
import { InputTextModule } from 'primeng/inputtext';
import { CountryService } from '../../../../shared/services/country.service';
import { EmailUtils } from '../../../../../utils/email-utils';
import { EmployeeService } from '../../../services/employee.service';
import { CreateEmployeeRequest } from '../../../model/requests/create-employee-request';
import { AuthService } from '../../../../shared/services/auth.service';
import { Employee } from '../../../model/employee';
import { MessageService } from 'primeng/api';

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
    ButtonModule,
  ],
  templateUrl: './create-employee-dialog.component.html',
  styleUrl: './create-employee-dialog.component.scss',
})
export class CreateEmployeeDialogComponent implements OnInit {
  //#region Services
  private fb: FormBuilder = inject(FormBuilder);
  private countryService: CountryService = inject(CountryService);
  private employeeService: EmployeeService = inject(EmployeeService);
  private authService: AuthService = inject(AuthService);
  private messageService: MessageService = inject(MessageService);
  //#endregion Services

  //#region Forms
  public createEmployeeForm!: FormGroup;
  //#endregion Forms

  //#region Signals
  public showDialog = model.required<boolean>();
  public countries = this.countryService.countries;
  public countriesLoading = this.countryService.countriesLoading;
  //#endregion Signals

  //#region Computed signals
  //#endregion Computed signals

  //#region Properties
  public saveInProgress = false;
  @Output() creationSuccesfully: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  //#endregion Properties

  constructor() {}

  ngOnInit(): void {
    this.initializeForm();
    this.countryService.getAllCountries();
  }

  //#region Event handlers
  public onCancel(): void {
    this.showDialog.set(false);
  }

  public onSave(): void {
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
            this.messageService.add({
              severity: 'success',
              summary: 'Employee created',
              detail: 'Employee was created succesfully',
              life: 3000,
            });
            this.showDialog.set(false);
          },
          error: (e: any) => {
            console.log(e);
            this.saveInProgress = false;
          },
        });
    }
  }
  //#endregion Event handlers

  //#region Public functions
  //#endregion Public functions

  //#region Private functions
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
  //#endregion Private functions
}
