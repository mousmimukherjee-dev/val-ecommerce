export interface ProductProps {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
  price: number;
}

export interface CartItemsProps extends ProductProps {
  quantity: number;
}



