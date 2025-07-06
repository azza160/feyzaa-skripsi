"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import DashboardLayout from "../../Layouts/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckIcon, ChevronRight, AlertCircle, BookOpen, Zap, Volume2, Info, Shuffle, GraduationCap, Star, Clock, Target, Award, Brain, TrendingUp, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Link, usePage,router } from "@inertiajs/react"
import { Loading } from "../../components/Loading"

// Dummy data - hanya huruf yang sudah dipelajari
const hiraganaLetters = [
  { id: "a", character: "あ", romaji: "a", example: "あめ (ame) - hujan", group: "a" },
  { id: "i", character: "い", romaji: "i", example: "いぬ (inu) - anjing", group: "a" },
  { id: "u", character: "う", romaji: "u", example: "うみ (umi) - laut", group: "a" },
  { id: "e", character: "え", romaji: "e", example: "えき (eki) - stasiun", group: "a" },
  { id: "o", character: "お", romaji: "o", example: "おと (oto) - suara", group: "a" },
  { id: "ka", character: "か", romaji: "ka", example: "かさ (kasa) - payung", group: "ka" },
  { id: "ki", character: "き", romaji: "ki", example: "きた (kita) - utara", group: "ka" },
  { id: "ku", character: "く", romaji: "ku", example: "くに (kuni) - negara", group: "ka" },
  { id: "ko", character: "こ", romaji: "ko", example: "こえ (koe) - suara", group: "ka" },
  { id: "sa", character: "さ", romaji: "sa", example: "さけ (sake) - sake", group: "sa" },
  { id: "shi", character: "し", romaji: "shi", example: "しま (shima) - pulau", group: "sa" },
  { id: "na", character: "な", romaji: "na", example: "なつ (natsu) - musim panas", group: "na" },
  { id: "ni", character: "に", romaji: "ni", example: "にく (niku) - daging", group: "na" },
  { id: "no", character: "の", romaji: "no", example: "のみもの (nomimono) - minuman", group: "na" },
  { id: "ha", character: "は", romaji: "ha", example: "はな (hana) - bunga", group: "ha" },
  { id: "hi", character: "ひ", romaji: "hi", example: "ひと (hito) - orang", group: "ha" },
  { id: "ma", character: "ま", romaji: "ma", example: "まち (machi) - kota", group: "ma" },
  { id: "mi", character: "み", romaji: "mi", example: "みず (mizu) - air", group: "ma" },
  { id: "ya", character: "や", romaji: "ya", example: "やま (yama) - gunung", group: "ya" },
  { id: "yu", character: "ゆ", romaji: "yu", example: "ゆき (yuki) - salju", group: "ya" },
]

const letterGroups = [
  { id: "all", name: "Semua Huruf", count: hiraganaLetters.length },
  { id: "a", name: "Group A", count: hiraganaLetters.filter((l) => l.group === "a").length },
  { id: "ka", name: "Group KA", count: hiraganaLetters.filter((l) => l.group === "ka").length },
  { id: "sa", name: "Group SA", count: hiraganaLetters.filter((l) => l.group === "sa").length },
  { id: "na", name: "Group NA", count: hiraganaLetters.filter((l) => l.group === "na").length },
  { id: "ha", name: "Group HA", count: hiraganaLetters.filter((l) => l.group === "ha").length },
  { id: "ma", name: "Group MA", count: hiraganaLetters.filter((l) => l.group === "ma").length },
  { id: "ya", name: "Group YA", count: hiraganaLetters.filter((l) => l.group === "ya").length },
]

// Letter Card Component
const LetterCard = ({ letter, isSelected, onClick }) => {
  const [showDialog, setShowDialog] = useState(false);

  const playAudio = (e) => {
    e.stopPropagation()
    if (!letter.audio) {
      setShowDialog(true);
      return;
    }
    const audio = new Audio(letter.audio);
    audio.play().catch((e) => console.error("Gagal memutar audio:", e));
  }

  return (
    <>
      <AlertDialog open={showDialog} onOpenChange={setShowDialog} className="z-[500] transition-all duration-300">
        <AlertDialogContent className="z-[500] transition-all duration-300">
          <AlertDialogHeader>
            <AlertDialogTitle>Audio belum tersedia</AlertDialogTitle>
          </AlertDialogHeader>
          <p className="text-sm text-muted-foreground">
            Maaf, audio untuk huruf ini belum tersedia. Silakan coba huruf lainnya.
          </p>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowDialog(false)}>
              Tutup
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <motion.div
        className={cn(
          "relative overflow-hidden rounded-xl transition-all duration-200 cursor-pointer border-2",
          "bg-gradient-to-br from-primary/90 to-chart-1/90 hover:from-primary hover:to-chart-1",
          isSelected ? "ring-2 ring-primary ring-offset-2 scale-105" : "hover:scale-105",
        )}
        onClick={onClick}
        whileTap={{ scale: 0.95 }}
      >
        <div className="p-4 h-full flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white mb-1">{letter.character}</span>
          <span className="text-xs text-white/80">{letter.romaji}</span>

          <button
            className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            onClick={playAudio}
          >
            <Volume2 className="w-3 h-3 text-white" />
          </button>

          <AnimatePresence>
            {isSelected && (
              <motion.div
                className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-white flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <CheckIcon className="w-4 h-4 text-primary" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  )
}

// Filter Button Component
const FilterButton = ({ active, children, count, onClick }) => {
  return (
    <motion.button
      className={cn(
        "flex flex-col items-center gap-1 px-4 py-3 rounded-xl text-sm font-medium transition-all border",
        active ? "bg-primary text-white border-primary shadow-lg" : "bg-card hover:bg-secondary border-border",
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <span>{children}</span>
      <span className={cn("text-xs", active ? "text-white/80" : "text-muted-foreground")}>{count} huruf</span>
    </motion.button>
  )
}

// Content Loading Component
const ContentLoading = () => {
    return (
        <div className="flex items-center justify-center min-h-[300px]">
            <div className="relative w-16 h-16">
                <motion.div
                    className="absolute inset-0 border-4 border-[hsl(252,94%,56%)] rounded-full"
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
                <motion.div
                    className="absolute inset-2 border-4 border-[hsl(252,94%,70%)] rounded-full"
                    animate={{
                        rotate: -360,
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            </div>
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="ml-4 text-gray-600 font-medium"
            >
                Memuat konten...
            </motion.p>
        </div>
    );
};

// Quiz System Explanation Modal Component
const QuizSystemModal = ({ isOpen, onClose, onStartQuiz, level, jenis, isRandomMode = false }) => {
  const [currentStep, setCurrentStep] = useState(0)
  
  const expSystem = {
    beginner: {
      firstAttempt: 9,
      secondAttempt: 6,
      thirdAttempt: 3,
      maxAttempt: 3
    },
    intermediate: {
      firstAttempt: 15,
      secondAttempt: 10,
      thirdAttempt: 5,
      maxAttempt: 3
    },
    advanced: {
      firstAttempt: 21,
      secondAttempt: 14,
      thirdAttempt: 7,
      maxAttempt: 3
    }
  }

  // Use standard EXP system for all modes
  const currentExpSystem = expSystem

  const timeLimit = {
    beginner: "4 menit",
    intermediate: "3 menit", 
    advanced: "2 menit"
  }

  const steps = [
    {
      title: "Selamat Datang di Sistem Quiz! 🎯",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-3 sm:p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2 text-sm sm:text-base">
              <Info className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>Quiz {jenis} - Level {level} {isRandomMode && '(Random Mode)'}</span>
            </h3>
            <p className="text-blue-700 dark:text-blue-400 text-xs sm:text-sm leading-relaxed">
              Kamu akan mengerjakan 10 soal pilihan ganda dengan waktu {timeLimit[level]}. 
              Setiap jawaban benar akan memberikan EXP berdasarkan sistem yang adil.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-card p-3 sm:p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span className="font-medium text-sm sm:text-base">Waktu</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">{timeLimit[level]}</p>
            </div>
            
            <div className="bg-card p-3 sm:p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="font-medium text-sm sm:text-base">Target</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">10 soal</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Sistem EXP yang Adil ⚖️",
      content: (
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-3 sm:p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2 flex items-center gap-2 text-sm sm:text-base">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>Bagaimana EXP Dihitung?</span>
            </h3>
            <p className="text-green-700 dark:text-green-400 text-xs sm:text-sm leading-relaxed">
              EXP yang kamu dapatkan bergantung pada berapa kali kamu sudah mengerjakan soal yang sama sebelumnya.
              Semakin sering kamu mengerjakan soal yang sama, semakin sedikit EXP yang didapat.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-semibold text-foreground text-sm sm:text-base">Level {level} - EXP per Soal:</h4>
            <div className="grid grid-cols-1 gap-2 sm:gap-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-lg border border-green-300 dark:border-green-700">
                <div className="flex items-center gap-3 mb-2 sm:mb-0">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">1</div>
                  <span className="font-medium text-xs sm:text-sm">Pertama kali mengerjakan</span>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                  <span className="font-bold text-green-700 dark:text-green-300 text-xs sm:text-sm">+{currentExpSystem[level].firstAttempt} EXP</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 rounded-lg border border-yellow-300 dark:border-yellow-700">
                <div className="flex items-center gap-3 mb-2 sm:mb-0">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">2</div>
                  <span className="font-medium text-xs sm:text-sm">Kedua kali mengerjakan</span>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                  <span className="font-bold text-yellow-700 dark:text-yellow-300 text-xs sm:text-sm">+{currentExpSystem[level].secondAttempt} EXP</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-lg border border-orange-300 dark:border-orange-700">
                <div className="flex items-center gap-3 mb-2 sm:mb-0">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">3</div>
                  <span className="font-medium text-xs sm:text-sm">Ketiga kali mengerjakan</span>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                  <span className="font-bold text-orange-700 dark:text-orange-300 text-xs sm:text-sm">+{currentExpSystem[level].thirdAttempt} EXP</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-lg border border-red-300 dark:border-red-700">
                <div className="flex items-center gap-3 mb-2 sm:mb-0">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">4+</div>
                  <span className="font-medium text-xs sm:text-sm">Lebih dari 3 kali</span>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <XCircle className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                  <span className="font-bold text-red-700 dark:text-red-300 text-xs sm:text-sm">0 EXP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Tips Mengoptimalkan EXP 🚀",
      content: (
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-3 sm:p-4 rounded-lg border border-purple-200 dark:border-purple-800">
            <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2 flex items-center gap-2 text-sm sm:text-base">
              <Brain className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>Strategi Belajar Efektif</span>
            </h3>
            <p className="text-purple-700 dark:text-purple-400 text-xs sm:text-sm leading-relaxed">
              Gunakan strategi ini untuk mendapatkan EXP maksimal dan belajar lebih efektif!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-card p-3 sm:p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                <h4 className="font-semibold text-sm sm:text-base">Belajar Bertahap</h4>
              </div>
              <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                <li>• Mulai dari level beginner</li>
                <li>• Kuasai dasar sebelum naik level</li>
                <li>• Jangan terburu-buru</li>
              </ul>
            </div>
            
            <div className="bg-card p-3 sm:p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                <h4 className="font-semibold text-sm sm:text-base">Fokus pada Soal Baru</h4>
              </div>
              <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                <li>• Prioritaskan soal yang belum pernah dikerjakan</li>
                <li>• Variasikan pilihan huruf</li>
                <li>• Hindari mengulang soal yang sama</li>
              </ul>
            </div>
            
            <div className="bg-card p-3 sm:p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 flex-shrink-0" />
                <h4 className="font-semibold text-sm sm:text-base">Kelola Waktu</h4>
              </div>
              <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                <li>• Jangan terlalu lama di satu soal</li>
                <li>• Gunakan waktu dengan efisien</li>
                <li>• Tinggalkan soal sulit untuk terakhir</li>
              </ul>
            </div>
            
            <div className="bg-card p-3 sm:p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 flex-shrink-0" />
                <h4 className="font-semibold text-sm sm:text-base">Konsistensi</h4>
              </div>
              <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                <li>• Latihan rutin setiap hari</li>
                <li>• Review hasil quiz secara berkala</li>
                <li>• Catat progress belajar</li>
              </ul>
            </div>
          </div>
        </div>
      )
    }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onStartQuiz()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    onStartQuiz()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center leading-tight">
            {steps[currentStep].title}
          </DialogTitle>
          <DialogDescription className="text-center text-sm sm:text-base">
            Langkah {currentStep + 1} dari {steps.length}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 sm:py-6">
          {steps[currentStep].content}
        </div>

        {/* Progress Bar */}
        <div className="mb-4 sm:mb-6">
          <div className="flex justify-between text-xs sm:text-sm text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{currentStep + 1}/{steps.length}</span>
          </div>
          <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
        </div>

        {/* Mobile: Stack buttons vertically */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-2">
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            {currentStep > 0 && (
              <Button variant="outline" onClick={handleBack} className="w-full sm:w-auto">
                <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
                <span className="hidden sm:inline">Sebelumnya</span>
                <span className="sm:hidden">Kembali</span>
              </Button>
            )}
            <Button variant="ghost" onClick={handleSkip} className="w-full sm:w-auto">
              <span className="hidden sm:inline">Lewati</span>
              <span className="sm:hidden">Skip</span>
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
              Batal
            </Button>
            <Button onClick={handleNext} className="w-full sm:w-auto">
              {currentStep === steps.length - 1 ? (
                <>
                  <span className="hidden sm:inline">Mulai Quiz</span>
                  <span className="sm:hidden">Mulai</span>
                  <Zap className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">Selanjutnya</span>
                  <span className="sm:hidden">Lanjut</span>
                  <ChevronRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function QuizLetterSelect() {
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [selectedLetters, setSelectedLetters] = useState([])
  const [activeFilter, setActiveFilter] = useState("all")
  const [showTip, setShowTip] = useState(true)
  const [showQuizSystemModal, setShowQuizSystemModal] = useState(false)
  const { letters, letterGroups, jenis, level, mode, isRandomMode } = usePage().props
  const requiredLetters = 10

  // Simulate initial page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Check if user has seen the quiz system explanation before
  const hasSeenQuizExplanation = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('quizSystemExplained') === 'true'
    }
    return false
  }

  const markQuizExplanationAsSeen = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('quizSystemExplained', 'true')
    }
  }

  // Filter letters based on active filter
  const filteredLetters = letters.filter((letter) => {
    if (activeFilter === "all") return true
    return letter.group === activeFilter
  })

  const toggleLetterSelection = (letterId) => {
    setSelectedLetters((prev) => {
      if (prev.includes(letterId)) {
        return prev.filter((id) => id !== letterId)
      } else if (prev.length < requiredLetters) {
        return [...prev, letterId]
      }
      return prev
    })
  }

  const selectionProgress = (selectedLetters.length / requiredLetters) * 100

  const autoSelectLetters = () => {
    const availableLetters = filteredLetters.map((letter) => letter.id)
    const randomLetters = [...availableLetters].sort(() => Math.random() - 0.5)
    setSelectedLetters(randomLetters.slice(0, requiredLetters))
  }

  const handleStartQuis = () => {
    if (!isRandomMode && selectedLetters.length !== requiredLetters) {
      alert("Pilih tepat " + requiredLetters + " huruf untuk memulai")
      return
    }
    
    // Check if user has seen the explanation before
    if (hasSeenQuizExplanation()) {
      // Start quiz directly
      startQuiz()
    } else {
      // Show quiz system explanation modal first
      setShowQuizSystemModal(true)
    }
  }

  const startQuiz = () => {
    let lettersToSend = selectedLetters;
    
    // For random mode, we don't need to send letters array
    if (isRandomMode) {
      lettersToSend = []; // Empty array for random mode
    }
    
    const request = {
      letters: lettersToSend,
      jenis: jenis,
      level: level,
      mode: mode || 'manual',
    }
    
    router.post(route("start-quis"), request, {
      preserveScroll: true,
      onSuccess: () => {
        // Redirect will be handled by the backend
      },
      onError: (errors) => {
        alert("Gagal memulai kuis: " + (errors.message || "Terjadi kesalahan"))
      }
    })
  }

  const handleStartQuizAfterExplanation = () => {
    setShowQuizSystemModal(false)
    markQuizExplanationAsSeen() // Mark as seen
    startQuiz()
  }

  const handleShowExplanationAgain = () => {
    setShowQuizSystemModal(true)
  }

  return (
    <DashboardLayout>
      <AnimatePresence>
        <div className="text-foreground">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center space-x-2 text-sm bg-gradient-to-r from-background to-muted/50 dark:from-slate-950 dark:to-slate-900/50 p-3 rounded-lg shadow-sm border border-border/50 dark:border-slate-800/50 mb-[50px] w-fit"
            >
              <div className="flex flex-wrap items-center space-x-2">
                <Link href={route("dashboard")}>
                  <span className="text-muted-foreground dark:text-slate-400 hover:text-violet-800 dark:hover:text-violet-300 transition-all duration-300">
                    Dashboard
                  </span>
                </Link>
                <span className="text-primary dark:text-violet-400">
                  /
                </span>
                <Link href={route("huruf")}>
                  <span className="text-violet-400 dark:text-violet-600">
                    Huruf Jepang
                  </span>
                </Link>
                <span className="text-primary dark:text-violet-400">
                  /
                </span>
                <Link href={route("pilih-huruf-quis")}>
                  <span className="text-violet-400 dark:text-violet-600">
                    Quiz Huruf
                  </span>
                </Link>
                <span className="text-primary dark:text-violet-400">
                  /
                </span>
                <Link  href={route("pilih-level-quis",jenis)}>
                  <span className="text-violet-400 dark:text-violet-600">
                    Pilih Level
                  </span>
                </Link>
                <span className="text-primary dark:text-violet-400">
                  /
                </span>
                <Link href={route("pilih-list-huruf-quis", { jenis: jenis, level: level })}>
                  <span className="text-violet-400 dark:text-violet-600">
                    Pilih Huruf
                  </span>
                </Link>
              </div>
              <motion.div
                className="h-1 w-1 rounded-full bg-primary/50 dark:bg-violet-500/50"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
            </motion.div>

            <AnimatePresence mode="wait">
              {isPageLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ContentLoading />
                </motion.div>
              ) : (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 text-center relative"
                  >
                    <div className="py-8 px-4 relative z-0 bg-gradient-to-r from-violet-500/20 via-purple-500/10 to-pink-500/10 dark:from-violet-800/30 dark:via-purple-800/20 dark:to-pink-800/20 rounded-lg">
                      <div className="inline-block mb-4 bg-violet-500/20 p-2 rounded-full">
                        <GraduationCap className="h-8 w-8 text-slate-900 dark:text-slate-200" />
                      </div>
                      <h1 className="text-4xl md:text-5xl font-bold mb-3 text-slate-900 dark:text-slate-200 capitalize">
                        {isRandomMode ? 'Random Challenge Mode' : 'Pilih Huruf untuk Kuis'}
                      </h1>
                      <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                        {isRandomMode ? (
                          <>
                            Sistem akan memilih soal secara acak untuk tantangan yang menantang!
                            <br />
                            <span className="text-sm inline-block mt-2 bg-purple-500/10 px-3 py-1 rounded-full text-purple-600 dark:text-purple-400">
                              🎯 Tantangan Acak
                            </span>
                          </>
                        ) : (
                          <>
                        Pilih tepat {requiredLetters} huruf yang ingin kamu ujikan
                        <br />
                        <span className="text-sm inline-block mt-2 bg-primary/5 px-3 py-1 rounded-full">
                          Pilih huruf yang ingin kamu latih!
                        </span>
                          </>
                        )}
                      </p>
                    </div>
                  </motion.div>

                  {/* Tip Alert */}
                  <AnimatePresence>
                    {showTip && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-8"
                      >
                        <Alert className="bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                          <div className="flex items-start gap-3">
                            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                            <AlertDescription className="text-blue-700 dark:text-blue-300">
                              <p className="font-medium mb-1">Tips Memilih Huruf</p>
                              <ul className="text-sm list-disc pl-5 space-y-1">
                                <li>Pilih huruf dari berbagai group untuk variasi yang lebih baik</li>
                                <li>Klik ikon suara untuk mendengar pengucapan</li>
                                <li>Gunakan "Pilih Otomatis" untuk seleksi acak</li>
                              </ul>
                            </AlertDescription>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2 h-6 w-6 p-0"
                            onClick={() => setShowTip(false)}
                          >
                            ×
                          </Button>
                        </Alert>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Filters and Letter Selection - Only show for manual mode */}
                  {!isRandomMode && (
                    <>
                  {/* Filters */}
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Filter Berdasarkan Group</h3>
                      <Button variant="outline" size="sm" onClick={autoSelectLetters} className="gap-2">
                        <Shuffle className="w-4 h-4" />
                        Pilih Otomatis
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                      {letterGroups.map((group) => (
                        <FilterButton
                          key={group.id}
                          active={activeFilter === group.id}
                          count={group.count}
                          onClick={() => setActiveFilter(group.id)}
                        >
                          {group.name}
                        </FilterButton>
                      ))}
                    </div>
                  </motion.div>

                  {/* Letter Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mb-8">
                    {filteredLetters.map((letter, index) => (
                      <motion.div
                        key={letter.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.02 }}
                      >
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div>
                                <LetterCard
                                  letter={letter}
                                  isSelected={selectedLetters.includes(letter.id)}
                                  onClick={() => toggleLetterSelection(letter.id)}
                                />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="bg-card border shadow-lg px-4 py-3">
                              <div className="text-center">
                                {letter.example ? (
                                  <p className="font-medium">{letter.example}</p>
                                ) : (
                                  <p className="font-medium text-muted-foreground">
                                    Belum ada contoh penggunaan untuk huruf ini
                                  </p>
                                )}
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </motion.div>
                    ))}
                      </div>
                    </>
                  )}

                  {/* Random Mode Info */}
                  {isRandomMode && (
                    <motion.div
                      className="mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center">
                            <Zap className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-purple-800 dark:text-purple-300">Random Challenge Mode</h3>
                            <p className="text-purple-600 dark:text-purple-400 text-sm">Tantangan dengan huruf acak!</p>
                          </div>
                        </div>
                        
                        <div className="bg-white/50 dark:bg-purple-900/30 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Shuffle className="w-5 h-5 text-purple-500" />
                            <span className="font-semibold">Sistem Otomatis</span>
                          </div>
                          <p className="text-sm text-purple-700 dark:text-purple-300">Soal dipilih secara acak oleh sistem</p>
                  </div>
                        
                        <div className="mt-4 p-3 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                          <p className="text-sm text-purple-800 dark:text-purple-300 text-center">
                            <strong>Mode Tantangan Acak</strong>
                            <br />
                            Sistem akan memilih soal secara acak dari semua soal yang tersedia!
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Selection Summary */}
                  <motion.div
                    className="bg-card border rounded-xl p-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="w-full md:w-2/3">
                        {isRandomMode ? (
                          <div className="space-y-4">
                            <div className="flex justify-between mb-2">
                              <span className="text-sm font-medium flex items-center gap-1">
                                <Zap className="w-4 h-4 text-purple-500" />
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
                                    Tidak perlu memilih huruf manual
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
                        ) : (
                          <>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            Huruf Dipilih: {selectedLetters.length}/{requiredLetters}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {selectedLetters.length === requiredLetters
                              ? "Siap untuk kuis!"
                              : `Pilih ${requiredLetters - selectedLetters.length} lagi`}
                          </span>
                        </div>

                        <Progress value={selectionProgress} className="h-3 rounded-full mb-4" />

                        {/* Selected letters preview */}
                        <div className="flex flex-wrap gap-2">
                          {selectedLetters.map((id) => {
                            const letter = letters.find((l) => l.id === id)
                            return (
                              <motion.div
                                key={id}
                                className="w-16 h-16 rounded-xl bg-primary/10 flex flex-col items-center justify-center text-primary cursor-pointer hover:bg-primary/20 p-1"
                                whileHover={{ scale: 1.1 }}
                                onClick={() => toggleLetterSelection(id)}
                              >
                                <span className="text-2xl font-bold leading-none">{letter?.character}</span>
                                <span className="text-xs text-primary/80">{letter?.romaji}</span>
                              </motion.div>
                            )
                          })}
                          {Array.from({ length: requiredLetters - selectedLetters.length }).map((_, i) => (
                            <div key={i} className="w-16 h-16 rounded-xl border-2 border-dashed border-muted-foreground/30" />
                          ))}
                        </div>
                          </>
                        )}
                      </div>

                      <div className="flex flex-col items-center gap-4">
                      
                        <Button
                          size="lg"
                          className={cn(
                            "px-8 py-6 text-lg",
                            isRandomMode 
                              ? "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                              : ""
                          )}
                          disabled={!isRandomMode && selectedLetters.length !== requiredLetters}
                          onClick={handleStartQuis}
                        >
                          {isRandomMode ? (
                            <>
                              Mulai Random Challenge
                              <Zap size={18} className="ml-2" />
                            </>
                          ) : (
                            <>
                          Mulai Kuis
                          <Zap size={18} className="ml-2" />
                            </>
                          )}
                        </Button>
                       
                        {/* Show explanation button for returning users */}
                        {hasSeenQuizExplanation() && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleShowExplanationAgain}
                            className="text-sm"
                          >
                            <Info className="w-4 h-4 mr-2" />
                            Lihat Penjelasan Sistem EXP
                          </Button>
                        )}
                       
                        {!isRandomMode && selectedLetters.length !== requiredLetters && (
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <AlertCircle size={14} />
                            Pilih tepat {requiredLetters} huruf untuk memulai
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quiz System Explanation Modal */}
          <QuizSystemModal
            isOpen={showQuizSystemModal}
            onClose={() => setShowQuizSystemModal(false)}
            onStartQuiz={handleStartQuizAfterExplanation}
            level={level}
            jenis={jenis}
            isRandomMode={isRandomMode}
          />
        </div>
      </AnimatePresence>
    </DashboardLayout>
  )
}
