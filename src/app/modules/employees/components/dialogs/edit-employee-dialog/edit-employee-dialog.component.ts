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
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { EmailUtils } from '../../../../../utils/email-utils';
import { CountryService } from '../../../../shared/services/country.service';
import { Employee } from '../../../model/employee';
import { EmployeeService } from '../../../services/employee.service';
import { UpdateEmployeeRequest } from '../../../model/requests/update-employee-request';

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
    InputMaskModule,
    ButtonModule,
  ],
  templateUrl: './edit-employee-dialog.component.html',
  styleUrl: './edit-employee-dialog.component.scss',
})
export class EditEmployeeDialogComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private countryService: CountryService = inject(CountryService);
  private employeeService: EmployeeService = inject(EmployeeService);

  public editEmployeeForm!: FormGroup;
  public showDialog = model.required<boolean>();
  public employeeIdToEdit = input.required<string>();
  public countries = this.countryService.countries;
  public countriesLoading = this.countryService.countriesLoading;

  public saveInProgress = false;
  @Output() updateSuccesfully: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  ngOnInit(): void {
    this.initializeForm();
    this.getEmployeeData();
    this.countryService.getAllCountries();
  }

  public onCancel() {
    this.showDialog.set(false);
  }

  public onSave() {
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
}
