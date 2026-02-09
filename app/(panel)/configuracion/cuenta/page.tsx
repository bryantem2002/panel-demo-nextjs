"use client"

import { useState } from "react"
import { User, Lock, Save, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ConfigCuentaPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        nombre: "Carlos Mendoza",
        email: "carlos.m@empresa.com",
        telefono: "987654321",
    })
    const [passwords, setPasswords] = useState({
        current: "",
        new: "",
        confirm: ""
    })

    return (
        <div className="space-y-6 max-w-2xl">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">Mi Cuenta</h1>
                <p className="text-gray-500 mt-1">Actualiza tu información personal</p>
            </div>

            {/* Profile Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                    <div className="w-16 h-16 rounded-full bg-[#3266E4]/10 flex items-center justify-center">
                        <User className="w-8 h-8 text-[#3266E4]" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-900">{formData.nombre}</h2>
                        <p className="text-sm text-gray-500">{formData.email}</p>
                    </div>
                </div>

                <div className="space-y-5">
                    <div>
                        <Label htmlFor="nombre">Nombre completo</Label>
                        <Input
                            id="nombre"
                            value={formData.nombre}
                            onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                            className="mt-1.5"
                        />
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            className="mt-1.5"
                        />
                    </div>

                    <div>
                        <Label htmlFor="telefono">Teléfono</Label>
                        <Input
                            id="telefono"
                            value={formData.telefono}
                            onChange={(e) => setFormData(prev => ({ ...prev, telefono: e.target.value }))}
                            className="mt-1.5"
                        />
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                    <Button className="bg-[#3266E4] hover:bg-[#2855C7]">
                        <Save className="w-4 h-4 mr-2" />
                        Guardar Cambios
                    </Button>
                </div>
            </div>

            {/* Change Password */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                        <Lock className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-900">Cambiar Contraseña</h2>
                        <p className="text-sm text-gray-500">Actualiza tu contraseña de acceso</p>
                    </div>
                </div>

                <div className="space-y-5">
                    <div>
                        <Label htmlFor="current-password">Contraseña actual</Label>
                        <div className="relative mt-1.5">
                            <Input
                                id="current-password"
                                type={showPassword ? "text" : "password"}
                                value={passwords.current}
                                onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="new-password">Nueva contraseña</Label>
                        <Input
                            id="new-password"
                            type="password"
                            value={passwords.new}
                            onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                            className="mt-1.5"
                        />
                    </div>

                    <div>
                        <Label htmlFor="confirm-password">Confirmar nueva contraseña</Label>
                        <Input
                            id="confirm-password"
                            type="password"
                            value={passwords.confirm}
                            onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                            className="mt-1.5"
                        />
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                    <Button variant="outline">
                        <Lock className="w-4 h-4 mr-2" />
                        Actualizar Contraseña
                    </Button>
                </div>
            </div>
        </div>
    )
}
