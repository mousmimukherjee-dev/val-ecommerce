
export interface ProductProps {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
  price: number;
  materials?: string[];
  styleTags?: string[];
}

export interface CartItemsProps extends ProductProps {
  quantity: number;
}
