import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, Variants } from "framer-motion";
import { 
Laptop, Code, Database, 
Wifi, MonitorPlay, BookOpen, 
Trophy, Medal, Star
} from "lucide-react";
import Navbar from "@/pages/Navbar"; 

// DATA DUMMY ROBBY //
const kelas = [
  { title: "S1 Teknik Informatika", desc: "Fokus pada AI, rekayasa perangkat lunak, dan jaringan cerdas.", icon: <Code className="w-10 h-10 text-blue-500" /> },
  { title: "S1 Sistem Informasi", desc: "Integrasi teknologi informasi dengan manajemen bisnis modern.", icon: <Database className="w-10 h-10 text-indigo-500" /> },
  { title: "D3 Manajemen Informatika", desc: "Siap kerja dengan keahlian praktis di bidang pengembangan web.", icon: <Laptop className="w-10 h-10 text-sky-500" /> },
];

const fasilitas = [
  { name: "Lab Komputer Full Setup", icon: <MonitorPlay className="w-8 h-8 text-yellow-500" /> },
  { name: "Perpustakaan & UKM", icon: <BookOpen className="w-8 h-8 text-green-500" /> },
  { name: "WiFi High-Speed", icon: <Wifi className="w-8 h-8 text-red-500" /> },
];

const prestasi = [
  { juara: "Juara 1 Web Design", event: "Nasional IT Expo 2024", icon: <Trophy className="w-12 h-12 text-yellow-400" /> },
  { juara: "Kampus Inovatif", event: "Penghargaan Dikti 2025", icon: <Star className="w-12 h-12 text-blue-400" /> },
  { juara: "Medali Emas Hackathon", event: "Google DevFest Malang", icon: <Medal className="w-12 h-12 text-orange-400" /> },
];

// SETTING ANIMASI SCROLL //
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      
      <Navbar />

      {/* HERO SECTION */}
      <motion.main 
        id="home"
        initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={fadeInUp}
        className="container mx-auto px-6 py-20 flex flex-col-reverse md:flex-row items-center gap-12"
      >
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
            Wujudkan Masa Depan <span className="text-blue-600">Digitalmu</span> di Sini!
          </h1>
          <p className="text-lg text-slate-600 md:max-w-lg mx-auto md:mx-0">
            Pendaftaran Mahasiswa Baru Tahun Akademik 2026/2027 telah dibuka. Jadilah talenta IT terbaik bersama STIMATA Malang.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
            <Link to="/signup"><Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20">Mulai Pendaftaran</Button></Link>
          </div>
        </div>
        <div className="flex-1 w-full mt-10 md:mt-0">
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-t-2 border-blue-100/50 bg-slate-100">
            <iframe
              className="absolute inset-0 w-full h-full object-cover"
              src="https://www.youtube.com/embed/agneRtEe-t8?si=Po0b6qjG3p9hSjW0"
              title="STIMATA Campus Tour"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </motion.main>

      {/* SECTION KELAS */}
      <section id="kelas" className="py-20 bg-slate-50 border-y">
        <motion.div 
          className="container mx-auto px-6"
          initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Program Studi Unggulan</h2>
            <p className="text-slate-600 mt-2">Pilih kelas yang sesuai dengan passion teknologimu!</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {kelas.map((item, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover={{ y: -10, transition: { duration: 0.2 } }}>
                <Card className="hover:shadow-lg transition-shadow border-t-4 border-blue-500 h-full">
                  <CardHeader>
                    <div className="mb-4 bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center">{item.icon}</div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent><CardDescription className="text-base text-slate-700 leading-relaxed">{item.desc}</CardDescription></CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION FASILITAS */}
      <section id="fasilitas" className="py-20 bg-white">
        <motion.div 
          className="container mx-auto px-6 text-center"
          initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-slate-900 mb-12">Fasilitas Kampus Modern</motion.h2>
          <div className="flex flex-wrap justify-center gap-8">
            {fasilitas.map((fas, index) => (
              <motion.div key={index} variants={fadeInUp} className="flex flex-col items-center p-6 bg-slate-50 border rounded-2xl w-64 shadow-inner hover:border-blue-200 transition-colors">
                <div className="bg-white p-4 rounded-full shadow-md mb-4 border">{fas.icon}</div>
                <h3 className="font-semibold text-slate-800">{fas.name}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION PRESTASI */}
      <section id="prestasi" className="py-20 bg-blue-600 text-white">
        <motion.div 
          className="container mx-auto px-6 text-center"
          initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-4">Bukti Nyata Kualitas Kami</motion.h2>
          <motion.p variants={fadeInUp} className="text-blue-100 mb-12 max-w-2xl mx-auto">Mahasiswa kami terus menorehkan prestasi di kancah nasional maupun internasional.</motion.p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {prestasi.map((pres, index) => (
              <motion.div key={index} variants={fadeInUp} className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-3xl h-full flex flex-col justify-center">
                <div className="flex justify-center mb-6 p-4 bg-white/20 rounded-full w-24 h-24 mx-auto">{pres.icon}</div>
                <h3 className="text-xl font-bold mb-2">{pres.juara}</h3>
                <p className="text-blue-100">{pres.event}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-10 text-center">
        <div className="container mx-auto px-6 space-y-3">
          <p className="text-xl font-semibold text-white">STIMIK PRADNYA PARAMITA</p>
          <p>Jl. Laksda Adi Sucipto No.249a, Kota Malang, Jawa Timur</p>
          <p className="text-sm text-slate-500 pt-4">&copy; 2026 PMB STIMATA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}