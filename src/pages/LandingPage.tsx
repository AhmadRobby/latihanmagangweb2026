import { Link } from "react-router-dom";
import { useTitle } from "@/hooks/useTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, Variants } from "framer-motion";
import { 
  Laptop, Code, Database, 
  Wifi, MonitorPlay, BookOpen, 
  Trophy, Medal, Star,
  UserPlus, Milestone, FileText, 
  CreditCard, FileCheck, GraduationCap, MessageCircle, MessageSquare
} from "lucide-react";
import Navbar from "@/pages/Navbar";

// Data Dummy Testi
const testimoni = [
  { nama: "Akbar Atma", role: "Alumni S1 Teknik Informasi (Software Engineer di Tokopedia)", text: "Kurikulum STIMATA bener-bener relate sama kebutuhan industri. Lulus langsung dapet kerja!" },
  { nama: "Maftuh Al-Haq", role: "Mahasiswa D3 Sistem Informasi", text: "Fasilitas lab-nya lengkap banget, dosennya juga asik dan gampang diajak diskusi soal project luar." },
];

// DATA DUMMY ROBBY //
const kelas = [
  { title: "S1 Teknik Informasi", desc: "Fokus pada AI, rekayasa perangkat lunak, dan jaringan cerdas.", icon: <Code className="w-10 h-10 text-amber-500" /> },
  { title: "S1 Sistem Informasi", desc: "Integrasi teknologi informasi dengan analistik manajemen bisnis modern.", icon: <Database className="w-10 h-10 text-amber-500" /> },
  { title: "D3 Sistem Informasi", desc: "Siap kerja dengan keahlian praktis di bidang pengembangan web dan game.", icon: <Laptop className="w-10 h-10 text-amber-500" /> },
  { title: "Rekognisi Pembelajaran Lampau (RPL)", desc: "Program ini memungkinkan penyetaraan pengalaman kerja menjadi kredit semester (SKS) untuk mempercepat studi di perguruan tinggi.", icon: <GraduationCap className="w-10 h-10 text-amber-500" /> },
];

const fasilitas = [
  { name: "Lab Komputer Full Setup", icon: <MonitorPlay className="w-8 h-8 text-amber-500" /> },
  { name: "Perpustakaan", icon: <BookOpen className="w-8 h-8 text-amber-500" /> },
  { name: "WiFi High-Speed", icon: <Wifi className="w-8 h-8 text-amber-500" /> },
];

const alurPendaftaran = [
  { step: 1, title: "Daftar Akun", desc: "Buat akun menggunakan email aktif untuk masuk ke portal PMB STIMATA.", icon: <UserPlus className="w-8 h-8 text-amber-600" /> },
  { step: 2, title: "Pilih Jalur", desc: "Pilih jalur pendaftaran yang sesuai dengan Anda (Reguler atau KIP).", icon: <Milestone className="w-8 h-8 text-amber-600" /> },
  { step: 3, title: "Isi Form Biodata", desc: "Lengkapi data diri, asal sekolah, dan pilih program studi (S1 Teknik Informasi, S1 Sistem Informasi, D3 Sistem Infomasi, RPL).", icon: <FileText className="w-8 h-8 text-amber-600" /> },
  { step: 4, title: "Bayar Pendaftaran", desc: "Lakukan pembayaran biaya pendaftaran via transfer bank/e-wallet (Khusus untuk Jalur KIP hanya mengisi form, verivikasi berkas, dan seleksi).", icon: <CreditCard className="w-8 h-8 text-amber-600" /> },
  { step: 5, title: "Lengkapi Berkas", desc: "Unggah persyaratan seperti Pas Foto, Fotocopy KTP/KK, Fotocopy Ijazah/SKL dan berkas pendukung lainya (Sertifikat Kejuaraan/Organisasi).", icon: <FileCheck className="w-8 h-8 text-amber-600" /> },
  { step: 6, title: "Resmi Mahasiswa!", desc: "Selamat! Setelah diverifikasi, anda resmi menjadi mahasiswa kami.", icon: <GraduationCap className="w-8 h-8 text-amber-600" /> },
];

const prestasi = [
  { prestasi: "Peringkat Nasional", event: "Termasuk dalam 3000+ perguruan tinggi se-Indonesia (Ditjen Dikti 2019)", icon: <Trophy className="w-12 h-12 text-amber-400" /> },
  { prestasi: "Pengakuan Akademik", event: "Masuk dalam daftar Top-40 Sekolah Tinggi dan Top-100 Perguruan Tinggi se-Jawa Timur.", icon: <Star className="w-12 h-12 text-amber-400" /> },
  { prestasi: "Prestasi Kompetisi", event: "Finalis Hackathon 2.0", icon: <Medal className="w-12 h-12 text-amber-400" /> },
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
  useTitle("Beranda");
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative overflow-hidden bg-white pt-10 pb-20 border-b border-slate-100">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-400/10 blur-[100px] rounded-full pointer-events-none z-0"></div>

        <motion.main 
          id="home"
          initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={fadeInUp}
          className="relative z-10 container mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12 mt-8 md:mt-12"
        >
          <div className="flex-1 space-y-6 text-center md:text-left">
            <motion.div variants={fadeInUp} className="inline-block">
              <span className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </span>
                Hai Calon Programmer!
              </span>
            </motion.div>

            <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
              Wujudkan Masa Depan <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Digitalmu</span> di Sini!
            </h1>
            
            <p className="text-lg text-slate-600 md:max-w-xl mx-auto md:mx-0 leading-relaxed">
              Pendaftaran Mahasiswa Baru Tahun Akademik 2026/2027 telah dibuka. Jadilah talenta IT terbaik bersama STIMATA Malang dan raih karir impianmu.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
              <Link to="/signup" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/30 rounded-full px-8 text-base h-12">
                  Mulai Pendaftaran
                </Button>
              </Link>
              <a href="#kelas" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full border-2 border-slate-200 hover:border-amber-300 hover:bg-amber-50 text-slate-700 hover:text-amber-700 rounded-full px-8 text-base h-12 transition-all">
                  Lihat Program Studi
                </Button>
              </a>
            </div>
          </div>

          <div className="flex-1 w-full mt-12 md:mt-0 relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-[2rem] blur-lg opacity-20 group-hover:opacity-40 transition duration-500 pointer-events-none"></div>
            <div className="relative z-10 aspect-video rounded-3xl overflow-hidden shadow-2xl border-2 border-white bg-slate-100 transform transition-transform duration-500 group-hover:scale-[1.02]">
              <iframe
                className="absolute inset-0 w-full h-full object-cover pointer-events-auto"
                src="https://www.youtube.com/embed/MwMil5iUQv8?si=a-nNbopDWbejEpuG" 
                title="STIMATA Campus Tour"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy" // cek ga lemot pas jaringan lambat
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
                <div className="w-24 h-24 rounded-full bg-slate-50 border-4 border-white shadow-xl flex items-center justify-center mb-6 relative group-hover:scale-110 group-hover:border-amber-100 transition-all duration-300">
                  {alur.icon}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-500 text-white font-bold rounded-full flex items-center justify-center border-2 border-white shadow-md">
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
               <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 rounded-full shadow-lg hover:shadow-amber-500/30 transition-all">
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
    initial="hidden" 
    whileInView="visible" 
    viewport={{ once: false, amount: 0.2 }} 
    variants={staggerContainer}>
    <motion.div variants={fadeInUp} className="text-center mb-12">
      <h2 className="text-3xl font-bold text-slate-900">Program Studi Unggulan</h2>
      <p className="text-slate-600 mt-2">Pilih kelas yang sesuai dengan passion teknologimu!</p>
    </motion.div>
    
    {/* PENJELASAN UPDATE MAS : 
       Desktop: Grid 4 kolom statis dengan stagger animation
       Mobile: Flex scroll horizontal dengan stagger animation yang sama*/}
    <div className="flex overflow-x-auto pt-4 pb-8 gap-6 snap-x no-scrollbar md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible">
      {kelas.map((item, index) => (
        <motion.div 
          key={index} 
          variants={fadeInUp}
          whileHover={{ y: -10 }}
          className="min-w-[280px] sm:min-w-[320px] md:min-w-full snap-center p-1" >
          <Card className="hover:shadow-lg transition-shadow border-t-4 border-amber-500 h-full">
            <CardHeader>
              <div className="mb-4 bg-amber-50 w-16 h-16 rounded-2xl flex items-center justify-center">
                {item.icon}
              </div>
              <CardTitle className="text-xl leading-tight">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-slate-700 leading-relaxed">
                {item.desc}
              </CardDescription>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
    <div className="flex justify-center gap-2 mt-4 md:hidden">
      {kelas.map((_, i) => (
        <div key={i} className="w-2 h-2 rounded-full bg-slate-300"></div>
      ))}
    </div>
  </motion.div>
</section>

      {/* SECTION FASILITAS */}
      <section id="fasilitas" className="py-20 bg-white">
        <motion.div 
          className="container mx-auto px-6 text-center"
          initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={staggerContainer}>
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-slate-900 mb-12">Fasilitas Kampus STIMATA</motion.h2>
          <div className="flex flex-wrap justify-center gap-8">
            {fasilitas.map((fas, index) => (
              <motion.div key={index} variants={fadeInUp} className="flex flex-col items-center p-6 bg-slate-50 border rounded-2xl w-64 shadow-inner hover:border-amber-200 transition-colors">
                <div className="bg-white p-4 rounded-full shadow-md mb-4 border">{fas.icon}</div>
                <h3 className="font-semibold text-slate-800">{fas.name}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION TESTIMONI */}
<section className="py-20 bg-amber-50">
  <motion.div 
    className="container mx-auto px-6 text-center"
    initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={staggerContainer}>
    <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-slate-900 mb-12">Apa Kata Alumni Kita?</motion.h2>
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {testimoni.map((testi, index) => (
        <motion.div key={index} variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative text-left">
          <MessageSquare className="w-10 h-10 text-amber-200 absolute top-6 right-6 opacity-50" />
          <p className="text-slate-600 italic mb-6 relative z-10">"{testi.text}"</p>
          <div>
            <h4 className="font-bold text-slate-900">{testi.nama}</h4>
            <p className="text-sm text-amber-600">{testi.role}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
</section>

      {/* SECTION PRESTASI */}
      <section id="prestasi" className="py-20 bg-slate-900 text-white">
        <motion.div 
          className="container mx-auto px-6 text-center"
          initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={staggerContainer}>
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-4">Bukti Nyata Kualitas Kami</motion.h2>
          <motion.p variants={fadeInUp} className="text-slate-400 mb-12 max-w-2xl mx-auto">Kami terus berusaha membentuk generasi unggul di dunia pendidikan dan teknologi.</motion.p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {prestasi.map((pres, index) => (
              <motion.div key={index} variants={fadeInUp} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-3xl h-full flex flex-col justify-center hover:border-amber-500/50 transition-colors">
                <div className="flex justify-center mb-6 p-4 bg-slate-800 rounded-full w-24 h-24 mx-auto shadow-inner">{pres.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-slate-100">{pres.prestasi}</h3>
                <p className="text-slate-400">{pres.event}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* BUTTON BAWAHH */}
      <section className="py-20 bg-slate-50 border-t relative overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-amber-500/5 rotate-3 scale-150 pointer-events-none"></div>
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={fadeInUp}
          className="container mx-auto px-6 text-center relative z-10 flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 max-w-2xl mx-auto leading-tight">
            Siap Membentuk Sejarah?
          </h2>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed px-4">
            Jangan lewatkan kesempatan untuk menjadi bagian dari generasi IT masa depan. Kuota terbatas!
          </p>
          <Link to="/signup" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white h-14 md:h-16 px-8 md:px-10 text-lg md:text-xl font-semibold rounded-full shadow-xl shadow-amber-500/30 animate-pulse transition-all">
              Daftarkan dirimu sekarang juga!
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* FOOTER */}
  <footer className="bg-slate-950 text-slate-400 py-12">
  <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
    <div>
      <h3 className="text-xl font-bold text-white tracking-wide mb-4">STMIK PRADNYA PARAMITA</h3>
      <p className="text-sm leading-relaxed mb-4">Jl. Laksda Adi Sucipto No.249a, Kota Malang, Jawa Timur</p>
      <p className="text-sm">Email: info@stimata.ac.id<br/>Telp: (0341) 123456</p>
    </div>
    <div className="flex flex-col space-y-2">
      <h4 className="text-white font-semibold mb-2">Tautan Cepat</h4>
      <Link to="/login" className="hover:text-amber-500 transition-colors">Login Pendaftar</Link>
      <Link to="/signup" className="hover:text-amber-500 transition-colors">Daftar Sekarang</Link>
      <a href="#kelas" className="hover:text-amber-500 transition-colors">Program Studi</a>
    </div>
    <div className="flex flex-col space-y-4 md:items-end">
      <h4 className="text-white font-semibold text-center md:text-right">Sosial Media</h4>
      
      {/* Icon Sosmed */}
      <div className="flex gap-4 items-center justify-center md:justify-end">
        {/* Facebook */}
        <a  href="https://facebook.com/kampusstimata" 
          target="_blank" 
          rel="noreferrer" 
          className="bg-slate-800 p-2.5 rounded-full text-slate-400 hover:bg-[#1877F2] hover:text-white transition-all hover:-translate-y-1">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-5 h-5">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </a>

        {/* YouTube */}
        <a href="https://youtube.com/@kampusstimata" 
          target="_blank" 
          rel="noreferrer" 
          className="bg-slate-800 p-2.5 rounded-full text-slate-400 hover:bg-[#FF0000] hover:text-white transition-all hover:-translate-y-1">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-5 h-5">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
          </svg>
        </a>

        {/* TikTok */}
        <a href="https://tiktok.com/@kampusstimata" 
          target="_blank" 
          rel="noreferrer" 
          className="bg-slate-800 p-2.5 rounded-full text-slate-400 hover:bg-black hover:text-white transition-all hover:-translate-y-1">
          <svg 
            className="w-5 h-5" 
            fill="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.23-1.13 4.41-2.92 5.72-1.74 1.28-4.08 1.6-6.15 1.05-2.07-.56-3.8-2.06-4.6-4.01-.81-1.95-.69-4.28.32-6.13 1.01-1.85 2.87-3.23 4.96-3.64 2.11-.42 4.36-.08 6.22 1.01v4.21c-1.18-.7-2.6-.96-3.95-.63-1.34.34-2.48 1.25-3.09 2.47-.61 1.23-.62 2.7-.03 3.93.59 1.22 1.73 2.13 3.07 2.46 1.34.33 2.8.05 3.93-.7 1.13-.74 1.86-1.99 1.94-3.32.14-2.73.06-5.48.06-8.22-.01-3.8-.01-7.59-.01-11.39z" />
          </svg>
        </a>
      </div>
    </div>
  </div>
  
  <div className="container mx-auto px-6 flex flex-col items-center">
    <div className="w-full h-px bg-slate-800 my-4"></div> 
    <p className="text-sm text-slate-600">&copy; 2026 PMB STIMATA. All rights reserved.</p>
  </div>
</footer>
    {/* FLOAT WHATSAPP BUTTON */}
<a href="https://wa.me/6281234567890" // Reminder : nantik ganti nomer e kampus
  target="_blank" 
  rel="noreferrer"
  className="fixed bottom-6 right-6 z-50 bg-amber-500 hover:bg-amber-600 text-white p-4 rounded-full shadow-lg shadow-green-500/30 hover:-translate-y-1 transition-all flex items-center justify-center group">
  <MessageCircle className="w-6 h-6" />
  <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-in-out font-medium text-sm">
    Tanya Admin
  </span>
</a>
</div>
);}