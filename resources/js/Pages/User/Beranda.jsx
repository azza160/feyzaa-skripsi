"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, usePage, Head } from "@inertiajs/react";
import Layout from "../../Layouts/Layout";
import {
    Play,
    BookOpen,
    Brain,
    Trophy,
    Star,
    ChevronDown,
    ArrowRight,
    Target,
    CheckCircle,
    Rocket,
    Award,
    Users,
    Clock,
    TrendingUp,
    Shield,
    Sparkles,
    HelpCircle,
    Gamepad2,
    Globe,
    Gift,
    Lightbulb,
    Library,
    Languages 

} from "lucide-react";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"


export default function Home() {
    const { topUsers = [] } = usePage().props;
    const [typingText, setTypingText] = useState("");
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const texts = [
        "Huruf Hiragana Dan Katakana",
        "Kosakata Dasar Jepang",
    ];

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

    // Typing animation
    useEffect(() => {
        const currentText = texts[currentTextIndex];
        const timeout = setTimeout(
            () => {
                if (!isDeleting) {
                    if (typingText.length < currentText.length) {
                        setTypingText(
                            currentText.slice(0, typingText.length + 1)
                        );
                    } else {
                        setTimeout(() => setIsDeleting(true), 2000);
                    }
                } else {
                    if (typingText.length > 0) {
                        setTypingText(typingText.slice(0, -1));
                    } else {
                        setIsDeleting(false);
                        setCurrentTextIndex(
                            (prev) => (prev + 1) % texts.length
                        );
                    }
                }
            },
            isDeleting ? 50 : 100
        );

        return () => clearTimeout(timeout);
    }, [typingText, isDeleting, currentTextIndex]);

    const levelData = [
        {
            level: 1,
            exp: 0,
            title: "Pemula",
            description: "Mulai dari dasar",
            features: ["Pembelajaran Hiragana", "Kuis Hiragana"],
            color: "bg-green-500",
            bgColor: "bg-green-50 dark:bg-green-900/20",
            borderColor: "border-green-200 dark:border-green-800",
        },
        {
            level: 2,
            exp: 500,
            title: "Berkembang",
            description: "Lanjut ke tahap berikutnya",
            features: ["Pembelajaran Katakana", "Kuis Katakana"],
            color: "bg-blue-500",
            bgColor: "bg-blue-50 dark:bg-blue-900/20",
            borderColor: "border-blue-200 dark:border-blue-800",
        },
        {
            level: 3,
            exp: 1000,
            title: "Menengah",
            description: "Mulai belajar kosakata",
            features: ["Bank Kosakata", "Kuis Kosakata Beginner"],
            color: "bg-purple-500",
            bgColor: "bg-purple-50 dark:bg-purple-900/20",
            borderColor: "border-purple-200 dark:border-purple-800",
        },
        {
            level: 4,
            exp: 1500,
            title: "Mahir",
            description: "Tingkatkan kemampuan",
            features: ["Kuis Kosakata Intermediate"],
            color: "bg-pink-500",
            bgColor: "bg-pink-50 dark:bg-pink-900/20",
            borderColor: "border-pink-200 dark:border-pink-800",
        },
        {
            level: 5,
            exp: 2000,
            title: "Expert",
            description: "Level tertinggi",
            features: ["Kuis Kosakata Advanced"],
            color: "bg-red-500",
            bgColor: "bg-red-50 dark:bg-red-900/20",
            borderColor: "border-red-200 dark:border-red-800",
        },
    ];

    const faqData = [
        {
            question: "Apa itu sistem Level & EXP?",
            answer: "Sistem Level & EXP adalah fitur gamifikasi yang membuat pembelajaran lebih menyenangkan. Setiap aktivitas belajar akan memberikan EXP, dan ketika EXP mencukupi, level Anda akan naik dan membuka fitur baru.",
        },
        {
            question: "Bagaimana cara mendapatkan EXP?",
            answer: "Anda bisa mendapatkan EXP dengan menyelesaikan kuis, mempelajari huruf baru, menambah kosakata, dan berbagai aktivitas pembelajaran lainnya di platform.",
        },
        {
            question: "Apakah platform ini gratis?",
            answer: "Ya, platform KotoBee dapat digunakan secara gratis. Semua fitur dasar tersedia tanpa biaya.",
        },
        {
            question: "Bisakah saya belajar offline?",
            answer: "Saat ini platform masih berbasis web dan memerlukan koneksi internet. Namun, kami sedang mengembangkan fitur offline untuk masa depan.",
        },
    ];

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const colorData = [
        {
          color: "bg-gradient-to-br from-green-500 to-emerald-600",
          bgColor: "bg-white dark:bg-gray-900",
          borderColor: "border-green-200 dark:border-green-800",
          accentColor: "text-green-600 dark:text-green-400",
        },
        {
          color: "bg-gradient-to-br from-blue-500 to-cyan-600",
          bgColor: "bg-white dark:bg-gray-900",
          borderColor: "border-blue-200 dark:border-blue-800",
          accentColor: "text-blue-600 dark:text-blue-400",
        },
        {
          color: "bg-gradient-to-br from-purple-500 to-violet-600",
          bgColor: "bg-white dark:bg-gray-900",
          borderColor: "border-purple-200 dark:border-purple-800",
          accentColor: "text-purple-600 dark:text-purple-400",
        },
        {
          color: "bg-gradient-to-br from-pink-500 to-rose-600",
          bgColor: "bg-white dark:bg-gray-900",
          borderColor: "border-pink-200 dark:border-pink-800",
          accentColor: "text-pink-600 dark:text-pink-400",
        },
      ]
      
      const learningSteps = [
        {
          title: "Belajar Huruf Jepang",
          subtitle: "Huruf Dasar",
          icon: BookOpen,
          difficulty: "Level 1 - 2",
          description: "Mulai perjalanan bahasa Jepang dengan mempelajari sistem penulisan dasar",
          features: [
            "Pelajari Hiragana & Katakana dari dasar dengan metode interaktif",
            "Pahami cara penulisan, pengucapan, dan contoh penggunaannya",
            "Cocok untuk pemula yang benar-benar mulai dari 0",
            "Dilengkapi dengan panduan stroke order yang tepat",
          ],
          buttonText: "Mulai Belajar Huruf",
          url:'/pengenalan-huruf'
        },
        {
          title: "Kuis Huruf Jepang",
          subtitle: "Kuis Huruf",
          icon: Brain,
          difficulty: "Level 1 - 2",
          description: "Uji dan tingkatkan kemampuan mengenali huruf Jepang dengan sistem kuis adaptif",
          features: [
            "Latih ingatan huruf dengan 3 level kuis: Beginner, Intermediate, Advanced",
            "2 mode pembelajaran: Manual dan Random",
            "Sistem reward dan level progression",
            "Review kesalahan untuk memperbaiki pemahaman",
          ],
          buttonText: "Pelajari Sistem Kuis Huruf",
          url:'/pengenalan-quis-huruf'
        },
        {
          title: "Belajar Kosakata",
          subtitle: "Kosakata",
          icon: Library,
          difficulty: "Level 3 - 5",
          description: "Bangun fondasi kosakata yang kuat dengan metode pembelajaran yang terbukti efektif",
          features: [
            "Pelajari kosakata dari furigana hingga kanji dengan sistem bertahap",
            "Dilengkapi contoh kalimat dan bentuk kata kerja",
            "Bangun pemahaman kosakata sehari-hari dengan konteks relevan",
            "Kategorisasi berdasarkan tema dan tingkat kesulitan",
          ],
          buttonText: "Pelajari Kosakata",
          url:'/pengenalan-kosakata'
        },
        {
          title: "Kuis Kosakata",
          subtitle: "Kuis Kosakata",
          icon: Target,
          difficulty: "Level 3 - 5",
          description: "Kuasai kosakata Jepang dengan sistem kuis yang menantang dan adaptif",
          features: [
            "Uji pemahaman kosakata dengan 3 level kuis berbeda",
            "Mode Manual dan Random dengan algoritma spaced repetition",
            "Review hasil kuis dengan feedback detail",
            "Tracking progress dan statistik pembelajaran",
          ],
          buttonText: "Pelajari Sistem Kuis Kosakata",
          url:'/pengenalan-quis-kosakata'
        },
      ]

    return (
        <Layout>
            <Head>
                <title>Beranda</title>
            </Head>
            <div className="w-full overflow-x-hidden">
            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
                {/* Mesh Gradient Background */}
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)
            `,
                    }}
                ></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center space-y-12">
                        {/* Content */}
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <div className="inline-flex items-center space-x-2 bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-md">
                                <Star className="w-4 h-4 text-primary" />
                                <span className="text-primary font-medium text-sm">
                                    Kotobee - Belajar Bahasa Jepang Pemula
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                <span className="text-foreground">
                                    Belajar{" "}
                                </span>
                                <span className="text-primary">
                                    {typingText}
                                    <span className="animate-pulse">|</span>
                                </span>
                                <br />
                                <span className="text-foreground">
                                    Dengan Menyenangkan
                                </span>
                            </h1>

                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Platform belajar bahasa Jepang khusus untuk pemula. Mulai dari huruf dasar, kosakata penting, hingga latihan interaktif — semua dirancang supaya kamu bisa belajar langkah demi langkah dengan nyaman.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md transition-colors duration-200 shadow-lg"
                                >
                                    <Play className="w-5 h-5 mr-2" />
                                    Mulai Belajar Gratis
                                </Link>
                                <button
                                    onClick={() =>
                                        document
                                            .getElementById("about")
                                            .scrollIntoView({
                                                behavior: "smooth",
                                            })
                                    }
                                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold rounded-md transition-all duration-200"
                                >
                                    <BookOpen className="w-5 h-5 mr-2" />
                                    Jelajahi Fitur
                                </button>
                            </div>
                        </motion.div>

                        {/* Image with Floating Cards */}
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="max-w-4xl mx-auto relative"
                        >
                            <div className="relative">
                                <div className="w-full h-[300px] sm:h-auto">
                                    <img
                                        key={isDarkMode ? "dark" : "light"}
                                        src={isDarkMode ? "/img/hero-bg-dark.png" : "/img/hero-bg-light.png"}
                                        alt="KotoBee App Interface"
                                        className="
      w-full 
      h-full 
      border-[5px] border-primary/20 shadow-lg hover:shadow-xl
      object-cover object-center
    "
                                    />
                                </div>

                                {/* Floating Cards */}
                                <motion.div
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 1, duration: 0.6 }}
                                    className="absolute -top-4 -left-4 bg-card p-3 md:p-4 rounded-md border-2 border-primary/20 shadow-lg hover:shadow-xl max-w-[200px] md:max-w-xs"
                                >
                                    <div className="flex items-center space-x-2 md:space-x-3 mb-1 md:mb-2">
                                        <div className="w-6 h-6 md:w-8 md:h-8 bg-purple-100 dark:bg-purple-900 rounded-md flex items-center justify-center">
                                            <Gamepad2 className="w-3 h-3 md:w-4 md:h-4 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground text-xs md:text-sm">
                                                Gamifikasi
                                            </p>
                                            <p className="text-[10px] md:text-xs text-muted-foreground hidden md:block">
                                                Belajar seperti bermain
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-[10px] md:text-xs text-muted-foreground">
                                        <span className="md:hidden">
                                            Level, EXP & achievement!
                                        </span>
                                        <span className="hidden md:block">
                                            Sistem level, EXP, dan achievement
                                            yang membuat belajar jadi
                                            menyenangkan!
                                        </span>
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ y: -50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 1.2, duration: 0.6 }}
                                    className="absolute -top-4 -right-4 bg-card p-3 md:p-4 rounded-md border-2 border-primary/20 shadow-lg hover:shadow-xl max-w-[200px] md:max-w-xs"
                                >
                                    <div className="flex items-center space-x-2 md:space-x-3 mb-1 md:mb-2">
                                        <div className="w-6 h-6 md:w-8 md:h-8 bg-red-100 dark:bg-red-900 rounded-md flex items-center justify-center">
                                            <Globe className="w-3 h-3 md:w-4 md:h-4 text-red-600 dark:text-red-400" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground text-xs md:text-sm">
                                                Bahasa Jepang
                                            </p>
                                            <p className="text-[10px] md:text-xs text-muted-foreground hidden md:block">
                                                Bahasa yang indah
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-[10px] md:text-xs text-muted-foreground">
                                        <span className="md:hidden">
                                            Hiragana, Katakana & kosakata!
                                        </span>
                                        <span className="hidden md:block">
                                            Pelajari Hiragana, Katakana, dan
                                            kosakata dengan metode yang mudah
                                            dipahami.
                                        </span>
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 1.4, duration: 0.6 }}
                                    className="absolute -bottom-4 -right-4 bg-card p-3 md:p-4 rounded-md border-2 border-primary/20 shadow-lg hover:shadow-xl max-w-[200px] md:max-w-xs"
                                >
                                    <div className="flex items-center space-x-2 md:space-x-3 mb-1 md:mb-2">
                                        <div className="w-6 h-6 md:w-8 md:h-8 bg-green-100 dark:bg-green-900 rounded-md flex items-center justify-center">
                                            <Gift className="w-3 h-3 md:w-4 md:h-4 text-green-600 dark:text-green-400" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground text-xs md:text-sm">
                                                100% Gratis
                                            </p>
                                            <p className="text-[10px] md:text-xs text-muted-foreground hidden md:block">
                                                Tanpa biaya tersembunyi
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-[10px] md:text-xs text-muted-foreground">
                                        <span className="md:hidden">
                                            Semua fitur gratis!
                                        </span>
                                        <span className="hidden md:block">
                                            Akses semua fitur pembelajaran tanpa
                                            perlu membayar sepeserpun!
                                        </span>
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ y: -50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 1.6, duration: 0.6 }}
                                    className="absolute -bottom-4 -left-4 bg-card p-3 md:p-4 rounded-md border-2 border-primary/20 shadow-lg hover:shadow-xl max-w-[200px] md:max-w-xs"
                                >
                                    <div className="flex items-center space-x-2 md:space-x-3 mb-1 md:mb-2">
                                        <div className="w-6 h-6 md:w-8 md:h-8 bg-yellow-100 dark:bg-yellow-900 rounded-md flex items-center justify-center">
                                            <Lightbulb className="w-3 h-3 md:w-4 md:h-4 text-yellow-600 dark:text-yellow-400" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground text-xs md:text-sm">
                                                Tips Pemula
                                            </p>
                                            <p className="text-[10px] md:text-xs text-muted-foreground hidden md:block">
                                                Mulai dari dasar
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-[10px] md:text-xs text-muted-foreground">
                                        <span className="md:hidden">
                                            Mulai dari Hiragana!
                                        </span>
                                        <span className="hidden md:block">
                                            Mulai dengan Hiragana, lalu
                                            Katakana, dan terakhir kosakata
                                            untuk hasil optimal.
                                        </span>
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* About Platform Section */}
            <section id="about" className="py-20 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Enhanced Header */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="flex justify-center mb-8">
                            <div className="bg-primary/10 dark:bg-primary/20 p-6 rounded-md border border-primary/20">
                                <div className="flex items-center justify-center space-x-4">
                                    <div className="w-12 h-12 bg-primary/20 rounded-md flex items-center justify-center">
                                        <Sparkles className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-lg font-semibold text-primary">
                                        Belajar dari Nol

                                        </h3>
                                        <p className="text-sm text-primary/80">
                                        Belajar bahasa jepang untuk pemula


                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                            Mengapa Memilih KotoBee?
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Tempat belajar bahasa Jepang dari nol, dibuat khusus agar pemula bisa belajar langkah demi langkah dengan nyaman.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Brain,
                                title: "Pembelajaran Interaktif",
                                description:
                                    "Belajar dengan kuis interaktif dan latihan yang menyenangkan untuk meningkatkan pemahaman Anda secara bertahap.",
                                features: [
                                    "Kuis Real-time",
                                    "Feedback Instan",
                                    "Progress Tracking",
                                ],
                                accent: "blue",
                            },
                            {
                                icon: Trophy,
                                title: "Sistem Gamifikasi",
                                description:
                                    "Sistem level, achievement, dan leaderboard yang membuat pembelajaran menjadi seperti bermain game yang seru.",
                                features: [
                                    "Level & EXP",
                                    "Achievement",
                                    "Leaderboard",
                                ],
                                accent: "purple",
                            },
                            {
                                icon: Target,
                                title: "Belajar dari Nol",
                                description:
                                "Mulai dari huruf dasar hingga kosakata sederhana, dirancang untuk membantu pemula mengenal bahasa Jepang dengan mudah.",
                                features: [
                                    "Langkah Demi Langkah",
                                    "Materi Pemula",
                                    "Latihan Interaktif",
                                ],
                                accent: "green",
                            },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{
                                    delay: index * 0.2,
                                    duration: 0.6,
                                }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                                                    <div className="bg-card p-8 rounded-md border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 h-full relative overflow-hidden">
                                    {/* Tech-style accent line */}
                                    <div
                                        className={`absolute top-0 left-0 w-full h-1 bg-${feature.accent}-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
                                    ></div>

                                    <div className="relative">
                                        <div
                                            className={`w-16 h-16 bg-${feature.accent}-100 dark:bg-${feature.accent}-900/30 rounded-md flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                                        >
                                            <feature.icon
                                                className={`w-8 h-8 text-${feature.accent}-600 dark:text-${feature.accent}-400`}
                                            />
                                        </div>

                                        <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-muted-foreground mb-6 leading-relaxed">
                                            {feature.description}
                                        </p>

                                        <div className="space-y-3">
                                            {feature.features.map(
                                                (item, itemIndex) => (
                                                    <div
                                                        key={itemIndex}
                                                        className="flex items-center space-x-3"
                                                    >
                                                        <div
                                                            className={`w-2 h-2 bg-${feature.accent}-500 rounded-full group-hover:scale-125 transition-transform duration-300`}
                                                        ></div>
                                                        <span className="text-sm text-muted-foreground font-medium">
                                                            {item}
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Level & EXP System Section */}
            <section className="py-20 bg-muted/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Enhanced Header */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="flex justify-center mb-8">
                            <div className="bg-primary/10 dark:bg-primary/20 p-6 rounded-md border border-primary/20">
                                <div className="flex items-center justify-center space-x-4">
                                    <div className="w-12 h-12 bg-primary/20 rounded-md flex items-center justify-center">
                                        <TrendingUp className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-lg font-semibold text-primary">
                                            Sistem Gamifikasi
                                        </h3>
                                        <p className="text-sm text-primary/80">
                                            Level & EXP yang Memotivasi
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                            Sistem Level & EXP
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Setiap aktivitas pembelajaran memberikan EXP.
                            Kumpulkan EXP untuk naik level dan buka fitur
                            pembelajaran baru yang lebih menantang dengan sistem
                            reward yang memotivasi.
                        </p>
                    </motion.div>

                    <div className="max-w-5xl mx-auto space-y-6">
                        {levelData.map((level, index) => (
                            <motion.div
                                key={level.level}
                                initial={{
                                    x: index % 2 === 0 ? -50 : 50,
                                    opacity: 0,
                                }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{
                                    delay: index * 0.1,
                                    duration: 0.6,
                                }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div
                                    className={`${level.bgColor} backdrop-blur-sm p-8 rounded-md border ${level.borderColor} shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden`}
                                >
                                    {/* Tech accent */}
                                    <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                                        <div
                                            className={`w-full h-full ${level.color} transform rotate-45 translate-x-10 -translate-y-10`}
                                        ></div>
                                    </div>

                                    <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-6 lg:space-y-0">
                                        <div className="flex items-center space-x-6">
                                            <div
                                                className={`w-20 h-20 ${level.color} rounded-md flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-105 transition-transform duration-300`}
                                            >
                                                {level.level}
                                            </div>
                                            <div>
                                                <div className="flex items-center space-x-3 mb-2">
                                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                                        Level {level.level}
                                                    </h3>
                                                    <span
                                                        className={`px-3 py-1 ${level.bgColor} ${level.borderColor} border rounded-md text-sm font-semibold`}
                                                    >
                                                        {level.title}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
                                                    {level.description}
                                                </p>
                                                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                                                    <Clock className="w-4 h-4" />
                                                    <span>
                                                        {level.level === 1
                                                            ? "Mulai dari 0 EXP"
                                                            : `Butuh ${level.exp} EXP untuk mencapai level ini`}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                                Fitur yang Terbuka:
                                            </h4>
                                            {level.features.map(
                                                (feature, featureIndex) => (
                                                    <div
                                                        key={featureIndex}
                                                        className="flex items-center space-x-3"
                                                    >
                                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                                                            {feature}
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="relative group"
                        >
                                                                <div className="bg-primary/10 dark:bg-primary/20 p-8 rounded-md border border-primary/20 text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-200/30 dark:bg-yellow-500/20 rounded-full transform translate-x-8 -translate-y-8"></div>
                                <div className="relative">
                                    <div className="flex items-center justify-center space-x-3 mb-4">
                                        <Award className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                                                                            <h3 className="text-2xl font-bold text-primary">
                                        Setelah Level 5
                                    </h3>
                                </div>
                                <p className="text-primary/80 text-lg">
                                        EXP unlimited - Level tidak bertambah,
                                        tapi pengguna masih dapat mengumpulkan exp sebanyak mungkin,agar bisa bersaing di leaderboard
                                    </p>
                                    <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-primary/80">
                                        <div className="flex items-center space-x-1">
                                            <Shield className="w-4 h-4" />
                                            <span>Terus Belajar</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Users className="w-4 h-4" />
                                            <span>Bersaing Di Leaderboard</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* timeline */}
            <section className="py-20 bg-background" id="timeline">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                       {/* Enhanced Header */}
                       <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="flex justify-center mb-8">
                            <div className="bg-primary/10 dark:bg-primary/20 p-6 rounded-md border border-primary/20">
                                <div className="flex items-center justify-center space-x-4">
                                    <div className="w-12 h-12 bg-primary/20 rounded-md flex items-center justify-center">
                                        <Languages className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-lg font-semibold text-primary">
                                            Timeline
                                        </h3>
                                        <p className="text-sm text-primary/80">
                                            Timeline pembelajaran
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                            Timeline pembelajaran
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Timeline pembelajaran yang membantu Anda mengikuti perkembangan pembelajaran.
                        </p>
                    </motion.div>

                     {/* Cards */}
          <div className="space-y-6">
            {learningSteps.map((step, index) => {
              const colors = colorData[index]
              const IconComponent = step.icon

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  className={`
                    ${colors.bgColor} ${colors.borderColor}
                    border rounded-md shadow-sm hover:shadow-md
                    transition-all duration-300 hover:-translate-y-1
                  `}
                >
                  <div className="p-6 sm:p-8">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
                      <div className="flex items-start space-x-4 mb-4 sm:mb-0">
                        <div
                          className={`
                            ${colors.color} 
                            w-12 h-12 rounded-md flex items-center justify-center
                            flex-shrink-0
                          `}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                              {step.title}
                            </h2>
                            <Badge
                              variant="secondary"
                              className={`${colors.accentColor} bg-gray-100 dark:bg-gray-800 w-fit mt-1 sm:mt-0`}
                            >
                              {step.subtitle}
                            </Badge>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                      <div>
                      <Badge variant="outline" className="w-[120px] d-flex justify-center py-2">
                        {step.difficulty}
                      </Badge>

                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>

                    {/* Features */}
                    <div className="mb-6">
                      <div className="grid gap-3">
                        {step.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>

                    {/* Action */}
                    <div className="flex justify-start">
                        <Link href={step.url} className="w-full">
                            <Button
                                className={`
                                ${colors.color} hover:opacity-90
                                text-white font-medium px-8 py-[25px]
                                w-full
                                rounded-sm transition-all duration-200
                                flex items-center space-x-2
                                `}
                            >
                                <span>{step.buttonText}</span>
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
                </div>
            </section>

            {/* Leaderboard Section */}
            <section className="py-20 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="flex justify-center mb-8">
                            <div className="bg-primary/10 dark:bg-primary/20 p-6 rounded-md border border-primary/20">
                                <div className="flex items-center justify-center space-x-4">
                                    <div className="w-12 h-12 bg-primary/20 rounded-md flex items-center justify-center">
                                        <Trophy className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-lg font-semibold text-primary">
                                            Leaderboard Pengguna
                                        </h3>
                                        <p className="text-sm capitalize text-primary/80">
                                            Pengguna dengan exp terbanyak
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                            Leaderboard Pengguna
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Lihat 5 pengguna dengan EXP terbanyak di platform ini dan jadilah salah satu di antaranya. Tingkatkan EXP-mu dan capai peringkat teratas!
                        </p>
                    </motion.div>

                    {/* Leaderboard Cards */}
                    <div className="max-w-4xl mx-auto space-y-3">
                        {(topUsers || []).length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-muted-foreground text-lg">Belum ada data leaderboard</p>
                            </div>
                        ) : (
                        (topUsers || []).map((user, index) => {
                            const rank = index + 1;
                            const badges = rank <= 3 ? ["🔥", "⚡", "💎"] : ["🔥", "⚡"];
                            
                            // Fallback data jika user tidak ada
                            if (!user) return null;
                            
                            // Pastikan data user lengkap
                            const userData = {
                                id: user.id || index,
                                nama_pengguna: user.nama_pengguna || `User ${index + 1}`,
                                exp: user.exp || 0,
                                level: user.level || 1
                            };
                            const getMedal = (rank) => {
                                if (rank === 1) return "🥇";
                                if (rank === 2) return "🥈";
                                if (rank === 3) return "🥉";
                                return null;
                            };

                            return (
                                <motion.div
                                    key={userData.id}
                                    initial={{ y: 30, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{
                                        delay: index * 0.1,
                                        duration: 0.6,
                                    }}
                                    viewport={{ once: true }}
                                    className="group"
                                >
                                    <div className="bg-card rounded-md border border-border hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                                        {/* Rank Background */}
                                        <div
                                            className={`absolute top-0 left-0 w-1 h-full ${
                                                rank === 1
                                                    ? "bg-yellow-500"
                                                    : rank === 2
                                                    ? "bg-gray-400"
                                                    : rank === 3
                                                    ? "bg-orange-500"
                                                    : "bg-blue-500"
                                            }`}
                                        ></div>

                                        {/* Mobile Layout */}
                                        <div className="block sm:hidden p-4">
                                            <div className="flex items-center space-x-4 mb-3">
                                                                                        {/* Rank */}
                                        <div
                                            className={`w-10 h-10 rounded-md flex items-center justify-center text-white font-bold text-lg ${
                                                rank === 1
                                                    ? "bg-yellow-500"
                                                    : rank === 2
                                                    ? "bg-gray-400"
                                                    : rank === 3
                                                    ? "bg-orange-500"
                                                    : "bg-blue-500"
                                            }`}
                                        >
                                            {rank}
                                        </div>

                                                {/* Avatar with Medal */}
                                                <div className="relative">
                                                    <img
                                                        src="/placeholder.svg?height=80&width=80"
                                                        alt={userData.nama_pengguna}
                                                        className="w-12 h-12 rounded-md object-cover border-2 border-border"
                                                    />
                                                    {getMedal(rank) && (
                                                        <div className="absolute -top-1 -right-1 text-lg">
                                                            {getMedal(rank)}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* User Info */}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-lg font-bold text-foreground truncate">
                                                        {userData.nama_pengguna}
                                                    </h3>
                                                    <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                                                        <span>
                                                            ⭐ Level{" "}
                                                            {userData.level}
                                                        </span>
                                                        <span>
                                                            {userData.exp.toLocaleString()}{" "}
                                                            EXP
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Badges */}
                                            <div className="flex items-center justify-center space-x-2 pt-2 border-t border-border">
                                                {badges.map(
                                                    (badge, badgeIndex) => (
                                                        <span
                                                            key={badgeIndex}
                                                            className="text-xl"
                                                        >
                                                            {badge}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        {/* Desktop/Tablet Layout */}
                                        <div className="hidden sm:block p-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-6">
                                                    {/* Rank */}
                                                    <div
                                                        className={`w-12 h-12 rounded-md flex items-center justify-center text-white font-bold text-xl ${
                                                            rank === 1
                                                                ? "bg-yellow-500"
                                                                : rank ===
                                                                  2
                                                                ? "bg-gray-400"
                                                                : rank ===
                                                                  3
                                                                ? "bg-orange-500"
                                                                : "bg-blue-500"
                                                        }`}
                                                    >
                                                        {rank}
                                                    </div>

                                                    {/* Avatar with Medal */}
                                                    <div className="relative">
                                                        <img
                                                            src="/placeholder.svg?height=80&width=80"
                                                            alt={userData.nama_pengguna}
                                                            className="w-16 h-16 rounded-md object-cover border-2 border-border"
                                                        />
                                                        {getMedal(rank) && (
                                                            <div className="absolute -top-2 -right-2 text-2xl">
                                                                {getMedal(rank)}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* User Info */}
                                                    <div>
                                                        <h3 className="text-xl font-bold text-foreground mb-1">
                                                            {userData.nama_pengguna}
                                                        </h3>
                                                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                                            <div className="flex items-center space-x-1">
                                                                <span>⭐</span>
                                                                <span>
                                                                    Level{" "}
                                                                    {userData.level}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center space-x-1">
                                                                <span className="font-medium">
                                                                    {userData.exp.toLocaleString()}{" "}
                                                                    EXP
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Badges */}
                                                <div className="flex items-center space-x-2">
                                                    {badges.map(
                                                        (badge, badgeIndex) => (
                                                            <span
                                                                key={badgeIndex}
                                                                className="text-2xl"
                                                            >
                                                                {badge}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })
                        )}
                    </div>

                    {/* Call to Action */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <div className="bg-primary/10 dark:bg-primary/20 p-6 md:p-8 rounded-md border border-primary/20">
                            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                                Ingin Masuk Leaderboard?
                            </h3>
                            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                                Mulai belajar sekarang dan kumpulkan EXP
                                sebanyak-banyaknya. Jadilah yang terdepan dan masuk ke jajaran top 5 leaderboard!
                            </p>
                            <Link
                                href={route('register')}
                                className="inline-flex items-center justify-center px-6 md:px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md transition-colors duration-200"
                            >
                                <Trophy className="w-5 h-5 mr-2" />
                                Mulai Kompetisi
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-background">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Enhanced Header */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="flex justify-center mb-8">
                            <div className="bg-primary/10 dark:bg-primary/20 p-6 rounded-md border border-primary/20">
                                <div className="flex items-center justify-center space-x-4">
                                    <div className="w-12 h-12 bg-primary/20 rounded-md flex items-center justify-center">
                                        <HelpCircle className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-lg font-semibold text-primary">
                                            Bantuan & Dukungan
                                        </h3>
                                        <p className="text-sm text-primary/80">
                                            Jawaban untuk Pertanyaan Anda
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                            Pertanyaan yang Sering Diajukan
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            Temukan jawaban untuk pertanyaan umum tentang
                            platform KotoBee dan fitur-fitur yang tersedia.
                        </p>
                    </motion.div>

                    <div className="space-y-4">
                        {faqData.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{
                                    delay: index * 0.1,
                                    duration: 0.6,
                                }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                                                    <div className="bg-card rounded-md border border-border overflow-hidden hover:shadow-lg transition-all duration-300">
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors duration-200"
                                    >
                                        <span className="text-lg font-bold text-foreground pr-4">
                                            {faq.question}
                                        </span>
                                        <motion.div
                                            animate={{
                                                rotate:
                                                    openFaq === index ? 180 : 0,
                                            }}
                                            transition={{ duration: 0.2 }}
                                            className="flex-shrink-0"
                                        >
                                            <ChevronDown className="w-6 h-6 text-primary" />
                                        </motion.div>
                                    </button>

                                    <AnimatePresence>
                                        {openFaq === index && (
                                            <motion.div
                                                initial={{
                                                    height: 0,
                                                    opacity: 0,
                                                }}
                                                animate={{
                                                    height: "auto",
                                                    opacity: 1,
                                                }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-8 pb-6 border-t border-border pt-6 bg-card">
                                                    <p className="text-muted-foreground leading-relaxed text-lg">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary text-primary-foreground">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                            Siap Memulai Perjalanan
                            <br />
                            Belajar Bahasa Jepang?
                        </h2>

                        <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
                        Bergabunglah dengan pengguna lain yang sedang belajar bahasa Jepang dari nol. Mulai sekarang dan tingkatkan kemampuanmu sedikit demi sedikit!
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href={route('register')}
                                className="inline-flex items-center justify-center px-8 py-4 bg-background text-primary font-semibold rounded-md transition-colors duration-200 shadow-lg hover:bg-background/90"
                            >
                                <Rocket className="w-5 h-5 mr-2" />
                                Daftar Sekarang - GRATIS!
                            </Link>
                            <button
     onClick={() =>
        document
            .getElementById("timeline")
            .scrollIntoView({
                behavior: "smooth",
            })
    }
    className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-foreground text-primary-foreground hover:bg-background hover:text-primary font-semibold rounded-md transition-all duration-200"
>
    <ArrowRight className="w-5 h-5 mr-2" />
    Lihat Panduan Belajar
</button>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex flex-wrap justify-center items-center gap-8 pt-8">
                            <div className="flex items-center space-x-2 text-primary-foreground/80">
                                <CheckCircle className="w-5 h-5" />
                                <span>100% Gratis</span>
                            </div>
                            <div className="flex items-center space-x-2 text-primary-foreground/80">
                                <CheckCircle className="w-5 h-5" />
                                <span>Tanpa Iklan</span>
                            </div>
                            <div className="flex items-center space-x-2 text-primary-foreground/80">
                                <CheckCircle className="w-5 h-5" />
                                <span>Belajar dari 0</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
            </div>
        </Layout>
    );
}
