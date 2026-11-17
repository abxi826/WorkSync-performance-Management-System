import React from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

const KPICard = ({ goal }) => {
  const progress = (goal.current / goal.target) * 100
  const isOnTrack = progress >= 80
  const trend = progress > 85 ? 'up' : progress < 70 ? 'down' : 'stable'

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-success-600" />
      case 'down':
        return <TrendingDown className="h-4 w-4 text-danger-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = () => {
    if (progress >= 90) return 'text-success-600 bg-success-50'
    if (progress >= 70) return 'text-warning-600 bg-warning-50'
    return 'text-danger-600 bg-danger-50'
  }

  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
          
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Progress</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
                {progress.toFixed(1)}%
              </span>
            </div>
            
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  isOnTrack ? 'bg-success-500' : 'bg-warning-500'
                }`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            
            <div className="flex items-center justify-between mt-2 text-sm">
              <span className="text-gray-600">
                Current: <span className="font-medium">{goal.current}</span>
              </span>
              <span className="text-gray-600">
                Target: <span className="font-medium">{goal.target}</span>
              </span>
            </div>
          </div>
        </div>
        
        <div className="ml-4 flex flex-col items-end">
          <div className="flex items-center space-x-1">
            {getTrendIcon()}
            <span className="text-xs text-gray-500">Weight: {goal.weight}%</span>
          </div>
          <span className="text-xs text-gray-500 mt-1">{goal.category}</span>
        </div>
      </div>
    </div>
  )
}

export default KPICard
