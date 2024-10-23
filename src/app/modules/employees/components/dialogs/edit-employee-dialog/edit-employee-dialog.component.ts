import {
  Component,
  EventEmitter,
  inject,
  input,
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
import { EmailUtils } from '../../../../../utils/email-utils';
import { CountryService } from '../../../../shared/services/country.service';
import { Employee } from '../../../model/employee';
import { EmployeeService } from '../../../services/employee.service';
import { UpdateEmployeeRequest } from '../../../model/requests/update-employee-request';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-employee-dialog',
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
  templateUrl: './edit-employee-dialog.component.html',
  styleUrl: './edit-employee-dialog.component.scss',
})
export class EditEmployeeDialogComponent implements OnInit {
  //#region Services
  private fb: FormBuilder = inject(FormBuilder);
  private countryService: CountryService = inject(CountryService);
  private employeeService: EmployeeService = inject(EmployeeService);
  private messageService: MessageService = inject(MessageService);
  //#endregion Services

  //#region Forms
  public editEmployeeForm!: FormGroup;
  //#endregion Forms

  //#region Signals
  public showDialog = model.required<boolean>();
  public employeeIdToEdit = input.required<string>();
  public countries = this.countryService.countries;
  public countriesLoading = this.countryService.countriesLoading;
  //#endregion Signals

  //#region Computed signals
  //#endregion Computed signals

  //#region Properties
  public saveInProgress = false;
  @Output() updateSuccesfully: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  //#endregion Properties

  constructor() {}

  ngOnInit(): void {
    this.initializeForm();
    this.getEmployeeData();
    this.countryService.getAllCountries();
  }

  //#region Event handlers
  public onCancel(): void {
    this.showDialog.set(false);
  }

  public onSave(): void {
    if (
      this.editEmployeeForm.valid &&
      EmailUtils.isValidEmail(this.editEmployeeForm.get('email')?.value)
    ) {
      this.saveInProgress = true;
      this.employeeService
        .updateEmployee(this.getUpdateEmployeeRequest())
        .subscribe({
          next: (_data: Employee) => {
            this.saveInProgress = false;
            this.updateSuccesfully.emit(true);
            this.messageService.add({
              severity: 'success',
              summary: 'Employee updated',
              detail: 'Employee was updated succesfully',
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
    this.editEmployeeForm = this.fb.group({
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

  private getEmployeeData(): void {
    this.employeeService.getEmployee(this.employeeIdToEdit()).subscribe({
      next: (data: Employee) => {
        this.editEmployeeForm.patchValue({
          firstName: data.firstName,
          lastName: data.lastName,
          secondLastName: data.secondLastName,
          email: data.email,
          jobTitle: data.jobTitle,
          address: data.address,
          phone: data.phone,
          country: data.countryId,
          pictureUrl: data.pictureUrl,
        });
      },
      error: (e: any) => {
        console.log(e);
      },
    });
  }

  private getUpdateEmployeeRequest(): UpdateEmployeeRequest {
    return {
      employeeId: this.employeeIdToEdit(),
      firstName: this.editEmployeeForm.get('firstName')?.value,
      lastName: this.editEmployeeForm.get('lastName')?.value,
      secondLastName: this.editEmployeeForm.get('secondLastName')?.value,
      email: this.editEmployeeForm.get('email')?.value,
      jobTitle: this.editEmployeeForm.get('jobTitle')?.value,
      address: this.editEmployeeForm.get('address')?.value,
      phone: this.editEmployeeForm.get('phone')?.value,
      country: this.editEmployeeForm.get('country')?.value,
      pictureUrl: this.editEmployeeForm.get('pictureUrl')?.value,
    } as UpdateEmployeeRequest;
  }
  //#endregion Private functions
}
