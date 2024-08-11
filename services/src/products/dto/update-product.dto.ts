export class UpdateProductDto {
  name?: string;
  description?: string;
  images?: string[]; // Optional array of image URLs or paths
  price?: number;
  attributes?: { name: string; value: string }[]; // Optional array of attribute objects
}
