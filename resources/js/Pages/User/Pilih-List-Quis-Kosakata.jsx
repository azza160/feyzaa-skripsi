"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckIcon, Search, Shuffle, BookOpen, Play, AlertCircle, GraduationCap, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"
import { Link, usePage, router } from "@inertiajs/react"
import DashboardLayout from "../../Layouts/DashboardLayout"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Dummy vocabulary data
const kosakataList = [
  { id: "1", romaji: "ame", kanji: "雨", furigana: "あめ", arti: "hujan", contoh: "Ame ga futte imasu (Sedang hujan)" },
  {
    id: "2",
    romaji: "inu",
    kanji: "犬",
    furigana: "いぬ",
    arti: "anjing",
    contoh: "Kawaii inu desu (Anjing yang lucu)",
  },
  {
    id: "3",
    romaji: "neko",
    kanji: "猫",
    furigana: "ねこ",
    arti: "kucing",
    contoh: "Neko ga suki desu (Saya suka kucing)",
  },
  {
    id: "4",
    romaji: "mizu",
    kanji: "水",
    furigana: "みず",
    arti: "air",
    contoh: "Mizu wo kudasai (Tolong berikan air)",
  },
  {
    id: "5",
    romaji: "hon",
    kanji: "本",
    furigana: "ほん",
    arti: "buku",
    contoh: "Omoshiroi hon desu (Buku yang menarik)",
  },
  {
    id: "6",
    romaji: "kuruma",
    kanji: "車",
    furigana: "くるま",
    arti: "mobil",
    contoh: "Akai kuruma desu (Mobil merah)",
  },
  {
    id: "7",
    romaji: "ie",
    kanji: "家",
    furigana: "いえ",
    arti: "rumah",
    contoh: "Ookii ie ni sunde imasu (Tinggal di rumah besar)",
  },
  {
    id: "8",
    romaji: "gakkou",
    kanji: "学校",
    furigana: "がっこう",
    arti: "sekolah",
    contoh: "Gakkou ni ikimasu (Pergi ke sekolah)",
  },
  {
    id: "9",
    romaji: "tabemono",
    kanji: "食べ物",
    furigana: "たべもの",
    arti: "makanan",
    contoh: "Oishii tabemono desu (Makanan yang enak)",
  },
  {
    id: "10",
    romaji: "tomodachi",
    kanji: "友達",
    furigana: "ともだち",
    arti: "teman",
    contoh: "Ii tomodachi desu (Teman yang baik)",
  },
  {
    id: "11",
    romaji: "sensei",
    kanji: "先生",
    furigana: "せんせい",
    arti: "guru",
    contoh: "Yasashii sensei desu (Guru yang baik hati)",
  },
  {
    id: "12",
    romaji: "gakusei",
    kanji: "学生",
    furigana: "がくせい",
    arti: "siswa",
    contoh: "Daigaku no gakusei desu (Mahasiswa universitas)",
  },
  {
    id: "13",
    romaji: "shigoto",
    kanji: "仕事",
    furigana: "しごと",
    arti: "pekerjaan",
    contoh: "Muzukashii shigoto desu (Pekerjaan yang sulit)",
  },
  {
    id: "14",
    romaji: "densha",
    kanji: "電車",
    furigana: "でんしゃ",
    arti: "kereta",
    contoh: "Densha de ikimasu (Pergi dengan kereta)",
  },
  {
    id: "15",
    romaji: "ryouri",
    kanji: "料理",
    furigana: "りょうり",
    arti: "masakan",
    contoh: "Nihon ryouri ga suki desu (Suka masakan Jepang)",
  },
  {
    id: "16",
    romaji: "eiga",
    kanji: "映画",
    furigana: "えいが",
    arti: "film",
    contoh: "Omoshiroi eiga wo mimashita (Menonton film menarik)",
  },
  {
    id: "17",
    romaji: "ongaku",
    kanji: "音楽",
    furigana: "おんがく",
    arti: "musik",
    contoh: "Ongaku wo kikimasu (Mendengarkan musik)",
  },
  {
    id: "18",
    romaji: "tenki",
    kanji: "天気",
    furigana: "てんき",
    arti: "cuaca",
    contoh: "Kyou wa ii tenki desu (Hari ini cuacanya bagus)",
  },
  {
    id: "19",
    romaji: "jikan",
    kanji: "時間",
    furigana: "じかん",
    arti: "waktu",
    contoh: "Jikan ga arimasen (Tidak ada waktu)",
  },
  {
    id: "20",
    romaji: "okane",
    kanji: "お金",
    furigana: "おかね",
    arti: "uang",
    contoh: "Okane ga hitsuyou desu (Butuh uang)",
  },
]

// Vocabulary Card Component
const VocabularyCard = ({ vocabulary, isSelected, onClick }) => {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-xl transition-all duration-300 cursor-pointer border-2 group",
        "bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900",
        "hover:shadow-lg hover:scale-[1.02]",
        isSelected
          ? "ring-2 ring-primary ring-offset-2 border-primary shadow-lg scale-[1.02]"
          : "border-gray-200 dark:border-gray-700 hover:border-primary/50",
      )}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      layout
    >
      <CardContent className="p-4 h-full flex flex-col justify-between min-h-[120px]">
        {/* Header with romaji and selection indicator */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{vocabulary.romaji}</h3>
            {vocabulary.kanji && (
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {vocabulary.kanji} ({vocabulary.furigana})
              </p>
            )}
          </div>

          <AnimatePresence>
            {isSelected && (
              <motion.div
                className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <CheckIcon className="w-4 h-4 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Meaning */}
        <div className="mt-auto">
          <Badge variant="secondary" className="text-xs font-medium">
            {vocabulary.arti}
          </Badge>
        </div>

        {/* Hover overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-primary/5 opacity-0 transition-opacity duration-300",
            "group-hover:opacity-100",
          )}
        />
      </CardContent>
    </motion.div>
  )
}

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1"
      >
        <ChevronsLeft className="w-4 h-4" />
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => (
          <div key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 text-sm text-muted-foreground">...</span>
            ) : (
              <Button
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(page)}
                className="w-10 h-10 p-0"
              >
                {page}
              </Button>
            )}
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1"
      >
        <ChevronsRight className="w-4 h-4" />
      </Button>
    </div>
  )
}

export default function VocabularySelector() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const { kosakatas, level, mode, isRandomMode } = usePage().props
  const safeKosakatas = kosakatas ?? [];

  // Manual mode state
  const [selectedVocabulary, setSelectedVocabulary] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const requiredCount = 10
  const itemsPerPage = 5

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Filter vocabulary based on search query
  const filteredVocabulary = useMemo(() => {
    if (!searchQuery.trim()) return safeKosakatas

    const query = searchQuery.toLowerCase()
    return safeKosakatas.filter(
      (vocab) =>
        vocab.romaji.toLowerCase().includes(query) ||
        vocab.arti.toLowerCase().includes(query) ||
        (vocab.kanji && vocab.kanji.includes(query)),
    )
  }, [searchQuery, safeKosakatas])

  // Pagination logic
  const totalPages = Math.ceil(filteredVocabulary.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentVocabulary = filteredVocabulary.slice(startIndex, endIndex)

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  // Toggle vocabulary selection
  const toggleVocabularySelection = (vocabId) => {
    setSelectedVocabulary((prev) => {
      if (prev.includes(vocabId)) {
        return prev.filter((id) => id !== vocabId)
      } else if (prev.length < requiredCount) {
        return [...prev, vocabId]
      }
      return prev
    })
  }

  // Auto select random vocabulary
  const autoSelectVocabulary = () => {
    const availableIds = filteredVocabulary.map((vocab) => vocab.id)
    const shuffled = [...availableIds].sort(() => Math.random() - 0.5)
    setSelectedVocabulary(shuffled.slice(0, requiredCount))
  }

  // Calculate progress
  const selectionProgress = (selectedVocabulary.length / requiredCount) * 100
  const canStartQuiz = selectedVocabulary.length === requiredCount

  // Level & mode badge/icon
  const levelInfo = {
    beginner: {
      label: "Beginner",
      color: "bg-emerald-500 text-white",
      icon: GraduationCap,
      tips: "Soal di-generate otomatis dari kosakata dasar. Cocok untuk pemula!",
    },
    intermediate: {
      label: "Intermediate",
      color: "bg-yellow-500 text-white",
      icon: BookOpen,
      tips: "Soal diambil dari bank soal berbasis konteks kalimat. Fokus pada pemahaman!",
    },
    advanced: {
      label: "Advanced",
      color: "bg-violet-600 text-white",
      icon: Trophy,
      tips: "Soal analisis kalimat dan penggunaan alami. Tantangan untuk mahir!",
    },
  }
  const modeInfo = {
    manual: {
      label: "Manual",
      color: "bg-blue-500 text-white",
      icon: BookOpen,
      alert: "Pilih 10 kosakata yang sudah kamu pelajari untuk dijadikan soal kuis.",
      tips: "Pilih kosakata yang ingin kamu latih secara spesifik untuk hasil maksimal.",
    },
    random: {
      label: "Random",
      color: "bg-pink-500 text-white",
      icon: Shuffle,
      alert: "Sistem akan memilihkan 10 kosakata secara acak dari seluruh database!",
      tips: "Gunakan mode ini untuk menguji penguasaan kosakata secara luas.",
    },
  }
  const LevelIcon = levelInfo[level]?.icon || GraduationCap
  const ModeIcon = modeInfo[mode]?.icon || Shuffle

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header (breadcrumb + motion) */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center space-x-2 text-sm bg-gradient-to-r from-background to-muted/50 dark:from-slate-950 dark:to-slate-900/50 p-3 rounded-lg shadow-sm border border-border/50 dark:border-slate-800/50 mb-[50px] w-fit"
        >
          <div className="flex flex-wrap items-center space-x-2">
            <Link href={route("dashboard")}> <span className="text-muted-foreground dark:text-slate-400 hover:text-violet-800 dark:hover:text-violet-300 transition-all duration-300">Dashboard</span> </Link>
            <span className="text-primary dark:text-violet-400">/</span>
            <Link href={route("pilih-level-quis-kosakata")}> <span className="text-violet-400 dark:text-violet-600">Kuis Kosakata</span> </Link>
            <span className="text-primary dark:text-violet-400">/</span>
            <span className="text-violet-400 dark:text-violet-600">Pilih Kosakata</span>
          </div>
          <motion.div
            className="h-1 w-1 rounded-full bg-primary/50 dark:bg-violet-500/50"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>

        {/* Hero Section - Selalu tampil di kedua mode */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center relative"
        >
          <div className={isRandomMode
            ? "py-8 px-4 relative z-0 bg-gradient-to-r from-violet-500/20 via-purple-500/10 to-pink-500/10 dark:from-violet-800/30 dark:via-purple-800/20 dark:to-pink-800/20 rounded-lg"
            : "py-8 px-4 relative z-0 bg-gradient-to-r from-blue-500/20 via-purple-500/10 to-pink-500/10 dark:from-blue-800/30 dark:via-purple-800/20 dark:to-pink-800/20 rounded-lg"}
          >
            <div className="inline-block mb-4 bg-violet-500/20 p-2 rounded-full">
              {isRandomMode
                ? <Shuffle className="h-8 w-8 text-slate-900 dark:text-slate-200" />
                : <BookOpen className="h-8 w-8 text-slate-900 dark:text-slate-200" />}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-slate-900 dark:text-slate-200 capitalize">
              {isRandomMode ? "Random Challenge Mode" : "Pilih Kosakata untuk Kuis"}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              {isRandomMode
                ? <>Sistem akan memilih soal secara acak untuk tantangan yang menantang!<br /><span className="text-sm inline-block mt-2 bg-purple-500/10 px-3 py-1 rounded-full text-purple-600 dark:text-purple-400">🎯 Tantangan Acak</span></>
                : <>Pilih tepat 10 kosakata yang ingin kamu ujikan<br /><span className="text-sm inline-block mt-2 bg-primary/5 px-3 py-1 rounded-full">Pilih kosakata yang ingin kamu latih!</span></>}
            </p>
          </div>
        </motion.div>

        {/* Konten utama: random atau manual */}
        {isRandomMode ? (
          // === RANDOM MODE CONTENT START ===
          <div className="max-w-6xl mx-auto px-4">
            {/* Info Box */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center">
                    <Shuffle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-purple-800 dark:text-purple-300">Random Challenge Mode</h3>
                    <p className="text-purple-600 dark:text-purple-400 text-sm">Tantangan dengan kosakata acak!</p>
                  </div>
                </div>
                <div className="bg-white/50 dark:bg-purple-900/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shuffle className="w-5 h-5 text-purple-500" />
                    <span className="font-semibold">Sistem Otomatis</span>
                  </div>
                  <p className="text-sm text-purple-700 dark:text-purple-300">Soal dipilih secara acak oleh sistem. Tidak perlu memilih kosakata manual.</p>
                </div>
                <div className="mt-4 p-3 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                  <p className="text-sm text-purple-800 dark:text-purple-300 text-center">
                    <strong>Mode Tantangan Acak</strong>
                    <br />
                    Sistem akan memilih soal secara acak dari semua kosakata yang tersedia!
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Summary Card & Action */}
            <motion.div
              className="bg-card border rounded-xl p-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="w-full md:w-2/3">
                  <div className="space-y-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium flex items-center gap-1">
                        <Shuffle className="w-4 h-4 text-purple-500" />
                        Random Challenge Mode
                      </span>
                      <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                        Siap untuk tantangan!
                      </span>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-purple-800 dark:text-purple-300">
                            Sistem akan memilih soal secara acak
                          </p>
                          <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                            Tidak perlu memilih kosakata manual
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                            <Shuffle className="w-4 h-4" />
                            <span className="text-sm font-bold">Sistem Otomatis</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <Button
                    size="lg"
                    className="px-8 py-6 text-lg bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                    onClick={() => {
                      router.post(route('start-quis-kosakata'), { mode: 'random', level }, { preserveScroll: true })
                    }}
                  >
                    Mulai Kuis
                    <Shuffle size={18} className="ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
          // === RANDOM MODE CONTENT END ===
        ) : (
          // === MANUAL MODE CONTENT START ===
          <>
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative max-w-md mx-auto"
            >
              
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Cari kosakata (romaji)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg rounded-xl border-2 focus:border-primary"
              />
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchQuery("")}
                >
                  ×
                </motion.button>
              )}
            </motion.div>

            {/* Results Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center text-sm text-gray-600 dark:text-gray-400"
            >
              {searchQuery ? (
                <p>
                  Menampilkan {filteredVocabulary.length} kosakata untuk "{searchQuery}"
                </p>
              ) : (
                <p>Menampilkan {filteredVocabulary.length} kosakata tersedia</p>
              )}
            </motion.div>

            {/* Vocabulary Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            >
              <AnimatePresence mode="popLayout">
                {currentVocabulary.map((vocabulary, index) => (
                  <motion.div
                    key={vocabulary.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      duration: 0.3,
                      delay: Math.min(index * 0.05, 0.5),
                    }}
                    layout
                  >
                    <VocabularyCard
                      vocabulary={vocabulary}
                      isSelected={selectedVocabulary.includes(vocabulary.id)}
                      onClick={() => toggleVocabularySelection(vocabulary.id)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* No Results */}
            {filteredVocabulary.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Tidak ada kosakata ditemukan</h3>
                <p className="text-gray-600 dark:text-gray-400">Coba gunakan kata kunci yang berbeda</p>
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}

            {/* Progress & Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6 space-y-6"
            >
              {/* Progress Section & Preview hanya untuk manual */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Kosakata dipilih: {selectedVocabulary.length}/{requiredCount}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {canStartQuiz ? "Siap untuk kuis!" : `Pilih ${requiredCount - selectedVocabulary.length} lagi`}
                  </span>
                </div>
                <Progress value={selectionProgress} className="h-3 rounded-full" />
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Kosakata Terpilih:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedVocabulary.map((id) => {
                    const vocab = safeKosakatas.find((v) => v.id === id)
                    return (
                      <motion.div
                        key={id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-primary/20 transition-colors"
                        onClick={() => toggleVocabularySelection(id)}
                      >
                        {vocab?.romaji}
                      </motion.div>
                    )
                  })}
                  {/* Empty slots */}
                  {Array.from({ length: requiredCount - selectedVocabulary.length }).map((_, i) => (
                    <div
                      key={`empty-${i}`}
                      className="w-16 h-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-full"
                    />
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <Button
                  variant="outline"
                  onClick={autoSelectVocabulary}
                  className="flex items-center gap-2 w-full sm:w-auto bg-transparent"
                >
                  <Shuffle className="w-4 h-4" />
                  Pilih Otomatis
                </Button>

                <div className="flex flex-col items-center gap-2">
                  <Button 
                    size="lg" 
                    disabled={!canStartQuiz} 
                    className="px-8 py-3 text-lg font-semibold w-full sm:w-auto"
                    onClick={() => {
                      if (canStartQuiz) {
                        router.visit(route('quis-kosakata', { sessionId: 'dummy-session-' + Date.now() }))
                      }
                    }}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Mulai Kuis
                  </Button>

                  {!canStartQuiz && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      Pilih tepat {requiredCount} kosakata untuk memulai
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Motivational Footer */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="bg-gradient-to-r from-primary/10 via-chart-2/10 to-chart-1/10 rounded-xl p-6 border">
                <p className="text-lg font-medium text-foreground">
                  ✨ Semakin sering berlatih, semakin banyak kosakata yang kamu kuasai! ✨
                </p>
              </div>
            </motion.div>
          </>
          // === MANUAL MODE CONTENT END ===
        )}
      </div>
    </DashboardLayout>
  )
}
