import Layout from "../../Layouts/Layout";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, usePage, Head } from "@inertiajs/react";
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
    Languages,
    Volume2,
    ChevronLeft,
    ChevronRight,
    Check,
    Eye,
    RotateCcw,
} from "lucide-react";

export default function PengenalanHuruf() {
    const [typingText, setTypingText] = useState("");
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [currentStroke, setCurrentStroke] = useState(0);
    const [isLearned, setIsLearned] = useState(false);
    const texts = [
        "Huruf Jepang dari Nol",
        "Hiragana & Katakana",
        "Cara Baca & Tulis Huruf",
        "Belajar Interaktif + Suara",
    ];

    const strokeImages = [
        "/placeholder.svg?height=200&width=200&text=Stroke+1",
        "/placeholder.svg?height=200&width=200&text=Stroke+2",
        "/placeholder.svg?height=200&width=200&text=Stroke+3",
    ];

    const handleLearnedToggle = () => {
        setIsLearned(!isLearned);
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, staggerChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

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

    return (
        <Layout>
            <Head>
                <title>Pengenalan Huruf</title>
            </Head>
            <div className="w-full overflow-x-hidden">
                {/* Hero Section */}
                <section className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
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
                                        Kenali{" "}
                                    </span>
                                    <span className="text-primary">
                                        {typingText}
                                        <span className="animate-pulse">|</span>
                                    </span>
                                    <br />
                                    <span className="text-foreground">
                                        untuk Kuasai Bahasa Jepang
                                    </span>
                                </h1>

                                <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                    Mulai dari <strong>huruf dasar</strong>{" "}
                                    seperti Hiragana & Katakana, pahami cara
                                    baca, tulis, dan pelafalan, sebelum
                                    melangkah ke kosakata dan Kanji. Semua
                                    dirancang khusus untuk pemula.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href={route("login")}
                                        className="inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md transition-colors duration-200 shadow-lg"
                                    >
                                        <Play className="w-5 h-5 mr-2" />
                                        Mulai Belajar Huruf
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
                                        Mengapa Harus Belajar Huruf?
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* mengapa harus belajar huruf */}
                <motion.section
                    className="py-20 px-4 bg-gray-50 dark:bg-background relative overflow-hidden"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    {/* Decorative Elements */}
                    <div className="absolute top-10 left-10 w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full opacity-50"></div>
                    <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-100 dark:bg-pink-900/30 rounded-full opacity-50"></div>
                    <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full opacity-30"></div>

                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8  relative z-10">
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
                                                Belajar huruf jepang
                                            </h3>
                                            <p className="text-sm text-primary/80">
                                                Belajar huruf jepang
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                                Mengapa Harus Belajar Huruf Terlebih dahulu?
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                Platform pembelajaran yang dirancang khusus
                                untuk generasi digital dengan metode yang
                                terbukti efektif dan teknologi terdepan.
                            </p>
                        </motion.div>

                        <div className="space-y-16">
                            {/* First Point */}
                            <motion.div
                                className="flex flex-col lg:flex-row items-center gap-8"
                                variants={itemVariants}
                            >
                                <div className="lg:w-1/2">
                                    <div className="bg-white dark:bg-gray-700 p-8 rounded-md shadow-xl relative">
                                        <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                            1
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                            Fondasi Bahasa Jepang
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                            Huruf adalah pondasi utama dalam
                                            mempelajari bahasa Jepang. Tanpa
                                            menguasai huruf, kamu akan kesulitan
                                            membaca, menulis, dan memahami
                                            konteks kalimat dengan benar.
                                        </p>
                                    </div>
                                </div>
                                <div className="lg:w-1/2 flex justify-center">
                                    <div className="relative">
                                        <div className="w-64 h-64 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                                            <span className="text-6xl text-white font-bold">
                                                あ
                                            </span>
                                        </div>
                                        <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                                            <BookOpen className="w-8 h-8 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Second Point */}
                            <motion.div
                                className="flex flex-col lg:flex-row-reverse items-center gap-8"
                                variants={itemVariants}
                            >
                                <div className="lg:w-1/2">
                                    <div className="bg-white dark:bg-gray-700 p-8 rounded-md shadow-xl relative">
                                        <div className="absolute -top-4 -right-4 w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                            2
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                            Membuka Dunia Konten Jepang
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                            Dengan menguasai huruf Jepang, kamu
                                            bisa menikmati anime, manga, novel,
                                            dan konten digital Jepang dalam
                                            bahasa aslinya tanpa bergantung pada
                                            terjemahan.
                                        </p>
                                    </div>
                                </div>
                                <div className="lg:w-1/2 flex justify-center">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="w-24 h-32 bg-pink-500 rounded-md flex items-center justify-center text-white font-bold text-2xl">
                                            漫画
                                        </div>
                                        <div className="w-24 h-32 bg-purple-500 rounded-md flex items-center justify-center text-white font-bold text-2xl">
                                            小説
                                        </div>
                                        <div className="w-24 h-32 bg-green-500 rounded-md flex items-center justify-center text-white font-bold text-2xl">
                                            ゲーム
                                        </div>
                                        <div className="w-24 h-32 bg-orange-500 rounded-md flex items-center justify-center text-white font-bold text-2xl">
                                            映画
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Third Point */}
                            <motion.div
                                className="flex flex-col lg:flex-row items-center gap-8"
                                variants={itemVariants}
                            >
                                <div className="lg:w-1/2">
                                    <div className="bg-white dark:bg-gray-700 p-8 rounded-md shadow-xl relative">
                                        <div className="absolute -top-4 -left-4 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                            3
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                            Peluang Karir & Studi
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                            Kemampuan membaca huruf Jepang
                                            membuka peluang beasiswa, pekerjaan
                                            di perusahaan Jepang, dan kesempatan
                                            studi atau bekerja di Jepang.
                                        </p>
                                    </div>
                                </div>
                                <div className="lg:w-1/2 flex justify-center">
                                    <div className="relative">
                                        <div className="w-48 h-48 bg-gradient-to-br from-green-400 to-green-600 rounded-md flex items-center justify-center transform rotate-3">
                                            <div className="text-center text-white">
                                                <Trophy className="w-12 h-12 mx-auto mb-2" />
                                                <span className="text-2xl font-bold">
                                                    Success
                                                </span>
                                            </div>
                                        </div>
                                        <div className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                                            <Target className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                {/* Perbedaan Huruf */}
                <motion.section
                    className="py-20 px-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
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
                                                Belajar huruf jepang
                                            </h3>
                                            <p className="text-sm text-primary/80">
                                                Belajar huruf jepang
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                                Mengapa Harus Belajar Huruf Terlebih dahulu?
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                Platform pembelajaran yang dirancang khusus
                                untuk generasi digital dengan metode yang
                                terbukti efektif dan teknologi terdepan.
                            </p>
                        </motion.div>

                        <motion.div
                            className="grid md:grid-cols-2 gap-8 mb-12"
                            variants={itemVariants}
                        >
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-8 rounded-md shadow-lg border-l-4 border-blue-500">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                                        <span className="text-white font-bold text-xl">
                                            あ
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Sistem Vokal Jepang
                                    </h3>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Jepang hanya punya 5 vokal:{" "}
                                    <strong>a, i, u, e, o</strong>. Lebih
                                    sederhana dari bahasa Indonesia yang punya
                                    banyak variasi bunyi vokal.
                                </p>
                                <div className="flex gap-2">
                                    {["あ", "い", "う", "え", "お"].map(
                                        (char, idx) => (
                                            <div
                                                key={idx}
                                                className="w-12 h-12 bg-white dark:bg-gray-700 rounded-md flex items-center justify-center shadow-md"
                                            >
                                                <span className="text-blue-600 dark:text-blue-400 font-bold">
                                                    {char}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 p-8 rounded-md shadow-lg border-l-4 border-pink-500">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mr-4">
                                        <span className="text-white font-bold text-xl">
                                            ラ
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Bunyi Konsonan
                                    </h3>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Tidak semua bunyi Indonesia ada di Jepang.
                                    Contoh: bunyi "L" dan "V" tidak ada, jadi
                                    "Laptop" jadi "Rapputoppu".
                                </p>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded">
                                            L → R
                                        </span>
                                        <span className="text-gray-600 dark:text-gray-400">
                                            Laptop → ラップトップ
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded">
                                            V → B
                                        </span>
                                        <span className="text-gray-600 dark:text-gray-400">
                                            Video → ビデオ
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-white dark:bg-gray-700 rounded-md shadow-xl overflow-hidden"
                            variants={itemVariants}
                        >
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                                <h3 className="text-2xl font-bold text-white text-center">
                                    Perbandingan Bunyi
                                </h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-100 dark:bg-gray-600">
                                        <tr>
                                            <th className="px-6 py-4 text-left font-semibold text-gray-900 dark:text-white">
                                                Huruf Indonesia
                                            </th>
                                            <th className="px-6 py-4 text-left font-semibold text-gray-900 dark:text-white">
                                                Huruf Jepang
                                            </th>
                                            <th className="px-6 py-4 text-left font-semibold text-gray-900 dark:text-white">
                                                Contoh Kata
                                            </th>
                                            <th className="px-6 py-4 text-left font-semibold text-gray-900 dark:text-white">
                                                Hasil
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                        {[
                                            {
                                                indo: "L",
                                                jp: "R (ラ行)",
                                                example: "Laptop",
                                                result: "ラップトップ",
                                                color: "bg-red-50 dark:bg-red-900/10",
                                            },
                                            {
                                                indo: "V",
                                                jp: "B (バ行)",
                                                example: "Video",
                                                result: "ビデオ",
                                                color: "bg-blue-50 dark:bg-blue-900/10",
                                            },
                                            {
                                                indo: "F",
                                                jp: "H/F (ハ行)",
                                                example: "File",
                                                result: "ファイル",
                                                color: "bg-green-50 dark:bg-green-900/10",
                                            },
                                        ].map((row, idx) => (
                                            <tr
                                                key={idx}
                                                className={`${row.color} hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors`}
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                                                            <span className="font-bold text-gray-900 dark:text-white">
                                                                {row.indo}
                                                            </span>
                                                        </div>
                                                        <span className="font-semibold text-gray-900 dark:text-white">
                                                            {row.indo}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                                                        {row.jp}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                    {row.example}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                                        {row.result}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    </div>
                </motion.section>

                {/* 3 Jenis Huruf */}
                <motion.section
                    className="py-20 px-4 bg-gray-50 dark:bg-gray-800"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
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
                                                Belajar huruf jepang
                                            </h3>
                                            <p className="text-sm text-primary/80">
                                                Belajar huruf jepang
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                                Mengapa Harus Belajar Huruf Terlebih dahulu?
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                Platform pembelajaran yang dirancang khusus
                                untuk generasi digital dengan metode yang
                                terbukti efektif dan teknologi terdepan.
                            </p>
                        </motion.div>

                        <div className="space-y-12">
                            {/* Hiragana */}
                            <motion.div
                                className="bg-white dark:bg-gray-700 rounded-md shadow-xl p-8 relative overflow-hidden"
                                variants={itemVariants}
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100 dark:bg-pink-900/20 rounded-full -translate-y-16 translate-x-16"></div>

                                <div className="flex items-center mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-md flex items-center justify-center mr-6">
                                        <span className="text-white font-bold text-2xl">
                                            ひ
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            Hiragana
                                        </h3>
                                        <p className="text-pink-600 dark:text-pink-400 font-medium">
                                            hiragana
                                        </p>
                                    </div>
                                </div>

                                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                                    Huruf dasar untuk kata-kata asli Jepang.
                                    Bentuknya melengkung dan lembut, digunakan
                                    untuk partikel, akhiran kata, dan kata-kata
                                    yang tidak memiliki kanji.
                                </p>

                                <div className="border-t border-gray-200 dark:border-gray-600 pt-6 mb-6"></div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    {[
                                        { jp: "あ", romaji: "a" },
                                        { jp: "い", romaji: "i" },
                                        { jp: "か", romaji: "ka" },
                                        { jp: "き", romaji: "ki" },
                                    ].map((char, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-md text-center border-2 border-pink-200 dark:border-pink-700"
                                        >
                                            <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">
                                                {char.jp}
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                                                {char.romaji}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid md:grid-cols-3 gap-4">
                                    {[
                                        {
                                            furigana: "あさ",
                                            romaji: "asa",
                                            meaning: "pagi",
                                        },
                                        {
                                            furigana: "ねこ",
                                            romaji: "neko",
                                            meaning: "kucing",
                                        },
                                        {
                                            furigana: "みず",
                                            romaji: "mizu",
                                            meaning: "air",
                                        },
                                    ].map((word, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/10 dark:to-pink-800/10 p-4 rounded-md border border-pink-200 dark:border-pink-700"
                                        >
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-1">
                                                    {word.furigana}
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                                    {word.romaji}
                                                </div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {word.meaning}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Katakana */}
                            <motion.div
                                className="bg-white dark:bg-gray-700 rounded-md shadow-xl p-8 relative overflow-hidden"
                                variants={itemVariants}
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 dark:bg-blue-900/20 rounded-full -translate-y-16 translate-x-16"></div>

                                <div className="flex items-center mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-md flex items-center justify-center mr-6">
                                        <span className="text-white font-bold text-2xl">
                                            カ
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            Katakana
                                        </h3>
                                        <p className="text-blue-600 dark:text-blue-400 font-medium">
                                            katakana
                                        </p>
                                    </div>
                                </div>

                                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                                    Untuk kata serapan asing dan penekanan.
                                    Bentuknya lebih kaku dan angular, digunakan
                                    untuk nama asing, makanan luar negeri, dan
                                    istilah teknis.
                                </p>

                                <div className="border-t border-gray-200 dark:border-gray-600 pt-6 mb-6"></div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    {[
                                        { jp: "ア", romaji: "a" },
                                        { jp: "イ", romaji: "i" },
                                        { jp: "カ", romaji: "ka" },
                                        { jp: "キ", romaji: "ki" },
                                    ].map((char, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md text-center border-2 border-blue-200 dark:border-blue-700"
                                        >
                                            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                                {char.jp}
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                                                {char.romaji}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid md:grid-cols-3 gap-4">
                                    {[
                                        {
                                            furigana: "コーヒー",
                                            romaji: "koohii",
                                            meaning: "kopi",
                                        },
                                        {
                                            furigana: "カメラ",
                                            romaji: "kamera",
                                            meaning: "kamera",
                                        },
                                        {
                                            furigana: "コンピュータ",
                                            romaji: "konpyuuta",
                                            meaning: "komputer",
                                        },
                                    ].map((word, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/10 dark:to-blue-800/10 p-4 rounded-md border border-blue-200 dark:border-blue-700"
                                        >
                                            <div className="text-center">
                                                <div className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                                                    {word.furigana}
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                                    {word.romaji}
                                                </div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {word.meaning}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Kanji */}
                            <motion.div
                                className="bg-white dark:bg-gray-700 rounded-md shadow-xl p-8 relative overflow-hidden"
                                variants={itemVariants}
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 dark:bg-green-900/20 rounded-full -translate-y-16 translate-x-16"></div>

                                <div className="flex items-center mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-md flex items-center justify-center mr-6">
                                        <span className="text-white font-bold text-2xl">
                                            漢
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            Kanji
                                        </h3>
                                        <p className="text-green-600 dark:text-green-400 font-medium">
                                            kanji
                                        </p>
                                    </div>
                                </div>

                                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                                    Huruf Cina yang diadopsi. Satu karakter bisa
                                    punya banyak arti dan cara baca, digunakan
                                    untuk kata benda, kata kerja, dan kata
                                    sifat.
                                </p>

                                <div className="border-t border-gray-200 dark:border-gray-600 pt-6 mb-6"></div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    {[
                                        { jp: "水", romaji: "mizu" },
                                        { jp: "火", romaji: "hi" },
                                        { jp: "木", romaji: "ki" },
                                        { jp: "金", romaji: "kin" },
                                    ].map((char, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md text-center border-2 border-green-200 dark:border-green-700"
                                        >
                                            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                                                {char.jp}
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                                                {char.romaji}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid md:grid-cols-3 gap-4">
                                    {[
                                        {
                                            furigana: "学校",
                                            romaji: "gakkou",
                                            meaning: "sekolah",
                                        },
                                        {
                                            furigana: "日本",
                                            romaji: "nihon",
                                            meaning: "Jepang",
                                        },
                                        {
                                            furigana: "先生",
                                            romaji: "sensei",
                                            meaning: "guru",
                                        },
                                    ].map((word, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/10 dark:to-green-800/10 p-4 rounded-md border border-green-200 dark:border-green-700"
                                        >
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                                                    {word.furigana}
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                                    {word.romaji}
                                                </div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {word.meaning}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                {/* Kategori Huruf */}
                <motion.section
                    className="py-20 px-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
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
                                                Belajar huruf jepang
                                            </h3>
                                            <p className="text-sm text-primary/80">
                                                Belajar huruf jepang
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                                Mengapa Harus Belajar Huruf Terlebih dahulu?
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                Platform pembelajaran yang dirancang khusus
                                untuk generasi digital dengan metode yang
                                terbukti efektif dan teknologi terdepan.
                            </p>
                        </motion.div>

                        <div className="space-y-12">
                            {/* Gojuon */}
                            <motion.div
                                className="bg-white dark:bg-gray-700 rounded-md shadow-xl p-8 relative overflow-hidden"
                                variants={itemVariants}
                            >
                                <div className="absolute top-0 left-0 w-24 h-24 bg-purple-100 dark:bg-purple-900/20 rounded-full -translate-y-12 -translate-x-12"></div>

                                <div className="flex items-center mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-md flex items-center justify-center mr-6">
                                        <span className="text-white font-bold text-xl">
                                            五十音
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            Gojuon
                                        </h3>
                                        <p className="text-purple-600 dark:text-purple-400 font-medium">
                                            gojuuon
                                        </p>
                                    </div>
                                </div>

                                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                                    Tabel dasar 50 huruf Hiragana dan Katakana
                                    yang disusun dalam 5 kolom vokal dan 10
                                    baris konsonan. Ini adalah fondasi sistem
                                    penulisan Jepang.
                                </p>

                                <div className="border-t border-gray-200 dark:border-gray-600 pt-6 mb-6"></div>

                                <div className="grid grid-cols-5 gap-2 mb-6">
                                    {[
                                        "あ/ア",
                                        "か/カ",
                                        "さ/サ",
                                        "た/タ",
                                        "な/ナ",
                                    ].map((char, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-md text-center border border-purple-200 dark:border-purple-700"
                                        >
                                            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                                                {char}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/10 dark:to-purple-800/10 p-4 rounded-md border border-purple-200 dark:border-purple-700">
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                            Hiragana
                                        </h4>
                                        <div className="text-2xl text-purple-600 dark:text-purple-400">
                                            あいうえお かきくけこ
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/10 dark:to-purple-800/10 p-4 rounded-md border border-purple-200 dark:border-purple-700">
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                            Katakana
                                        </h4>
                                        <div className="text-2xl text-purple-600 dark:text-purple-400">
                                            アイウエオ カキクケコ
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Dakuten & Handakuten */}
                            <motion.div
                                className="bg-white dark:bg-gray-700 rounded-md shadow-xl p-8 relative overflow-hidden"
                                variants={itemVariants}
                            >
                                <div className="absolute top-0 left-0 w-24 h-24 bg-orange-100 dark:bg-orange-900/20 rounded-full -translate-y-12 -translate-x-12"></div>

                                <div className="flex items-center mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-md flex items-center justify-center mr-6">
                                        <span className="text-white font-bold text-xl">
                                            ゛゜
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            Dakuten & Handakuten
                                        </h3>
                                        <p className="text-orange-600 dark:text-orange-400 font-medium">
                                            dakuten & handakuten
                                        </p>
                                    </div>
                                </div>

                                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                                    Tanda diakritik yang mengubah bunyi huruf
                                    dasar. Dakuten (゛) membuat bunyi bersuara,
                                    Handakuten (゜) khusus untuk baris H menjadi
                                    P.
                                </p>

                                <div className="border-t border-gray-200 dark:border-gray-600 pt-6 mb-6"></div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    {[
                                        {
                                            original: "か",
                                            modified: "が",
                                            type: "dakuten",
                                        },
                                        {
                                            original: "さ",
                                            modified: "ざ",
                                            type: "dakuten",
                                        },
                                        {
                                            original: "は",
                                            modified: "ば",
                                            type: "dakuten",
                                        },
                                        {
                                            original: "は",
                                            modified: "ぱ",
                                            type: "handakuten",
                                        },
                                    ].map((char, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-md text-center border border-orange-200 dark:border-orange-700"
                                        >
                                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                                {char.original} →
                                            </div>
                                            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                                                {char.modified}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/10 dark:to-orange-800/10 p-4 rounded-md border border-orange-200 dark:border-orange-700">
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                            Hiragana
                                        </h4>
                                        <div className="text-xl text-orange-600 dark:text-orange-400">
                                            がざだば ぱぴぷぺぽ
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/10 dark:to-orange-800/10 p-4 rounded-md border border-orange-200 dark:border-orange-700">
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                            Katakana
                                        </h4>
                                        <div className="text-xl text-orange-600 dark:text-orange-400">
                                            ガザダバ パピプペポ
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                {/* Fokus Hiragana */}
                <motion.section
                    className="py-20 px-4 bg-gray-50 dark:bg-gray-800 relative overflow-hidden"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    {/* Decorative Elements */}
                    <div className="absolute top-20 left-10 w-32 h-32 bg-pink-200 dark:bg-pink-900/30 rounded-full opacity-30"></div>
                    <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-200 dark:bg-blue-900/30 rounded-full opacity-40"></div>
                    <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-green-200 dark:bg-green-900/30 rounded-full opacity-50"></div>

                    <div className="max-w-7xl mx-auto relative z-10 sm:px-6 lg:px-8">
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
                                                Belajar huruf jepang
                                            </h3>
                                            <p className="text-sm text-primary/80">
                                                Belajar huruf jepang
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                                Mengapa Harus Belajar Huruf Terlebih dahulu?
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                Platform pembelajaran yang dirancang khusus
                                untuk generasi digital dengan metode yang
                                terbukti efektif dan teknologi terdepan.
                            </p>
                        </motion.div>

                        <div className="text-center mb-12">
                            <motion.div
                                className="inline-block bg-white dark:bg-gray-700 p-8 rounded-md shadow-2xl relative"
                                variants={itemVariants}
                            >
                                <div className="absolute -top-4 -left-4 w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold">
                                        1
                                    </span>
                                </div>
                                <div className="text-6xl font-bold text-pink-500 mb-4">
                                    ひらがな
                                </div>
                                <div className="text-2xl text-gray-600 dark:text-gray-300">
                                    Hiragana
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            className="bg-white dark:bg-gray-700 rounded-md shadow-xl p-8 mb-12 text-center"
                            variants={itemVariants}
                        >
                            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">
                                Di platform ini, kamu{" "}
                                <strong className="text-pink-600 dark:text-pink-400">
                                    fokus dulu ke Hiragana
                                </strong>
                                : mengenal bentuk, bunyi, dan penggunaannya.
                                Setelah kuat di Hiragana, belajar Katakana jadi
                                mudah. Kanji? Belakangan, setelah pondasi kuat.
                            </p>
                        </motion.div>

                        <motion.div
                            className="grid md:grid-cols-3 gap-8"
                            variants={containerVariants}
                        >
                            <motion.div
                                className="bg-gradient-to-br from-pink-500 to-pink-600 p-8 rounded-md shadow-xl text-white text-center relative overflow-hidden"
                                variants={itemVariants}
                            >
                                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                                <div className="relative z-10">
                                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl font-bold">
                                            1
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">
                                        Hiragana
                                    </h3>
                                    <p className="text-pink-100">
                                        Mulai dari sini! Pelajari 46 huruf dasar
                                        dengan bentuk yang lembut dan
                                        melengkung.
                                    </p>
                                    <div className="mt-4 text-3xl font-bold">
                                        ひらがな
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-md shadow-xl text-white text-center relative overflow-hidden opacity-60"
                                variants={itemVariants}
                            >
                                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                                <div className="relative z-10">
                                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl font-bold">
                                            2
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">
                                        Katakana
                                    </h3>
                                    <p className="text-blue-100">
                                        Setelah Hiragana, lanjut ke Katakana.
                                        Bentuknya lebih kaku tapi polanya sama.
                                    </p>
                                    <div className="mt-4 text-3xl font-bold">
                                        カタカナ
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-md shadow-xl text-white text-center relative overflow-hidden opacity-40"
                                variants={itemVariants}
                            >
                                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                                <div className="relative z-10">
                                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl font-bold">
                                            3
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">
                                        Kanji
                                    </h3>
                                    <p className="text-green-100">
                                        Terakhir, pelajari Kanji setelah pondasi
                                        Hiragana dan Katakana kuat.
                                    </p>
                                    <div className="mt-4 text-3xl font-bold">
                                        漢字
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="text-center mt-12"
                            variants={itemVariants}
                        >
                            <div className="bg-white dark:bg-gray-700 p-6 rounded-md shadow-lg inline-block">
                                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                                    <strong>Mengapa urutan ini penting?</strong>
                                </p>
                                <div className="flex items-center justify-center gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                                        <span className="text-gray-600 dark:text-gray-400">
                                            Pondasi kuat
                                        </span>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-gray-400" />
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                        <span className="text-gray-600 dark:text-gray-400">
                                            Pola sama
                                        </span>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-gray-400" />
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <span className="text-gray-600 dark:text-gray-400">
                                            Siap Kanji
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Sistem Belajar */}
                <motion.section
                    id="sistem-belajar"
                    className="py-20 px-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
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
                                                Belajar huruf jepang
                                            </h3>
                                            <p className="text-sm text-primary/80">
                                                Belajar huruf jepang
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                                Mengapa Harus Belajar Huruf Terlebih dahulu?
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                Platform pembelajaran yang dirancang khusus
                                untuk generasi digital dengan metode yang
                                terbukti efektif dan teknologi terdepan.
                            </p>
                        </motion.div>

                        {/* Card Huruf */}
                        <motion.div
                            className={`bg-white dark:bg-gray-700 rounded-md shadow-2xl p-8 mb-12 relative overflow-hidden transition-all duration-500 ${
                                isLearned
                                    ? "border-4 border-green-500"
                                    : "border border-gray-200 dark:border-gray-600"
                            }`}
                            variants={itemVariants}
                        >
                            {isLearned && (
                                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                    Huruf sudah dipelajari
                                </div>
                            )}

                            {/* Huruf & Romaji */}
                            <div className="text-center mb-8">
                                <div className="text-8xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                                    あ
                                </div>
                                <div className="text-3xl text-gray-600 dark:text-gray-300 font-medium mb-6">
                                    a
                                </div>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md flex items-center gap-2 mx-auto transition-colors">
                                    <Volume2 className="w-5 h-5" />
                                    Dengar Pelafalan
                                </button>
                            </div>

                            {/* Stroke Order */}
                            <div className="mb-8">
                                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                                    Stroke Order
                                </h4>
                                <div className="bg-gray-100 dark:bg-gray-600 p-6 rounded-md">
                                    <div className="flex justify-center mb-4">
                                        <img
                                            src={
                                                strokeImages[currentStroke] ||
                                                "/placeholder.svg"
                                            }
                                            alt={`Stroke ${currentStroke + 1}`}
                                            className="w-48 h-48 object-contain"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <button
                                            onClick={() =>
                                                setCurrentStroke(
                                                    Math.max(
                                                        0,
                                                        currentStroke - 1
                                                    )
                                                )
                                            }
                                            disabled={currentStroke === 0}
                                            className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                            Sebelumnya
                                        </button>

                                        <div className="flex gap-2">
                                            {strokeImages.map((_, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`w-3 h-3 rounded-full transition-colors ${
                                                        idx === currentStroke
                                                            ? "bg-blue-600"
                                                            : "bg-gray-300 dark:bg-gray-500"
                                                    }`}
                                                />
                                            ))}
                                        </div>

                                        <button
                                            onClick={() =>
                                                setCurrentStroke(
                                                    Math.min(
                                                        strokeImages.length - 1,
                                                        currentStroke + 1
                                                    )
                                                )
                                            }
                                            disabled={
                                                currentStroke ===
                                                strokeImages.length - 1
                                            }
                                            className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                        >
                                            Selanjutnya
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="text-center mt-2 text-sm text-gray-600 dark:text-gray-400">
                                        Langkah {currentStroke + 1} dari{" "}
                                        {strokeImages.length}
                                    </div>
                                </div>
                            </div>

                            {/* Contoh Penggunaan */}
                            <div className="mb-8">
                                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                                    Contoh Penggunaan
                                </h4>
                                <div className="grid md:grid-cols-3 gap-4">
                                    {[
                                        {
                                            furigana: "あなた",
                                            romaji: "anata",
                                            meaning: "kamu",
                                            highlight: 0,
                                        },
                                        {
                                            furigana: "あさ",
                                            romaji: "asa",
                                            meaning: "pagi",
                                            highlight: 0,
                                        },
                                        {
                                            furigana: "あか",
                                            romaji: "aka",
                                            meaning: "merah",
                                            highlight: 0,
                                        },
                                    ].map((word, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-200 dark:border-blue-700"
                                        >
                                            <div className="text-center mb-3">
                                                <div className="text-2xl font-bold mb-2">
                                                    {word.furigana
                                                        .split("")
                                                        .map(
                                                            (char, charIdx) => (
                                                                <span
                                                                    key={
                                                                        charIdx
                                                                    }
                                                                    className={
                                                                        charIdx ===
                                                                        word.highlight
                                                                            ? "bg-yellow-300 dark:bg-yellow-600 px-1 rounded"
                                                                            : ""
                                                                    }
                                                                >
                                                                    {char}
                                                                </span>
                                                            )
                                                        )}
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                                    {word.romaji}
                                                </div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {word.meaning}
                                                </div>
                                            </div>
                                            <button className="w-full bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700 text-blue-700 dark:text-blue-300 py-2 rounded-md flex items-center justify-center gap-2 transition-colors">
                                                <Volume2 className="w-4 h-4" />
                                                Dengar
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tombol Learned */}
                            <div className="text-center">
                                <button
                                    onClick={handleLearnedToggle}
                                    className={`px-8 py-4 rounded-md font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2 mx-auto ${
                                        isLearned
                                            ? "bg-orange-600 hover:bg-orange-700 text-white"
                                            : "bg-green-600 hover:bg-green-700 text-white"
                                    }`}
                                >
                                    {isLearned ? (
                                        <>
                                            <RotateCcw className="w-5 h-5" />
                                            Pelajari Kembali
                                        </>
                                    ) : (
                                        <>
                                            <Check className="w-5 h-5" />
                                            Saya Telah Memahami Huruf Ini
                                        </>
                                    )}
                                </button>

                                {isLearned && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-md inline-block"
                                    >
                                        🎉 Anda mendapatkan 5 EXP dari
                                        mempelajari huruf ini!
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>

                        {/* Fitur Deskripsi */}
                        <motion.div variants={itemVariants}>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[
                                    {
                                        icon: BookOpen,
                                        title: "Huruf + Romaji",
                                        desc: "Setiap huruf ditampilkan dengan romanisasi yang jelas dan mudah dipahami",
                                        color: "bg-blue-500",
                                    },
                                    {
                                        icon: Volume2,
                                        title: "Audio Pelafalan",
                                        desc: "Dengar cara pengucapan yang benar dari native speaker Jepang",
                                        color: "bg-green-500",
                                    },
                                    {
                                        icon: Eye,
                                        title: "Stroke Order",
                                        desc: "Pelajari urutan goresan yang benar dengan animasi step-by-step",
                                        color: "bg-purple-500",
                                    },
                                    {
                                        icon: Target,
                                        title: "Contoh Kata",
                                        desc: "Lihat penggunaan huruf dalam kata-kata nyata dengan highlighting",
                                        color: "bg-pink-500",
                                    },
                                    {
                                        icon: Trophy,
                                        title: "Sistem EXP",
                                        desc: "Dapatkan poin pengalaman setiap kali menyelesaikan pembelajaran huruf",
                                        color: "bg-yellow-500",
                                    },
                                    {
                                        icon: Check,
                                        title: "Progress Tracking",
                                        desc: "Lacak kemajuan belajar dengan sistem penandaan huruf yang sudah dipelajari",
                                        color: "bg-indigo-500",
                                    },
                                ].map((feature, index) => (
                                    <div
                                        key={index}
                                        className="bg-white dark:bg-gray-700 rounded-md shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                                    >
                                        <div
                                            className={`w-14 h-14 ${feature.color} rounded-md flex items-center justify-center mb-4`}
                                        >
                                            <feature.icon className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                            {feature.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Kuis */}
                <motion.section
                    className="py-20 px-4 bg-gray-50 dark:bg-gray-800"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
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
                                                Belajar huruf jepang
                                            </h3>
                                            <p className="text-sm text-primary/80">
                                                Belajar huruf jepang
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                                Mengapa Harus Belajar Huruf Terlebih dahulu?
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                Platform pembelajaran yang dirancang khusus
                                untuk generasi digital dengan metode yang
                                terbukti efektif dan teknologi terdepan.
                            </p>
                        </motion.div>

                        
                        <motion.div
                            className="grid lg:grid-cols-3 gap-8 mb-12 z-[99999999]"
                            variants={itemVariants}
                        >
                            {[
                                {
                                    level: "Mudah",
                                    desc: "10 huruf dasar Hiragana",
                                    color: "from-green-400 to-green-600",
                                    icon: "🌱",
                                    features: [
                                        "Huruf dasar a-o",
                                        "Pilihan ganda",
                                        "Tanpa batasan waktu",
                                    ],
                                },
                                {
                                    level: "Sedang",
                                    desc: "25 huruf + dakuten",
                                    color: "from-yellow-400 to-yellow-600",
                                    icon: "🔥",
                                    features: [
                                        "Termasuk が、ざ、だ",
                                        "Mode tulis langsung",
                                        "Batasan waktu 30 detik",
                                    ],
                                },
                                {
                                    level: "Sulit",
                                    desc: "Semua huruf + yōon",
                                    color: "from-red-400 to-red-600",
                                    icon: "⚡",
                                    features: [
                                        "Kombinasi きゃ、しゅ、ちょ",
                                        "Mode campuran",
                                        "Batasan waktu 15 detik",
                                    ],
                                },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-white dark:bg-gray-700 rounded-md shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div
                                        className={`bg-gradient-to-r ${item.color} p-6 text-white text-center`}
                                    >
                                        <div className="text-4xl mb-2">
                                            {item.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold mb-2">
                                            {item.level}
                                        </h3>
                                        <p className="text-lg opacity-90">
                                            {item.desc}
                                        </p>
                                    </div>
                                    <div className="p-6">
                                        <ul className="space-y-3">
                                            {item.features.map(
                                                (feature, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="flex items-center gap-3"
                                                    >
                                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                        <span className="text-gray-700 dark:text-gray-300">
                                                            {feature}
                                                        </span>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            className="grid md:grid-cols-2 gap-8 mb-12"
                            variants={itemVariants}
                        >
                            <div className="bg-white dark:bg-gray-700 rounded-md shadow-lg p-8">
                                <div className="flex items-center mb-6">
                                    <div className="w-12 h-12 bg-blue-500 rounded-md flex items-center justify-center mr-4">
                                        <Target className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Mode Pilihan Ganda
                                    </h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Pilih jawaban yang benar dari 4 opsi yang
                                    tersedia. Cocok untuk pemula yang baru mulai
                                    mengenal huruf.
                                </p>
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
                                    <div className="text-center mb-3">
                                        <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                            あ
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Huruf ini dibaca...
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {["a", "i", "u", "e"].map(
                                            (option, idx) => (
                                                <button
                                                    key={idx}
                                                    className={`p-2 rounded text-sm ${
                                                        idx === 0
                                                            ? "bg-green-500 text-white"
                                                            : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                                                    }`}
                                                >
                                                    {option}
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-700 rounded-md shadow-lg p-8">
                                <div className="flex items-center mb-6">
                                    <div className="w-12 h-12 bg-purple-500 rounded-md flex items-center justify-center mr-4">
                                        <BookOpen className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Mode Tulis Langsung
                                    </h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Ketik romaji dari huruf yang ditampilkan.
                                    Mode ini menguji hafalan yang lebih
                                    mendalam.
                                </p>
                                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-md">
                                    <div className="text-center mb-3">
                                        <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                                            か
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Ketik romaji huruf ini:
                                        </p>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Ketik di sini..."
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center"
                                        value="ka"
                                        readOnly
                                    />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="text-center"
                            variants={itemVariants}
                        >
                            <button className="bg-purple-600 hover:bg-purple-700 text-white px-12 py-6 rounded-md font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center gap-3 mx-auto">
                                <Gamepad2 className="w-6 h-6" />
                                Lihat Sistem Kuis Huruf
                            </button>
                        </motion.div>
                    </div>
                </motion.section>

                  {/* CTA */}
      <motion.section
        className="py-20 px-4 bg-blue-600"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto text-center sm:px-6 lg:px-8">
          <motion.h2 className="text-3xl md:text-4xl font-bold text-white mb-8" variants={itemVariants}>
            Siap mulai perjalanan belajar huruf Jepang?
          </motion.h2>

          <motion.p className="text-xl text-blue-100 mb-12" variants={itemVariants}>
            Yuk mulai dari Hiragana dan bangun pondasi yang kuat untuk belajar bahasa Jepang!
          </motion.p>

          <motion.button
            className="bg-white text-blue-600 hover:bg-gray-100 px-12 py-6 rounded-md font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
            variants={itemVariants}
          >
            Mulai Belajar Hiragana
          </motion.button>
        </div>
      </motion.section>
            </div>
        </Layout>
    );
}
