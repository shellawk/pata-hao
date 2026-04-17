export interface Enquiry {
  type?: string;
  location?: string;
  size?: number;
  min_price?: number;
  max_price?: number;
  beds?: number;
  baths?: number;
  message?: string;
}