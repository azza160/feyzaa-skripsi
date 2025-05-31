"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Menu,
  X,
  ChevronRight,
  Star,
  Users,
  BookOpen,
  Trophy,
  Target,
  Gamepad2,
  CheckCircle,
  Play,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ChevronLeft,
  Quote,
  ArrowRight,
  Sparkles,
  Clock,
  Globe,
  Heart,
  MessageCircle,
  Shield,
  Rocket,
} from "lucide-react"
import { Link } from "@inertiajs/react"

export default function JapaneseLearningOptimized() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [navBackground, setNavBackground] = useState(false)

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -200])

  useEffect(() => {
    const handleScroll = () => {
      setNavBackground(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: <Gamepad2 className="h-8 w-8" />,
      title: "Sistem Kuis Interaktif",
      description:
        "Uji kemampuan Anda dengan kuis yang menyenangkan dan menantang. Dari hiragana, katakana, hingga kanji dengan berbagai tingkat kesulitan yang dapat disesuaikan.",
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50 to-rose-50",
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Sistem Level & Achievement",
      description:
        "Raih pencapaian dan naik level sambil belajar. Kumpulkan badge, unlock konten baru, dan kompetisi dengan pelajar lain dalam leaderboard global.",
      gradient: "from-amber-500 to-orange-500",
      bgGradient: "from-amber-50 to-orange-50",
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Pembelajaran Terstruktur",
      description:
        "Kurikulum yang dirancang sistematis dari level N5 hingga N1. Setiap materi dilengkapi dengan audio native speaker dan contoh penggunaan dalam kehidupan sehari-hari.",
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
    },
  ]

  const testimonials = [
    {
      name: "Sari Indrawati",
      role: "Mahasiswa Sastra Jepang",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content:
        "Platform ini benar-benar mengubah cara saya belajar bahasa Jepang! Sistem kuis yang interaktif membuat belajar jadi tidak membosankan. Dalam 3 bulan, saya sudah bisa membaca hiragana dan katakana dengan lancar!",
      rating: 5,
      progress: "Level N4 - 850 Kanji dikuasai",
    },
    {
      name: "Ahmad Rizki",
      role: "Software Engineer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content:
        "Sebagai orang yang sibuk bekerja, platform ini sangat membantu karena bisa belajar kapan saja. Sistem level yang ada membuat saya termotivasi untuk terus belajar setiap hari.",
      rating: 5,
      progress: "Level N3 - 1200 Kanji dikuasai",
    },
    {
      name: "Maya Putri",
      role: "Pelajar SMA",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content:
        "Saya suka banget dengan kuis-kuis yang ada! Belajar kanji jadi lebih mudah dan menyenangkan. Achievement system-nya bikin saya ketagihan belajar. Arigatou gozaimasu!",
      rating: 5,
      progress: "Level N5 - 500 Kanji dikuasai",
    },
    {
      name: "Budi Santoso",
      role: "Businessman",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content:
        "Persiapan untuk ekspansi bisnis ke Jepang jadi lebih mudah dengan platform ini. Materi pembelajaran yang terstruktur sangat membantu. Highly recommended!",
      rating: 5,
      progress: "Level N2 - 1800 Kanji dikuasai",
    },
  ]

  const faqs = [
    {
      question: "Apakah platform ini gratis?",
      answer:
        "Ya! Kami menyediakan akses gratis untuk materi dasar termasuk hiragana, katakana, dan 100 kanji pertama. Untuk fitur premium seperti kuis unlimited, progress tracking detail, dan materi N1-N2, tersedia paket berlangganan mulai dari Rp 99.000/bulan.",
    },
    {
      question: "Apakah cocok untuk pemula yang belum pernah belajar bahasa Jepang?",
      answer:
        "Tentu saja! Platform kami dirancang khusus untuk pemula. Kami mulai dari dasar-dasar seperti hiragana, katakana, hingga kanji dan tata bahasa. Sistem level memastikan Anda belajar secara bertahap dengan pace yang nyaman.",
    },
    {
      question: "Bagaimana sistem kuis dan level bekerja?",
      answer:
        "Sistem kami menggunakan spaced repetition dan adaptive learning. Setiap kuis akan menyesuaikan tingkat kesulitan berdasarkan performa Anda. Level naik otomatis ketika Anda menguasai sejumlah materi tertentu, dan ada achievement khusus untuk motivasi ekstra.",
    },
    {
      question: "Berapa lama waktu yang dibutuhkan untuk mahir berbahasa Jepang?",
      answer:
        "Waktu belajar bervariasi tergantung dedikasi dan waktu yang diluangkan. Dengan konsistensi 30 menit per hari, umumnya pengguna dapat menguasai N5 dalam 3-4 bulan, N4 dalam 8-10 bulan, dan N3 dalam 1.5-2 tahun.",
    },
    {
      question: "Apakah ada sertifikat setelah menyelesaikan level tertentu?",
      answer:
        "Ya! Setiap level yang diselesaikan akan mendapat sertifikat digital. Untuk level N3 ke atas, kami juga menyediakan sertifikat yang dapat digunakan sebagai portofolio untuk keperluan akademik atau profesional.",
    },
    {
      question: "Bisakah mengakses materi secara offline?",
      answer:
        "Fitur offline tersedia untuk member premium. Anda dapat mengunduh materi pembelajaran dan kuis untuk diakses tanpa koneksi internet. Namun, untuk sinkronisasi progress dan leaderboard, koneksi internet diperlukan.",
    },
  ]

  const stats = [
    { number: "75,000+", label: "Pelajar Aktif", icon: <Users className="h-5 w-5" /> },
    { number: "2,500+", label: "Materi Kuis", icon: <Gamepad2 className="h-5 w-5" /> },
    { number: "98%", label: "Tingkat Kepuasan", icon: <Heart className="h-5 w-5" /> },
    { number: "24/7", label: "Akses Belajar", icon: <Clock className="h-5 w-5" /> },
  ]

  const AnimatedSection = ({ children, className = "" }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={className}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          navBackground ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 p-5">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">日</span>
              </div>
              <span
                className={`text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${!navBackground ? "drop-shadow-lg" : ""}`}
              >
                NihonGo
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {["Beranda", "Tentang", "Fitur", "Testimoni", "FAQ", "Kontak"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`font-medium transition-colors duration-300 ${
                    navBackground
                      ? "text-gray-700 hover:text-blue-600"
                      : "text-white hover:text-blue-200 drop-shadow-lg"
                  }`}
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <Link href={route('login')}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg px-6 py-2 rounded-full font-semibold">
                  Masuk
                </Button>
              </motion.div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className={`h-6 w-6 ${navBackground ? "text-gray-700" : "text-white"}`} />
              ) : (
                <Menu className={`h-6 w-6 ${navBackground ? "text-gray-700" : "text-white"}`} />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-md"
            >
              <div className="flex flex-col space-y-3">
                {["Beranda", "Tentang", "Fitur", "Testimoni", "FAQ", "Kontak"].map((item) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-700 hover:text-blue-600 transition-colors font-medium px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
                <div className="flex flex-col space-y-2 pt-3 border-t border-gray-200">
                  <Button variant="ghost" className="justify-start">
                    Masuk
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Daftar Gratis
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section
        id="beranda"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=2069')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Parallax Background Overlay */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6 md:space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border-white/30 hover:bg-gradient-to-r hover:from-blue-500/30 hover:to-purple-500/30 px-4 py-2 backdrop-blur-sm">
                <Sparkles className="mr-2 h-4 w-4" />
                Platform #1 Belajar Bahasa Jepang di Indonesia
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight text-white"
            >
              Belajar Bahasa
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl"
              >
                Jepang
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="block text-white"
              >
                Dengan Mudah
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-200 leading-relaxed max-w-4xl mx-auto font-light"
            >
              Kuasai bahasa Jepang dari nol hingga mahir dengan sistem kuis interaktif, pembelajaran terstruktur, dan
              achievement yang memotivasi. Bergabunglah dengan 75,000+ pelajar yang sudah merasakan kemudahan belajar
              bersama kami!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl px-8 py-4 rounded-full font-bold"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Mulai Belajar Gratis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/50 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full font-bold"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Lihat Demo
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.7 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-12 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.9 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                >
                  <div className="flex justify-center mb-2 text-blue-400">{stat.icon}</div>
                  <div className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-1">{stat.number}</div>
                  <div className="text-xs md:text-sm text-gray-300 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="tentang" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200 mb-4">
              <Target className="mr-2 h-4 w-4" />
              Tentang NihonGo
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight">
              Mengapa Memilih{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                NihonGo
              </span>
              ?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Kami berkomitmen untuk membuat pembelajaran bahasa Jepang menjadi pengalaman yang menyenangkan, efektif,
              dan dapat diakses oleh siapa saja, kapan saja, di mana saja dengan teknologi terdepan.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="h-10 w-10" />,
                title: "Pembelajaran Terarah",
                description:
                  "Kurikulum yang terstruktur dan terarah, dimulai dari level dasar hingga mahir dengan jalur pembelajaran yang jelas dan terukur sesuai standar JLPT.",
                gradient: "from-blue-600 to-blue-700",
                bgGradient: "from-blue-50 to-blue-100",
              },
              {
                icon: <Rocket className="h-10 w-10" />,
                title: "Teknologi Modern",
                description:
                  "Menggunakan teknologi terdepan untuk memberikan pengalaman belajar yang interaktif dan engaging dengan sistem tracking progress real-time.",
                gradient: "from-purple-600 to-purple-700",
                bgGradient: "from-purple-50 to-purple-100",
              },
              {
                icon: <Users className="h-10 w-10" />,
                title: "Komunitas Aktif",
                description:
                  "Bergabung dengan komunitas pelajar yang aktif dan saling mendukung dalam perjalanan menguasai bahasa Jepang dengan mentor berpengalaman.",
                gradient: "from-emerald-600 to-emerald-700",
                bgGradient: "from-emerald-50 to-emerald-100",
              },
            ].map((item, index) => (
              <AnimatedSection key={index}>
                <motion.div whileHover={{ scale: 1.02, y: -5 }}>
                  <Card
                    className={`text-center p-8 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br ${item.bgGradient} h-full`}
                  >
                    <CardHeader>
                      <motion.div
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                        className={`w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg`}
                      >
                        {item.icon}
                      </motion.div>
                      <CardTitle className="text-xl font-bold text-gray-800">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="fitur" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200 mb-4">
              <Sparkles className="mr-2 h-4 w-4" />
              Fitur Unggulan
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight">
              Fitur-Fitur{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Canggih
              </span>{" "}
              untuk Pembelajaran Optimal
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Nikmati berbagai fitur inovatif yang dirancang khusus untuk membuat pembelajaran bahasa Jepang menjadi
              lebih efektif, menyenangkan, dan terukur.
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <AnimatedSection key={index}>
                <motion.div whileHover={{ scale: 1.02, y: -8 }}>
                  <Card
                    className={`p-8 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br ${feature.bgGradient} h-full`}
                  >
                    <CardHeader className="pb-4">
                      <motion.div
                        whileHover={{ rotate: -5, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                        className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-4 text-white shadow-lg`}
                      >
                        {feature.icon}
                      </motion.div>
                      <CardTitle className="text-xl font-bold mb-3">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                      <Button
                        variant="ghost"
                        className={`text-transparent bg-gradient-to-r ${feature.gradient} bg-clip-text hover:bg-gray-100 font-semibold`}
                      >
                        Pelajari Lebih Lanjut
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-12">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl px-8 py-4 rounded-full font-bold"
              >
                Jelajahi Semua Fitur
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimoni" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200 mb-4">
              <MessageCircle className="mr-2 h-4 w-4" />
              Testimoni Pengguna
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight">
              Apa Kata{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Pelajar Kami
              </span>
              ?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Dengarkan pengalaman nyata dari ribuan pelajar yang telah merasakan kemudahan belajar bahasa Jepang
              bersama NihonGo.
            </p>
          </AnimatedSection>

          <div className="relative max-w-4xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8 bg-gradient-to-br from-white to-blue-50/50 border-0 shadow-xl">
                <CardContent className="text-center">
                  <Quote className="h-12 w-12 text-blue-400 mx-auto mb-6" />
                  <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed italic">
                    "{testimonials[currentTestimonial].content}"
                  </p>
                  <div className="flex items-center justify-center space-x-1 mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="flex items-center justify-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonials[currentTestimonial].avatar || "/placeholder.svg"} />
                      <AvatarFallback>{testimonials[currentTestimonial].name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</div>
                      <div className="text-sm text-gray-600">{testimonials[currentTestimonial].role}</div>
                      <div className="text-xs text-blue-600 font-medium">
                        {testimonials[currentTestimonial].progress}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>

            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          <AnimatedSection className="text-center mt-12">
            <p className="text-lg text-gray-600 mb-6">Bergabunglah dengan 75,000+ pelajar yang puas!</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl px-8 py-4 rounded-full font-bold"
              >
                Gabung Sekarang
                <Users className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200 mb-4">
              <Shield className="mr-2 h-4 w-4" />
              FAQ
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight">
              Pertanyaan yang{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Sering Ditanyakan
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Temukan jawaban untuk pertanyaan-pertanyaan umum seputar platform pembelajaran kami.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white rounded-lg border-0 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <AccordionTrigger className="px-6 py-4 text-left font-semibold hover:no-underline hover:bg-blue-50 rounded-lg transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedSection>

          <AnimatedSection className="text-center mt-12">
            <p className="text-gray-600 mb-4">Masih ada pertanyaan lain?</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" className="border-2 border-blue-200 hover:bg-blue-50">
                Hubungi Tim Support
                <Mail className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <Sparkles className="h-12 w-12 mx-auto mb-6 text-yellow-300" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight">
              Siap Memulai Perjalanan Belajar Bahasa Jepang Anda?
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed">
              Bergabunglah dengan ribuan pelajar lainnya dan rasakan pengalaman belajar yang tak terlupakan. Mulai
              gratis hari ini dan lihat kemajuan Anda dalam hitungan minggu!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl px-8 py-4 rounded-full font-bold"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Mulai Belajar Gratis
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full font-bold"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Lihat Paket Premium
                </Button>
              </motion.div>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm opacity-80">
              {["Gratis untuk memulai", "Tanpa komitmen", "Akses instan", "Support 24/7"].map((item, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {item}
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer id="kontak" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">日</span>
                  </div>
                  <span className="text-xl font-bold">NihonGo</span>
                </motion.div>
                <p className="text-gray-400">
                  Platform pembelajaran bahasa Jepang terdepan yang menggabungkan teknologi modern dengan metode
                  pembelajaran yang menyenangkan dan efektif.
                </p>
                <div className="flex space-x-4">
                  {[
                    { icon: <Facebook className="h-5 w-5" />, href: "#" },
                    { icon: <Twitter className="h-5 w-5" />, href: "#" },
                    { icon: <Instagram className="h-5 w-5" />, href: "#" },
                    { icon: <Youtube className="h-5 w-5" />, href: "#" },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ scale: 1.2, y: -2 }}
                      className="text-gray-400 hover:text-white transition-colors p-2"
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Pembelajaran</h3>
                <ul className="space-y-2 text-gray-400">
                  {[
                    "Kursus Dasar (N5-N4)",
                    "Kursus Menengah (N3-N2)",
                    "Kursus Lanjutan (N1)",
                    "Persiapan JLPT",
                    "Kelas Live",
                  ].map((item, index) => (
                    <li key={index}>
                      <Link href="#" className="hover:text-white transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Dukungan</h3>
                <ul className="space-y-2 text-gray-400">
                  {["Pusat Bantuan", "Komunitas", "Blog & Tutorial", "Video Pembelajaran", "Status Sistem"].map(
                    (item, index) => (
                      <li key={index}>
                        <Link href="#" className="hover:text-white transition-colors">
                          {item}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Kontak</h3>
                <div className="space-y-3 text-gray-400">
                  {[
                    { icon: <Mail className="h-4 w-4" />, text: "support@nihongo.com" },
                    { icon: <Phone className="h-4 w-4" />, text: "+62 21 1234 5678" },
                    { icon: <MapPin className="h-4 w-4" />, text: "Jakarta, Indonesia" },
                    { icon: <Globe className="h-4 w-4" />, text: "www.nihongo.com" },
                  ].map((contact, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      {contact.icon}
                      <span>{contact.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">© {new Date().getFullYear()} NihonGo. Semua hak cipta dilindungi.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                {["Kebijakan Privasi", "Syarat & Ketentuan", "Cookie Policy"].map((item, index) => (
                  <Link key={index} href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </footer>
    </div>
  )
}
