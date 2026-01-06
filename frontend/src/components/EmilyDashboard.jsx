import React from 'react'
import { useEmilyDashboard } from '../hooks/useEmilyDashboard'
import DesktopDashboard from './DesktopDashboard'
import MobileDashboard from './MobileDashboard'

/**
 * EmilyDashboard - Clean Router Component
 * Splits the rendering into Platform-Specific Views:
 * 1. MobileDashboard (Full-screen, overlay-based)
 * 2. DesktopDashboard (3-column, side-by-side)
 * Uses useEmilyDashboard hook for all shared logic.
 */
function EmilyDashboard() {
  const dashboardData = useEmilyDashboard()

  // Authenticated check handled in hook/router level or here
  if (!dashboardData.user && !dashboardData.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Not Authenticated</h1>
          <p className="text-gray-600">Please log in to access the dashboard.</p>
        </div>
      </div>
    )
  }

  // Choose layout based on real-time screen width detection
  if (dashboardData.isMobileView) {
    return <MobileDashboard {...dashboardData} />
  }

  return <DesktopDashboard {...dashboardData} />
}

export default EmilyDashboard
