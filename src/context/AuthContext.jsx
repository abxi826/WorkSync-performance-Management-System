import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: 1,
    name: 'Rajesh Kumar',
    role: 'Senior Engineer',
    department: 'Field Operations',
    email: 'rajesh.kumar@bb.gov.in',
    avatar: 'RK',
    isManager: false
  })

  const login = (userData) => {
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
  }

  const switchRole = (isManager) => {
    setUser(prev => ({ ...prev, isManager }))
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  )
}
