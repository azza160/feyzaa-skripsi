"use client"

import { useState, useMemo, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Trash2, Edit, Eye, Plus, Play, Pause, ChevronLeft, ChevronRight } from "lucide-react"
import AdminDashboardLayout from "../../Layouts/AdminDashboardLayout"
import { Head, usePage, router } from "@inertiajs/react"
import { route } from "ziggy-js"

const BentukKosakataAdmin = () => {
  // Ambil data dari props Inertia
  const { vocabularyForms = [], availableVocabularies = [] } = usePage().props



  const [searchTerm, setSearchTerm] = useState("")
  const [vocabularyFilter, setVocabularyFilter] = useState("0")
  const [currentPage, setCurrentPage] = useState(1)
  const [currentAudio, setCurrentAudio] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  // Modal states
  const [deleteModal, setDeleteModal] = useState({ open: false, form: null })
  const [editModal, setEditModal] = useState({ open: false, form: null })
  const [detailModal, setDetailModal] = useState({ open: false, form: null })
  const [addModal, setAddModal] = useState({ open: false })

  // Form state
  const [formData, setFormData] = useState({
    bentuk: "",
    id_kosakata: "",
    kanji: "",
    furigana: "",
    romaji: "",
    arti: "",
    deskripsi: "",
    audio: "",
  })

  const itemsPerPage = 5

  // Filter and search vocabulary forms
  const filteredVocabularyForms = useMemo(() => {
    return vocabularyForms.filter((form) => {
      const matchesSearch =
        form.bentuk.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.kanji.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.furigana.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.romaji.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.arti.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesVocabulary = vocabularyFilter === "0" || form.id_kosakata.toString() === vocabularyFilter
      return matchesSearch && matchesVocabulary
    })
  }, [vocabularyForms, searchTerm, vocabularyFilter])

  // Pagination
  const totalPages = Math.ceil(filteredVocabularyForms.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedVocabularyForms = filteredVocabularyForms.slice(startIndex, startIndex + itemsPerPage)

  // Audio handling
  const playAudio = (audioUrl) => {
    if (!audioUrl) return;
    const audio = new Audio(audioUrl);
    audio.play().catch((e) => console.error("Gagal memutar audio:", e));
  }

  // Form handlers
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const resetForm = () => {
    setFormData({
      bentuk: "",
      id_kosakata: "",
      kanji: "",
      furigana: "",
      romaji: "",
      arti: "",
      deskripsi: "",
      audio: "",
    })
  }

  const handleAdd = () => {
    if (!formData.bentuk || !formData.id_kosakata || !formData.romaji || !formData.arti) {
      alert("Field wajib tidak boleh kosong!");
      return;
    }
    router.post(route('admin.bentuk-kosakata.store'), formData, {
      onSuccess: () => {
        setAddModal({ open: false });
        resetForm();
      }
    });
  }

  const handleEdit = () => {
    if (!formData.bentuk || !formData.romaji || !formData.arti) {
      alert("Field wajib tidak boleh kosong!");
      return;
    }
    router.put(route('admin.bentuk-kosakata.update', editModal.form.id), formData, {
      onSuccess: () => {
        setEditModal({ open: false, form: null });
        resetForm();
      }
    });
  }

  const handleDelete = () => {
    router.delete(route('admin.bentuk-kosakata.destroy', deleteModal.form.id), {
      onSuccess: () => {
        setDeleteModal({ open: false, form: null });
      }
    });
  }

  const openEditModal = (form) => {
    setFormData({
      bentuk: form.bentuk,
      id_kosakata: form.id_kosakata.toString(),
      kanji: form.kanji,
      furigana: form.furigana,
      romaji: form.romaji,
      arti: form.arti,
      deskripsi: form.deskripsi,
      audio: form.audio,
    })
    setEditModal({ open: true, form })
  }

  const getVocabularyName = (vocabId) => {
    const vocab = availableVocabularies.find((v) => v.id.toString() === vocabId.toString())
    return vocab ? `${vocab.kanji} (${vocab.arti})` : `ID: ${vocabId}`
  }

  return (
    <AdminDashboardLayout currentPage="vocabulary-forms">
        <Head title="Bentuk Kosakata Admin" />
        <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Bentuk Kosakata</h1>
            <Button onClick={() => setAddModal({ open: true })} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Tambah Bentuk
            </Button>
        </div>

        <Card>
            <CardHeader>
            <CardTitle>Data Bentuk Kosakata</CardTitle>
            </CardHeader>
            <CardContent>
            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                    placeholder="Cari berdasarkan bentuk, kanji, furigana, romaji, atau arti..."
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
                  <SelectContent style={{ maxHeight: 300, overflowY: "auto" }}>
                    <SelectItem value="0">Semua Kosakata</SelectItem>
                    {availableVocabularies.map((vocab) => (
                      <SelectItem key={vocab.id} value={vocab.id.toString()}>
                        {vocab.kanji} ({vocab.arti})
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
                    <TableHead>Bentuk</TableHead>
                    <TableHead>Kosakata</TableHead>
                    <TableHead>Kanji</TableHead>
                    <TableHead>Furigana</TableHead>
                    <TableHead>Romaji</TableHead>
                    <TableHead>Arti</TableHead>
                    <TableHead>Audio</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedVocabularyForms.length > 0 ? (
                    paginatedVocabularyForms.map((form) => (
                        <TableRow key={form.id}>
                        <TableCell>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {form.bentuk}
                            </span>
                        </TableCell>
                        <TableCell>{getVocabularyName(form.id_kosakata)}</TableCell>
                        <TableCell className="font-medium">{form.kanji}</TableCell>
                        <TableCell>{form.furigana}</TableCell>
                        <TableCell>{form.romaji}</TableCell>
                        <TableCell>{form.arti}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => playAudio(form.audio)}
                            className="h-8 w-8 p-0"
                            disabled={!form.audio}
                            title={form.audio ? "Putar Audio" : "Audio tidak tersedia"}
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setDetailModal({ open: true, form })}
                                className="h-8 w-8 p-0"
                            >
                                <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditModal(form)}
                                className="h-8 w-8 p-0"
                            >
                                <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => setDeleteModal({ open: true, form })}
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
                        Tidak ada data bentuk kosakata ditemukan
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
                    Menampilkan {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredVocabularyForms.length)}{" "}
                    dari {filteredVocabularyForms.length} data
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
                setEditModal({ open: false, form: null })
                resetForm()
            }
            }}
        >
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>{addModal.open ? "Tambah Bentuk Kosakata" : "Edit Bentuk Kosakata"}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="bentuk">Bentuk</Label>
                <Input
                    id="bentuk"
                    value={formData.bentuk}
                    onChange={(e) => handleInputChange("bentuk", e.target.value)}
                    placeholder="masu form"
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="id_kosakata">Kosakata</Label>
                <Select
                  value={formData.id_kosakata}
                  onValueChange={(value) => handleInputChange("id_kosakata", value)}
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
                <Label htmlFor="kanji">Kanji</Label>
                <Input
                    id="kanji"
                    value={formData.kanji}
                    onChange={(e) => handleInputChange("kanji", e.target.value)}
                    placeholder="学校に行きます"
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="furigana">Furigana</Label>
                <Input
                    id="furigana"
                    value={formData.furigana}
                    onChange={(e) => handleInputChange("furigana", e.target.value)}
                    placeholder="がっこうにいきます"
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="romaji">Romaji</Label>
                <Input
                    id="romaji"
                    value={formData.romaji}
                    onChange={(e) => handleInputChange("romaji", e.target.value)}
                    placeholder="gakkou ni ikimasu"
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="arti">Arti</Label>
                <Input
                    id="arti"
                    value={formData.arti}
                    onChange={(e) => handleInputChange("arti", e.target.value)}
                    placeholder="pergi ke sekolah"
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
                <div className="space-y-2 md:col-span-2">
                <Label htmlFor="deskripsi">Deskripsi</Label>
                <Textarea
                    id="deskripsi"
                    value={formData.deskripsi}
                    onChange={(e) => handleInputChange("deskripsi", e.target.value)}
                    placeholder="Deskripsi bentuk kosakata..."
                />
                </div>
            </div>
            <DialogFooter>
                <Button
                variant="outline"
                onClick={() => {
                    setAddModal({ open: false })
                    setEditModal({ open: false, form: null })
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
        <Dialog open={detailModal.open} onOpenChange={(open) => setDetailModal({ open, form: null })}>
            <DialogContent className="max-w-2xl">
            <DialogHeader>
                <DialogTitle>Detail Bentuk Kosakata: {detailModal.form?.bentuk}</DialogTitle>
            </DialogHeader>
            {detailModal.form && (
                <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <Label className="font-semibold">Bentuk:</Label>
                    <p>{detailModal.form.bentuk}</p>
                    </div>
                    <div>
                    <Label className="font-semibold">Kosakata:</Label>
                    <p>{getVocabularyName(detailModal.form.id_kosakata)}</p>
                    </div>
                    <div>
                    <Label className="font-semibold">Kanji:</Label>
                    <p className="text-lg">{detailModal.form.kanji}</p>
                    </div>
                    <div>
                    <Label className="font-semibold">Furigana:</Label>
                    <p>{detailModal.form.furigana}</p>
                    </div>
                    <div>
                    <Label className="font-semibold">Romaji:</Label>
                    <p>{detailModal.form.romaji}</p>
                    </div>
                    <div>
                    <Label className="font-semibold">Arti:</Label>
                    <p>{detailModal.form.arti}</p>
                    </div>
                </div>
                <div>
                    <Label className="font-semibold">Deskripsi:</Label>
                    <p className="mt-1 text-gray-700">{detailModal.form.deskripsi}</p>
                </div>
                <div>
                    <Label className="font-semibold">Audio:</Label>
                    <div className="flex items-center gap-2 mt-1">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => playAudio(detailModal.form.audio)}
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
        <Dialog open={deleteModal.open} onOpenChange={(open) => setDeleteModal({ open, form: null })}>
            <DialogContent>
            <DialogHeader>
                <DialogTitle>Konfirmasi Hapus</DialogTitle>
                <DialogDescription>
                Apakah Anda yakin ingin menghapus bentuk kosakata "{deleteModal.form?.bentuk}" - "
                {deleteModal.form?.kanji}"? Tindakan ini tidak dapat dibatalkan.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteModal({ open: false, form: null })}>
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

export default BentukKosakataAdmin
