"use client"

import React from 'react'
import { Navbar, ProtectedRoute } from '@/components'
import HomePageComponent from '@/components/homePageComponent'

// ------------------------------------

const Home = () => {
  return (
    <>
      <ProtectedRoute>
        <Navbar />
        <HomePageComponent />
      </ProtectedRoute>
    </>
  )
}

export default Home
