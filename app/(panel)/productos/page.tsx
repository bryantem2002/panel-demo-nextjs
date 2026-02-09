"use client"

import { useState } from "react"
import { Plus, Search, Edit2, Package, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// Demo data
const products = [
    {
        id: 1,
        nombre: "Polo Algodón Premium",
        precio: 49.90,
        stock: 25,
        colores: ["Negro", "Blanco", "Azul"],
        tallas: ["S", "M", "L", "XL"],
        imagen: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80",
        activo: true
    },
    {
        id: 2,
        nombre: "Pantalón Jean Slim",
        precio: 89.90,
        stock: 18,
        colores: ["Azul oscuro", "Negro"],
        tallas: ["28", "30", "32", "34"],
        imagen: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&q=80",
        activo: true
    },
    {
        id: 3,
        nombre: "Camisa Formal",
        precio: 69.90,
        stock: 12,
        colores: ["Blanco", "Celeste", "Rosa"],
        tallas: ["S", "M", "L"],
        imagen: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&q=80",
        activo: true
    },
    {
        id: 4,
        nombre: "Vestido Casual",
        precio: 79.90,
        stock: 8,
        colores: ["Rojo", "Negro", "Verde"],
        tallas: ["XS", "S", "M", "L"],
        imagen: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&q=80",
        activo: true
    },
    {
        id: 5,
        nombre: "Blusa Elegante",
        precio: 59.90,
        stock: 15,
        colores: ["Blanco", "Crema"],
        tallas: ["S", "M", "L"],
        imagen: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=300&q=80",
        activo: false
    },
    {
        id: 6,
        nombre: "Chaqueta Denim",
        precio: 129.90,
        stock: 6,
        colores: ["Azul", "Negro"],
        tallas: ["M", "L", "XL"],
        imagen: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&q=80",
        activo: true
    }
]

const colorMap: Record<string, string> = {
    "Negro": "#1a1a1a",
    "Blanco": "#ffffff",
    "Azul": "#3266E4",
    "Azul oscuro": "#1e3a5f",
    "Celeste": "#87CEEB",
    "Rosa": "#FFC0CB",
    "Rojo": "#DC2626",
    "Verde": "#16A34A",
    "Crema": "#FFFDD0"
}

export default function ProductosPage() {
    const [searchQuery, setSearchQuery] = useState("")

    const filteredProducts = products.filter(p =>
        p.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Productos</h1>
                    <p className="text-gray-500 mt-1">Gestiona tu catálogo de productos</p>
                </div>
                <Button className="bg-[#3266E4] hover:bg-[#2855C7]">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Producto
                </Button>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                    placeholder="Buscar productos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className={cn(
                            "bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md",
                            !product.activo && "opacity-60"
                        )}
                    >
                        {/* Image */}
                        <div className="relative aspect-square bg-gray-100">
                            <img
                                src={product.imagen}
                                alt={product.nombre}
                                className="w-full h-full object-cover"
                            />
                            {!product.activo && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <span className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm">
                                        Desactivado
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <h3 className="font-semibold text-gray-900 truncate">{product.nombre}</h3>
                            <p className="text-xl font-bold text-[#3266E4] mt-1">
                                S/ {product.precio.toFixed(2)}
                            </p>

                            {/* Stock */}
                            <div className="flex items-center gap-2 mt-3">
                                <Package className="w-4 h-4 text-gray-400" />
                                <span className={cn(
                                    "text-sm font-medium",
                                    product.stock < 10 ? "text-amber-600" : "text-gray-600"
                                )}>
                                    {product.stock} en stock
                                </span>
                            </div>

                            {/* Colors */}
                            <div className="flex items-center gap-1 mt-3">
                                <span className="text-xs text-gray-500 mr-1">Colores:</span>
                                <div className="flex gap-1">
                                    {product.colores.slice(0, 4).map((color) => (
                                        <div
                                            key={color}
                                            className="w-5 h-5 rounded-full border-2 border-gray-200"
                                            style={{ backgroundColor: colorMap[color] || "#ccc" }}
                                            title={color}
                                        />
                                    ))}
                                    {product.colores.length > 4 && (
                                        <span className="text-xs text-gray-400">+{product.colores.length - 4}</span>
                                    )}
                                </div>
                            </div>

                            {/* Sizes */}
                            <div className="flex flex-wrap gap-1 mt-3">
                                {product.tallas.map((talla) => (
                                    <span
                                        key={talla}
                                        className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                                    >
                                        {talla}
                                    </span>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                                <Button variant="outline" size="sm" className="flex-1">
                                    <Edit2 className="w-4 h-4 mr-1" />
                                    Editar
                                </Button>
                                <Button variant="outline" size="sm" className="flex-1">
                                    <Eye className="w-4 h-4 mr-1" />
                                    Ver
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No se encontraron productos</h3>
                    <p className="text-gray-500 mt-1">Intenta con otra búsqueda o agrega un nuevo producto</p>
                </div>
            )}
        </div>
    )
}
