import React from 'react'
import { useSelector } from 'react-redux'

const UserProfile = () => {
  
  const userName = useSelector((state)=>state.user.value.name)

  return (
    <div className='px-16 py-12'>
        <p className='text-4xl font-semibold'>Welcome!! {userName}</p>
    </div>
  )
}

export default UserProfile
