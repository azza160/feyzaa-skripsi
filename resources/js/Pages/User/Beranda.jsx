"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@inertiajs/react";
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
} from "lucide-react";

export default function Home() {
    const [typingText, setTypingText] = useState("");
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);

    const texts = [
        "Hiragana & Katakana",
        "Kosakata Jepang",
        "Sistem Level & EXP",
        "Kuis Interaktif",
    ];

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
            exp: 1000,
            title: "Berkembang",
            description: "Lanjut ke tahap berikutnya",
            features: ["Pembelajaran Katakana", "Kuis Katakana"],
            color: "bg-blue-500",
            bgColor: "bg-blue-50 dark:bg-blue-900/20",
            borderColor: "border-blue-200 dark:border-blue-800",
        },
        {
            level: 3,
            exp: 2200,
            title: "Menengah",
            description: "Mulai belajar kosakata",
            features: ["Bank Kosakata", "Kuis Kosakata Beginner"],
            color: "bg-purple-500",
            bgColor: "bg-purple-50 dark:bg-purple-900/20",
            borderColor: "border-purple-200 dark:border-purple-800",
        },
        {
            level: 4,
            exp: 3400,
            title: "Mahir",
            description: "Tingkatkan kemampuan",
            features: ["Kuis Kosakata Intermediate"],
            color: "bg-pink-500",
            bgColor: "bg-pink-50 dark:bg-pink-900/20",
            borderColor: "border-pink-200 dark:border-pink-800",
        },
        {
            level: 5,
            exp: 4500,
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

    return (
        <Layout>
            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
                {/* Mesh Gradient Background */}
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
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
                            <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-md">
                                <Star className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                <span className="text-blue-700 dark:text-blue-300 font-medium text-sm">
                                    Platform Pembelajaran #1 di Indonesia
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                <span className="text-gray-900 dark:text-white">
                                    Kuasai{" "}
                                </span>
                                <span className="text-blue-600 dark:text-blue-400">
                                    {typingText}
                                    <span className="animate-pulse">|</span>
                                </span>
                                <br />
                                <span className="text-gray-900 dark:text-white">
                                    dengan Mudah
                                </span>
                            </h1>

                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                                Bergabunglah dengan ribuan pelajar yang telah
                                menguasai bahasa Jepang melalui metode
                                pembelajaran interaktif dan sistem gamifikasi
                                yang revolusioner.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/login"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors duration-200 shadow-lg"
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
                                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white font-semibold rounded-md transition-all duration-200"
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
                                        src="/img/hero-bg-dark.png"
                                        alt="KotoBee App Interface"
                                        className="
      w-full 
      h-full 
      rounded-md 
                                  shadow-xl
      border-8 border-gray-200 dark:border-gray-700
      object-cover object-center
    "
                                    />
                                </div>

                                {/* Floating Cards */}
                                <motion.div
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 1, duration: 0.6 }}
                                    className="absolute -top-4 -left-4 bg-white dark:bg-gray-800 p-3 md:p-4 rounded-md shadow-xl border border-gray-200 dark:border-gray-700 max-w-[200px] md:max-w-xs"
                                >
                                    <div className="flex items-center space-x-2 md:space-x-3 mb-1 md:mb-2">
                                        <div className="w-6 h-6 md:w-8 md:h-8 bg-purple-100 dark:bg-purple-900 rounded-md flex items-center justify-center">
                                            <Gamepad2 className="w-3 h-3 md:w-4 md:h-4 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white text-xs md:text-sm">
                                                Gamifikasi
                                            </p>
                                            <p className="text-[10px] md:text-xs text-gray-600 dark:text-gray-400 hidden md:block">
                                                Belajar seperti bermain
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-[10px] md:text-xs text-gray-600 dark:text-gray-400">
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
                                    className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 p-3 md:p-4 rounded-md shadow-xl border border-gray-200 dark:border-gray-700 max-w-[200px] md:max-w-xs"
                                >
                                    <div className="flex items-center space-x-2 md:space-x-3 mb-1 md:mb-2">
                                        <div className="w-6 h-6 md:w-8 md:h-8 bg-red-100 dark:bg-red-900 rounded-md flex items-center justify-center">
                                            <Globe className="w-3 h-3 md:w-4 md:h-4 text-red-600 dark:text-red-400" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white text-xs md:text-sm">
                                                Bahasa Jepang
                                            </p>
                                            <p className="text-[10px] md:text-xs text-gray-600 dark:text-gray-400 hidden md:block">
                                                Bahasa yang indah
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-[10px] md:text-xs text-gray-600 dark:text-gray-400">
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
                                    className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 p-3 md:p-4 rounded-md shadow-xl border border-gray-200 dark:border-gray-700 max-w-[200px] md:max-w-xs"
                                >
                                    <div className="flex items-center space-x-2 md:space-x-3 mb-1 md:mb-2">
                                        <div className="w-6 h-6 md:w-8 md:h-8 bg-green-100 dark:bg-green-900 rounded-md flex items-center justify-center">
                                            <Gift className="w-3 h-3 md:w-4 md:h-4 text-green-600 dark:text-green-400" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white text-xs md:text-sm">
                                                100% Gratis
                                            </p>
                                            <p className="text-[10px] md:text-xs text-gray-600 dark:text-gray-400 hidden md:block">
                                                Tanpa biaya tersembunyi
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-[10px] md:text-xs text-gray-600 dark:text-gray-400">
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
                                    className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 p-3 md:p-4 rounded-md shadow-xl border border-gray-200 dark:border-gray-700 max-w-[200px] md:max-w-xs"
                                >
                                    <div className="flex items-center space-x-2 md:space-x-3 mb-1 md:mb-2">
                                        <div className="w-6 h-6 md:w-8 md:h-8 bg-yellow-100 dark:bg-yellow-900 rounded-md flex items-center justify-center">
                                            <Lightbulb className="w-3 h-3 md:w-4 md:h-4 text-yellow-600 dark:text-yellow-400" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white text-xs md:text-sm">
                                                Tips Pemula
                                            </p>
                                            <p className="text-[10px] md:text-xs text-gray-600 dark:text-gray-400 hidden md:block">
                                                Mulai dari dasar
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-[10px] md:text-xs text-gray-600 dark:text-gray-400">
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
            <section id="about" className="py-20 bg-white dark:bg-gray-900">
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
                            <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-md border border-blue-200 dark:border-blue-800">
                                <div className="flex items-center justify-center space-x-4">
                                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-md flex items-center justify-center">
                                        <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                                            Teknologi Masa Depan
                                        </h3>
                                        <p className="text-sm text-blue-700 dark:text-blue-300">
                                            Pembelajaran yang Revolusioner
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                            Mengapa Memilih KotoBee?
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Platform pembelajaran yang dirancang khusus untuk
                            generasi digital dengan metode yang terbukti efektif
                            dan teknologi terdepan.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
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
                                title: "Kurikulum Terstruktur",
                                description:
                                    "Kurikulum yang disusun oleh ahli bahasa Jepang dengan metode pembelajaran bertahap dari dasar hingga mahir.",
                                features: [
                                    "Pembelajaran Bertahap",
                                    "Materi Lengkap",
                                    "Metode Terbukti",
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
                                <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-md border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 h-full relative overflow-hidden">
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

                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
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
                                                        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
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
            <section className="py-20 bg-gray-50 dark:bg-gray-800">
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
                            <div className="bg-purple-50 dark:bg-purple-900/30 p-6 rounded-md border border-purple-200 dark:border-purple-800">
                                <div className="flex items-center justify-center space-x-4">
                                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-md flex items-center justify-center">
                                        <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">
                                            Sistem Gamifikasi
                                        </h3>
                                        <p className="text-sm text-purple-700 dark:text-purple-300">
                                            Level & EXP yang Memotivasi
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                            Sistem Level & EXP
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
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
                            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-8 rounded-md border border-yellow-200 dark:border-yellow-800 text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-200/30 dark:bg-yellow-500/20 rounded-full transform translate-x-8 -translate-y-8"></div>
                                <div className="relative">
                                    <div className="flex items-center justify-center space-x-3 mb-4">
                                        <Award className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                                        <h3 className="text-2xl font-bold text-yellow-800 dark:text-yellow-200">
                                            Setelah Level 5
                                        </h3>
                                    </div>
                                    <p className="text-yellow-700 dark:text-yellow-300 text-lg">
                                        EXP unlimited - Level tidak bertambah,
                                        tapi pembelajaran terus berlanjut dengan
                                        konten eksklusif dan tantangan baru yang
                                        lebih menantang!
                                    </p>
                                    <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-yellow-600 dark:text-yellow-400">
                                        <div className="flex items-center space-x-1">
                                            <Shield className="w-4 h-4" />
                                            <span>Konten Eksklusif</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Users className="w-4 h-4" />
                                            <span>Komunitas Elite</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Leaderboard Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
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
                            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-md border border-yellow-200 dark:border-yellow-800">
                                <div className="flex items-center justify-center space-x-4">
                                    <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-md flex items-center justify-center">
                                        <Trophy className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100">
                                            Kompetisi Global
                                        </h3>
                                        <p className="text-sm text-yellow-700 dark:text-yellow-300">
                                            Pelajar Terbaik Dunia
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                            Leaderboard Global
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Lihat pelajar terbaik dari seluruh dunia dan jadilah
                            bagian dari mereka. Raih peringkat tertinggi dan
                            dapatkan pengakuan global!
                        </p>
                    </motion.div>

                    {/* Leaderboard Cards */}
                    <div className="max-w-4xl mx-auto space-y-3">
                        {[
                            {
                                rank: 1,
                                name: "Sakura Tanaka",
                                level: 5,
                                exp: 4850,
                                avatar: "/placeholder.svg?height=80&width=80",
                                badges: ["🔥", "⚡", "💎"],
                            },
                            {
                                rank: 2,
                                name: "Hiroshi Yamamoto",
                                level: 5,
                                exp: 4720,
                                avatar: "/placeholder.svg?height=80&width=80",
                                badges: ["🔥", "⚡", "💎"],
                            },
                            {
                                rank: 3,
                                name: "Yuki Sato",
                                level: 4,
                                exp: 3800,
                                avatar: "/placeholder.svg?height=80&width=80",
                                badges: ["🔥", "⚡", "💎"],
                            },
                            {
                                rank: 4,
                                name: "Kenji Nakamura",
                                level: 4,
                                exp: 3500,
                                avatar: "/placeholder.svg?height=80&width=80",
                                badges: ["🔥", "⚡"],
                            },
                            {
                                rank: 5,
                                name: "Mei Watanabe",
                                level: 3,
                                exp: 2900,
                                avatar: "/placeholder.svg?height=80&width=80",
                                badges: ["🔥", "⚡"],
                            },
                        ].map((user, index) => {
                            const getMedal = (rank) => {
                                if (rank === 1) return "🥇";
                                if (rank === 2) return "🥈";
                                if (rank === 3) return "🥉";
                                return null;
                            };

                            return (
                                <motion.div
                                    key={user.rank}
                                    initial={{ y: 30, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{
                                        delay: index * 0.1,
                                        duration: 0.6,
                                    }}
                                    viewport={{ once: true }}
                                    className="group"
                                >
                                    <div className="bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                                        {/* Rank Background */}
                                        <div
                                            className={`absolute top-0 left-0 w-1 h-full ${
                                                user.rank === 1
                                                    ? "bg-yellow-500"
                                                    : user.rank === 2
                                                    ? "bg-gray-400"
                                                    : user.rank === 3
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
                                                        user.rank === 1
                                                            ? "bg-yellow-500"
                                                            : user.rank === 2
                                                            ? "bg-gray-400"
                                                            : user.rank === 3
                                                            ? "bg-orange-500"
                                                            : "bg-blue-500"
                                                    }`}
                                                >
                                                    {user.rank}
                                                </div>

                                                {/* Avatar with Medal */}
                                                <div className="relative">
                                                    <img
                                                        src={
                                                            user.avatar ||
                                                            "/placeholder.svg"
                                                        }
                                                        alt={user.name}
                                                        className="w-12 h-12 rounded-md object-cover border-2 border-gray-300 dark:border-gray-600"
                                                    />
                                                    {getMedal(user.rank) && (
                                                        <div className="absolute -top-1 -right-1 text-lg">
                                                            {getMedal(
                                                                user.rank
                                                            )}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* User Info */}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                                                        {user.name}
                                                    </h3>
                                                    <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                                                        <span>
                                                            ⭐ Level{" "}
                                                            {user.level}
                                                        </span>
                                                        <span>
                                                            {user.exp.toLocaleString()}{" "}
                                                            EXP
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Badges */}
                                            <div className="flex items-center justify-center space-x-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                                                {user.badges.map(
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
                                                            user.rank === 1
                                                                ? "bg-yellow-500"
                                                                : user.rank ===
                                                                  2
                                                                ? "bg-gray-400"
                                                                : user.rank ===
                                                                  3
                                                                ? "bg-orange-500"
                                                                : "bg-blue-500"
                                                        }`}
                                                    >
                                                        {user.rank}
                                                    </div>

                                                    {/* Avatar with Medal */}
                                                    <div className="relative">
                                                        <img
                                                            src={
                                                                user.avatar ||
                                                                "/placeholder.svg"
                                                            }
                                                            alt={user.name}
                                                            className="w-16 h-16 rounded-md object-cover border-2 border-gray-300 dark:border-gray-600"
                                                        />
                                                        {getMedal(
                                                            user.rank
                                                        ) && (
                                                            <div className="absolute -top-2 -right-2 text-2xl">
                                                                {getMedal(
                                                                    user.rank
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* User Info */}
                                                    <div>
                                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                                            {user.name}
                                                        </h3>
                                                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                                                            <div className="flex items-center space-x-1">
                                                                <span>⭐</span>
                                                                <span>
                                                                    Level{" "}
                                                                    {user.level}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center space-x-1">
                                                                <span className="font-medium">
                                                                    {user.exp.toLocaleString()}{" "}
                                                                    EXP
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Badges */}
                                                <div className="flex items-center space-x-2">
                                                    {user.badges.map(
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
                        })}
                    </div>

                    {/* Call to Action */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 md:p-8 rounded-md border border-blue-200 dark:border-blue-800">
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Ingin Masuk Leaderboard?
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                                Mulai belajar sekarang dan kumpulkan EXP
                                sebanyak-banyaknya. Jadilah yang terdepan dan
                                raih pengakuan global!
                            </p>
                            <Link
                                href="/register"
                                className="inline-flex items-center justify-center px-6 md:px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors duration-200"
                            >
                                <Trophy className="w-5 h-5 mr-2" />
                                Mulai Kompetisi
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
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
                            <div className="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-md border border-indigo-200 dark:border-indigo-800">
                                <div className="flex items-center justify-center space-x-4">
                                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-md flex items-center justify-center">
                                        <HelpCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100">
                                            Bantuan & Dukungan
                                        </h3>
                                        <p className="text-sm text-indigo-700 dark:text-indigo-300">
                                            Jawaban untuk Pertanyaan Anda
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                            Pertanyaan yang Sering Diajukan
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
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
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300">
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                                    >
                                        <span className="text-lg font-bold text-gray-900 dark:text-white pr-4">
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
                                            <ChevronDown className="w-6 h-6 text-blue-600 dark:text-blue-400" />
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
                                                <div className="px-8 pb-6 border-t border-gray-200 dark:border-gray-700 pt-6 bg-white dark:bg-gray-900">
                                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
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
            <section className="py-20 bg-blue-600 text-white">
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

                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                            Bergabunglah dengan ribuan pelajar yang telah
                            merasakan pengalaman belajar yang revolusioner.
                            Mulai hari ini dan rasakan perbedaannya!
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/register"
                                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-md transition-colors duration-200 shadow-lg hover:bg-gray-100"
                            >
                                <Rocket className="w-5 h-5 mr-2" />
                                Daftar Sekarang - GRATIS!
                            </Link>
                            <Link
                                href="/huruf"
                                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold rounded-md transition-all duration-200"
                            >
                                <ArrowRight className="w-5 h-5 mr-2" />
                                Lihat Panduan Belajar
                            </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex flex-wrap justify-center items-center gap-8 pt-8">
                            <div className="flex items-center space-x-2 text-blue-100">
                                <CheckCircle className="w-5 h-5" />
                                <span>100% Gratis</span>
                            </div>
                            <div className="flex items-center space-x-2 text-blue-100">
                                <CheckCircle className="w-5 h-5" />
                                <span>Tanpa Iklan</span>
                            </div>
                            <div className="flex items-center space-x-2 text-blue-100">
                                <CheckCircle className="w-5 h-5" />
                                <span>Akses Selamanya</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
}
