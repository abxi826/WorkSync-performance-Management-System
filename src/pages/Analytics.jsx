
import React, { useState } from 'react'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'
import { useParams } from 'react-router-dom'
import PerformanceChart from '../components/PerformanceChart'
import { Calendar, TrendingUp, Target, Award } from 'lucide-react'

const Analytics = () => {
  const { goals, tasks, teamMembers } = useData()
  const { user } = useAuth()
  const { id } = useParams()

  const [timeRange, setTimeRange] = useState('6months')

  // Identify selected employee
  const selectedMemberId = id
    ? Number(id)
    : user?.isManager
      ? null
      : user?.id

  const selectedMember = teamMembers.find(
    member => member.id === selectedMemberId
  )

  // Filter employee-specific data
  const memberGoals = selectedMemberId
    ? goals.filter(goal => goal.memberId === selectedMemberId)
    : goals

  const memberTasks = selectedMemberId
    ? tasks.filter(task => task.memberId === selectedMemberId)
    : tasks

  // Calculate performance score safely
  const getGoalPercentage = (goal) => {
    if (!goal.target || goal.target <= 0) return 0

    return Math.min(
      (Number(goal.current || 0) / Number(goal.target)) * 100,
      100
    )
  }

  // KPI comparison chart
  const kpiComparisonData = {
    labels: memberGoals.map(goal =>
      goal.title.split(' ').slice(0, 2).join(' ')
    ),
    datasets: [
      {
        label: 'Current Achievement',
        data: memberGoals.map(getGoalPercentage),
        backgroundColor: 'rgba(34, 197, 94, 0.8)'
      },
      {
        label: 'Target',
        data: memberGoals.map(() => 100),
        backgroundColor: 'rgba(156, 163, 175, 0.3)'
      }
    ]
  }

  // Task completion trend
  const completedTasks = memberTasks.filter(
    task => task.status === 'completed'
  ).length

  const inProgressTasks = memberTasks.filter(
    task => task.status === 'in-progress'
  ).length

  const pendingTasks = memberTasks.filter(
    task => task.status === 'pending'
  ).length

  const totalTasks = memberTasks.length

  const taskCompletionData = {
    labels: ['Completed', 'In Progress', 'Pending'],
    datasets: [
      {
        label: 'Tasks',
        data: [completedTasks, inProgressTasks, pendingTasks],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(59, 130, 246, 0.8)'
        ]
      }
    ]
  }

  // Performance by category
  const categoryNames = [
    'Operational',
    'Financial',
    'Project Management',
    'Quality',
    'Administrative'
  ]

  const categoryPerformanceData = {
    labels: categoryNames,
    datasets: [
      {
        label: 'Performance Score',
        data: categoryNames.map(category => {
          const categoryGoals = memberGoals.filter(
            goal => goal.category === category
          )

          if (categoryGoals.length === 0) return 0

          const totalWeight = categoryGoals.reduce(
            (sum, goal) => sum + Number(goal.weight || 0),
            0
          )

          if (totalWeight === 0) return 0

          const weightedScore = categoryGoals.reduce(
            (sum, goal) =>
              sum + getGoalPercentage(goal) * Number(goal.weight || 0),
            0
          )

          return Number((weightedScore / totalWeight).toFixed(1))
        }),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(236, 72, 153, 0.8)'
        ]
      }
    ]
  }

  // Overall performance score
  const totalWeight = memberGoals.reduce(
    (sum, goal) => sum + Number(goal.weight || 0),
    0
  )

  const overallScore = totalWeight > 0
    ? memberGoals.reduce(
        (sum, goal) =>
          sum + getGoalPercentage(goal) * Number(goal.weight || 0),
        0
      ) / totalWeight
    : 0

  // Task completion percentage
  const completionRate = totalTasks > 0
    ? (completedTasks / totalTasks) * 100
    : 0

  // Top and lowest performing KPI
  const sortedGoals = [...memberGoals].sort(
    (a, b) => getGoalPercentage(b) - getGoalPercentage(a)
  )

  const topPerformingKPI = sortedGoals[0]
  const improvementArea = sortedGoals[sortedGoals.length - 1]

  const insights = {
    overallScore: overallScore.toFixed(1),
    completionRate: completionRate.toFixed(1),
    topPerformingKPI,
    improvementArea
  }

  // Performance trend
  // Uses the selected employee's existing history where available
  const performanceHistory = selectedMember?.history || []

  const trendLabels = performanceHistory.length > 0
    ? performanceHistory.map((_, index) => `Period ${index + 1}`)
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

  const trendValues = performanceHistory.length > 0
    ? performanceHistory
    : [75, 78, 82, 85, 87, 89]

  const performanceTrendData = {
    labels: trendLabels,
    datasets: [
      {
        label: 'Overall Performance',
        data: trendValues,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      }
    ]
  }

  return (
    <div className="space-y-6">

      {/* Heading */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Analytics
          </h1>

          <p className="text-gray-600 mt-1">
            {selectedMember
              ? `Performance insights for ${selectedMember.name}`
              : 'Detailed performance insights and trends'}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-400" />

          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="select-field w-auto"
          >
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100">
              <TrendingUp className="h-6 w-6 text-primary-600" />
            </div>

            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Overall Score
              </p>

              <p className="text-2xl font-bold text-gray-900">
                {insights.overallScore}%
              </p>

              <p className="text-xs text-success-600">
                Weighted KPI achievement
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-success-100">
              <Target className="h-6 w-6 text-success-600" />
            </div>

            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Task Completion
              </p>

              <p className="text-2xl font-bold text-gray-900">
                {insights.completionRate}%
              </p>

              <p className="text-xs text-success-600">
                {completedTasks} of {totalTasks} tasks completed
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-warning-100">
              <Award className="h-6 w-6 text-warning-600" />
            </div>

            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Top KPI
              </p>

              <p className="text-lg font-bold text-gray-900">
                {insights.topPerformingKPI
                  ? insights.topPerformingKPI.title.split(' ')[0]
                  : 'N/A'}
              </p>

              <p className="text-xs text-success-600">
                {insights.topPerformingKPI
                  ? `${getGoalPercentage(insights.topPerformingKPI).toFixed(1)}%`
                  : 'No goals available'}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-danger-100">
              <TrendingUp className="h-6 w-6 text-danger-600" />
            </div>

            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Focus Area
              </p>

              <p className="text-lg font-bold text-gray-900">
                {insights.improvementArea
                  ? insights.improvementArea.title.split(' ')[0]
                  : 'N/A'}
              </p>

              <p className="text-xs text-danger-600">
                Needs attention
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

          <PerformanceChart data={performanceTrendData} />
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            KPI Achievement vs Target
          </h3>

          <PerformanceChart type="bar" data={kpiComparisonData} />
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Task Status Overview
          </h3>

          <PerformanceChart type="bar" data={taskCompletionData} />
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Performance by Category
          </h3>

          <PerformanceChart type="bar" data={categoryPerformanceData} />
        </div>

      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Performance Analysis
          </h3>

          <div className="space-y-4">

            <div className="p-4 bg-success-50 rounded-lg">
              <h4 className="font-medium text-success-800">
                Strengths
              </h4>

              <ul className="text-sm text-success-700 mt-2 space-y-1">
                <li>• Consistent improvement in project milestone adherence</li>
                <li>• Above-average task completion rate</li>
                <li>• Strong performance in quality metrics</li>
              </ul>
            </div>

            <div className="p-4 bg-warning-50 rounded-lg">
              <h4 className="font-medium text-warning-800">
                Areas for Improvement
              </h4>

              <ul className="text-sm text-warning-700 mt-2 space-y-1">
                <li>• DPR submission timing needs attention</li>
                <li>• Budget utilization could be optimized</li>
                <li>• Consider time management training</li>
              </ul>
            </div>

          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recommendations
          </h3>

          <div className="space-y-3">

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>

              <div>
                <p className="text-sm font-medium text-gray-900">
                  Focus on DPR Submission
                </p>

                <p className="text-xs text-gray-600">
                  Set up automated reminders for daily progress reports
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-success-500 rounded-full mt-2"></div>

              <div>
                <p className="text-sm font-medium text-gray-900">
                  Maintain Quality Standards
                </p>

                <p className="text-xs text-gray-600">
                  Continue current quality control practices
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-warning-500 rounded-full mt-2"></div>

              <div>
                <p className="text-sm font-medium text-gray-900">
                  Budget Planning Workshop
                </p>

                <p className="text-xs text-gray-600">
                  Attend training on optimal budget utilization
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  )
}

export default Analytics
