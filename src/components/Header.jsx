
import React, { useState } from 'react'
import { Menu, Bell, User, Settings } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'
import { useData } from '../context/DataContext'

const Header = ({ onMenuClick }) => {
  const { user, switchRole } = useAuth()
  const { teamMembers } = useData()

  const navigate = useNavigate()
  const location = useLocation()

  // Detect which employee profile is currently open
  const profileMatch = location.pathname.match(/^\/team\/member\/(\d+)$/)

  const selectedMember = profileMatch
    ? teamMembers.find(member => member.id === Number(profileMatch[1]))
    : null

  // Display selected employee or logged-in user
  const displayUser = selectedMember || user

  const displayName = displayUser.name
  const displayRole = displayUser.role

  const displayAvatar = displayUser.avatar ||
    displayName
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()

  // Settings states
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [taskReminders, setTaskReminders] = useState(true)

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="ml-4 lg:ml-0">
            <h1 className="text-2xl font-bold text-gray-1000">
              WorkSync
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">

          {/* Role Switch */}
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">
              View as:
            </label>

            <select
              className="text-sm border border-gray-300 rounded px-2 py-1"
              value={user.isManager ? 'manager' : 'employee'}
              onChange={(e) =>
                switchRole(e.target.value === 'manager')
              }
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          {/* Notifications */}
          <button
            className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full"
            title="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>

          {/* Settings */}
          <div className="relative">

            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
              title="Settings"
            >
              <Settings className="h-5 w-5" />
            </button>

            {settingsOpen && (
              <div className="absolute right-0 top-12 w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-50 p-4">

                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    Settings
                  </h3>

                  <button
                    onClick={() => setSettingsOpen(false)}
                    className="text-gray-400 hover:text-gray-700 text-xl"
                  >
                    ×
                  </button>
                </div>

                {/* Account Information */}
                <div className="border-b border-gray-100 pb-3 mb-3">
                  <p className="text-sm font-medium text-gray-800">
                    Account Information
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {displayName}
                  </p>

                  <p className="text-xs text-gray-400">
                    {displayRole}
                  </p>
                </div>

                {/* Email Notifications */}
                <div className="space-y-4">

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Email Notifications
                      </p>
                      <p className="text-xs text-gray-500">
                        Receive email updates
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      checked={emailNotifications}
                      onChange={(e) =>
                        setEmailNotifications(e.target.checked)
                      }
                      className="h-4 w-4 accent-blue-600"
                    />
                  </div>

                  {/* Task Reminders */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Task Reminders
                      </p>
                      <p className="text-xs text-gray-500">
                        Get task reminder preferences
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      checked={taskReminders}
                      onChange={(e) =>
                        setTaskReminders(e.target.checked)
                      }
                      className="h-4 w-4 accent-blue-600"
                    />
                  </div>

                </div>

                {/* Done Button */}
                <div className="border-t border-gray-100 mt-4 pt-3">
                  <button
                    onClick={() => setSettingsOpen(false)}
                    className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 text-sm font-medium"
                  >
                    Done
                  </button>
                </div>

              </div>
            )}
          </div>

          {/* Profile Button */}
          <button
            onClick={() => navigate('/team-members')}
            title="View team member profiles"
            className="flex items-center space-x-3 rounded-lg p-2 hover:bg-gray-100 transition-colors text-left"
          >
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {displayName}
              </p>

              <p className="text-xs text-gray-500">
                {displayRole}
              </p>
            </div>

            <div className="h-8 w-8 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">
                {displayAvatar || <User className="h-5 w-5" />}
              </span>
            </div>
          </button>

        </div>
      </div>
    </header>
  )
}

export default Header
