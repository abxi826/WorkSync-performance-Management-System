
import React from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { ArrowLeft, User, ChevronRight } from 'lucide-react'

const TeamMembers = () => {
  const { teamMembers } = useData()

  return (
    <div className="space-y-6">

      <Link
        to="/"
        className="inline-flex items-center text-primary-600 hover:text-primary-800"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Link>

      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Team Member Profiles
        </h1>
        <p className="text-gray-600 mt-1">
          Select a team member to view their profile and performance.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map(member => (
          <Link
            key={member.id}
            to={`/team/member/${member.id}`}
            className="card flex items-center justify-between hover:shadow-md hover:border-primary-300 border border-transparent transition-all"
          >
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {member.name
                    .split(' ')
                    .map(part => part[0])
                    .join('')}
                </span>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {member.role}
                </p>
                <p className="text-xs text-primary-600 mt-1">
                  Score: {member.overallScore}%
                </p>
              </div>
            </div>

            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>
        ))}
      </div>

      {teamMembers.length === 0 && (
        <div className="card text-center text-gray-500">
          No team members found.
        </div>
      )}

    </div>
  )
}

export default TeamMembers
