
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
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'Moosa',
      role: 'Senior Engineer',
      overallScore: 87,
      goals: 4,
      completedTasks: 12,
      pendingTasks: 3,
      trend: 'up',
      performanceHistory: [75, 78, 82, 85, 87, 87]
    },
    {
      id: 2,
      name: 'Priya',
      role: 'Project Coordinator',
      overallScore: 92,
      goals: 5,
      completedTasks: 18,
      pendingTasks: 2,
      trend: 'up',
      performanceHistory: [78, 80, 84, 86, 89, 92]
    },
    {
      id: 3,
      name: 'Amit',
      role: 'Field Supervisor',
      overallScore: 78,
      goals: 4,
      completedTasks: 8,
      pendingTasks: 6,
      trend: 'down',
      performanceHistory: [85, 83, 82, 80, 79, 78]
    },
    {
      id: 4,
      name: 'Sunita',
      role: 'Quality Inspector',
      overallScore: 89,
      goals: 3,
      completedTasks: 15,
      pendingTasks: 1,
      trend: 'stable',
      performanceHistory: [80, 82, 84, 86, 88, 89]
    }
  ])

  const [goals, setGoals] = useState([
    // MOOSA - Senior Engineer
    {
      id: 1, memberId: 1,
      title: 'DPR Submission Rate',
      description: 'Submit Daily Progress Reports on time',
      target: 95, current: 87, weight: 30,
      category: 'Operational',
      deadline: '2026-12-31', status: 'active'
    },
    {
      id: 2, memberId: 1,
      title: 'Budget Utilization',
      description: 'Optimal utilization of allocated project funds',
      target: 85, current: 78, weight: 25,
      category: 'Financial',
      deadline: '2026-12-31', status: 'active'
    },
    {
      id: 3, memberId: 1,
      title: 'Project Milestone Adherence',
      description: 'Complete project milestones within timeline',
      target: 90, current: 92, weight: 35,
      category: 'Project Management',
      deadline: '2026-12-31', status: 'active'
    },
    {
      id: 4, memberId: 1,
      title: 'Quality Compliance',
      description: 'Maintain quality standards in deliverables',
      target: 95, current: 89, weight: 10,
      category: 'Quality',
      deadline: '2026-12-31', status: 'active'
    },

    // PRIYA - Project Coordinator
    {
      id: 5, memberId: 2,
      title: 'Project Scheduling',
      description: 'Maintain accurate project schedules',
      target: 95, current: 94, weight: 25,
      category: 'Planning',
      deadline: '2026-12-31', status: 'active'
    },
    {
      id: 6, memberId: 2,
      title: 'Meeting Coordination',
      description: 'Coordinate project meetings and follow-ups',
      target: 90, current: 96, weight: 20,
      category: 'Administrative',
      deadline: '2026-12-31', status: 'active'
    },
    {
      id: 7, memberId: 2,
      title: 'Documentation Accuracy',
      description: 'Maintain accurate project records',
      target: 95, current: 91, weight: 20,
      category: 'Documentation',
      deadline: '2026-12-31', status: 'active'
    },
    {
      id: 8, memberId: 2,
      title: 'Budget Tracking',
      description: 'Track project expenses and budgets',
      target: 90, current: 88, weight: 20,
      category: 'Financial',
      deadline: '2026-12-31', status: 'active'
    },
    {
      id: 9, memberId: 2,
      title: 'Report Submission',
      description: 'Submit weekly coordination reports',
      target: 95, current: 93, weight: 15,
      category: 'Reporting',
      deadline: '2026-12-31', status: 'active'
    },

    // AMIT - Field Supervisor
    {
      id: 10, memberId: 3,
      title: 'Site Inspection',
      description: 'Complete scheduled dam site inspections',
      target: 95, current: 76, weight: 30,
      category: 'Field Work',
      deadline: '2026-12-31', status: 'active'
    },
    {
      id: 11, memberId: 3,
      title: 'Worker Safety',
      description: 'Monitor safety procedures at the construction site',
      target: 100, current: 82, weight: 25,
      category: 'Safety',
      deadline: '2026-12-31', status: 'active'
    },
    {
      id: 12, memberId: 3,
      title: 'Construction Progress',
      description: 'Monitor daily construction progress',
      target: 90, current: 80, weight: 25,
      category: 'Operational',
      deadline: '2026-12-31', status: 'active'
    },
    {
      id: 13, memberId: 3,
      title: 'Equipment Monitoring',
      description: 'Monitor site equipment and availability',
      target: 95, current: 74, weight: 20,
      category: 'Field Work',
      deadline: '2026-12-31', status: 'active'
    },

    // SUNITA - Quality Inspector
    {
      id: 14, memberId: 4,
      title: 'Material Quality Checks',
      description: 'Inspect construction materials for quality',
      target: 95, current: 93, weight: 35,
      category: 'Quality',
      deadline: '2026-12-31', status: 'active'
    },
    {
      id: 15, memberId: 4,
      title: 'Safety Compliance',
      description: 'Verify compliance with site safety standards',
      target: 100, current: 90, weight: 30,
      category: 'Compliance',
      deadline: '2026-12-31', status: 'active'
    },
    {
      id: 16, memberId: 4,
      title: 'Inspection Reports',
      description: 'Prepare and submit inspection reports',
      target: 95, current: 91, weight: 35,
      category: 'Reporting',
      deadline: '2026-12-31', status: 'active'
    }
  ])

  const [tasks, setTasks] = useState([
    // MOOSA
    {
      id: 1, memberId: 1,
      title: 'Submit Weekly DPR',
      description: 'Weekly progress report for Project Alpha',
      status: 'completed', priority: 'high',
      dueDate: '2026-11-15', completedDate: '2026-11-14',
      category: 'Reporting', points: 10
    },
    {
      id: 2, memberId: 1,
      title: 'Site Inspection - Dam Section A',
      description: 'Conduct safety and quality inspection',
      status: 'in-progress', priority: 'high',
      dueDate: '2026-11-20',
      category: 'Field Work', points: 15
    },
    {
      id: 3, memberId: 1,
      title: 'Budget Review Meeting',
      description: 'Quarterly budget utilization review',
      status: 'pending', priority: 'medium',
      dueDate: '2026-11-22',
      category: 'Administrative', points: 8
    },
    {
      id: 4, memberId: 1,
      title: 'Technical Documentation Update',
      description: 'Update project technical specifications',
      status: 'completed', priority: 'medium',
      dueDate: '2026-11-12', completedDate: '2026-11-11',
      category: 'Documentation', points: 12
    },

    // PRIYA
    {
      id: 5, memberId: 2,
      title: 'Prepare Project Schedule',
      description: 'Update the dam construction timeline',
      status: 'completed', priority: 'high',
      dueDate: '2026-11-15', completedDate: '2026-11-14',
      category: 'Planning', points: 12
    },
    {
      id: 6, memberId: 2,
      title: 'Coordinate Team Meeting',
      description: 'Arrange weekly project coordination meeting',
      status: 'completed', priority: 'medium',
      dueDate: '2026-11-17', completedDate: '2026-11-16',
      category: 'Administrative', points: 10
    },
    {
      id: 7, memberId: 2,
      title: 'Update Project Records',
      description: 'Update project documentation',
      status: 'in-progress', priority: 'medium',
      dueDate: '2026-11-21',
      category: 'Documentation', points: 8
    },
    {
      id: 8, memberId: 2,
      title: 'Submit Weekly Coordination Report',
      description: 'Prepare weekly coordination report',
      status: 'pending', priority: 'high',
      dueDate: '2026-11-23',
      category: 'Reporting', points: 10
    },

    // AMIT
    {
      id: 9, memberId: 3,
      title: 'Inspect Dam Section B',
      description: 'Check ongoing construction work',
      status: 'completed', priority: 'high',
      dueDate: '2026-11-15', completedDate: '2026-11-15',
      category: 'Field Work', points: 15
    },
    {
      id: 10, memberId: 3,
      title: 'Check Worker Safety Equipment',
      description: 'Verify safety equipment at the site',
      status: 'in-progress', priority: 'high',
      dueDate: '2026-11-20',
      category: 'Safety', points: 12
    },
    {
      id: 11, memberId: 3,
      title: 'Monitor Concrete Work',
      description: 'Check concrete pouring progress',
      status: 'pending', priority: 'high',
      dueDate: '2026-11-22',
      category: 'Construction', points: 15
    },
    {
      id: 12, memberId: 3,
      title: 'Equipment Inspection',
      description: 'Check machinery and equipment condition',
      status: 'completed', priority: 'medium',
      dueDate: '2026-11-16', completedDate: '2026-11-16',
      category: 'Field Work', points: 8
    },

    // SUNITA
    {
      id: 13, memberId: 4,
      title: 'Inspect Construction Materials',
      description: 'Verify quality of cement and steel',
      status: 'completed', priority: 'high',
      dueDate: '2026-11-15', completedDate: '2026-11-14',
      category: 'Quality', points: 15
    },
    {
      id: 14, memberId: 4,
      title: 'Review Safety Compliance',
      description: 'Check compliance with safety standards',
      status: 'completed', priority: 'high',
      dueDate: '2026-11-17', completedDate: '2026-11-16',
      category: 'Compliance', points: 12
    },
    {
      id: 15, memberId: 4,
      title: 'Prepare Quality Inspection Report',
      description: 'Submit the latest inspection report',
      status: 'in-progress', priority: 'medium',
      dueDate: '2026-11-21',
      category: 'Reporting', points: 10
    },
    {
      id: 16, memberId: 4,
      title: 'Review Material Test Results',
      description: 'Review laboratory material test results',
      status: 'pending', priority: 'medium',
      dueDate: '2026-11-23',
      category: 'Quality', points: 8
    }
  ])

  const addGoal = (goal) => {
    const newGoal = {
      ...goal,
      id: Math.max(0, ...goals.map(item => item.id)) + 1,
      memberId: goal.memberId || 1,
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
      id: Math.max(0, ...tasks.map(item => item.id)) + 1,
      memberId: task.memberId || 1,
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
