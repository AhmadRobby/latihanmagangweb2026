import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, Variants } from "framer-motion";
import { 
  Laptop, Code, Database, 
  Wifi, MonitorPlay, BookOpen, 
  Trophy, Medal, Star,
  UserPlus, Milestone, FileText, 
  CreditCard, FileCheck, GraduationCap
} from "lucide-react";
import Navbar from "@/pages/Navbar"; 

// DATA DUMMY ROBBY //
const kelas = [
  { title: "S1 Teknik Informatika", desc: "Fokus pada AI, rekayasa perangkat lunak, dan jaringan cerdas.", icon: <Code className="w-10 h-10 text-blue-500" /> },
  { title: "S1 Sistem Informasi", desc: "Integrasi teknologi informasi dengan analistik manajemen bisnis modern.", icon: <Database className="w-10 h-10 text-indigo-500" /> },
  { title: "D3 Manajemen Informatika", desc: "Siap kerja dengan keahlian praktis di bidang pengembangan web dan game.", icon: <Laptop className="w-10 h-10 text-sky-500" /> },
];

const fasilitas = [
  { name: "Lab Komputer Full Setup", icon: <MonitorPlay className="w-8 h-8 text-yellow-500" /> },
  { name: "Perpustakaan", icon: <BookOpen className="w-8 h-8 text-green-500" /> },
  { name: "WiFi High-Speed", icon: <Wifi className="w-8 h-8 text-red-500" /> },
];

const alurPendaftaran = [
  { step: 1, title: "Daftar Akun", desc: "Buat akun menggunakan email aktif untuk masuk ke portal PMB STIMATA.", icon: <UserPlus className="w-8 h-8 text-blue-600" /> },
  { step: 2, title: "Pilih Jalur", desc: "Pilih jalur pendaftaran yang sesuai dengan Anda (Reguler atau KIP).", icon: <Milestone className="w-8 h-8 text-indigo-600" /> },
  { step: 3, title: "Isi Form Biodata", desc: "Lengkapi data diri, asal sekolah, dan pilih program studi (S1 Teknik Informasi, S1 Sistem Informasi, D3 Sistem Infomasi).", icon: <FileText className="w-8 h-8 text-sky-600" /> },
  { step: 4, title: "Bayar Pendaftaran", desc: "Lakukan pembayaran biaya pendaftaran via transfer bank/e-wallet (Khusus untuk Jalur KIP hanya mengisi form, verivikasi berkas, dan seleksi).", icon: <CreditCard className="w-8 h-8 text-amber-500" /> },
  { step: 5, title: "Lengkapi Berkas", desc: "Unggah persyaratan seperti Pas Foto, Fotocopy KTP/KK, Fotocopy Ijazah/SKL dan berkas pendukung lainya (Sertifikat Kejuaraan/Organisasi).", icon: <FileCheck className="w-8 h-8 text-green-500" /> },
  { step: 6, title: "Resmi Mahasiswa!", desc: "Selamat! Setelah diverifikasi, anda resmi menjadi mahasiswa kami.", icon: <GraduationCap className="w-8 h-8 text-purple-600" /> },
];

const prestasi = [
  { prestasi: "Peringkat Nasional", event: "Termasuk dalam 3000+ perguruan tinggi se-Indonesia (Ditjen Dikti 2019)", icon: <Trophy className="w-12 h-12 text-yellow-400" /> },
  { prestasi: "Pengakuan Akademik", event: "Masuk dalam daftar Top-40 Sekolah Tinggi dan Top-100 Perguruan Tinggi se-Jawa Timur.", icon: <Star className="w-12 h-12 text-blue-400" /> },
  { prestasi: "Prestasi Kompetisi", event: "Finalis Hackathon 2.0", icon: <Medal className="w-12 h-12 text-orange-400" /> },
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

      {/* HERO SECTION SUPER CATCHY */}
      <div className="relative overflow-hidden bg-white pt-10 pb-20 border-b border-slate-100">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-400/20 blur-[100px] rounded-full pointer-events-none z-0"></div>

        <motion.main 
          id="home"
          initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={fadeInUp}
          className="relative z-10 container mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12 mt-8 md:mt-12"
        >
          <div className="flex-1 space-y-6 text-center md:text-left">
            <motion.div variants={fadeInUp} className="inline-block">
              <span className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
                </span>
                Hai Calom Programmer!
              </span>
            </motion.div>

            <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
              Wujudkan Masa Depan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Digitalmu</span> di Sini!
            </h1>
            
            <p className="text-lg text-slate-600 md:max-w-xl mx-auto md:mx-0 leading-relaxed">
              Pendaftaran Mahasiswa Baru Tahun Akademik 2026/2027 telah dibuka. Jadilah talenta IT terbaik bersama STIMATA Malang dan raih karir impianmu.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
              <Link to="/signup" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30 rounded-full px-8 text-base h-12">
                  Mulai Pendaftaran
                </Button>
              </Link>
              <a href="#kelas" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-full px-8 text-base h-12 transition-all">
                  Lihat Program Studi
                </Button>
              </a>
            </div>

            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-4 pt-8 mt-4 border-t border-slate-200/60 max-w-md mx-auto md:mx-0">
            </motion.div>
          </div>

          <div className="flex-1 w-full mt-12 md:mt-0 relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[2rem] blur-lg opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-2 border-white bg-slate-100 transform transition-transform duration-500 group-hover:scale-[1.02]">
              <iframe
                className="absolute inset-0 w-full h-full object-cover pointer-events-auto"
                src="https://www.youtube.com/embed/agneRtEe-t8?si=Po0b6qjG3p9hSjW0"
                title="STIMATA Campus Tour"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </motion.main>
      </div>

      {/* SECTION ALUR PENDAFTARAN */}
      <section id="alur" className="py-20 bg-white border-b border-slate-100">
        <motion.div 
          className="container mx-auto px-6"
          initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }} variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Alur Pendaftaran Mudah & Cepat</h2>
            <p className="text-slate-600 mt-2 text-lg">Hanya 6 langkah mudah untuk bergabung menjadi bagian dari kami.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          
            
            {alurPendaftaran.map((alur, index) => (
              <motion.div key={index} variants={fadeInUp} className="relative z-10 flex flex-col items-center text-center group">
                {(index + 1) % 3 !== 0 && (
                  <div className="hidden lg:block absolute top-12 left-[50%] w-full h-0.5 border-t-2 border-dashed border-slate-200 -z-10"></div>
                )}
                <div className="w-24 h-24 rounded-full bg-slate-50 border-4 border-white shadow-xl flex items-center justify-center mb-6 relative group-hover:scale-110 group-hover:border-blue-100 transition-all duration-300">
                  {alur.icon}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center border-2 border-white shadow-md">
                    {alur.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{alur.title}</h3>
                <p className="text-slate-600 px-4">{alur.desc}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div variants={fadeInUp} className="mt-16 text-center">
             <Link to="/signup">
               <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 rounded-full shadow-lg hover:shadow-blue-500/30 transition-all">
              Mulai dari langkah pertama
               </Button>
             </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION KELAS */}
      <section id="kelas" className="py-20 bg-slate-50 border-b border-slate-100">
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
          initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={staggerContainer}>
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
                <h3 className="text-xl font-bold mb-2">{pres.prestasi}</h3>
                <p className="text-blue-100">{pres.event}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* BUTTON BAWAHH */}
      <section className="py-20 bg-slate-50 border-t relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 rotate-3 scale-150"></div>
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={fadeInUp}
          className="container mx-auto px-6 text-center relative z-10"
        >
          <h2 className="text-4xl font-extrabold text-slate-900 mb-6">Siap Membentuk Sejarah?</h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Jangan lewatkan kesempatan untuk menjadi bagian dari generasi IT masa depan. Kuota terbatas!
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white h-16 px-10 text-xl rounded-full shadow-2xl shadow-blue-600/30 animate-pulse">
              Daftarkan dirimu sekarang juga!
            </Button>
          </Link>
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