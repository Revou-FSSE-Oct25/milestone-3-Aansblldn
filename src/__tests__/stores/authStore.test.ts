// src/__tests__/stores/authStore.test.ts
import { useAuthStore } from '@/stores/authStore';

// Mock fetch
global.fetch = jest.fn();

describe('AuthStore', () => {
  beforeEach(() => {
    // Reset store
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    jest.clearAllMocks();
  });

  it('should have initial state', () => {
    const state = useAuthStore.getState();
    
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should set loading when login starts', () => {
    (fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));

    useAuthStore.getState().login('test@test.com', 'password');
    
    expect(useAuthStore.getState().isLoading).toBe(true);
  });

  it('should login successfully with valid credentials', async () => {
    const mockUser = {
      id: 1,
      email: 'test@test.com',
      password: 'password',
      name: 'Test User',
      role: 'customer',
      avatar: 'https://test.com/avatar.jpg',
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [mockUser],
    });

    const success = await useAuthStore.getState().login('test@test.com', 'password');
    
    const state = useAuthStore.getState();
    expect(success).toBe(true);
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(mockUser);
    expect(state.isLoading).toBe(false);
  });

  it('should fail login with invalid credentials', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    const success = await useAuthStore.getState().login('wrong@test.com', 'wrong');
    
    const state = useAuthStore.getState();
    expect(success).toBe(false);
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBe('Invalid email or password');
  });

  it('should logout successfully', () => {
    useAuthStore.setState({
      user: { id: 1, email: 'test@test.com', name: 'Test', role: 'customer', avatar: '', password: '' },
      isAuthenticated: true,
    });

    useAuthStore.getState().logout();
    
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});