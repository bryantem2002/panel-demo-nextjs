import { Sidebar } from "@/components/panel/Sidebar"

export default function PanelLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-[#F5F6FA]">
            <Sidebar />

            {/* Main content */}
            <main className="lg:pl-64 min-h-screen">
                <div className="p-6 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
