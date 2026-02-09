"use client"

import { useState } from "react"
import { DollarSign, Package, TrendingUp, ShoppingBag } from "lucide-react"
import { MetricCard } from "@/components/panel/MetricCard"
import { SalesChart } from "@/components/panel/SalesChart"
import { TopProductsChart } from "@/components/panel/TopProductsChart"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type FilterType = "today" | "7days" | "30days" | "12months" | "custom" | null

const filters = [
    { id: "today", label: "Hoy" },
    { id: "7days", label: "Últimos 7 días" },
    { id: "30days", label: "Últimos 30 días" },
    { id: "12months", label: "Últimos 12 meses" },
] as const

// Demo data - will be replaced with real API data
const salesData = [
    { date: "Lun", ventas: 1200 },
    { date: "Mar", ventas: 1800 },
    { date: "Mié", ventas: 1400 },
    { date: "Jue", ventas: 2200 },
    { date: "Vie", ventas: 2800 },
    { date: "Sáb", ventas: 3500 },
    { date: "Dom", ventas: 2100 },
]

const topProducts = [
    { nombre: "Polo algodón", cantidad: 45 },
    { nombre: "Pantalón jean", cantidad: 38 },
    { nombre: "Camisa formal", cantidad: 32 },
    { nombre: "Vestido casual", cantidad: 28 },
    { nombre: "Blusa seda", cantidad: 24 },
]

export default function DashboardPage() {
    const [activeFilter, setActiveFilter] = useState<FilterType>("7days")

    const handleClearFilters = () => {
        setActiveFilter(null)
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                    <p className="text-gray-500 mt-1">Resumen de tu negocio</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                    <Button
                        key={filter.id}
                        variant={activeFilter === filter.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveFilter(filter.id)}
                        className={cn(
                            activeFilter === filter.id
                                ? "bg-[#3266E4] hover:bg-[#2855C7]"
                                : "hover:border-[#3266E4] hover:text-[#3266E4]"
                        )}
                    >
                        {filter.label}
                    </Button>
                ))}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearFilters}
                    className="text-gray-500 hover:text-gray-700"
                >
                    Limpiar filtros
                </Button>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                    title="Ventas Totales"
                    value="S/ 15,050.00"
                    icon={DollarSign}
                    trend={{ value: 12.5, isPositive: true }}
                />
                <MetricCard
                    title="Productos Vendidos"
                    value="167"
                    icon={Package}
                    trend={{ value: 8.2, isPositive: true }}
                />
                <MetricCard
                    title="Ganancias"
                    value="S/ 4,250.00"
                    icon={TrendingUp}
                    trend={{ value: 5.1, isPositive: true }}
                />
                <MetricCard
                    title="Pedidos"
                    value="43"
                    icon={ShoppingBag}
                    trend={{ value: -2.3, isPositive: false }}
                />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SalesChart data={salesData} />
                <TopProductsChart data={topProducts} />
            </div>
        </div>
    )
}
