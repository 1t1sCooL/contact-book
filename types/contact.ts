export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  email?: string;
  phone?: string;
  telegram?: string;
  createdAt: number;
}