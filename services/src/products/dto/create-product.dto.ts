export class CreateProductDto {
  name: string;
  description: string;
  images: string[]; // Expect an array of image URLs or paths
  price: number;
  attributes: { name: string; value: string }[]; // Array of attribute objects
}
