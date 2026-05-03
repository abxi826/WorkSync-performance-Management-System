import React from 'react'
import { Calendar, Flag, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { format } from 'date-fns'

const TaskCard = ({ task, onStatusChange }) => {
  const getStatusIcon = () => {
    switch (task.status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-success-600" />
      case 'in-progress':
        return <Clock className="h-5 w-5 text-warning-600" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = () => {
    switch (task.status) {
      case 'completed':
        return 'bg-success-50 text-success-700 border-success-200'
      case 'in-progress':
        return 'bg-warning-50 text-warning-700 border-warning-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high':
        return 'text-danger-600'
      case 'medium':
        return 'text-warning-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className={`card border-l-4 ${task.status === 'completed' ? 'border-l-success-500' : task.status === 'in-progress' ? 'border-l-warning-500' : 'border-l-gray-300'}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
          </div>
          
          <p className="text-sm text-gray-600 mt-2">{task.description}</p>
          
          <div className="flex items-center space-x-4 mt-4 text-sm">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">
                Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
              </span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Flag className={`h-4 w-4 ${getPriorityColor()}`} />
              <span className={`capitalize ${getPriorityColor()}`}>
                {task.priority}
              </span>
            </div>
            
            <span className="text-gray-600">
              Points: <span className="font-medium">{task.points}</span>
            </span>
          </div>
        </div>
        
        <div className="ml-4 flex flex-col items-end space-y-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor()}`}>
            {task.status.replace('-', ' ')}
          </span>
          
          <span className="text-xs text-gray-500">{task.category}</span>
          
          {task.status !== 'completed' && (
            <select
              value={task.status}
              onChange={(e) => onStatusChange(task.id, e.target.value)}
              className="text-xs border border-gray-300 rounded px-2 py-1"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          )}
        </div>
      </div>
    </div>
  )
}

export default TaskCard
