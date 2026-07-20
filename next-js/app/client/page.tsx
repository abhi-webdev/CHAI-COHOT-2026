"use client"

import React, { useEffect, useState } from 'react'

const page = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchedData() {
            const res = await fetch("https://api.freeapi.app/api/v1/public/randomusers?page=1&limit=10")
            const data = await res.json()
            console.log(data)
            setUser(data)
        }

        fetchedData()
    }, [])
  return (
    <div>
        <button onClick={() => alert("Warning")}>click me</button>
    </div>
  )
}

export default page