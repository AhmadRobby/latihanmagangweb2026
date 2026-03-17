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
        className="absolute top-[-50%] left-[-10%] w-[300px] h-[100px] bg-amber-400/20 rounded-full filter blur-2xl"
        animate={{ x: [0, 200, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-50%] right-[-10%] w-[400px] h-[100px] bg-orange-400/20 rounded-full filter blur-2xl"
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
    { href: "#alur", label: "Alur Pendaftaran" },
    { href: "#kelas", label: "Program Studi" },
    { href: "#fasilitas", label: "Fasilitas" },
    { href: "#prestasi", label: "Prestasi" },
  ];

  return (
    <nav className="relative w-full border-b border-amber-100 bg-white/80 backdrop-blur-lg shadow-sm shadow-amber-900/5 sticky top-0 z-50 overflow-hidden">
      
      <NavbarLiquidBackground />

      <div className="relative z-10 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* LOGO KAMPUS STIMATA */}
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src="/logo-stimata.png" 
            alt="Logo STIMATA" 
            className="w-10 h-10 object-contain transition-transform group-hover:scale-105" 
          />
          <div className="text-xl font-extrabold text-slate-900 tracking-tight">
            PMB <span className="text-amber-600">STIMATA</span>
          </div>
        </Link>
        
        {/* Menu Navigasi Tengah (DESKTOP) */}
        <div className="hidden md:flex space-x-8 text-sm font-semibold text-slate-600">
          {navLinks.map((link, index) => (
            <a key={index} href={link.href} className="hover:text-amber-600 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-amber-500 after:transition-all hover:after:w-full">
              {link.label}
            </a>
          ))}
        </div>

        {/* Tombol Kanan (DESKTOP) */}
        <div className="hidden md:flex space-x-3">
          <Link to="/login">
            <Button variant="outline" className="border-slate-200 text-slate-700 hover:text-amber-700 hover:border-amber-300 hover:bg-amber-50 transition-all">
              Masuk
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20 transition-all">
              Daftar
            </Button>
          </Link>
        </div>

        {/* TOMBOL MENU MOBILE */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger className="p-2 rounded-md hover:bg-amber-50 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 border border-slate-200 bg-white/50">
              <Menu className="w-6 h-6 text-slate-700" />
            </SheetTrigger>    
            <SheetContent side="right" className="w-[300px] bg-white p-0 border-l border-amber-100">
              <div className="flex flex-col h-full">
                
                {/* HEADER SIDEBAR */}
                <div className="flex items-center gap-3 px-6 py-6 border-b border-slate-100 bg-slate-50/50">
                  <div className="text-xl font-extrabold text-slate-900 tracking-tight">
                    Discover <span className="text-amber-600">Us!</span>
                  </div>
                </div>
                
                {/* LINK NAVIGASI HAPE */}
                <div className="flex flex-col space-y-2 p-4">
                  {navLinks.map((link, index) => (
                    <a 
                      key={index} 
                      href={link.href} 
                      className="px-4 py-3 text-lg font-medium text-slate-700 rounded-lg hover:bg-amber-50 hover:text-amber-700 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
                
                {/* TOMBOL ACTION HAPE */}
                <div className="mt-auto p-6 border-t border-slate-100 space-y-3 bg-slate-50/50">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full h-12 border-slate-300 text-slate-700 hover:border-amber-500 hover:text-amber-600 hover:bg-amber-50 font-semibold text-base transition-all mb-3">
                      Masuk
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-base shadow-md shadow-amber-500/20 transition-all">
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