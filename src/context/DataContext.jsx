import React, { createContext, useContext, useState } from 'react'

const DataContext = createContext()

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

export const DataProvider = ({ children }) => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: 'DPR Submission Rate',
      description: 'Submit Daily Progress Reports on time',
      target: 95,
      current: 87,
      weight: 30,
      category: 'Operational',
      deadline: '2024-03-31',
      status: 'active'
    },
    {
      id: 2,
      title: 'Budget Utilization',
      description: 'Optimal utilization of allocated project funds',
      target: 85,
      current: 78,
      weight: 25,
      category: 'Financial',
      deadline: '2024-03-31',
      status: 'active'
    },
    {
      id: 3,
      title: 'Project Milestone Adherence',
      description: 'Complete project milestones within timeline',
      target: 90,
      current: 92,
      weight: 35,
      category: 'Project Management',
      deadline: '2024-03-31',
      status: 'active'
    },
    {
      id: 4,
      title: 'Quality Compliance',
      description: 'Maintain quality standards in deliverables',
      target: 95,
      current: 89,
      weight: 10,
      category: 'Quality',
      deadline: '2024-03-31',
      status: 'active'
    }
  ])

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Submit Weekly DPR',
      description: 'Weekly progress report for Project Alpha',
      status: 'completed',
      priority: 'high',
      dueDate: '2024-01-15',
      completedDate: '2024-01-14',
      category: 'Reporting',
      points: 10
    },
    {
      id: 2,
      title: 'Site Inspection - Dam Section A',
      description: 'Conduct safety and quality inspection',
      status: 'in-progress',
      priority: 'high',
      dueDate: '2024-01-18',
      category: 'Field Work',
      points: 15
    },
    {
      id: 3,
      title: 'Budget Review Meeting',
      description: 'Quarterly budget utilization review',
      status: 'pending',
      priority: 'medium',
      dueDate: '2024-01-20',
      category: 'Administrative',
      points: 8
    },
    {
      id: 4,
      title: 'Technical Documentation Update',
      description: 'Update project technical specifications',
      status: 'completed',
      priority: 'medium',
      dueDate: '2024-01-12',
      completedDate: '2024-01-11',
      category: 'Documentation',
      points: 12
    }
  ])

  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      role: 'Senior Engineer',
      overallScore: 87,
      goals: 4,
      completedTasks: 12,
      pendingTasks: 3,
      trend: 'up'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      role: 'Project Coordinator',
      overallScore: 92,
      goals: 5,
      completedTasks: 18,
      pendingTasks: 2,
      trend: 'up'
    },
    {
      id: 3,
      name: 'Amit Patel',
      role: 'Field Supervisor',
      overallScore: 78,
      goals: 4,
      completedTasks: 8,
      pendingTasks: 6,
      trend: 'down'
    },
    {
      id: 4,
      name: 'Sunita Devi',
      role: 'Quality Inspector',
      overallScore: 89,
      goals: 3,
      completedTasks: 15,
      pendingTasks: 1,
      trend: 'stable'
    }
  ])

  const addGoal = (goal) => {
    const newGoal = {
      ...goal,
      id: goals.length + 1,
      current: 0,
      status: 'active'
    }
    setGoals([...goals, newGoal])
  }

  const updateGoal = (id, updates) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, ...updates } : goal
    ))
  }

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: tasks.length + 1,
      status: 'pending'
    }
    setTasks([...tasks, newTask])
  }

  const updateTask = (id, updates) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ))
  }

  return (
    <DataContext.Provider value={{
      goals,
      tasks,
      teamMembers,
      addGoal,
      updateGoal,
      addTask,
      updateTask
    }}>
      {children}
    </DataContext.Provider>
  )
}
