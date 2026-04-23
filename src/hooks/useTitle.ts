import { useEffect } from 'react';

export function useTitle(title: string) {
  useEffect(() => {
    // Simpan title asli (opsional, untuk cleanup)
    const previousTitle = document.title;

    // Ubah title tab browser, tambahkan nama aplikasimu di belakangnya
    document.title = `${title} | PMB STIMATA`;

    // Cleanup function: mengembalikan title ke sebelumnya saat komponen di-unmount
    return () => {
      document.title = previousTitle;
    };
  }, [title]); // Effect ini akan jalan ulang kalau parameter 'title'-nya berubah
}