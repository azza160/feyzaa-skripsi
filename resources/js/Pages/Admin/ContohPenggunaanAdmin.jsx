"use client"

import { useState, useMemo, useRef } from "react"
import { usePage, router, Head } from "@inertiajs/react"
import { route } from "ziggy-js"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Trash2, Edit, Plus, Play, Pause, ChevronLeft, ChevronRight } from "lucide-react"
import AdminDashboardLayout from "../../Layouts/AdminDashboardLayout"

const ContohPenggunaanAdmin = () => {
  const { examples, availableLetters } = usePage().props

  const [searchTerm, setSearchTerm] = useState("")
  const [hurufFilter, setHurufFilter] = useState("0")
  const [currentPage, setCurrentPage] = useState(1)
  const [currentAudio, setCurrentAudio] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  // Modal states
  const [deleteModal, setDeleteModal] = useState({ open: false, example: null })
  const [editModal, setEditModal] = useState({ open: false, example: null })
  const [addModal, setAddModal] = useState({ open: false })

  // Form state
  const [formData, setFormData] = useState({
    kata: "",
    romaji: "",
    arti: "",
    huruf_id: "",
    audio: "",
  })

  const itemsPerPage = 5

  // Filter and search examples
  const filteredExamples = useMemo(() => {
    return examples.filter((example) => {
      const matchesSearch =
        example.kata.toLowerCase().includes(searchTerm.toLowerCase()) ||
        example.romaji.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesHuruf = hurufFilter === "0" || example.huruf_id.toString() === hurufFilter
      return matchesSearch && matchesHuruf
    })
  }, [examples, searchTerm, hurufFilter])

  // Pagination
  const totalPages = Math.ceil(filteredExamples.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedExamples = filteredExamples.slice(startIndex, startIndex + itemsPerPage)

  // Audio play logic (referensi dari HurufAdmin.jsx)
  const playAudio = (url, id) => {
    if (!url) return
    setCurrentAudio(id)
    setIsPlaying(true)
    const audio = new Audio(url)
    audioRef.current = audio
    audio.play()
      .catch((e) => console.error("Gagal memutar audio:", e))
    audio.onended = () => {
      setIsPlaying(false)
      setCurrentAudio(null)
    }
  }

  // Form handlers
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const resetForm = () => {
    setFormData({
      kata: "",
      romaji: "",
      arti: "",
      huruf_id: "",
      audio: "",
    })
  }

  // CRUD Handlers
  const handleAdd = () => {
    if (!formData.kata || !formData.romaji || !formData.arti || !formData.huruf_id) {
      alert("Semua field wajib diisi!")
      return
    }
    router.post(route('admin.contoh-penggunaan.store'), formData, {
      onSuccess: () => {
        setAddModal({ open: false })
        resetForm()
      }
    })
  }

  const openEditModal = (example) => {
    setFormData({
      kata: example.kata,
      romaji: example.romaji,
      arti: example.arti,
      huruf_id: example.huruf_id,
      audio: example.audio || "",
    })
    setEditModal({ open: true, example })
  }

  const handleEdit = () => {
    router.put(route('admin.contoh-penggunaan.update', editModal.example.id), formData, {
      onSuccess: () => {
        setEditModal({ open: false, example: null })
        resetForm()
      }
    })
  }

  const handleDelete = () => {
    router.delete(route('admin.contoh-penggunaan.destroy', deleteModal.example.id), {
      onSuccess: () => {
        setDeleteModal({ open: false, example: null })
      }
    })
  }

  // Helper
  const getHurufName = (hurufId) => {
    const huruf = availableLetters.find((h) => h.id === hurufId)
    return huruf ? `${huruf.huruf} (${huruf.romaji})` : `ID: ${hurufId}`
  }

  return (
    <AdminDashboardLayout currentPage="letter-examples">
      <Head title="Contoh Penggunaan Admin" />
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Manajemen Contoh Penggunaan</h1>
            <Button onClick={() => setAddModal({ open: true })} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Tambah Contoh
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Data Contoh Penggunaan</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Cari kata/romaji..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="pl-10"
                  />
                </div>
                <Select
                  value={hurufFilter}
                  onValueChange={(value) => {
                    setHurufFilter(value)
                    setCurrentPage(1)
                  }}
                >
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter Huruf" />
                  </SelectTrigger>
                  <SelectContent style={{ maxHeight: 300, overflowY: "auto" }}>
                    <SelectItem value="0">Semua Huruf</SelectItem>
                    {availableLetters.map((huruf) => (
                      <SelectItem key={huruf.id} value={huruf.id}>
                        {huruf.huruf} ({huruf.romaji})
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
                      <TableHead>Kata</TableHead>
                      <TableHead>Romaji</TableHead>
                      <TableHead>Arti</TableHead>
                      <TableHead>Huruf</TableHead>
                      <TableHead>Audio</TableHead>
                      <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedExamples.length > 0 ? (
                      paginatedExamples.map((example) => (
                        <TableRow key={example.id}>
                          <TableCell>{example.kata}</TableCell>
                          <TableCell>{example.romaji}</TableCell>
                          <TableCell>{example.arti}</TableCell>
                          <TableCell>{getHurufName(example.huruf_id)}</TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => playAudio(example.audio, example.id)}
                              className="h-8 w-8 p-0"
                            >
                              {currentAudio === example.id && isPlaying ? (
                                <Pause className="h-4 w-4" />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                            </Button>
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openEditModal(example)}
                              className="h-8 w-8 p-0"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => setDeleteModal({ open: true, example })}
                              className="h-8 w-8 p-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          Tidak ada data ditemukan
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
                    Menampilkan {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredExamples.length)} dari{" "}
                    {filteredExamples.length} data
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
                setEditModal({ open: false, example: null })
                resetForm()
              }
            }}
          >
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{addModal.open ? "Tambah Contoh Penggunaan" : "Edit Contoh Penggunaan"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="kata">Kata</Label>
                  <Input
                    id="kata"
                    value={formData.kata}
                    onChange={(e) => handleInputChange("kata", e.target.value)}
                    placeholder="Kata"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="romaji">Romaji</Label>
                  <Input
                    id="romaji"
                    value={formData.romaji}
                    onChange={(e) => handleInputChange("romaji", e.target.value)}
                    placeholder="Romaji"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="arti">Arti</Label>
                  <Input
                    id="arti"
                    value={formData.arti}
                    onChange={(e) => handleInputChange("arti", e.target.value)}
                    placeholder="Arti"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="huruf_id">Huruf</Label>
                  <Select
                    value={formData.huruf_id}
                    onValueChange={(value) => handleInputChange("huruf_id", value)}
                    disabled={editModal.open}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih huruf" />
                    </SelectTrigger>
                    <SelectContent style={{ maxHeight: 300, overflowY: "auto" }}>
                      {availableLetters.map((huruf) => (
                        <SelectItem key={huruf.id} value={huruf.id}>
                          {huruf.huruf} ({huruf.romaji})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setAddModal({ open: false })
                    setEditModal({ open: false, example: null })
                    resetForm()
                  }}
                >
                  Batal
                </Button>
                <Button onClick={addModal.open ? handleAdd : handleEdit}>
                  {addModal.open ? "Tambah" : "Simpan"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Delete Modal */}
          <Dialog open={deleteModal.open} onOpenChange={(open) => setDeleteModal({ open, example: null })}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Konfirmasi Hapus</DialogTitle>
                <DialogDescription>
                  Apakah Anda yakin ingin menghapus contoh penggunaan "{deleteModal.example?.kata}"?
                  Tindakan ini tidak dapat dibatalkan.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteModal({ open: false, example: null })}>
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

export default ContohPenggunaanAdmin
