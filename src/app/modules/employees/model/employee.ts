export interface Employee {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  secondLastName?: string;
  email: string;
  jobTitle?: string;
  wellnessScore: number;
  productivityScore: number;
  address: string;
  lastCheckIn: Date;
  phone: string;
  countryName: string;
  countryCode: string;
  pictureUrl?: string;
}
