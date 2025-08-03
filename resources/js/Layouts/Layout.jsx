"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "@inertiajs/react"
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
} from "lucide-react"

import "../../css/global.css"

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark")
    }
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [isDarkMode])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY > 20
      setScrolled(scrollPosition)
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Beranda", href: "/", icon: Home },
    { name: "Huruf", href: "/huruf", icon: BookOpen },
    { name: "Kuis Huruf", href: "/kuis-huruf", icon: Brain },
    { name: "Kosakata", href: "/kosakata", icon: MessageSquare },
    { name: "Kuis Kosakata", href: "/kuis-kosakata", icon: Brain },
    { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div className={`min-h-screen font-sans ${isDarkMode ? "dark" : ""}`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        {/* Header */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            !isMenuOpen && scrolled
              ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg"
              : "bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm"
          } ${isMenuOpen ? "border-b border-gray-200 dark:border-gray-700" : ""}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo & Title */}
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <span className="text-white font-bold text-lg">K</span>
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">KotoBee</span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 font-medium rounded-md"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center space-x-4">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                <Link
                  href="/login"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 font-medium"
                >
                  Masuk
                </Link>
              </div>

              {/* Mobile Actions */}
              <div className="lg:hidden flex items-center space-x-2">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                <button
                  onClick={toggleMenu}
                  className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
              <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" style={{ top: "145px" }} onClick={toggleMenu} />

              {/* Mobile Menu */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed top-20 left-0 right-0 z-40 lg:hidden bg-white dark:bg-gray-900 shadow-lg"
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-2">
                  {/* Navigation Links */}
                  {navLinks.map((link) => {
                    const IconComponent = link.icon
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="flex items-center space-x-3 p-3 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                        onClick={toggleMenu}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span className="font-medium">{link.name}</span>
                      </Link>
                    )
                  })}

                  {/* Mobile Buttons */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                    <Link
                      href="/register"
                      className="block w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-center rounded-md transition-colors duration-200 font-medium"
                      onClick={toggleMenu}
                    >
                      Daftar Gratis
                    </Link>
                    <Link
                      href="/login"
                      className="block w-full px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-center rounded-md transition-colors duration-200 font-medium"
                      onClick={toggleMenu}
                    >
                      Masuk
                    </Link>
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
              className="fixed bottom-8 right-8 z-50 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-lg hover:shadow-xl transition-all duration-200 group"
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
          className="bg-gray-900 text-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Brand Section */}
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center">
                    <span className="text-white font-bold text-lg">K</span>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-white">KotoBee</span>
                    <p className="text-gray-400 text-sm">Platform Pembelajaran Terdepan</p>
                  </div>
                </div>

                <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                  Bergabunglah dengan ribuan pelajar yang telah menguasai bahasa Jepang melalui metode pembelajaran
                  interaktif dan sistem gamifikasi yang menyenangkan.
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
                      className="p-3 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-md transition-colors duration-200"
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Navigasi Cepat</h3>
                <ul className="space-y-3">
                  {navLinks.slice(0, 4).map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-gray-400 hover:text-white transition-colors duration-200">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Hubungi Kami</h3>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a
                      href="mailto:support@kotobee.id"
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      support@kotobee.id
                    </a>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <a
                      href="tel:+6281234567890"
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      +62 812-3456-7890
                    </a>
                  </li>
                  <li className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400">Jakarta, Indonesia</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-center md:text-left">
                © {new Date().getFullYear()} KotoBee. Semua hak dilindungi undang-undang.
              </p>

              <div className="flex space-x-6">
                {["Kebijakan Privasi", "Syarat Layanan", "Bantuan"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
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
  )
}
