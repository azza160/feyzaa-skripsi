"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  GraduationCap,
  Rocket,
  Star,
  Clock,
  Target,
  ArrowRight,
  Sparkles,
  Trophy,
  BookOpen,
  Brain,
  CheckCircle,
  Lock,
  Shuffle,
  ListChecks,
  ChevronLeft,
  AlertCircle,
  Info,
  TrendingUp,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import DashboardLayout from "../../Layouts/DashboardLayout"
import { Link, usePage, router } from "@inertiajs/react"
import { Loading } from "../../components/Loading"
import { Progress } from "@/components/ui/progress"

// Simplified Loading Component
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
  )
}

const levels = [
  {
    id: "beginner",
    name: "Beginner",
    emoji: "🎓",
    icon: GraduationCap,
    description:
      "Level pemula untuk pengenalan kosakata dasar. Fokus pada soal terjemahan dua arah dan penguatan hafalan.",
    longDescription:
      "Level Beginner adalah titik awal yang sempurna untuk memulai perjalanan belajar kosakata Bahasa Jepang. Dirancang dengan pendekatan yang ramah pemula, level ini memberikan waktu yang cukup untuk memahami setiap kata dan maknanya. Kamu akan diperkenalkan dengan kosakata dasar sehari-hari yang sering digunakan dalam percakapan sederhana.",
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    bgGlow: "bg-emerald-500/10",
    borderGlow: "border-emerald-500/30",
    textColor: "text-emerald-700",
    minWordsRequired: 0,
    timeLimit: "60 detik",
    questions: "10 soal",
    difficulty: "Mudah",
    features: [
      "Waktu menjawab 60 detik per soal",
      "Kosakata dasar sehari-hari",
      "Pilihan ganda 4 opsi",
      "Cocok untuk pemula",
    ],
  },
  {
    id: "intermediate",
    name: "Intermediate",
    emoji: "🚀",
    icon: Rocket,
    description:
      "Level menengah untuk menguji pemahaman konteks dan penggunaan kosakata dalam kalimat.",
    longDescription:
      "Level Intermediate menantang kemampuan kosakata Jepang yang sudah lebih matang. Dirancang untuk menguji tidak hanya hafalan, tetapi juga pemahaman konteks dan penggunaan kata dalam situasi yang beragam.",
    gradient: "from-yellow-400 via-orange-500 to-pink-500",
    bgGlow: "bg-yellow-500/10",
    borderGlow: "border-yellow-500/30",
    textColor: "text-yellow-700",
    minWordsRequired: 0,
    timeLimit: "45 detik",
    questions: "10 soal",
    difficulty: "Sedang",
    features: [
      "Waktu menjawab 45 detik per soal",
      "Soal fill in the blank & konteks kalimat",
      "Konteks penggunaan kosakata",
      "Menguji pemahaman dan aplikasi",
    ],
  },
  {
    id: "advanced",
    name: "Advanced",
    emoji: "🏆",
    icon: Trophy,
    description:
      "Level lanjutan untuk analisis kalimat dan penggunaan kosakata yang natural.",
    longDescription:
      "Level Advanced menguji kemampuan analisis dan pemilihan kalimat yang paling natural untuk penggunaan kosakata tertentu. Cocok untuk yang ingin mengasah pemahaman konteks dan penggunaan alami.",
    gradient: "from-violet-500 via-purple-600 to-indigo-700",
    bgGlow: "bg-violet-500/10",
    borderGlow: "border-violet-500/30",
    textColor: "text-violet-700",
    minWordsRequired: 0,
    timeLimit: "30 detik",
    questions: "10 soal",
    difficulty: "Sulit",
    features: [
      "Waktu menjawab 30 detik per soal",
      "Soal analisis kalimat",
      "Penggunaan kosakata yang natural",
      "Menguji pemahaman konteks lanjutan",
    ],
  },
]

const quizModes = [
  {
    id: 'manual',
    name: 'Manual',
    icon: ListChecks,
    color: 'from-emerald-400 to-green-500',
    description: 'Pilih sendiri kosakata yang ingin dijadikan soal kuis. Cocok untuk latihan terfokus pada kosakata yang sudah kamu pelajari.',
    features: [
      'Pilih kosakata yang sudah dipelajari',
      'Kontrol penuh atas materi kuis',
      'Cocok untuk latihan terarah',
      'EXP standar sesuai level',
    ],
    tips: 'Rekomendasi: Pilih minimal 10 kosakata yang sudah kamu kuasai untuk hasil maksimal!',
    onboarding: [
      'Gunakan mode ini untuk latihan terfokus pada kosakata yang sudah kamu pelajari.',
      'Sangat cocok untuk memperkuat hafalan dan mengukur progress belajar.',
      'Tips: Pilih minimal 10 kosakata agar variasi soal lebih banyak!',
      'Mode ini membantu kamu mengulang materi yang sudah dikuasai agar semakin mantap.',
    ],
  },
  {
    id: 'random',
    name: 'Random Challenge',
    icon: Shuffle,
    color: 'from-purple-500 to-pink-600',
    description: 'Sistem akan memilihkan kosakata secara acak dari seluruh database. Tantang dirimu dengan soal yang benar-benar random!',
    features: [
      'Kosakata dipilih acak oleh sistem',
      'Cocok untuk menguji penguasaan luas',
      'EXP standar sesuai level',
      'Waktu standar sesuai level',
    ],
    tips: 'Mode ini cocok untuk menguji seberapa luas penguasaan kosakata kamu secara spontan.',
    bonus: true,
    onboarding: [
      'Mode random akan menguji penguasaan kosakata secara luas, termasuk yang belum pernah kamu pelajari.',
      'Jangan khawatir jika hasil kurang bagus, gunakan mode ini untuk latihan dan mengukur seberapa banyak kosakata yang sudah kamu kuasai.',
      'Gunakan mode ini untuk menantang diri sendiri dan melihat perkembangan belajar secara keseluruhan.',
      'Hasil di mode random bisa jadi motivasi untuk belajar lebih banyak kosakata!',
    ],
  },
];

const comparison = [
  {
    label: 'Kontrol Materi',
    manual: 'Penuh',
    random: 'Sistem',
  },
  {
    label: 'EXP per Soal',
    manual: 'Standar',
    random: 'Standar',
  },
  {
    label: 'Waktu',
    manual: 'Standar',
    random: 'Standar',
  },
];

// QuizSystemModal: multi-step onboarding quiz/EXP
function QuizSystemModal({ isOpen, onClose, onStartQuiz, level, mode, isLoading }) {
  const [currentStep, setCurrentStep] = useState(0)
  const expSystem = {
    beginner: [8, 5, 2, 0],
    intermediate: [12, 7, 3, 0],
    advanced: [18, 10, 4, 0],
  }
  const timeLimit = {
    beginner: '5 menit',
    intermediate: '10 menit',
    advanced: '12 menit',
  }
  // Fallback jika level tidak valid
  const safeLevel = ['beginner', 'intermediate', 'advanced'].includes(level) ? level : 'beginner';
  const steps = [
    {
      title: 'Selamat Datang di Quiz Kosakata!',
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-3 sm:p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2 text-sm sm:text-base">
              <Info className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>Quiz Level {safeLevel}</span>
            </h3>
            <p className="text-blue-700 dark:text-blue-400 text-xs sm:text-sm leading-relaxed">
              Kamu akan mengerjakan 10 soal pilihan ganda dengan waktu {timeLimit[safeLevel]}. Jawaban benar akan memberikan EXP sesuai sistem yang adil.
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'Sistem EXP yang Adil',
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-3 sm:p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2 flex items-center gap-2 text-sm sm:text-base">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>Bagaimana EXP Dihitung?</span>
            </h3>
            <p className="text-green-700 dark:text-green-400 text-xs sm:text-sm leading-relaxed">
              EXP yang kamu dapatkan bergantung pada berapa kali kamu sudah mengerjakan soal yang sama sebelumnya. Semakin sering kamu mengerjakan soal yang sama, semakin sedikit EXP yang didapat.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {['Attempt 1', 'Attempt 2', 'Attempt 3', 'Attempt 4+'].map((label, i) => (
              <div key={i} className="flex flex-col items-center bg-white/80 dark:bg-slate-900/40 rounded-lg p-3 border">
                <span className="font-bold text-lg text-primary mb-1">{label}</span>
                <span className="text-2xl font-bold text-green-700 dark:text-green-300">+{expSystem[safeLevel][i]} EXP</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: 'Tips Belajar Efektif',
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-3 sm:p-4 rounded-lg border border-purple-200 dark:border-purple-800">
            <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2 flex items-center gap-2 text-sm sm:text-base">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>Strategi Belajar Efektif</span>
            </h3>
            <ul className="text-purple-700 dark:text-purple-400 text-xs sm:text-sm leading-relaxed list-disc ml-5">
              <li>Fokus pada soal baru untuk EXP maksimal</li>
              <li>Jangan terlalu lama di satu soal</li>
              <li>Latihan rutin setiap hari</li>
              <li>Review hasil quiz secara berkala</li>
            </ul>
          </div>
        </div>
      )
    }
  ]
  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1)
    else onStartQuiz()
  }
  const handleBack = () => { if (currentStep > 0) setCurrentStep(currentStep - 1) }
  const handleSkip = () => { onStartQuiz() }
  // Reset step setiap kali modal dibuka, level, atau mode berubah
  useEffect(() => {
    if (isOpen) setCurrentStep(0)
  }, [isOpen, level, mode])
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, type: 'spring', stiffness: 120 }}
    >
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 bg-white dark:bg-slate-900 border border-border shadow-xl z-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <DialogHeader className="mb-4">
              <DialogTitle className="text-xl sm:text-2xl font-bold text-center leading-tight">
                {steps[currentStep].title}
              </DialogTitle>
              <DialogDescription className="text-center text-sm sm:text-base">
                Langkah {currentStep + 1} dari {steps.length}
              </DialogDescription>
            </DialogHeader>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="py-4 sm:py-6"
          >
            {steps[currentStep].content}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mb-4 sm:mb-6"
          >
            <div className="flex justify-between text-xs sm:text-sm text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{currentStep + 1}/{steps.length}</span>
            </div>
            <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-2"
          >
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              {currentStep > 0 && (
                <Button variant="outline" onClick={handleBack} className="w-full sm:w-auto" disabled={isLoading}>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Kembali
                </Button>
              )}
              <Button variant="ghost" onClick={handleSkip} className="w-full sm:w-auto" disabled={isLoading}>
                Lewati
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button variant="outline" onClick={onClose} className="w-full sm:w-auto" disabled={isLoading}>
                Batal
              </Button>
              <Button onClick={handleNext} className="w-full sm:w-auto" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loading className="w-4 h-4 mr-2" />
                    Memuat...
                  </>
                ) : currentStep === steps.length - 1 ? (
                  <>
                    Mulai Quiz
                    <Star className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    Selanjutnya
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}

export default function QuizLevelSelector() {
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [showDialog, setShowDialog] = useState(false)
  const [dialogLevel, setDialogLevel] = useState(null)
  const [showModeSelection, setShowModeSelection] = useState(false)
  const [selectedMode, setSelectedMode] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { progressKosakata, user, currentLevel, currentExp, maxExp, totalKosakata } = usePage().props
  const [showQuizSystemModal, setShowQuizSystemModal] = useState(false)

  // Debug useEffect untuk memantau state showModeSelection
  useEffect(() => {
    console.log('showModeSelection changed:', showModeSelection)
  }, [showModeSelection])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    setShowQuizSystemModal(false)
  }, [selectedLevel, selectedMode])

  // Reset selectedMode setiap kali modal mode dibuka atau level berubah
  useEffect(() => {
    if (showModeSelection) setSelectedMode(null)
  }, [showModeSelection, selectedLevel])

  const handleLevelSelect = (level) => {
    setSelectedLevel(level.id)
    console.log('Level selected:', level.id)
  }

  const handleModeSelect = (modeId) => {
    setSelectedMode(modeId)
  }

  const handleModeContinue = () => {
    if (!hasSeenQuizExplanation()) {
      setShowQuizSystemModal(true)
      return
    }
    setIsLoading(true)
    if (selectedMode === 'manual') {
      router.visit(route('pilih-list-quis-kosakata', { level: selectedLevel }))
    } else if (selectedMode === 'random') {
      router.visit(route('pilih-list-quis-kosakata', { level: selectedLevel, mode: 'random' }))
    }
  }

  const handleStartQuizAfterExplanation = () => {
    setShowQuizSystemModal(false)
    markQuizExplanationAsSeen()
    setIsLoading(true)
    if (selectedMode === 'manual') {
      router.visit(route('pilih-list-quis-kosakata', { level: selectedLevel }))
    } else if (selectedMode === 'random') {
      router.post(route('start-quis-kosakata'), { mode: 'random', level: selectedLevel })
    }
  }

  const handleBackToLevel = () => {
    setShowModeSelection(false)
    setSelectedMode(null)
  }

  const getSelectedLevelData = () => {
    return levels.find((level) => level.id === selectedLevel)
  }

  const hasSeenQuizExplanation = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('quizKosakataSystemExplained') === 'true'
    }
    return false
  }

  const markQuizExplanationAsSeen = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('quizKosakataSystemExplained', 'true')
    }
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
              className="flex items-center space-x-2 text-sm bg-gradient-to-r from-background to-muted/50 dark:from-slate-950 dark:to-slate-900/50 p-3 rounded-lg shadow-sm border border-border/50 dark:border-slate-800/50 mb-[50px] w-fit hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-wrap items-center space-x-2">
                <Link href={route("dashboard")}> 
                  <span className="text-muted-foreground dark:text-slate-400 hover:text-violet-800 dark:hover:text-violet-300 transition-all duration-300 hover:underline">
                    Dashboard
                  </span>
                </Link>
              
                <span className="text-primary dark:text-violet-400">/</span>
                <Link href={route("pilih-level-quis-kosakata")}> 
                  <span className="text-violet-400 dark:text-violet-600 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-300 hover:underline">
                    Kuis Kosakata
                  </span>
                </Link>
              </div>
              <motion.div
                className="h-1 w-1 rounded-full bg-primary/50 dark:bg-violet-500/50"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
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
                    <div className="py-8 px-4 relative z-0 bg-gradient-to-r from-blue-500/20 via-purple-500/10 to-pink-500/10 dark:from-blue-800/30 dark:via-purple-800/20 dark:to-pink-800/20 rounded-lg border border-primary/10 hover:border-primary/20 transition-all duration-300">
                      {/* Decorative background elements */}
                      <div className="absolute top-4 left-4 w-16 h-16 bg-primary/10 rounded-full blur-xl" />
                      <div className="absolute bottom-4 right-4 w-12 h-12 bg-primary/10 rounded-full blur-xl" />
                      
                      <div className="relative z-10">
                        <div className="inline-block mb-4 bg-gradient-to-r from-primary/20 to-primary/10 p-3 rounded-full border border-primary/20">
                          <BookOpen className="h-8 w-8 text-slate-900 dark:text-slate-200" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-slate-900 dark:text-slate-200 capitalize bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                          Pilih Level Kuis Kosakata
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                          Tentukan seberapa jauh kamu ingin menantang diri dalam perjalanan belajar kosakata Bahasa Jepang
                          <br />
                          <span className="text-sm inline-block mt-2 bg-primary/10 px-3 py-1 rounded-full border border-primary/20 hover:bg-primary/20 transition-all duration-300">
                            Pilih level yang sesuai dengan kemampuanmu!
                          </span>
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Level Cards */}
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16"
                    layout
                  >
                    {levels.map((level, index) => {
                      let isLocked = progressKosakata < level.minWordsRequired
                      const isSelected = selectedLevel === level.id

                      return (
                        <motion.div
                          key={level.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className={cn(
                            'group',
                            isLocked ? 'cursor-not-allowed grayscale relative' : 'cursor-pointer',
                            isSelected && 'ring-4 ring-primary scale-105 rounded-2xl',
                          )}
                          onClick={() => !isLocked && handleLevelSelect(level)}
                          style={{ pointerEvents: isLocked ? 'none' : 'auto' }}
                        >
                          <div
                            className={cn(
                              'relative overflow-hidden rounded-2xl bg-gradient-to-br transition-all duration-300 border-2 h-full',
                              level.gradient,
                              !isLocked && 'hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20',
                              isSelected && 'ring-2 ring-primary ring-offset-2 shadow-lg rounded-2xl',
                              'transition-all duration-300'
                            )}
                          >
                            {/* Selected indicator */}
                            {isSelected && (
                              <div className="absolute top-4 right-4 z-30">
                                <div className="bg-primary text-white rounded-full p-2 shadow-lg">
                                  <CheckCircle className="w-5 h-5" />
                                </div>
                              </div>
                            )}

                            {/* Overlay jika terkunci */}
                            {isLocked && (
                              <div className="absolute inset-0 bg-black/40 z-20 flex flex-col items-center justify-center rounded-2xl">
                                <Lock className="w-10 h-10 text-white/80 mb-2" />
                                <span className="bg-amber-500/90 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">Terkunci</span>
                              </div>
                            )}
                            <CardContent className="p-6 flex flex-col h-full relative z-10">
                              {/* Header */}
                              <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3 min-w-0">
                                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                                    <level.icon className="w-6 h-6 text-white" />
                                  </div>
                                  <div className="min-w-0">
                                    <h3 className="text-xl font-bold text-white truncate">{level.name}</h3>
                                    <p className="text-white/80 text-sm truncate">
                                      {level.timeLimit} • {level.questions}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-3xl flex-shrink-0">{level.emoji}</div>
                              </div>

                              <p className="text-white/90 text-sm mb-6 flex-grow">{level.description}</p>

                              {/* Progress Bar */}
                              <div className="mb-6">
                                <div className="flex justify-between text-xs text-white/80 mb-1">
                                  <span>Progress</span>
                                  <span>{progressKosakata}/{totalKosakata}</span>
                                </div>
                                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                  <motion.div
                                    className="h-full bg-white/40 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min((progressKosakata / totalKosakata) * 100, 100)}%` }}
                                    transition={{ duration: 0.5 }}
                                  />
                                </div>
                                {isLocked && (
                                  <div className="mt-2 text-xs text-white/70 flex items-center gap-1">
                                    <Lock className="w-3 h-3" />
                                    <span>Butuh {level.minWordsRequired - progressKosakata} kata lagi</span>
                                  </div>
                                )}
                                {!isLocked && progressKosakata >= level.minWordsRequired && (
                                  <div className="mt-2 text-xs text-emerald-300 flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3" />
                                    <span>Level tersedia!</span>
                                  </div>
                                )}
                              </div>

                              {/* Features Grid */}
                              <div className="space-y-2 mb-6">
                                {level.features.map((feature, i) => (
                                  <div key={i} className="bg-white/10 rounded-lg p-2 text-xs text-white/90">
                                    {feature}
                                  </div>
                                ))}
                              </div>

                              {/* Action Button */}
                              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center mt-auto transition-all duration-300 group-hover:bg-white/20">
                                <p className="text-white/90 text-sm">
                                  {isLocked ? (
                                    <span>Perlu {level.minWordsRequired} kata</span>
                                  ) : (
                                    <span className="font-medium group-hover:text-white transition-colors">
                                      {isSelected ? 'Level Dipilih' : 'Mulai Level Ini'}
                                    </span>
                                  )}
                                </p>
                              </div>
                            </CardContent>
                          </div>
                        </motion.div>
                      )
                    })}
                  </motion.div>

                  {/* Onboarding/long description muncul di bawah grid card setelah klik */}
                  <AnimatePresence>
                    {selectedLevel && (
                      <motion.div
                        key="level-detail"
                        className="bg-card rounded-2xl p-8 border mb-16 relative overflow-hidden"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                        layout
                      >
                        {/* Background gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-50" />
                        
                        {/* Decorative elements */}
                        <div className="absolute top-4 right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl" />
                        <div className="absolute bottom-4 left-4 w-16 h-16 bg-primary/10 rounded-full blur-xl" />
                        
                        <div className="relative z-10 flex flex-col gap-8">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                              <div
                                className={cn(
                                  "w-12 h-12 rounded-xl flex items-center justify-center",
                                  levels.find((l) => l.id === selectedLevel)?.bgGlow,
                                )}
                              >
                                <span className="text-2xl">{levels.find((l) => l.id === selectedLevel)?.emoji}</span>
                              </div>
                              <div>
                                <h3 className="text-2xl font-bold">Level {levels.find((l) => l.id === selectedLevel)?.name}</h3>
                                <p className={cn("text-sm font-medium", levels.find((l) => l.id === selectedLevel)?.textColor)}>
                                  {progressKosakata}/{levels.find((l) => l.id === selectedLevel)?.minWordsRequired} kosakata dikuasai
                                </p>
                              </div>
                            </div>

                            <p className="text-muted-foreground mb-6">{levels.find((l) => l.id === selectedLevel)?.longDescription}</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {levels.find((l) => l.id === selectedLevel)?.features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-secondary">
                                  <div className="w-2 h-2 rounded-full bg-primary" />
                                  <span className="text-sm">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col justify-center items-center gap-4">
                            <Button 
                              size="lg" 
                              className="px-8 py-6 text-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300" 
                              onClick={() => {
                                console.log('Opening mode selection modal')
                                setShowModeSelection(true)
                              }}
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <>
                                  <Loading className="w-5 h-5 mr-2" />
                                  Memuat...
                                </>
                              ) : (
                                <>
                                  Pilih Mode Kuis
                                  <ArrowRight size={18} className="ml-2" />
                                </>
                              )}
                            </Button>
                            <p className="text-sm text-muted-foreground text-center">
                              Pilih mode yang sesuai dengan keinginanmu
                            </p>
                            <Button 
                              variant="outline" 
                              onClick={() => setSelectedLevel(null)}
                              className="flex items-center gap-2 hover:bg-muted/50 transition-colors"
                              disabled={isLoading}
                            >
                              <ChevronLeft className="w-4 h-4" />
                              Kembali ke Pilih Level
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Motivational Footer */}
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="bg-gradient-to-r from-primary/10 via-chart-2/10 to-chart-1/10 rounded-xl p-6 border border-primary/20 hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
                      {/* Decorative background elements */}
                      <div className="absolute top-2 left-2 w-8 h-8 bg-primary/10 rounded-full blur-lg" />
                      <div className="absolute bottom-2 right-2 w-6 h-6 bg-primary/10 rounded-full blur-lg" />
                      
                      <p className="text-lg font-medium text-foreground relative z-10">
                        ✨ Semakin sering berlatih, semakin banyak kosakata yang kamu kuasai! ✨
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </AnimatePresence>

      {/* Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <span className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                {dialogLevel?.emoji}
              </span>
              Level {dialogLevel?.name} Terkunci
            </DialogTitle>
            <DialogDescription className="pt-4 text-base">
              <div className="space-y-4">
                <p>
                  Kamu baru mempelajari{" "}
                  <span className="font-bold text-primary">{progressKosakata} kata</span>, sedangkan
                  untuk level ini kamu perlu menguasai minimal{" "}
                  <span className="font-bold text-primary">{dialogLevel?.minWordsRequired} kata</span>.
                </p>
                <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-md">
                  <p className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-medium">
                    <Sparkles className="w-5 h-5" />
                    Yuk belajar lebih banyak kosakata dulu sebelum mencoba level ini!
                  </p>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Kembali
            </Button>
            <Button
              onClick={() => {
                setShowDialog(false)
                // TODO: navigate to kosakata learning page
              }}
            >
              Belajar Kosakata
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Pemilihan Mode */}
      <Dialog open={showModeSelection} onOpenChange={(open) => {
        console.log('Dialog onOpenChange:', open)
        setShowModeSelection(open)
      }}>
        <DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 bg-white dark:bg-slate-900 border border-border shadow-xl z-50">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl sm:text-2xl font-bold text-center">
              Pilih Mode Kuis Kosakata 🎯
            </DialogTitle>
            <DialogDescription className="text-center text-sm sm:text-base">
              {levels.find((l) => l.id === selectedLevel)?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 sm:py-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {quizModes.map((mode, index) => {
                const Icon = mode.icon;
                const isActive = selectedMode === mode.id;
                return (
                  <motion.div
                    key={mode.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      'group cursor-pointer border-2 border-transparent rounded-2xl',
                      isActive && 'ring-4 ring-primary scale-105 rounded-2xl',
                    )}
                    onClick={() => {
                      console.log('Mode selected:', mode.id)
                      handleModeSelect(mode.id)
                    }}
                  >
                    <div className={cn(
                      'relative overflow-hidden rounded-2xl bg-gradient-to-br transition-all duration-300 border-2 h-full min-h-[200px]',
                      mode.color,
                      'hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20',
                      isActive && 'ring-4 ring-primary ring-offset-2 shadow-xl rounded-2xl',
                    )}>
                      {/* Active indicator */}
                      {isActive && (
                        <div className="absolute top-4 right-4 z-30">
                          <div className="bg-primary text-white rounded-full p-2 shadow-lg">
                            <CheckCircle className="w-5 h-5" />
                          </div>
                        </div>
                      )}
                      
                      <div className="p-6 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white">{mode.name}</h3>
                              {mode.bonus && (
                                <div className="flex items-center gap-1 mt-1">
                                  <Star className="w-3 h-3 text-yellow-300" />
                                  <span className="text-xs text-yellow-200">Bonus Mode</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <p className="text-white text-sm mb-6 flex-grow font-medium">{mode.description}</p>
                        <div className="space-y-2 mb-6">
                          {mode.features.map((feature, i) => (
                            <div key={i} className="bg-white/20 rounded-lg p-2 text-xs text-white font-medium">
                              {feature}
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-yellow-200 bg-yellow-500/20 rounded px-3 py-1 w-fit mb-2 border border-yellow-300/30">
                          <Sparkles className="w-4 h-4" />
                          <span className="font-medium">{mode.tips}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
            {/* Onboarding/tips dinamis muncul di bawah grid card mode */}
            {selectedMode && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-8 bg-blue-50 dark:bg-blue-950/30 rounded-xl p-6 border border-blue-200 dark:border-blue-800"
              >
                <h4 className="font-bold mb-2 text-blue-800 dark:text-blue-300">Tips & Onboarding</h4>
                <ul className="list-disc ml-5 text-sm mb-4 text-blue-700 dark:text-blue-400">
                  {quizModes.find((m) => m.id === selectedMode)?.onboarding.map((tip, i) => <li key={i}>{tip}</li>)}
                </ul>
                <Button onClick={handleModeContinue} className="w-full mt-2" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loading className="w-4 h-4 mr-2 inline" />
                      Memuat...
                    </>
                  ) : (
                    selectedMode === 'manual' ? 'Pilih Kosakata' : 'Mulai Kuis Random'
                  )}
                </Button>
                {/* Tombol untuk menampilkan ulang modal penjelasan quiz/EXP */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => setShowQuizSystemModal(true)}
                  disabled={isLoading}
                >
                  <Info className="w-4 h-4 mr-2 inline" />
                  Lihat Penjelasan Sistem Quiz/EXP
                </Button>
              </motion.div>
            )}
            <div className="flex justify-center mt-6">
              <Button variant="outline" onClick={handleBackToLevel} className="flex items-center gap-2" disabled={isLoading}>
                <ChevronLeft className="w-4 h-4" />
                Kembali ke Detail Level
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal penjelasan sistem quiz/EXP */}
      <QuizSystemModal
        key={selectedLevel + '-' + selectedMode}
        isOpen={showQuizSystemModal}
        onClose={() => setShowQuizSystemModal(false)}
        onStartQuiz={handleStartQuizAfterExplanation}
        level={selectedLevel}
        mode={selectedMode}
        isLoading={isLoading}
      />
    </DashboardLayout>
  )
}
