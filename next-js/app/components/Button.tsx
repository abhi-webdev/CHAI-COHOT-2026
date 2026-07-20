"use client"
import React from 'react'

function Button() {
  return (
    <div>
        <button onClick={() => alert("Button component")}>Click me</button>
    </div>
  )
}

export default Button