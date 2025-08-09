"use client";

import { DialogTrigger } from "@/components/ui/dialog";
import { usePage } from "@inertiajs/react"; // Inertia hook untuk mengambil data

import { useState, useEffect, useRef } from "react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogAction,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";

import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import { useLayout } from "../../Layouts/DashboardLayout";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
    Search,
    Star,
    StarOff,
    ChevronLeft,
    ChevronRight,
    SlidersHorizontal,
    Lightbulb,
    BookOpenCheck,
    FlipHorizontal,
    Check,
    X,
    Volume2,
    Sparkles,
    Filter,
    Award,
    Loader2,
    MessageSquareQuote,
    Flame,
    Clock,
    Zap,
    Repeat,
    BarChart3,
    BookOpen,
    GraduationCap,
    Target,
    Brain,
    Trophy,
    BookMarked,
    Bookmark,
    Eye,
    EyeOff,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import Dashboard from "@/Layouts/DashboardLayout";

import axios from "axios";

// Loading Component
const Loading = () => {
    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
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

// Alert Component
const Alert = ({ message, onClose, title = 'Berhasil!', description = '' }) => {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-background rounded-2xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center border border-primary/20"
            >
                <Check className="h-10 w-10 text-green-500 mb-2" />
                <h2 className="text-xl font-bold mb-2 text-center">{title}</h2>
                <p className="text-center text-muted-foreground mb-4">{message}</p>
                {description && <p className="text-center text-sm text-muted-foreground mb-4">{description}</p>}
                <Button onClick={onClose} className="mt-2 w-32 rounded-full">OK</Button>
            </motion.div>
        </div>
    );
};

function VocabularyContent({ vocabulary, todayVocabulary}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const [sortBy, setSortBy] = useState("a-z");
    const [showStickyBar, setShowStickyBar] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [vocabList, setVocabList] = useState(vocabulary);
    const [todayVocab, setTodayVocab] = useState(todayVocabulary || null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isSearching, setIsSearching] = useState(false);
    const [showBottomSearch, setShowBottomSearch] = useState(false);
    const [showBottomFilter, setShowBottomFilter] = useState(false);
    const [streakDays, setStreakDays] = useState(7);
    const [lastStudied, setLastStudied] = useState("2 jam yang lalu");
    const [expandedCard, setExpandedCard] = useState(null);
    const [isMobilePage, setIsMobilePage] = useState(false);
    const { sidebarOpen, isMobile } = useLayout();
    const contentRef = useRef(null);
    const filterSectionRef = useRef(null);
    const searchInputRef = useRef(null);
    const [showDialog, setShowDialog] = useState(false);
    
    // Add new states for loading and alert
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const [loadingButtonId, setLoadingButtonId] = useState(null);
    
    const [audioInstance, setAudioInstance] = useState(null);
    const [hoverToday, setHoverToday] = useState(false);

    const itemsPerPage = 6; // Add back the itemsPerPage constant

    // Simulate initial page load
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsPageLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    //audio method
    const playAudio = (url) => {
        if (!url) return;
        if (audioInstance) {
            audioInstance.pause();
            audioInstance.currentTime = 0;
        }
        const audio = new Audio(url);
        setAudioInstance(audio);
        audio.play().catch((e) => console.error("Gagal memutar audio:", e));
        audio.onended = () => setAudioInstance(null);
    };

    const handleClick = (audio) => {
        if (audio) {
            playAudio(audio);
        } else {
            setShowDialog(true);
        }
    };

    // Check if mobile
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobilePage(window.innerWidth < 768);
        };
        checkIfMobile();
        window.addEventListener("resize", checkIfMobile);
        return () => window.removeEventListener("resize", checkIfMobile);
    }, []);

    // Handle scroll to show sticky search bar at BOTTOM
    useEffect(() => {
        const handleScroll = () => {
            if (filterSectionRef.current) {
                const position =
                    filterSectionRef.current.getBoundingClientRect();
                // Menampilkan sticky bar ketika section filter sudah tidak terlihat (scrolled past)
                setShowStickyBar(position.bottom < 0);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Filter and sort vocabulary with loading simulation
    useEffect(() => {
        const filterAndSortVocabulary = async () => {
            setIsSearching(true);

            // Simulasi loading untuk pencarian
            await new Promise((resolve) => setTimeout(resolve, 300));

            let filtered = [...vocabulary];

            // Apply filter
            if (filter === "learned") {
                filtered = filtered.filter((item) => item.isLearned);
            } else if (filter === "not-learned") {
                filtered = filtered.filter((item) => !item.isLearned);
            }

            // Apply search
            if (searchTerm) {
                filtered = filtered.filter(
                    (item) =>
                        item.romaji
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                        item.meaning
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                        item.furigana.includes(searchTerm.toLowerCase()) ||
                        (item.kanji && item.kanji.includes(searchTerm))
                );
            }

          
           // Apply sort
if (sortBy === "a-z") {
    filtered.sort((a, b) => a.romaji.localeCompare(b.romaji));
} else if (sortBy === "newest") {
    filtered.sort((a, b) => b.id - a.id);
}


            setVocabList(filtered);
            setCurrentPage(1);
            setIsSearching(false);
        };

        filterAndSortVocabulary();
    }, [vocabulary, filter, sortBy, searchTerm]);



    // Calculate pagination
    const totalPages = Math.ceil(vocabList.length / itemsPerPage);
    const currentItems = vocabList.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
            },
        },
    };

    // Stats calculation
    const stats = {
        total: vocabulary.length,
        learned: vocabulary.filter((item) => item.isLearned).length,
    };

    // Toggle expanded card
    const toggleExpandCard = (id) => {
        setExpandedCard(expandedCard === id ? null : id);
    };

    // Get level color
    const getLevelColor = (level) => {
        switch (level) {
            case "N5":
                return "bg-emerald-500";
            case "N4":
                return "bg-blue-500";
            case "N3":
                return "bg-yellow-500";
            case "N2":
                return "bg-orange-500";
            case "N1":
                return "bg-red-500";
            default:
                return "bg-primary";
        }
    };



    // Overlay/alert yang hanya bisa ditutup dengan tombol, lalu refresh halaman
    const handleAlertClose = () => {
        setAlertMessage(null);
        window.location.reload();
    };

    return (
        <>
        <Head>
            <title>Daftar Kosakata</title>
        </Head>
            <AnimatePresence>
                {isPageLoading && <Loading />}
                {isButtonLoading && <Loading />}
                {alertMessage && (
                    <Alert 
                        message={alertMessage} 
                        onClose={handleAlertClose} 
                    />
                )}
            </AnimatePresence>
            
            <AlertDialog
                open={showDialog}
                onOpenChange={setShowDialog}
                className="z-[500] transition-all duration-300"
            >
                <AlertDialogContent className="z-[500] transition-all duration-300">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Audio belum tersedia
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                    <p className="text-sm text-muted-foreground">
                        Maaf, audio untuk huruf ini belum tersedia. Silakan coba
                        huruf lainnya.
                    </p>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setShowDialog(false)}>
                            Tutup
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <div ref={contentRef} className="max-w-6xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center space-x-2 text-sm bg-gradient-to-r from-background to-muted/50 dark:from-slate-950 dark:to-slate-900/50 p-3 rounded-lg shadow-sm border border-border/50 dark:border-slate-800/50  mb-[50px] w-fit"
                >
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <Link href="/dashboard">
                            <span className="text-muted-foreground dark:text-slate-400 hover:text-violet-800 dark:hover:text-violet-300 transition-all duration-300">
                                Dashboard
                            </span>
                        </Link>
                        <span className="text-primary dark:text-violet-400">/</span>
                        <Link href="/dashboard/kosakata">
                            <span className="text-violet-400 dark:text-violet-600">
                                List Kosakata
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
                {/* Header Section dengan desain yang ditingkatkan */}

                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10 text-center relative"
                >
                    <div className="py-8 px-4 relative z-0 bg-violet-300/20 dark:bg-violet-500/20 rounded-lg">
                        <div className="inline-block mb-4 bg-violet-500/20 p-2 rounded-full">
                            <GraduationCap className="h-8 w-8 text-slate-900 dark:text-slate-200" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-slate-900 dark:text-slate-200 capitalize">
                            Daftar Kosakata Jepang
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                            Temukan berbagai
                            <span className="relative inline-block mx-1 px-2 bg-primary/10 dark:bg-primary/30 text-primary dark:text-violet-300 rounded-md">
                                kosakata Jepang
                            </span>
                            yang bisa kamu pelajari dan kuasai, lengkap dengan
                            arti,
                            <span className="relative inline-block mx-1 px-2 bg-primary/10 dark:bg-primary/30 text-primary dark:text-violet-300 rounded-md my-1">
                                cara baca
                            </span>
                            , dan
                            <span className="relative inline-block mx-1 px-2 bg-primary/10 dark:bg-primary/30 text-primary dark:text-violet-300 rounded-md">
                                contoh penggunaannya
                            </span>
                            .
                            <br />
                            <span className="text-sm inline-block mt-2 bg-primary/5 px-3 py-1 rounded-full">
                                Tingkatkan pemahamanmu lewat daftar kosakata
                                ini!
                            </span>
                        </p>
                    </div>
                </motion.div>

                {/* Today's Vocabulary - Ditingkatkan dengan format kanji di atas, furigana di bawah */}
                {todayVocab && (
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-12"
                    >
                        <Card
                            className="overflow-hidden border border-primary/20 relative transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.01]"
                        >
   
                            <CardHeader className="pb-0">
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-sm font-medium flex items-center">
                                        <Sparkles className="w-4 h-4 mr-2 text-primary" />
                                        Kosakata Hari Ini
                                    </CardTitle>
                                </div>
                            </CardHeader>

                            <CardContent className="pt-6">
                                <div className="grid lg:grid-cols-[1fr_1fr] gap-6">
                                    {/* Bagian kiri: Kosakata dengan kanji di atas, furigana di bawah */}
                                    <div className="flex flex-col items-center justify-center space-y-6">
                                        <div className="text-center">
                                            {/* Kanji di atas, furigana di bawah */}
                                            <div className="mb-6">
                                                <div className="text-6xl font-bold text-primary mb-1">
                                                    {todayVocab.kanji}
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    {todayVocab.furigana}
                                                </div>
                                            </div>
                                            <div className="text-3xl font-medium mb-2">
                                                {todayVocab.romaji}
                                            </div>
                                            <div className="text-xl flex items-center justify-center gap-2 mb-6">
                                                <span>
                                                    {todayVocab.meaning}
                                                </span>
                                                {todayVocab.meaning.includes(
                                                    "Selamat"
                                                ) && (
                                                    <span className="text-2xl">
                                                        👋
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-3 justify-center">
                                            <Link href={`/dashboard/kosakata/detail-kosakata/${todayVocab.id}`}>
                                                <Button
                                                    className="gap-2 rounded-full bg-primary hover:bg-primary/90 text-white"
                                                >
                                                    <BookOpenCheck size={18} />
                                                    Pelajari Sekarang
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="outline"
                                                className={`gap-2 rounded-full transition-all duration-300 ${
                                                    isPlaying
                                                        ? "bg-primary text-primary-foreground border-primary"
                                                        : "border-primary/20 hover:bg-primary/10 hover:text-primary"
                                                }`}
                                                onClick={() => handleClick(todayVocab.audio)}
                                                disabled={isPlaying}
                                            >
                                                <Volume2
                                                    size={18}
                                                    className={
                                                        isPlaying
                                                            ? "animate-pulse"
                                                            : ""
                                                    }
                                                />
                                                {isPlaying
                                                    ? "Memutar..."
                                                    : "Dengarkan"}
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Bagian kanan: Contoh kalimat dengan kanji di atas, furigana di bawah */}
                                    <div className="bg-transparent dark:bg-slate-900/50 backdrop-blur-sm rounded-xl p-5 border border-primary/10 shadow-sm">
                                        <div className="flex items-center justify-center gap-2 mb-4">
                                            <MessageSquareQuote
                                                className="text-primary"
                                                size={18}
                                            />
                                            <h4 className="font-medium text-sm">
                                                Contoh Kalimat
                                            </h4>
                                        </div>

                                        <div className="space-y-4">
                                            {/* Contoh kalimat dengan kanji di atas, furigana di bawah */}
                                            <div className="flex flex-col items-center justify-center">
                                                {/* Kanji */}
                                                <div className="text-xl font-medium mb-1 text-center">
                                                    {todayVocab.example
                                                        ? todayVocab.example
                                                        : "Contoh Kalimat Belum Ada"}
                                                </div>
                                                {/* Furigana */}
                                                <div className="text-xs text-muted-foreground mb-3 text-center">
                                                    {todayVocab.exampleFurigana
                                                        ? todayVocab.exampleFurigana
                                                        : "Contoh Kalimat Belum Ada"}
                                                </div>
                                                {/* Romaji */}
                                                <div className="text-sm italic text-muted-foreground mb-2 text-center">
                                                    {todayVocab.exampleRomaji
                                                        ? todayVocab.exampleRomaji
                                                        : "Contoh Kalimat Belum Ada"}
                                                </div>
                                                {/* Arti */}
                                                <div className="text-sm font-medium text-center px-4 py-2 bg-primary/5 rounded-full">
                                                    {todayVocab.exampleMeaning
                                                        ? todayVocab.exampleMeaning
                                                        : "Contoh Kalimat Belum Ada"}
                                                </div>
                                            </div>

                                            {/* Elemen baru yang lebih menarik */}
                                            <div className="mt-4 pt-4 border-t border-primary/10">
                                                <div className="flex items-center justify-between text-xs">
                                                    <Badge
                                                        variant="outline"
                                                        className="rounded-full bg-primary/5 border-primary/20"
                                                    >
                                                        kosakata
                                                    </Badge>
                                                    <div className="flex items-center gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 rounded-full hover:bg-primary/5 hover:text-primary"
                                                        >
                                                            <Share size={16} />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {/* Statistics Summary */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-12"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                        <motion.div variants={itemVariants}>
                            <Card className="border border-primary/20 h-full transition-all duration-300 ease-in-out hover:shadow-md hover:scale-[1.02] hover:bg-primary/[0.02]">
                                <CardContent className="p-6 flex items-center gap-4">
                                    <div className="bg-primary/10 p-3 rounded-xl">
                                        <BarChart3
                                            size={28}
                                            className="text-primary"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex items-baseline gap-1">
                                            <div className="text-3xl font-bold">
                                                {stats.total}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                kata
                                            </div>
                                        </div>
                                        <div className="text-sm font-medium text-muted-foreground">
                                            Total Kosakata
                                        </div>
                                        <Progress
                                            value={100}
                                            className="h-1 mt-2"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Card className="border border-green-500/20 h-full transition-all duration-300 ease-in-out hover:shadow-md hover:scale-[1.02] hover:bg-green-500/[0.02]">
                                <CardContent className="p-6 flex items-center gap-4">
                                    <div className="bg-green-500/10 p-3 rounded-xl">
                                        <Award
                                            size={28}
                                            className="text-green-500"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex items-baseline gap-1">
                                            <div className="text-3xl font-bold">
                                                {stats.learned}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                kata
                                            </div>
                                        </div>
                                        <div className="text-sm font-medium text-muted-foreground">
                                            Sudah Dipelajari
                                        </div>
                                        <Progress
                                            value={
                                                (stats.learned / stats.total) *
                                                100
                                            }
                                            className="h-1 mt-2 bg-muted/50"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>


                    </div>
                </motion.div>

                {/* Search & Filter Section */}
                <motion.div
                    id="filter-section"
                    ref={filterSectionRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8 py-4 border-b border-primary/10"
                >
                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* Search Input - Tambahkan class h-10 untuk menyamakan tinggi */}
                        <div className="relative flex-grow h-10">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                                <Search className="h-4 w-4" />
                            </div>
                            <Input
                                ref={searchInputRef}
                                placeholder="Cari kosakata..."
                                className="pl-9 border-primary/20 focus-visible:ring-primary/30 rounded-full h-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Filter Buttons - Semua button diberi h-10 */}
                        <div className="flex gap-2 h-10">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="gap-2 rounded-full border-primary/20 hover:bg-primary/10 h-10"
                                    >
                                        <SlidersHorizontal size={16} />
                                        <span className="hidden sm:inline">
                                            Urutkan
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="rounded-xl border-primary/20"
                                >
                                    <DropdownMenuItem
                                        onClick={() => setSortBy("a-z")}
                                    >
                                        A-Z
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => setSortBy("newest")}
                                    >
                                        Terbaru
                                    </DropdownMenuItem>

                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Tabs - Tambahkan class h-full ke TabsList */}
                            <Tabs defaultValue="all" className="w-fit h-full">
                                <TabsList className="grid grid-cols-3 h-full p-1 rounded-full bg-muted/50">
                                    <TabsTrigger
                                        value="all"
                                        onClick={() => setFilter("all")}
                                        className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-8"
                                    >
                                        Semua
                                    </TabsTrigger>

                                    <TabsTrigger
                                        value="learned"
                                        onClick={() => setFilter("learned")}
                                        className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-8"
                                    >
                                        <Check size={16} />
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="not-learned"
                                        onClick={() => setFilter("not-learned")}
                                        className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-8"
                                    >
                                        <X size={16} />
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>

                            {/* Flashcard Button - Tambahkan h-10 */}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="rounded-full border-primary/20 hover:bg-primary/10 h-10 w-10"
                                    >
                                        <FlipHorizontal size={16} />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="rounded-xl">
                                    <DialogHeader>
                                        <DialogTitle>
                                            Mode Flashcard
                                        </DialogTitle>
                                        <DialogDescription>
                                            Ubah tampilan menjadi mode flashcard
                                            untuk latihan.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="py-4">
                                        <p>
                                            Fitur mode flashcard akan segera
                                            hadir!
                                        </p>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </motion.div>

                {/* Vocabulary Grid - Ditingkatkan dengan format kanji di atas, furigana di bawah */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-12"
                >
                    {isSearching ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
                            <p className="text-muted-foreground">
                                Mencari kosakata...
                            </p>
                        </div>
                    ) : vocabList.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="bg-muted/30 p-4 rounded-full mb-4">
                                <Search className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-medium mb-1">
                                Tidak ada hasil
                            </h3>
                            <p className="text-muted-foreground max-w-md">
                                Tidak ada kosakata yang sesuai dengan pencarian
                                Anda. Coba kata kunci lain atau ubah filter.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentItems.map((item) => (
                                <motion.div
                                    key={item.id}
                                    variants={itemVariants}
                                >
                                    <Card
                                        className="h-full border border-primary/10 overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px] hover:border-primary/30 flex flex-col"
                                       
                                    >
                                        {/* Card Header dengan layout yang lebih elegan dan left-aligned */}
                                        {/* Card Header */}
                                        <CardHeader className="pb-2 pt-4 px-5 flex-shrink-0">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    {/* Tambahkan container untuk kanji dan tombol audio */}
                                                    <div className="flex items-start gap-2">
                                                        <div>
                                                            <div className="text-3xl font-bold text-primary mb-1">
                                                                {item.kanji}
                                                            </div>
                                                            <div className="text-xs text-muted-foreground mb-2">
                                                                {item.furigana}
                                                            </div>
                                                        </div>
                                                        {/* Tombol Audio */}
                                                        <button
                                                            onClick={() => {handleClick(item.audio)}}
                                                            className="p-1.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-all duration-300 hover:scale-110 group"
                                                            aria-label="Play pronunciation"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="20"
                                                                height="20"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                className="text-primary group-hover:text-primary/80"
                                                            >
                                                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                                                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                                                                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                                                            </svg>
                                                        </button>
                                                    </div>

                                                    <div className="text-lg font-medium mb-1">
                                                        {item.romaji}
                                                    </div>
                                                    <div className="text-base text-muted-foreground">
                                                        {item.meaning}
                                                    </div>
                                                </div>
                                             
                                            </div>
                                        </CardHeader>

                                        {/* Card Content dengan label aksi yang lebih menarik */}
                                        <CardContent className="px-5 pt-2 flex-grow flex flex-col">
                                            {/* Status dipelajari dan Lihat Contoh secara vertikal di semua device */}
                                            <div className="flex flex-col gap-3 mb-4 mt-auto">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                           
                                                    className={`rounded-full transition-all duration-300 hover:scale-105 flex items-center justify-start ${
                                                        item.isLearned
                                                            ? "bg-green-500/5 text-green-600 border-green-500/30 hover:bg-green-500/10"
                                                            : "bg-muted/30 hover:bg-muted/50"
                                                    }`}
                                                    disabled={isButtonLoading && loadingButtonId === item.id}
                                                >
                                                    {isButtonLoading && loadingButtonId === item.id ? (
                                                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
                                                    ) : item.isLearned ? (
                                                        <BookMarked
                                                            size={16}
                                                            className="mr-2 text-green-600"
                                                        />
                                                    ) : (
                                                        <Bookmark
                                                            size={16}
                                                            className="mr-2"
                                                        />
                                                    )}
                                                    {item.isLearned
                                                        ? "Sudah Dipelajari"
                                                        : "Belum Dipelajari"}
                                                </Button>

                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        toggleExpandCard(
                                                            item.id
                                                        )
                                                    }
                                                    className={`rounded-full transition-all duration-300 hover:scale-105 border-primary/20 text-primary hover:bg-primary/5 flex items-center justify-start ${
                                                        expandedCard === item.id
                                                            ? "bg-primary/5"
                                                            : ""
                                                    }`}
                                                >
                                                    {expandedCard ===
                                                    item.id ? (
                                                        <EyeOff
                                                            size={16}
                                                            className="mr-2"
                                                        />
                                                    ) : (
                                                        <Eye
                                                            size={16}
                                                            className="mr-2"
                                                        />
                                                    )}
                                                    {expandedCard === item.id
                                                        ? "Sembunyikan Contoh"
                                                        : "Lihat Contoh"}
                                                </Button>
                                            </div>

                                            {/* Expanded content with example - improved design */}
                                            <AnimatePresence>
                                                {expandedCard === item.id && (
                                                    <motion.div
                                                        initial={{
                                                            opacity: 0,
                                                            height: 0,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            height: "auto",
                                                        }}
                                                        exit={{
                                                            opacity: 0,
                                                            height: 0,
                                                        }}
                                                        transition={{
                                                            duration: 0.3,
                                                        }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="bg-muted/20 rounded-lg p-5 mb-4 border border-primary/5">
                                                            <div className="flex items-center mb-4">
                                                                <MessageSquareQuote
                                                                    size={16}
                                                                    className="text-primary mr-2"
                                                                />
                                                                <p className="text-sm font-medium">
                                                                    Contoh
                                                                    Kalimat
                                                                </p>
                                                                <div className="h-[1px] flex-grow ml-2 bg-gradient-to-r from-primary/20 to-transparent"></div>
                                                            </div>

                                                            {/* Contoh kalimat dengan kanji di atas, furigana di bawah, left-aligned */}
                                                            {item.example ? (
                                                                <div className="space-y-4">
                                                                    {/* Kanji */}
                                                                    <div className="text-lg font-medium">
                                                                        {
                                                                            item.example
                                                                        }
                                                                    </div>
                                                                    {/* Furigana */}
                                                                    <div className="text-xs text-muted-foreground -mt-2">
                                                                        {
                                                                            item.exampleFurigana
                                                                        }
                                                                    </div>
                                                                    {/* Romaji */}
                                                                    <div className="text-sm italic text-muted-foreground">
                                                                        {
                                                                            item.exampleRomaji
                                                                        }
                                                                    </div>
                                                                    {/* Arti */}
                                                                    <div className="text-sm font-medium px-3 py-2 bg-white/50 rounded-md border border-primary/5">
                                                                        {
                                                                            item.exampleMeaning
                                                                        }
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <span className="text-sm">
                                                                    Contoh
                                                                    Kalimat
                                                                    Belum Ada
                                                                </span>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </CardContent>

                                        {/* Card Footer dengan tombol pelajari kosakata */}
                                        <CardFooter className="pt-0 px-5 pb-5">
                                            <div className="w-full flex flex-col gap-2">
                                                <Link href={`/dashboard/kosakata/detail-kosakata/${item.id}`}>
                                                    <Button
                                                        className="w-full rounded-full bg-primary hover:bg-primary/90 gap-2 transition-all duration-300 hover:scale-105 hover:shadow-md"
                                                    >
                                                        <BookOpen size={16} />{" "}
                                                        Pelajari Kosakata
                                                    </Button>
                                                </Link>

                                                <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
                                                    <div className="flex items-center">
                                                        <div
                                                            className={`w-3 h-3 rounded-full mr-1.5 ${getLevelColor(
                                                                item.level
                                                            )}`}
                                                        ></div>
                                                        <div className="bg-gradient-to-r from-muted/50 to-transparent px-2 py-1 rounded-full">
                                                            kosakata
                                                        </div>
                                                    </div>
                                                    <span className="flex items-center gap-1">
                                                        <Clock size={12} />{" "}
                                                        {item.lastStudied ||
                                                            "Belum dipelajari"}
                                                    </span>
                                                </div>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Pagination - Dipindahkan ke bawah grid kosakata */}
                {totalPages > 1 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex justify-center mt-10 mb-16"
                    >
                        <Card className="border border-primary/10 inline-block shadow-sm hover:shadow-md transition-all duration-300">
                            <CardContent className="p-2 flex items-center gap-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                        setCurrentPage((prev) =>
                                            Math.max(prev - 1, 1)
                                        )
                                    }
                                    disabled={currentPage === 1}
                                    className="rounded-full h-9 w-9 hover:bg-primary/5"
                                >
                                    <ChevronLeft size={16} />
                                </Button>

                                <div className="flex gap-1">
                                    {Array.from(
                                        { length: totalPages },
                                        (_, i) => i + 1
                                    ).map((page) => (
                                        <Button
                                            key={page}
                                            variant={
                                                currentPage === page
                                                    ? "default"
                                                    : "ghost"
                                            }
                                            size="icon"
                                            onClick={() => setCurrentPage(page)}
                                            className={`rounded-full h-9 w-9 transition-all duration-200 ${
                                                currentPage === page
                                                    ? "bg-primary text-primary-foreground"
                                                    : "hover:bg-primary/5"
                                            }`}
                                        >
                                            {page}
                                        </Button>
                                    ))}
                                </div>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                        setCurrentPage((prev) =>
                                            Math.min(prev + 1, totalPages)
                                        )
                                    }
                                    disabled={currentPage === totalPages}
                                    className="rounded-full h-9 w-9 hover:bg-primary/5"
                                >
                                    <ChevronRight size={16} />
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </div>

        </>
    );
}

// Komponen Lock untuk ikon kunci
const Lock = ({ size, className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
    );
};

// Komponen Share untuk ikon berbagi
const Share = ({ size, className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" x2="12" y1="2" y2="15" />
        </svg>
    );
};

// Main component at the end
export default function KosakataIndex() {
    const { sample_vocabulary, today_vocabulary} = usePage().props;

    return (
        <Dashboard>
            <VocabularyContent 
                vocabulary={sample_vocabulary} 
                todayVocabulary={today_vocabulary}
          
            />
        </Dashboard>
    );
}
