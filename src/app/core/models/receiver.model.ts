export interface Receiver {
  id?: number;
  name: string;
  phoneNumber: string;
  userId: number;
  verified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ReceiverPage {
  content: Receiver[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface SearchParams {
  page: number;
  size: number;
  query?: string;
  userId?: number;
}

export interface CsvImportPreview {
  valid: Receiver[];
  invalid: {
    row: number;
    data: any;
    errors: string[];
  }[];
  totalValid: number;
  totalInvalid: number;
}
