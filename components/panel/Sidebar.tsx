"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
    LayoutDashboard,
    ShoppingCart,
    Package,
    Users,
    UserCog,
    Building2,
    Settings,
    User,
    CreditCard,
    LogOut,
    Menu,
    X,
    ChevronDown,
    Store
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { getCurrentUser, logout, type DemoUser } from "@/lib/auth"

interface NavItem {
    label: string
    href: string
    icon: React.ReactNode
    children?: { label: string; href: string }[]
}

const navItems: NavItem[] = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
        label: "Ventas",
        href: "/ventas",
        icon: <ShoppingCart className="h-5 w-5" />
    },
    {
        label: "Productos",
        href: "/productos",
        icon: <Package className="h-5 w-5" />
    },
    {
        label: "Clientes",
        href: "/clientes",
        icon: <Users className="h-5 w-5" />
    },
    {
        label: "Usuarios",
        href: "/usuarios",
        icon: <UserCog className="h-5 w-5" />
    },
    {
        label: "Sucursales",
        href: "/sucursales",
        icon: <Building2 className="h-5 w-5" />
    },
    {
        label: "Config. Empresa",
        href: "/configuracion/empresa",
        icon: <Settings className="h-5 w-5" />
    },
    {
        label: "Mi Cuenta",
        href: "/configuracion/cuenta",
        icon: <User className="h-5 w-5" />
    },
    {
        label: "Métodos de Pago",
        href: "/metodos-pago",
        icon: <CreditCard className="h-5 w-5" />
    }
]

export function Sidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const [user, setUser] = useState<DemoUser | null>(null)

    // Cargar sesión del usuario demo
    useEffect(() => {
        const currentUser = getCurrentUser()
        setUser(currentUser)
    }, [])

    const handleLogout = () => {
        logout()
        router.push("/")
    }

    const isActive = (href: string) => {
        return pathname === href || pathname.startsWith(href + "/")
    }

    return (
        <>
            {/* Mobile menu button */}
            <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-[#3266E4] text-white shadow-lg"
            >
                {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Mobile overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed left-0 top-0 h-screen w-64 bg-[#3266E4] text-white flex flex-col z-40 transition-transform duration-300",
                    "lg:translate-x-0",
                    isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
                {/* Logo / Company Name */}
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                            <Store className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="font-semibold text-lg !text-white">Sistema POS</h1>
                            <p className="text-xs !text-white/70">Textil</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4 px-3">
                    <ul className="space-y-1">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={() => setIsMobileOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                                        "hover:bg-white/10",
                                        isActive(item.href)
                                            ? "bg-white/20 font-medium"
                                            : "text-white/80 hover:text-white"
                                    )}
                                >
                                    {item.icon}
                                    <span className="!text-inherit">{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* User section */}
                <div className="p-4 border-t border-white/10">
                    <div className="flex items-center gap-3 px-3 py-2">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                            <User className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate !text-white">{user?.name || "Usuario"}</p>
                            <p className="text-xs truncate !text-white/70">{user?.role || "Rol"}</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="w-full mt-2 justify-start gap-3 text-white/80 hover:text-white hover:bg-white/10"
                    >
                        <LogOut className="h-5 w-5" />
                        Cerrar Sesión
                    </Button>
                </div>
            </aside>
        </>
    )
}
