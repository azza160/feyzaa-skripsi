"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle, XCircle, Trophy, Star, Home, Target, Clock, Zap, Award, Eye, Brain, Calendar, AlertCircle, List, TrendingUp } from "lucide-react"
import { Link, router,usePage } from "@inertiajs/react"
import DashboardLayout from "../../Layouts/DashboardLayout"
import LevelUpAlert from "@/components/LevelUpAlert"
import ExpAlert from "@/components/ExpAlert"

// NoExpAlert Component
const NoExpAlert = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true)

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      if (onClose) onClose()
    }, 500)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Alert Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-hidden"
          >
            <div className="w-full max-w-md max-h-[90vh] flex flex-col">
              <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-700/30 flex-1 flex flex-col">
                {/* Content */}
                <div className="p-6 pt-8">
                  <div className="flex flex-col items-center text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="mb-4 bg-gradient-to-br from-slate-500 to-slate-600 p-4 rounded-xl shadow-lg"
                    >
                      <AlertCircle className="h-10 w-10 text-white" />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h2 className="text-xl font-medium text-slate-700 dark:text-slate-300 mb-1">注意！</h2>
                      <h1 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">
                        Tidak Ada EXP
                      </h1>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="mb-6"
                    >
                      <p className="text-slate-600 dark:text-slate-400">
                        Anda tidak mendapatkan EXP karena sudah menggunakan soal di kuis ini lebih dari 3 kali. 
                        Coba kuis lain untuk mendapatkan EXP!
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <Button
                        onClick={handleClose}
                        className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white"
                      >
                        Mengerti
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Achievement particles
const AchievementParticles = ({ show }) => {
  if (!show) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {Array.from({ length: 25 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: typeof window !== "undefined" ? window.innerWidth / 2 : 500,
            y: typeof window !== "undefined" ? window.innerHeight / 2 : 500,
            scale: 0,
            rotate: 0,
          }}
          animate={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
            scale: [0, 1, 0],
            rotate: 360,
          }}
          transition={{
            duration: 2.5,
            delay: Math.random() * 1,
            ease: "easeOut",
          }}
        >
          {i % 2 === 0 ? <Star className="w-4 h-4 text-yellow-400" /> : <Trophy className="w-4 h-4 text-yellow-500" />}
        </motion.div>
      ))}
    </div>
  )
}

// Wrapper
export default function ReviewQuisPageWrapper() {
  const { quizResults, user, currentLevel, currentExp, maxExp, nextLevelExp } = usePage().props
  if (!quizResults || !user || currentLevel === undefined || currentExp === undefined || maxExp === undefined) {
    return <div className="text-center text-red-500 p-10">Data review quiz tidak lengkap. Silakan kembali ke dashboard.</div>;
  }
  return (
    <ReviewQuisPage
      quizResults={quizResults}
      user={user}
      currentLevel={currentLevel}
      currentExp={currentExp}
      maxExp={maxExp}
      nextLevelExp={nextLevelExp}
    />
  )
}

// Komponen utama, semua hooks di sini
function ReviewQuisPage({ quizResults, user, currentLevel, currentExp, maxExp, nextLevelExp }) {
  const [isVisible, setIsVisible] = useState(true)
  const [currentView, setCurrentView] = useState("overview")
  const [expandedItems, setExpandedItems] = useState([])
  const [displayScore, setDisplayScore] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showLevelUpAlert, setShowLevelUpAlert] = useState(quizResults.leveledUp)
  const [showExpAlert, setShowExpAlert] = useState(quizResults.expGained > 0 && !quizResults.leveledUp)
  const [showNoExpAlert, setShowNoExpAlert] = useState(quizResults.expGained === 0)
  const [levelUpData, setLevelUpData] = useState({
    level: quizResults.newLevel,
    unlockedFeatures: quizResults.unlockedFeatures || []
  })
  const [expData, setExpData] = useState({
    currentExp: quizResults.currentExp,
    expGained: quizResults.expGained,
    nextLevelExp: quizResults.nextLevelExp
  })

  // Add useEffect to handle alerts
  useEffect(() => {
    if (quizResults.leveledUp) {
      setShowLevelUpAlert(true)
      setShowExpAlert(false)
      setShowNoExpAlert(false)
    } else if (quizResults.expGained > 0) {
      setShowLevelUpAlert(false)
      setShowExpAlert(true)
      setShowNoExpAlert(false)
    } else {
      setShowLevelUpAlert(false)
      setShowExpAlert(false)
      setShowNoExpAlert(true)
    }
  }, [quizResults])

  // Animate score counter
  useEffect(() => {
    const duration = 2000 // 2 seconds
    const steps = 60 // 60 steps
    const stepDuration = duration / steps
    const increment = quizResults.correctAnswers / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      setDisplayScore(Math.round(increment * currentStep))

      if (currentStep >= steps) {
        clearInterval(timer)
        setDisplayScore(quizResults.correctAnswers)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [quizResults.correctAnswers])

  // Trigger celebration for high scores
  useEffect(() => {
    if (displayScore === quizResults.correctAnswers && quizResults.percentage >= 80) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    }
  }, [displayScore])

  const handleClose = () => {
    setIsVisible(false)
  }

  const handleBackToQuiz = () => {
    router.visit(route("dashboard"))
  }

  // Get performance data
  const getPerformanceMessage = () => {
    if (quizResults.percentage >= 90)
      return {
        text: "Sempurna! 🎉",
        color: "text-green-600",
        bg: "bg-gradient-to-r from-green-50 to-emerald-50",
        icon: Trophy,
      }
    if (quizResults.percentage >= 80)
      return {
        text: "Luar Biasa! 👏",
        color: "text-blue-600",
        bg: "bg-gradient-to-r from-blue-50 to-indigo-50",
        icon: Star,
      }
    if (quizResults.percentage >= 70)
      return {
        text: "Bagus! 👍",
        color: "text-orange-600",
        bg: "bg-gradient-to-r from-orange-50 to-yellow-50",
        icon: Target,
      }
    return {
      text: "Terus Berlatih! 💪",
      color: "text-red-600",
      bg: "bg-gradient-to-r from-red-50 to-pink-50",
      icon: Award,
    }
  }

  const performance = getPerformanceMessage()
  const PerformanceIcon = performance.icon

  return (
    <DashboardLayout>
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
              <Link href={route("list-kosakata")}>
                <span className="text-violet-400 dark:text-violet-600">Kosakata Jepang</span>
              </Link>
              <span className="text-primary dark:text-violet-400">/</span>
              <span className="text-violet-400 dark:text-violet-600">Review Kuis</span>
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

          {/* Level Up Alert */}
          {showLevelUpAlert && (
            <LevelUpAlert
              isVisible={showLevelUpAlert}
              handleClose={() => setShowLevelUpAlert(false)}
              level={quizResults.newLevel}
              unlockedFeatures={quizResults.unlockedFeatures}
            />
          )}

          {/* Exp Alert */}
          {showExpAlert && (
            <ExpAlert
              onClose={() => setShowExpAlert(false)}
              currentExp={quizResults.currentExp}
              expGained={quizResults.expGained}
              nextLevelExp={quizResults.nextLevelExp}
              textAlert1="Selamat! Anda telah menyelesaikan kuis dan mendapatkan poin pengalaman."
            />
          )}

          {/* No Exp Alert */}
          {showNoExpAlert && (
            <NoExpAlert onClose={() => setShowNoExpAlert(false)} />
          )}

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Results Card */}
            <div className="bg-card/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-6 border border-border/50">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
                className="mb-6"
              >
                <PerformanceIcon className="w-20 h-20 text-primary mx-auto" />
              </motion.div>

              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-4">
                Hasil Kuis Kamu 🎉
              </h1>

              {/* Main Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                {/* Score */}
                <div className="text-center">
                  <motion.div
                    className="text-5xl md:text-6xl font-bold text-primary mb-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                  >
                    <motion.span
                      key={displayScore}
                      initial={{ scale: 1.3, color: "hsl(var(--primary))" }}
                      animate={{ scale: 1, color: "hsl(var(--primary))" }}
                      transition={{ duration: 0.3 }}
                    >
                      {displayScore}
                    </motion.span>
                    <span className="text-muted-foreground text-3xl">/{quizResults.totalQuestions}</span>
                  </motion.div>
                  <p className="text-sm text-muted-foreground font-medium">Jawaban Benar</p>
                </div>

                {/* Percentage */}
                <div className="text-center">
                  <motion.div
                    className="text-5xl md:text-6xl font-bold text-primary mb-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7, type: "spring" }}
                  >
                    {quizResults.percentage}%
                  </motion.div>
                  <p className="text-sm text-muted-foreground font-medium">Persentase</p>
                </div>

                {/* Time Spent */}
                <div className="text-center">
                  <motion.div
                    className="text-5xl md:text-6xl font-bold text-primary mb-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.9, type: "spring" }}
                  >
                    {Math.floor(quizResults.timeSpent / 60)}:{(quizResults.timeSpent % 60).toString().padStart(2, "0")}
                  </motion.div>
                  <p className="text-sm text-muted-foreground font-medium">Waktu</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Level {currentLevel}</span>
                  <span className="text-sm font-medium text-muted-foreground">
                    {currentExp}/{maxExp} EXP
                  </span>
                  </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentExp / maxExp) * 100}%` }}
                    transition={{ duration: 1, delay: 1 }}
                    className="h-full bg-gradient-to-r from-primary to-primary/80"
                  />
                </div>
              </div>

              {/* View Toggle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="flex justify-center mb-8"
              >
                <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-border/50">
                  <div className="flex gap-2">
                    <Button
                      variant={currentView === "overview" ? "default" : "ghost"}
                      onClick={() => setCurrentView("overview")}
                      className="rounded-xl"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Overview
                    </Button>
                    <Button
                      variant={currentView === "detailed" ? "default" : "ghost"}
                      onClick={() => setCurrentView("detailed")}
                      className="rounded-xl"
                    >
                      <Brain className="w-4 h-4 mr-2" />
                      Detail
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Content Area */}
          <AnimatePresence mode="wait">
            {currentView === "overview" && (
              <motion.div
                key="overview"
                  initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                >
                  <Card className="bg-card backdrop-blur-sm shadow-2xl border-border/50 relative overflow-hidden">
                      <div className="absolute inset-0 bg-primary/5"></div>
                      <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                    <CardHeader className="relative z-10">
                      <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
                        <div className="bg-primary p-2 rounded-xl shadow-lg">
                          <Eye className="w-7 h-7 text-primary-foreground" />
                        </div>
                        Ringkasan Hasil
                      </CardTitle>
                      <p className="text-muted-foreground">Gambaran umum tentang performa kuis kamu</p>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Performance Metrics */}
                        <div className="space-y-6">
                          <div className="bg-card/50 rounded-xl p-6 border border-border/50">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                              <Target className="w-5 h-5 text-primary" />
                              Performa
                            </h3>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Jawaban Benar</span>
                                <span className="font-semibold">{quizResults.correctAnswers}/{quizResults.totalQuestions}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Persentase</span>
                                <span className="font-semibold">{quizResults.percentage}%</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Waktu</span>
                                <span className="font-semibold">
                                  {Math.floor(quizResults.timeSpent / 60)}:{(quizResults.timeSpent % 60).toString().padStart(2, "0")}
                                </span>
                              </div>
                            </div>
                        </div>

                          <div className="bg-card/50 rounded-xl p-6 border border-border/50">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                              <Zap className="w-5 h-5 text-primary" />
                              EXP & Level
                            </h3>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">EXP Didapat</span>
                                <span className="font-semibold">+{quizResults.expGained}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Level Saat Ini</span>
                                <span className="font-semibold">{currentLevel}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">EXP Total</span>
                                <span className="font-semibold">{currentExp}/{maxExp}</span>
                              </div>
                            </div>
                        </div>
                        </div>

                        {/* Progress Chart */}
                        <div className="bg-card/50 rounded-xl p-6 border border-border/50">
                          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-primary" />
                            Grafik Performa
                          </h3>
                          <div className="h-[300px] flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-6xl mb-4">📊</div>
                              <p className="text-muted-foreground">Grafik performa akan ditampilkan di sini</p>
                            </div>
                          </div>
                        </div>
                        </div>
                      </CardContent>
                    </Card>
              </motion.div>
            )}

            {currentView === "detailed" && (
              <motion.div
                key="detailed"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="bg-card backdrop-blur-sm shadow-2xl border-border/50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/5"></div>
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
                      <div className="bg-primary p-2 rounded-xl shadow-lg">
                        <Brain className="w-7 h-7 text-primary-foreground" />
                      </div>
                      Review Detail Jawaban
                    </CardTitle>
                    <p className="text-muted-foreground">Analisis mendalam untuk setiap soal yang telah dijawab</p>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <Accordion type="multiple" value={expandedItems} onValueChange={setExpandedItems}>
                      {quizResults.answers.map((answer, index) => (
                        <AccordionItem key={answer.id} value={`item-${answer.id}`} className="border-b border-gray-200">
                          <AccordionTrigger className="hover:no-underline py-6">
                            <div className="flex items-center justify-between w-full pr-4">
                              <div className="flex items-center gap-4">
                                <div
                                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shadow-lg ${
                                    answer.isCorrect
                                      ? "bg-gradient-to-br from-green-400 to-green-600 text-white"
                                      : "bg-gradient-to-br from-red-400 to-red-600 text-white"
                                  }`}
                                >
                                  {index + 1}
                                </div>
                                <div className="text-left">
                                  <div className="font-bold text-gray-800 text-lg mb-1">
                                    {/* Tampilkan label kosakata: kanji (romaji) */}
                                    {answer.kosakata_label_kanji || answer.kosakata_label_romaji ? (
                                      <>
                                        <span className="text-3xl text-indigo-700 dark:text-yellow-200 ml-2">{answer.kosakata_label_kanji}</span>
                                        <span className="text-lg text-gray-600 ml-2">({answer.kosakata_label_romaji || ''})</span>
                                      </>
                                    ) : (
                                      <span className="text-base text-gray-500 ml-2">(Soal Kosakata)</span>
                                    )}
                                  </div>
                                  <div className="text-sm text-gray-600 mb-2">{answer.soal_arti}</div>
                                  <div className="flex items-center gap-2">
                                    <Badge className="text-xs bg-yellow-100 text-yellow-700">
                                      <Zap className="w-3 h-3 mr-1" />+{answer.expGained} EXP
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
  <div className="space-y-6 p-4">
    {/* Soal Blank */}
    <div>
      <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
        <Target className="w-4 h-4 text-indigo-600" />
        Soal (Blank):
      </h4>
      <div className="space-y-3">
        {/* Kanji */}
        <div className="rounded-xl border bg-white dark:bg-slate-900 shadow-sm p-4 flex flex-col items-start">
          <span className="text-xs font-semibold uppercase text-gray-500 mb-1">Kanji</span>
          <span className="text-lg font-mono tracking-wide text-gray-900 dark:text-white">{(answer.soal_kanji || '').replace(/_{2,}/g, '「____」')}</span>
        </div>
        {/* Furigana */}
        <div className="rounded-xl border bg-white dark:bg-slate-900 shadow-sm p-4 flex flex-col items-start">
          <span className="text-xs font-semibold uppercase text-gray-500 mb-1">Furigana</span>
          <span className="text-lg font-mono tracking-wide text-gray-900 dark:text-white">{(answer.soal_furigana || '').replace(/_{2,}/g, '「____」')}</span>
        </div>
        {/* Romaji */}
        <div className="rounded-xl border bg-white dark:bg-slate-900 shadow-sm p-4 flex flex-col items-start">
          <span className="text-xs font-semibold uppercase text-gray-500 mb-1">Romaji</span>
          <span className="text-lg font-mono tracking-wide text-gray-900 dark:text-white">{(answer.soal_romaji || '').replace(/_{2,}/g, '「____」')}</span>
        </div>
        {/* Arti */}
        <div className="rounded-xl border bg-white dark:bg-slate-900 shadow-sm p-4 flex flex-col items-start">
          <span className="text-xs font-semibold uppercase text-gray-500 mb-1">Arti</span>
          <span className="text-lg font-mono tracking-wide text-gray-900 dark:text-white">{(answer.soal_arti || '').replace(/_{2,}/g, '「____」')}</span>
        </div>
      </div>
    </div>

    {/* Jawaban Pengguna */}
    <div>
      <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
        <List className="w-4 h-4 text-indigo-600" />
        Jawaban Kamu:
      </h4>
      {answer.options.find(opt => opt.id === answer.userAnswer) ? (
        <div className={`p-4 rounded-xl border-2 ${answer.isCorrect ? "border-green-300 bg-green-50 text-green-800" : "border-red-300 bg-red-50 text-red-800"} flex flex-col gap-1`}>
          <span className="font-bold mr-2">{answer.options.find(opt => opt.id === answer.userAnswer).id.toUpperCase()}.</span>
          <span className="text-lg text-indigo-700 dark:text-yellow-200">{answer.options.find(opt => opt.id === answer.userAnswer).kanji}</span>
          <span className="text-indigo-500">{answer.options.find(opt => opt.id === answer.userAnswer).furigana}</span>
          <span className="text-indigo-400">{answer.options.find(opt => opt.id === answer.userAnswer).romaji}</span>
          <span className="text-gray-700">{answer.options.find(opt => opt.id === answer.userAnswer).arti}</span>
        </div>
      ) : (
        <div className="p-4 rounded-xl border-2 border-gray-300 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700">
          <span className="font-bold text-xl">-</span>
          <p className="text-sm mt-2 opacity-80">Kamu tidak menjawab soal ini</p>
        </div>
      )}
    </div>

    {/* Jawaban Benar */}
    <div>
      <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
        <CheckCircle className="w-4 h-4 text-green-600" />
        Jawaban Benar:
      </h4>
      {answer.correctAnswer ? (
        <div className="p-4 rounded-xl border-2 border-green-300 bg-gradient-to-r from-green-50 to-green-100 text-green-800 flex flex-col gap-1">
          <span className="font-bold mr-2">{answer.correctAnswer.id.toUpperCase()}.</span>
          <span className="text-lg text-indigo-700 dark:text-yellow-200">{answer.correctAnswer.kanji}</span>
          <span className="text-indigo-500">{answer.correctAnswer.furigana}</span>
          <span className="text-indigo-400">{answer.correctAnswer.romaji}</span>
          <span className="text-gray-700">{answer.correctAnswer.arti}</span>
        </div>
      ) : null}
    </div>

    {/* Opsi Jawaban */}
    <div>
      <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
        <List className="w-4 h-4 text-indigo-600" />
        Opsi Jawaban:
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {answer.options.map((option, idx) => {
          let className = "p-3 rounded-lg border flex flex-col gap-1";
          if (option.id === answer.userAnswer && option.id === answer.correctAnswer?.id) className += " border-green-400 bg-green-50 text-green-800 font-bold";
          else if (option.id === answer.userAnswer && option.id !== answer.correctAnswer?.id) className += " border-red-400 bg-red-50 text-red-800 font-bold";
          else if (option.id === answer.correctAnswer?.id) className += " border-green-300 bg-green-100 text-green-800";
          else className += " border-gray-200 bg-white dark:bg-slate-800";
          return (
            <div key={option.id} className={className}>
              <span className="font-bold mr-2">{option.id.toUpperCase()}.</span>
              <span className="text-lg text-indigo-700 dark:text-yellow-200">{option.kanji}</span>
              <span className="text-indigo-500">{option.furigana}</span>
              <span className="text-indigo-400">{option.romaji}</span>
              <span className="text-gray-700">{option.arti}</span>
            </div>
          );
        })}
      </div>
    </div>

    {/* Soal Filled */}
    <div>
      <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
        <CheckCircle className="w-4 h-4 text-green-600" />
        Soal (Filled):
      </h4>
      <div className="space-y-3">
        {/* Kanji */}
        <div className="rounded-xl border bg-green-50 dark:bg-green-900/30 shadow-sm p-4 flex flex-col items-start">
          <span className="text-xs font-semibold uppercase text-gray-500 mb-1">Kanji</span>
          <span className="text-lg font-mono tracking-wide text-gray-900 dark:text-white">{answer.soal_filled_kanji}</span>
        </div>
        {/* Furigana */}
        <div className="rounded-xl border bg-green-50 dark:bg-green-900/30 shadow-sm p-4 flex flex-col items-start">
          <span className="text-xs font-semibold uppercase text-gray-500 mb-1">Furigana</span>
          <span className="text-lg font-mono tracking-wide text-gray-900 dark:text-white">{answer.soal_filled_furigana}</span>
        </div>
        {/* Romaji */}
        <div className="rounded-xl border bg-green-50 dark:bg-green-900/30 shadow-sm p-4 flex flex-col items-start">
          <span className="text-xs font-semibold uppercase text-gray-500 mb-1">Romaji</span>
          <span className="text-lg font-mono tracking-wide text-gray-900 dark:text-white">{answer.soal_filled_romaji}</span>
        </div>
        {/* Arti */}
        <div className="rounded-xl border bg-green-50 dark:bg-green-900/30 shadow-sm p-4 flex flex-col items-start">
          <span className="text-xs font-semibold uppercase text-gray-500 mb-1">Arti</span>
          <span className="text-lg font-mono tracking-wide text-gray-900 dark:text-white">{answer.soal_filled_arti}</span>
        </div>
      </div>
    </div>
  </div>
</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

            {/* Back Button */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="flex justify-center"
          >
            <Button
              onClick={handleBackToQuiz}
              size="lg"
              className="flex items-center gap-2 hover:scale-105 transition-all duration-300 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg px-8 py-4 text-lg"
            >
              <Home className="w-5 h-5" />
              Kembali ke Menu Utama
            </Button>
          </motion.div>

          {/* Motivational Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-center mt-8"
          >
              <p className="text-muted-foreground">
                    {quizResults.percentage >= 80
                  ? "Kamu luar biasa! Terus pertahankan semangat belajarmu! 🌟"
                  : "Jangan menyerah! Setiap kesalahan adalah kesempatan untuk belajar. 💪"}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  )
}
