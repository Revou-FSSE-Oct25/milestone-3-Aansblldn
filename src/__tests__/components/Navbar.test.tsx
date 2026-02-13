// src/__tests__/components/Navbar.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '@/components/Navbar';
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';

// Mock stores
jest.mock('@/stores/authStore');
jest.mock('@/stores/cartStore');

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Navbar', () => {
  const mockLogout = jest.fn();
  const mockGetTotalItems = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render logo', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: false,
      logout: mockLogout,
    });
    (useCartStore as unknown as jest.Mock).mockReturnValue({
      getTotalItems: mockGetTotalItems.mockReturnValue(0),
    });

    render(<Navbar />);
    expect(screen.getByText('RevoShop')).toBeInTheDocument();
  });

  it('should show login button when not authenticated', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: false,
      logout: mockLogout,
    });
    (useCartStore as unknown as jest.Mock).mockReturnValue({
      getTotalItems: mockGetTotalItems.mockReturnValue(0),
    });

    render(<Navbar />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('should show user name and logout when authenticated', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: { name: 'John Doe' },
      isAuthenticated: true,
      logout: mockLogout,
    });
    (useCartStore as unknown as jest.Mock).mockReturnValue({
      getTotalItems: mockGetTotalItems.mockReturnValue(2),
    });

    render(<Navbar />);
    expect(screen.getByText('Hello, John Doe')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('should show cart count', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: false,
      logout: mockLogout,
    });
    (useCartStore as unknown as jest.Mock).mockReturnValue({
      getTotalItems: mockGetTotalItems.mockReturnValue(3),
    });

    render(<Navbar />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should call logout when logout button clicked', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: { name: 'John' },
      isAuthenticated: true,
      logout: mockLogout,
    });
    (useCartStore as unknown as jest.Mock).mockReturnValue({
      getTotalItems: mockGetTotalItems.mockReturnValue(0),
    });

    render(<Navbar />);
    fireEvent.click(screen.getByText('Logout'));
    expect(mockLogout).toHaveBeenCalled();
  });
});