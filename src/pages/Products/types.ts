import { Control, FieldErrors } from 'react-hook-form';
// types.ts
export interface productModel {
  id: number | any;
  weight: number | any; // Matches the API response
  carat: number | any;  // Matches the API response
  name: string | any;   // Matches the API response
  code: number | any;   // Matches the API response
  productCategoryId: number | any;   // Matches the API response
  wageTypeId: number | null | any;   // Matches the API response
  wages: number | null | any;   // Matches the API response
  productType: number | null | any;   // Matches the API response
  productCollection: number | null | any; 
  productImages:any  // Matches the API response
  quiddityProduct:number|any
}
// types.ts
export interface DocumentInfo {
  weight: number | any;
  name: string|any;
  carat: number | any;
  wages:number | any
  wageTypeId?: number
}
// types.ts
export type FormFieldProps = {
  name: keyof DocumentInfo; // Ensure this matches the fields in DocumentInfo
  control: Control<DocumentInfo>;
  rules?: Record<string, boolean>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  errors: FieldErrors<DocumentInfo>;
};

export type WagesTypeResponseApi = {
  id: number;
  name: string;
  title: string | null;
  feature: string | null;
}