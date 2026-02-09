"use client"

import { useState } from "react"
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, Banknote, Smartphone, Building2, Receipt, Download, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// Demo products
const availableProducts = [
    { id: 1, nombre: "Polo Algodón Premium", precio: 49.90, imagen: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80" },
    { id: 2, nombre: "Pantalón Jean Slim", precio: 89.90, imagen: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&q=80" },
    { id: 3, nombre: "Camisa Formal", precio: 69.90, imagen: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&q=80" },
    { id: 4, nombre: "Vestido Casual", precio: 79.90, imagen: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&q=80" },
    { id: 5, nombre: "Blusa Elegante", precio: 59.90, imagen: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=300&q=80" },
    { id: 6, nombre: "Chaqueta Denim", precio: 129.90, imagen: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&q=80" },
]

const paymentMethods = [
    { id: "efectivo", nombre: "Efectivo", icon: Banknote },
    { id: "yape", nombre: "Yape", icon: Smartphone },
    { id: "plin", nombre: "Plin", icon: Smartphone },
    { id: "transferencia", nombre: "Transferencia", icon: Building2 },
    { id: "tarjeta", nombre: "Tarjeta", icon: CreditCard },
]

interface CartItem {
    id: number
    nombre: string
    precio: number
    cantidad: number
    imagen: string
}

export default function VentasPage() {
    const [cart, setCart] = useState<CartItem[]>([])
    const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [showSuccess, setShowSuccess] = useState(false)

    const addToCart = (product: typeof availableProducts[0]) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id)
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                )
            }
            return [...prev, { ...product, cantidad: 1 }]
        })
    }

    const updateQuantity = (id: number, delta: number) => {
        setCart(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, cantidad: Math.max(1, item.cantidad + delta) }
                    : item
            )
        )
    }

    const removeFromCart = (id: number) => {
        setCart(prev => prev.filter(item => item.id !== id))
    }

    const total = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0)
    const itemCount = cart.reduce((sum, item) => sum + item.cantidad, 0)

    const handleConfirmSale = () => {
        if (cart.length === 0 || !selectedPayment) return
        setShowSuccess(true)
        // Here would go the API call to register the sale
    }

    const handleNewSale = () => {
        setCart([])
        setSelectedPayment(null)
        setShowSuccess(false)
    }

    const filteredProducts = availableProducts.filter(p =>
        p.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (showSuccess) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center max-w-md mx-auto">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">¡Venta Exitosa!</h2>
                    <p className="text-gray-500 mb-6">La venta se ha registrado correctamente</p>

                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                        <p className="text-sm text-gray-500">Total de la venta</p>
                        <p className="text-3xl font-bold text-[#3266E4]">S/ {total.toFixed(2)}</p>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline" className="flex-1" onClick={() => { }}>
                            <Download className="w-4 h-4 mr-2" />
                            Descargar Factura
                        </Button>
                        <Button className="flex-1 bg-[#3266E4] hover:bg-[#2855C7]" onClick={handleNewSale}>
                            Nueva Venta
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">Nueva Venta</h1>
                <p className="text-gray-500 mt-1">Selecciona los productos para la venta</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Products */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Search */}
                    <Input
                        placeholder="Buscar productos..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    {/* Product Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {filteredProducts.map((product) => (
                            <button
                                key={product.id}
                                onClick={() => addToCart(product)}
                                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 text-left transition-all duration-200 hover:shadow-md hover:border-[#3266E4]/30 group"
                            >
                                <div className="aspect-square bg-gray-100">
                                    <img
                                        src={product.imagen}
                                        alt={product.nombre}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                    />
                                </div>
                                <div className="p-3">
                                    <h3 className="font-medium text-gray-900 text-sm truncate">{product.nombre}</h3>
                                    <p className="text-[#3266E4] font-bold mt-1">S/ {product.precio.toFixed(2)}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Cart */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 h-fit lg:sticky lg:top-6">
                    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                        <ShoppingCart className="w-5 h-5 text-[#3266E4]" />
                        <h2 className="font-semibold text-gray-900">Carrito</h2>
                        <span className="ml-auto bg-[#3266E4] text-white text-xs px-2 py-0.5 rounded-full">
                            {itemCount}
                        </span>
                    </div>

                    {cart.length === 0 ? (
                        <p className="text-gray-400 text-center py-8">Carrito vacío</p>
                    ) : (
                        <div className="space-y-3 mb-4 max-h-[300px] overflow-y-auto">
                            {cart.map((item) => (
                                <div key={item.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                                    <img
                                        src={item.imagen}
                                        alt={item.nombre}
                                        className="w-12 h-12 rounded-lg object-cover"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-gray-900 truncate">{item.nombre}</h4>
                                        <p className="text-sm text-[#3266E4] font-bold">S/ {item.precio.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                                        >
                                            <Minus className="w-3 h-3" />
                                        </button>
                                        <span className="w-8 text-center text-sm font-medium">{item.cantidad}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                                        >
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="w-7 h-7 rounded-full text-rose-500 hover:bg-rose-50 flex items-center justify-center"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Payment Methods */}
                    {cart.length > 0 && (
                        <>
                            <div className="border-t border-gray-100 pt-4 mb-4">
                                <p className="text-sm font-medium text-gray-700 mb-3">Método de pago</p>
                                <div className="grid grid-cols-3 gap-2">
                                    {paymentMethods.map((method) => (
                                        <button
                                            key={method.id}
                                            onClick={() => setSelectedPayment(method.id)}
                                            className={cn(
                                                "flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all",
                                                selectedPayment === method.id
                                                    ? "border-[#3266E4] bg-[#3266E4]/5"
                                                    : "border-gray-200 hover:border-gray-300"
                                            )}
                                        >
                                            <method.icon className={cn(
                                                "w-5 h-5",
                                                selectedPayment === method.id ? "text-[#3266E4]" : "text-gray-500"
                                            )} />
                                            <span className="text-xs font-medium text-gray-700">{method.nombre}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Total */}
                            <div className="border-t border-gray-100 pt-4">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-gray-600">Total</span>
                                    <span className="text-2xl font-bold text-gray-900">S/ {total.toFixed(2)}</span>
                                </div>

                                <Button
                                    className="w-full bg-[#3266E4] hover:bg-[#2855C7]"
                                    disabled={!selectedPayment}
                                    onClick={handleConfirmSale}
                                >
                                    <Receipt className="w-4 h-4 mr-2" />
                                    Confirmar Venta
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
