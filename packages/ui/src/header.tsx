"use client"
import React from 'react'

export default function Header({height}: {height: number}) {
  return (
      <h1 className={`text-2xl p-3 sm:text-3xl text-white font-semibold `} style={{height: `${height}%`}}>BREEZE - WORLD CHATS</h1>
  )
}
