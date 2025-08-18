"use client"

import { useState, useMemo } from "react"
import { usePage, router } from "@inertiajs/react"
import { route } from "ziggy-js"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Trash2, Edit, Eye, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import AdminDashboardLayout from "../../Layouts/AdminDashboardLayout"
import { Head } from "@inertiajs/react"

const KuisHurufAdmin = () => {
    // Data dinamis dari backend
    const { letterQuizzes = [], availableLetters = [] } = usePage().props
    const [letterQuizzesState, setLetterQuizzes] = useState(letterQuizzes)

  const [searchTerm, setSearchTerm] = useState("")
  const [jenisFilter, setJenisFilter] = useState("hiragana") // Updated default value
  const [levelFilter, setLevelFilter] = useState("beginner") // Updated default value
  const [currentPage, setCurrentPage] = useState(1)

  // Modal states
  const [deleteModal, setDeleteModal] = useState({ open: false, quiz: null })
  const [editModal, setEditModal] = useState({ open: false, quiz: null })
  const [detailModal, setDetailModal] = useState({ open: false, quiz: null })
  const [addModal, setAddModal] = useState({ open: false })

  // Form state
  const [formData, setFormData] = useState({
    huruf_id: "",
    jenis: "",
    level: "",
    question: "",
    character: "",
    correct_answer: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
  })

  const itemsPerPage = 5

  // Available options
  const jenisOptions = ["hiragana", "katakana"]
  const levelOptions = ["beginner", "intermediate", "advanced"]
  const answerOptions = [
    { value: "a", label: "A" },
    { value: "b", label: "B" },
    { value: "c", label: "C" },
    { value: "d", label: "D" },
  ]

  // Filter and search letter quizzes
    const filteredLetterQuizzes = useMemo(() => {
        return letterQuizzesState.filter((quiz) => {
            const matchesSearch =
                quiz.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                quiz.character.toLowerCase().includes(searchTerm.toLowerCase()) ||
                quiz.option_a.toLowerCase().includes(searchTerm.toLowerCase()) ||
                quiz.option_b.toLowerCase().includes(searchTerm.toLowerCase()) ||
                quiz.option_c.toLowerCase().includes(searchTerm.toLowerCase()) ||
                quiz.option_d.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesJenis = !jenisFilter || quiz.jenis === jenisFilter
            const matchesLevel = !levelFilter || quiz.level === levelFilter
            return matchesSearch && matchesJenis && matchesLevel
        })
    }, [letterQuizzesState, searchTerm, jenisFilter, levelFilter])

  // Pagination
  const totalPages = Math.ceil(filteredLetterQuizzes.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedLetterQuizzes = filteredLetterQuizzes.slice(startIndex, startIndex + itemsPerPage)

  // Form handlers
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const resetForm = () => {
    setFormData({
      huruf_id: "",
      jenis: "",
      level: "",
      question: "",
      character: "",
      correct_answer: "",
      option_a: "",
      option_b: "",
      option_c: "",
      option_d: "",
    })
  }

    const handleAdd = () => {
        // Validasi frontend
        if (!formData.huruf_id || !formData.jenis || !formData.level || !formData.question || !formData.character || !formData.correct_answer || !formData.option_a || !formData.option_b || !formData.option_c || !formData.option_d) {
            alert('Semua field wajib diisi!')
            return
        }
        // Kirim ke backend
        router.post(
            route('admin.soal-huruf.store'),
            { ...formData },
            {
                onSuccess: () => {
                    setAddModal({ open: false })
                    resetForm()
                    router.visit(route('admin.soal-huruf'))
                },
            }
        )
    }

    const handleEdit = () => {
        // Validasi frontend
        if (!formData.jenis || !formData.level || !formData.question || !formData.character || !formData.correct_answer || !formData.option_a || !formData.option_b || !formData.option_c || !formData.option_d) {
            alert('Semua field wajib diisi!')
            return
        }
        // Kirim ke backend
        router.put(
            route('admin.soal-huruf.update', editModal.quiz.id),
            { ...formData },
            {
                onSuccess: () => {
                    setEditModal({ open: false, quiz: null })
                    resetForm()
                    router.visit(route('admin.soal-huruf'))
                },
            }
        )
    }

    const handleDelete = () => {
        router.delete(
            route('admin.soal-huruf.destroy', deleteModal.quiz.id),
            {
                onSuccess: () => {
                    setDeleteModal({ open: false, quiz: null })
                    router.visit(route('admin.soal-huruf'))
                },
            }
        )
        setDeleteModal({ open: false, quiz: null })
    }

    const openEditModal = (quiz) => {
        setFormData({
            huruf_id: quiz.huruf_id.toString(),
            jenis: quiz.jenis,
            level: quiz.level,
            question: quiz.question,
            character: quiz.character,
            correct_answer: quiz.correct_answer,
            option_a: quiz.option_a,
            option_b: quiz.option_b,
            option_c: quiz.option_c,
            option_d: quiz.option_d,
        })
        setEditModal({ open: true, quiz })
    }

    const getHurufName = (hurufId) => {
        const huruf = availableLetters.find((h) => h.id === hurufId)
        return huruf ? `${huruf.huruf} (${huruf.romaji})` : `ID: ${hurufId}`
    }

  const getCorrectAnswerText = (quiz) => {
    switch (quiz.correct_answer) {
      case "a":
        return quiz.option_a
      case "b":
        return quiz.option_b
      case "c":
        return quiz.option_c
      case "d":
        return quiz.option_d
      default:
        return "-"
    }
  }

  return (
    <AdminDashboardLayout currentPage="letter-quiz">
        <Head title="Kuis Huruf Admin" />
        <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Kuis Huruf</h1>
            <Button onClick={() => setAddModal({ open: true })} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Tambah Kuis
            </Button>
        </div>

        <Card>
            <CardHeader>
            <CardTitle>Data Kuis Huruf</CardTitle>
            </CardHeader>
            <CardContent>
            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                    placeholder="Cari berdasarkan pertanyaan atau opsi jawaban..."
                    value={searchTerm}
                    onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                    }}
                    className="pl-10"
                />
                </div>
                <Select
                value={jenisFilter}
                onValueChange={(value) => {
                    setJenisFilter(value)
                    setCurrentPage(1)
                }}
                >
                <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Filter Jenis" />
                </SelectTrigger>
                <SelectContent>
                    {/* Jangan render jika value kosong, gunakan null */}
                    <SelectItem value={null}>Semua Jenis</SelectItem>
                    {jenisOptions.map((jenis) => (
                    <SelectItem key={jenis} value={jenis}>
                        {jenis}
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
                    <TableHead>Huruf</TableHead>
                    <TableHead>Character</TableHead>
                    <TableHead>Jenis</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Pertanyaan</TableHead>
                    <TableHead>Jawaban Benar</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedLetterQuizzes.length > 0 ? (
                    paginatedLetterQuizzes.map((quiz) => (
                        <TableRow key={quiz.id}>
                        <TableCell>{getHurufName(quiz.huruf_id)}</TableCell>
                        <TableCell className="font-medium text-2xl">{quiz.character}</TableCell>
                        <TableCell>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {quiz.jenis}
                            </span>
                        </TableCell>
                        <TableCell>
                            <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                                quiz.level === "beginner"
                                ? "bg-green-100 text-green-800"
                                : quiz.level === "intermediate"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                            >
                            {quiz.level}
                            </span>
                        </TableCell>
                        <TableCell className="max-w-xs truncate" title={quiz.question}>
                            {quiz.question}
                        </TableCell>
                        <TableCell>
                            <span className="font-medium">
                            {quiz.correct_answer.toUpperCase()}: {getCorrectAnswerText(quiz)}
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
                        <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                        Tidak ada data kuis huruf ditemukan
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
                    Menampilkan {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredLetterQuizzes.length)} dari{" "}
                    {filteredLetterQuizzes.length} data
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
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>{addModal.open ? "Tambah Kuis Huruf" : "Edit Kuis Huruf"}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="huruf_id">Huruf</Label>
                <Select value={formData.huruf_id} onValueChange={(value) => handleInputChange("huruf_id", value)} disabled={editModal.open}>
                    <SelectTrigger>
                    <SelectValue placeholder="Pilih huruf" />
                    </SelectTrigger>
                    <SelectContent>
                    {availableLetters.map((huruf) => (
                        <SelectItem key={huruf.id} value={huruf.id.toString()}>
                        {huruf.huruf} ({huruf.romaji})
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                </div>
                <div className="space-y-2">
                <Label htmlFor="character">Character</Label>
                <Input
                    id="character"
                    value={formData.character}
                    onChange={(e) => handleInputChange("character", e.target.value)}
                    placeholder="あ"
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="jenis">Jenis</Label>
                <Select value={formData.jenis} onValueChange={(value) => handleInputChange("jenis", value)}>
                    <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis" />
                    </SelectTrigger>
                    <SelectContent>
                    {jenisOptions.map((jenis) => (
                        <SelectItem key={jenis} value={jenis}>
                        {jenis}
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
                <div className="space-y-2 md:col-span-2">
                <Label htmlFor="question">Pertanyaan</Label>
                <Textarea
                    id="question"
                    value={formData.question}
                    onChange={(e) => handleInputChange("question", e.target.value)}
                    placeholder="Bagaimana cara membaca huruf ini?"
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="option_a">Opsi A</Label>
                <Input
                    id="option_a"
                    value={formData.option_a}
                    onChange={(e) => handleInputChange("option_a", e.target.value)}
                    placeholder="a"
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="option_b">Opsi B</Label>
                <Input
                    id="option_b"
                    value={formData.option_b}
                    onChange={(e) => handleInputChange("option_b", e.target.value)}
                    placeholder="i"
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="option_c">Opsi C</Label>
                <Input
                    id="option_c"
                    value={formData.option_c}
                    onChange={(e) => handleInputChange("option_c", e.target.value)}
                    placeholder="u"
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="option_d">Opsi D</Label>
                <Input
                    id="option_d"
                    value={formData.option_d}
                    onChange={(e) => handleInputChange("option_d", e.target.value)}
                    placeholder="e"
                />
                </div>
                <div className="space-y-2 md:col-span-2">
                <Label htmlFor="correct_answer">Jawaban Benar</Label>
                <Select
                    value={formData.correct_answer}
                    onValueChange={(value) => handleInputChange("correct_answer", value)}
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
            <DialogContent className="max-w-2xl">
            <DialogHeader>
                <DialogTitle>Detail Kuis Huruf</DialogTitle>
            </DialogHeader>
            {detailModal.quiz && (
                <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <Label className="font-semibold">Huruf:</Label>
                    <p>{getHurufName(detailModal.quiz.huruf_id)}</p>
                    </div>
                    <div>
                    <Label className="font-semibold">Character:</Label>
                    <p className="text-3xl">{detailModal.quiz.character}</p>
                    </div>
                    <div>
                    <Label className="font-semibold">Jenis:</Label>
                    <p>{detailModal.quiz.jenis}</p>
                    </div>
                    <div>
                    <Label className="font-semibold">Level:</Label>
                    <p>{detailModal.quiz.level}</p>
                    </div>
                </div>
                <div>
                    <Label className="font-semibold">Pertanyaan:</Label>
                    <p className="mt-1">{detailModal.quiz.question}</p>
                </div>
                <div>
                    <Label className="font-semibold">Pilihan Jawaban:</Label>
                    <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="font-medium">A:</span>
                        <span>{detailModal.quiz.option_a}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-medium">B:</span>
                        <span>{detailModal.quiz.option_b}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-medium">C:</span>
                        <span>{detailModal.quiz.option_c}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-medium">D:</span>
                        <span>{detailModal.quiz.option_d}</span>
                    </div>
                    </div>
                </div>
                <div>
                    <Label className="font-semibold">Jawaban Benar:</Label>
                    <p className="mt-1 text-green-600 font-medium">
                    {detailModal.quiz.correct_answer.toUpperCase()}: {getCorrectAnswerText(detailModal.quiz)}
                    </p>
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
                Apakah Anda yakin ingin menghapus kuis huruf "{deleteModal.quiz?.character}"? Tindakan ini tidak dapat
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

export default KuisHurufAdmin
