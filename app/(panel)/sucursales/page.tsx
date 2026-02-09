"use client"

import { useState } from "react"
import { Plus, Search, Edit2, MapPin, Users, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Demo data
const branches = [
    { id: 1, nombre: "Tienda Central", direccion: "Av. Principal 123, Lima", telefono: "01-234-5678", empleados: 5 },
    { id: 2, nombre: "Tienda Norte", direccion: "Jr. Los Olivos 456, Lima", telefono: "01-345-6789", empleados: 3 },
    { id: 3, nombre: "Tienda Sur", direccion: "Av. El Sol 789, Lima", telefono: "01-456-7890", empleados: 4 },
]

export default function SucursalesPage() {
    const [searchQuery, setSearchQuery] = useState("")

    const filteredBranches = branches.filter(b =>
        b.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.direccion.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Sucursales</h1>
                    <p className="text-gray-500 mt-1">Administra las ubicaciones de tu negocio</p>
                </div>
                <Button className="bg-[#3266E4] hover:bg-[#2855C7]">
                    <Plus className="w-4 h-4 mr-2" />
                    Nueva Sucursal
                </Button>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                    placeholder="Buscar sucursales..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBranches.map((branch) => (
                    <div
                        key={branch.id}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 rounded-lg bg-[#3266E4]/10 flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-[#3266E4]" />
                            </div>
                            <Button variant="ghost" size="sm">
                                <Edit2 className="w-4 h-4" />
                            </Button>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{branch.nombre}</h3>

                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                                <span>{branch.direccion}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-gray-400" />
                                <span>{branch.telefono}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-gray-400" />
                                <span>{branch.empleados} empleados</span>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <Button variant="outline" size="sm" className="w-full">
                                <Users className="w-4 h-4 mr-2" />
                                Gestionar Empleados
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
