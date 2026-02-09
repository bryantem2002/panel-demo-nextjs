"use client"

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts"

interface SalesChartProps {
    data: {
        date: string
        ventas: number
    }[]
}

export function SalesChart({ data }: SalesChartProps) {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ventas por Fecha</h3>

            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 12, fill: "#6B7280" }}
                            axisLine={{ stroke: "#E5E7EB" }}
                        />
                        <YAxis
                            tick={{ fontSize: 12, fill: "#6B7280" }}
                            axisLine={{ stroke: "#E5E7EB" }}
                            tickFormatter={(value) => `S/${value}`}
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-lg">
                                            <p className="text-sm font-medium text-gray-900">
                                                S/ {(payload[0].value as number).toFixed(2)}
                                            </p>
                                        </div>
                                    )
                                }
                                return null
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="ventas"
                            stroke="#3266E4"
                            strokeWidth={3}
                            dot={{ fill: "#3266E4", strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, fill: "#3266E4" }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
