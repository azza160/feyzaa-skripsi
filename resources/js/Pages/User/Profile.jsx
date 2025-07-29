"use client"

import { useState } from "react"
import { Head, Link } from "@inertiajs/react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Flame, Star, BookOpen, Languages, Target, X, Chrome, User, Settings } from "lucide-react"
import DashboardLayout from "../../Layouts/DashboardLayout"

export default function Profile({ user, stats }) {
  const [showPhotoModal, setShowPhotoModal] = useState(false)

  // Fallback data handling
  const userName = user?.nama_pengguna || "Belum diatur"
  const fullName = user?.nama_lengkap || "Belum diisi"
  const email = user?.email || "Belum diisi"
  const avatar = user?.foto
  const googleId = user?.google_id

  const userStats = {
    exp: stats?.exp || 0,
    level: stats?.level || 0,
    letters_learned: stats?.letters_learned || 0,
    vocabulary_learned: stats?.vocabulary_learned || 0,
    quizzes_completed: stats?.quizzes_completed || 0,
  }

  // Generate initials for avatar fallback
  const getInitials = (name) => {
    if (!name || name === "Belum diatur") return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const StatCard = ({ icon: Icon, label, value, isMain = false }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-card border border-border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${isMain ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
          <Icon className={isMain ? "w-8 h-8" : "w-6 h-6"} />
        </div>
        <div>
          <p className="text-sm text-muted-foreground font-medium">{label}</p>
          <p className={`font-bold ${isMain ? "text-3xl" : "text-2xl"} text-foreground`}>
            {value === 0 && !isMain ? "Belum ada data" : value}
          </p>
        </div>
      </div>
    </motion.div>
  )

  return (
    <DashboardLayout>
      <Head title="Profile" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen  py-8 px-4 font-sans"
      >
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center space-x-2 text-sm bg-gradient-to-r from-background to-muted/50 dark:from-slate-950 dark:to-slate-900/50 p-3 rounded-lg shadow-sm border border-border/50 dark:border-slate-800/50 mb-8 w-fit"
          >
            <div className="flex flex-wrap items-center space-x-2">
              <Link href={route("dashboard")}>
                <span className="text-muted-foreground dark:text-slate-400 hover:text-violet-800 dark:hover:text-violet-300 transition-all duration-300">
                  Dashboard
                </span>
              </Link>
              <span className="text-primary dark:text-violet-400">/</span>
              <Link href={route("profile")}>
                <span className="text-violet-400 dark:text-violet-600">Profile</span>
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

          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center relative"
          >
            <div className="py-8 px-4 relative z-0 bg-gradient-to-r from-violet-500/20 via-purple-500/10 to-pink-500/10 dark:from-violet-800/30 dark:via-purple-800/20 dark:to-pink-800/20 rounded-lg">
              <div className="inline-block mb-4 bg-violet-500/20 p-2 rounded-full">
                <User className="h-8 w-8 text-slate-900 dark:text-slate-200" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3 text-slate-900 dark:text-slate-200 capitalize">
                Profile Pengguna
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                Lihat dan kelola informasi profil Anda, termasuk statistik pembelajaran dan pencapaian
              </p>
            </div>
          </motion.div>

          {/* Mobile Layout */}
          <div className="block  space-y-8">
            {/* Header Profile - Mobile */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="relative inline-block mb-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => avatar && setShowPhotoModal(true)}
                  className={`w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg ${
                    avatar ? "cursor-pointer" : ""
                  }`}
                >
                  {avatar ? (
                    <img src={`${avatar}`} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center text-3xl font-bold text-muted-foreground">
                      {getInitials(userName)}
                    </div>
                  )}
                </motion.div>
              </div>

              <h1 className="text-3xl font-bold text-foreground mb-2">{userName}</h1>
              <p className="text-lg text-muted-foreground mb-1">{fullName}</p>
              <p className="text-sm text-muted-foreground mb-4 flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                {email}
              </p>

              {/* Login Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {googleId ? (
                  <>
                    <Chrome className="w-4 h-4" />
                    Login dengan Google
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    Login via Email
                  </>
                )}
              </div>

              {/* Edit Profile Button */}
              <div className="mt-4">
                <Link
                  href={route("profile.edit")}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Edit Profile
                </Link>
              </div>
            </motion.div>

            {/* Stats - Mobile */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <StatCard icon={Flame} label="EXP" value={userStats.exp} isMain />
                <StatCard icon={Star} label="Level" value={userStats.level} isMain />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <StatCard icon={BookOpen} label="Huruf Dipelajari" value={userStats.letters_learned} />
                <StatCard icon={Languages} label="Kosakata Dipelajari" value={userStats.vocabulary_learned} />
                <StatCard icon={Target} label="Kuis Dilakukan" value={userStats.quizzes_completed} />
              </div>
            </motion.div>
          </div>

         
        </div>
      </motion.div>

      {/* Photo Modal */}
      <AnimatePresence>
        {showPhotoModal && avatar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setShowPhotoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowPhotoModal(false)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={`${avatar}`}
                alt="Profile Preview"
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  )
}