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
  emails: IEmailUserRequest;
  phones: IPhoneUserRequest;
}

export interface IUser {
  id: string;
  full_name: string;
  isAdm: boolean;
  createdAt: Date;
  emails: IEmailUserRequest;
  phones: IPhoneUserRequest;
}

export interface IUserLogin {
  full_name: string;
  password: string;
}