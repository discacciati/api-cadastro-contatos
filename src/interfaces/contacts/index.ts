export interface IEmailContactRequest {
  email: string;
}

export interface IPhoneContactRequest {
  phone: string;
}

export interface IContactRequest {
  full_name: string;
  emails: IEmailContactRequest;
  phones: IPhoneContactRequest;
}

export interface IContact {
  id: string;
  full_name: string;
  emails: IEmailContactRequest;
  phones: IPhoneContactRequest;
}
