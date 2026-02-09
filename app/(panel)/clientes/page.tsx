"use client"

import { useState } from "react"
import { Plus, Search, Edit2, Eye, Mail, Phone, ShoppingBag, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Demo data
const clients = [
    { id: 1, nombre: "María García López", email: "maria.garcia@email.com", telefono: "987654321", totalCompras: 12, ultimaCompra: "2026-02-08" },
    { id: 2, nombre: "Juan Carlos Pérez", email: "jcarlos.perez@email.com", telefono: "912345678", totalCompras: 8, ultimaCompra: "2026-02-05" },
    { id: 3, nombre: "Ana María Rodríguez", email: "ana.rodriguez@email.com", telefono: "998877665", totalCompras: 25, ultimaCompra: "2026-02-09" },
    { id: 4, nombre: "Roberto Mendoza", email: "roberto.m@email.com", telefono: "911223344", totalCompras: 3, ultimaCompra: "2026-01-28" },
    { id: 5, nombre: "Carmen Flores", email: "carmen.flores@email.com", telefono: "944556677", totalCompras: 15, ultimaCompra: "2026-02-01" },
]

export default function ClientesPage() {
    const [searchQuery, setSearchQuery] = useState("")

    const filteredClients = clients.filter(c =>
        c.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Clientes</h1>
                    <p className="text-gray-500 mt-1">Gestiona la información de tus clientes</p>
                </div>
                <Button className="bg-[#3266E4] hover:bg-[#2855C7]">
                    <Plus className="w-4 h-4 mr-2" />
                    Nuevo Cliente
                </Button>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                    placeholder="Buscar clientes..."
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
                                    Cliente
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Contacto
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Compras
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Última Compra
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredClients.map((client) => (
                                <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-[#3266E4]/10 flex items-center justify-center">
                                                <span className="text-[#3266E4] font-semibold">
                                                    {client.nombre.split(" ").map(n => n[0]).slice(0, 2).join("")}
                                                </span>
                                            </div>
                                            <span className="font-medium text-gray-900">{client.nombre}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Mail className="w-4 h-4 text-gray-400" />
                                                {client.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Phone className="w-4 h-4 text-gray-400" />
                                                {client.telefono}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <ShoppingBag className="w-4 h-4 text-gray-400" />
                                            <span className="font-medium text-gray-900">{client.totalCompras}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-gray-600">
                                            {new Date(client.ultimaCompra).toLocaleDateString("es-PE")}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="sm">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                <Edit2 className="w-4 h-4" />
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
