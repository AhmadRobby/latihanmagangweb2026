import { create } from 'zustand'

// (TypeScript)
interface PMBState {
  namaPendaftar: string | null;
  setNamaPendaftar: (nama: string) => void;
  logout: () => void;
}

// (Store)
export const usePMBStore = create<PMBState>((set) => ({
  namaPendaftar: null, // Defaultnya kosong ( because belum login/daftar)
  setNamaPendaftar: (nama) => set({ namaPendaftar: nama }),
  logout: () => set({ namaPendaftar: null }),
}))