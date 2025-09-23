export interface Product {
  id: string;
  name: string;
  category: string;
  slug: string;
  numberOfReviews: number;
  price: number;
  image: string;
  description: string;
  countInStock: number;
  rating: number;
  user: {
    name: string;
  };
}

export interface RatingStarsProps {
  rating: number;
}
