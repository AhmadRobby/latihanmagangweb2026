import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";
const NavbarLiquidBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
      <motion.div
        className="absolute top-[-50%] left-[-10%] w-[300px] h-[100px] bg-blue-400/20 rounded-full filter blur-2xl"
        animate={{ x: [0, 200, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-50%] right-[-10%] w-[400px] h-[100px] bg-cyan-300/20 rounded-full filter blur-2xl"
        animate={{ x: [0, -250, 0], scale: [1, 1.5, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </div>
  );
};
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#kelas", label: "Program Studi" },
    { href: "#fasilitas", label: "Fasilitas" },
    { href: "#prestasi", label: "Prestasi" },
  ];

  return (
    <nav className="relative w-full border-b border-slate-200/50 bg-white/70 backdrop-blur-md sticky top-0 z-50 overflow-hidden">
      
      <NavbarLiquidBackground />

      <div className="relative z-10 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* LOGO KAMPUS STIMATA */}
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="/logo-stimata.png" 
            alt="Logo STIMATA" 
            className="w-10 h-10 object-contain" 
          />
          <div className="text-xl font-bold text-blue-700 tracking-tight">PMB STIMATA</div>
        </Link>
        
        {/* Menu Navigasi Tengah (DESKTOP) */}
        <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
          {navLinks.map((link, index) => (
            <a key={index} href={link.href} className="hover:text-blue-600 transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        {/* Tombol Kanan (DESKTOP) */}
        <div className="hidden md:flex space-x-3">
          <Link to="/login">
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">Masuk</Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Daftar</Button>
          </Link>
        </div>

        {/* TOMBOL MENU MOBILE */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger className="p-2 rounded-md hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 border bg-white/50">
              <Menu className="w-6 h-6 text-slate-600" />
            </SheetTrigger>    
            <SheetContent side="right" className="w-[300px] bg-white p-0">
              <div className="flex flex-col h-full">
                
                {/* HEADER SIDEBAR */}
                <div className="flex items-center gap-3 px-6 py-6 border-b">
                  <div className="text-xl font-bold text-blue-700 tracking-tight">
                    Discover Us!
                  </div>
                </div>
                
                {/* LINK NAVIGASI HAPE */}
                <div className="flex flex-col space-y-2 p-4">
                  {navLinks.map((link, index) => (
                    <a 
                      key={index} 
                      href={link.href} 
                      className="px-4 py-3 text-lg font-medium text-slate-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
                
                {/* TOMBOL ACTION HAPE */}
                <div className="mt-auto p-6 border-t space-y-3">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full h-12 border-blue-600 text-blue-600 font-semibold text-base">
                      Masuk
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base">
                      Daftar
                    </Button>
                  </Link>
                </div>

              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}