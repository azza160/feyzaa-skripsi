"use client"

import { useState, useMemo, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Trash2, Edit, Eye, Plus, Play, Pause, ChevronLeft, ChevronRight } from "lucide-react"
import AdminDashboardLayout from "../../Layouts/AdminDashboardLayout"
import { Head, usePage } from "@inertiajs/react"
import { router } from "@inertiajs/react"
import { route } from "ziggy-js"

const KosakatAdmin = () => {
  const { vocabularies = [] } = usePage().props

  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [currentAudio, setCurrentAudio] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  // Modal states
  const [deleteModal, setDeleteModal] = useState({ open: false, vocabulary: null })
  const [editModal, setEditModal] = useState({ open: false, vocabulary: null })
  const [detailModal, setDetailModal] = useState({ open: false, vocabulary: null })
  const [addModal, setAddModal] = useState({ open: false })

  // Form state
  const [formData, setFormData] = useState({
    kanji: "",
    furigana: "",
    romaji: "",
    arti: "",
    deskripsi: "",
    catatan: "",
    audio: "",
  })

  const itemsPerPage = 5

  // Filter and search vocabularies
  const filteredVocabularies = useMemo(() => {
    return vocabularies.filter((vocab) => {
      return (
        vocab.kanji.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vocab.furigana.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vocab.romaji.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vocab.arti.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
  }, [vocabularies, searchTerm])

  // Pagination
  const totalPages = Math.ceil(filteredVocabularies.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedVocabularies = filteredVocabularies.slice(startIndex, startIndex + itemsPerPage)

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
      kanji: "",
      furigana: "",
      romaji: "",
      arti: "",
      deskripsi: "",
      catatan: "",
      audio: "",
    })
  }

  const handleAdd = () => {
    if (!formData.kanji || !formData.furigana || !formData.romaji || !formData.arti) {
      alert("Field wajib tidak boleh kosong!");
      return;
    }
    router.post(route('admin.kosakata.store'), formData, {
      onSuccess: () => {
        setAddModal({ open: false });
        resetForm();
      }
    });
  }

  const handleEdit = () => {
    if (!formData.kanji || !formData.furigana || !formData.romaji || !formData.arti) {
      alert("Field wajib tidak boleh kosong!");
      return;
    }
    router.put(route('admin.kosakata.update', editModal.vocabulary.id), formData, {
      onSuccess: () => {
        setEditModal({ open: false, vocabulary: null });
        resetForm();
      }
    });
  }

  const handleDelete = () => {
    router.delete(route('admin.kosakata.destroy', deleteModal.vocabulary.id), {
      onSuccess: () => {
        setDeleteModal({ open: false, vocabulary: null });
      }
    });
  }

  const openEditModal = (vocabulary) => {
    setFormData({
      kanji: vocabulary.kanji,
      furigana: vocabulary.furigana,
      romaji: vocabulary.romaji,
      arti: vocabulary.arti,
      deskripsi: vocabulary.deskripsi,
      catatan: vocabulary.catatan,
      audio: vocabulary.audio,
    })
    setEditModal({ open: true, vocabulary })
  }

  return (
    <AdminDashboardLayout currentPage="vocabulary">
        <Head title="Manajemen Kosakata" />
        <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Manajemen Kosakata</h1>
            <Button onClick={() => setAddModal({ open: true })} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Tambah Kosakata
            </Button>
        </div>

        <Card>
            <CardHeader>
            <CardTitle>Data Kosakata</CardTitle>
            </CardHeader>
            <CardContent>
            {/* Search */}
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
                    <TableHead>Audio</TableHead>
                    <TableHead>Contoh</TableHead>
                    <TableHead>Bentuk</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedVocabularies.length > 0 ? (
                    paginatedVocabularies.map((vocab) => (
                        <TableRow key={vocab.id}>
                        <TableCell className="font-medium text-lg">{vocab.kanji}</TableCell>
                        <TableCell>{vocab.furigana}</TableCell>
                        <TableCell>{vocab.romaji}</TableCell>
                        <TableCell>{vocab.arti}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => playAudio(vocab.audio)}
                            className="h-8 w-8 p-0"
                            disabled={!vocab.audio}
                            title={vocab.audio ? "Putar Audio" : "Audio tidak tersedia"}
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        </TableCell>
                        <TableCell>{vocab.total_contoh_kalimat}</TableCell>
                        <TableCell>{vocab.total_bentuk_kosakata}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setDetailModal({ open: true, vocabulary: vocab })}
                                className="h-8 w-8 p-0"
                            >
                                <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditModal(vocab)}
                                className="h-8 w-8 p-0"
                            >
                                <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => setDeleteModal({ open: true, vocabulary: vocab })}
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
                        Tidak ada data kosakata ditemukan
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
                    Menampilkan {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredVocabularies.length)} dari{" "}
                    {filteredVocabularies.length} data
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
                setEditModal({ open: false, vocabulary: null })
                resetForm()
            }
            }}
        >
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>{addModal.open ? "Tambah Kosakata Baru" : "Edit Kosakata"}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="kanji">Kanji</Label>
                <Input
                    id="kanji"
                    value={formData.kanji}
                    onChange={(e) => handleInputChange("kanji", e.target.value)}
                    placeholder="学校"
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="furigana">Furigana</Label>
                <Input
                    id="furigana"
                    value={formData.furigana}
                    onChange={(e) => handleInputChange("furigana", e.target.value)}
                    placeholder="がっこう"
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="romaji">Romaji</Label>
                <Input
                    id="romaji"
                    value={formData.romaji}
                    onChange={(e) => handleInputChange("romaji", e.target.value)}
                    placeholder="gakkou"
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="arti">Arti</Label>
                <Input
                    id="arti"
                    value={formData.arti}
                    onChange={(e) => handleInputChange("arti", e.target.value)}
                    placeholder="sekolah"
                />
                </div>
                <div className="space-y-2">
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
                    placeholder="Deskripsi kosakata..."
                />
                </div>
                <div className="space-y-2 md:col-span-2">
                <Label htmlFor="catatan">Catatan</Label>
                <Textarea
                    id="catatan"
                    value={formData.catatan}
                    onChange={(e) => handleInputChange("catatan", e.target.value)}
                    placeholder="Catatan tambahan..."
                />
                </div>
            </div>
            <DialogFooter>
                <Button
                variant="outline"
                onClick={() => {
                    setAddModal({ open: false })
                    setEditModal({ open: false, vocabulary: null })
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
        <Dialog open={detailModal.open} onOpenChange={(open) => setDetailModal({ open, vocabulary: null })}>
            <DialogContent className="max-w-2xl">
            <DialogHeader>
                <DialogTitle>Detail Kosakata: {detailModal.vocabulary?.kanji}</DialogTitle>
            </DialogHeader>
            {detailModal.vocabulary && (
                <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <Label className="font-semibold">Kanji:</Label>
                    <p className="text-2xl">{detailModal.vocabulary.kanji}</p>
                    </div>
                    <div>
                    <Label className="font-semibold">Furigana:</Label>
                    <p className="text-lg">{detailModal.vocabulary.furigana}</p>
                    </div>
                    <div>
                    <Label className="font-semibold">Romaji:</Label>
                    <p>{detailModal.vocabulary.romaji}</p>
                    </div>
                    <div>
                    <Label className="font-semibold">Arti:</Label>
                    <p>{detailModal.vocabulary.arti}</p>
                    </div>
                    <div>
                    <Label className="font-semibold">Total Contoh Kalimat:</Label>
                    <p>{detailModal.vocabulary.total_contoh_kalimat}</p>
                    </div>
                    <div>
                    <Label className="font-semibold">Total Bentuk Kosakata:</Label>
                    <p>{detailModal.vocabulary.total_bentuk_kosakata}</p>
                    </div>
                </div>
                <div>
                    <Label className="font-semibold">Deskripsi:</Label>
                    <p className="mt-1 text-gray-700">{detailModal.vocabulary.deskripsi}</p>
                </div>
                <div>
                    <Label className="font-semibold">Catatan:</Label>
                    <p className="mt-1 text-gray-700">{detailModal.vocabulary.catatan}</p>
                </div>
                <div>
                    <Label className="font-semibold">Audio:</Label>
                    <div className="flex items-center gap-2 mt-1">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => playAudio(detailModal.vocabulary.audio, detailModal.vocabulary.id)}
                    >
                        {currentAudio === detailModal.vocabulary.id && isPlaying ? (
                        <Pause className="h-4 w-4 mr-2" />
                        ) : (
                        <Play className="h-4 w-4 mr-2" />
                        )}
                        Play Audio
                    </Button>
                    </div>
                </div>
                </div>
            )}
            </DialogContent>
        </Dialog>

        {/* Delete Modal */}
        <Dialog open={deleteModal.open} onOpenChange={(open) => setDeleteModal({ open, vocabulary: null })}>
            <DialogContent>
            <DialogHeader>
                <DialogTitle>Konfirmasi Hapus</DialogTitle>
                <DialogDescription>
                Apakah Anda yakin ingin menghapus kosakata "{deleteModal.vocabulary?.kanji}" (
                {deleteModal.vocabulary?.arti})? Tindakan ini tidak dapat dibatalkan.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteModal({ open: false, vocabulary: null })}>
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

export default KosakatAdmin
