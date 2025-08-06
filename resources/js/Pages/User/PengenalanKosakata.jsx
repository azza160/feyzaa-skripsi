import React, { useState,useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
    Volume2Icon,
    XIcon,
    LightbulbIcon,
    MessageSquareTextIcon,
    BookOpenTextIcon,
    GlobeIcon,
    GraduationCapIcon,
    ScrollTextIcon,
    BrainCircuitIcon,
    TrophyIcon,
    SparklesIcon,
    PuzzleIcon,
    TargetIcon,
    ZapIcon,
    ArrowRightIcon,
    CheckCircleIcon,
    InfoIcon,
    CircleDotIcon,
    Play,
    BookOpen,
    Brain,
    Star,
    ChevronDown,
    Rocket,
    Award,
    Users,
    Clock,
    TrendingUp,
    Shield,
    HelpCircle,
    Gamepad2,
    Gift,
    Library,
    Languages,
    Sparkles,
    ArrowRight,
    CheckCircle 
} from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../../Layouts/Layout';
import { Link,Head } from "@inertiajs/react";

// Animation variants for staggered appearance
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function JapaneseVocabularyIntro() {
  const [showDetail, setShowDetail] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
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

    const texts = [
        "Kosakata Jepang",
        "Cara Mengugunakan Kosakata",
    ];

  const toggleDetail = () => {
    setShowDetail(!showDetail);
  };

  // Data kosakata contoh untuk '食べます' (tabemasu)
  const vocabulary = {
    kanji: "食べます",
    furigana: "たべます",
    romaji: "tabemasu",
    audio:'https://res.cloudinary.com/dzozxilf6/video/upload/v1754509833/ttsMP3.com_VoiceText_2025-8-7_2-50-12_fdcdua.mp3',
    meaning: "makan (bentuk sopan)",
    exampleSentence: "毎日ご飯を食べます。",
    exampleSentenceFurigana: "まいにちごはんをたべます。",
    exampleSentenceRomaji: "Mainichi gohan o tabemasu.",
    exampleSentenceMeaning: "Saya makan nasi setiap hari.",
    conjugations: [
      {
        form: "Bentuk Dasar (Kamus)",
        kanji: "食べる",
        furigana: "たべる",
        romaji: "taberu",
        meaning: "makan",
        example: "私はパンを食べる。",
        exampleFurigana: "わたしはパンをたべる。",
        exampleRomaji: "Watashi wa pan o taberu.",
        exampleMeaning: "Saya makan roti."
      },
      {
        form: "Bentuk Negatif",
        kanji: "食べません",
        furigana: "たべません",
        romaji: "tabemasen",
        meaning: "tidak makan",
        example: "私は魚を食べません。",
        exampleFurigana: "わたしはさかなをたべません。",
        exampleRomaji: "Watashi wa sakana o tabemasen.",
        exampleMeaning: "Saya tidak makan ikan."
      },
      {
        form: "Bentuk Lampau",
        kanji: "食べました",
        furigana: "たべました",
        romaji: "tabemashita",
        meaning: "sudah makan",
        example: "昨日、ラーメンを食べました。",
        exampleFurigana: "きのう、ラーメンをたべました。",
        exampleRomaji: "Kinou, ramen o tabemashita.",
        exampleMeaning: "Kemarin, saya sudah makan ramen."
      },
      {
        form: "Bentuk Negatif Lampau",
        kanji: "食べませんでした",
        furigana: "たべませんでした",
        romaji: "tabemasen deshita",
        meaning: "tidak makan (lampau)",
        example: "朝ごはんを食べませんでした。",
        exampleFurigana: "あさごはんをたべませんでした。",
        exampleRomaji: "Asagohan o tabemasen deshita.",
        exampleMeaning: "Saya tidak makan sarapan."
      },
    ],
    detailedExamples: [
      {
        kanji: "彼は毎日リンゴを食べます。",
        furigana: "かれはまいにちリンゴをたべます。",
        romaji: "Kare wa mainichi ringo o tabemasu.",
        meaning: "Dia makan apel setiap hari."
      },
      {
        kanji: "子供たちはケーキを食べたがっています。",
        furigana: "こどもたちはケーキをたべたがっています。",
        romaji: "Kodomotachi wa keeki o tabetagatte imasu.",
        meaning: "Anak-anak ingin makan kue."
      },
      {
        kanji: "夕食に何を食べたいですか？",
        furigana: "ゆうしょくになにをたべたいですか？",
        romaji: "Yuushoku ni nani o tabetai desu ka?",
        meaning: "Anda ingin makan apa untuk makan malam?"
      }
    ]
  };

  // Fungsi untuk memutar suara
  const playSound = (text) => {
    if (typeof window !== 'undefined') {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP'; // Atur bahasa ke Jepang
      window.speechSynthesis.speak(utterance);
    }
  };

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


    const playAudio = (url) => {
        if (!url) return;
        const audio = new Audio(url);
        audio.play().catch((e) => console.error("Gagal memutar audio:", e));
    };

    const handleClick = (audio) => {
        if (audio) {
            playAudio(audio);
        } 
    }

  return (
    <Layout>
           <Head>
                <title>Pengenalan Kosakata</title>
            </Head>
        <div className="min-h-screen w-full overflow-x-hidden bg-background text-foreground overflow-hidden relative">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-primary/5 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob z-0"></div>
        <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/5 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 z-0"></div>
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-accent/5 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 z-0"></div>

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
                                        dengan Menyenangkan
                                    </span>
                                </h1>

                                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                                Mulai kenali kosakata dasar bahasa Jepang. 
                                Belajar kata-kata penting dengan cara yang sederhana dan mudah dipahami.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href={route("login")}
                                        className="inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md transition-colors duration-200 shadow-lg"
                                    >
                                        <Play className="w-5 h-5 mr-2" />
                                        Mulai Belajar Gratis
                                    </Link>
                                    <button
                                        onClick={() =>
                                            document
                                                .getElementById("mengapa")
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
                        </div>
                    </div>
                </section>

        {/* Section 1: Mengapa Belajar Kosakata Bahasa Jepang? */}
        <section className="relative py-20 bg-gradient-to-br from-background to-card/10 z-10" id='mengapa'>
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
                                            Kosakata Jepang
                                        </h3>
                                        <p className="text-sm text-primary/80">
                                            Kenali kosakata jepang
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                            Mengapa Belajar Kosakata Bahasa Jepang?
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Kosakata adalah kunci untuk memahami dan menggunakan bahasa Jepang dalam kehidupan sehari-hari.

                        </p>
                    </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch" // Added items-stretch
            >
                <motion.div variants={itemVariants} className="h-full">
                <Card className="h-full p-8 flex flex-col items-center text-center bg-card/70 border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-24 h-24 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <LightbulbIcon className="h-16 w-16 text-primary mb-6 animate-pulse-slow" />
                    <CardTitle className="text-3xl font-bold mb-3 text-foreground">Pencerahan Budaya</CardTitle>
                    <Separator className="my-4 bg-primary/20 h-[1px]" /> {/* Divider above description */}
                    <CardDescription className="text-lg text-muted-foreground flex-grow">
                    <p className="mb-3">Dengan kosakata, Anda bisa <span className="font-semibold text-primary">menyelami anime, manga, dan film favorit tanpa subtitle</span>. Rasakan nuansa budaya Jepang secara langsung dan nikmati setiap detailnya.</p>
                    <p>Ini adalah gerbang untuk <span className="font-semibold text-primary">memahami lebih dalam</span> seni, tradisi, dan cara berpikir masyarakat Jepang.</p>
                    </CardDescription>
                </Card>
                </motion.div>
                <motion.div variants={itemVariants} className="h-full">
                <Card className="h-full p-8 flex flex-col items-center text-center bg-card/70 border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-secondary/5 rounded-full translate-x-1/2 translate-y-1/2"></div>
                    <MessageSquareTextIcon className="h-16 w-16 text-primary mb-6 animate-pulse-slow animation-delay-1000" />
                    <CardTitle className="text-3xl font-bold mb-3 text-foreground">Komunikasi Efektif</CardTitle>
                    <Separator className="my-4 bg-primary/20 h-[1px]" /> {/* Divider above description */}
                    <CardDescription className="text-lg text-muted-foreground flex-grow">
                    <p className="mb-3">Kosakata memungkinkan Anda <span className="font-semibold text-primary">berinteraksi langsung dengan penutur asli</span>. Bayangkan bertanya arah, memesan makanan, atau bahkan berdiskusi dengan percaya diri.</p>
                    <p>Ini bukan hanya tentang kata-kata, tapi tentang <span className="font-semibold text-primary">membangun koneksi</span> dan jembatan antar budaya.</p>
                    </CardDescription>
                </Card>
                </motion.div>
                <motion.div variants={itemVariants} className="h-full">
                <Card className="h-full p-8 flex flex-col items-center text-center bg-card/70 border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-accent/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <GlobeIcon className="h-16 w-16 text-primary mb-6 animate-pulse-slow animation-delay-2000" />
                    <CardTitle className="text-3xl font-bold mb-3 text-foreground">Petualangan Global</CardTitle>
                    <Separator className="my-4 bg-primary/20 h-[1px]" /> {/* Divider above description */}
                    <CardDescription className="text-lg text-muted-foreground flex-grow">
                    <p className="mb-3">Dengan penguasaan kosakata, Anda <span className="font-semibold text-primary">membuka peluang perjalanan, studi, atau bahkan karir di Jepang</span>. Dunia ada di genggaman Anda!</p>
                    <p>Setiap kata adalah tiket untuk <span className="font-semibold text-primary">menjelajahi dunia</span> dengan cara yang lebih mendalam dan personal.</p>
                    </CardDescription>
                </Card>
                </motion.div>
            </motion.div>
            </div>
        </section>

        {/* Section 2: Kosakata Bahasa Jepang */}
        <section className="relative py-20 bg-card/20 z-10">
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
                                            Kosakata Jepang
                                        </h3>
                                        <p className="text-sm text-primary/80">
                                           Kenali kosakata jepang
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                        Belajar Kosakata Jepang dari Dasar
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Kosakata adalah kunci memahami bahasa Jepang. Dengan menguasai kata-kata dasar, belajar membaca, menulis, dan berbicara jadi lebih mudah.

                        </p>
                    </motion.div>


            <div className="grid md:grid-cols-1 gap-16 items-stretch"> {/* Ensure equal height */}
                {/* Card Struktur Kosakata */}
                <motion.div
                // Changed to animate on mount for guaranteed visibility
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 50 }} // Still provide initial for the animation effect
                transition={{ duration: 0.7, delay: 0.2 }}
                className="h-full"
                >
                <Card className="p-8 bg-card/70 border-2 border-primary/20 shadow-lg h-full relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full translate-x-1/3 -translate-y-1/3"></div>
                    <CardTitle className="text-3xl font-bold mb-6 text-primary flex items-center">
                    <PuzzleIcon className="h-8 w-8 mr-3" /> Struktur Kosakata Jepang
                    </CardTitle>
                    <Separator className="my-6 bg-primary/20 h-[1px]" />

                    {/* Point 1: Kanji + Kana */}
                    <div className="mb-8">
                    <p className="text-lg text-muted-foreground mb-4">
                        Kosakata Jepang seringkali merupakan kombinasi indah dari karakter <span className="font-semibold text-primary">Kanji</span> dan huruf <span className="font-semibold text-primary">Kana</span> (Hiragana atau Katakana).
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 p-4 bg-muted/30 rounded-md border border-muted-foreground/20 shadow-inner">
                        <div className="flex flex-col items-center">
                        <span className="text-5xl font-bold text-primary">働</span>
                        <span className="text-sm text-muted-foreground">Kanji</span>
                        </div>
                        <ArrowRightIcon className="h-8 w-8 text-primary hidden md:block" />
                        <span className="text-4xl font-bold text-foreground md:hidden">+</span>
                        <div className="flex flex-col items-center">
                        <span className="text-5xl font-bold text-primary">きます</span>
                        <span className="text-sm text-muted-foreground">Kana (Hiragana)</span>
                        </div>
                        <ArrowRightIcon className="h-8 w-8 text-primary hidden md:block" />
                        <span className="text-4xl font-bold text-foreground md:hidden">=</span>
                        <div className="flex flex-col items-center">
                        <span className="text-5xl font-bold text-foreground">働きます</span>
                        <span className="text-sm text-muted-foreground">Hatarakimasu (bekerja)</span>
                        </div>
                    </div>
                    <p className="text-lg text-muted-foreground mt-4 text-center">
                        Furigana: <span className="font-semibold text-primary">はたらきます</span> | Romaji: <span className="font-semibold text-primary">hatarakimasu</span> | Arti: <span className="font-semibold text-primary">bekerja</span>
                    </p>
                    </div>
                    <Separator className="my-6 bg-primary/20 h-[1px]" />

                    {/* Point 2: Kana Only */}
                    <div className="mb-8">
                    <p className="text-lg text-muted-foreground mb-4">
                        Namun, tidak semua kosakata memiliki Kanji. Beberapa kata hanya ditulis dengan <span className="font-semibold text-primary">Hiragana</span> atau <span className="font-semibold text-primary">Katakana</span> saja.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 p-4 bg-muted/30 rounded-md border border-muted-foreground/20 shadow-inner">
                        <div className="flex flex-col items-center">
                        <span className="text-5xl font-bold text-foreground">あなた</span>
                        <span className="text-sm text-muted-foreground">Kana (Hiragana)</span>
                        </div>
                    </div>
                    <p className="text-lg text-muted-foreground mt-4 text-center">
                        Furigana: <span className="font-semibold text-primary">あなた</span> | Romaji: <span className="font-semibold text-primary">anata</span> | Arti: <span className="font-semibold text-primary">Anda</span>
                    </p>
                    </div>
                    <Separator className="my-6 bg-primary/20 h-[1px]" />

                    {/* Point 3: Platform Feature */}
                    <div>
                    <p className="text-xl font-semibold text-foreground mb-4 text-center">
                        <InfoIcon className="h-6 w-6 inline-block mr-2 text-primary" /> Fitur Unggulan Platform Kami:
                    </p>
                    <p className="text-lg text-muted-foreground text-center">
                        Di platform kami, setiap kosakata disajikan lengkap: <span className="font-semibold text-foreground">Kanji</span>, <span className="font-semibold text-foreground">Furigana</span>, <span className="font-semibold text-foreground">Romaji</span> (cara baca Latin), dan <span className="font-semibold text-foreground">Arti Bahasa Indonesia</span>.
                    </p>
                    </div>
                </Card>
                </motion.div>

                {/* Card Kekuatan Konjugasi */}
                <motion.div
                // Changed to animate on mount for guaranteed visibility
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 50 }} // Still provide initial for the animation effect
                transition={{ duration: 0.7, delay: 0.4 }}
                className="h-full"
                >
                <Card className="p-8 bg-card/70 border-2 border-primary/20 shadow-lg h-full relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full -translate-x-1/3 translate-y-1/3"></div>
                    <CardTitle className="text-3xl font-bold mb-6 text-primary flex items-center">
                    <ZapIcon className="h-8 w-8 mr-3" /> Bentuk Lain
                    </CardTitle>
                    <p className="text-lg text-muted-foreground mb-6">
                    Sama seperti bahasa lain, banyak kosakata Jepang (terutama kata kerja & sifat) memiliki "bentuk lain" atau <span className="font-semibold text-foreground">konjugasi</span> yang berubah sesuai konteks waktu atau kesopanan.
                    </p>
                    <Separator className="my-6 bg-primary/20 h-[1px]" />

                    {/* Nested Cards for Conjugations */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 items-stretch"> {/* Added items-stretch */}
                    {vocabulary.conjugations.map((conj, index) => (
                        <motion.div key={index} variants={itemVariants} className="h-full">
                        <Card className="h-full p-6 bg-muted/30 rounded-md border border-muted-foreground/20 shadow-sm hover:shadow-md transition-all duration-200">
                            <p className="font-bold text-xl mb-2 text-primary">{conj.form}:</p>
                            <p className="text-muted-foreground text-base">{conj.furigana}</p>
                            <p className="text-muted-foreground text-base">{conj.romaji}</p>
                            <p className="text-foreground font-semibold text-xl">{conj.kanji} - {conj.meaning}</p>
                            <p className="text-base text-muted-foreground italic mt-3">Contoh: {conj.example}</p>
                            <p className="text-base text-muted-foreground italic">{conj.exampleFurigana}</p>
                            <p className="text-base text-muted-foreground italic">{conj.exampleRomaji}</p>
                            <p className="text-base text-muted-foreground italic">({conj.exampleMeaning})</p>
                        </Card>
                        </motion.div>
                    ))}
                    </div>

                    <Separator className="my-6 bg-primary/20 h-[1px] mt-10" />
                    <p className="text-lg text-muted-foreground mt-6 text-center">
                    Jangan khawatir! Kami akan memandu Anda melalui setiap bentuk ini dengan contoh-contoh yang jelas dan interaktif.
                    </p>
                </Card>
                </motion.div>
            </div>
            </div>
        </section>

        {/* Section 3: Apa yang Harus Dipelajari Sebelum Belajar Kosakata? */}
        <section className="relative py-20 bg-gradient-to-tl from-background to-card/10  z-10">
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
                                            Kosakata Jepang
                                        </h3>
                                        <p className="text-sm text-primary/80">
                                            Kenali Kosakata Jepang
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                            Apa yang Harus Dipelajari Sebelum Belajar Kosakata?
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Sebelum mempelajari kosakata, penting memahami huruf dasar Jepang seperti Hiragana dan Katakana agar belajar jadi lebih mudah.


                        </p>
                    </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
                <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="h-full"
                >
                <Card className="h-full p-8 bg-card/70 border-2 border-primary/20 shadow-lg flex flex-col items-center text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-24 h-24 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <BookOpenTextIcon className="h-20 w-20 text-primary mb-8 animate-bounce-slow" />
                    <CardTitle className="text-3xl font-bold mb-4 text-foreground">Misi 1: Kuasai Hiragana & Katakana</CardTitle>
                    <Separator className="my-4 bg-primary/20 h-[1px]" />
                    <CardDescription className="text-lg text-muted-foreground flex-grow">
                    <div className="space-y-4 text-left">
                        <div className="flex items-start">
                        <CircleDotIcon className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                        <p><span className="font-semibold text-primary">Kunci Emas:</span> Sebelum menyelam ke lautan kosakata Jepang yang luas, ada satu langkah krusial yang tidak boleh dilewatkan: <span className="font-semibold text-foreground">menguasai dasar huruf Jepang</span>, yaitu Hiragana dan Katakana.</p>
                        </div>
                        <div className="flex items-start">
                        <CircleDotIcon className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                        <p><span className="font-semibold text-primary">Mengapa Penting?</span> Karena Hiragana dan Katakana adalah kunci untuk <span className="font-semibold text-foreground">membaca setiap kosakata dengan benar</span> dan <span className="font-semibold text-foreground">memahami pelafalannya</span>. Bayangkan mencoba membaca peta tanpa mengetahui simbol-simbolnya – itu akan sangat membingungkan!</p>
                        </div>
                    </div>
                    </CardDescription>
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/5 rounded-full translate-x-1/2 translate-y-1/2"></div>
                </Card>
                </motion.div>
                <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="h-full"
                >
                <Card className="h-full p-8 bg-card/70 border-2 border-primary/20 shadow-lg flex flex-col items-center text-center relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-secondary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <GraduationCapIcon className="h-20 w-20 text-primary mb-8 animate-bounce-slow animation-delay-1000" />
                    <CardTitle className="text-3xl font-bold mb-4 text-foreground">Jalur Belajar Bertahap Kami</CardTitle>
                    <Separator className="my-4 bg-primary/20 h-[1px]" />
                    <CardDescription className="text-lg text-muted-foreground flex-grow">
                    <div className="space-y-4 text-left">
                        <div className="flex items-start">
                        <CircleDotIcon className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                        <p><span className="font-semibold text-primary">Pendekatan Kami:</span> Platform ini dirancang untuk membimbing Anda secara <span className="font-semibold text-foreground">bertahap</span>. Kami akan memulai dari pengenalan huruf, kemudian secara perlahan beralih ke kosakata.</p>
                        </div>
                        <div className="flex items-start">
                        <CircleDotIcon className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                        <p><span className="font-semibold text-primary">Belajar Efektif:</span> Pendekatan ini memastikan proses belajar Anda <span className="font-semibold text-foreground">bertahap, logis, dan tidak membingungkan</span>. Selain itu, setiap kosakata dilengkapi <span className="font-semibold text-foreground">contoh kalimat nyata</span> untuk pemahaman kontekstual.</p>
                        </div>
                    </div>
                    </CardDescription>
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-secondary/5 rounded-full translate-x-1/2 translate-y-1/2"></div>
                </Card>
                </motion.div>
            </div>

           
            </div>
        </section>

        {/* Section 4: Kenapa Jangan Mulai dari Kanji saat belajar kosakata? */}
        <section className="relative py-20  bg-card/20 z-10">
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
                                            Kosakata Jepang
                                        </h3>
                                        <p className="text-sm text-primary/80">
                                            Kenali Kosakata Jepang
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                        Kenapa Jangan Mulai dari Kanji saat belajar kosakata?
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Kanji memiliki banyak karakter dan bentuk kompleks. Pemula sebaiknya mulai dari Hiragana dan Katakana agar memiliki dasar kuat sebelum mempelajari Kanji.


                        </p>
                    </motion.div>
            <div className="grid md:grid-cols-2 gap-16 items-stretch">
                <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="h-full"
                >
                <Card className="h-full p-8 bg-card/70 border-2 border-primary/20 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-24 h-24 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <CardTitle className="text-3xl font-bold mb-6 text-primary flex items-center">
                    <TargetIcon className="h-8 w-8 mr-3" /> Tantangan Kanji yang Menarik
                    </CardTitle>
                    <Separator className="my-4 bg-primary/20 h-[1px]" />
                    <CardDescription className="text-lg text-muted-foreground flex-grow">
                    <div className="space-y-4 text-left">
                        <div className="flex items-start">
                        <CircleDotIcon className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                        <p><span className="font-semibold text-primary">Kompleksitas Tinggi:</span> Kanji adalah sistem penulisan yang sangat kompleks dan indah, namun juga menantang. Untuk bisa mahir, Anda perlu menguasai <span className="font-semibold text-foreground">ribuan karakter</span>, masing-masing dengan berbagai cara baca dan makna.</p>
                        </div>
                        <div className="flex items-start">
                        <CircleDotIcon className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                        <p><span className="font-semibold text-primary">Hindari Kewalahan:</span> Memulai dari Kanji bisa terasa seperti mencoba mendaki gunung Everest tanpa persiapan dasar. Bagi pemula, fokus utama sebaiknya adalah membangun <span className="font-semibold text-foreground">pondasi yang kuat</span> dengan kosakata yang ditulis dalam Hiragana atau Katakana, dilengkapi dengan Furigana.</p>
                        </div>
                        <div className="flex items-start">
                        <CircleDotIcon className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                        <p><span className="font-semibold text-primary">Belajar Bertahap:</span> Ini memungkinkan Anda untuk segera mulai membaca dan memahami kata-kata tanpa terbebani oleh kerumitan Kanji di awal.</p>
                        </div>
                    </div>
                    </CardDescription>
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/5 rounded-full translate-x-1/2 translate-y-1/2"></div>
                </Card>
                </motion.div>
                <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="h-full"
                >
                <Card className="h-full p-8 bg-card/70 border-2 border-primary/20 shadow-lg relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-secondary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <CardTitle className="text-3xl font-bold mb-6 text-primary flex items-center">
                    <SparklesIcon className="h-8 w-8 mr-3" /> Pendekatan Cerdas & Efektif
                    </CardTitle>
                    <Separator className="my-4 bg-primary/20 h-[1px]" />
                    <CardDescription className="text-lg text-muted-foreground flex-grow">
                    <div className="space-y-4 text-left">
                        <div className="flex items-start">
                        <CircleDotIcon className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                        <p><span className="font-semibold text-primary">Strategi Kami:</span> Pendekatan kami adalah untuk memastikan Anda tidak merasa kewalahan. Setelah Anda memiliki pemahaman yang solid tentang huruf Jepang dan perbendaharaan kosakata dasar yang kuat, barulah kami akan memperkenalkan Kanji secara bertahap.</p>
                        </div>
                        <div className="flex items-start">
                        <CircleDotIcon className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                        <p><span className="font-semibold text-primary">Analogi Rumah:</span> Ini seperti membangun rumah: Anda tidak langsung memasang atap sebelum fondasi dan dindingnya kokoh. Dengan strategi ini, Anda akan belajar Kanji dengan lebih <span className="font-semibold text-foreground">efektif dan percaya diri</span>.</p>
                        </div>
                        <div className="flex items-start">
                        <CircleDotIcon className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                        <p><span className="font-semibold text-primary">Fokus Utama:</span> Jadi, mari kita fokus pada langkah-langkah awal yang paling penting, dan biarkan Kanji menjadi tantangan yang menyenangkan di kemudian hari!</p>
                        </div>
                    </div>
                    </CardDescription>
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-secondary/5 rounded-full translate-x-1/2 translate-y-1/2"></div>
                </Card>
                </motion.div>
            </div>
            </div>
        </section>

        {/* Section 5: Belajar Kosakata di Platform */}
        <section className="relative py-20 bg-gradient-to-br from-background to-card/10  z-10">
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
                                            Kosakata Jepang
                                        </h3>
                                        <p className="text-sm text-primary/80">
                                            Kenali kosakata jepang
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
    Belajar Kosakata di Platform Ini
</h2>
<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
    Pelajari kosakata Jepang mulai dari kata dasar hingga kata yang sering digunakan dengan cara yang mudah dan interaktif.
</p>
                    </motion.div>

            {/* Interactive Vocabulary Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="flex justify-center items-center flex-col relative z-10"
            >
                <Card className="w-full max-w-7xl rounded-lg shadow-2xl border-4 border-primary/30 bg-card transform hover:scale-[1.005] transition-transform duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-48 h-48 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-secondary/5 rounded-full translate-x-1/2 translate-y-1/2"></div>

                <CardHeader className="pb-4 bg-primary/10 rounded-t-md text-center">
                    <CardTitle className="text-6xl font-extrabold text-primary">
                    {vocabulary.kanji}
                    </CardTitle>
                    <CardDescription className="text-3xl text-muted-foreground">
                    {vocabulary.furigana}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 p-8 text-left">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"> {/* Increased gap, used lg:grid-cols-2 */}
                    <div className="flex flex-col gap-4 h-full">
                        <div className="flex items-center justify-between bg-muted/30 p-4 rounded-md border border-muted-foreground/20 shadow-inner">
                        <p className="text-4xl font-semibold text-foreground">{vocabulary.romaji}</p>
                        <Button variant="ghost" size="icon" onClick={() => handleClick(vocabulary.audio)} aria-label="Play sound" className="hover:bg-primary/20 rounded-full p-2">
                            <Volume2Icon className="h-10 w-10 text-primary" />
                            <span className="sr-only">Putar suara</span>
                        </Button>
                        </div>
                        <p className="text-3xl text-muted-foreground bg-muted/30 p-4 rounded-md border border-muted-foreground/20 shadow-inner h-full flex items-center justify-center">
                        Arti: <span className="font-bold text-foreground ml-2">{vocabulary.meaning}</span>
                        </p>
                    </div>
                    <div className="text-xl bg-muted/30 p-4 rounded-md border border-muted-foreground/20 shadow-inner h-full flex flex-col justify-center">
                        <p className="font-bold mb-2 text-foreground">Contoh Kalimat:</p>
                        <p className="text-muted-foreground text-lg">{vocabulary.exampleSentenceFurigana}</p>
                        <p className="text-muted-foreground text-lg">{vocabulary.exampleSentenceRomaji}</p>
                        <p className="text-foreground font-semibold text-2xl">{vocabulary.exampleSentence}</p>
                        <p className="text-lg text-muted-foreground italic mt-2">({vocabulary.exampleSentenceMeaning})</p>
                    </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center pt-4 pb-6 bg-primary/10 rounded-b-md">
                    <Button onClick={toggleDetail} className="w-full max-w-sm py-3 text-lg rounded-md shadow-md hover:shadow-lg transition-all duration-300">
                    {showDetail ? 'Sembunyikan Detail' : 'Lihat Detail Kosakata'}
                    </Button>
                </CardFooter>
                </Card>

                <AnimatePresence>
                {showDetail && (
                    <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: '3rem' }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-7xl mt-12"
                    >
                    <Card className="rounded-lg shadow-2xl border-4 border-secondary/30 bg-card relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/5 rounded-full translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full -translate-x-1/2 translate-y-1/2"></div>

                        <CardHeader className="flex flex-row justify-between items-center pb-4 bg-secondary/10 rounded-t-md">
                        <CardTitle className="text-3xl font-bold text-primary">Detail Kosakata</CardTitle>
                        <Button variant="ghost" size="icon" onClick={toggleDetail} aria-label="Close detail" className="hover:bg-secondary/20 rounded-full p-2">
                            <XIcon className="h-7 w-7 text-muted-foreground" />
                            <span className="sr-only">Tutup detail</span>
                        </Button>
                        </CardHeader>
                        <CardContent className="space-y-8 p-8 text-left">
                        <div>
                            <h3 className="text-2xl font-bold mb-4 text-foreground">Contoh Kalimat Lainnya:</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                            {vocabulary.detailedExamples.map((ex, index) => (
                                <div key={index} className="p-4 bg-muted/30 rounded-md border border-muted-foreground/10 shadow-sm h-full">
                                <p className="text-muted-foreground text-base">{ex.furigana}</p>
                                <p className="text-muted-foreground text-base">{ex.romaji}</p>
                                <p className="text-foreground font-semibold text-xl">{ex.kanji}</p>
                                <p className="text-base text-muted-foreground italic mt-1">({ex.meaning})</p>
                                </div>
                            ))}
                            </div>
                        </div>
                        <Separator className="bg-muted-foreground/30 h-[2px]" />
                        <div>
                            <h3 className="text-2xl font-bold mb-4 text-foreground">Bentuk Lain / Konjugasi:</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                            {vocabulary.conjugations.map((conj, index) => (
                                <div key={index} className="p-4 bg-muted/30 rounded-md border border-muted-foreground/10 shadow-sm h-full">
                                <p className="font-bold text-xl mb-2 text-primary">{conj.form}:</p>
                                <p className="text-muted-foreground text-base">{conj.furigana}</p>
                                <p className="text-muted-foreground text-base">{conj.romaji}</p>
                                <p className="text-foreground font-semibold text-xl">{conj.kanji} - {conj.meaning}</p>
                                <p className="text-base text-muted-foreground italic mt-2">Contoh: {conj.example}</p>
                                <p className="text-base text-muted-foreground italic">{conj.exampleFurigana}</p>
                                <p className="text-base text-muted-foreground italic">{conj.exampleRomaji}</p>
                                <p className="text-base text-muted-foreground italic">({conj.exampleMeaning})</p>
                                </div>
                            ))}
                            </div>
                        </div>
                        </CardContent>
                    </Card>
                    </motion.div>
                )}
                </AnimatePresence>
            </motion.div>
            </div>
        </section>

        {/* Section 6: Melatih Pemahaman Kosakata */}
        <section className="relative py-20 bg-card/20 z-10 ">
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
                                            Kosakata Jepang
                                        </h3>
                                        <p className="text-sm text-primary/80">
                                            Kenali Kosakata Jepang
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                            Melatih Ingatan Dan Pemahaman Kosakata 
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Asah ingatanmu dengan kuis kosakata interaktif. Uji pemahamanmu dan lihat sejauh mana perkembangan belajarmu di platform ini.

                        </p>
                    </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 items-stretch" // Added items-stretch
            >
                <motion.div variants={itemVariants} className="h-full">
                <Card className="h-full p-8 flex flex-col items-center text-center bg-card/70 border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-24 h-24 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <BrainCircuitIcon className="h-16 w-16 text-primary mb-6 animate-spin-slow" />
                    <CardTitle className="text-3xl font-bold mb-3 text-foreground">Level: Beginner</CardTitle>
                    <Separator className="my-4 bg-primary/20 h-[1px]" />
                    <CardDescription className="text-lg text-muted-foreground flex-grow">
                    <p className="mb-2">Mulai petualangan Anda dengan menguji dasar-dasar kosakata.</p>
                    <p>Sempurna untuk pemula yang ingin membangun fondasi yang kuat.</p>
                    </CardDescription>
                </Card>
                </motion.div>
                <motion.div variants={itemVariants} className="h-full">
                <Card className="h-full p-8 flex flex-col items-center text-center bg-card/70 border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-secondary/5 rounded-full translate-x-1/2 translate-y-1/2"></div>
                    <ScrollTextIcon className="h-16 w-16 text-primary mb-6 animate-spin-slow animation-delay-1000" />
                    <CardTitle className="text-3xl font-bold mb-3 text-foreground">Level: Intermediate</CardTitle>
                    <Separator className="my-4 bg-primary/20 h-[1px]" />
                    <CardDescription className="text-lg text-muted-foreground flex-grow">
                    <p className="mb-2">Tingkatkan tantangan dengan kosakata yang lebih kompleks.</p>
                    <p>Siap untuk menguji pemahaman Anda lebih dalam?</p>
                    </CardDescription>
                </Card>
                </motion.div>
                <motion.div variants={itemVariants} className="h-full">
                <Card className="h-full p-8 flex flex-col items-center text-center bg-card/70 border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-accent/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <TrophyIcon className="h-16 w-16 text-primary mb-6 animate-spin-slow animation-delay-2000" />
                    <CardTitle className="text-3xl font-bold mb-3 text-foreground">Level: Advanced</CardTitle>
                    <Separator className="my-4 bg-primary/20 h-[1px]" />
                    <CardDescription className="text-lg text-muted-foreground flex-grow">
                    <p className="mb-2">Uji penguasaan Anda pada tingkat tertinggi.</p>
                    <p>Buktikan Anda adalah master kosakata bahasa Jepang!</p>
                    </CardDescription>
                </Card>
                </motion.div>
            </motion.div>

            <motion.div
                            className="text-center"
                            variants={itemVariants}
                        >
                            <Link href='/pengenalan-quis-huruf'>
                                <button className="bg-purple-600 hover:bg-purple-700 text-white px-12 py-6 rounded-md font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center gap-3 mx-auto">
                                    <Gamepad2 className="w-6 h-6" />
                                    Lihat Sistem Kuis Huruf
                                </button>
                            </Link>
                        </motion.div>
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

                        <div className="flex flex-col dark:text-gray-200 sm:flex-row gap-4 justify-center">
                            <Link
                                href={route('register')}
                                className="inline-flex items-center justify-center px-8 py-4 bg-background text-primary font-semibold rounded-md transition-colors duration-200 shadow-lg hover:bg-background/90 dark:text-gray-200"
                            >
                                <Rocket className="w-5 h-5 mr-2" />
                                Daftar Sekarang - GRATIS!
                            </Link>
                            <button
     onClick={() =>
        document
            .getElementById("mengapa")
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
