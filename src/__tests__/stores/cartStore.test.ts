// src/__tests__/stores/cartStore.test.ts
import { useCartStore } from '@/stores/cartStore';
import { Product } from '@/types';

describe('CartStore', () => {
  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 100,
    description: 'Test description',
    category: { id: 1, name: 'Test Category', image: '' },
    images: ['https://test.com/image.jpg'],
  };

  const mockProduct2: Product = {
    id: 2,
    title: 'Test Product 2',
    price: 200,
    description: 'Test description 2',
    category: { id: 2, name: 'Test Category 2', image: '' },
    images: ['https://test.com/image2.jpg'],
  };

  beforeEach(() => {
    useCartStore.setState({ items: [] });
  });

  it('should have empty cart initially', () => {
    const state = useCartStore.getState();
    expect(state.items).toEqual([]);
    expect(state.getTotalItems()).toBe(0);
    expect(state.getTotalPrice()).toBe(0);
  });

  it('should add item to cart', () => {
    useCartStore.getState().addItem(mockProduct);
    
    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].product.id).toBe(1);
    expect(state.items[0].quantity).toBe(1);
  });

  it('should increase quantity when adding same item', () => {
    useCartStore.getState().addItem(mockProduct);
    useCartStore.getState().addItem(mockProduct);
    
    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it('should remove item from cart', () => {
    useCartStore.getState().addItem(mockProduct);
    useCartStore.getState().removeItem(mockProduct.id);
    
    const state = useCartStore.getState();
    expect(state.items).toHaveLength(0);
  });

  it('should calculate total items correctly', () => {
    useCartStore.getState().addItem(mockProduct);
    useCartStore.getState().addItem(mockProduct);
    useCartStore.getState().addItem(mockProduct2);
    
    expect(useCartStore.getState().getTotalItems()).toBe(3);
  });

  it('should calculate total price correctly', () => {
    useCartStore.getState().addItem(mockProduct);
    useCartStore.getState().addItem(mockProduct);
    useCartStore.getState().addItem(mockProduct2);
    
    expect(useCartStore.getState().getTotalPrice()).toBe(400);
  });

  it('should clear cart', () => {
    useCartStore.getState().addItem(mockProduct);
    useCartStore.getState().clearCart();
    
    const state = useCartStore.getState();
    expect(state.items).toHaveLength(0);
  });
});
