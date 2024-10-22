export interface CreateEmployeeRequest {
  userId: string;
  firstName: string;
  lastName: string;
  secondLastName?: string;
  email: string;
  phone: string;
  jobTitle?: string;
  address: string;
  country: string;
  pictureUrl?: string;
}
