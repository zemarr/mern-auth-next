import React from 'react'

const UserProfile = ({ params }: any) => {
    return (
        <div>
            <p className='text-2xl'>Welcome, {params.id}</p>
        </div>
    )
}

export default UserProfile