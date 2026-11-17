

import React from 'react'
import { useParams } from 'react-router-dom'
import { useData } from '../context/DataContext'
import Dashboard from './Dashboard'

const EmployeeDetails = () => {
  const { id } = useParams()
  const { teamMembers } = useData()

  const member = teamMembers.find(
    person => person.id === Number(id)
  )

  if (!member) {
    return (
      <div className="card text-center">
        <h2 className="text-xl font-bold">Employee not found</h2>
      </div>
    )
  }

  return (
    <Dashboard
      memberId={member.id}
      showBackLink={true}
    />
  )
}

export default EmployeeDetails
