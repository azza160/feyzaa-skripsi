"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, usePage } from "@inertiajs/react";
import {
    Home,
    BookOpen,
    Brain,
    MessageSquare,
    Trophy,
    Menu,
    X,
    Sun,
    Moon,
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    Mail,
    Phone,
    MapPin,
    ChevronUp,
    LayoutDashboard
} from "lucide-react";

import "../../css/app.css";

export default function Layout({ children }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const { url, isLogin } = usePage().props;

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setIsDarkMode(savedTheme === "dark");
        }
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }

        // Dispatch custom event for theme change
        window.dispatchEvent(new Event("themeChanged"));
    }, [isDarkMode]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY > 20;
            setScrolled(scrollPosition);
            setShowScrollTop(window.scrollY > 300);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Beranda", href: "/", icon: Home },
        { name: "Huruf", href: "/pengenalan-huruf", icon: BookOpen },
        { name: "Kuis Huruf", href: "/pengenalan-quis-huruf", icon: Brain },
        { name: "Kosakata", href: "/pengenalan-kosakata", icon: MessageSquare },
        {
            name: "Kuis Kosakata",
            href: "/pengenalan-quis-kosakata",
            icon: Brain,
        },
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className={`min-h-screen font-sans ${isDarkMode ? "dark" : ""}`}>
            <div className="bg-background text-foreground">
                {/* Header */}
                <motion.header
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                        !isMenuOpen && scrolled
                            ? "bg-background/65 backdrop-blur-md shadow-xl border-b border-border"
                            : "bg-background backdrop-blur-sm"
                    } ${isMenuOpen ? "border-b border-border" : ""}`}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-20">
                            {/* Logo & Title */}
                            <Link
                                href={route("beranda")}
                                className="flex items-center space-x-3 group"
                            >
                                <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                                    <span className="text-primary-foreground font-bold text-lg">
                                        K
                                    </span>
                                </div>
                                <span className="text-2xl font-bold text-foreground">
                                    KotoBee
                                </span>
                            </Link>

                            {/* Desktop Navigation */}
                            <nav className="hidden lg:flex items-center space-x-1">
                                {navLinks.map((link) => {
                                    const isActive = url === link.href;
                                    return (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                                                isActive
                                                    ? "bg-primary text-white" // <-- Aktif
                                                    : "text-muted-foreground hover:text-primary hover:bg-muted" // <-- Default
                                            }`}
                                        >
                                            {link.name}
                                        </Link>
                                    );
                                })}
                               {isLogin && (
    <Link
        href={route("dashboard")}
        as="button"
        className="px-4 py-2 rounded-md font-medium transition-all duration-200 text-muted-foreground hover:text-primary hover:bg-muted"
    >
        Masuk Ke Dashboard
    </Link>
)}

                            </nav>

                            {/* Desktop Actions */}
                            <div className="hidden lg:flex items-center space-x-4">
                                <button
                                    onClick={toggleTheme}
                                    className="p-2 rounded-md text-muted-foreground hover:bg-muted transition-colors duration-200"
                                >
                                    {isDarkMode ? (
                                        <Sun className="w-5 h-5" />
                                    ) : (
                                        <Moon className="w-5 h-5" />
                                    )}
                                </button>

                                {isLogin ? (
                                    // Kalau sudah login → tombol logout
                                    <Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-200 font-medium"
                                    >
                                        Logout
                                    </Link>
                                ) : (
                                    // Kalau belum login → tombol login
                                    <Link
                                        href={route("login")}
                                        className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-colors duration-200 font-medium"
                                    >
                                        Login
                                    </Link>
                                )}
                            </div>

                            {/* Mobile Actions */}
                            <div className="lg:hidden flex items-center space-x-2">
                                <button
                                    onClick={toggleTheme}
                                    className="p-2 rounded-md text-muted-foreground hover:bg-muted transition-colors duration-200"
                                >
                                    {isDarkMode ? (
                                        <Sun className="w-5 h-5" />
                                    ) : (
                                        <Moon className="w-5 h-5" />
                                    )}
                                </button>

                                <button
                                    onClick={toggleMenu}
                                    className="p-2 rounded-md text-muted-foreground hover:bg-muted transition-colors duration-200"
                                >
                                    {isMenuOpen ? (
                                        <X className="w-6 h-6" />
                                    ) : (
                                        <Menu className="w-6 h-6" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.header>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <>
                            {/* Overlay */}
                            <div
                                className="fixed inset-0 bg-black/90 z-30 lg:hidden"
                                style={{ top: "145px" }}
                                onClick={toggleMenu}
                            />

                            {/* Mobile Menu */}
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="fixed top-20 left-0 right-0 z-40 lg:hidden bg-background shadow-lg"
                            >
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-2">
                                    {/* Navigation Links */}
                                    {navLinks.map((link) => {
                                        const isActive = url === link.href;
                                        const IconComponent = link.icon;
                                        return (
                                            <Link
                                                key={link.name}
                                                href={link.href}
                                                className={`flex items-center space-x-3 p-3 rounded-md transition-colors duration-200 ${
                                                    isActive
                                                        ? "bg-primary text-white"
                                                        : "text-muted-foreground hover:bg-muted hover:text-primary"
                                                }`}
                                                onClick={toggleMenu}
                                            >
                                                <IconComponent className="w-5 h-5" />
                                                <span className="font-medium">
                                                    {link.name}
                                                </span>
                                            </Link>
                                        );
                                    })}
                                                        {isLogin && (
    <Link
        href={route("dashboard")}
        as="button"
        className="flex items-center space-x-3 p-3 rounded-md transition-colors duration-200 text-muted-foreground hover:bg-muted hover:text-primary w-full"
    >
        <LayoutDashboard className="w-5 h-5" />
        <span className="font-medium">
        Masuk Ke Dashboard
        </span>
    </Link>
)}
                                    {/* Mobile Buttons */}
                                    <div className="pt-4 border-t border-border space-y-3 w-full">
                                        {!isLogin && (
                                            <Link
                                                href={route("register")}
                                                className="block w-full px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground text-center rounded-md transition-colors duration-200 font-medium mb-1"
                                                onClick={toggleMenu}
                                            >
                                                Daftar Gratis
                                            </Link>
                                        )}

                                        {isLogin ? (
                                            // Kalau sudah login → tombol logout
                                            <Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                                className="px-6 py-2 w-full mt-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-200 font-medium"
                                            >
                                                Logout
                                            </Link>
                                        ) : (
                                            // Kalau belum login → tombol login
                                            <Link
                                                href={route("login")}
                                                as="button"
                                                className="px-6  w-full  bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-colors duration-200 font-medium py-3"
                                            >
                                                Login
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* Scroll to Top Button */}
                <AnimatePresence>
                    {showScrollTop && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                            onClick={scrollToTop}
                            className="fixed bottom-8 right-8 z-50 p-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md shadow-lg hover:shadow-xl transition-all duration-200 group"
                        >
                            <ChevronUp className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* Main Content */}
                <main className="pt-20">{children}</main>

                {/* Footer */}
                <motion.footer
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-card text-card-foreground border-t"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Brand Section */}
                            <div className="lg:col-span-2">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
                                        <span className="text-primary-foreground font-bold text-lg">
                                            K
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-2xl font-bold text-card-foreground">
                                            KotoBee
                                        </span>
                                        <p className="text-muted-foreground text-sm">
                                            Platform Pembelajaran Terdepan
                                        </p>
                                    </div>
                                </div>

                                <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
                                    Bergabunglah dengan ribuan pelajar yang
                                    telah menguasai bahasa Jepang melalui metode
                                    pembelajaran interaktif dan sistem
                                    gamifikasi yang menyenangkan.
                                </p>

                                {/* Social Media */}
                                <div className="flex space-x-4">
                                    {[
                                        { icon: Facebook, href: "#" },
                                        { icon: Twitter, href: "#" },
                                        { icon: Instagram, href: "#" },
                                        { icon: Youtube, href: "#" },
                                    ].map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.href}
                                            className="p-3 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-card-foreground rounded-md transition-colors duration-200"
                                        >
                                            <social.icon className="w-5 h-5" />
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h3 className="text-lg font-semibold text-card-foreground mb-4">
                                    Navigasi Cepat
                                </h3>
                                <ul className="space-y-3">
                                    {navLinks.slice(0, 5).map((link) => {
                                        const isActive = url === link.href;
                                        return (
                                            <li key={link.name}>
                                                <Link
                                                    href={link.href}
                                                    className={`transition-colors duration-200 ${
                                                        isActive
                                                            ? "text-primary font-semibold"
                                                            : "text-muted-foreground hover:text-card-foreground"
                                                    }`}
                                                >
                                                    {link.name}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>

                            {/* Contact Info */}
                            <div>
                                <h3 className="text-lg font-semibold text-card-foreground mb-4">
                                    Hubungi Kami
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex items-center space-x-3">
                                        <Mail className="w-4 h-4 text-muted-foreground" />
                                        <a
                                            href="mailto:support@kotobee.id"
                                            className="text-muted-foreground hover:text-card-foreground transition-colors duration-200"
                                        >
                                            support@kotobee.id
                                        </a>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <Phone className="w-4 h-4 text-muted-foreground" />
                                        <a
                                            href="tel:+6281234567890"
                                            className="text-muted-foreground hover:text-card-foreground transition-colors duration-200"
                                        >
                                            +62 812-3456-7890
                                        </a>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <MapPin className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-muted-foreground">
                                            Jakarta, Indonesia
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Bottom Section */}
                        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <p className="text-muted-foreground text-center md:text-left">
                                © {new Date().getFullYear()} KotoBee. Semua hak
                                dilindungi undang-undang.
                            </p>

                            <div className="flex space-x-6">
                                {[
                                    "Kebijakan Privasi",
                                    "Syarat Layanan",
                                    "Bantuan",
                                ].map((item) => (
                                    <a
                                        key={item}
                                        href="#"
                                        className="text-muted-foreground hover:text-card-foreground transition-colors duration-200 text-sm"
                                    >
                                        {item}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.footer>
            </div>
        </div>
    );
}
