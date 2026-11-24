

import React, { useState } from 'react'
import { Menu, Bell, User, Settings, CheckCheck, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'
import { useData } from '../context/DataContext'

const Header = ({ onMenuClick }) => {
  const { user, switchRole } = useAuth()
  const {
    teamMembers,
    notifications,
    markAsRead,
    markAllAsRead
  } = useData()

  const navigate = useNavigate()
  const location = useLocation()

  const [settingsOpen, setSettingsOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [taskReminders, setTaskReminders] = useState(true)

  // Detect selected employee profile
  const profileMatch = location.pathname.match(/^\/team\/member\/(\d+)$/)

  const selectedMember = profileMatch
    ? teamMembers.find(member => member.id === Number(profileMatch[1]))
    : null

  const displayUser = selectedMember || user
  const displayName = displayUser.name
  const displayRole = displayUser.role

  const displayAvatar = displayUser.avatar ||
    displayName
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()

  // Show notifications for selected employee, or all for manager
  const visibleNotifications = notifications.filter(notification =>
    user.isManager
      ? true
      : notification.memberId === user.id
  )

  const unreadCount = visibleNotifications.filter(
    notification => !notification.read
  ).length

  const formatTime = (time) => {
    const date = new Date(time)
    return date.toLocaleString()
  }

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id)
  }

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
          <div className="relative">
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen)
                setSettingsOpen(false)
              }}
              className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
              title="Notifications"
            >
              <Bell className="h-5 w-5" />

              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 min-w-5 px-1 flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-gray-200 z-50">

                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Notifications
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {unreadCount} unread notifications
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        title="Mark all as read"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <CheckCheck className="h-5 w-5" />
                      </button>
                    )}

                    <button
                      onClick={() => setNotificationsOpen(false)}
                      className="text-gray-400 hover:text-gray-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {visibleNotifications.length > 0 ? (
                    visibleNotifications.map(notification => (
                      <button
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification)}
                        className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                          !notification.read ? 'bg-blue-50' : 'bg-white'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <Bell className="h-4 w-4 text-blue-600" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-semibold text-gray-900">
                                {notification.title}
                              </p>

                              {!notification.read && (
                                <span className="h-2 w-2 bg-blue-600 rounded-full ml-2 flex-shrink-0" />
                              )}
                            </div>

                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>

                            <p className="text-xs text-gray-400 mt-2">
                              {formatTime(notification.time)}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <Bell className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">
                        No notifications yet
                      </p>
                    </div>
                  )}
                </div>

                <div className="p-3 text-center border-t border-gray-100">
                  <button
                    onClick={() => setNotificationsOpen(false)}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Close
                  </button>
                </div>

              </div>
            )}
          </div>

          {/* Settings */}
          <div className="relative">
            <button
              onClick={() => {
                setSettingsOpen(!settingsOpen)
                setNotificationsOpen(false)
              }}
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
