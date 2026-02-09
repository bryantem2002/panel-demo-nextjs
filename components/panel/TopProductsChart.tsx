"use client"

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts"

interface TopProductsChartProps {
    data: {
        nombre: string
        cantidad: number
    }[]
}

const colors = ["#3266E4", "#5B8DEF", "#84AEF5", "#ADC9F9", "#D6E4FC"]

export function TopProductsChart({ data }: TopProductsChartProps) {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top 5 Productos Más Vendidos</h3>

            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={true} vertical={false} />
                        <XAxis
                            type="number"
                            tick={{ fontSize: 12, fill: "#6B7280" }}
                            axisLine={{ stroke: "#E5E7EB" }}
                        />
                        <YAxis
                            type="category"
                            dataKey="nombre"
                            tick={{ fontSize: 12, fill: "#6B7280" }}
                            axisLine={{ stroke: "#E5E7EB" }}
                            width={100}
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-lg">
                                            <p className="text-sm font-medium text-gray-900">
                                                {payload[0].value} unidades
                                            </p>
                                        </div>
                                    )
                                }
                                return null
                            }}
                        />
                        <Bar dataKey="cantidad" radius={[0, 4, 4, 0]}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
