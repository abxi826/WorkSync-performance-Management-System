
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Target,
  CheckSquare,
  BarChart3,
  Users,
  X
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth()
  const location = useLocation()

  // Detect selected employee ID from the current URL
  const employeeMatch = location.pathname.match(
    /^\/team\/member\/(\d+)(?:\/|$)/
  )

  const employeeId = employeeMatch ? employeeMatch[1] : null

  // Preserve employee ID while navigating
  const basePath = employeeId
    ? `/team/member/${employeeId}`
    : ''

  const navigation = [
    {
      name: 'Dashboard',
      href: employeeId ? basePath : '/',
      icon: LayoutDashboard,
      end: true
    },
    {
      name: 'Goals & KPIs',
      href: employeeId ? `${basePath}/goals` : '/goals',
      icon: Target
    },
    {
      name: 'Tasks',
      href: employeeId ? `${basePath}/tasks` : '/tasks',
      icon: CheckSquare
    },
    {
      name: 'Analytics',
      href: employeeId ? `${basePath}/analytics` : '/analytics',
      icon: BarChart3
    },
    ...(user?.isManager
      ? [{ name: 'Team Dashboard', href: '/team', icon: Users }]
      : [])
  ]

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 lg:hidden z-20"
          onClick={onClose}
        />
      )}

      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">WS</span>
            </div>
            <span className="ml-2 text-lg font-semibold text-gray-900">
              WorkSync
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                end={item.end}
                className={({ isActive }) =>
                  `group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    onClose()
                  }
                }}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </>
  )
}

export default Sidebar
