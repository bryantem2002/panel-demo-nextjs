"use client"

import { useState } from "react"
import { Banknote, CreditCard, Smartphone, Building2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PaymentMethod {
    id: string
    nombre: string
    descripcion: string
    icon: React.ElementType
    activo: boolean
}

const initialMethods: PaymentMethod[] = [
    { id: "efectivo", nombre: "Efectivo", descripcion: "Pago en efectivo en tienda", icon: Banknote, activo: true },
    { id: "yape", nombre: "Yape", descripcion: "Billetera digital BCP", icon: Smartphone, activo: true },
    { id: "plin", nombre: "Plin", descripcion: "Billetera digital BBVA, Interbank, Scotiabank", icon: Smartphone, activo: true },
    { id: "transferencia", nombre: "Transferencia", descripcion: "Transferencia bancaria", icon: Building2, activo: false },
    { id: "tarjeta", nombre: "Tarjeta", descripcion: "Tarjeta de débito o crédito", icon: CreditCard, activo: true },
]

export default function MetodosPagoPage() {
    const [methods, setMethods] = useState<PaymentMethod[]>(initialMethods)

    const toggleMethod = (id: string) => {
        setMethods(prev =>
            prev.map(m =>
                m.id === id ? { ...m, activo: !m.activo } : m
            )
        )
    }

    return (
        <div className="space-y-6 max-w-2xl">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">Métodos de Pago</h1>
                <p className="text-gray-500 mt-1">Configura los métodos de pago disponibles para tus ventas</p>
            </div>

            {/* Methods List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
                {methods.map((method) => (
                    <div
                        key={method.id}
                        className="p-4 flex items-center gap-4"
                    >
                        <div className={cn(
                            "w-12 h-12 rounded-lg flex items-center justify-center transition-colors",
                            method.activo ? "bg-[#3266E4]/10" : "bg-gray-100"
                        )}>
                            <method.icon className={cn(
                                "w-6 h-6 transition-colors",
                                method.activo ? "text-[#3266E4]" : "text-gray-400"
                            )} />
                        </div>

                        <div className="flex-1">
                            <h3 className={cn(
                                "font-medium transition-colors",
                                method.activo ? "text-gray-900" : "text-gray-400"
                            )}>
                                {method.nombre}
                            </h3>
                            <p className={cn(
                                "text-sm transition-colors",
                                method.activo ? "text-gray-500" : "text-gray-400"
                            )}>
                                {method.descripcion}
                            </p>
                        </div>

                        {/* Toggle Switch */}
                        <button
                            onClick={() => toggleMethod(method.id)}
                            className={cn(
                                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#3266E4] focus:ring-offset-2",
                                method.activo ? "bg-[#3266E4]" : "bg-gray-200"
                            )}
                        >
                            <span
                                className={cn(
                                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                                    method.activo ? "translate-x-5" : "translate-x-0"
                                )}
                            />
                        </button>
                    </div>
                ))}
            </div>

            {/* Info */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <p className="text-sm text-blue-700">
                    Los métodos de pago activos estarán disponibles al momento de registrar una venta.
                </p>
            </div>

            {/* Save */}
            <Button className="bg-[#3266E4] hover:bg-[#2855C7]">
                <Save className="w-4 h-4 mr-2" />
                Guardar Configuración
            </Button>
        </div>
    )
}
