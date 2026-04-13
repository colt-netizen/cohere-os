import Sidebar from "./components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-base">
      <Sidebar />
      {/* Desktop: offset for sidebar. Mobile: offset for top bar + bottom nav */}
      <main className="md:ml-[220px] pt-14 pb-20 md:pt-0 md:pb-0 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto px-4 py-6 md:px-8 md:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
