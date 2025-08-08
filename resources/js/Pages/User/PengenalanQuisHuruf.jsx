"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    CheckCircle,
    XCircle,
    Clock,
    Star,
    Zap,
    Target,
    BookOpen,
    Brain,
    Trophy,
    ArrowRight,
    Play,
    RotateCcw,
    ChevronDown,
    Volume2,
    Eye,
    Gamepad2,
    ChevronLeft,
    ChevronRight,
    Check,
    Rocket,
    Award,
    Users,
    TrendingUp,
    Shield,
    Sparkles,
    HelpCircle,
    Globe,
    Gift,
    Lightbulb,
    Library,
    Languages
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion"
import Layout from "../../Layouts/Layout"
import { Link, Head } from "@inertiajs/react";

export default function Component() {
  const [selectedAnswers, setSelectedAnswers] = useState({
    beginner: null,
    intermediate: null,
    advanced: null,
  })

  const [showResults, setShowResults] = useState({
    beginner: false,
    intermediate: false,
    advanced: false,
  })

  const [timeouts, setTimeouts] = useState({})

  const handleAnswerSelect = (level, answer, isCorrect) => {
    setSelectedAnswers((prev) => ({ ...prev, [level]: { answer, isCorrect } }))
    setShowResults((prev) => ({ ...prev, [level]: true }))

    // Clear existing timeout for this level
    if (timeouts[level]) {
      clearTimeout(timeouts[level])
    }

    // Set new timeout
    const newTimeout = setTimeout(() => {
      setSelectedAnswers((prev) => ({ ...prev, [level]: null }))
      setShowResults((prev) => ({ ...prev, [level]: false }))
    }, 3000)

    setTimeouts((prev) => ({ ...prev, [level]: newTimeout }))
  }

  useEffect(() => {
    return () => {
      Object.values(timeouts).forEach((timeout) => clearTimeout(timeout))
    }
  }, [timeouts])

  const QuizCard = ({ level, character, options, correctAnswer, timeLimit, description }) => {
    const isAnswered = selectedAnswers[level]
    const showResult = showResults[level]

    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <Badge variant="outline" className="text-sm font-medium">
            Level {level.charAt(0).toUpperCase() + level.slice(1)}
          </Badge>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Waktu: {timeLimit} menit</span>
          </div>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">{description}</p>
        </div>

        <Card className="border-2 border-dashed border-muted-foreground/20 bg-muted/5">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h4 className="font-medium text-sm text-muted-foreground">Bagaimana pelafalan karakter berikut?</h4>

              <Card className="inline-block bg-background border-2">
                <CardContent className="p-8">
                  <div className="text-6xl font-bold text-center">{character}</div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                {options.map((option, index) => {
                  const letter = String.fromCharCode(97 + index) // a, b, c, d
                  const isCorrect = index === correctAnswer
                  const isSelected = isAnswered?.answer === index

                  return (
                    <Button
                      key={index}
                      variant={isSelected ? (isAnswered.isCorrect ? "default" : "destructive") : "outline"}
                      className={`h-12 text-left justify-start relative ${
                        showResult && isCorrect ? "ring-2 ring-green-500" : ""
                      } ${showResult && isSelected && !isCorrect ? "ring-2 ring-red-500" : ""}`}
                      onClick={() => handleAnswerSelect(level, index, isCorrect)}
                      disabled={showResult}
                    >
                      <span className="font-medium mr-2">{letter}.</span>
                      <span>{option}</span>
                      {showResult && isCorrect && <CheckCircle className="w-4 h-4 ml-auto text-green-500" />}
                      {showResult && isSelected && !isCorrect && <XCircle className="w-4 h-4 ml-auto text-red-500" />}
                    </Button>
                  )
                })}
              </div>

              {showResult && (
                <AnimatePresence>
                  <motion.div
                    className="mt-4 p-3 rounded-lg bg-muted/50 border"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="flex items-center justify-center gap-2"
                      initial={{ x: -10 }}
                      animate={{ x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      {isAnswered.isCorrect ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="font-medium text-green-700">Benar!</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-red-500" />
                          <span className="font-medium text-red-700">
                            Salah! Jawaban yang benar: {String.fromCharCode(97 + correctAnswer)}.{" "}
                            {options[correctAnswer]}
                          </span>
                        </>
                      )}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const [isDarkMode, setIsDarkMode] = useState(false);
  // Check dark mode on mount and listen for changes
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDarkMode(savedTheme === "dark");

    // Listen for theme changes
    const handleStorageChange = (e) => {
        if (e.key === "theme") {
            setIsDarkMode(e.newValue === "dark");
        }
    };

    window.addEventListener("storage", handleStorageChange);

    // Also listen for custom theme change events
    const handleThemeChange = () => {
        const currentTheme = localStorage.getItem("theme");
        setIsDarkMode(currentTheme === "dark");
    };

    window.addEventListener("themeChanged", handleThemeChange);

    // Check for theme changes periodically
    const interval = setInterval(() => {
        const currentTheme = localStorage.getItem("theme");
        setIsDarkMode(currentTheme === "dark");
    }, 1000);

    return () => {
        window.removeEventListener("storage", handleStorageChange);
        window.removeEventListener("themeChanged", handleThemeChange);
        clearInterval(interval);
    };
}, []);



  return (
    <Layout>
        <Head>
            <title>Pengenalan Quis Huruf</title>
        </Head>
        <motion.div
        className="min-h-screen bg-background overflow-x-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        >
        {/* What is Letter Quiz Section */}
        <motion.section
            className="py-16 px-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
        >
            <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <BookOpen className="w-4 h-4" />
                Pengenalan Fitur
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Apa itu <span className="text-primary">Kuis Huruf</span>?
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Fitur pembelajaran interaktif yang dirancang khusus untuk melatih ingatan dan pemahaman Anda terhadap
                huruf Jepang
                </p>
            </div>

            {/* Equal Height Cards: Melatih Ingatan & Meningkatkan Pemahaman */}
            <motion.div
                className="grid md:grid-cols-2 gap-8 mb-16 items-stretch"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, staggerChildren: 0.2 }}
                viewport={{ once: true }}
            >
                <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                >
                <Card className="border-2 hover:border-primary/50 transition-colors h-full">
                    <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                        <Brain className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold">Melatih Ingatan</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                        Sistem pengulangan yang terbukti efektif untuk memperkuat memori jangka panjang Anda terhadap
                        karakter hiragana dan katakana.
                    </p>
                    </CardContent>
                </Card>
                </motion.div>

                <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                >
                <Card className="border-2 hover:border-primary/50 transition-colors h-full">
                    <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                        <Target className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold">Meningkatkan Pemahaman</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                        Latihan yang terstruktur membantu Anda memahami pola dan konteks penggunaan setiap karakter dengan
                        lebih baik.
                    </p>
                    </CardContent>
                </Card>
                </motion.div>
            </motion.div>

            {/* EXP System Highlight */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
            >
                <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20 mb-12">
                <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/20 rounded-lg">
                        <Star className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold">Sistem Reward EXP</h3>
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                    Setiap jawaban benar memberikan EXP yang dapat digunakan untuk meningkatkan level Anda. Semakin tinggi
                    level, semakin banyak fitur pembelajaran yang terbuka!
                    </p>
                    <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-500" />
                        <span className="font-medium">Dapatkan EXP</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <div className="flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-orange-500" />
                        <span className="font-medium">Naik Level</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <div className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-blue-500" />
                        <span className="font-medium">Buka Fitur Baru</span>
                    </div>
                    </div>
                </CardContent>
                </Card>
            </motion.div>

            {/* User Flow */}
            <div className="space-y-8">
                <h3 className="text-2xl font-semibold text-center mb-8">Alur Penggunaan Kuis Huruf</h3>

                {/* Equal Height Cards: 4 Step Cards */}
                <motion.div
                className="grid md:grid-cols-4 gap-6 items-stretch"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, staggerChildren: 0.1 }}
                viewport={{ once: true }}
                >
                {[1, 2, 3, 4].map((step, index) => (
                    <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    >
                    <Card className="text-center hover:shadow-lg transition-shadow h-full">
                        <CardContent className="p-6">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-primary font-bold">{step}</span>
                        </div>
                        <h4 className="font-semibold mb-2">
                            {step === 1
                            ? "Pilih Jenis Huruf"
                            : step === 2
                                ? "Pilih Level"
                                : step === 3
                                ? "Pilih Mode"
                                : "Mulai Kuis"}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                            {step === 1
                            ? "Hiragana atau Katakana"
                            : step === 2
                                ? "Beginner, Intermediate, Advanced"
                                : step === 3
                                ? "Manual atau Random"
                                : "Kerjakan & Review"}
                        </p>
                        </CardContent>
                    </Card>
                    </motion.div>
                ))}
                </motion.div>

                {/* Equal Height Cards: Mode Manual & Mode Random */}
                <motion.div
                className="grid md:grid-cols-2 gap-8 mt-12 items-stretch"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, staggerChildren: 0.2 }}
                viewport={{ once: true }}
                >
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Card className="border-2 border-blue-200 bg-blue-50/50 dark:bg-background h-full">
                    <CardContent className="p-6">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Mode Manual
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                        Anda dapat memilih huruf-huruf spesifik yang sudah dipelajari untuk dijadikan soal kuis. Cocok
                        untuk fokus pada huruf yang masih sulit diingat.
                        </p>
                    </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Card className="border-2 border-green-200 bg-green-50/50 dark:bg-background h-full">
                    <CardContent className="p-6">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Mode Random
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                        Sistem akan secara acak memilih huruf sesuai level yang dipilih. Ideal untuk menguji pemahaman
                        menyeluruh Anda.
                        </p>
                    </CardContent>
                    </Card>
                </motion.div>
                </motion.div>
            </div>
            </div>
        </motion.section>

        {/* Quiz by Level Section */}
        <motion.section
            className="py-16 px-4 bg-muted/30 dark:bg-[#0A0D16]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
        >
            <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Play className="w-4 h-4" />
                Preview Kuis
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Kuis Huruf Berdasarkan <span className="text-primary">Level</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Setiap level memiliki tingkat kesulitan dan struktur soal yang berbeda. Coba interaksi di bawah ini!
                </p>
            </div>

            <div className="space-y-16">
                {/* Beginner Level */}
                <motion.div
                className="space-y-8"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                >
                {/* New Header Layout for Beginner Level */}
                <Card className="p-6 border-2 bg-green-50/50 border-green-200 dark:bg-[#0A0D16]">
                    <CardContent className="flex flex-col md:flex-row items-center md:justify-between gap-4 md:gap-8 p-0">
                    <div className="text-center md:text-left flex-shrink-0">
                        <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2 mb-2">Beginner Level</Badge>
                        <h3 className="text-2xl font-semibold">Karakter Tunggal</h3>
                    </div>
                    <p className="text-muted-foreground text-center md:text-right max-w-md md:max-w-lg">
                        Level pemula fokus pada pengenalan karakter dasar tanpa kombinasi. Sempurna untuk membangun fondasi
                        yang kuat.
                    </p>
                    </CardContent>
                </Card>

                <QuizCard
                    level="beginner"
                    character="あ"
                    options={["a", "i", "ka", "na"]}
                    correctAnswer={0}
                    timeLimit={7}
                    description="Karakter tunggal tanpa kombinasi apapun"
                />
                </motion.div>

                {/* Intermediate Level */}
                <motion.div
                className="space-y-8"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                >
                {/* New Header Layout for Intermediate Level */}
                <Card className="p-6 border-2 bg-yellow-50/50 border-yellow-200 dark:bg-[#0A0D16]">
                    <CardContent className="flex flex-col md:flex-row items-center md:justify-between gap-4 md:gap-8 p-0">
                    <div className="text-center md:text-left flex-shrink-0">
                        <Badge className="bg-yellow-100 text-yellow-800 text-lg px-4 py-2 mb-2">Intermediate Level</Badge>
                        <h3 className="text-2xl font-semibold">Kombinasi 3-4 Karakter</h3>
                    </div>
                    <p className="text-muted-foreground text-center md:text-right max-w-md md:max-w-lg">
                        Level menengah menggabungkan beberapa karakter untuk membentuk kata atau suku kata yang lebih
                        kompleks.
                    </p>
                    </CardContent>
                </Card>

                <QuizCard
                    level="intermediate"
                    character="さくら"
                    options={["sakura", "takura", "nakura", "makura"]}
                    correctAnswer={0}
                    timeLimit={10}
                    description="Kombinasi 3-4 karakter untuk membentuk kata"
                />
                </motion.div>

                {/* Advanced Level */}
                <motion.div
                className="space-y-8"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                >
                {/* New Header Layout for Advanced Level */}
                <Card className="p-6 border-2 bg-red-50/50 border-red-200 dark:bg-[#0A0D16]">
                    <CardContent className="flex flex-col md:flex-row items-center md:justify-between gap-4 md:gap-8 p-0">
                    <div className="text-center md:text-left flex-shrink-0">
                        <Badge className="bg-red-100 text-red-800 text-lg px-4 py-2 mb-2">Advanced Level</Badge>
                        <h3 className="text-2xl font-semibold">Kombinasi 5-6 Karakter + Tanda Baca</h3>
                    </div>
                    <p className="text-muted-foreground text-center md:text-right max-w-md md:max-w-lg">
                        Level lanjutan mencakup kombinasi karakter yang kompleks dengan berbagai tanda baca seperti dakuten
                        dan handakuten.
                    </p>
                    </CardContent>
                </Card>

                <QuizCard
                    level="advanced"
                    character="じゅうぎょう"
                    options={["juugyou", "juukiyou", "juugirou", "juukyou"]}
                    correctAnswer={0}
                    timeLimit={15}
                    description="Kombinasi 5-6 karakter dengan tanda baca (dakuten, handakuten, dll)"
                />
                </motion.div>
            </div>
            </div>
        </motion.section>

        {/* EXP System Section */}
        <motion.section
            className="py-16 px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
        >
            <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Zap className="w-4 h-4" />
                Sistem Reward
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Sistem <span className="text-primary">EXP</span> Setiap Level
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                EXP diberikan berdasarkan jawaban benar, dengan sistem pengurangan untuk mencegah spam dan mendorong
                pembelajaran yang efektif.
                </p>
            </div>

            <motion.div
                className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mb-12 items-stretch"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, staggerChildren: 0.2 }}
                viewport={{ once: true }}
            >
                {["beginner", "intermediate", "advanced"].map((level, index) => (
                <motion.div
                    key={level}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    whileHover={{ scale: 1.02 }}
                >
                    <Card
                    className={`border-2 border-${
                        level === "beginner" ? "green" : level === "intermediate" ? "yellow" : "red"
                    }-200 hover:border-${
                        level === "beginner" ? "green" : level === "intermediate" ? "yellow" : "red"
                    }-300 transition-colors h-full`}
                    >
                    <CardContent className="p-6">
                        <div className="text-center mb-6">
                        <div
                            className={`w-16 h-16 bg-${
                            level === "beginner" ? "green" : level === "intermediate" ? "yellow" : "red"
                            }-100 rounded-full flex items-center justify-center mx-auto mb-4`}
                        >
                            <Star
                            className={`w-8 h-8 text-${
                                level === "beginner" ? "green" : level === "intermediate" ? "yellow" : "red"
                            }-600`}
                            />
                        </div>
                        <h3
                            className={`text-xl font-semibold text-${
                            level === "beginner" ? "green" : level === "intermediate" ? "yellow" : "red"
                            }-800`}
                        >
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {level === "beginner"
                            ? "Karakter Tunggal"
                            : level === "intermediate"
                                ? "3-4 Kombinasi"
                                : "5-6 Kombinasi + Tanda Baca"}
                        </p>
                        </div>

                        <div className="space-y-3">
                        <div
                            className={`flex justify-between items-center p-3 bg-${
                            level === "beginner" ? "green" : level === "intermediate" ? "yellow" : "red"
                            }-50 rounded-lg`}
                        >
                            <span className="font-medium dark:text-gray-800">Percobaan 1</span>
                            <Badge
                            className={`bg-${
                                level === "beginner" ? "green" : level === "intermediate" ? "yellow" : "red"
                            }-600 text-gray-800`}
                            >
                            {level === "beginner" ? "15 EXP" : level === "intermediate" ? "20 EXP" : "25 EXP"}
                            </Badge>
                        </div>
                        <div
                            className={`flex justify-between items-center p-3 bg-${
                            level === "beginner" ? "green" : level === "intermediate" ? "yellow" : "red"
                            }-50/70 rounded-lg`}
                        >
                            <span className="font-medium">Percobaan 2</span>
                            <Badge
                            variant="outline"
                            className={`border-${
                                level === "beginner" ? "green" : level === "intermediate" ? "yellow" : "red"
                            }-600 text-${
                                level === "beginner" ? "green" : level === "intermediate" ? "yellow" : "red"
                            }-600`}
                            >
                            {level === "beginner" ? "10 EXP" : level === "intermediate" ? "13 EXP" : "15 EXP"}
                            </Badge>
                        </div>
                        <div
                            className={`flex justify-between items-center p-3 bg-${
                            level === "beginner" ? "green" : level === "intermediate" ? "yellow" : "red"
                            }-50/50 rounded-lg`}
                        >
                            <span className="font-medium">Percobaan 3</span>
                            <Badge
                            variant="outline"
                            className={`border-${
                                level === "beginner" ? "green" : level === "intermediate" ? "yellow" : "red"
                            }-600 text-${
                                level === "beginner" ? "green" : level === "intermediate" ? "yellow" : "red"
                            }-600`}
                            >
                            {level === "beginner" ? "7 EXP" : level === "intermediate" ? "8 EXP" : "10 EXP"}
                            </Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium text-muted-foreground">Percobaan 4+</span>
                            <Badge variant="secondary">0 EXP</Badge>
                        </div>
                        </div>
                    </CardContent>
                    </Card>
                </motion.div>
                ))}
            </motion.div>

            {/* Quiz Limit Warning */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                viewport={{ once: true }}
            >
                <Card className="bg-orange-50 border-2 border-orange-200">
                <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                    <div className="p-2 bg-orange-100 rounded-lg flex-shrink-0">
                        <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-orange-800 mb-2">Batasan Kuis Harian</h3>
                        <p className="text-orange-700 leading-relaxed mb-4">
                        Untuk menjaga kualitas pembelajaran dan mencegah kelelahan, setiap pengguna hanya dapat melakukan
                        <span className="font-semibold"> maksimal 10 kuis dalam 1 jam</span>. Setelah batas tercapai, Anda
                        perlu menunggu hingga jam berikutnya untuk melanjutkan.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-orange-600">
                        <RotateCcw className="w-4 h-4" />
                        <span>Reset setiap jam untuk sesi pembelajaran yang optimal</span>
                        </div>
                    </div>
                    </div>
                </CardContent>
                </Card>
            </motion.div>
            </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
            className="py-16 px-4 bg-primary/5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
        >
            <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            >
            <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Trophy className="w-4 h-4" />
                Siap Memulai?
                </div>

                <h2 className="text-3xl md:text-4xl font-bold">
                Mulai Perjalanan Pembelajaran <br />
                <span className="text-primary">Bahasa Jepang</span> Anda!
                </h2>

                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Bergabunglah dengan ribuan pelajar yang telah merasakan efektivitas sistem kuis huruf kami. Tingkatkan
                kemampuan Anda step by step dengan metode yang terbukti.
                </p>

                <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/login">
                    <Button size="lg" className="text-lg px-8 py-6">
                    <Play className="w-5 h-5 mr-2" />
                    Mulai Kuis Sekarang
                    </Button>
                    </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/pengenalan-kosakata">
                        <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                        <BookOpen className="w-5 h-5 mr-2" />
                        Pelajari Lebih Lanjut
                        </Button>
                    </Link>
                </motion.div>
                </motion.div>

                <motion.div
                className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, staggerChildren: 0.1 }}
                viewport={{ once: true }}
                >
                {["Gratis untuk memulai", "Tanpa iklan mengganggu", "Progress tersimpan otomatis"].map(
                    (benefit, index) => (
                    <motion.div
                        key={benefit}
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{benefit}</span>
                    </motion.div>
                    ),
                )}
                </motion.div>
            </div>
            </motion.div>
        </motion.section>
        </motion.div>
    </Layout>
  )
}
