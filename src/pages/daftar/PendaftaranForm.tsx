import React, { useState, useEffect, useRef } from "react";
import { useTitle } from "@/hooks/useTitle";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight, Save, ArrowLeft, ChevronDown, Search, X } from "lucide-react";

const InputField = ({ label, name, type = "text", placeholder = "", value, onChange, error }: any) => (
  <div className="flex flex-col space-y-1.5 w-full">
    <label className="text-sm font-semibold text-slate-700">{label}</label>
    <input
      type={type} 
      name={name} 
      value={value} 
      onChange={onChange} 
      placeholder={placeholder}
      className={`flex h-10 w-full rounded-md border ${
        error ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'
      } bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all 
      ${type === 'date' ? 'appearance-none min-h-[40px] block' : ''} 
      ${type === 'number' ? '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' : ''}`}
    />
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
);

const SelectField = ({ label, name, options, value, onChange, error }: any) => (
  <div className="flex flex-col space-y-1.5 w-full">
    <label className="text-sm font-semibold text-slate-700">{label}</label>
    <select
      name={name} value={value} onChange={onChange}
      className={`flex h-10 w-full rounded-md border ${error ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'} bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all`}>
      <option value="" disabled>Pilih {label}</option>
      {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
);

const SearchableSelectField = ({ label, name, options, value, onChange, error, placeholder = "Pilih..." }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options
    .filter((opt: string) => opt.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 1); 

  const handleSelect = (selectedValue: string) => {
    onChange({ target: { name, value: selectedValue } });
    setIsOpen(false);
    setSearch(""); 
  };

  return (
    <div className="flex flex-col space-y-1.5 w-full" ref={wrapperRef}>
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex h-10 w-full items-center justify-between rounded-md border ${error ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'} bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all`}>
          <span className={value ? "text-slate-900 font-medium" : "text-slate-500"}>
            {value || placeholder}
          </span>
          <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <div className="absolute bottom-full left-0 mb-1 w-full rounded-md border border-slate-200 bg-white shadow-xl z-[99] overflow-hidden">
            <div className="flex items-center border-b border-slate-100 px-3 py-2 bg-slate-50">
              <Search className="h-4 w-4 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                autoFocus
                className="w-full bg-transparent text-sm outline-none text-slate-700 placeholder:text-slate-400"
                placeholder={`Cari ${label.toLowerCase()}...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}/>
              {search && (
                <button type="button" onClick={() => setSearch("")} className="text-slate-400 hover:text-slate-600">
                <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            
            {search ? (
              <ul className="max-h-48 overflow-y-auto py-1">
                {filteredOptions.length === 0 ? (
                  <li className="px-3 py-3 text-sm text-slate-500 text-center">Data tidak ditemukan</li>
                ) : (
                  filteredOptions.map((opt: string) => (
                    <li
                      key={opt}
                      onClick={() => handleSelect(opt)}
                      className={`flex cursor-pointer items-center justify-between px-3 py-2.5 text-sm transition-colors hover:bg-slate-100 ${value === opt ? 'bg-amber-50 text-amber-700 font-medium' : 'text-slate-700'}`}>
                      {opt}
                      {value === opt && <CheckCircle2 className="h-4 w-4 text-amber-600" />}
                    </li>
                  ))
                )}
              </ul>
            ) : (
              <div className="px-3 py-4 text-sm text-slate-400 text-center italic bg-white">
                Ketik untuk mencari...
              </div>
            )}
          </div>
        )}
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default function PendaftaranForm() {
  useTitle("Formulir Pendaftaran");
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [jalurPilihan, setJalurPilihan] = useState<string>("");
  
  useEffect(() => {
    const jalur = localStorage.getItem("jalurPilihan");
    if (jalur) setJalurPilihan(jalur);
  }, []);

  const [formData, setFormData] = useState({
    namaLengkap: "", tempatLahir: "", tanggalLahir: "", jenisKelamin: "",
    agama: "", alamat: "", kotaAsal: "", noHp: "",
    asalSekolah: "", jurusanSekolah: "", tahunLulus: "", pilihanProdi: "",
    namaAyah: "", pekerjaanAyah: "", namaIbu: "", pekerjaanIbu: "", penghasilanOrtu: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | { target: { name: string; value: string } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateStep = () => {
    let newErrors: Record<string, string> = {};
    let isValid = true;

    if (currentStep === 1) {
      const requiredFields = ['namaLengkap', 'tempatLahir', 'tanggalLahir', 'jenisKelamin', 'agama', 'alamat', 'kotaAsal', 'noHp'];
      requiredFields.forEach(field => {
        if (!formData[field as keyof typeof formData]) {
          newErrors[field] = "Wajib diisi";
          isValid = false;
        }
      });
    } else if (currentStep === 2) {
      const requiredFields = ['asalSekolah', 'jurusanSekolah', 'tahunLulus', 'pilihanProdi'];
      requiredFields.forEach(field => {
        if (!formData[field as keyof typeof formData]) {
          newErrors[field] = "Wajib diisi";
          isValid = false;
        }
      });
    } else if (currentStep === 3) {
      const requiredFields = ['namaAyah', 'pekerjaanAyah', 'namaIbu', 'pekerjaanIbu', 'penghasilanOrtu'];
      requiredFields.forEach(field => {
        if (!formData[field as keyof typeof formData]) {
          newErrors[field] = "Wajib diisi";
          isValid = false;
        }
      });
    }

    setErrors(newErrors);
    return isValid;
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); 
      localStorage.setItem("statusPendaftaran", "SUBMITTED");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { num: 1, title: "Data Pribadi" },
    { num: 2, title: "Pendidikan" },
    { num: 3, title: "Data Ortu" },
    { num: 4, title: "Review" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        <Button 
          variant="ghost" 
          onClick={() => {
            window.scrollTo(0, 0); 
            navigate("/dashboard"); 
          }} 
          className="mb-6 text-slate-600 hover:text-amber-600 hover:bg-amber-50 px-0 sm:px-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Dashboard
        </Button>

        <div className="mb-12">
          <h1 className="text-3xl font-bold text-slate-900 text-center mb-10">Formulir Pendaftaran Mahasiswa Baru</h1>
          
          <div className="relative flex items-center justify-between w-full max-w-3xl mx-auto">
            <div className="absolute left-0 top-5 w-full h-0 border-t-2 border-dashed border-slate-300 z-0"></div>
            <div 
              className="absolute left-0 top-[19px] h-[3px] bg-amber-500 z-0 transition-all duration-500 ease-in-out"
              style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
            ></div>
            
            {steps.map((step) => (
              <div key={step.num} className="flex flex-col items-center gap-2 relative z-10 bg-slate-50 px-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-4 transition-colors duration-300 ${
                  currentStep >= step.num ? "bg-amber-500 border-amber-100 text-white shadow-md shadow-amber-200" : "bg-white border-slate-200 text-slate-400"
                }`}>
                  {currentStep > step.num ? <CheckCircle2 className="w-5 h-5" /> : step.num}
                </div>
                <span className={`text-xs font-semibold absolute top-12 whitespace-nowrap hidden sm:block ${currentStep >= step.num ? 'text-amber-700' : 'text-slate-400'}`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Card className="shadow-xl border-t-4 border-t-amber-500 mt-8">
          <CardContent className="pt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}>
                
                {currentStep === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Nama Lengkap (Sesuai Ijazah)" name="namaLengkap" value={formData.namaLengkap} onChange={handleChange} error={errors.namaLengkap} />
                    <div className="flex flex-row gap-4 w-full">
                      <InputField label="Tempat Lahir" name="tempatLahir" value={formData.tempatLahir} onChange={handleChange} error={errors.tempatLahir} />
                      <InputField label="Tanggal Lahir" name="tanggalLahir" type="date" value={formData.tanggalLahir} onChange={handleChange} error={errors.tanggalLahir} />
                    </div>
                    <SelectField label="Jenis Kelamin" name="jenisKelamin" options={["Laki-laki", "Perempuan"]} value={formData.jenisKelamin} onChange={handleChange} error={errors.jenisKelamin} />
                    <SelectField label="Agama" name="agama" options={["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"]} value={formData.agama} onChange={handleChange} error={errors.agama} />
                    <div className="md:col-span-2">
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700">Alamat Lengkap</label>
                        <textarea
                          name="alamat" value={formData.alamat} onChange={handleChange} rows={3}
                          className={`flex w-full rounded-md border ${errors.alamat ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'} p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500`}
                        />
                        {errors.alamat && <span className="text-xs text-red-500">{errors.alamat}</span>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2">
                      <InputField label="Kota Asal" name="kotaAsal" value={formData.kotaAsal} onChange={handleChange} error={errors.kotaAsal} />
                      <InputField label="No. Handphone (WhatsApp)" name="noHp" type="tel" value={formData.noHp} onChange={handleChange} error={errors.noHp} />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Asal Sekolah (SMA/SMK/MA)" name="asalSekolah" value={formData.asalSekolah} onChange={handleChange} error={errors.asalSekolah} />
                    <InputField label="Jurusan Sekolah" name="jurusanSekolah" value={formData.jurusanSekolah} onChange={handleChange} error={errors.jurusanSekolah} />
                    
                    <InputField label="Tahun Lulus" name="tahunLulus" type="number" placeholder="Contoh: 2024" value={formData.tahunLulus} onChange={handleChange} error={errors.tahunLulus} />
                    
                    <SearchableSelectField 
                      label="Pilihan Program Studi" 
                      name="pilihanProdi" 
                      placeholder="Ketik nama prodi..."
                      options={["S1 Teknik Informasi", "S1 Sistem Informasi", "D3 Sistem Informasi", "Rekognisi Pembelajaran Lampau"]} 
                      value={formData.pilihanProdi} 
                      onChange={handleChange} 
                      error={errors.pilihanProdi} 
                    />
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                    <div className="space-y-4 border-r md:pr-6 border-slate-100">
                      <h3 className="font-bold text-slate-800 border-b pb-2">Data Ayah</h3>
                      <InputField label="Nama Lengkap Ayah" name="namaAyah" value={formData.namaAyah} onChange={handleChange} error={errors.namaAyah} />
                      <InputField label="Pekerjaan Ayah" name="pekerjaanAyah" value={formData.pekerjaanAyah} onChange={handleChange} error={errors.pekerjaanAyah} />
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-bold text-slate-800 border-b pb-2">Data Ibu</h3>
                      <InputField label="Nama Lengkap Ibu" name="namaIbu" value={formData.namaIbu} onChange={handleChange} error={errors.namaIbu} />
                      <InputField label="Pekerjaan Ibu" name="pekerjaanIbu" value={formData.pekerjaanIbu} onChange={handleChange} error={errors.pekerjaanIbu} />
                    </div>
                    <div className="md:col-span-2 mt-4 pt-4 border-t border-slate-100">
                      <InputField 
                        label="Rata-rata Penghasilan Orang Tua / Bulan (Rp)" 
                        name="penghasilanOrtu" 
                        type="number" 
                        placeholder="Contoh: 5.000.000" 
                        value={formData.penghasilanOrtu} 
                        onChange={handleChange} 
                        error={errors.penghasilanOrtu} 
                      />
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-lg flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5 text-amber-600" />
                      <div>
                        <h4 className="font-bold">Konfirmasi Data</h4>
                        <p className="text-sm mt-1">Silakan periksa kembali data Anda. Jika sudah sesuai, klik tombol Submit di bawah. Data yang sudah disubmit tidak dapat diubah kembali.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                      <div className="space-y-3">
                        <h3 className="font-bold text-lg text-slate-800 border-b pb-2">Data Pribadi</h3>
                        <div className="grid grid-cols-3 gap-2"><span className="text-slate-500">Nama</span><span className="col-span-2 font-medium">: {formData.namaLengkap}</span></div>
                        <div className="grid grid-cols-3 gap-2"><span className="text-slate-500">TTL</span><span className="col-span-2 font-medium">: {formData.tempatLahir}, {formData.tanggalLahir}</span></div>
                        <div className="grid grid-cols-3 gap-2"><span className="text-slate-500">Gender</span><span className="col-span-2 font-medium">: {formData.jenisKelamin} ({formData.agama})</span></div>
                        <div className="grid grid-cols-3 gap-2"><span className="text-slate-500">Kontak</span><span className="col-span-2 font-medium">: {formData.noHp}</span></div>
                        <div className="grid grid-cols-3 gap-2"><span className="text-slate-500">Alamat</span><span className="col-span-2 font-medium">: {formData.alamat}, {formData.kotaAsal}</span></div>
                      </div>

                      <div className="space-y-8">
                        <div className="space-y-3">
                          <h3 className="font-bold text-lg text-slate-800 border-b pb-2">Data Pendidikan</h3>
                          <div className="grid grid-cols-3 gap-2"><span className="text-slate-500">Asal Sekolah</span><span className="col-span-2 font-medium">: {formData.asalSekolah} ({formData.jurusanSekolah})</span></div>
                          <div className="grid grid-cols-3 gap-2"><span className="text-slate-500">Tahun Lulus</span><span className="col-span-2 font-medium">: {formData.tahunLulus}</span></div>
                          <div className="grid grid-cols-3 gap-2"><span className="text-slate-500">Prodi</span><span className="col-span-2 font-bold text-amber-600">: {formData.pilihanProdi}</span></div>
                          <div className="grid grid-cols-3 gap-2"><span className="text-slate-500">Jalur Masuk</span><span className="col-span-2 font-bold text-amber-600">: {jalurPilihan || "-"}</span></div>
                        </div>

                        <div className="space-y-3">
                          <h3 className="font-bold text-lg text-slate-800 border-b pb-2">Data Orang Tua</h3>
                          <div className="grid grid-cols-3 gap-2"><span className="text-slate-500">Ayah</span><span className="col-span-2 font-medium">: {formData.namaAyah} ({formData.pekerjaanAyah})</span></div>
                          <div className="grid grid-cols-3 gap-2"><span className="text-slate-500">Ibu</span><span className="col-span-2 font-medium">: {formData.namaIbu} ({formData.pekerjaanIbu})</span></div>
                          <div className="grid grid-cols-3 gap-2"><span className="text-slate-500">Penghasilan</span><span className="col-span-2 font-medium">: Rp {formData.penghasilanOrtu}</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between items-center mt-10 pt-6 border-t border-slate-100 relative z-0">
              <Button 
                variant="outline" 
                onClick={prevStep} 
                disabled={currentStep === 1 || isSubmitting}
                className={currentStep === 1 ? 'invisible' : 'flex gap-2 text-slate-700 hover:text-slate-900'}
              >
                <ChevronLeft className="w-4 h-4" /> Kembali
              </Button>

              {currentStep < 4 ? (
                <Button onClick={nextStep} className="bg-amber-500 hover:bg-amber-600 text-white flex gap-2 px-6">
                  Selanjutnya <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-amber-500 hover:bg-amber-600 text-white flex gap-2 px-8 shadow-lg shadow-amber-500/20">
                  {isSubmitting ? "Memproses..." : <><Save className="w-4 h-4" /> Submit Pendaftaran</>}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}