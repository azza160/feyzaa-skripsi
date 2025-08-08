"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Clock,
    Trophy,
    Star,
    Zap,
    BookOpen,
    Target,
    Award,
    TrendingUp,
    CheckCircle,
    XCircle,
    RotateCcw,
    Play,
    Users,
    Brain,
    Sparkles,
    ArrowRight,
    ChevronDown,
    Volume2,
    Eye,
    Gamepad2,
    ChevronLeft,
    ChevronRight,
    Check,
    Rocket,
    Shield,
    HelpCircle,
    Globe,
    Gift,
    Lightbulb,
    Library,
    Languages,
} from "lucide-react";

import Layout from "../../Layouts/Layout";
import { Link, Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
export default function VocabularyQuizPreview() {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState({});

    const quizLevels = [
        {
            id: "beginner",
            title: "Beginner Level",
            icon: BookOpen,
            color: "bg-green-500",
            lightColor: "bg-green-50",
            borderColor: "border-green-200",
            textColor: "text-green-700",
            description:
                'Soal pada kuis ini terdiri dari 2 tipe utama yang dirancang untuk membangun fondasi kosakata Jepang yang kuat. Tipe pertama adalah "Jepang to Indonesia" dimana Anda akan melihat kata dalam bahasa Jepang (kanji, furigana, dan romaji) dan harus memilih arti yang tepat dalam bahasa Indonesia. Tipe kedua adalah "Indonesia to Jepang" dimana Anda akan melihat kata dalam bahasa Indonesia dan harus memilih padanan yang tepat dalam bahasa Jepang. Level ini fokus pada pengenalan dasar kosakata dan kemampuan menghubungkan kata antara kedua bahasa.',
            time: "10 menit",
            questions: 10,
            preview: {
                type: "japan-to-indonesia",
                question: "Apa arti dari kata berikut?",
                questionNumber: 1,
                vocabulary: {
                    kanji: "食べる",
                    furigana: "たべる",
                    romaji: "taberu",
                },
                options: [
                    { id: "a", text: "Minum", correct: false },
                    { id: "b", text: "Makan", correct: true },
                    { id: "c", text: "Tidur", correct: false },
                    { id: "d", text: "Berjalan", correct: false },
                ],
            },
        },
        {
            id: "intermediate",
            title: "Intermediate Level",
            icon: Target,
            color: "bg-blue-500",
            lightColor: "bg-background",
            borderColor: "border-blue-200",
            textColor: "text-blue-700",
            description:
                'Level ini menggunakan tipe soal "Fill in the Blank" yang menguji pemahaman kontekstual kosakata dalam kalimat utuh. Anda akan diberikan kalimat bahasa Jepang dengan satu bagian yang kosong, kemudian harus memilih kosakata yang paling tepat untuk melengkapi kalimat tersebut. Tipe soal ini dirancang untuk meningkatkan kemampuan penggunaan kata dalam konteks yang berbeda, serta memperkuat pemahaman tata bahasa dasar. Level ini membantu transisi dari hafalan kosakata murni menuju pemahaman penggunaan praktis dalam komunikasi.',
            time: "12 menit",
            questions: 10,
            preview: {
                question:
                    "Lengkapi kalimat berikut dengan jawaban yang paling tepat",
                questionNumber: 1,
                sentence: {
                    japanese: "私　は　魚　を　「－－－」",
                    furigana: "わたし　は　さかな　を　「－－－」",
                    romaji: "watashi wa sakana o 「－－－」",
                    meaning: "Saya ... ikan",
                },
                options: [
                    {
                        id: "a",
                        kanji: "食べます",
                        furigana: "たべます",
                        romaji: "tabemasu",
                        correct: true,
                    },
                    {
                        id: "b",
                        kanji: "飲みます",
                        furigana: "のみます",
                        romaji: "nomimasu",
                        correct: false,
                    },
                    {
                        id: "c",
                        kanji: "見ます",
                        furigana: "みます",
                        romaji: "mimasu",
                        correct: false,
                    },
                    {
                        id: "d",
                        kanji: "買います",
                        furigana: "かいます",
                        romaji: "kaimasu",
                        correct: false,
                    },
                ],
            },
        },
        {
            id: "advanced",
            title: "Advanced Level",
            icon: Brain,
            color: "bg-purple-500",
            lightColor: "bg-purple-50",
            borderColor: "border-purple-200",
            textColor: "text-purple-700",
            description:
                "Level tertinggi ini menguji kemampuan memilih penggunaan kalimat yang paling natural dan tepat dengan kosakata tertentu. Anda akan diberikan satu kosakata target, kemudian harus memilih dari 4 contoh kalimat mana yang menggunakan kata tersebut dengan cara yang paling alami dan sesuai konteks dalam bahasa Jepang. Level ini membutuhkan pemahaman mendalam tentang nuansa bahasa, register formal/informal, dan penggunaan yang tepat dalam situasi berbeda. Tipe soal ini dirancang untuk mengasah intuisi bahasa dan kemampuan berkomunikasi seperti penutur asli.",
            time: "17 menit",
            questions: 10,
            preview: {
                question:
                    "Pilih kalimat yang paling natural dalam penggunaan kosakata",
                questionNumber: 1,
                targetWord: {
                    kanji: "食べます",
                    furigana: "たべます",
                    romaji: "tabemasu",
                    meaning: "makan",
                },
                options: [
                    {
                        id: "a",
                        kanji: "朝ごはんを食べます。",
                        furigana: "あさごはんをたべます。",
                        romaji: "asagohan wo tabemasu.",
                        meaning: "Saya makan sarapan.",
                        correct: true,
                    },
                    {
                        id: "b",
                        kanji: "水を食べます。",
                        furigana: "みずをたべます。",
                        romaji: "mizu wo tabemasu.",
                        meaning: "Saya makan air.",
                        correct: false,
                    },
                    {
                        id: "c",
                        kanji: "音楽を食べます。",
                        furigana: "おんがくをたべます。",
                        romaji: "ongaku wo tabemasu.",
                        meaning: "Saya makan musik.",
                        correct: false,
                    },
                    {
                        id: "d",
                        kanji: "空気を食べます。",
                        furigana: "くうきをたべます。",
                        romaji: "kuuki wo tabemasu.",
                        meaning: "Saya makan udara.",
                        correct: false,
                    },
                ],
            },
        },
    ];

    const expSystem = [
        {
            level: "Beginner",
            icon: BookOpen,
            color: "bg-green-500",
            lightColor: "bg-green-50",
            borderColor: "border-green-200",
            textColor: "text-green-700",
            attempts: [
                { attempt: 1, exp: 20, description: "Percobaan Pertama" },
                { attempt: 2, exp: 12, description: "Percobaan Kedua" },
                { attempt: 3, exp: 8, description: "Percobaan Ketiga" },
                {
                    attempt: "4+",
                    exp: 0,
                    description: "Percobaan Keempat dan seterusnya",
                },
            ],
        },
        {
            level: "Intermediate",
            icon: Target,
            color: "bg-blue-500",
            lightColor: "bg-blue-50",
            borderColor: "border-blue-200",
            textColor: "text-blue-700",
            attempts: [
                { attempt: 1, exp: 30, description: "Percobaan Pertama" },
                { attempt: 2, exp: 17, description: "Percobaan Kedua" },
                { attempt: 3, exp: 10, description: "Percobaan Ketiga" },
                {
                    attempt: "4+",
                    exp: 0,
                    description: "Percobaan Keempat dan seterusnya",
                },
            ],
        },
        {
            level: "Advanced",
            icon: Brain,
            color: "bg-purple-500",
            lightColor: "bg-purple-50",
            borderColor: "border-purple-200",
            textColor: "text-purple-700",
            attempts: [
                { attempt: 1, exp: 40, description: "Percobaan Pertama" },
                { attempt: 2, exp: 23, description: "Percobaan Kedua" },
                { attempt: 3, exp: 12, description: "Percobaan Ketiga" },
                {
                    attempt: "4+",
                    exp: 0,
                    description: "Percobaan Keempat dan seterusnya",
                },
            ],
        },
    ];

    const handleAnswerSelect = (levelId, optionId, correct) => {
        setSelectedAnswers((prev) => ({ ...prev, [levelId]: optionId }));
        setShowResults((prev) => ({
            ...prev,
            [levelId]: { isCorrect: correct, show: true },
        }));

        setTimeout(() => {
            setShowResults((prev) => ({
                ...prev,
                [levelId]: { ...prev[levelId], show: false },
            }));
            setSelectedAnswers((prev) => ({ ...prev, [levelId]: null }));
        }, 5000);
    };

    const resetPreview = (levelId) => {
        setShowResults((prev) => ({ ...prev, [levelId]: { show: false } }));
        setSelectedAnswers((prev) => ({ ...prev, [levelId]: null }));
    };

    return (
        <Layout>
            <Head>
                <title>Pengenalan Kuis Kosakata</title>
            </Head>
            <div className="min-h-screen bg-background p-4 md:p-8">
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
                                Apa itu{" "}
                                <span className="text-primary">
                                    Kuis Kosakata
                                </span>
                                ?
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                Fitur pembelajaran interaktif yang dirancang
                                khusus untuk melatih ingatan dan pemahaman Anda
                                terhadap Kosakata Jepang
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
                                            <h3 className="text-xl font-semibold">
                                                Melatih Ingatan
                                            </h3>
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed">
                                            Sistem pengulangan yang terbukti
                                            efektif untuk memperkuat memori
                                            jangka panjang Anda terhadap
                                            kosakata jepang.
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
                                            <h3 className="text-xl font-semibold">
                                                Meningkatkan Pemahaman
                                            </h3>
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed">
                                            Latihan yang terstruktur membantu
                                            Anda memahami pola dan konteks
                                            penggunaan setiap kosakata dengan
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
                            transition={{
                                duration: 0.6,
                                type: "spring",
                                stiffness: 100,
                            }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20 mb-12">
                                <CardContent className="p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-primary/20 rounded-lg">
                                            <Star className="w-6 h-6 text-primary" />
                                        </div>
                                        <h3 className="text-2xl font-semibold">
                                            Sistem Reward EXP
                                        </h3>
                                    </div>
                                    <p className="text-muted-foreground mb-6 leading-relaxed">
                                        Setiap jawaban benar memberikan EXP yang
                                        dapat digunakan untuk meningkatkan level
                                        Anda. Semakin tinggi level, semakin
                                        banyak fitur pembelajaran yang terbuka!
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <Zap className="w-5 h-5 text-yellow-500" />
                                            <span className="font-medium">
                                                Dapatkan EXP
                                            </span>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                                        <div className="flex items-center gap-2">
                                            <Trophy className="w-5 h-5 text-orange-500" />
                                            <span className="font-medium">
                                                Naik Level
                                            </span>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                                        <div className="flex items-center gap-2">
                                            <BookOpen className="w-5 h-5 text-blue-500" />
                                            <span className="font-medium">
                                                Buka Fitur Baru
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* User Flow */}
                        <div className="space-y-8">
                            <h3 className="text-2xl font-semibold text-center mb-8">
                                Alur Penggunaan Kuis Huruf
                            </h3>

                            {/* Equal Height Cards: 4 Step Cards */}
                            <motion.div
                                className="grid md:grid-cols-4 gap-6 items-stretch"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{
                                    duration: 0.8,
                                    staggerChildren: 0.1,
                                }}
                                viewport={{ once: true }}
                            >
                                {[1, 2, 3, 4].map((step, index) => (
                                    <motion.div
                                        key={step}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.1,
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <Card className="text-center hover:shadow-lg transition-shadow h-full">
                                            <CardContent className="p-6">
                                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <span className="text-primary font-bold">
                                                        {step}
                                                    </span>
                                                </div>
                                                <h4 className="font-semibold mb-2">
                                                    {step === 1
                                                        ? "Pilih Level"
                                                        : step === 2
                                                        ? "Pilih Mode"
                                                        : step === 3
                                                        ? "Mulai Quis"
                                                        : "Review Quis"}
                                                </h4>
                                                <p className="text-sm text-muted-foreground">
                                                    {step === 1
                                                        ? "Beginner, Intermediate, Advanced"
                                                        : step === 2
                                                        ? "Manual atau Random"
                                                        : step === 3
                                                        ? "Kerjakan Quis"
                                                        : "Review Quis"}
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
                                transition={{
                                    duration: 0.6,
                                    staggerChildren: 0.2,
                                }}
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
                                                Anda dapat memilih kosakata
                                                spesifik yang sudah dipelajari
                                                untuk dijadikan soal kuis. Cocok
                                                untuk fokus pada kosakata yang
                                                masih sulit diingat.
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
                                                Sistem akan secara acak memilih
                                                kosakata sesuai level yang dipilih.
                                                Ideal untuk menguji pemahaman
                                                menyeluruh Anda.
                                            </p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                {/* Quiz Preview Section */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                >
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                            <Play className="w-4 h-4" />
                            Preview Kuis
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Kuis Kosakata Berdasarkan{" "}
                            <span className="text-primary">Level</span>
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Setiap level memiliki tingkat kesulitan dan struktur
                            soal yang berbeda. Coba interaksi di bawah ini!
                        </p>
                    </div>

                    <div className="space-y-8">
                        {quizLevels.map((level, index) => {
                            const IconComponent = level.icon;
                            const currentResult = showResults[level.id];
                            const selectedAnswer = selectedAnswers[level.id];

                            return (
                                <motion.div
                                    key={level.id}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`border-2 ${level.borderColor} rounded-xl overflow-hidden  shadow-lg hover:shadow-xl transition-all duration-300`}
                                >
                                    {/* Level Header */}
                                    <div
                                        className={` p-6`}
                                    >
                                        <div className="flex items-center gap-4 mb-4 border-b pb-5">
                                            <div
                                                className={`${level.color} p-3 rounded-lg`}
                                            >
                                                <IconComponent className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-800">
                                                    {level.title}
                                                </h3>
                                                <div className="flex items-center gap-4 mt-2">
                                                    <div className="flex items-center gap-1 text-sm text-gray-600">
                                                        <Clock className="w-4 h-4" />
                                                        <span>
                                                            {level.time}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-sm text-gray-600">
                                                        <BookOpen className="w-4 h-4" />
                                                        <span>
                                                            {level.questions}{" "}
                                                            soal
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                      
                                        <p
                                            className={`  leading-relaxed border-b pb-5`}
                                        >
                                            {level.description}
                                        </p>
                                    </div>
                                  
                                    {/* Quiz Preview - Always Visible */}
                                    <div className="p-6 pt-1 bg-background">
                                        {currentResult?.show && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                                                    currentResult.isCorrect
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-red-100 text-red-800"
                                                }`}
                                            >
                                                {currentResult.isCorrect ? (
                                                    <CheckCircle className="w-6 h-6" />
                                                ) : (
                                                    <XCircle className="w-6 h-6" />
                                                )}
                                                <span className="font-medium text-lg">
                                                    {currentResult.isCorrect
                                                        ? "Jawaban Benar! 🎉"
                                                        : "Jawaban Salah 😔"}
                                                </span>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() =>
                                                        resetPreview(level.id)
                                                    }
                                                    className="ml-auto p-1 hover:bg-white rounded-full"
                                                >
                                                    <RotateCcw className="w-4 h-4" />
                                                </motion.button>
                                            </motion.div>
                                        )}

                                        {/* Question */}
                                        <div className="mb-6">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div
                                                    className={`${level.color} text-white px-4 py-2 rounded-full text-base font-medium`}
                                                >
                                                    Soal{" "}
                                                    {
                                                        level.preview
                                                            .questionNumber
                                                    }
                                                </div>
                                                <h4 className="text-xl font-semibold text-gray-800">
                                                    {level.preview.question}
                                                </h4>
                                            </div>

                                            {/* Question Content */}
                                            {level.id === "beginner" && (
                                                <div className="bg-gray-100 dark:bg-gray-300 p-8 rounded-xl border-2 border-gray-200 mb-6 shadow-sm">
                                                    <div className="text-center">
                                                        <div className="text-6xl font-bold text-gray-800 mb-3">
                                                            {
                                                                level.preview
                                                                    .vocabulary
                                                                    .kanji
                                                            }
                                                        </div>
                                                        <div className="text-2xl text-gray-600 mb-2">
                                                            {
                                                                level.preview
                                                                    .vocabulary
                                                                    .furigana
                                                            }
                                                        </div>
                                                        <div className="text-lg text-gray-500 font-medium">
                                                            {
                                                                level.preview
                                                                    .vocabulary
                                                                    .romaji
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {level.id === "intermediate" && (
                                                <div className="bg-gray-100 dark:bg-gray-300 p-8 rounded-xl border-2 border-gray-200 mb-6 shadow-sm">
                                                    <div className="space-y-4">
                                                        <div className="text-center">
                                                            <div className="text-3xl font-bold text-gray-800 mb-2">
                                                                {
                                                                    level
                                                                        .preview
                                                                        .sentence
                                                                        .japanese
                                                                }
                                                            </div>
                                                            <div className="text-xl text-gray-600 mb-2">
                                                                {
                                                                    level
                                                                        .preview
                                                                        .sentence
                                                                        .furigana
                                                                }
                                                            </div>
                                                            <div className="text-lg text-gray-500 mb-3">
                                                                {
                                                                    level
                                                                        .preview
                                                                        .sentence
                                                                        .romaji
                                                                }
                                                            </div>
                                                            <div className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-base font-medium">
                                                                Arti:{" "}
                                                                {
                                                                    level
                                                                        .preview
                                                                        .sentence
                                                                        .meaning
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {level.id === "advanced" && (
                                                <div className="bg-gray-100 dark:bg-gray-300 p-8 rounded-xl border-2 border-gray-200 mb-6 shadow-sm">
                                                    <div className="text-center">
                                                        <span className="text-xl text-gray-600 block mb-2">
                                                            Kosakata target:
                                                        </span>
                                                        <div className="inline-block p-4 bg-purple-50 rounded-lg">
                                                            <div className="text-3xl font-bold text-gray-800 mb-1">
                                                                {
                                                                    level
                                                                        .preview
                                                                        .targetWord
                                                                        .kanji
                                                                }
                                                            </div>
                                                            <div className="text-lg text-gray-600 mb-1">
                                                                {
                                                                    level
                                                                        .preview
                                                                        .targetWord
                                                                        .furigana
                                                                }
                                                            </div>
                                                            <div className="text-base text-gray-500 mb-1">
                                                                {
                                                                    level
                                                                        .preview
                                                                        .targetWord
                                                                        .romaji
                                                                }
                                                            </div>
                                                            <div className="text-sm text-purple-700 font-medium">
                                                                (
                                                                {
                                                                    level
                                                                        .preview
                                                                        .targetWord
                                                                        .meaning
                                                                }
                                                                )
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Options */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {level.preview.options.map(
                                                (option) => (
                                                    <motion.button
                                                        key={option.id}
                                                        whileHover={{
                                                            scale: 1.02,
                                                        }}
                                                        whileTap={{
                                                            scale: 0.98,
                                                        }}
                                                        onClick={() =>
                                                            handleAnswerSelect(
                                                                level.id,
                                                                option.id,
                                                                option.correct
                                                            )
                                                        }
                                                        disabled={
                                                            currentResult?.show
                                                        }
                                                        className={`p-6 rounded-xl border-2 text-left transition-all duration-200 ${
                                                            selectedAnswer ===
                                                            option.id
                                                                ? option.correct
                                                                    ? "border-green-500 bg-green-50"
                                                                    : "border-red-500 bg-red-50"
                                                                : "border-gray-200 bg-gray-100  dark:bg-gray-300 hover:border-gray-300 hover:bg-gray-50"
                                                        } ${
                                                            currentResult?.show
                                                                ? "cursor-not-allowed opacity-60"
                                                                : "cursor-pointer"
                                                        }`}
                                                    >
                                                        <div className="flex items-start gap-4">
                                                            <div
                                                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${level.color} flex-shrink-0`}
                                                            >
                                                                {option.id.toUpperCase()}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                {level.id ===
                                                                    "beginner" && (
                                                                    <div>
                                                                        {level
                                                                            .preview
                                                                            .type ===
                                                                        "japan-to-indonesia" ? (
                                                                            <span className="text-lg font-medium text-gray-800">
                                                                                {
                                                                                    option.text
                                                                                }
                                                                            </span>
                                                                        ) : (
                                                                            <div>
                                                                                <div className="text-xl font-bold text-gray-800 mb-1">
                                                                                    {
                                                                                        option.kanji
                                                                                    }
                                                                                </div>
                                                                                <div className="text-base text-gray-600 mb-1">
                                                                                    {
                                                                                        option.furigana
                                                                                    }
                                                                                </div>
                                                                                <div className="text-sm text-gray-500">
                                                                                    {
                                                                                        option.romaji
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}
                                                                {level.id ===
                                                                    "intermediate" && (
                                                                    <div>
                                                                        <div className="text-xl font-bold text-gray-800 mb-1">
                                                                            {
                                                                                option.kanji
                                                                            }
                                                                        </div>
                                                                        <div className="text-base text-gray-600 mb-1">
                                                                            {
                                                                                option.furigana
                                                                            }
                                                                        </div>
                                                                        <div className="text-sm text-gray-500">
                                                                            {
                                                                                option.romaji
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {level.id ===
                                                                    "advanced" && (
                                                                    <div>
                                                                        <div className="text-lg font-bold text-gray-800 mb-2">
                                                                            {
                                                                                option.kanji
                                                                            }
                                                                        </div>
                                                                        <div className="text-base text-gray-600 mb-1">
                                                                            {
                                                                                option.furigana
                                                                            }
                                                                        </div>
                                                                        <div className="text-sm text-gray-500 mb-2">
                                                                            {
                                                                                option.romaji
                                                                            }
                                                                        </div>
                                                                        <div className="text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">
                                                                            <span className="font-medium">
                                                                                Arti:
                                                                            </span>{" "}
                                                                            {
                                                                                option.meaning
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </motion.button>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.section>

                {/* EXP System Section */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                            <Trophy className="w-6 h-6 text-yellow-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800">
                            Sistem EXP per Level Kuis
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {expSystem.map((system, index) => {
                            const IconComponent = system.icon;
                            return (
                                <motion.div
                                    key={system.level}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`border-2 ${system.borderColor} rounded-xl overflow-hidden bg-background shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full`}
                                >
                                    {/* Header */}
                                    <div
                                        className={`bg-background p-6 border-b ${system.borderColor}`}
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            <div
                                                className={`${system.color} p-3 rounded-lg`}
                                            >
                                                <IconComponent className="w-6 h-6 text-white" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-800">
                                                {system.level}
                                            </h3>
                                        </div>
                                        <p
                                            className={`text-`}
                                        >
                                            EXP yang didapatkan berdasarkan
                                            jumlah percobaan dengan soal yang
                                            sama
                                        </p>
                                    </div>

                                    {/* EXP Table */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="space-y-4 flex-1">
                                            {system.attempts.map(
                                                (attempt, attemptIndex) => (
                                                    <motion.div
                                                        key={attemptIndex}
                                                        initial={{
                                                            opacity: 0,
                                                            x: -20,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            x: 0,
                                                        }}
                                                        transition={{
                                                            delay:
                                                                index * 0.1 +
                                                                attemptIndex *
                                                                    0.05,
                                                        }}
                                                        className="flex items-center justify-between p-4 bg-background border-2 rounded-lg hover:bg-gray-100 transition-colors"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className={`w-10 h-10 rounded-full ${system.color} flex items-center justify-center text-white font-bold`}
                                                            >
                                                                {
                                                                    attempt.attempt
                                                                }
                                                            </div>
                                                            <div>
                                                                <div className="font-medium text-gray-800">
                                                                    {
                                                                        attempt.description
                                                                    }
                                                                </div>
                                                                <div className="text-sm text-gray-600">
                                                                    {attempt.attempt ===
                                                                    "4+"
                                                                        ? "Tidak ada EXP"
                                                                        : `+${attempt.exp} EXP`}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            {attempt.exp > 0 ? (
                                                                <>
                                                                    <Star
                                                                        className={`w-5 h-5 ${system.textColor}`}
                                                                    />
                                                                    <span
                                                                        className={`text-xl font-bold ${system.textColor}`}
                                                                    >
                                                                        {
                                                                            attempt.exp
                                                                        }
                                                                    </span>
                                                                </>
                                                            ) : (
                                                                <span className="text-xl font-bold text-gray-400">
                                                                    0
                                                                </span>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                )
                                            )}
                                        </div>

                                        {/* Additional Info */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{
                                                delay: index * 0.1 + 0.3,
                                            }}
                                            className={`mt-6 p-4  rounded-lg border ${system.borderColor}`}
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <TrendingUp
                                                    className={`w-4 h-4 ${system.textColor}`}
                                                />
                                                <span
                                                    className={`font-medium ${system.textColor}`}
                                                >
                                                    Tips Maksimalkan EXP
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                Untuk mendapatkan EXP maksimal,
                                                cobalah kosakata atau soal yang
                                                berbeda-beda. Pengulangan soal
                                                yang sama akan mengurangi EXP
                                                yang didapatkan.
                                            </p>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Summary Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mt-12 bg-background border-2 border-blue-200 rounded-xl p-8"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                                <Award className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800">
                                    Ringkasan Sistem EXP
                                </h3>
                                <p className="text-gray-600">
                                    Strategi optimal untuk memaksimalkan
                                    perolehan EXP
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                                <div className="flex items-center gap-3 mb-3">
                                    <Users className="w-6 h-6 text-green-600" />
                                    <span className="font-bold text-green-600">
                                        Beginner
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">
                                    Fokus pada kosakata baru untuk EXP maksimal
                                    
                                </p>
                          
                            </div>

                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                                <div className="flex items-center gap-3 mb-3">
                                    <Target className="w-6 h-6 text-blue-600" />
                                    <span className="font-bold text-blue-600">
                                        Intermediate
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">
                                    Tantang diri dengan soal kontekstual baru
                                   
                                </p>
                            
                            </div>

                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                                <div className="flex items-center gap-3 mb-3">
                                    <Brain className="w-6 h-6 text-purple-600" />
                                    <span className="font-bold text-purple-600">
                                        Advanced
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">
                                    Kuasai nuansa bahasa dengan soal kompleks
                                  
                                </p>
                           
                            </div>
                        </div>
                    </motion.div>
                </motion.section>
            </div>
        </Layout>
    );
}
