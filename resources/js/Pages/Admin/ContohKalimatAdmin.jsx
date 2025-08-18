"use client"

import { useState, useMemo, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Trash2, Edit, Eye, Plus, Play, Pause, ChevronLeft, ChevronRight } from "lucide-react"
import AdminDashboardLayout from "../../Layouts/AdminDashboardLayout"
import { Head, usePage, router } from "@inertiajs/react"
import { route } from "ziggy-js"

const ContohKalimatAdmin = () => {
  const { exampleSentences = [], availableVocabularies = [], availableVocabularyForms = [] } = usePage().props

  // Static example sentences data
  const [exampleSentencesState, setExampleSentences] = useState([
    {
      id: 1,
      kosakata_id: 1,
      bentuk_kosakata_id: 1,
      kanji: "私は学校に行きます。",
      furigana: "わたしはがっこうにいきます。",
      romaji: "watashi wa gakkou ni ikimasu.",
      arti: "Saya pergi ke sekolah.",
      audio: "https://example.com/audio/sentence1.mp3",
    },
    {
      id: 2,
      kosakata_id: 1,
      bentuk_kosakata_id: 2,
      kanji: "学校に行って、友達に会いました。",
      furigana: "がっこうにいって、ともだちにあいました。",
      romaji: "gakkou ni itte, tomodachi ni aimashita.",
      arti: "Pergi ke sekolah dan bertemu teman.",
      audio: "https://example.com/audio/sentence2.mp3",
    },
    {
      id: 3,
      kosakata_id: 2,
      bentuk_kosakata_id: 3,
      kanji: "田中さんは先生でした。",
      furigana: "たなかさんはせんせいでした。",
      romaji: "tanaka-san wa sensei deshita.",
      arti: "Tanaka-san adalah guru.",
      audio: "https://example.com/audio/sentence3.mp3",
    },
  ])

  // Available vocabularies and forms for dropdown
  const availableVocabulariesState = [
    { id: 1, kanji: "学校", arti: "sekolah" },
    { id: 2, kanji: "先生", arti: "guru" },
    { id: 3, kanji: "本", arti: "buku" },
  ]

  const availableVocabularyFormsState = [
    { id: 1, bentuk: "masu form", kosakata_id: 1 },
    { id: 2, bentuk: "te form", kosakata_id: 1 },
    { id: 3, bentuk: "past form", kosakata_id: 2 },
  ]

  const [searchTerm, setSearchTerm] = useState("")
  const [vocabularyFilter, setVocabularyFilter] = useState("0")
  const [formFilter, setFormFilter] = useState("0") // <-- Tambahkan ini
  const [currentPage, setCurrentPage] = useState(1)
  const [currentAudio, setCurrentAudio] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  // Modal states
  const [deleteModal, setDeleteModal] = useState({ open: false, sentence: null })
  const [editModal, setEditModal] = useState({ open: false, sentence: null })
  const [detailModal, setDetailModal] = useState({ open: false, sentence: null })
  const [addModal, setAddModal] = useState({ open: false })

  // Form state
  const [formData, setFormData] = useState({
    kosakata_id: "",
    bentuk_kosakata_id: "",
    kanji: "",
    furigana: "",
    romaji: "",
    arti: "",
    audio: "",
  })

  const itemsPerPage = 5

  // Get filtered forms based on selected vocabulary
  const getFilteredForms = () => {
    if (!vocabularyFilter || vocabularyFilter === "0") return availableVocabularyFormsState
    return availableVocabularyFormsState.filter((form) => form.kosakata_id.toString() === vocabularyFilter)
  }

  // Filter and search example sentences
    const filteredExampleSentences = useMemo(() => {
        return exampleSentences.filter((sentence) => {
            const matchesSearch =
                sentence.kanji.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sentence.furigana.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sentence.romaji.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sentence.arti.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesVocabulary = vocabularyFilter === "0" || sentence.kosakata_id?.toString() === vocabularyFilter
            const matchesForm = formFilter === "0" || sentence.bentuk_kosakata_id?.toString() === formFilter
            return matchesSearch && matchesVocabulary && matchesForm
        })
    }, [exampleSentences, searchTerm, vocabularyFilter, formFilter])

  // Pagination
  const totalPages = Math.ceil(filteredExampleSentences.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedExampleSentences = filteredExampleSentences.slice(startIndex, startIndex + itemsPerPage)

  // Audio play seperti HurufAdmin.jsx
  const playAudio = (url) => {
    if (!url) return;
    const audio = new Audio(url);
    audio.play().catch((e) => console.error("Gagal memutar audio:", e));
  }

  // Form handlers
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const resetForm = () => {
    setFormData({
      kosakata_id: "",
      bentuk_kosakata_id: "",
      kanji: "",
      furigana: "",
      romaji: "",
      arti: "",
      audio: "",
    })
  }

  const handleAdd = () => {
    // Salah satu dari kosakata_id atau bentuk_kosakata_id harus diisi
    if ((!formData.kosakata_id && !formData.bentuk_kosakata_id) || !formData.romaji || !formData.arti) {
      alert("Field wajib tidak boleh kosong! (Isi salah satu: Kosakata atau Bentuk Kosakata)")
      return
    }
    router.post(route("admin.contoh-kalimat.store"), formData, {
      onSuccess: () => {
        setAddModal({ open: false })
        resetForm()
      },
    })
  }

  const handleEdit = () => {
    if (!formData.romaji || !formData.arti) {
      alert("Field wajib tidak boleh kosong!")
      return
    }
    router.put(route("admin.contoh-kalimat.update", editModal.sentence.id), formData, {
      onSuccess: () => {
        setEditModal({ open: false, sentence: null })
        resetForm()
      },
    })
  }

  const handleDelete = () => {
    router.delete(route("admin.contoh-kalimat.destroy", deleteModal.sentence.id), {
      onSuccess: () => {
        setDeleteModal({ open: false, sentence: null })
      },
    })
  }

  const openEditModal = (sentence) => {
    setFormData({
      kosakata_id: sentence.kosakata_id ? sentence.kosakata_id.toString() : "",
      bentuk_kosakata_id: sentence.bentuk_kosakata_id ? sentence.bentuk_kosakata_id.toString() : "",
      kanji: sentence.kanji,
      furigana: sentence.furigana,
      romaji: sentence.romaji,
      arti: sentence.arti,
      audio: sentence.audio,
    })
    setEditModal({ open: true, sentence })
  }

  const getVocabularyName = (vocabId) => {
    const vocab = availableVocabularies.find((v) => v.id.toString() === vocabId.toString())
    return vocab ? `${vocab.kanji} (${vocab.arti})` : `ID: ${vocabId}`
  }

  const getFormName = (formId) => {
    if (!formId) return "-"
    const form = availableVocabularyForms.find((f) => f.id.toString() === formId.toString())
    return form ? form.bentuk : `ID: ${formId}`
  }

  return (
    <AdminDashboardLayout currentPage="example-sentences">
        <Head title="contoh kalimat admin"/>
        <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Contoh Kalimat</h1>
            <Button onClick={() => setAddModal({ open: true })} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Tambah Contoh Kalimat
            </Button>
        </div>

        <Card>
            <CardHeader>
            <CardTitle>Data Contoh Kalimat</CardTitle>
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
                    setFormFilter("0") // Reset form filter when vocabulary changes
                    setCurrentPage(1)
                }}
                >
                <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Filter Kosakata" />
                </SelectTrigger>
                <SelectContent style={{ maxHeight: 300, overflowY: "auto" }}>
                  <SelectItem value="0">Semua Kosakata</SelectItem>
                  {availableVocabularies.map((vocab) => (
                    <SelectItem key={vocab.id} value={vocab.id.toString()}>
                      {vocab.kanji} ({vocab.arti})
                    </SelectItem>
                  ))}
                </SelectContent>
                </Select>
                <Select
                value={formFilter}
                onValueChange={(value) => {
                    setFormFilter(value)
                    setCurrentPage(1)
                }}
                >
                <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Filter Bentuk" />
                </SelectTrigger>
                <SelectContent style={{ maxHeight: 300, overflowY: "auto" }}>
                    <SelectItem value="0">Semua Bentuk</SelectItem>
                    {getFilteredForms().map((form) => (
                    <SelectItem key={form.id} value={form.id.toString()}>
                        {form.bentuk}
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
                    <TableHead>Kanji</TableHead>
                    <TableHead>Furigana</TableHead>
                    <TableHead>Romaji</TableHead>
                    <TableHead>Arti</TableHead>
                    <TableHead>Kosakata</TableHead>
                    <TableHead>Bentuk</TableHead>
                    <TableHead>Audio</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedExampleSentences.length > 0 ? (
                    paginatedExampleSentences.map((sentence) => (
                        <TableRow key={sentence.id}>
                        <TableCell className="font-medium max-w-xs truncate" title={sentence.kanji}>
                            {sentence.kanji}
                        </TableCell>
                        <TableCell className="max-w-xs truncate" title={sentence.furigana}>
                            {sentence.furigana}
                        </TableCell>
                        <TableCell className="max-w-xs truncate" title={sentence.romaji}>
                            {sentence.romaji}
                        </TableCell>
                        <TableCell className="max-w-xs truncate" title={sentence.arti}>
                            {sentence.arti}
                        </TableCell>
                        <TableCell>{getVocabularyName(sentence.kosakata_id)}</TableCell>
                        <TableCell>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            {getFormName(sentence.bentuk_kosakata_id)}
                            </span>
                        </TableCell>
                        <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => playAudio(sentence.audio)}
                              className="h-8 w-8 p-0"
                            >
                              <Play className="h-4 w-4" />
                            </Button>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setDetailModal({ open: true, sentence })}
                                className="h-8 w-8 p-0"
                            >
                                <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditModal(sentence)}
                                className="h-8 w-8 p-0"
                            >
                                <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => setDeleteModal({ open: true, sentence })}
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
                        <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                        Tidak ada data contoh kalimat ditemukan
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
                    Menampilkan {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredExampleSentences.length)}{" "}
                    dari {filteredExampleSentences.length} data
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
                setEditModal({ open: false, sentence: null })
                resetForm()
            }
            }}
        >
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>{addModal.open ? "Tambah Contoh Kalimat" : "Edit Contoh Kalimat"}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="kosakata_id">Kosakata</Label>
                <Select
                    value={formData.kosakata_id}
                    onValueChange={(value) => handleInputChange("kosakata_id", value)}
                    disabled={editModal.open} // Tidak bisa diubah saat edit
                >
                    <SelectTrigger>
                    <SelectValue placeholder="Pilih kosakata" />
                    </SelectTrigger>
          <SelectContent style={{ maxHeight: 300, overflowY: "auto" }}>
          {availableVocabularies.map((vocab) => (
            <SelectItem key={vocab.id} value={vocab.id.toString()}>
            {vocab.kanji} ({vocab.arti})
            </SelectItem>
          ))}
          </SelectContent>
                </Select>
                </div>
                <div className="space-y-2">
                <Label htmlFor="bentuk_kosakata_id">Bentuk Kosakata</Label>
                <Select
                    value={formData.bentuk_kosakata_id}
                    onValueChange={(value) => handleInputChange("bentuk_kosakata_id", value)}
                    disabled={editModal.open} // Tidak bisa diubah saat edit
                >
                    <SelectTrigger>
                    <SelectValue placeholder="Pilih bentuk" />
                    </SelectTrigger>
          <SelectContent style={{ maxHeight: 300, overflowY: "auto" }}>
          {availableVocabularyForms
            .filter((form) => !formData.kosakata_id || form.kosakata_id.toString() === formData.kosakata_id)
            .map((form) => (
            <SelectItem key={form.id} value={form.id.toString()}>
              {form.bentuk}
            </SelectItem>
            ))}
          </SelectContent>
                </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                <Label htmlFor="kanji">Kanji</Label>
                <Input
                    id="kanji"
                    value={formData.kanji}
                    onChange={(e) => handleInputChange("kanji", e.target.value)}
                    placeholder="私は学校に行きます。"
                />
                </div>
                <div className="space-y-2 md:col-span-2">
                <Label htmlFor="furigana">Furigana</Label>
                <Input
                    id="furigana"
                    value={formData.furigana}
                    onChange={(e) => handleInputChange("furigana", e.target.value)}
                    placeholder="わたしはがっこうにいきます。"
                />
                </div>
                <div className="space-y-2 md:col-span-2">
                <Label htmlFor="romaji">Romaji</Label>
                <Input
                    id="romaji"
                    value={formData.romaji}
                    onChange={(e) => handleInputChange("romaji", e.target.value)}
                    placeholder="watashi wa gakkou ni ikimasu."
                />
                </div>
                <div className="space-y-2 md:col-span-2">
                <Label htmlFor="arti">Arti</Label>
                <Input
                    id="arti"
                    value={formData.arti}
                    onChange={(e) => handleInputChange("arti", e.target.value)}
                    placeholder="Saya pergi ke sekolah."
                />
                </div>
                <div className="space-y-2 md:col-span-2">
                <Label htmlFor="audio">Audio URL</Label>
                <Input
                    id="audio"
                    value={formData.audio}
                    onChange={(e) => handleInputChange("audio", e.target.value)}
                    placeholder="https://example.com/audio.mp3"
                />
                </div>
            </div>
            <DialogFooter>
                <Button
                variant="outline"
                onClick={() => {
                    setAddModal({ open: false })
                    setEditModal({ open: false, sentence: null })
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
        <Dialog open={detailModal.open} onOpenChange={(open) => setDetailModal({ open, sentence: null })}>
            <DialogContent className="max-w-2xl">
            <DialogHeader>
                <DialogTitle>Detail Contoh Kalimat</DialogTitle>
            </DialogHeader>
            {detailModal.sentence && (
                <div className="space-y-4">
                <div>
                    <Label className="font-semibold">Kanji:</Label>
                    <p className="text-lg mt-1">{detailModal.sentence.kanji}</p>
                </div>
                <div>
                    <Label className="font-semibold">Furigana:</Label>
                    <p className="mt-1">{detailModal.sentence.furigana}</p>
                </div>
                <div>
                    <Label className="font-semibold">Romaji:</Label>
                    <p className="mt-1">{detailModal.sentence.romaji}</p>
                </div>
                <div>
                    <Label className="font-semibold">Arti:</Label>
                    <p className="mt-1">{detailModal.sentence.arti}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <Label className="font-semibold">Kosakata:</Label>
                    <p>{getVocabularyName(detailModal.sentence.kosakata_id)}</p>
                    </div>
                    <div>
                    <Label className="font-semibold">Bentuk:</Label>
                    <p>{getFormName(detailModal.sentence.bentuk_kosakata_id)}</p>
                    </div>
                </div>
                <div>
                    <Label className="font-semibold">Audio:</Label>
                    <div className="flex items-center gap-2 mt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => playAudio(detailModal.sentence.audio)}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Play Audio
                    </Button>
                    </div>
                </div>
                </div>
            )}
            </DialogContent>
        </Dialog>

        {/* Delete Modal */}
        <Dialog open={deleteModal.open} onOpenChange={(open) => setDeleteModal({ open, sentence: null })}>
            <DialogContent>
            <DialogHeader>
                <DialogTitle>Konfirmasi Hapus</DialogTitle>
                <DialogDescription>
                Apakah Anda yakin ingin menghapus contoh kalimat "{deleteModal.sentence?.kanji}"? Tindakan ini tidak dapat
                dibatalkan.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteModal({ open: false, sentence: null })}>
                Batal
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                Hapus
                </Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>

        <audio ref={audioRef} />
        </div>
    </AdminDashboardLayout>
  )
}

export default ContohKalimatAdmin
