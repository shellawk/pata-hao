export interface Property {
  id: number;
  type: string;
  price: number;
  location: string;
  size: number;
  beds: number;
  baths: number;
  description?: string;
  images: string[];
  phone?: string;
}