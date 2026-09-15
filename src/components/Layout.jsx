import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-main text-tea-900">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(107,151,103,0.16),transparent_45%),radial-gradient(circle_at_80%_5%,rgba(222,196,153,0.22),transparent_35%)]" />
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 pt-8 md:px-6 md:pt-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
