import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'MHS' | 'ADMIN';
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  
  // Actions
  checkAuth: () => Promise<void>;
  login: (userData: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      // Cek token dan ambil data user yang disimpen pas login
      const token = localStorage.getItem('dummy_token');
      const savedUser = localStorage.getItem('user_data'); 
      
      if (token && savedUser) {
        // Parse JSON dari storage balikin ke object
        set({ user: JSON.parse(savedUser), isAuthenticated: true, isLoading: false });
      } else {
        throw new Error("Session kosong");
      }
    } catch (error) {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  login: (userData) => {
    // Set dummy token
    if (userData.role === 'ADMIN') {
      localStorage.setItem('dummy_token', 'token_admin_aktif');
    } else {
      localStorage.setItem('dummy_token', 'token_mhs_aktif');
    }
    
    localStorage.setItem('user_data', JSON.stringify(userData));
    set({ user: userData, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('dummy_token'); 
    localStorage.removeItem('user_data'); 
    localStorage.removeItem('statusPendaftaran'); 
    localStorage.removeItem('jalurPilihan');
    set({ user: null, isAuthenticated: false });
  }
}));