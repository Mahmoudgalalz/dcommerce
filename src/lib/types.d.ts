interface Product {
  id?: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  attributes: Attribute[];
}

interface Attribute {
  name: string;
  value: string;
}
