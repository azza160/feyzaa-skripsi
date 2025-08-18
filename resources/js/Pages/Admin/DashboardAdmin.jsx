"use client"

import AdminDashboardLayout from "../../Layouts/AdminDashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Head, usePage } from "@inertiajs/react";
import { Users, FileText, BookOpen, HelpCircle } from "lucide-react"

const DashboardAdmin = () => {
  // Static data for dashboard statistics

  const {dashboardStats} = usePage().props

  return (
    <AdminDashboardLayout>
        <Head title="Dashboard Admin" />
        <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500">Overview statistik sistem</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {dashboardStats.map((stat, index) => {
            const Icon = stat.icon
            return (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                    <div className={`p-2 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <p className="text-xs text-gray-500 mt-1">Data terbaru</p>
                </CardContent>
                </Card>
            )
            })}
        </div>

       
        </div>
    </AdminDashboardLayout>
  )
}

export default DashboardAdmin
