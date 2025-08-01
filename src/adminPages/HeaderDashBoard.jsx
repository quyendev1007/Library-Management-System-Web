"use client"

import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router"
import {
  X,
  Home,
  Users,
  Book,
  Building2,
  Tag,
  UserCheck,
  History,
  Bell,
  Search,
  Settings,
  LogOut,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { logoutAPI } from "../apis/auth"
import { toast } from "react-toastify"

const AdminSidebar = ({ isCollapsed, setIsCollapsed, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const location = useLocation()

  const menuItems = [
    { id: "dashboard", name: "Go To Home", icon: Home, href: "/" },
    { id: "books", name: "Quản lý sách", icon: Book, href: "/admin/books" },
    { id: "authors", name: "Quản lý tác giả", icon: UserCheck, href: "/admin/authors" },
    { id: "publishers", name: "Quản lý NXB", icon: Building2, href: "/admin/publishers" },
    { id: "categories", name: "Quản lý danh mục", icon: Tag, href: "/admin/categories" },
    { id: "users", name: "Quản lý người dùng", icon: Users, href: "/admin/users" },
    { id: "history", name: "Lịch sử mượn", icon: History, href: "/admin/history" },
  ]

  const notifications = [
    { id: 1, message: "Có 5 sách mới được thêm vào hệ thống", time: "2 phút trước", unread: true },
    { id: 2, message: "Người dùng Nguyễn Văn A đã trả sách", time: "10 phút trước", unread: true },
    { id: 3, message: "Sách 'Clean Code' sắp hết hạn mượn", time: "1 giờ trước", unread: false },
    { id: 4, message: "Tác giả mới được thêm vào hệ thống", time: "2 giờ trước", unread: false },
  ]

  const unreadCount = notifications.filter((n) => n.unread).length

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const isActiveRoute = (href) => {
    return location.pathname === href
  }

  const navigate = useNavigate()
  const handleLogout = () => {
    logoutAPI()
    navigate("/login")
    toast.success("Đăng xuất thành công")
  }

// Layout component chính
return (
  <div className="flex h-screen overflow-hidden">
    {/* Desktop Sidebar - Fixed */}
    <div
      className={`hidden lg:flex flex-col bg-white shadow-lg border-r border-gray-200 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
      style={{ position: 'fixed', height: '100vh', zIndex: 40 }}
    >
      {/* Logo và Brand */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Book className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">Library Admin</h1>
          </Link>
        )}
        {isCollapsed && (
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center mx-auto">
            <Book className="h-5 w-5 text-white" />
          </div>
        )}
        <button onClick={toggleSidebar} className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded">
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Search */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = isActiveRoute(item.href)
          return (
            <Link
              key={item.id}
              to={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              } ${isCollapsed ? "justify-center" : ""}`}
              title={isCollapsed ? item.name : ""}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className={`flex items-center space-x-3 w-full px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md ${
              isCollapsed ? "justify-center" : ""
            }`}
            title={isCollapsed ? "Thông báo" : ""}
          >
            <div className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            {!isCollapsed && <span className="text-sm font-medium">Thông báo</span>}
          </button>

          {/* Notification Dropdown */}
          {isNotificationOpen && (
            <div
              className={`absolute ${isCollapsed ? "left-16" : "left-0"} bottom-0 w-80 bg-white rounded-md shadow-lg border border-gray-200 z-50`}
            >
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Thông báo</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                      notification.unread ? "bg-blue-50" : ""
                    }`}
                  >
                    <p className="text-sm text-gray-800">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 text-center">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Xem tất cả thông báo
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className={`flex items-center space-x-3 w-full px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md ${
              isCollapsed ? "justify-center" : ""
            }`}
            title={isCollapsed ? "Admin" : ""}
          >
            <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">AD</span>
            </div>
            {!isCollapsed && (
              <>
                <span className="text-sm font-medium">Admin</span>
                <ChevronDown className="h-4 w-4 ml-auto" />
              </>
            )}
          </button>

          {/* Profile Dropdown Menu */}
          {isProfileDropdownOpen && (
            <div
              className={`absolute ${isCollapsed ? "left-16" : "left-0"} bottom-0 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50`}
            >
              <div className="py-1">
                <Link
                  to="/settings"
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsProfileDropdownOpen(false)}
                >
                  <Settings className="h-4 w-4 mr-3" />
                  Cài đặt
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Đăng xuất
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Main Content Area */}
    <div 
      className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
        isCollapsed ? "lg:ml-16" : "lg:ml-64"
      }`}
    >
      {/* Content chính */}
      <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
        {/* Nội dung trang của bạn ở đây */}
        <div className="max-w-7xl mx-auto">
          {/* Page content */}
        </div>
      </main>
    </div>

    {/* Overlay for dropdowns */}
    {(isProfileDropdownOpen || isNotificationOpen) && (
      <div
        className="fixed inset-0 z-30"
        onClick={() => {
          setIsProfileDropdownOpen(false)
          setIsNotificationOpen(false)
        }}
      />
    )}
  </div>
)
}

export default AdminSidebar
