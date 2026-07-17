import React from 'react'

function AvatarCard({avatar, level = "Rookie"}) {
  return (
    <article>
      <div>{avatar.initials}</div>
      <h3>{avatar.name}</h3>
      <p>{avatar.role}</p>
      <p>level: {level}</p>
    </article>
  )
}

export default AvatarCard