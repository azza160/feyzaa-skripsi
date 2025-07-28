"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import DashboardLayout from "../../Layouts/DashboardLayout"
import { CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ChevronRight, Sparkles, Star, Zap, Egg, Flame, Crown, Clock, Target, Award, GraduationCap, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Link, usePage, router } from "@inertiajs/react"
import { Loading } from "../../components/Loading"

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

const levels = [
  {
    id: "beginner",
    name: "Beginner",
    emoji: "🐣",
    icon: Egg,
    description:
      "Cocok untuk pemula yang baru mengenal huruf Jepang. Fokus pada pengenalan dasar dan pengucapan sederhana.",
    longDescription:
      "Level ini dirancang khusus untuk pemula yang baru memulai perjalanan belajar Bahasa Jepang. Kamu akan diperkenalkan dengan huruf-huruf dasar dan cara pengucapannya yang sederhana.",
    color: "from-emerald-400 to-green-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    textColor: "text-green-700 dark:text-green-300",
    minLettersRequired: 0,
    timeLimit: "5 menit",
    questions: "10 soal",
    expInfo: "10 EXP (percobaan 1), 5 EXP (percobaan 2), 2 EXP (percobaan 3), 0 EXP (percobaan 4+)",
    features: [
      "Waktu total: 5 menit untuk 10 soal",
      "EXP menurun berdasarkan percobaan",
      "Cocok untuk pemula yang baru mulai belajar",
    ],
    
  },
  {
    id: "intermediate",
    name: "Intermediate",
    emoji: "🔥",
    icon: Flame,
    description: "Tantangan untuk yang sudah mengenal dasar-dasar huruf. Mencakup kombinasi huruf dan kata sederhana.",
    longDescription:
      "Level menengah ini cocok untuk kamu yang sudah familiar dengan huruf-huruf dasar Jepang. Kuis akan mencakup kombinasi huruf dan pembentukan kata-kata sederhana.",
    color: "from-orange-400 to-amber-500",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    textColor: "text-orange-700 dark:text-orange-300",
    minLettersRequired: 0,
    timeLimit: "7 menit",
    questions: "10 soal",
    expInfo: "15 EXP (percobaan 1), 8 EXP (percobaan 2), 3 EXP (percobaan 3), 0 EXP (percobaan 4+)",
    features: [
      "Waktu total: 7 menit untuk 10 soal",
      "EXP menurun berdasarkan percobaan",
      "Mencakup kombinasi huruf",
    ],
  },
  {
    id: "advanced",
    name: "Advanced",
    emoji: "⚡",
    icon: Zap,
    description: "Untuk yang sudah mahir dan ingin tantangan lebih. Termasuk kata-kata kompleks dan kecepatan tinggi.",
    longDescription:
      "Level lanjutan ini dirancang untuk mereka yang sudah mahir dengan huruf Jepang dan ingin tantangan lebih. Kuis akan mencakup kata-kata kompleks dan kecepatan tinggi.",
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    textColor: "text-purple-700 dark:text-purple-300",
    minLettersRequired: 0,
    timeLimit: "10 menit",
    questions: "10 soal",
    expInfo: "20 EXP (percobaan 1), 10 EXP (percobaan 2), 5 EXP (percobaan 3), 0 EXP (percobaan 4+)",
    features: [
      "Waktu total: 10 menit untuk 10 soal",
      "EXP menurun berdasarkan percobaan",
      "Menguji kecepatan berpikir dan daya ingat",
    ],
    
  },
]



export default function QuizLevelSelect() {
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [isButtonLoading, setIsButtonLoading] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [showDialog, setShowDialog] = useState(false)
  const [dialogLevel, setDialogLevel] = useState(null)
  const [showModeSelection, setShowModeSelection] = useState(false)
  const { jenis, progressHuruf, isRandomMode = false } = usePage().props

  // Simulate initial page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const handleLevelSelect = (level) => {
    setSelectedLevel(level.id)
  }

  const handleModeSelect = (mode) => {
    if (mode === 'manual') {
      router.visit(route('pilih-list-huruf-quis', {
        jenis: jenis,
        level: selectedLevel
      }));
    } else if (mode === 'random') {
      router.visit(route('pilih-list-huruf-quis', {
        jenis: jenis,
        level: selectedLevel,
        mode: 'random'
      }));
    }
  }

  const handleBackToLevel = () => {
    setShowModeSelection(false)
    setSelectedLevel(null)
  }

  const getSelectedLevelData = () => {
    return levels.find((level) => level.id === selectedLevel)
  }

  // Quiz Mode Selection Modal
  const QuizModeModal = () => {
    const quizModes = [
      {
        id: 'manual',
        name: 'Pilih Huruf Manual',
        description: 'Pilih sendiri huruf yang ingin diujikan. Kontrol penuh atas materi yang dipelajari.',
        icon: Target,
        color: 'from-blue-500 to-indigo-600',
        features: [
          'Pilih huruf spesifik yang ingin dilatih',
          'Fokus pada area yang perlu diperbaiki',
          'EXP standar sesuai level',
          'Cocok untuk pemula yang ingin belajar bertahap'
        ],
        expMultiplier: 1,
        timeBonus: 0
      },
      {
        id: 'random',
        name: 'Random Challenge Mode',
        description: 'Tantangan dengan huruf acak! Soal dipilih secara otomatis oleh sistem.',
        icon: Zap,
        color: 'from-purple-500 to-pink-600',
        features: [
          'Huruf dipilih secara acak oleh sistem',
          'EXP standar sesuai level',
          'Waktu standar sesuai level',
          'Cocok untuk yang ingin tantangan lebih'
        ],
        expMultiplier: 1,
        timeBonus: 0
      }
    ]

    return (
      <Dialog open={showModeSelection} onOpenChange={setShowModeSelection}>
        <DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 bg-white dark:bg-slate-900 border border-border shadow-xl z-50">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl sm:text-2xl font-bold text-center">
              Pilih Mode Quiz 🎯
            </DialogTitle>
            <DialogDescription className="text-center text-sm sm:text-base">
              {getSelectedLevelData()?.name} - {jenis}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 sm:py-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {quizModes.map((mode, index) => (
                <motion.div
                  key={mode.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => handleModeSelect(mode.id)}
                >
                  <div className={cn(
                    "relative overflow-hidden rounded-2xl bg-gradient-to-br transition-all duration-300 border-2 h-full",
                    mode.color,
                    "hover:scale-[1.02] hover:shadow-lg",
                    selectedLevel === mode.id && 'ring-4 ring-primary scale-105 rounded-2xl',
                  )}>
                    <div className="p-6 flex flex-col h-full">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                            <mode.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white">{mode.name}</h3>
                            {mode.id === 'random' && (
                              <div className="flex items-center gap-1 mt-1">
                                <Star className="w-3 h-3 text-yellow-300" />
                                <span className="text-xs text-yellow-200">Bonus Mode</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <p className="text-white/90 text-sm mb-6 flex-grow">{mode.description}</p>

                      {/* Features */}
                      <div className="space-y-2 mb-6">
                        {mode.features.map((feature, i) => (
                          <div key={i} className="bg-white/10 rounded-lg p-2 text-xs text-white/90">
                            {feature}
                          </div>
                        ))}
                      </div>

                      {/* Bonus Info */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                        <div className="flex items-center justify-center gap-4 text-white/90 text-sm">
                          <div className="flex items-center gap-1">
                            <Zap className="w-4 h-4 text-yellow-300" />
                            <span>Lanjutkan</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mode Information */}
            <div className="mt-6 bg-card/50 rounded-xl p-4 border">
              <h4 className="font-semibold text-center mb-4 text-sm sm:text-base">Informasi Mode</h4>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h5 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Mode Manual</h5>
                  <p className="text-blue-700 dark:text-blue-400">Pilih sendiri huruf yang ingin diujikan. Kontrol penuh atas materi yang dipelajari dengan EXP dan waktu standar sesuai level.</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-950/30 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
                  <h5 className="font-medium text-purple-800 dark:text-purple-300 mb-2">Mode Random</h5>
                  <p className="text-purple-700 dark:text-purple-400">Tantangan dengan huruf acak! Soal dipilih secara otomatis oleh sistem dengan EXP dan waktu standar sesuai level.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button variant="outline" onClick={handleBackToLevel}>
              <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
              Kembali ke Pilih Level
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <DashboardLayout>
      <AnimatePresence>
        {isButtonLoading && <Loading />}
        
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
                <Link href={route("pilih-level-quis",jenis)}>
                  <span className="text-violet-400 dark:text-violet-600">
                    Pilih Level
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
                        Pilih Tingkat Kuis
                      </h1>
                      <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                        Tentukan seberapa jauh kamu ingin menantang diri dalam perjalanan belajar Bahasa Jepang
                        <br />
                        <span className="text-sm inline-block mt-2 bg-primary/5 px-3 py-1 rounded-full">
                          Pilih level yang sesuai dengan kemampuanmu!
                        </span>
                      </p>
                    </div>
                  </motion.div>

                  {/* Level Cards */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
                    {levels.map((level, index) => {
                      // Special case for Beginner level: unlocked for random mode
                      const isLocked = level.id === 'beginner' && isRandomMode 
                        ? false 
                        : progressHuruf < level.minLettersRequired

                      return (
                        <motion.div
                          key={level.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className={cn(
                            'group cursor-pointer',
                            isLocked && 'opacity-60',
                            selectedLevel === level.id && 'ring-4 ring-primary scale-105 rounded-2xl',
                          )}
                          onClick={() => !isLocked && handleLevelSelect(level)}
                        >
                          <div
                            className={cn(
                              'relative overflow-hidden rounded-2xl bg-gradient-to-br transition-all duration-300 border-2 h-full',
                              level.color,
                              'hover:scale-[1.02] hover:shadow-lg',
                              selectedLevel === level.id && 'ring-2 ring-primary ring-offset-2 shadow-lg rounded-2xl',
                            )}
                          >
                            <CardContent className="p-6 flex flex-col h-full">
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
                                  <span>{level.id === 'beginner' && isRandomMode ? 'Status' : 'Progress'}</span>
                                  <span>
                                    {level.id === 'beginner' && isRandomMode 
                                      ? 'Tersedia' 
                                      : `${progressHuruf}/${level.minLettersRequired}`
                                    }
                                  </span>
                                </div>
                                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                  <motion.div
                                    className="h-full bg-white/40 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ 
                                      width: level.id === 'beginner' && isRandomMode 
                                        ? "100%" 
                                        : `${Math.min((progressHuruf / level.minLettersRequired) * 100, 100)}%` 
                                    }}
                                    transition={{ duration: 0.5 }}
                                  />
                                </div>
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
                              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center mt-auto">
                                <p className="text-white/90 text-sm">
                                  {isLocked ? (
                                    <span>Perlu {level.minLettersRequired} huruf</span>
                                  ) : (
                                    <span className="font-medium">Mulai Level Ini</span>
                                  )}
                                </p>
                              </div>
                            </CardContent>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* Selected Level Details */}
                  {selectedLevel && !showModeSelection && (
                    <motion.div
                      className="bg-card rounded-2xl p-8 border mb-16"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex flex-col gap-8">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-4">
                            <div
                              className={cn(
                                "w-12 h-12 rounded-xl flex items-center justify-center",
                                getSelectedLevelData()?.bgColor,
                              )}
                            >
                              <span className="text-2xl">{getSelectedLevelData()?.emoji}</span>
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold">Level {getSelectedLevelData()?.name}</h3>
                              <p className={cn("text-sm font-medium", getSelectedLevelData()?.textColor)}>
                                {getSelectedLevelData()?.id === 'beginner' && isRandomMode 
                                  ? 'Mode Random - Level tersedia tanpa ketentuan huruf' 
                                  : `${progressHuruf}/${getSelectedLevelData()?.minLettersRequired} huruf dikuasai`
                                }
                              </p>
                            </div>
                          </div>

                          <p className="text-muted-foreground mb-6">{getSelectedLevelData()?.longDescription}</p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {getSelectedLevelData()?.features.map((feature, i) => (
                              <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-secondary">
                                <div className="w-2 h-2 rounded-full bg-primary" />
                                <span className="text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col justify-center items-center gap-4">
                          <Button size="lg" className="px-8 py-6 text-lg" onClick={() => setShowModeSelection(true)}>
                            Pilih Mode Quiz
                            <ArrowRight size={18} className="ml-2" />
                          </Button>
                          <p className="text-sm text-muted-foreground text-center">
                            Pilih mode yang sesuai dengan keinginanmu
                          </p>
                          <Button variant="outline" onClick={handleBackToLevel} className="flex items-center gap-2">
                            <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
                            Kembali ke Pilih Level
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </AnimatePresence>

      {/* Quiz Mode Selection Modal */}
      <QuizModeModal />

      {/* Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <span className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                {dialogLevel?.emoji}
              </span>
              {dialogLevel?.id === 'beginner' && isRandomMode ? 'Mode Random Tersedia' : `Level ${dialogLevel?.name} Terkunci`}
            </DialogTitle>
            <DialogDescription className="pt-4 text-base">
              <div className="space-y-4">
                {dialogLevel?.id === 'beginner' && isRandomMode ? (
                  <>
                    <p>
                      Mode Random untuk level Beginner memungkinkan kamu untuk mengakses level ini tanpa perlu mempelajari huruf terlebih dahulu.
                    </p>
                    <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-md">
                      <p className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-medium">
                        <Sparkles className="w-5 h-5" />
                        Sistem akan memilih soal secara acak dari semua soal yang tersedia!
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <p>
                      Kamu baru mempelajari{" "}
                      <span className="font-bold text-primary">{progressHuruf} huruf</span>, sedangkan
                      untuk level ini kamu perlu menguasai minimal{" "}
                      <span className="font-bold text-primary">{dialogLevel?.minLettersRequired} huruf</span>.
                    </p>
                    <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-md">
                      <p className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-medium">
                        <Sparkles className="w-5 h-5" />
                        {dialogLevel?.id === 'beginner' 
                          ? 'Untuk mode manual, yuk belajar minimal 10 huruf dulu!' 
                          : 'Yuk belajar lebih banyak huruf dulu sebelum mencoba level ini!'
                        }
                      </p>
                    </div>
                  </>
                )}
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
                if (!isRandomMode) {
                  navigateTo("learn")
                }
              }}
            >
              {isRandomMode ? 'Mengerti' : 'Belajar Huruf'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
