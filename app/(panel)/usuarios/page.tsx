"use client"

import { useState } from "react"
import { Plus, Search, Edit2, UserCheck, UserX, Shield, Mail, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// Demo data
const users = [
    { id: 1, nombre: "Carlos Mendoza", email: "carlos.m@empresa.com", rol: "Vendedor", sucursal: "Tienda Central", activo: true },
    { id: 2, nombre: "Laura Sánchez", email: "laura.s@empresa.com", rol: "Vendedor", sucursal: "Tienda Norte", activo: true },
    { id: 3, nombre: "Miguel Torres", email: "miguel.t@empresa.com", rol: "Administrador", sucursal: "Tienda Central", activo: true },
    { id: 4, nombre: "Patricia Ruiz", email: "patricia.r@empresa.com", rol: "Vendedor", sucursal: "Tienda Sur", activo: false },
    { id: 5, nombre: "Fernando López", email: "fernando.l@empresa.com", rol: "Vendedor", sucursal: "Tienda Central", activo: true },
]

const roleColors: Record<string, string> = {
    "Administrador": "bg-purple-100 text-purple-700",
    "Vendedor": "bg-blue-100 text-blue-700",
}

export default function UsuariosPage() {
    const [searchQuery, setSearchQuery] = useState("")

    const filteredUsers = users.filter(u =>
        u.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Usuarios</h1>
                    <p className="text-gray-500 mt-1">Gestiona los vendedores y administradores</p>
                </div>
                <Button className="bg-[#3266E4] hover:bg-[#2855C7]">
                    <Plus className="w-4 h-4 mr-2" />
                    Nuevo Usuario
                </Button>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                    placeholder="Buscar usuarios..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Usuario
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Rol
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Sucursal
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Estado
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-[#3266E4]/10 flex items-center justify-center">
                                                <span className="text-[#3266E4] font-semibold">
                                                    {user.nombre.split(" ").map(n => n[0]).slice(0, 2).join("")}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{user.nombre}</p>
                                                <p className="text-sm text-gray-500 flex items-center gap-1">
                                                    <Mail className="w-3 h-3" />
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium",
                                            roleColors[user.rol] || "bg-gray-100 text-gray-700"
                                        )}>
                                            <Shield className="w-3 h-3" />
                                            {user.rol}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Building2 className="w-4 h-4 text-gray-400" />
                                            {user.sucursal}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium",
                                            user.activo
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-gray-100 text-gray-500"
                                        )}>
                                            {user.activo ? (
                                                <>
                                                    <UserCheck className="w-3 h-3" />
                                                    Activo
                                                </>
                                            ) : (
                                                <>
                                                    <UserX className="w-3 h-3" />
                                                    Inactivo
                                                </>
                                            )}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="sm">
                                                <Edit2 className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                {user.activo ? (
                                                    <UserX className="w-4 h-4 text-rose-500" />
                                                ) : (
                                                    <UserCheck className="w-4 h-4 text-emerald-500" />
                                                )}
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
