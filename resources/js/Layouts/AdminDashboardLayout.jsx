"use client"

import { useState } from "react"
import { router } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Home, Users, FileText, ImageIcon, BookOpen, HelpCircle, Menu, X } from "lucide-react"

const AdminDashboardLayout = ({ children, currentPage = "dashboard" }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: "/admin/dashboard" },
    { id: "users", label: "Pengguna", icon: Users, href: "/admin/users" },
    { id: "letters", label: "Huruf", icon: FileText, href: "/admin/letters" },
    { id: "letter-examples", label: "Contoh Penggunaan", icon: FileText, href: "/admin/letter-examples" },
    { id: "letter-images", label: "Gambar Huruf", icon: ImageIcon, href: "/admin/letter-images" },
    { id: "vocabulary", label: "Kosakata", icon: BookOpen, href: "/admin/vocabulary" },
    { id: "vocabulary-forms", label: "Bentuk Kosakata", icon: BookOpen, href: "/admin/vocabulary-forms" },
    { id: "example-sentences", label: "Contoh Kalimat", icon: FileText, href: "/admin/example-sentences" },
    { id: "letter-quiz", label: "Kuis Huruf", icon: HelpCircle, href: "/admin/letter-quiz" },
    { id: "vocabulary-quiz", label: "Kuis Kosakata", icon: HelpCircle, href: "/admin/vocabulary-quiz" },
  ]

  const handleLogout = () => {
    router.post(route('logout'));
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`
        fixed top-16 left-0 z-30 h-[calc(100vh-4rem)] w-64 transform bg-white border-r border-gray-200 transition-transform duration-200 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      >
        <nav className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id

              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className={`
                      flex items-center p-2 text-sm rounded-lg transition-colors
                      ${isActive ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-100"}
                    `}
                  >
                    <Icon className={`w-5 h-5 mr-3 ${isActive ? "text-blue-700" : "text-gray-500"}`} />
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="pt-16 lg:pl-64">
        <div className="p-6">{children}</div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 lg:ml-64 mt-8">
        <div className="px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
            <p>&copy; 2024 Admin Dashboard. All rights reserved.</p>
            <p>Version 1.0.0</p>
          </div>
        </div>
      </footer>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}

export default AdminDashboardLayout
