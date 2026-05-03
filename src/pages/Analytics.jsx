import React, { useState } from 'react'
import { useData } from '../context/DataContext'
import PerformanceChart from '../components/PerformanceChart'
import { Calendar, TrendingUp, Target, Award } from 'lucide-react'

const Analytics = () => {
  const { goals, tasks } = useData()
  const [timeRange, setTimeRange] = useState('6months')

  // Performance trend data
  const performanceTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Overall Performance',
        data: [75, 78, 82, 85, 87, 89],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Department Average',
        data: [70, 72, 75, 78, 80, 82],
        borderColor: 'rgb(156, 163, 175)',
        backgroundColor: 'rgba(156, 163, 175, 0.1)',
        tension: 0.4,
      },
    ],
  }

  // KPI comparison data
  const kpiComparisonData = {
    labels: goals.map(goal => goal.title.split(' ').slice(0, 2).join(' ')),
    datasets: [
      {
        label: 'Current Achievement',
        data: goals.map(goal => (goal.current / goal.target) * 100),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
      },
      {
        label: 'Target',
        data: goals.map(() => 100),
        backgroundColor: 'rgba(156, 163, 175, 0.3)',
      },
    ],
  }

  // Task completion trend
  const taskCompletionData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Tasks Completed',
        data: [8, 12, 10, 15],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
      },
      {
        label: 'Tasks Assigned',
        data: [10, 14, 12, 16],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
      },
    ],
  }

  // Category performance data
  const categoryPerformanceData = {
    labels: ['Operational', 'Financial', 'Project Mgmt', 'Quality'],
    datasets: [
      {
        label: 'Performance Score',
        data: [87, 78, 92, 89],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(168, 85, 247, 0.8)',
        ],
      },
    ],
  }

  const getInsights = () => {
    const overallScore = goals.reduce((acc, goal) => acc + (goal.current / goal.target) * goal.weight, 0)
    const completedTasks = tasks.filter(task => task.status === 'completed').length
    const totalTasks = tasks.length
    const completionRate = (completedTasks / totalTasks) * 100

    return {
      overallScore: overallScore.toFixed(1),
      completionRate: completionRate.toFixed(1),
      topPerformingKPI: goals.reduce((prev, current) => 
        (current.current / current.target) > (prev.current / prev.target) ? current : prev
      ),
      improvementArea: goals.reduce((prev, current) => 
        (current.current / current.target) < (prev.current / prev.target) ? current : prev
      )
    }
  }

  const insights = getInsights()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">
            Detailed performance insights and trends
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
              <p className="text-sm font-medium text-gray-600">Overall Score</p>
              <p className="text-2xl font-bold text-gray-900">{insights.overallScore}%</p>
              <p className="text-xs text-success-600">+5.2% from last month</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-success-100">
              <Target className="h-6 w-6 text-success-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Task Completion</p>
              <p className="text-2xl font-bold text-gray-900">{insights.completionRate}%</p>
              <p className="text-xs text-success-600">Above department avg</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-warning-100">
              <Award className="h-6 w-6 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Top KPI</p>
              <p className="text-lg font-bold text-gray-900">{insights.topPerformingKPI.title.split(' ')[0]}</p>
              <p className="text-xs text-success-600">
                {((insights.topPerformingKPI.current / insights.topPerformingKPI.target) * 100).toFixed(1)}%
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
              <p className="text-sm font-medium text-gray-600">Focus Area</p>
              <p className="text-lg font-bold text-gray-900">{insights.improvementArea.title.split(' ')[0]}</p>
              <p className="text-xs text-danger-600">Needs attention</p>
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
            Weekly Task Completion
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
              <h4 className="font-medium text-success-800">Strengths</h4>
              <ul className="text-sm text-success-700 mt-2 space-y-1">
                <li>• Consistent improvement in project milestone adherence</li>
                <li>• Above-average task completion rate</li>
                <li>• Strong performance in quality metrics</li>
              </ul>
            </div>
            
            <div className="p-4 bg-warning-50 rounded-lg">
              <h4 className="font-medium text-warning-800">Areas for Improvement</h4>
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
