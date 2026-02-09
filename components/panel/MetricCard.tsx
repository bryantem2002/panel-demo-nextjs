import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface MetricCardProps {
    title: string
    value: string
    icon: LucideIcon
    trend?: {
        value: number
        isPositive: boolean
    }
    className?: string
}

export function MetricCard({ title, value, icon: Icon, trend, className }: MetricCardProps) {
    return (
        <div className={cn(
            "bg-white rounded-xl p-6 shadow-sm border border-gray-100",
            className
        )}>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm text-gray-500 font-medium">{title}</p>
                    <h3 className="text-2xl font-semibold mt-2 text-gray-900">{value}</h3>

                    {trend && (
                        <div className="flex items-center gap-1 mt-2">
                            <span className={cn(
                                "text-sm font-medium",
                                trend.isPositive ? "text-emerald-600" : "text-rose-600"
                            )}>
                                {trend.isPositive ? "+" : ""}{trend.value}%
                            </span>
                            <span className="text-xs text-gray-400">vs período anterior</span>
                        </div>
                    )}
                </div>

                <div className="w-12 h-12 rounded-lg bg-[#3266E4]/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#3266E4]" />
                </div>
            </div>
        </div>
    )
}
