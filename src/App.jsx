
import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Goals from './pages/Goals'
import Tasks from './pages/Tasks'
import Analytics from './pages/Analytics'
import TeamDashboard from './pages/TeamDashboard'
import EmployeeDetails from './pages/EmployeeDetails'
import TeamMembers from './pages/TeamMembers'

import { AuthProvider } from './context/AuthContext'
import { DataProvider } from './context/DataContext'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="flex h-screen bg-gray-50">

            <Sidebar
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col overflow-hidden">

              <Header onMenuClick={() => setSidebarOpen(true)} />

              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">

                <Routes>

                  {/* General Dashboard */}
                  <Route path="/" element={<Dashboard />} />

                  {/* General Pages */}
                  <Route path="/goals" element={<Goals />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/analytics" element={<Analytics />} />

                  {/* Team Pages */}
                  <Route path="/team" element={<TeamDashboard />} />
                  <Route path="/team-members" element={<TeamMembers />} />

                  {/* Employee Dashboard */}
                  <Route
                    path="/team/member/:id"
                    element={<EmployeeDetails />}
                  />

                  {/* Employee-Specific Pages */}
                  <Route
                    path="/team/member/:id/goals"
                    element={<Goals />}
                  />

                  <Route
                    path="/team/member/:id/tasks"
                    element={<Tasks />}
                  />

                  <Route
                    path="/team/member/:id/analytics"
                    element={<Analytics />}
                  />

                </Routes>

              </main>
            </div>
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  )
}

export default App
