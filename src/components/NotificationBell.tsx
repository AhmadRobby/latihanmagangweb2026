import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Check, BellRing, Info } from "lucide-react";

// Tipe data untuk notifikasi
export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  link: string;
}

export default function NotificationBell() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // MOCK DATA: Daftar notifikasi (Bisa diganti dengan fetch API nanti)
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "1",
      title: "Status Seleksi Diperbarui",
      message: "Selamat! Anda dinyatakan LOLOS seleksi tahap 1.",
      time: "2 jam lalu",
      read: false,
      link: "/pengumuman-kip"
    },
    {
      id: "2",
      title: "Jadwal Wawancara",
      message: "Jadwal wawancara online KIP Kuliah telah dirilis.",
      time: "1 hari lalu",
      read: false,
      link: "/pengumuman-kip"
    },
    {
      id: "3",
      title: "Pendaftaran Berhasil",
      message: "Berkas pendaftaran Anda telah berhasil diverifikasi oleh sistem.",
      time: "3 hari lalu",
      read: true,
      link: "/dashboard"
    }
  ]);

  // Hitung jumlah notifikasi yang belum dibaca
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Fungsi untuk menutup dropdown saat klik di luar area
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fungsi saat notifikasi diklik
  const handleNotificationClick = (notification: NotificationItem) => {
    // Tandai sebagai sudah dibaca
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n))
    );
    
    // Tutup dropdown
    setIsOpen(false);
    
    // Arahkan ke halaman terkait
    navigate(notification.link);
  };

  // Fungsi untuk menandai semua sudah dibaca
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* TOMBOL BELL */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50"
      >
        <Bell className="w-5 h-5" />
        
        {/* BADGE UNREAD COUNT */}
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-500 border-2 border-white rounded-full">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* DROPDOWN NOTIFIKASI */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* HEADER DROPDOWN */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-semibold text-slate-800">Notifikasi</h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-xs font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1"
              >
                <Check className="w-3 h-3" /> Tandai semua dibaca
              </button>
            )}
          </div>

          {/* LIST NOTIFIKASI */}
          <div className="max-h-[350px] overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="divide-y divide-slate-50">
                {notifications.map((notif) => (
                  <button
                    key={notif.id}
                    onClick={() => handleNotificationClick(notif)}
                    className={`w-full text-left p-4 hover:bg-slate-50 transition-colors flex items-start gap-3 ${
                      !notif.read ? "bg-amber-50/30" : ""
                    }`}
                  >
                    {/* Ikon penanda */}
                    <div className="mt-1 shrink-0">
                      {!notif.read ? (
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-4 ring-amber-100"></div>
                      ) : (
                        <Info className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                    
                    {/* Konten Notifikasi */}
                    <div className="flex-1 space-y-1">
                      <p className={`text-sm ${!notif.read ? "font-semibold text-slate-800" : "font-medium text-slate-600"}`}>
                        {notif.title}
                      </p>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {notif.message}
                      </p>
                      <p className="text-[10px] font-medium text-slate-400 mt-1">
                        {notif.time}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              /* EMPTY STATE */
              <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                  <BellRing className="w-6 h-6 text-slate-300" />
                </div>
                <p className="text-sm font-medium text-slate-600">Belum ada notifikasi</p>
                <p className="text-xs text-slate-400 mt-1">
                  Semua pembaruan terkait pendaftaranmu akan muncul di sini.
                </p>
              </div>
            )}
          </div>
          
          {/* FOOTER DROPDOWN */}
          <div className="p-2 border-t border-slate-100 bg-slate-50/50">
            <button className="w-full py-1.5 text-xs font-medium text-center text-slate-500 hover:text-slate-800 transition-colors rounded-md hover:bg-slate-100">
              Lihat semua aktivitas
            </button>
          </div>
        </div>
      )}
    </div>
  );
}