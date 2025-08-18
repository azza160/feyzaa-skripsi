"use client"

import { useState, useMemo } from "react"
import { Head, usePage } from "@inertiajs/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import AdminDashboardLayout from "../../Layouts/AdminDashboardLayout"
import { route } from "ziggy-js"
import { router } from '@inertiajs/react'

const PenggunaAdmin = () => {
  // Ambil data users langsung dari props Inertia (TANPA useState)
  const { users } = usePage().props

  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteModal, setDeleteModal] = useState({ open: false, user: null })
  const itemsPerPage = 3

  // Filter and sort users
  const filteredAndSortedUsers = useMemo(() => {
    const filtered = users.filter((user) => user.nama_pengguna.toLowerCase().includes(searchTerm.toLowerCase()))

    filtered.sort((a, b) => {
      const dateA = new Date(a.created_at)
      const dateB = new Date(b.created_at)
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB
    })

    return filtered
  }, [users, searchTerm, sortOrder])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = filteredAndSortedUsers.slice(startIndex, startIndex + itemsPerPage)

  const handleDelete = (user) => {
    setDeleteModal({ open: true, user })
  }

  const confirmDelete = () => {
    if (!deleteModal.user) return
    router.delete(
      route('admin.pengguna.destroy', deleteModal.user.id),
      {
        onSuccess: () => {
          setDeleteModal({ open: false, user: null })
          // Tidak perlu router.reload, data akan otomatis update dari server
        }
      }
    )
  }
 

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <AdminDashboardLayout currentPage="users">
      <Head title="Manajemen Pengguna" />
        <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Manajemen Pengguna</h1>
        </div>

        <Card>
            <CardHeader>
            <CardTitle>Data Pengguna</CardTitle>
            </CardHeader>
            <CardContent>
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                    placeholder="Cari berdasarkan nama pengguna..."
                    value={searchTerm}
                    onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1) // Reset to first page when searching
                    }}
                    className="pl-10"
                />
                </div>
                <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Urutkan" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="newest">Terbaru</SelectItem>
                    <SelectItem value="oldest">Terlama</SelectItem>
                </SelectContent>
                </Select>
            </div>

            {/* Table */}
            <div className="rounded-md border">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Nama Pengguna</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Password</TableHead>
                    <TableHead>Google ID</TableHead>
                    <TableHead>EXP</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedUsers.length > 0 ? (
                    paginatedUsers.map((user) => (
                        <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.nama_pengguna}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.password}</TableCell>
                        <TableCell>{user.google_id || "-"}</TableCell>
                        <TableCell>{user.exp}</TableCell>
                        <TableCell>
                          <span
                            className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {user.level}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                            <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(user)}
                            className="h-8 w-8 p-0"
                            >
                            <Trash2 className="h-4 w-4" />
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))
                    ) : (
                    <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                        Tidak ada data pengguna ditemukan
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
                    Menampilkan {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredAndSortedUsers.length)} dari{" "}
                    {filteredAndSortedUsers.length} data
                </p>
                <div className="flex items-center space-x-2">
                    <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
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
                        onClick={() => handlePageChange(page)}
                        className="w-8 h-8 p-0"
                    >
                        {page}
                    </Button>
                    ))}
                    <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
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

        {/* Delete Confirmation Modal */}
        <Dialog open={deleteModal.open} onOpenChange={(open) => setDeleteModal({ open, user: null })}>
            <DialogContent>
            <DialogHeader>
                <DialogTitle>Konfirmasi Hapus</DialogTitle>
                <DialogDescription>
                Apakah Anda yakin ingin menghapus pengguna "{deleteModal.user?.nama_pengguna}"? Tindakan ini tidak dapat
                dibatalkan.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteModal({ open: false, user: null })}>
                Batal
                </Button>
                <Button variant="destructive" onClick={confirmDelete}>
                Hapus
                </Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
        </div>
    </AdminDashboardLayout>
  )
}

export default PenggunaAdmin
