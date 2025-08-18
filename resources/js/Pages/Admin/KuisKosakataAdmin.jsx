"use client"

import { useState, useMemo } from "react"
import { router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Trash2, Edit, Eye, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import AdminDashboardLayout from "../../Layouts/AdminDashboardLayout"
import { Head } from "@inertiajs/react"

const KuisKosakatAdmin = (props) => {
    // Dynamic data from props
    const { vocabularyQuizzes = [], availableVocabularies = [] } = props;

  const [searchTerm, setSearchTerm] = useState("")
  const [vocabularyFilter, setVocabularyFilter] = useState("")
  const [levelFilter, setLevelFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  // Modal states
  const [deleteModal, setDeleteModal] = useState({ open: false, quiz: null })
  const [editModal, setEditModal] = useState({ open: false, quiz: null })
  const [detailModal, setDetailModal] = useState({ open: false, quiz: null })
  const [addModal, setAddModal] = useState({ open: false })

  // Form state
  const [formData, setFormData] = useState({
    kosakata_id: "",
    level: "",
    soal_kanji: "",
    soal_furigana: "",
    soal_romaji: "",
    soal_arti: "",
    opsi_a_kanji: "",
    opsi_a_furigana: "",
    opsi_a_romaji: "",
    opsi_a_arti: "",
    opsi_b_kanji: "",
    opsi_b_furigana: "",
    opsi_b_romaji: "",
    opsi_b_arti: "",
    opsi_c_kanji: "",
    opsi_c_furigana: "",
    opsi_c_romaji: "",
    opsi_c_arti: "",
    opsi_d_kanji: "",
    opsi_d_furigana: "",
    opsi_d_romaji: "",
    opsi_d_arti: "",
    jawaban_benar: "",
  })

  const itemsPerPage = 5

  // Available options
  const levelOptions = ["intermediate", "advanced"]
  const answerOptions = [
    { value: "a", label: "A" },
    { value: "b", label: "B" },
    { value: "c", label: "C" },
    { value: "d", label: "D" },
  ]

  // Filter and search vocabulary quizzes
  const filteredVocabularyQuizzes = useMemo(() => {
    return vocabularyQuizzes.filter((quiz) => {
      const matchesSearch =
        quiz.soal_kanji.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.soal_furigana.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.soal_romaji.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.soal_arti.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesVocabulary = !vocabularyFilter || quiz.kosakata_id.toString() === vocabularyFilter
      const matchesLevel = !levelFilter || quiz.level === levelFilter
      return matchesSearch && matchesVocabulary && matchesLevel
    })
  }, [vocabularyQuizzes, searchTerm, vocabularyFilter, levelFilter])

  // Pagination
  const totalPages = Math.ceil(filteredVocabularyQuizzes.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedVocabularyQuizzes = filteredVocabularyQuizzes.slice(startIndex, startIndex + itemsPerPage)

  // Form handlers
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const resetForm = () => {
    setFormData({
      kosakata_id: "",
      level: "",
      soal_kanji: "",
      soal_furigana: "",
      soal_romaji: "",
      soal_arti: "",
      opsi_a_kanji: "",
      opsi_a_furigana: "",
      opsi_a_romaji: "",
      opsi_a_arti: "",
      opsi_b_kanji: "",
      opsi_b_furigana: "",
      opsi_b_romaji: "",
      opsi_b_arti: "",
      opsi_c_kanji: "",
      opsi_c_furigana: "",
      opsi_c_romaji: "",
      opsi_c_arti: "",
      opsi_d_kanji: "",
      opsi_d_furigana: "",
      opsi_d_romaji: "",
      opsi_d_arti: "",
      jawaban_benar: "",
    })
  }

    const handleAdd = () => {
        router.post(route('admin.kuis-kosakata.store'), formData, {
            onSuccess: () => {
                setAddModal({ open: false })
                resetForm()
                router.reload({ only: ['vocabularyQuizzes'] })
            }
        })
    }

    const handleEdit = () => {
        if (!editModal.quiz) return;
        router.put(route('admin.kuis-kosakata.update', { id: editModal.quiz.id }), formData, {
            onSuccess: () => {
                setEditModal({ open: false, quiz: null })
                resetForm()
                router.reload({ only: ['vocabularyQuizzes'] })
            }
        })
    }

    const handleDelete = () => {
        if (!deleteModal.quiz) return;
        router.delete(route('admin.kuis-kosakata.destroy', { id: deleteModal.quiz.id }), {
            onSuccess: () => {
                setDeleteModal({ open: false, quiz: null })
                router.reload({ only: ['vocabularyQuizzes'] })
            }
        })
    }

    const openEditModal = (quiz) => {
        setFormData({
            kosakata_id: quiz.kosakata_id.toString(),
            level: quiz.level,
            soal_kanji: quiz.soal_kanji,
            soal_furigana: quiz.soal_furigana,
            soal_romaji: quiz.soal_romaji,
            soal_arti: quiz.soal_arti,
            opsi_a_kanji: quiz.opsi_a_kanji,
            opsi_a_furigana: quiz.opsi_a_furigana,
            opsi_a_romaji: quiz.opsi_a_romaji,
            opsi_a_arti: quiz.opsi_a_arti,
            opsi_b_kanji: quiz.opsi_b_kanji,
            opsi_b_furigana: quiz.opsi_b_furigana,
            opsi_b_romaji: quiz.opsi_b_romaji,
            opsi_b_arti: quiz.opsi_b_arti,
            opsi_c_kanji: quiz.opsi_c_kanji,
            opsi_c_furigana: quiz.opsi_c_furigana,
            opsi_c_romaji: quiz.opsi_c_romaji,
            opsi_c_arti: quiz.opsi_c_arti,
            opsi_d_kanji: quiz.opsi_d_kanji,
            opsi_d_furigana: quiz.opsi_d_furigana,
            opsi_d_romaji: quiz.opsi_d_romaji,
            opsi_d_arti: quiz.opsi_d_arti,
            jawaban_benar: quiz.jawaban_benar,
        })
        setEditModal({ open: true, quiz })
    }

  const getVocabularyName = (vocabId) => {
    const vocab = availableVocabularies.find((v) => v.id === vocabId)
    return vocab ? `${vocab.kanji} (${vocab.arti})` : `ID: ${vocabId}`
  }

  const getCorrectAnswerText = (quiz) => {
    switch (quiz.jawaban_benar) {
      case "a":
        return `${quiz.opsi_a_kanji} (${quiz.opsi_a_arti})`
      case "b":
        return `${quiz.opsi_b_kanji} (${quiz.opsi_b_arti})`
      case "c":
        return `${quiz.opsi_c_kanji} (${quiz.opsi_c_arti})`
      case "d":
        return `${quiz.opsi_d_kanji} (${quiz.opsi_d_arti})`
      default:
        return "-"
    }
  }

  return (
    <AdminDashboardLayout currentPage="vocabulary-quiz">
        <Head title="Soal Kuis Kosakata"/>
        <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Kuis Kosakata</h1>
            <Button onClick={() => setAddModal({ open: true })} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Tambah Kuis
            </Button>
        </div>

        <Card>
            <CardHeader>
            <CardTitle>Data Kuis Kosakata</CardTitle>
            </CardHeader>
            <CardContent>
            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                    placeholder="Cari berdasarkan kanji, furigana, romaji, atau arti..."
                    value={searchTerm}
                    onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                    }}
                    className="pl-10"
                />
                </div>
                <Select
                value={vocabularyFilter}
                onValueChange={(value) => {
                    setVocabularyFilter(value)
                    setCurrentPage(1)
                }}
                >
                <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Filter Kosakata" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={null}>Semua Kosakata</SelectItem>
                    {availableVocabularies.map((vocab) => (
                    <SelectItem key={vocab.id} value={vocab.id.toString()}>
                        {vocab.kanji} ({vocab.arti})
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
                <Select
                value={levelFilter}
                onValueChange={(value) => {
                    setLevelFilter(value)
                    setCurrentPage(1)
                }}
                >
                <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Filter Level" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={null}>Semua Level</SelectItem>
                    {levelOptions.map((level) => (
                    <SelectItem key={level} value={level}>
                        {level}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>

            {/* Table */}
            <div className="rounded-md border">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Kosakata</TableHead>
                    <TableHead>Soal</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Jawaban Benar</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedVocabularyQuizzes.length > 0 ? (
                    paginatedVocabularyQuizzes.map((quiz) => (
                        <TableRow key={quiz.id}>
                        <TableCell>{getVocabularyName(quiz.kosakata_id)}</TableCell>
                        <TableCell>
                            <div className="space-y-1">
                            <p className="font-medium text-lg">{quiz.soal_kanji}</p>
                            <p className="text-sm text-gray-600">{quiz.soal_furigana}</p>
                            <p className="text-sm text-gray-500">{quiz.soal_romaji}</p>
                            <p className="text-sm">{quiz.soal_arti}</p>
                            </div>
                        </TableCell>
                        <TableCell>
                            <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                                quiz.level === "intermediate" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                            }`}
                            >
                            {quiz.level}
                            </span>
                        </TableCell>
                        <TableCell>
                            <span className="font-medium text-sm">
                            {quiz.jawaban_benar.toUpperCase()}: {getCorrectAnswerText(quiz)}
                            </span>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setDetailModal({ open: true, quiz })}
                                className="h-8 w-8 p-0"
                            >
                                <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditModal(quiz)}
                                className="h-8 w-8 p-0"
                            >
                                <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => setDeleteModal({ open: true, quiz })}
                                className="h-8 w-8 p-0"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                            </div>
                        </TableCell>
                        </TableRow>
                    ))
                    ) : (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        Tidak ada data kuis kosakata ditemukan
                        </TableCell>
                    </TableRow>
                    )}
                </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-gray-700">
                    Menampilkan {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredVocabularyQuizzes.length)}{" "}
                    dari {filteredVocabularyQuizzes.length} data
                </p>
                <div className="flex items-center space-x-2">
                    <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="w-8 h-8 p-0"
                    >
                        {page}
                    </Button>
                    ))}
                    <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    >
                    Next
                    <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
                </div>
            )}
            </CardContent>
        </Card>

        {/* Add/Edit Modal */}
        <Dialog
            open={addModal.open || editModal.open}
            onOpenChange={(open) => {
            if (!open) {
                setAddModal({ open: false })
                setEditModal({ open: false, quiz: null })
                resetForm()
            }
            }}
        >
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>{addModal.open ? "Tambah Kuis Kosakata" : "Edit Kuis Kosakata"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="kosakata_id">Kosakata</Label>
                    <Select value={formData.kosakata_id} onValueChange={(value) => handleInputChange("kosakata_id", value)} disabled={editModal.open}>
                    <SelectTrigger>
                        <SelectValue placeholder="Pilih kosakata" />
                    </SelectTrigger>
                    <SelectContent style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {availableVocabularies.map((vocab) => (
                        <SelectItem key={vocab.id} value={vocab.id.toString()}>
                            {vocab.kanji} ({vocab.arti})
                        </SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="level">Level</Label>
                    <Select value={formData.level} onValueChange={(value) => handleInputChange("level", value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Pilih level" />
                    </SelectTrigger>
                    <SelectContent>
                        {levelOptions.map((level) => (
                        <SelectItem key={level} value={level}>
                            {level}
                        </SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                </div>
                </div>

                {/* Question */}
                <div>
                <Label className="text-lg font-semibold">Soal</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="space-y-2">
                    <Label htmlFor="soal_kanji">Kanji</Label>
                    <Input
                        id="soal_kanji"
                        value={formData.soal_kanji}
                        onChange={(e) => handleInputChange("soal_kanji", e.target.value)}
                        placeholder="学校"
                    />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="soal_furigana">Furigana</Label>
                    <Input
                        id="soal_furigana"
                        value={formData.soal_furigana}
                        onChange={(e) => handleInputChange("soal_furigana", e.target.value)}
                        placeholder="がっこう"
                    />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="soal_romaji">Romaji</Label>
                    <Input
                        id="soal_romaji"
                        value={formData.soal_romaji}
                        onChange={(e) => handleInputChange("soal_romaji", e.target.value)}
                        placeholder="gakkou"
                    />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="soal_arti">Arti</Label>
                    <Input
                        id="soal_arti"
                        value={formData.soal_arti}
                        onChange={(e) => handleInputChange("soal_arti", e.target.value)}
                        placeholder="sekolah"
                    />
                    </div>
                </div>
                </div>

                {/* Options */}
                {["a", "b", "c", "d"].map((option) => (
                <div key={option}>
                    <Label className="text-lg font-semibold">Opsi {option.toUpperCase()}</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="space-y-2">
                        <Label htmlFor={`opsi_${option}_kanji`}>Kanji</Label>
                        <Input
                        id={`opsi_${option}_kanji`}
                        value={formData[`opsi_${option}_kanji`]}
                        onChange={(e) => handleInputChange(`opsi_${option}_kanji`, e.target.value)}
                        placeholder="学校"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor={`opsi_${option}_furigana`}>Furigana</Label>
                        <Input
                        id={`opsi_${option}_furigana`}
                        value={formData[`opsi_${option}_furigana`]}
                        onChange={(e) => handleInputChange(`opsi_${option}_furigana`, e.target.value)}
                        placeholder="がっこう"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor={`opsi_${option}_romaji`}>Romaji</Label>
                        <Input
                        id={`opsi_${option}_romaji`}
                        value={formData[`opsi_${option}_romaji`]}
                        onChange={(e) => handleInputChange(`opsi_${option}_romaji`, e.target.value)}
                        placeholder="gakkou"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor={`opsi_${option}_arti`}>Arti</Label>
                        <Input
                        id={`opsi_${option}_arti`}
                        value={formData[`opsi_${option}_arti`]}
                        onChange={(e) => handleInputChange(`opsi_${option}_arti`, e.target.value)}
                        placeholder="sekolah"
                        />
                    </div>
                    </div>
                </div>
                ))}

                {/* Correct Answer */}
                <div className="space-y-2">
                <Label htmlFor="jawaban_benar">Jawaban Benar</Label>
                <Select
                    value={formData.jawaban_benar}
                    onValueChange={(value) => handleInputChange("jawaban_benar", value)}
                >
                    <SelectTrigger>
                    <SelectValue placeholder="Pilih jawaban benar" />
                    </SelectTrigger>
                    <SelectContent>
                    {answerOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                        {option.label}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                </div>
            </div>
            <DialogFooter>
                <Button
                variant="outline"
                onClick={() => {
                    setAddModal({ open: false })
                    setEditModal({ open: false, quiz: null })
                    resetForm()
                }}
                >
                Batal
                </Button>
                <Button onClick={addModal.open ? handleAdd : handleEdit}>{addModal.open ? "Tambah" : "Simpan"}</Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>

        {/* Detail Modal */}
        <Dialog open={detailModal.open} onOpenChange={(open) => setDetailModal({ open, quiz: null })}>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>Detail Kuis Kosakata</DialogTitle>
            </DialogHeader>
            {detailModal.quiz && (
                <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <Label className="font-semibold">Kosakata:</Label>
                    <p>{getVocabularyName(detailModal.quiz.kosakata_id)}</p>
                    </div>
                    <div>
                    <Label className="font-semibold">Level:</Label>
                    <p>{detailModal.quiz.level}</p>
                    </div>
                </div>

                <div>
                    <Label className="font-semibold text-lg">Soal:</Label>
                    <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-medium">{detailModal.quiz.soal_kanji}</p>
                    <p className="text-lg text-gray-600">{detailModal.quiz.soal_furigana}</p>
                    <p className="text-gray-500">{detailModal.quiz.soal_romaji}</p>
                    <p className="font-medium">{detailModal.quiz.soal_arti}</p>
                    </div>
                </div>

                <div>
                    <Label className="font-semibold text-lg">Pilihan Jawaban:</Label>
                    <div className="mt-2 space-y-3">
                    {["a", "b", "c", "d"].map((option) => (
                        <div
                        key={option}
                        className={`p-3 rounded-lg border ${
                            detailModal.quiz.jawaban_benar === option ? "bg-green-50 border-green-200" : "bg-gray-50"
                        }`}
                        >
                        <div className="flex items-start gap-3">
                            <span className="font-bold text-lg">{option.toUpperCase()}:</span>
                            <div>
                            <p className="text-lg font-medium">{detailModal.quiz[`opsi_${option}_kanji`]}</p>
                            <p className="text-gray-600">{detailModal.quiz[`opsi_${option}_furigana`]}</p>
                            <p className="text-gray-500 text-sm">{detailModal.quiz[`opsi_${option}_romaji`]}</p>
                            <p>{detailModal.quiz[`opsi_${option}_arti`]}</p>
                            </div>
                            {detailModal.quiz.jawaban_benar === option && (
                            <span className="text-green-600 font-medium text-sm">✓ Benar</span>
                            )}
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                </div>
            )}
            </DialogContent>
        </Dialog>

        {/* Delete Modal */}
        <Dialog open={deleteModal.open} onOpenChange={(open) => setDeleteModal({ open, quiz: null })}>
            <DialogContent>
            <DialogHeader>
                <DialogTitle>Konfirmasi Hapus</DialogTitle>
                <DialogDescription>
                Apakah Anda yakin ingin menghapus kuis kosakata "{deleteModal.quiz?.soal_kanji}"? Tindakan ini tidak dapat
                dibatalkan.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteModal({ open: false, quiz: null })}>
                Batal
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                Hapus
                </Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
        </div>
    </AdminDashboardLayout>
  )
}

export default KuisKosakatAdmin
