
import React, { useState } from 'react'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'
import { useParams } from 'react-router-dom'
import KPICard from '../components/KPICard'
import { Plus, Filter } from 'lucide-react'

const Goals = () => {
  const { goals, addGoal, teamMembers } = useData()
  const { user } = useAuth()
  const { id } = useParams()

  // Identify the employee selected in the URL
  const selectedMemberId = id
    ? Number(id)
    : user?.isManager
      ? null
      : user?.id

  const selectedMember = teamMembers.find(
    member => member.id === selectedMemberId
  )

  // First filter goals by employee
  const memberGoals = selectedMemberId
    ? goals.filter(goal => goal.memberId === selectedMemberId)
    : goals

  const [showAddForm, setShowAddForm] = useState(false)
  const [filter, setFilter] = useState('all')

  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    target: '',
    weight: '',
    category: '',
    deadline: ''
  })

  const categories = [
    'Operational',
    'Financial',
    'Project Management',
    'Quality',
    'Administrative'
  ]

  // Then apply category filter
  const filteredGoals = filter === 'all'
    ? memberGoals
    : memberGoals.filter(goal => goal.category === filter)

  const handleSubmit = (e) => {
    e.preventDefault()

    addGoal({
      ...newGoal,
      target: parseFloat(newGoal.target),
      weight: parseFloat(newGoal.weight),
      memberId: selectedMemberId ?? user?.id ?? 1
    })

    setNewGoal({
      title: '',
      description: '',
      target: '',
      weight: '',
      category: '',
      deadline: ''
    })

    setShowAddForm(false)
  }

  return (
    <div className="space-y-6">

      {/* Page Heading */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Goals & KPIs
          </h1>

          <p className="text-gray-600 mt-1">
            {selectedMember
              ? `Manage goals and KPIs for ${selectedMember.name}`
              : 'Manage your key performance indicators and track progress'}
          </p>
        </div>

        {user?.isManager && (
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Goal</span>
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            Filter by category:
          </span>
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="select-field w-auto"
        >
          <option value="all">All Categories</option>

          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Add Goal Form */}
      {showAddForm && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Add New Goal
            {selectedMember ? ` for ${selectedMember.name}` : ''}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Goal Title
                </label>

                <input
                  type="text"
                  required
                  value={newGoal.title}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, title: e.target.value })
                  }
                  className="input-field"
                  placeholder="Enter goal title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>

                <select
                  required
                  value={newGoal.category}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, category: e.target.value })
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
                value={newGoal.description}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, description: e.target.value })
                }
                className="input-field"
                rows="3"
                placeholder="Describe the goal"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Value
                </label>

                <input
                  type="number"
                  required
                  value={newGoal.target}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, target: e.target.value })
                  }
                  className="input-field"
                  placeholder="Target value"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (%)
                </label>

                <input
                  type="number"
                  required
                  min="1"
                  max="100"
                  value={newGoal.weight}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, weight: e.target.value })
                  }
                  className="input-field"
                  placeholder="Weight percentage"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deadline
                </label>

                <input
                  type="date"
                  required
                  value={newGoal.deadline}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, deadline: e.target.value })
                  }
                  className="input-field"
                />
              </div>

            </div>

            <div className="flex items-center space-x-3">
              <button type="submit" className="btn-primary">
                Add Goal
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

      {/* Goals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredGoals.map(goal => (
          <KPICard
            key={goal.id}
            goal={goal}
          />
        ))}
      </div>

      {filteredGoals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No goals found for the selected category.
          </p>
        </div>
      )}

    </div>
  )
}

export default Goals
