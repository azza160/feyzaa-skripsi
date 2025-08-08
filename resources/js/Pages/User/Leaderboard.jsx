"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import DashboardLayout from "../../Layouts/DashboardLayout"
import { Link } from "@inertiajs/react"
import { X, ZoomIn } from "lucide-react"
import "../../../css/app.css"

const LeaderboardContent = ({ topUsers, currentUser, globalStats, user, currentLevel, currentExp, maxExp }) => {
  const [selectedUser, setSelectedUser] = useState(null)
  const [animatedExp, setAnimatedExp] = useState({})
  const [selectedImage, setSelectedImage] = useState(null)

  // Debug logging
  useEffect(() => {
    console.log('Current User Data:', currentUser)
    console.log('Top Users Data:', topUsers)
    console.log('Auth User:', user)
  }, [currentUser, topUsers, user])

  // Debug selectedImage state
  useEffect(() => {
    console.log('Selected Image State Changed:', selectedImage)
  }, [selectedImage])

  // Animate EXP numbers on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const newAnimatedExp = {}
      topUsers.forEach((user) => {
        newAnimatedExp[user.id] = user.exp
      })
      if (currentUser) {
        newAnimatedExp[currentUser.id] = currentUser.exp
      }
      setAnimatedExp(newAnimatedExp)
    }, 500)
    return () => clearTimeout(timer)
  }, [topUsers, currentUser])

  // Helper function untuk menangani URL Google Photos
  const getImageUrl = (foto) => {
    if (!foto) return "/placeholder.svg"
    
    // Jika URL Google Photos, tambahkan parameter untuk ukuran yang lebih besar
    if (foto.includes('googleusercontent.com')) {
      // Ganti s96-c dengan s400-c untuk ukuran yang lebih besar
      return foto.replace(/=s\d+-c/, '=s400-c')
    }
    
    return foto
  }

  // Helper function untuk truncate nama
  const truncateName = (name, maxLength = 15) => {
    if (!name) return ""
    if (name.length <= maxLength) return name
    return name.substring(0, maxLength) + "..."
  }

  const getMedalIcon = (rank) => {
    switch (rank) {
      case 1:
        return "🥇"
      case 2:
        return "🥈"
      case 3:
        return "🥉"
      default:
        return null
    }
  }

  const getLevelIcon = () => {
    return "⭐"
  }

  const getRankStyle = (rank) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 dark:from-yellow-900/20 dark:via-amber-900/20 dark:to-orange-900/20 border-yellow-400 shadow-yellow-300/30"
      case 2:
        return "bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50 dark:from-gray-800/30 dark:via-slate-800/30 dark:to-zinc-800/30 border-gray-400 shadow-gray-300/30"
      case 3:
        return "bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-900/20 dark:via-amber-900/20 dark:to-yellow-900/20 border-orange-400 shadow-orange-300/30"
      default:
        return "bg-card border-border hover:bg-card/80 dark:border-slate-700 dark:hover:bg-card/90"
    }
  }

  const getProgressToNext = (exp) => {
    if (exp === 0) return 0
    const nextLevelExp = Math.ceil(exp / 1000) * 1000
    const currentLevelExp = Math.floor(exp / 1000) * 1000
    return ((exp - currentLevelExp) / (nextLevelExp - currentLevelExp)) * 100
  }

  // Simplified Particle component
  const Particle = ({ delay = 0 }) => {
    const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 })

    useEffect(() => {
      if (typeof window !== "undefined") {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      }
    }, [])

    return (
      <motion.div
        className="absolute w-1 h-1 bg-primary/30 rounded-full"
        initial={{
          x: Math.random() * windowSize.width,
          y: windowSize.height + 10,
          opacity: 0,
        }}
        animate={{
          y: -10,
          opacity: [0, 1, 0],
          scale: [0, 1, 0],
        }}
        transition={{
          duration: 6,
          delay: delay,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  }

  // Image Modal Component
  const ImageModal = ({ imageUrl, onClose }) => {
    console.log('ImageModal rendered with imageUrl:', imageUrl) // Debug
    
    return (
      <AnimatePresence>
        {imageUrl && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="relative max-w-[90vw] max-h-[90vh]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onClose()
                }}
                className="absolute -top-4 -right-4 z-10 w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              <img
                src={getImageUrl(imageUrl)}
                alt="Profile"
                className="w-full h-full object-contain rounded-lg shadow-2xl"
                onError={(e) => {
                  e.target.src = "/placeholder.svg"
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  const LeaderboardCard = ({ user, isCurrentUser = false, index }) => (
    <motion.div
      variants={itemVariants}
      className={`
        relative p-4 sm:p-6 rounded-3xl border-2 transition-all duration-300 cursor-pointer
        hover:scale-[1.02] hover:shadow-xl group overflow-hidden
        ${isCurrentUser ? "ring-2 ring-primary ring-opacity-60 shadow-primary/20" : ""}
        ${user.rank <= 3 ? getRankStyle(user.rank) + " shadow-xl" : getRankStyle(user.rank)}
        ${user.rank === 1 ? "transform scale-105" : ""}
      `}
      whileHover={{ scale: user.rank === 1 ? 1.07 : 1.03 }}
      onClick={() => setSelectedUser(user)}
    >
      <div className="relative z-10">
        {/* Mobile Layout */}
        <div className="block sm:hidden">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-4">
            <div
              className={`
                flex items-center justify-center w-12 h-12 rounded-2xl font-bold text-lg
                ${user.rank <= 3 ? "bg-primary text-primary-foreground shadow-lg" : "bg-muted text-muted-foreground"}
              `}
            >
              {getMedalIcon(user.rank) || user.rank}
            </div>
            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
              {user.quizzesCompleted || 0} Quiz
            </div>
          </div>

          {/* Mobile Content */}
          <div className="space-y-4">
            {/* Avatar and User Info */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={getImageUrl(user.foto)}
                  alt={user.nama_pengguna}
                  className="w-14 h-14 rounded-2xl border-2 border-border object-cover shadow-lg"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg"
                  }}
                />
                {user.rank <= 3 && <div className="absolute -top-1 -right-1 text-lg">{getMedalIcon(user.rank)}</div>}
                <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold flex items-center">
                  {getLevelIcon()} {user.level}
                </div>
              </div>

              <div className="flex-1 min-w-0 ">
                <h3 className="font-bold text-foreground text-lg mb-1 truncate" title={user.nama_pengguna}>
                  {truncateName(user.nama_pengguna, 13)}
                  {isCurrentUser && (
                    <span className="ml-2 px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                      You
                    </span>
                  )}
                </h3>
                <div className="flex items-center space-x-1 mb-1">
                  {user.badges?.map((badge, idx) => (
                    <span key={idx} className="text-base">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* EXP Section - Mobile */}
              <div className="text-right">
                <div
                  className={`
                    font-bold text-2xl mb-1
                    ${user.rank <= 3 ? "text-primary" : "text-foreground"}
                  `}
                >
                  {(animatedExp[user.id] || 0).toLocaleString()}
                </div>
                <div className="text-muted-foreground text-xs">EXP</div>
              </div>
            </div>

            {/* Stats - Mobile */}
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <span>📚 {user.vocabularyLearned || 0} Kosakata</span>
              <span>🔤 {user.charactersLearned || 0} Huruf</span>
            </div>

       {/* Progress bar - Mobile */}
<div>
  <div className="flex justify-between text-xs text-muted-foreground mb-1 mt-5">
    {user.level >= 5 ? (
      <>
        <span>Level Maksimal</span>
        <span>100%</span>
      </>
    ) : (
      <>
        <span>Progress ke Level {user.level + 1}</span>
        <span>{Math.round(getProgressToNext(user.exp))}%</span>
      </>
    )}
  </div>
  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
    <motion.div
      className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
      initial={{ width: 0 }}
      animate={{
        width:
          user.level >= 5
            ? "100%"
            : `${getProgressToNext(user.exp)}%`,
      }}
      transition={{
        delay: index * 0.1 + 0.5,
        duration: 1,
        ease: "easeOut",
      }}
    />
  </div>
</div>

          </div>
        </div>

        {/* Desktop/Tablet Layout */}
        <div className="hidden sm:block">
          {/* Header with rank */}
          <div className="flex items-center justify-between mb-4">
            <div
              className={`
                flex items-center justify-center w-14 h-14 rounded-2xl font-bold text-xl
                ${user.rank <= 3 ? "bg-primary text-primary-foreground shadow-lg" : "bg-muted text-muted-foreground"}
              `}
            >
              {getMedalIcon(user.rank) || user.rank}
            </div>

            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
              {user.quizzesCompleted || 0} Quiz
            </div>
          </div>

          <div className="flex items-center justify-between">
            {/* Avatar with Level */}
            <div className="relative">
              <img
                src={getImageUrl(user.foto)}
                alt={user.nama_pengguna}
                className="w-16 h-16 rounded-2xl border-3 border-border object-cover shadow-lg"
                onError={(e) => {
                  e.target.src = "/placeholder.svg"
                }}
              />
              {user.rank <= 3 && <div className="absolute -top-2 -right-2 text-2xl">{getMedalIcon(user.rank)}</div>}
              <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold flex items-center">
                {getLevelIcon()} {user.level}
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 ml-3">
              <h3 className="font-bold text-foreground text-xl mb-1" title={user.nama_pengguna}>
                {truncateName(user.nama_pengguna, 15)}
                {isCurrentUser && (
                  <span className="ml-2 px-3 py-1 text-xs bg-primary text-primary-foreground rounded-full">You</span>
                )}
              </h3>

              <div className="flex items-center space-x-1 mt-2">
                {user.badges?.map((badge, idx) => (
                  <span key={idx} className="text-lg">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* EXP Section */}
          <div className="text-right">
            <div
              className={`
                font-bold text-3xl mb-1
                ${user.rank <= 3 ? "text-primary" : "text-foreground"}
              `}
            >
              {(animatedExp[user.id] || 0).toLocaleString()}
            </div>
            <div className="text-muted-foreground text-sm">EXP</div>
          </div>

          {/* Stats - Desktop */}
          <div className="mt-4 grid grid-cols-2 gap-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-2">
              <span>📚</span>
              <span>{user.vocabularyLearned || 0} Kosakata</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🔤</span>
              <span>{user.charactersLearned || 0} Huruf</span>
            </div>
          </div>

          {/* Progress bar */}
          {/* Progress bar - Mobile */}
<div>
  <div className="flex justify-between text-xs text-muted-foreground mb-1 mt-5">
    {user.level >= 5 ? (
      <>
        <span>Level Maksimal</span>
        <span>100%</span>
      </>
    ) : (
      <>
        <span>Progress ke Level {user.level + 1}</span>
        <span>{Math.round(getProgressToNext(user.exp))}%</span>
      </>
    )}
  </div>
  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
    <motion.div
      className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
      initial={{ width: 0 }}
      animate={{
        width:
          user.level >= 5
            ? "100%"
            : `${getProgressToNext(user.exp)}%`,
      }}
      transition={{
        delay: index * 0.1 + 0.5,
        duration: 1,
        ease: "easeOut",
      }}
    />
  </div>
</div>

        </div>
      </div>
    </motion.div>
  )

  // User Detail Modal
  const UserDetailModal = ({ user, onClose }) => (
    <AnimatePresence>
      {user && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-card rounded-3xl p-6 sm:p-8 max-w-md w-full border border-border shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src={getImageUrl(user.foto)}
                  alt={user.nama_pengguna}
                  className="w-20 sm:w-24 h-20 sm:h-24 rounded-3xl mx-auto mb-4 border-4 border-primary/20 cursor-pointer hover:scale-105 transition-transform"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    console.log('Image clicked in modal, setting selectedImage to:', user.foto) // Debug
                    setSelectedImage(user.foto)
                  }}
                  onError={(e) => {
                    e.target.src = "/placeholder.svg"
                  }}
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 rounded-3xl transition-colors flex items-center justify-center pointer-events-none">
                  <ZoomIn className="w-6 h-6 text-white opacity-0 hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">{user.nama_lengkap || user.nama_pengguna}</h2>
              <div className="text-3xl sm:text-4xl mb-4">{getLevelIcon()}</div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center mb-6">
                <div className="bg-muted/50 rounded-2xl p-3 sm:p-4">
                  <div className="text-xl sm:text-2xl font-bold text-primary">{user.rank}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Peringkat</div>
                </div>
                <div className="bg-muted/50 rounded-2xl p-3 sm:p-4">
                  <div className="text-xl sm:text-2xl font-bold text-primary">{user.level}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Level</div>
                </div>
                <div className="bg-muted/50 rounded-2xl p-3 sm:p-4">
                  <div className="text-xl sm:text-2xl font-bold text-primary">{user.vocabularyLearned || 0}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Kosakata</div>
                </div>
                <div className="bg-muted/50 rounded-2xl p-3 sm:p-4">
                  <div className="text-xl sm:text-2xl font-bold text-primary">{user.charactersLearned || 0}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Huruf</div>
                </div>
              </div>

              <div className="flex justify-center space-x-2 mb-6">
                {user.badges?.map((badge, idx) => (
                  <span key={idx} className="text-2xl sm:text-3xl">
                    {badge}
                  </span>
                ))}
              </div>

              <button
                onClick={onClose}
                className="w-full bg-primary text-primary-foreground py-3 rounded-2xl font-semibold hover:bg-primary/90 transition-colors"
              >
                Tutup
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  // Static Information Section
  const StaticInfoSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="mb-16"
    >
      {/* Decorative divider */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        <div className="px-6">
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      </div>

      {/* Main info cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto mb-8">
        {/* Learning Tips Card */}
        <motion.div
          className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <div className="text-center">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">💡</div>
            <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 sm:mb-3">Tips Belajar</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Konsistensi adalah kunci! Belajar 15 menit setiap hari lebih efektif daripada 2 jam sekali seminggu.
            </p>
            <div className="mt-3 sm:mt-4 text-xs text-blue-600 dark:text-blue-400 font-semibold">毎日頑張って！</div>
          </div>
        </motion.div>

        {/* Achievement System Card */}
        <motion.div
          className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <div className="text-center">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🏅</div>
            <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 sm:mb-3">Sistem Badge</h3>
            <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>🔥 Top 10</span>
                <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-1 rounded-full">Fire</span>
              </div>
              <div className="flex items-center justify-between">
                <span>⚡ Top 5</span>
                <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-2 py-1 rounded-full">Lightning</span>
              </div>
              <div className="flex items-center justify-between">
                <span>💎 Top 3</span>
                <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-2 py-1 rounded-full">Diamond</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Progress Tracker Card */}
        <motion.div
          className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 sm:col-span-2 lg:col-span-1"
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <div className="text-center">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">📈</div>
            <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 sm:mb-3">Progress Tracker</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-2 sm:mb-3">
              Pantau kemajuan belajar Anda dengan sistem level dan EXP yang interaktif.
            </p>
            <div className="flex justify-center space-x-2">
              <span className="text-xl sm:text-2xl">⭐</span>
              <span className="text-xs text-green-600 dark:text-green-400 font-semibold self-center">Level 1-5</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom motivational banner */}
      <motion.div
        className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/20 rounded-3xl p-4 sm:p-6 max-w-6xl mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <span className="text-xl sm:text-2xl">🎌</span>
            <h3 className="text-lg sm:text-xl font-bold text-foreground">Perjalanan Belajar Bahasa Jepang</h3>
            <span className="text-xl sm:text-2xl">🎌</span>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground mb-4">
            Dari Hiragana hingga Kanji, setiap langkah membawa Anda lebih dekat dengan penguasaan bahasa Jepang
          </p>
          <div className="flex items-center justify-center space-x-4 sm:space-x-6 text-xs sm:text-sm">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span className="text-muted-foreground">Huruf Dasar</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-muted-foreground">Kosakata</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span className="text-muted-foreground">Kanji</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom decorative divider */}
      <div className="flex items-center justify-center mt-8">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        <div className="px-6">
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      </div>
    </motion.div>
  )

  return (
    <div className="text-foreground">
      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumb Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center space-x-2 text-sm bg-gradient-to-r from-background to-muted/50 dark:from-slate-950 dark:to-slate-900/50 p-3 rounded-lg shadow-sm border border-border/50 dark:border-slate-800/50 mb-[50px] w-fit"
        >
          <div className="flex flex-wrap items-center space-x-2">
            <Link href={route("dashboard")}>
              <span className="text-muted-foreground dark:text-slate-400 hover:text-violet-800 dark:hover:text-violet-300 transition-all duration-300">
                Dashboard
              </span>
            </Link>
            <span className="text-primary dark:text-violet-400">
              /
            </span>
            <Link href={route("leaderboard")}>
              <span className="text-violet-400 dark:text-violet-600">
                Leaderboard
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

        <div className="min-h-screen relative overflow-hidden">
          {/* Particles background - always visible */}
          <div className="fixed inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <Particle key={i} delay={i * 0.8} />
            ))}
          </div>

          <div className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl relative z-10">
            {/* Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-12 text-center relative"
            >
              <div className="py-8 px-4 relative z-0 bg-gradient-to-r from-violet-500/20 via-purple-500/10 to-pink-500/10 dark:from-violet-800/30 dark:via-purple-800/20 dark:to-pink-800/20 rounded-lg">
                <div className="inline-block mb-4 bg-violet-500/20 p-2 rounded-full">
                  <span className="text-2xl">🏆</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-3 text-slate-900 dark:text-slate-200 capitalize">
                  Leaderboard <span className="text-xl sm:text-2xl">日本語</span>
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                  Lihat siapa yang mendominasi dalam belajar kosakata dan huruf Jepang! 
                  <span className="relative inline-block mx-1 px-2 bg-primary/10 dark:bg-primary/30 text-primary dark:text-violet-300 rounded-md">
                    Ayo bersaing
                  </span>
                  untuk mencapai puncak!
                  <br />
                  <span className="text-sm inline-block mt-2 bg-primary/5 px-3 py-1 rounded-full">
                    🚀 Kompetisi global untuk penguasaan bahasa Jepang
                  </span>
                </p>
              </div>
            </motion.div>

            {/* Current User Position - Always show */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8 sm:mb-12"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6 text-center flex items-center justify-center">
                🎯 Posisi Anda
              </h2>
              <div className="max-w-4xl mx-auto">
                {currentUser ? (
                  <LeaderboardCard user={currentUser} isCurrentUser={true} index={0} />
                ) : (
                  <div className="bg-card rounded-3xl p-6 border border-border text-center">
                    <p className="text-muted-foreground">Memuat posisi Anda...</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Static Information Section */}
            <StaticInfoSection />

            {/* Top 10 Leaderboard */}
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mb-8 sm:mb-12">
              <div className="flex items-center justify-center mb-6 sm:mb-8">
                <div className="bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 border border-primary/30 rounded-3xl p-4 sm:p-6 shadow-lg">
                  <div className="flex items-center justify-center space-x-3">
                    <div className="text-3xl sm:text-4xl">👑</div>
                    <div className="text-center">
                      <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                        Top 10 Champions
                      </h2>
                      <p className="text-sm sm:text-base text-muted-foreground mt-1">
                        <span className="text-base sm:text-lg">頂点</span> - Puncak Prestasi
                      </p>
                    </div>
                    <div className="text-3xl sm:text-4xl">🏆</div>
                  </div>
                  <div className="mt-3 flex justify-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
                {topUsers.map((user, index) => (
                  <LeaderboardCard key={user.id} user={user} isCurrentUser={currentUser && user.id === currentUser.id} index={index} />
                ))}
              </div>
            </motion.div>

            {/* Global Stats - Simplified to 2 columns */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-lg max-w-2xl mx-auto mb-8 sm:mb-12"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6 text-center">
                📊 Statistik Global <span className="text-base sm:text-lg">統計</span>
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:gap-6 text-center">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">{globalStats.totalUsers.toLocaleString()}</div>
                  <div className="text-sm sm:text-base text-muted-foreground">Total Pelajar</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">{globalStats.totalExp.toLocaleString()}</div>
                  <div className="text-sm sm:text-base text-muted-foreground">Total EXP</div>
                </div>
              </div>
            </motion.div>

            {/* Motivational CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-center p-6 sm:p-10 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl border border-primary/20 max-w-3xl mx-auto"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Siap mendominasi leaderboard? <span className="text-lg sm:text-xl">頑張って！</span> 🚀
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground mb-6">
                Terus belajar kosakata dan huruf Jepang untuk naik peringkat! Setiap pelajaran sangat berharga.
              </p>
              <motion.button
                className="bg-primary text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Mulai Belajar Sekarang! 💪
              </motion.button>
            </motion.div>
          </div>

          {/* User Detail Modal */}
          <UserDetailModal user={selectedUser} onClose={() => setSelectedUser(null)} />
          
          {/* Image Modal */}
          <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
        </div>
      </div>
    </div>
  )
}

export default function Leaderboard(props) {
  return (
    <DashboardLayout>
      <LeaderboardContent {...props} />
    </DashboardLayout>
  )
}
