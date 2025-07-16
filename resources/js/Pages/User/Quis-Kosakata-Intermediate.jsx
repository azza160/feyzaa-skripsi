"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { X, Clock, CheckCircle, XCircle, Eye, EyeOff, ArrowRight, Trophy, BookOpen, GraduationCap } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import DashboardLayout from "../../Layouts/DashboardLayout"
import { router } from "@inertiajs/react"
import { usePage } from "@inertiajs/react"

// Sample vocabulary quiz data
const quizData = [
  {
    id: 1,
    question: "Apa arti dari kosakata ini?",
    kosakata: {
      kanji: "学生",
      furigana: "がくせい",
      romaji: "gakusei",
    },
    options: [
      { id: "A", text: "Guru", isCorrect: false },
      { id: "B", text: "Mahasiswa", isCorrect: true },
      { id: "C", text: "Siswa", isCorrect: false },
      { id: "D", text: "Dosen", isCorrect: false },
    ],
  },
  {
    id: 2,
    question: "Apa arti dari kosakata ini?",
    kosakata: {
      kanji: "食べ物",
      furigana: "たべもの",
      romaji: "tabemono",
    },
    options: [
      { id: "A", text: "Minuman", isCorrect: false },
      { id: "B", text: "Makanan", isCorrect: true },
      { id: "C", text: "Pakaian", isCorrect: false },
      { id: "D", text: "Kendaraan", isCorrect: false },
    ],
  },
  {
    id: 3,
    question: "Apa arti dari kosakata ini?",
    kosakata: {
      kanji: "友達",
      furigana: "ともだち",
      romaji: "tomodachi",
    },
    options: [
      { id: "A", text: "Keluarga", isCorrect: false },
      { id: "B", text: "Teman", isCorrect: true },
      { id: "C", text: "Tetangga", isCorrect: false },
      { id: "D", text: "Guru", isCorrect: false },
    ],
  },
  {
    id: 4,
    question: "Apa arti dari kosakata ini?",
    kosakata: {
      kanji: "本",
      furigana: "ほん",
      romaji: "hon",
    },
    options: [
      { id: "A", text: "Buku", isCorrect: true },
      { id: "B", text: "Pensil", isCorrect: false },
      { id: "C", text: "Kertas", isCorrect: false },
      { id: "D", text: "Meja", isCorrect: false },
    ],
  },
  {
    id: 5,
    question: "Apa arti dari kosakata ini?",
    kosakata: {
      kanji: "水",
      furigana: "みず",
      romaji: "mizu",
    },
    options: [
      { id: "A", text: "Api", isCorrect: false },
      { id: "B", text: "Udara", isCorrect: false },
      { id: "C", text: "Air", isCorrect: true },
      { id: "D", text: "Tanah", isCorrect: false },
    ],
  },
  {
    id: 6,
    question: "Apa arti dari kosakata ini?",
    kosakata: {
      kanji: "時間",
      furigana: "じかん",
      romaji: "jikan",
    },
    options: [
      { id: "A", text: "Tempat", isCorrect: false },
      { id: "B", text: "Waktu", isCorrect: true },
      { id: "C", text: "Orang", isCorrect: false },
      { id: "D", text: "Barang", isCorrect: false },
    ],
  },
  {
    id: 7,
    question: "Apa arti dari kosakata ini?",
    kosakata: {
      kanji: "家族",
      furigana: "かぞく",
      romaji: "kazoku",
    },
    options: [
      { id: "A", text: "Keluarga", isCorrect: true },
      { id: "B", text: "Teman", isCorrect: false },
      { id: "C", text: "Tetangga", isCorrect: false },
      { id: "D", text: "Rekan", isCorrect: false },
    ],
  },
  {
    id: 8,
    question: "Apa arti dari kosakata ini?",
    kosakata: {
      kanji: "車",
      furigana: "くるま",
      romaji: "kuruma",
    },
    options: [
      { id: "A", text: "Sepeda", isCorrect: false },
      { id: "B", text: "Motor", isCorrect: false },
      { id: "C", text: "Mobil", isCorrect: true },
      { id: "D", text: "Bus", isCorrect: false },
    ],
  },
  {
    id: 9,
    question: "Apa arti dari kosakata ini?",
    kosakata: {
      kanji: "学校",
      furigana: "がっこう",
      romaji: "gakkou",
    },
    options: [
      { id: "A", text: "Rumah", isCorrect: false },
      { id: "B", text: "Sekolah", isCorrect: true },
      { id: "C", text: "Kantor", isCorrect: false },
      { id: "D", text: "Toko", isCorrect: false },
    ],
  },
  {
    id: 10,
    question: "Apa arti dari kosakata ini?",
    kosakata: {
      kanji: "日本語",
      furigana: "にほんご",
      romaji: "nihongo",
    },
    options: [
      { id: "A", text: "Bahasa Inggris", isCorrect: false },
      { id: "B", text: "Bahasa Indonesia", isCorrect: false },
      { id: "C", text: "Bahasa Jepang", isCorrect: true },
      { id: "D", text: "Bahasa Korea", isCorrect: false },
    ],
  },
]

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 15 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-indigo-300 rounded-full opacity-20"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
          }}
          animate={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

// Quiz completion component
const QuizCompletion = ({ isTimeUp, reviewResult, reviewLoading, reviewError, onViewReview, onExitQuis }) => {
  if (reviewLoading) {
    return <div className="flex items-center justify-center p-8">Loading hasil kuis...</div>
  }
  if (reviewError) {
    return <div className="flex items-center justify-center p-8 text-red-500">{reviewError}</div>
  }
  if (!reviewResult) {
    return null
  }
  const { correctAnswers, totalQuestions, answers = [] } = reviewResult
  const wrongCount = totalQuestions - correctAnswers
  const percent = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0
  return (
    <div className="flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg w-full"
      >
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-slate-700/40">
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            {isTimeUp ? (
              <>
                <Clock className="w-20 h-20 text-orange-500 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Waktu Habis!</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Waktu kuis telah berakhir. Jangan khawatir, kamu sudah berusaha dengan baik!
                </p>
              </>
            ) : (
              <>
                <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Kuis Selesai!</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Selamat! Kamu telah menyelesaikan semua soal dalam kuis ini.</p>
              </>
            )}

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/60 dark:to-purple-900/60 rounded-2xl p-6 mb-8 border border-indigo-100 dark:border-indigo-700">
              <div className="flex flex-col gap-2 items-center justify-center">
                <div className="flex items-center gap-4 justify-center mb-2">
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold text-green-600 dark:text-green-300">{correctAnswers}</span>
                    <span className="text-xs text-green-700 dark:text-green-300">Benar</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-400 dark:text-gray-500">/</span>
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold text-red-500 dark:text-red-400">{wrongCount}</span>
                    <span className="text-xs text-red-600 dark:text-red-400">Salah</span>
                  </div>
                </div>
                <div className="text-lg font-semibold text-purple-600 dark:text-purple-300 mt-2">Skor Akhir: {correctAnswers} dari {totalQuestions} soal ({percent}%)</div>
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-900/40 border border-red-200 dark:border-red-700 rounded-xl p-4 mb-6 flex flex-col items-center">
              <span className="text-red-700 dark:text-red-200 font-semibold text-base mb-1">Peringatan!</span>
              <span className="text-sm text-red-700 dark:text-red-200 text-center">
                Jika kamu keluar dari halaman ini tanpa menekan tombol di bawah, data kuis akan dihapus dan EXP tidak akan didapatkan.
              </span>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="w-full max-w-xs mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg text-[13px] sm:text-base break-words"
                onClick={onViewReview}
              >
                <Eye className="w-5 h-5 mr-2" />
                Selesai Kuis dan Lihat Review Jawaban
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default function VocabularyQuizPage() {
  const { quizData, remainingTime: initialTime, sessionId, jenis, level, currentQuestionIndex, userAnswers, ended } = usePage().props

  // State untuk jawaban backend agar selalu akurat
  const [backendAnswers, setBackendAnswers] = useState(userAnswers || [])
  // Panggil semua hooks di sini dulu!
  const [currentQuestion, setCurrentQuestion] = useState(currentQuestionIndex)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answers, setAnswers] = useState([])
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const [isAnswered, setIsAnswered] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isQuizComplete, setIsQuizComplete] = useState(false)
  const [isTimeUp, setIsTimeUp] = useState(false)
  const [exitDialogOpen, setExitDialogOpen] = useState(false)
  // Inisialisasi showCompletion dengan ended dari backend
  const [showCompletion, setShowCompletion] = useState(!!ended)
  const [hideFurigana, setHideFurigana] = useState(false)
  const [hideRomaji, setHideRomaji] = useState(false)
  // Tambah state untuk timer per soal
  const [questionStartTime, setQuestionStartTime] = useState(Date.now())
  // Tambahkan state untuk hasil review
  const [reviewResult, setReviewResult] = useState(null)
  const [reviewLoading, setReviewLoading] = useState(false)
  const [reviewError, setReviewError] = useState(null)

  const controls = useAnimation()
  const vocabularyRef = useRef(null)

  // Sync showCompletion jika ended berubah ke true
  useEffect(() => {
    if (ended) setShowCompletion(true)
  }, [ended])

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !isQuizComplete && !showCompletion) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showCompletion) {
      setIsTimeUp(true)
      handleQuizComplete()
    }
  }, [timeLeft, isQuizComplete, showCompletion])

  useEffect(() => {
    setQuestionStartTime(Date.now())
  }, [currentQuestion])

  useEffect(() => {
    controls.start({
      scale: [0.8, 1.1, 1],
      rotate: [0, 2, -2, 0],
      transition: { duration: 0.6, ease: "easeOut" },
    })
  }, [currentQuestion, controls])

  // Progress bar color
  const getProgressColor = () => {
    const percentage = (timeLeft / initialTime) * 100
    if (percentage > 60) return "from-green-400 to-green-600"
    if (percentage > 30) return "from-orange-400 to-orange-600"
    return "from-red-400 to-red-600"
  }

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Handle answer selection
  const handleAnswerSelect = async (optionId) => {
    if (isAnswered) return
    const soal = quizData[currentQuestion]
    let selectedOption, isCorrect, selectedText
    // Mapping index ke opsi
    const idx = optionId.charCodeAt(0) - 65
    if (soal.type === 'jp_to_id') {
      selectedOption = soal.options[idx]
      isCorrect = selectedOption === soal.answer
      selectedText = selectedOption
    } else if (soal.type === 'id_to_jp') {
      selectedOption = soal.options[idx]
      isCorrect = selectedOption && selectedOption.kanji === soal.answer
      selectedText = selectedOption ? selectedOption.kanji : ''
    }
    if (!selectedOption) return // prevent error
    setSelectedAnswer(optionId)
    setIsAnswered(true)
    setShowFeedback(true)
    // Hitung waktu jawab
    const waktuJawab = Math.floor((Date.now() - questionStartTime) / 1000)
    // Save ke backend
    try {
      await fetch(route('save-quis-kosakata-answer'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        },
        body: JSON.stringify({
          sessionId,
          questionIndex: currentQuestion,
          selectedAnswer: optionId,
          isCorrect,
          waktuJawab,
          remainingTime: timeLeft,
        }),
        credentials: 'same-origin',
      })
    } catch (err) {
      alert('Gagal menyimpan jawaban ke server!')
    }
    // Save answer locally
    const newAnswer = {
      questionId: soal.kosakata_id || soal.id,
      selectedOption: optionId,
      isCorrect,
      question: soal.question,
      kosakata: soal.kanji || soal.arti,
      correctAnswer: soal.answer,
      selectedText,
      waktuJawab,
    }
    setAnswers((prev) => [...prev, newAnswer])
    // Vocabulary shake animation for wrong answer
    if (!isCorrect) {
      controls.start({
        x: [-8, 8, -8, 8, 0],
        transition: { duration: 0.4 },
      })
    }
    // Auto advance after feedback
    setTimeout(() => {
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion((prev) => prev + 1)
        setSelectedAnswer(null)
        setIsAnswered(false)
        setShowFeedback(false)
      } else {
        handleQuizComplete()
      }
    }, 1500)
  }

  // Complete quiz
  const handleQuizComplete = async () => {
    setIsQuizComplete(true)
    // Fetch endpoint review-quis-kosakata agar backendAnswers selalu benar
    try {
      const response = await fetch(route('review-quis-kosakata', { sessionId }), {
        headers: { 'Accept': 'application/json' },
        credentials: 'same-origin',
      })
      if (response.ok) {
        const data = await response.json()
        // Cek jika data.quizResults.answers ada dan array
        if (data && data.props && Array.isArray(data.props.quizResults?.answers)) {
          setBackendAnswers(data.props.quizResults.answers)
        }
      }
    } catch (err) {
      // fallback: tetap pakai userAnswers dari props
    }
    setShowCompletion(true)
  }

  // View review
  const handleViewReview = () => {
    // Redirect ke halaman review quis kosakata
    router.visit(route('review-quis-kosakata', { sessionId }))
  }

  // Tambah handler keluar
  const handleExitQuis = async () => {
    try {
      await fetch(route('delete-quis-kosakata-session'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        },
        body: JSON.stringify({ sessionId }),
        credentials: 'same-origin',
      })
    } catch (err) {}
    router.visit(route('dashboard'))
  }

  // Exit quiz
  const handleExitQuiz = () => {
    setExitDialogOpen(false)
    router.visit(route('dashboard'))
  }

  // Helper: Render options for both types
  const renderOptions = (soal, onSelect, selected, isAnswered, showFeedback) => {
    if (soal.type === 'jp_to_id') {
      // Opsi: array of string (arti)
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {soal.options.map((option, idx) => {
            const optionId = String.fromCharCode(65 + idx) // 'A', 'B', ...
            const isSelected = selected === optionId
            const isCorrect = option === soal.answer
            const showResult = showFeedback && isSelected
            return (
              <motion.div
                key={optionId}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.2 + idx * 0.1, duration: 0.4, type: "spring" }}
                whileHover={!isAnswered ? { scale: 1.03, y: -4 } : {}}
                whileTap={!isAnswered ? { scale: 0.97 } : {}}
                className="relative group"
              >
                <div
                  className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 ${isAnswered ? "cursor-not-allowed" : ""}`}
                  onClick={() => onSelect(optionId)}
                >
                  {/* Background gradient, border, etc. (reuse existing logic) */}
                  <div className={`absolute inset-0 transition-all duration-300 ${showResult ? (isCorrect ? "bg-gradient-to-br from-green-400 via-green-500 to-emerald-600 dark:from-green-500 dark:via-green-600 dark:to-emerald-700" : "bg-gradient-to-br from-red-400 via-red-500 to-rose-600 dark:from-red-500 dark:via-red-600 dark:to-rose-700") : isSelected ? "bg-gradient-to-br from-indigo-400 via-indigo-500 to-purple-600 dark:from-indigo-500 dark:via-indigo-600 dark:to-purple-700" : "bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-600 group-hover:from-indigo-50 group-hover:via-blue-50 group-hover:to-indigo-100 dark:group-hover:from-indigo-900 dark:group-hover:via-blue-900 dark:group-hover:to-indigo-800"}`}/>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/5" />
                  <div className={`absolute inset-0 rounded-2xl border-2 transition-all duration-300 ${showResult ? (isCorrect ? "border-green-300 dark:border-green-500" : "border-red-300 dark:border-red-500") : isSelected ? "border-indigo-300 dark:border-indigo-500" : "border-gray-200 dark:border-slate-700 group-hover:border-indigo-200 dark:group-hover:border-indigo-500"}`}/>
                  <div className="relative z-10 p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <motion.div className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg transition-all duration-300 ${showResult ? (isCorrect ? "bg-white dark:bg-slate-800 text-green-600 dark:text-green-400" : "bg-white dark:bg-slate-800 text-red-600 dark:text-red-400") : isSelected ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400" : "bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 text-white group-hover:from-indigo-600 group-hover:to-purple-700 dark:group-hover:from-indigo-700 dark:group-hover:to-purple-800"}`} whileHover={!isAnswered ? { scale: 1.1, rotate: 5 } : {}} whileTap={!isAnswered ? { scale: 0.9 } : {}}>{optionId}</motion.div>
                      <span className={`text-xl font-bold transition-all duration-300 ${showResult || isSelected ? "text-white" : "text-gray-800 dark:text-gray-200 group-hover:text-indigo-700 dark:group-hover:text-indigo-300"}`}>{option}</span>
                    </div>
                    {showResult && (
                      <motion.div initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }} className="bg-white dark:bg-slate-800 rounded-full p-2">
                        {isCorrect ? <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400" /> : <XCircle className="w-6 h-6 text-red-500 dark:text-red-400" />}
                      </motion.div>
                    )}
                  </div>
                  {!isAnswered && (<motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent dark:via-white/5" initial={{ x: "-100%" }} whileHover={{ x: "100%" }} transition={{ duration: 0.6 }}/>) }
                </div>
              </motion.div>
            )})}
        </div>
      )
    } else if (soal.type === 'id_to_jp') {
      // Opsi: array of {kanji, furigana, romaji}
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {soal.options.map((option, idx) => {
            const optionId = String.fromCharCode(65 + idx)
            const isSelected = selected === optionId
            const isCorrect = option.kanji === soal.answer
            const showResult = showFeedback && isSelected
            return (
              <motion.div
                key={optionId}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.2 + idx * 0.1, duration: 0.4, type: "spring" }}
                whileHover={!isAnswered ? { scale: 1.03, y: -4 } : {}}
                whileTap={!isAnswered ? { scale: 0.97 } : {}}
                className="relative group"
              >
                <div
                  className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 ${isAnswered ? "cursor-not-allowed" : ""}`}
                  onClick={() => onSelect(optionId)}
                >
                  <div className={`absolute inset-0 transition-all duration-300 ${showResult ? (isCorrect ? "bg-gradient-to-br from-green-400 via-green-500 to-emerald-600 dark:from-green-500 dark:via-green-600 dark:to-emerald-700" : "bg-gradient-to-br from-red-400 via-red-500 to-rose-600 dark:from-red-500 dark:via-red-600 dark:to-rose-700") : isSelected ? "bg-gradient-to-br from-indigo-400 via-indigo-500 to-purple-600 dark:from-indigo-500 dark:via-indigo-600 dark:to-purple-700" : "bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-600 group-hover:from-indigo-50 group-hover:via-blue-50 group-hover:to-indigo-100 dark:group-hover:from-indigo-900 dark:group-hover:via-blue-900 dark:group-hover:to-indigo-800"}`}/>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/5" />
                  <div className={`absolute inset-0 rounded-2xl border-2 transition-all duration-300 ${showResult ? (isCorrect ? "border-green-300 dark:border-green-500" : "border-red-300 dark:border-red-500") : isSelected ? "border-indigo-300 dark:border-indigo-500" : "border-gray-200 dark:border-slate-700 group-hover:border-indigo-200 dark:group-hover:border-indigo-500"}`}/>
                  <div className="relative z-10 p-6 flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="text-2xl font-bold">{option.kanji}</span>
                      {!hideFurigana && <span className="text-md text-indigo-200">{option.furigana}</span>}
                      {!hideRomaji && <span className="text-sm text-indigo-300">{option.romaji}</span>}
                    </div>
                    {showResult && (
                      <motion.div initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }} className="bg-white dark:bg-slate-800 rounded-full p-2">
                        {isCorrect ? <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400" /> : <XCircle className="w-6 h-6 text-red-500 dark:text-red-400" />}
                      </motion.div>
                    )}
                  </div>
                  {!isAnswered && (<motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent dark:via-white/5" initial={{ x: "-100%" }} whileHover={{ x: "100%" }} transition={{ duration: 0.6 }}/>) }
                </div>
              </motion.div>
            )})}
        </div>
      )
    }
    return null
  }

  // Saat showCompletion true, fetch hasil review dari backend
  useEffect(() => {
    if (showCompletion && sessionId) {
      setReviewLoading(true)
      setReviewError(null)
      fetch(route('review-quis-kosakata', { sessionId }), {
        headers: { 'Accept': 'application/json' },
        credentials: 'same-origin',
      })
        .then(res => {
          if (!res.ok) throw new Error('Gagal mengambil hasil review')
          return res.json()
        })
        .then(data => {
          setReviewResult(data.quizResults)
          setReviewLoading(false)
        })
        .catch(err => {
          setReviewError('Gagal mengambil hasil review dari server.')
          setReviewLoading(false)
        })
    }
  }, [showCompletion, sessionId])

  return (
    <DashboardLayout>
      {/* Cek jika data quiz tidak ada */}
      {(!quizData || !Array.isArray(quizData) || quizData.length === 0) ? (
        <div className="text-center text-red-500 p-10">
          Data quiz tidak ditemukan. Silakan mulai ulang dari dashboard.
        </div>
      ) : showCompletion ? (
        <QuizCompletion
          isTimeUp={isTimeUp}
          reviewResult={reviewResult}
          reviewLoading={reviewLoading}
          reviewError={reviewError}
          onViewReview={handleViewReview}
          onExitQuis={handleExitQuis}
        />
      ) : !quizData[currentQuestion] ? (
        null
      ) : (
        <div className="text-foreground">
          <div className="max-w-6xl mx-auto px-4">
            {/* Guide Section */}
            <div className="pt-8 mb-8">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-semibold text-gray-800 dark:text-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg px-4 py-3 hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-800/30 dark:hover:to-purple-800/30 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <span>Panduan Kuis Kosakata</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400">
                    <div className="space-y-4 p-4 bg-gradient-to-br from-white/50 to-indigo-50/50 dark:from-slate-800/50 dark:to-indigo-900/50 rounded-lg border border-indigo-100 dark:border-indigo-800">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mt-1">
                          <GraduationCap className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-200 mb-2">Selamat datang di Kuis Kosakata Jepang!</p>
                          <p className="text-sm">Berikut adalah beberapa panduan untuk mengikuti kuis:</p>
                        </div>
                      </div>
                      <ul className="list-none space-y-3 ml-8">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                          <span>Kuis terdiri dari <strong>{quizData.length} soal</strong> pilihan ganda</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>Waktu pengerjaan adalah <strong>{Math.floor(initialTime / 60)} menit</strong></span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                          <span>Setiap soal menampilkan kosakata Jepang dengan kanji, furigana, dan romaji</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Pilih arti yang tepat dalam bahasa Indonesia</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Setiap jawaban benar akan mendapatkan poin</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span>Jawaban salah tidak akan mengurangi poin</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span>Kamu dapat melihat hasil kuis setelah selesai</span>
                        </li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="bg-transparent relative overflow-hidden rounded-md">
              <FloatingParticles />

              {/* Header */}
              <div className="bg-white/30 dark:bg-slate-900/80 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto px-4 py-4 pb-5">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Kuis Kosakata – {level}
                      </h1>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Soal {currentQuestion + 1} dari {quizData.length}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Hide Furigana Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setHideFurigana(!hideFurigana)}
                        className="text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-slate-800/50 flex items-center gap-2"
                      >
                        {hideFurigana ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        {hideFurigana ? "Tampilkan" : "Sembunyikan"} Furigana
                      </Button>

                      {/* Hide Romaji Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setHideRomaji(!hideRomaji)}
                        className="text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-slate-800/50 flex items-center gap-2"
                      >
                        {hideRomaji ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        {hideRomaji ? "Tampilkan" : "Sembunyikan"} Romaji
                      </Button>

                      {/* Exit Button */}
                      <Dialog open={exitDialogOpen} onOpenChange={setExitDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 bg-transparent"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Keluar
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md bg-background dark:bg-slate-900 border-border dark:border-slate-800">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-foreground dark:text-white">
                              <X className="w-5 h-5 text-red-500" />
                              Keluar dari Kuis?
                            </DialogTitle>
                            <DialogDescription className="text-muted-foreground dark:text-slate-400">
                              Progress kamu akan hilang jika keluar sekarang. Yakin ingin keluar?
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter className="gap-2">
                            <Button variant="outline" onClick={() => setExitDialogOpen(false)}>
                              Batal
                            </Button>
                            <Button variant="destructive" onClick={handleExitQuiz}>
                              Ya, Keluar
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timer */}
              <div className="bg-white/30 dark:bg-slate-900/60">
                <div className="max-w-6xl mx-auto px-4 py-3 pb-[30px]">
                  <div className="flex items-center gap-3">
                    <Clock className={`w-5 h-5 ${timeLeft < 30 ? "text-red-500" : "text-gray-500 dark:text-gray-400"}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Waktu Tersisa</span>
                        <span
                          className={`text-sm font-bold ${timeLeft < 30 ? "text-red-600" : "text-gray-800 dark:text-gray-200"}`}
                        >
                          {formatTime(timeLeft)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className={`h-2 rounded-full bg-gradient-to-r ${getProgressColor()}`}
                          initial={{ width: "100%" }}
                          animate={{ width: `${(timeLeft / initialTime) * 100}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="max-w-6xl mx-auto px-4 py-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 50, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {/* Question Area */}
                    <div className="text-center mb-8">
                      <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        className="relative"
                      >
                        <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 backdrop-blur-sm rounded-md shadow-md p-8 mb-6 border border-white/30 dark:border-slate-700/30 relative overflow-hidden">
                          {/* Decorative elements */}
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-indigo-200 to-purple-200 dark:from-indigo-800 dark:to-purple-800 rounded-full opacity-20 blur-2xl"></div>
                          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-blue-200 to-indigo-200 dark:from-blue-800 dark:to-indigo-800 rounded-full opacity-20 blur-2xl"></div>

                          <div className="relative z-10">
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                              className="mb-6"
                            >
                              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 px-4 py-2 rounded-full border border-indigo-200 dark:border-indigo-800 mb-4">
                                <div className="w-2 h-2 bg-indigo-500 dark:bg-indigo-400 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                                  Soal {currentQuestion + 1}
                                </span>
                              </div>
                            </motion.div>

                            <motion.h2
                              className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6 leading-relaxed"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.3 }}
                            >
                              {quizData[currentQuestion].question}
                            </motion.h2>

                            {/* Render soal utama sesuai tipe */}
                            {quizData[currentQuestion].type === 'jp_to_id' ? (
                              <motion.div
                                ref={vocabularyRef}
                                animate={controls}
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                                className="inline-flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 rounded-2xl shadow-xl text-white p-6 relative min-w-[320px]"
                              >
                                <div className="text-5xl font-bold mb-2">{quizData[currentQuestion].kanji}</div>
                                {!hideFurigana && <div className="text-lg text-indigo-100 dark:text-indigo-200 mb-1">{quizData[currentQuestion].furigana}</div>}
                                {!hideRomaji && <div className="text-sm text-indigo-200 dark:text-indigo-300 font-medium">{quizData[currentQuestion].romaji}</div>}
                              </motion.div>
                            ) : quizData[currentQuestion].type === 'id_to_jp' ? (
                              <motion.div
                                ref={vocabularyRef}
                                animate={controls}
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                                className="inline-flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 rounded-2xl shadow-xl text-white p-6 relative min-w-[320px]"
                              >
                                <div className="text-2xl font-bold mb-2">{quizData[currentQuestion].arti}</div>
                                <div className="text-sm text-indigo-200 dark:text-indigo-300 font-medium">(Bahasa Indonesia)</div>
                              </motion.div>
                            ) : null}
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Answer Options */}
                    {/* Render opsi jawaban dinamis */}
                    {renderOptions(quizData[currentQuestion], handleAnswerSelect, selectedAnswer, isAnswered, showFeedback)}

                    {/* Simple Feedback Message - Moved up to avoid being covered by progress */}
                    <AnimatePresence>
                      {showFeedback && (
                        <motion.div
                          initial={{ opacity: 0, y: 20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.9 }}
                          className="text-center mt-8 mb-20"
                        >
                          <div
                            className={`inline-flex items-center gap-3 px-6 py-4 rounded-2xl text-lg font-semibold shadow-lg ${
                              isAnswered && answers[answers.length - 1]?.isCorrect
                                ? "bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-800/50 text-green-800 dark:text-green-300 border border-green-300 dark:border-green-700"
                                : "bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/50 dark:to-red-800/50 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-700"
                            }`}
                          >
                            {isAnswered && answers[answers.length - 1]?.isCorrect ? (
                              <>
                                <CheckCircle className="w-6 h-6" />
                                Benar! {quizData[currentQuestion].type === 'jp_to_id' ? quizData[currentQuestion].kanji : quizData[currentQuestion].arti} berarti {quizData[currentQuestion].type === 'jp_to_id' ? quizData[currentQuestion].answer : quizData[currentQuestion].answer}
                              </>
                            ) : (
                              <>
                                <XCircle className="w-6 h-6" />
                                Salah. {quizData[currentQuestion].type === 'jp_to_id' ? quizData[currentQuestion].kanji : quizData[currentQuestion].arti} berarti {quizData[currentQuestion].type === 'jp_to_id' ? quizData[currentQuestion].answer : quizData[currentQuestion].answer}
                              </>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress Indicator */}
              <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30">
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="bg-gradient-to-r from-white/90 to-white/80 dark:from-slate-900/90 dark:to-slate-800/80 backdrop-blur-md rounded-2xl shadow-2xl px-6 py-4 border border-white/30 dark:border-slate-700/30 relative overflow-hidden"
                >
                  {/* Background decoration */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/10 dark:to-purple-500/10"></div>

                  <div className="relative z-10 flex items-center gap-4">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Progress:</span>
                    <div className="flex items-center gap-2">
                      {Array.from({ length: quizData.length }, (_, index) => (
                        <motion.div
                          key={index}
                          className={`relative transition-all duration-300 ${
                            index < currentQuestion ? "w-4 h-4" : index === currentQuestion ? "w-5 h-5" : "w-3 h-3"
                          }`}
                          whileHover={{ scale: 1.3 }}
                        >
                          <div
                            className={`w-full h-full rounded-full transition-all duration-300 ${
                              index < currentQuestion
                                ? "bg-gradient-to-br from-green-400 to-emerald-500 dark:from-green-500 dark:to-emerald-600 shadow-lg shadow-green-200 dark:shadow-green-900/50"
                                : index === currentQuestion
                                  ? "bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50"
                                  : "bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600"
                            }`}
                          />
                          {index === currentQuestion && (
                            <motion.div
                              className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 dark:from-indigo-500 dark:to-purple-600"
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 0.8, 0.5],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                              }}
                            />
                          )}
                        </motion.div>
                      ))}
                    </div>
                    <div className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 px-3 py-1 rounded-full">
                      <span className="text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                        {currentQuestion + 1}/{quizData.length}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
