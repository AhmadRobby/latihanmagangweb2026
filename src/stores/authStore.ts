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
      // SIMULASI CEK SESSION BERDASARKAN TOKEN
      const token = localStorage.getItem('dummy_token');
      
    if (token === 'token_admin_aktif') {
    const dummyAdmin: User = { id: '2', name: 'Bapak Ahmad', email: 'ahmad@stimata.ac.id', role: 'ADMIN' };
    set({ user: dummyAdmin, isAuthenticated: true, isLoading: false });
        
    } else if (token === 'token_mhs_aktif') {
    const dummyMhs: User = { id: '1', name: 'Robby', email: 'robby@stimata.ac.id', role: 'MHS' };
    set({ user: dummyMhs, isAuthenticated: true, isLoading: false });
        
    } else {
    throw new Error("Gak ada token");
      }
    } catch (error) {
    set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  login: (userData) => {
    if (userData.role === 'ADMIN') {
      localStorage.setItem('dummy_token', 'token_admin_aktif');
    } else {
      localStorage.setItem('dummy_token', 'token_mhs_aktif');
    }
    
    set({ user: userData, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('dummy_token'); 
    localStorage.removeItem('statusPendaftaran'); 
    localStorage.removeItem('jalurPilihan');
    set({ user: null, isAuthenticated: false });
  }
}));