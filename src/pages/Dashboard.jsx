import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import Sidebar from "../components/core/Dashboard/Sidebar"
import { useState } from "react"
import { AiOutlineMenu } from "react-icons/ai"

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-screen w-full">
      {/* Hamburger Menu (only for small screens) */}
      <button
        className="fixed top-19.8 left-4 z-50 block text-white md:hidden"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
      >
        <AiOutlineMenu size={24} />
      </button>

      {/* Sidebar for mobile (overlay mode) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="w-[220px] bg-richblack-800 h-screen shadow-lg">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          </div>
          <div
            className="flex-1 bg-black/50 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        </div>
      )}

      {/* Sidebar for desktop */}
      <div className="hidden md:block w-[220px] h-screen bg-richblack-800">
        <Sidebar isOpen={true}/>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto bg-richblack-900 h-screen">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
