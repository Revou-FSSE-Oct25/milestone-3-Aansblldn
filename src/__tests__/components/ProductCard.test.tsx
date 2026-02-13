// src/__tests__/components/ProductCard.test.tsx
import { render, screen } from '@testing-library/react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

// Mock AddToCartButton
jest.mock('@/components/AddToCartButton', () => {
  return function MockAddToCartButton({ product }: { product: Product }) {
    return <button>Add to Cart</button>;
  };
});

describe('ProductCard', () => {
  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 100,
    description: 'Test description',
    category: { id: 1, name: 'Electronics', image: '' },
    images: ['https://test.com/image.jpg'],
  };

  it('should render product title', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('should render product price', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('$100')).toBeInTheDocument();
  });

  it('should render category badge', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Electronics')).toBeInTheDocument();
  });

  it('should render description when showDetails is true', () => {
    render(<ProductCard product={mockProduct} showDetails={true} />);
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('should not render description when showDetails is false', () => {
    render(<ProductCard product={mockProduct} showDetails={false} />);
    expect(screen.queryByText('Test description')).not.toBeInTheDocument();
  });
});