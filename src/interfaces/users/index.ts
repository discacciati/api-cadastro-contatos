import { IContact } from "../contacts";

export interface IEmailUserRequest {
  email: string;
}

export interface IPhoneUserRequest {
  phone: string;
}

export interface IUserRequest {
  full_name: string;
  password: string;
  isAdm: boolean;
  emails: IEmailUserRequest[];
  phones: IPhoneUserRequest[];
}

export interface IUser {
  id: string;
  full_name: string;
  isAdm: boolean;
  createdAt: Date;
  emails: [];
  phones: [];
  contacts: [];
}

export interface IUserLogin {
  full_name: string;
  password: string;
}

export interface IUserUpdate {
  id: string;
  full_name: string;
  password: string;
  emails: IEmailUserRequest[];
  phones: IPhoneUserRequest[];
}
