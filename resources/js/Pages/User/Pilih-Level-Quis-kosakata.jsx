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
} from "lucide-react"
import { cn } from "@/lib/utils"
import DashboardLayout from "../../Layouts/DashboardLayout"
import { Link, usePage, router } from "@inertiajs/react"
import { Loading } from "../../components/Loading"

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
      "Level pemula yang dirancang khusus untuk mereka yang baru memulai perjalanan belajar kosakata Bahasa Jepang. Fokus pada pengenalan dasar dengan waktu yang cukup untuk berpikir dan memahami setiap kata dengan baik.",
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
    id: "pro",
    name: "Pro",
    emoji: "🚀",
    icon: Rocket,
    description:
      "Level lanjutan untuk mereka yang sudah menguasai dasar-dasar kosakata Jepang. Menguji pemahaman konteks dan kemampuan mengingat kosakata dalam situasi yang lebih kompleks dengan waktu yang lebih terbatas.",
    longDescription:
      "Level Pro menantang kemampuan kosakata Jepang yang sudah lebih matang. Dirancang untuk menguji tidak hanya hafalan, tetapi juga pemahaman konteks dan penggunaan kata dalam situasi yang beragam. Dengan waktu yang lebih terbatas, level ini melatih kecepatan berpikir dan ketepatan dalam memilih jawaban yang paling sesuai.",
    gradient: "from-violet-500 via-purple-600 to-indigo-700",
    bgGlow: "bg-violet-500/10",
    borderGlow: "border-violet-500/30",
    textColor: "text-violet-700",
    minWordsRequired: 0,
    timeLimit: "30 detik",
    questions: "15 soal",
    difficulty: "Menantang",
    features: [
      "Waktu menjawab 30 detik per soal",
      "Kosakata tingkat menengah-lanjut",
      "Konteks kalimat yang kompleks",
      "Menguji kecepatan dan ketepatan",
    ],
  },
]

export default function QuizLevelSelector() {
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [showDialog, setShowDialog] = useState(false)
  const [dialogLevel, setDialogLevel] = useState(null)
  const { progressKosakata, user, currentLevel, currentExp, maxExp, totalKosakata } = usePage().props

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const handleLevelSelect = (level) => {
    if (level.id === 'pro' && user.level < 4) {
      setDialogLevel(level)
      setShowDialog(true)
      return
    }
    if (progressKosakata < level.minWordsRequired) {
      setDialogLevel(level)
      setShowDialog(true)
      return
    }
    setSelectedLevel(level.id)
  }

  const handleContinue = () => {
    if (selectedLevel) {
      router.visit(route('pilih-list-quis-kosakata', { level: selectedLevel }))
    }
  }

  const getSelectedLevelData = () => {
    return levels.find((level) => level.id === selectedLevel)
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
              
                <span className="text-primary dark:text-violet-400">/</span>
                <Link href={route("pilih-level-quis-kosakata")}> 
                  <span className="text-violet-400 dark:text-violet-600">
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
                    <div className="py-8 px-4 relative z-0 bg-gradient-to-r from-blue-500/20 via-purple-500/10 to-pink-500/10 dark:from-blue-800/30 dark:via-purple-800/20 dark:to-pink-800/20 rounded-lg">
                      <div className="inline-block mb-4 bg-blue-500/20 p-2 rounded-full">
                        <BookOpen className="h-8 w-8 text-slate-900 dark:text-slate-200" />
                      </div>
                      <h1 className="text-4xl md:text-5xl font-bold mb-3 text-slate-900 dark:text-slate-200 capitalize">
                        Pilih Level Kuis Kosakata
                      </h1>
                      <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                        Tentukan seberapa jauh kamu ingin menantang diri dalam perjalanan belajar kosakata Bahasa Jepang
                        <br />
                        <span className="text-sm inline-block mt-2 bg-primary/5 px-3 py-1 rounded-full">
                          Pilih level yang sesuai dengan kemampuanmu!
                        </span>
                      </p>
                    </div>
                  </motion.div>

                  {/* Level Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    {levels.map((level, index) => {
                      let isLocked = progressKosakata < level.minWordsRequired
                      if (level.id === 'pro' && user.level < 4) {
                        isLocked = true
                      }
                      const isSelected = selectedLevel === level.id

                      return (
                        <motion.div
                          key={level.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className={cn(
                            'group',
                            isLocked ? 'cursor-not-allowed grayscale relative' : 'cursor-pointer'
                          )}
                          onClick={() => !isLocked && handleLevelSelect(level)}
                          style={{ pointerEvents: isLocked ? 'none' : 'auto' }}
                        >
                          <div
                            className={cn(
                              'relative overflow-hidden rounded-2xl bg-gradient-to-br transition-all duration-300 border-2 h-full',
                              level.gradient,
                              !isLocked && 'hover:scale-[1.02] hover:shadow-lg',
                              isSelected && 'ring-2 ring-primary ring-offset-2',
                              'transition-transform'
                            )}
                          >
                            {/* Overlay jika terkunci */}
                            {isLocked && (
                              <div className="absolute inset-0 bg-black/40 z-20 flex flex-col items-center justify-center rounded-2xl">
                                <Lock className="w-10 h-10 text-white/80 mb-2" />
                                <span className="bg-amber-500/90 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">Terkunci</span>
                                {level.id === 'pro' && user.level < 4 && (
                                  <span className="text-white text-xs text-center px-4">Kuis di level ini akan terbuka ketika kamu sudah mencapai <b>Level 4</b>.</span>
                                )}
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
                                    <span>Perlu {level.minWordsRequired} kata</span>
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
                  {selectedLevel && (
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
                                getSelectedLevelData()?.bgGlow,
                              )}
                            >
                              <span className="text-2xl">{getSelectedLevelData()?.emoji}</span>
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold">Level {getSelectedLevelData()?.name}</h3>
                              <p className={cn("text-sm font-medium", getSelectedLevelData()?.textColor)}>
                                {progressKosakata}/{getSelectedLevelData()?.minWordsRequired} kata dikuasai
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
                          <Button size="lg" className="px-8 py-6 text-lg" onClick={handleContinue}>
                            Lanjut ke Kuis Kosakata
                            <ArrowRight size={18} className="ml-2" />
                          </Button>
                          <p className="text-sm text-muted-foreground text-center">
                            Kamu akan mengerjakan soal kosakata sesuai level yang dipilih
                          </p>
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
    </DashboardLayout>
  )
}
