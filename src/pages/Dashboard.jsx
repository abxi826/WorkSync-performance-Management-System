
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import KPICard from '../components/KPICard'
import PerformanceChart from '../components/PerformanceChart'
import {
  Target, CheckSquare, TrendingUp, Award, ArrowLeft
} from 'lucide-react'

const Dashboard = ({ memberId, showBackLink = false }) => {
  const { user } = useAuth()
  const { goals, tasks, teamMembers } = useData()

  // Find the selected employee.
  // If no ID is supplied, use the logged-in employee.
  const member = memberId
    ? teamMembers.find(person => person.id === Number(memberId))
    : teamMembers.find(
        person => person.name.toLowerCase() === user?.name?.toLowerCase()
      ) || teamMembers[0]

  if (!member) {
    return <div className="card">Employee not found.</div>
  }

  // Only show this employee's goals and tasks.
  const employeeGoals = goals.filter(
    goal => goal.memberId === member.id
  )

  const employeeTasks = tasks.filter(
    task => task.memberId === member.id
  )

  // Recent sample tasks are shown below.
  const completedTasks = member.completedTasks
  const pendingTasks = member.pendingTasks

  // Calculate rank from employee performance scores.
  const sortedMembers = [...teamMembers].sort(
    (a, b) => b.overallScore - a.overallScore
  )

  const rank = sortedMembers.findIndex(
    person => person.id === member.id
  ) + 1

  const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Performance Score',
        data: member.performanceHistory,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
    ],
  }

  const kpiData = {
    labels: employeeGoals.map(
      goal => goal.title.split(' ').slice(0, 2).join(' ')
    ),
    datasets: [
      {
        label: 'Current',
        data: employeeGoals.map(goal => goal.current),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
      },
      {
        label: 'Target',
        data: employeeGoals.map(goal => goal.target),
        backgroundColor: 'rgba(156, 163, 175, 0.8)',
      },
    ],
  }

  return (
    <div className="space-y-6">

      {showBackLink && (
        <Link
          to="/team"
          className="inline-flex items-center text-primary-600 hover:text-primary-800"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Team Dashboard
        </Link>
      )}

      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {member.name}!
          </h1>
          <p className="text-gray-600 mt-1">
            {member.role} - Performance overview for this quarter
          </p>
        </div>

        <div className="text-right">
          <div className="text-3xl font-bold text-primary-600">
            {member.overallScore.toFixed(1)}%
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
              <p className="text-2xl font-bold text-gray-900">
                {employeeGoals.length}
              </p>
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
              <p className="text-2xl font-bold text-gray-900">
                {completedTasks}
              </p>
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
              <p className="text-2xl font-bold text-gray-900">
                {pendingTasks}
              </p>
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
              <p className="text-2xl font-bold text-gray-900">
                {rank}{rank === 1 ? 'st' : rank === 2 ? 'nd' : rank === 3 ? 'rd' : 'th'}
              </p>
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
          {member.name}'s Key Performance Indicators
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {employeeGoals.map(goal => (
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
          {employeeTasks.slice(0, 3).map(task => (
            <div
              key={task.id}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className={`w-3 h-3 rounded-full ${
                task.status === 'completed'
                  ? 'bg-success-500'
                  : task.status === 'in-progress'
                  ? 'bg-warning-500'
                  : 'bg-gray-400'
              }`} />

              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {task.title}
                </p>
                <p className="text-xs text-gray-600">
                  {task.category}
                </p>
              </div>

              <span className="text-xs text-gray-500 capitalize">
                {task.status}
              </span>
            </div>
          ))}

          {employeeTasks.length === 0 && (
            <p className="text-sm text-gray-500">
              No recent activity for this employee.
            </p>
          )}
        </div>
      </div>

    </div>
  )
}

export default Dashboard
