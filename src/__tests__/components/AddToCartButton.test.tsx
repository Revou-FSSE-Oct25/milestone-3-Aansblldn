// src/__tests__/components/AddToCartButton.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddToCartButton from '@/components/AddToCartButton';
import { useCartStore } from '@/stores/cartStore';
import { Product } from '@/types';

// Mock Zustand store
jest.mock('@/stores/cartStore');

describe('AddToCartButton', () => {
  const mockAddItem = jest.fn();
  
  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 100,
    description: 'Test',
    category: { id: 1, name: 'Test', image: '' },
    images: [''],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useCartStore as unknown as jest.Mock).mockReturnValue({
      addItem: mockAddItem,
    });
  });

  it('should render button with correct text', () => {
    render(<AddToCartButton product={mockProduct} />);
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });

  it('should call addItem when clicked', () => {
    render(<AddToCartButton product={mockProduct} />);
    
    const button = screen.getByText('Add to Cart');
    fireEvent.click(button);
    
    expect(mockAddItem).toHaveBeenCalledWith(mockProduct);
  });

  it('should show "Added!" text after click', async () => {
    render(<AddToCartButton product={mockProduct} />);
    
    const button = screen.getByText('Add to Cart');
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('Added!')).toBeInTheDocument();
    });
  });
});