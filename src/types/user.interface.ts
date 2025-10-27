export type UserType = any;

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  age?: number;
  status: string;
  city?: string;
}

export interface UserInterface {
  id: number;
  name: string;
  email: string;
  password: string;
  age?: number;
  status: string;
}

// User controller request/response interfaces
export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  age?: number;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  preferredLanguage?: string;
  marketingConsent?: boolean | string;
  newsletterConsent?: boolean | string;
  referralCode?: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
  age?: number;
  phone?: string;
  address?: string;
}

export interface CreateUserResponse {
  message: string;
  user: IUser;
  userType: string;
  discount: number;
  points: number;
  timestamp: string;
}

export interface UpdateUserResponse {
  message: string;
  user: IUser;
}