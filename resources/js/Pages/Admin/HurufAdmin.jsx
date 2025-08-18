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
import { usePage, router, Head } from "@inertiajs/react"
import { route } from 'ziggy-js'


const HurufAdmin = () => {
  // Static letter data
  const { letters } = usePage().props

  const [searchTerm, setSearchTerm] = useState("")
  const [jenisFilter, setJenisFilter] = useState("all")
  const [kategoriFilter, setKategoriFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [currentAudio, setCurrentAudio] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  // Modal states
  const [deleteModal, setDeleteModal] = useState({ open: false, letter: null })
  const [editModal, setEditModal] = useState({ open: false, letter: null })
  const [detailModal, setDetailModal] = useState({ open: false, letter: null })
  const [addModal, setAddModal] = useState({ open: false })

  // Form state for add/edit
  const [formData, setFormData] = useState({
    huruf: "",
    jenis_huruf: "",
    kategori_huruf: "",
    deskripsi: "",
    romaji: "",
    urutan: "",
    jumlah_coretan: "",
    kategori: "",
    groups: "",
    catatan: "",
    audio: "",
    // HAPUS: contoh_penggunaans, gambar_huruf
  })

  const itemsPerPage = 10

  // Available options for filters
  const jenisOptions = ["all", "hiragana", "katakana"]
  const kategoriOptions = ["all", "gojuon", "dakuten", "handakuten", "youon", "sokuon", "choon"]

  // Filter kategori based on jenis
  const getAvailableKategori = () => {
    if (!jenisFilter) return kategoriOptions
    // You can customize this logic based on your requirements
    return kategoriOptions
  }

  // Filter and search letters
  const filteredLetters = useMemo(() => {
    return letters.filter((letter) => {
      const matchesSearch = letter.romaji.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesJenis = jenisFilter === "all" || letter.jenis_huruf === jenisFilter
      const matchesKategori = kategoriFilter === "all" || letter.kategori_huruf === kategoriFilter
      return matchesSearch && matchesJenis && matchesKategori
    })
  }, [letters, searchTerm, jenisFilter, kategoriFilter])

  // Pagination
  const totalPages = Math.ceil(filteredLetters.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedLetters = filteredLetters.slice(startIndex, startIndex + itemsPerPage)

 
  
    const playAudio = (url) => {
        if (!url) return;
        const audio = new Audio(url);
        audio.play().catch((e) => console.error("Gagal memutar audio:", e));
    };

    const handleClick = (audio) => {
        if (audio) {
            playAudio(audio);
        } 
    }
  // Form handlers
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const resetForm = () => {
    setFormData({
      huruf: "",
      jenis_huruf: "",
      kategori_huruf: "",
      deskripsi: "",
      romaji: "",
      urutan: "",
      jumlah_coretan: "",
      kategori: "",
      groups: "",
      catatan: "",
      audio: "",
    })
  }

  const prepareFormData = () => ({
    ...formData,
    urutan: formData.urutan === "" ? null : Number(formData.urutan),
    jumlah_coretan: formData.jumlah_coretan === "" ? null : Number(formData.jumlah_coretan),
  })

  const handleAdd = () => {
    router.post(route('admin.huruf.store'), prepareFormData(), {
      onSuccess: () => {
        setAddModal({ open: false })
        resetForm()
      }
    })
  }

  const handleEdit = () => {
    router.put(route('admin.huruf.update', editModal.letter.id), formData, {
      onSuccess: () => {
        setEditModal({ open: false, letter: null })
        resetForm()
      }
    })
  }

  const handleDelete = () => {
    router.delete(route('admin.huruf.destroy', deleteModal.letter.id), {
      onSuccess: () => {
        setDeleteModal({ open: false, letter: null })
      }
    })
  }

  const openEditModal = (letter) => {
    setFormData({
      huruf: letter.huruf,
      jenis_huruf: letter.jenis_huruf,
      kategori_huruf: letter.kategori_huruf,
      deskripsi: letter.deskripsi,
      romaji: letter.romaji,
      urutan: letter.urutan.toString(),
      jumlah_coretan: letter.jumlah_coretan.toString(),
      kategori: letter.kategori,
      groups: letter.groups,
      catatan: letter.catatan,
      audio: letter.audio,
      // HAPUS: contoh_penggunaans: letter.contoh_penggunaans.toString(),
      // HAPUS: gambar_huruf: letter.gambar_huruf.toString(),
    })
    setEditModal({ open: true, letter })
  }

  return (
    <AdminDashboardLayout >
        <Head title="kelola huruf"/>
        <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Manajemen Huruf</h1>
            <Button onClick={() => setAddModal({ open: true })} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Tambah Huruf
            </Button>
        </div>

        <Card>
            <CardHeader>
            <CardTitle>Data Huruf</CardTitle>
            </CardHeader>
            <CardContent>
            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                    placeholder="Cari berdasarkan romaji..."
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
                    setKategoriFilter("") // Reset kategori when jenis changes
                    setCurrentPage(1)
                }}
                >
                <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Jenis Huruf" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua</SelectItem>
                  <SelectItem value="hiragana">hiragana</SelectItem>
                  <SelectItem value="katakana">katakana</SelectItem>
                </SelectContent>
                </Select>
                <Select
                value={kategoriFilter}
                onValueChange={(value) => {
                    setKategoriFilter(value)
                    setCurrentPage(1)
                }}
                >
                <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Kategori Huruf" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua</SelectItem>
                  <SelectItem value="gojuon">gojuon</SelectItem>
                  <SelectItem value="dakuten">dakuten</SelectItem>
                  <SelectItem value="handakuten">handakuten</SelectItem>
                  <SelectItem value="youon">youon</SelectItem>
                  <SelectItem value="sokuon">sokuon</SelectItem>
                  <SelectItem value="choon">choon</SelectItem>
                </SelectContent>
                </Select>
            </div>

            {/* Table */}
            <div className="rounded-md border">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Huruf</TableHead>
                    <TableHead>Jenis</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Romaji</TableHead>
                    <TableHead>Urutan</TableHead>
                    <TableHead>Coretan</TableHead>
                    <TableHead>Audio</TableHead>
                    <TableHead>Contoh</TableHead>
                    <TableHead>Gambar</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedLetters.length > 0 ? (
                    paginatedLetters.map((letter) => (
                        <TableRow key={letter.id}>
                        <TableCell className="font-medium text-2xl">{letter.huruf}</TableCell>
                        <TableCell>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {letter.jenis_huruf}
                            </span>
                        </TableCell>
                        <TableCell>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {letter.kategori_huruf}
                            </span>
                        </TableCell>
                        <TableCell className="font-medium">{letter.romaji}</TableCell>
                        <TableCell>{letter.urutan}</TableCell>
                        <TableCell>{letter.jumlah_coretan}</TableCell>
                        <TableCell>
                            <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleClick(letter.audio)}
                            className="h-8 w-8 p-0"
                            >
                            {currentAudio === letter.id && isPlaying ? (
                                <Pause className="h-4 w-4" />
                            ) : (
                                <Play className="h-4 w-4" />
                            )}
                            </Button>
                        </TableCell>
                        <TableCell>{letter.contoh_penggunaans}</TableCell>
                        <TableCell>{letter.gambar_huruf}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setDetailModal({ open: true, letter })}
                                className="h-8 w-8 p-0"
                            >
                                <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditModal(letter)}
                                className="h-8 w-8 p-0"
                            >
                                <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => setDeleteModal({ open: true, letter })}
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
                        <TableCell colSpan={10} className="text-center py-8 text-gray-500">
                        Tidak ada data huruf ditemukan
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
                    Menampilkan {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredLetters.length)} dari{" "}
                    {filteredLetters.length} data
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
                setEditModal({ open: false, letter: null })
                resetForm()
            }
            }}
        >
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>{addModal.open ? "Tambah Huruf Baru" : "Edit Huruf"}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="huruf">Huruf</Label>
                <Input
                    id="huruf"
                    value={formData.huruf}
                    onChange={(e) => handleInputChange("huruf", e.target.value)}
                    placeholder="あ"
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="romaji">Romaji</Label>
                <Input
                    id="romaji"
                    value={formData.romaji}
                    onChange={(e) => handleInputChange("romaji", e.target.value)}
                    placeholder="a"
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="jenis_huruf">Jenis Huruf</Label>
                <Select value={formData.jenis_huruf} onValueChange={(value) => handleInputChange("jenis_huruf", value)}>
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
                <Label htmlFor="kategori_huruf">Kategori Huruf</Label>
                <Select
                    value={formData.kategori_huruf}
                    onValueChange={(value) => handleInputChange("kategori_huruf", value)}
                >
                    <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                    {kategoriOptions.map((kategori) => (
                        <SelectItem key={kategori} value={kategori}>
                        {kategori}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
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
                <Label htmlFor="jumlah_coretan">Jumlah Coretan</Label>
                <Input
                    id="jumlah_coretan"
                    type="number"
                    value={formData.jumlah_coretan}
                    onChange={(e) => handleInputChange("jumlah_coretan", e.target.value)}
                    placeholder="3"
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="kategori">Kategori</Label>
                <Input
                    id="kategori"
                    value={formData.kategori}
                    onChange={(e) => handleInputChange("kategori", e.target.value)}
                    placeholder="vokal"
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="groups">Groups</Label>
                <Input
                    id="groups"
                    value={formData.groups}
                    onChange={(e) => handleInputChange("groups", e.target.value)}
                    placeholder="a-gyou"
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
                    placeholder="Deskripsi huruf..."
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
                    setEditModal({ open: false, letter: null })
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
        <Dialog open={detailModal.open} onOpenChange={(open) => setDetailModal({ open, letter: null })}>
            <DialogContent className="max-w-2xl">
            <DialogHeader>
                <DialogTitle>Detail Huruf: {detailModal.letter?.huruf}</DialogTitle>
            </DialogHeader>
            {detailModal.letter && (
                <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <Label className="font-semibold">Huruf:</Label>
                    <p className="text-3xl">{detailModal.letter.huruf}</p>
                    </div>
                    <div>
                    <Label className="font-semibold">Romaji:</Label>
                    <p>{detailModal.letter.romaji}</p>
                    </div>
                    <div>
                    <Label className="font-semibold">Jenis Huruf:</Label>
                    <p>{detailModal.letter.jenis_huruf}</p>
                    </div>
                    <div>
                    <Label className="font-semibold">Kategori Huruf:</Label>
                    <p>{detailModal.letter.kategori_huruf}</p>
                    </div>
                    <div>
                    <Label className="font-semibold">Urutan:</Label>
                    <p>{detailModal.letter.urutan}</p>
                    </div>
                    <div>
                    <Label className="font-semibold">Jumlah Coretan:</Label>
                    <p>{detailModal.letter.jumlah_coretan}</p>
                    </div>
                    <div>
                    <Label className="font-semibold">Kategori:</Label>
                    <p>{detailModal.letter.kategori}</p>
                    </div>
                    <div>
                    <Label className="font-semibold">Groups:</Label>
                    <p>{detailModal.letter.groups}</p>
                    </div>
                    <div>
                    <Label className="font-semibold">Contoh Penggunaan:</Label>
                    <p>{detailModal.letter.contoh_penggunaans}</p>
                    </div>
                    <div>
                    <Label className="font-semibold">Gambar Huruf:</Label>
                    <p>{detailModal.letter.gambar_huruf}</p>
                    </div>
                </div>
                <div>
                    <Label className="font-semibold">Deskripsi:</Label>
                    <p className="mt-1 text-gray-700">{detailModal.letter.deskripsi}</p>
                </div>
                <div>
                    <Label className="font-semibold">Catatan:</Label>
                    <p className="mt-1 text-gray-700">{detailModal.letter.catatan}</p>
                </div>
                <div>
                    <Label className="font-semibold">Audio:</Label>
                    <div className="flex items-center gap-2 mt-1">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => playAudio(detailModal.letter.audio, detailModal.letter.id)}
                    >
                        {currentAudio === detailModal.letter.id && isPlaying ? (
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
        <Dialog open={deleteModal.open} onOpenChange={(open) => setDeleteModal({ open, letter: null })}>
            <DialogContent>
            <DialogHeader>
                <DialogTitle>Konfirmasi Hapus</DialogTitle>
                <DialogDescription>
                Apakah Anda yakin ingin menghapus huruf "{deleteModal.letter?.huruf}" ({deleteModal.letter?.romaji})?
                Tindakan ini tidak dapat dibatalkan.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteModal({ open: false, letter: null })}>
                Batal
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                Hapus
                </Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>

        {/* Hidden audio element for future implementation */}
        <audio ref={audioRef} />
        </div>
    </AdminDashboardLayout>
  )
}

export default HurufAdmin
