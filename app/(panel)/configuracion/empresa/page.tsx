"use client"

import { useState } from "react"
import { Building2, Upload, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ConfigEmpresaPage() {
    const [formData, setFormData] = useState({
        nombre: "Mi Tienda Textil",
        ruc: "20123456789",
        direccion: "Av. Principal 123, Lima, Perú",
        telefono: "01-234-5678",
        email: "contacto@mitienda.com"
    })

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    return (
        <div className="space-y-6 max-w-2xl">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">Configuración de Empresa</h1>
                <p className="text-gray-500 mt-1">Actualiza la información de tu negocio</p>
            </div>

            {/* Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                {/* Logo */}
                <div className="mb-6 pb-6 border-b border-gray-100">
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">Logo de la empresa</Label>
                    <div className="flex items-center gap-4">
                        <div className="w-24 h-24 rounded-xl bg-[#3266E4]/10 flex items-center justify-center">
                            <Building2 className="w-10 h-10 text-[#3266E4]" />
                        </div>
                        <Button variant="outline">
                            <Upload className="w-4 h-4 mr-2" />
                            Subir Logo
                        </Button>
                    </div>
                </div>

                <div className="space-y-5">
                    <div>
                        <Label htmlFor="nombre">Nombre de la empresa</Label>
                        <Input
                            id="nombre"
                            value={formData.nombre}
                            onChange={(e) => handleChange("nombre", e.target.value)}
                            className="mt-1.5"
                        />
                    </div>

                    <div>
                        <Label htmlFor="ruc">RUC</Label>
                        <Input
                            id="ruc"
                            value={formData.ruc}
                            onChange={(e) => handleChange("ruc", e.target.value)}
                            className="mt-1.5"
                        />
                    </div>

                    <div>
                        <Label htmlFor="direccion">Dirección</Label>
                        <Input
                            id="direccion"
                            value={formData.direccion}
                            onChange={(e) => handleChange("direccion", e.target.value)}
                            className="mt-1.5"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="telefono">Teléfono</Label>
                            <Input
                                id="telefono"
                                value={formData.telefono}
                                onChange={(e) => handleChange("telefono", e.target.value)}
                                className="mt-1.5"
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                className="mt-1.5"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                    <Button className="bg-[#3266E4] hover:bg-[#2855C7]">
                        <Save className="w-4 h-4 mr-2" />
                        Guardar Cambios
                    </Button>
                </div>
            </div>
        </div>
    )
}
