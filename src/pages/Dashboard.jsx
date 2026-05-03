import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import KPICard from '../components/KPICard'
import PerformanceChart from '../components/PerformanceChart'
import { Target, CheckSquare, TrendingUp, Award } from 'lucide-react'

const Dashboard = () => {
  const { user } = useAuth()
  const { goals, tasks } = useData()

  const completedTasks = tasks.filter(task => task.status === 'completed').length
  const pendingTasks = tasks.filter(task => task.status === 'pending').length
  const overallScore = goals.reduce((acc, goal) => acc + (goal.current / goal.target) * goal.weight, 0)

  const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Performance Score',
        data: [75, 78, 82, 85, 87, 89],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
    ],
  }

  const kpiData = {
    labels: goals.map(goal => goal.title.split(' ').slice(0, 2).join(' ')),
    datasets: [
      {
        label: 'Current',
        data: goals.map(goal => goal.current),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
      },
      {
        label: 'Target',
        data: goals.map(goal => goal.target),
        backgroundColor: 'rgba(156, 163, 175, 0.8)',
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600 mt-1">
            Here's your performance overview for this quarter
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-primary-600">
            {overallScore.toFixed(1)}%
          </div>
          <div className="text-sm text-gray-600">Overall Score</div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100">
              <Target className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Goals</p>
              <p className="text-2xl font-bold text-gray-900">{goals.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-success-100">
              <CheckSquare className="h-6 w-6 text-success-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{completedTasks}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-warning-100">
              <TrendingUp className="h-6 w-6 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{pendingTasks}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Rank</p>
              <p className="text-2xl font-bold text-gray-900">3rd</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Performance Trend
          </h3>
          <PerformanceChart data={performanceData} />
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            KPI Progress
          </h3>
          <PerformanceChart type="bar" data={kpiData} />
        </div>
      </div>

      {/* KPI Cards */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Your Key Performance Indicators
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {goals.map(goal => (
            <KPICard key={goal.id} goal={goal} />
          ))}
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-3">
          {tasks.slice(0, 3).map(task => (
            <div key={task.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-3 h-3 rounded-full ${
                task.status === 'completed' ? 'bg-success-500' : 
                task.status === 'in-progress' ? 'bg-warning-500' : 'bg-gray-400'
              }`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{task.title}</p>
                <p className="text-xs text-gray-600">{task.category}</p>
              </div>
              <span className="text-xs text-gray-500 capitalize">{task.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
