"use client"

import { useState } from "react"
import { Head, useForm, Link } from "@inertiajs/react"
import { motion } from "framer-motion"
import { User, Upload, Save, X, ArrowLeft } from "lucide-react"
import DashboardLayout from "../../Layouts/DashboardLayout"

export default function EditProfile({ user }) {
  const [photoPreview, setPhotoPreview] = useState(user?.foto ? user.foto : null)
  const [currentPhoto, setCurrentPhoto] = useState(user?.foto ? user.foto : null)

  const { data, setData, post, processing, errors } = useForm({
    name: user?.nama_pengguna || "",
    full_name: user?.nama_lengkap || "",
    avatar: null,
  })

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      console.log('File selected:', {
        name: file.name,
        size: file.size,
        type: file.type
      })
      
      setData("avatar", file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhotoPreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Debug: Log form data
    console.log('Form data:', data)
    console.log('Avatar file:', data.avatar)
    
    post("/dashboard/profile/update", {
      forceFormData: true,
      onSuccess: (page) => {
        console.log('Profile update successful')
      },
      onError: (errors) => {
        console.log('Profile update failed:', errors)
      },
      onFinish: () => {
        console.log('Profile update finished')
      }
    })
  }

  const handleCancel = () => {
    window.history.back()
  }

  // Generate initials for avatar fallback
  const getInitials = (name) => {
    if (!name) return "U"
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

  return (
    <DashboardLayout>
      <Head title="Edit Profile" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen bg-background py-10 px-4 font-sans"
      >
        <div className="max-w-xl mx-auto">
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
                <span className="text-muted-foreground dark:text-slate-400 hover:text-violet-800 dark:hover:text-violet-300 transition-all duration-300">
                  Profile
                </span>
              </Link>
              <span className="text-primary dark:text-violet-400">/</span>
              <span className="text-violet-400 dark:text-violet-600">Edit Profile</span>
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
            className="mb-8 text-center"
          >
            <div className="py-6 px-4 relative z-0 bg-gradient-to-r from-violet-500/20 via-purple-500/10 to-pink-500/10 dark:from-violet-800/30 dark:via-purple-800/20 dark:to-pink-800/20 rounded-lg">
              <div className="inline-block mb-4 bg-violet-500/20 p-2 rounded-full">
                <User className="h-8 w-8 text-slate-900 dark:text-slate-200" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-200 mb-2">Edit Profile</h1>
              <p className="text-slate-500 dark:text-slate-400">Perbarui informasi profil Anda</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-card border border-border rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
              {/* Photo Upload Section */}
              <motion.div variants={itemVariants} className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg mx-auto">
                    {photoPreview ? (
                      <motion.img
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        src={photoPreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : currentPhoto ? (
                      <motion.img
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        src={currentPhoto}
                        alt="Current Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center text-2xl font-bold text-muted-foreground">
                        {getInitials(data.name)}
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <input 
                    type="file" 
                    id="avatar" 
                    accept="image/*" 
                    onChange={handlePhotoChange} 
                    className="hidden" 
                  />
                  <label
                    htmlFor="avatar"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 text-muted-foreground rounded-lg cursor-pointer transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    Pilih Foto
                  </label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Format: JPG, PNG, GIF (Max 2MB)
                  </p>
                </div>
                {errors.avatar && <p className="text-destructive text-sm mt-2">{errors.avatar}</p>}
              </motion.div>

              {/* Username Field */}
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Nama Pengguna
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <input
                    type="text"
                    id="name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Masukkan nama pengguna"
                  />
                </div>
                {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
              </motion.div>

              {/* Full Name Field */}
              <motion.div variants={itemVariants}>
                <label htmlFor="full_name" className="block text-sm font-medium text-foreground mb-2">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <input
                    type="text"
                    id="full_name"
                    value={data.full_name}
                    onChange={(e) => setData("full_name", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                {errors.full_name && <p className="text-destructive text-sm mt-1">{errors.full_name}</p>}
              </motion.div>

              {/* Action Buttons */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-6">
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={processing}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-5 h-5" />
                  {processing ? "Menyimpan..." : "Simpan Perubahan"}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-muted hover:bg-muted/80 text-muted-foreground font-medium rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Kembali
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  )
}