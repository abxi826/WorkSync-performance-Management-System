import React, { useState } from 'react'
import { useData } from '../context/DataContext'
import PerformanceChart from '../components/PerformanceChart'
import { Users, TrendingUp, TrendingDown, Minus, Search } from 'lucide-react'

const TeamDashboard = () => {
  const { teamMembers } = useData()
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('score')

  const filteredMembers = teamMembers
    .filter(member => 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return b.overallScore - a.overallScore
        case 'name':
          return a.name.localeCompare(b.name)
        case 'tasks':
          return b.completedTasks - a.completedTasks
        default:
          return 0
      }
    })

  const teamPerformanceData = {
    labels: teamMembers.map(member => member.name.split(' ')[0]),
    datasets: [
      {
        label: 'Performance Score',
        data: teamMembers.map(member => member.overallScore),
        backgroundColor: teamMembers.map(member => 
          member.overallScore >= 90 ? 'rgba(34, 197, 94, 0.8)' :
          member.overallScore >= 80 ? 'rgba(59, 130, 246, 0.8)' :
          'rgba(245, 158, 11, 0.8)'
        ),
      },
    ],
  }

  const departmentTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Department Average',
        data: [78, 80, 82, 84, 86, 87],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Organization Average',
        data: [75, 76, 78, 79, 81, 82],
        borderColor: 'rgb(156, 163, 175)',
        backgroundColor: 'rgba(156, 163, 175, 0.1)',
        tension: 0.4,
      },
    ],
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-success-600" />
      case 'down':
        return <TrendingDown className="h-4 w-4 text-danger-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-400" />
    }
  }

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-success-600 bg-success-50'
    if (score >= 80) return 'text-primary-600 bg-primary-50'
    if (score >= 70) return 'text-warning-600 bg-warning-50'
    return 'text-danger-600 bg-danger-50'
  }

  const teamStats = {
    averageScore: (teamMembers.reduce((sum, member) => sum + member.overallScore, 0) / teamMembers.length).toFixed(1),
    topPerformer: teamMembers.reduce((prev, current) => prev.overallScore > current.overallScore ? prev : current),
    totalTasks: teamMembers.reduce((sum, member) => sum + member.completedTasks, 0),
    needsAttention: teamMembers.filter(member => member.overallScore < 80).length
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Monitor and manage your team's performance
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select-field w-auto"
          >
            <option value="score">Sort by Score</option>
            <option value="name">Sort by Name</option>
            <option value="tasks">Sort by Tasks</option>
          </select>
        </div>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100">
              <Users className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Team Average</p>
              <p className="text-2xl font-bold text-gray-900">{teamStats.averageScore}%</p>
              <p className="text-xs text-success-600">+2.3% this month</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-success-100">
              <TrendingUp className="h-6 w-6 text-success-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Top Performer</p>
              <p className="text-lg font-bold text-gray-900">{teamStats.topPerformer.name.split(' ')[0]}</p>
              <p className="text-xs text-success-600">{teamStats.topPerformer.overallScore}% score</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-warning-100">
              <TrendingUp className="h-6 w-6 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{teamStats.totalTasks}</p>
              <p className="text-xs text-gray-600">Completed this month</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-danger-100">
              <Users className="h-6 w-6 text-danger-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Needs Attention</p>
              <p className="text-2xl font-bold text-gray-900">{teamStats.needsAttention}</p>
              <p className="text-xs text-danger-600">Members below 80%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Team Performance Overview
          </h3>
          <PerformanceChart type="bar" data={teamPerformanceData} />
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Department Performance Trend
          </h3>
          <PerformanceChart data={departmentTrendData} />
        </div>
      </div>

      {/* Team Members List */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Team Members ({filteredMembers.length})
        </h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Goals
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tasks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-primary-600 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{member.role}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(member.overallScore)}`}>
                      {member.overallScore}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {member.goals}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {member.completedTasks} completed
                    </div>
                    <div className="text-sm text-gray-500">
                      {member.pendingTasks} pending
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getTrendIcon(member.trend)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900 mr-3">
                      View Details
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      Assign Goal
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Team Insights
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-success-50 rounded-lg">
              <h4 className="font-medium text-success-800">High Performers</h4>
              <p className="text-sm text-success-700 mt-1">
                {teamMembers.filter(m => m.overallScore >= 90).length} team members are exceeding expectations
              </p>
            </div>
            
            <div className="p-4 bg-warning-50 rounded-lg">
              <h4 className="font-medium text-warning-800">Development Opportunities</h4>
              <p className="text-sm text-warning-700 mt-1">
                {teamMembers.filter(m => m.overallScore < 80).length} team members could benefit from additional support
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Action Items
          </h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Schedule 1-on-1 Reviews
                </p>
                <p className="text-xs text-gray-600">
                  Meet with underperforming team members
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-success-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Recognize Top Performers
                </p>
                <p className="text-xs text-gray-600">
                  Acknowledge excellent work in team meeting
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-warning-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Training Program
                </p>
                <p className="text-xs text-gray-600">
                  Organize skill development sessions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamDashboard
