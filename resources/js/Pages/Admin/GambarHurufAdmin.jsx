"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Trash2, Edit, Eye, Plus, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import AdminDashboardLayout from "../../Layouts/AdminDashboardLayout"
import { Head, usePage } from "@inertiajs/react"
import { router } from "@inertiajs/react"
import { route } from "ziggy-js"

const GambarHurufAdmin = () => {
  // Ambil data dari props Inertia, dengan default value array kosong
  const { images = [], availableLetters = [] } = usePage().props

  const [searchTerm, setSearchTerm] = useState("")
  const [hurufFilter, setHurufFilter] = useState("0") // Updated default value to "0"
  const [currentPage, setCurrentPage] = useState(1)

  // Modal states
  const [deleteModal, setDeleteModal] = useState({ open: false, image: null })
  const [editModal, setEditModal] = useState({ open: false, image: null })
  const [detailModal, setDetailModal] = useState({ open: false, image: null })
  const [addModal, setAddModal] = useState({ open: false })

  // Form state
  const [formData, setFormData] = useState({
    link: "",
    urutan: "",
    huruf_id: "",
  })

  const itemsPerPage = 5

  // Filter and search images
  const filteredImages = useMemo(() => {
    return images.filter((image) => {
      const huruf = availableLetters.find((h) => h.id.toString() === image.huruf_id.toString())
      const matchesSearch = huruf
        ? huruf.huruf.toLowerCase().includes(searchTerm.toLowerCase()) ||
          huruf.romaji.toLowerCase().includes(searchTerm.toLowerCase()) ||
          image.link.toLowerCase().includes(searchTerm.toLowerCase())
        : image.link.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesHuruf = hurufFilter === "0" || image.huruf_id.toString() === hurufFilter
      return matchesSearch && matchesHuruf
    })
  }, [images, searchTerm, hurufFilter, availableLetters])

  // Pagination
  const totalPages = Math.ceil(filteredImages.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedImages = filteredImages.slice(startIndex, startIndex + itemsPerPage)

  // Form handlers
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const resetForm = () => {
    setFormData({
      link: "",
      urutan: "",
      huruf_id: "",
    })
  }

  const handleAdd = () => {
    if (!formData.link || !formData.urutan || !formData.huruf_id) {
      alert("Semua field wajib diisi!")
      return
    }
    router.post(route('admin.gambar-huruf.store'), {
      ...formData,
      urutan: Number(formData.urutan),
    }, {
      onSuccess: () => {
        setAddModal({ open: false })
        resetForm()
      }
    })
  }

  const handleEdit = () => {
    router.put(route('admin.gambar-huruf.update', editModal.image.id), {
      link: formData.link,
      urutan: Number(formData.urutan),
      // huruf_id tidak dikirim agar tidak diubah
    }, {
      onSuccess: () => {
        setEditModal({ open: false, image: null })
        resetForm()
      }
    })
  }

  const handleDelete = () => {
    router.delete(route('admin.gambar-huruf.destroy', deleteModal.image.id), {
      onSuccess: () => {
        setDeleteModal({ open: false, image: null })
      }
    })
  }

  const openEditModal = (image) => {
    setFormData({
      link: image.link,
      urutan: image.urutan.toString(),
      huruf_id: image.huruf_id.toString(),
    })
    setEditModal({ open: true, image })
  }

  const getHurufName = (hurufId) => {
    const huruf = availableLetters.find((h) => h.id.toString() === hurufId.toString())
    return huruf ? `${huruf.huruf} (${huruf.romaji})` : `ID: ${hurufId}`
  }

  return (
    <AdminDashboardLayout currentPage="letter-images">
        <Head title="Gambar Huruf Admin" />
        <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Gambar Huruf</h1>
            <Button onClick={() => setAddModal({ open: true })} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Tambah Gambar
            </Button>
        </div>

        <Card>
            <CardHeader>
            <CardTitle>Data Gambar Huruf</CardTitle>
            </CardHeader>
            <CardContent>
            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                    placeholder="Cari berdasarkan huruf atau link..."
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
                <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Filter Huruf" />
                </SelectTrigger>
                <SelectContent
                  portal
                  style={{
                    maxHeight: 300,
                    overflowY: "auto",
                    background: "white"
                  }}
                >
                  <SelectItem value="0">Semua Huruf</SelectItem>
                  {availableLetters.map((huruf) => (
                    <SelectItem key={huruf.id} value={huruf.id.toString()}>
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
                    <TableHead>Preview</TableHead>
                    <TableHead>Link</TableHead>
                    <TableHead>Urutan</TableHead>
                    <TableHead>Huruf</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedImages.length > 0 ? (
                    paginatedImages.map((image) => (
                        <TableRow key={image.id}>
                        <TableCell>
                            <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                            <img
                                src={image.link}
                                alt="Preview"
                                className="w-12 h-12 object-cover rounded"
                            />
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                            <span className="truncate max-w-xs" title={image.link}>
                                {image.link}
                            </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => window.open(image.link, "_blank")}
                                className="h-6 w-6 p-0"
                            >
                                <ExternalLink className="h-3 w-3" />
                            </Button>
                            </div>
                        </TableCell>
                        <TableCell>{image.urutan}</TableCell>
                        <TableCell>{getHurufName(image.huruf_id)}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setDetailModal({ open: true, image })}
                                className="h-8 w-8 p-0"
                            >
                                <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditModal(image)}
                                className="h-8 w-8 p-0"
                            >
                                <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => setDeleteModal({ open: true, image })}
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
                        Tidak ada data gambar huruf ditemukan
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
                    Menampilkan {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredImages.length)} dari{" "}
                    {filteredImages.length} data
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
                setEditModal({ open: false, image: null })
                resetForm()
            }
            }}
        >
            <DialogContent className="max-w-md">
            <DialogHeader>
                <DialogTitle>{addModal.open ? "Tambah Gambar Huruf" : "Edit Gambar Huruf"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
                <div className="space-y-2">
                <Label htmlFor="link">Link Gambar</Label>
                <Input
                    id="link"
                    value={formData.link}
                    onChange={(e) => handleInputChange("link", e.target.value)}
                    placeholder="https://example.com/image.jpg"
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="urutan">Urutan</Label>
                <Input
                    id="urutan"
                    type="number"
                    value={formData.urutan}
                    onChange={(e) => handleInputChange("urutan", e.target.value)}
                    placeholder="1"
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="huruf_id">Huruf</Label>
                <Select
                  value={formData.huruf_id}
                  onValueChange={(value) => handleInputChange("huruf_id", value)}
                  disabled={editModal.open} // hanya bisa diubah saat tambah
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih huruf" />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      maxHeight: 300,
                      overflowY: "auto",
                      pointerEvents: "auto",
                      background: "white"
                    }}
                  >
                    {availableLetters.map((huruf) => (
                      <SelectItem key={huruf.id} value={huruf.id.toString()}>
                        {huruf.huruf} ({huruf.romaji})
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
                    setEditModal({ open: false, image: null })
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
        <Dialog open={detailModal.open} onOpenChange={(open) => setDetailModal({ open, image: null })}>
            <DialogContent className="max-w-md">
            <DialogHeader>
                <DialogTitle>Detail Gambar Huruf</DialogTitle>
            </DialogHeader>
            {detailModal.image && (
                <div className="space-y-4">
                <div className="flex justify-center">
                    <div className="w-32 h-32 bg-gray-100 rounded-md flex items-center justify-center">
                    <img
                        src="/placeholder.svg?height=128&width=128"
                        alt="Preview"
                        className="w-24 h-24 object-cover rounded"
                    />
                    </div>
                </div>
                <div>
                    <Label className="font-semibold">Link:</Label>
                    <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm break-all">{detailModal.image.link}</p>
                    <Button variant="outline" size="sm" onClick={() => window.open(detailModal.image.link, "_blank")}>
                        <ExternalLink className="h-4 w-4" />
                    </Button>
                    </div>
                </div>
                <div>
                    <Label className="font-semibold">Urutan:</Label>
                    <p>{detailModal.image.urutan}</p>
                </div>
                <div>
                    <Label className="font-semibold">Huruf:</Label>
                    <p>{getHurufName(detailModal.image.huruf_id)}</p>
                </div>
                </div>
            )}
            </DialogContent>
        </Dialog>

        {/* Delete Modal */}
        <Dialog open={deleteModal.open} onOpenChange={(open) => setDeleteModal({ open, image: null })}>
            <DialogContent>
            <DialogHeader>
                <DialogTitle>Konfirmasi Hapus</DialogTitle>
                <DialogDescription>
                Apakah Anda yakin ingin menghapus gambar huruf ini? Tindakan ini tidak dapat dibatalkan.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteModal({ open: false, image: null })}>
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

export default GambarHurufAdmin
