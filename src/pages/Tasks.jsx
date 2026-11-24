
import React, { useState } from 'react'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'
import { useParams } from 'react-router-dom'
import TaskCard from '../components/TaskCard'
import { Plus, Filter } from 'lucide-react'

const Tasks = () => {
  const { tasks, addTask, updateTask, teamMembers } = useData()
  const { user } = useAuth()
  const { id } = useParams()

  // Determine which employee's tasks should be displayed
  const selectedMemberId = id
    ? Number(id)
    : user?.isManager
      ? null
      : user?.id

  const selectedMember = teamMembers.find(
    member => member.id === selectedMemberId
  )

  // Filter tasks by employee
  const memberTasks = selectedMemberId
    ? tasks.filter(task => task.memberId === selectedMemberId)
    : tasks

  const [showAddForm, setShowAddForm] = useState(false)
  const [filter, setFilter] = useState('all')

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: '',
    dueDate: '',
    points: ''
  })

  const categories = [
    'Reporting',
    'Field Work',
    'Administrative',
    'Documentation',
    'Quality Control'
  ]

  const priorities = ['low', 'medium', 'high']

  // Apply status filter after employee filter
  const filteredTasks = filter === 'all'
    ? memberTasks
    : memberTasks.filter(task => task.status === filter)

  // Add task to selected employee
  const handleSubmit = (e) => {
    e.preventDefault()

    addTask({
      ...newTask,
      points: parseInt(newTask.points, 10),
      memberId: selectedMemberId ?? user?.id ?? 1
    })

    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      category: '',
      dueDate: '',
      points: ''
    })

    setShowAddForm(false)
  }

  // Update task status
  const handleStatusChange = (taskId, newStatus) => {
    const updates = { status: newStatus }

    if (newStatus === 'completed') {
      updates.completedDate = new Date().toISOString().split('T')[0]
    }

    updateTask(taskId, updates)
  }

  // Calculate employee-specific statistics
  const getTaskStats = () => {
    const completed = memberTasks.filter(
      task => task.status === 'completed'
    ).length

    const inProgress = memberTasks.filter(
      task => task.status === 'in-progress'
    ).length

    const pending = memberTasks.filter(
      task => task.status === 'pending'
    ).length

    const totalPoints = memberTasks
      .filter(task => task.status === 'completed')
      .reduce((sum, task) => sum + (Number(task.points) || 0), 0)

    return { completed, inProgress, pending, totalPoints }
  }

  const stats = getTaskStats()

  return (
    <div className="space-y-6">

      {/* Page Heading */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Tasks
          </h1>

          <p className="text-gray-600 mt-1">
            {selectedMember
              ? `Managing tasks for ${selectedMember.name}`
              : 'Manage your tasks and track completion'}
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="card">
          <div className="text-center">
            <div className="text-2xl font-bold text-success-600">
              {stats.completed}
            </div>
            <div className="text-sm text-gray-600">
              Completed
            </div>
          </div>
        </div>

        <div className="card">
          <div className="text-center">
            <div className="text-2xl font-bold text-warning-600">
              {stats.inProgress}
            </div>
            <div className="text-sm text-gray-600">
              In Progress
            </div>
          </div>
        </div>

        <div className="card">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">
              {stats.pending}
            </div>
            <div className="text-sm text-gray-600">
              Pending
            </div>
          </div>
        </div>

        <div className="card">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">
              {stats.totalPoints}
            </div>
            <div className="text-sm text-gray-600">
              Points Earned
            </div>
          </div>
        </div>

      </div>

      {/* Status Filter */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            Filter by status:
          </span>
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="select-field w-auto"
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Add Task Form */}
      {showAddForm && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Add New Task
            {selectedMember ? ` for ${selectedMember.name}` : ''}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task Title
                </label>

                <input
                  type="text"
                  required
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  className="input-field"
                  placeholder="Enter task title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>

                <select
                  required
                  value={newTask.category}
                  onChange={(e) =>
                    setNewTask({ ...newTask, category: e.target.value })
                  }
                  className="select-field"
                >
                  <option value="">Select category</option>

                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>

              <textarea
                required
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                className="input-field"
                rows="3"
                placeholder="Describe the task"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>

                <select
                  value={newTask.priority}
                  onChange={(e) =>
                    setNewTask({ ...newTask, priority: e.target.value })
                  }
                  className="select-field"
                >
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>

                <input
                  type="date"
                  required
                  value={newTask.dueDate}
                  onChange={(e) =>
                    setNewTask({ ...newTask, dueDate: e.target.value })
                  }
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Points
                </label>

                <input
                  type="number"
                  required
                  min="1"
                  value={newTask.points}
                  onChange={(e) =>
                    setNewTask({ ...newTask, points: e.target.value })
                  }
                  className="input-field"
                  placeholder="Task points"
                />
              </div>

            </div>

            <div className="flex items-center space-x-3">
              <button type="submit" className="btn-primary">
                Add Task
              </button>

              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      )}

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No tasks found for the selected filter.
          </p>
        </div>
      )}

    </div>
  )
}

export default Tasks
