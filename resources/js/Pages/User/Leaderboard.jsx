"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import DashboardLayout from "../../Layouts/DashboardLayout"
import "../../../css/app.css"

const LeaderboardContent = ({ topUsers, currentUser, globalStats, user, currentLevel, currentExp, maxExp }) => {
  const [selectedUser, setSelectedUser] = useState(null)
  const [showParticles, setShowParticles] = useState(false)
  const [animatedExp, setAnimatedExp] = useState({})

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
              {user.quizzesCompleted} Quiz
            </div>
          </div>

          {/* Mobile Content */}
          <div className="space-y-4">
            {/* Avatar and User Info */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.shortName}
                  className="w-14 h-14 rounded-2xl border-2 border-border object-cover shadow-lg"
                />
                {user.rank <= 3 && <div className="absolute -top-1 -right-1 text-lg">{getMedalIcon(user.rank)}</div>}
                <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold flex items-center">
                  {getLevelIcon()} {user.level}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foreground text-lg mb-1 truncate">
                  {user.shortName}
                  {isCurrentUser && (
                    <span className="ml-2 px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                      You
                    </span>
                  )}
                </h3>
                <div className="flex items-center space-x-1 mb-1">
                  {user.badges.map((badge, idx) => (
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
              <span>📚 {user.vocabularyLearned} Kosakata</span>
              <span>🔤 {user.charactersLearned} Huruf</span>
            </div>

            {/* Progress bar - Mobile */}
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Progress ke Level {user.level + 1}</span>
                <span>{Math.round(getProgressToNext(user.exp))}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${getProgressToNext(user.exp)}%` }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 1, ease: "easeOut" }}
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
              {user.quizzesCompleted} Quiz
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Avatar with Level */}
              <div className="relative">
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.shortName}
                  className="w-16 h-16 rounded-2xl border-3 border-border object-cover shadow-lg"
                />
                {user.rank <= 3 && <div className="absolute -top-2 -right-2 text-2xl">{getMedalIcon(user.rank)}</div>}
                <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold flex items-center">
                  {getLevelIcon()} {user.level}
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <h3 className="font-bold text-foreground text-xl mb-1">
                  {user.shortName}
                  {isCurrentUser && (
                    <span className="ml-2 px-3 py-1 text-xs bg-primary text-primary-foreground rounded-full">You</span>
                  )}
                </h3>

                <div className="flex items-center space-x-1 mt-2">
                  {user.badges.map((badge, idx) => (
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
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Progress ke Level {user.level + 1}</span>
              <span>{Math.round(getProgressToNext(user.exp))}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${getProgressToNext(user.exp)}%` }}
                transition={{ delay: index * 0.1 + 0.5, duration: 1, ease: "easeOut" }}
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
              <img
                src={user.avatar || "/placeholder.svg"}
                alt={user.shortName}
                className="w-20 sm:w-24 h-20 sm:h-24 rounded-3xl mx-auto mb-4 border-4 border-primary/20"
              />
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">{user.name}</h2>
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
                  <div className="text-xl sm:text-2xl font-bold text-primary">{user.vocabularyLearned}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Kosakata</div>
                </div>
                <div className="bg-muted/50 rounded-2xl p-3 sm:p-4">
                  <div className="text-xl sm:text-2xl font-bold text-primary">{user.charactersLearned}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Huruf</div>
                </div>
              </div>

              <div className="flex justify-center space-x-2 mb-6">
                {user.badges.map((badge, idx) => (
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
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto mb-8">
        {/* Learning Tips Card */}
        <motion.div
          className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <div className="text-center">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">💡</div>
            <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 sm:mb-3">Tips Belajar</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Konsistensi adalah kunci! Belajar 15 menit setiap hari lebih efektif daripada 2 jam sekali seminggu.
            </p>
            <div className="mt-3 sm:mt-4 text-xs text-blue-600 font-semibold">毎日頑張って！</div>
          </div>
        </motion.div>

        {/* Achievement System Card */}
        <motion.div
          className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <div className="text-center">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🏅</div>
            <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 sm:mb-3">Sistem Badge</h3>
            <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>🔥 Top 10</span>
                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">Fire</span>
              </div>
              <div className="flex items-center justify-between">
                <span>⚡ Top 5</span>
                <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">Lightning</span>
              </div>
              <div className="flex items-center justify-between">
                <span>💎 Top 3</span>
                <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">Diamond</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Progress Tracker Card */}
        <motion.div
          className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 sm:col-span-2 lg:col-span-1"
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
              <span className="text-xs text-green-600 font-semibold self-center">Level 1-5</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom motivational banner */}
      <motion.div
        className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/20 rounded-3xl p-4 sm:p-6 max-w-3xl mx-auto"
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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Simplified particles background */}
      {showParticles && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <Particle key={i} delay={i * 0.8} />
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground mb-4 sm:mb-6 bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
            🏆 Leaderboard <span className="text-xl sm:text-2xl">日本語</span>
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            Lihat siapa yang mendominasi dalam belajar kosakata dan huruf Jepang! Ayo bersaing untuk mencapai puncak! 🚀
          </p>

          <button
            onClick={() => setShowParticles(!showParticles)}
            className="mt-4 px-4 py-2 bg-muted text-muted-foreground rounded-xl hover:bg-muted/80 transition-colors text-sm"
          >
            {showParticles ? "Sembunyikan Efek" : "Tampilkan Efek"}
          </button>
        </motion.div>

        {/* Current User Position */}
        {currentUser && currentUser.rank > 10 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 sm:mb-12"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6 text-center flex items-center justify-center">
              🎯 Posisi Anda
            </h2>
            <div className="max-w-2xl mx-auto">
              <LeaderboardCard user={currentUser} isCurrentUser={true} index={0} />
            </div>
          </motion.div>
        )}

        {/* Static Information Section */}
        <StaticInfoSection />

        {/* Top 10 Leaderboard */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center text-center">
              👑 Top 10 Champions <span className="ml-2 text-base sm:text-lg">頂点</span>
            </h2>
          </div>

          <div className="space-y-4 sm:space-y-6 max-w-2xl mx-auto">
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
