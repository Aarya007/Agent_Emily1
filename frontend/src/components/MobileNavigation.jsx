import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { supabase } from '../lib/supabase'
import SettingsMenu from './SettingsMenu'
import {
  Home,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  BarChart3,
  Share2,
  Megaphone,
  BookOpen,
  CreditCard,
  ChevronDown,
  ChevronRight,
  Calendar,
  Plus,
  Sparkles,
  RefreshCw,
  Bell,
  CheckCircle,
  Clock,
  PanelRight,
  UserPlus
} from 'lucide-react'

const MobileNavigation = ({
  handleGenerateContent,
  generating = false,
  fetchingFreshData = false,
  onOpenChatHistory = null,
  showChatHistory = false
}) => {
  const { user, logout } = useAuth()
  const { isDarkMode, setIsDarkMode, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [tasks, setTasks] = useState([])
  const [showTaskNotifications, setShowTaskNotifications] = useState(false)
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState(null)
  const [profileFetched, setProfileFetched] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState({})
  const [isSettingsSliderOpen, setIsSettingsSliderOpen] = useState(false)
  const [settingsSliderTab, setSettingsSliderTab] = useState('profile')

  // Cache key for localStorage
  const getCacheKey = (userId) => `profile_${userId}`

  // Load profile from cache or fetch from API
  const loadProfile = useCallback(async () => {
    try {
      if (!user) return

      const cacheKey = getCacheKey(user.id)
      
      // Try to load from cache first
      const cachedProfile = localStorage.getItem(cacheKey)
      if (cachedProfile) {
        const parsedProfile = JSON.parse(cachedProfile)
        setProfile(parsedProfile)
        setProfileFetched(true)
        return
      }

      // If not in cache, fetch from API
      const { data, error } = await supabase
        .from('profiles')
        .select('logo_url, business_name, name')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        setProfileFetched(true)
        return
      }

      // Cache the profile data
      localStorage.setItem(cacheKey, JSON.stringify(data))
      setProfile(data)
      setProfileFetched(true)
    } catch (error) {
      console.error('Error loading profile:', error)
      setProfileFetched(true)
    }
  }, [user])

  useEffect(() => {
    if (user && !profileFetched) {
      loadProfile()
    }
  }, [user, profileFetched, loadProfile])

  const navigationItems = [
    {
      name: 'Discussions',
      href: '/dashboard',
      icon: Home
    },
    {
      name: 'Content',
      href: '/created-content',
      icon: FileText
    },
    {
      name: 'Happenings',
      href: '/social',
      icon: Share2
    },
    {
      name: 'Leads',
      href: '/leads',
      icon: UserPlus
    },
    {
      name: 'Settings',
      icon: Settings,
      href: '/settings'
    }
  ]

  const handleLogout = () => {
    // Clear profile cache on logout
    if (user) {
      const cacheKey = getCacheKey(user.id)
      localStorage.removeItem(cacheKey)
    }
    logout()
    navigate('/login')
  }

  const isActive = (href) => {
    return location.pathname === href
  }

  const toggleSubmenu = (menuName) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }))
  }

  const isSubmenuActive = (submenuItems) => {
    return submenuItems.some(item => isActive(item.href))
  }

  // Auto-expand submenus when their child pages are active
  useEffect(() => {
    const newExpandedMenus = {}
    navigationItems.forEach(item => {
      if (item.hasSubmenu && item.submenu) {
        const hasActiveChild = item.submenu.some(subItem => isActive(subItem.href))
        if (hasActiveChild) {
          newExpandedMenus[item.name] = true
        }
      }
    })
    setExpandedMenus(prev => ({ ...prev, ...newExpandedMenus }))
  }, [location.pathname])

  const displayName = useMemo(() => {
    return profile?.name || user?.user_metadata?.name || user?.email || 'User'
  }, [profile, user])

  // Handle submenu item clicks
  const handleSubmenuClick = (item) => {
    if (item.action === 'preferences') {
      setSettingsSliderTab('preferences')
      setIsSettingsSliderOpen(true)
      setIsMenuOpen(false)
      return
    }
    if (item.name === 'Connections') {
      setSettingsSliderTab('tools')
      setIsSettingsSliderOpen(true)
      setIsMenuOpen(false)
      return
    }
    if (item.name === 'Billing') {
      setSettingsSliderTab('billing')
      setIsSettingsSliderOpen(true)
      setIsMenuOpen(false)
      return
    }
    if (item.href) {
      navigate(item.href)
    }
    setIsMenuOpen(false)
  }

  // Close menu and notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMenuOpen(false)
      }
      if (showTaskNotifications && !event.target.closest('[data-task-notification-dropdown]')) {
        setShowTaskNotifications(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen, showTaskNotifications])

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  // Close task notifications when route changes
  useEffect(() => {
    setShowTaskNotifications(false)
  }, [location.pathname])

  const formatExecutionTime = (executionTime) => {
    if (!executionTime) return 'Not executed'
    
    const date = new Date(executionTime)
    const now = new Date()
    const diffInMinutes = Math.floor((now - date) / (1000 * 60))
    const diffInHours = Math.floor(diffInMinutes / 60)
    const diffInDays = Math.floor(diffInHours / 24)
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`
    if (diffInHours < 24) return `${diffInHours} hours ago`
    if (diffInDays === 1) return 'Yesterday'
    if (diffInDays < 7) return `${diffInDays} days ago`
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    })
  }

  const handleRefresh = async () => {
    setLoading(true)
    try {
      const authToken = localStorage.getItem('authToken')
      if (!authToken) {
        setLoading(false)
        return
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/social-media/task-executions`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        const mappedTasks = data.tasks.map(task => ({
          ...task,
          icon: Sparkles,
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-200'
        }))
        setTasks(mappedTasks)
      }
    } catch (error) {
      console.error('Error refreshing task executions:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch task executions
  useEffect(() => {
    const fetchTaskExecutions = async () => {
      setLoading(true)
      try {
        const authToken = localStorage.getItem('authToken')
        if (!authToken) {
          // Show fallback data when not authenticated
          setTasks([
            {
              id: 1,
              name: 'Weekly Content Generation',
              description: 'Generated Social Media posts for you this Sunday at 4:00 AM IST',
              status: 'completed',
              executionTime: '2025-09-07T04:11:16.459278+05:30',
              duration: '2m 15s',
              type: 'content_generation',
              icon: Sparkles,
              color: 'text-purple-600',
              bgColor: 'bg-purple-50',
              borderColor: 'border-purple-200',
              frequency: 'Weekly (Sundays at 4:00 AM IST)',
              isActive: true,
              nextRun: 'Next Sunday at 4:00 AM IST'
            }
          ])
          setLoading(false)
          return
        }

        // Get API URL with proper fallback
        const getApiBaseUrl = () => {
          const envUrl = import.meta.env.VITE_API_URL
          if (envUrl) {
            if (envUrl.startsWith(':')) {
              return `http://localhost${envUrl}`
            }
            if (!envUrl.startsWith('http://') && !envUrl.startsWith('https://')) {
              return `http://${envUrl}`
            }
            return envUrl
          }
          return 'http://localhost:8000'
        }
        const API_BASE_URL = getApiBaseUrl()
        const response = await fetch(`${API_BASE_URL}/api/social-media/task-executions`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        })

        if (response.ok) {
          const data = await response.json()
          const mappedTasks = data.tasks.map(task => ({
            ...task,
            icon: Sparkles,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
            borderColor: 'border-purple-200'
          }))
          setTasks(mappedTasks)
        } else {
          // Show fallback data on API error
          setTasks([
            {
              id: 1,
              name: 'Weekly Content Generation',
              description: 'Generated Social Media posts for you this Sunday at 4:00 AM IST',
              status: 'completed',
              executionTime: '2025-09-07T04:11:16.459278+05:30',
              duration: '2m 15s',
              type: 'content_generation',
              icon: Sparkles,
              color: 'text-purple-600',
              bgColor: 'bg-purple-50',
              borderColor: 'border-purple-200',
              frequency: 'Weekly (Sundays at 4:00 AM IST)',
              isActive: true,
              nextRun: 'Next Sunday at 4:00 AM IST'
            }
          ])
        }
      } catch (error) {
        console.error('Error fetching task executions:', error)
        // Show fallback data on error
        setTasks([
          {
            id: 1,
            name: 'Weekly Content Generation',
            description: 'Generated Social Media posts for you this Sunday at 4:00 AM IST',
            status: 'completed',
            executionTime: '2025-09-07T04:11:16.459278+05:30',
            duration: '2m 15s',
            type: 'content_generation',
            icon: Sparkles,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
            borderColor: 'border-purple-200',
            frequency: 'Weekly (Sundays at 4:00 AM IST)',
            isActive: true,
            nextRun: 'Next Sunday at 4:00 AM IST'
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchTaskExecutions()
  }, [])

  return (
    <>
      {/* Mobile Header */}
      <div className={`md:hidden fixed top-0 left-0 right-0 shadow-sm border-b z-40 ${
        isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="px-3 py-2">
          {/* Single Row Layout */}
          <div className="flex items-center justify-between w-full">
            {/* Logo/Brand - Clickable */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center hover:opacity-80 transition-opacity duration-200"
            >
              <div className="text-lg font-semibold bg-gradient-to-r from-pink-600 via-pink-500 to-pink-400 bg-clip-text text-transparent drop-shadow-sm">
                atsn ai
              </div>
            </button>

            {/* Right Side - Action Buttons + Hamburger Menu */}
            <div className="flex items-center space-x-1">
              {/* Chat History Button */}
              {onOpenChatHistory && (
                <button
                  onClick={onOpenChatHistory}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isDarkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                  title="Chat History"
                >
                  <PanelRight className="w-5 h-5" />
                </button>
              )}

              {/* Hamburger Menu */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-1.5 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'hover:bg-gray-800 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Task Notification Dropdown */}
      {showTaskNotifications && (
        <div className="md:hidden fixed top-16 right-4 z-50 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden" data-task-notification-dropdown>
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-white" />
              <h3 className="text-white font-semibold">Task Executions</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="p-1 text-white hover:bg-purple-700 rounded transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={() => setShowTaskNotifications(false)}
                className="p-1 text-white hover:bg-purple-700 rounded transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="w-6 h-6 animate-spin text-gray-500" />
                <span className="ml-2 text-gray-500">Loading tasks...</span>
              </div>
            ) : tasks.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-2">No automated tasks configured</p>
                <p className="text-xs text-gray-400">Tasks will appear here when configured</p>
              </div>
            ) : (
              <div className="p-4 space-y-3">
                {tasks.map((task) => {
                  const Icon = task.icon
                  return (
                    <div key={task.id} className="p-3 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                            <Icon className="w-4 h-4 text-purple-600" />
                          </div>
                          <h4 className="font-medium text-gray-900 text-sm">{task.name}</h4>
                        </div>
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      </div>
                      
                      <p className="text-xs text-gray-600 mb-2">{task.description}</p>
                      
                      <div className="space-y-1">
                        {task.executionTime ? (
                          <>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>Executed:</span>
                              <span className="font-medium">{formatExecutionTime(task.executionTime)}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>Duration:</span>
                              <span className="font-medium">{task.duration || 'N/A'}</span>
                            </div>
                            {task.nextRun && (
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>Next Run:</span>
                                <span className="font-medium text-blue-600">{task.nextRun}</span>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Schedule:</span>
                            <span className="font-medium">{task.frequency || 'Not scheduled'}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Shows recent autonomous task executions and their status
            </p>
          </div>
        </div>
      )}


      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className={`md:hidden fixed inset-0 z-50 backdrop-blur-xl mobile-menu-container ${
          isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'
        }`}>
          <div className="flex flex-col h-full">
            {/* Menu Header */}
            <div className={`p-4 border-b ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full mr-3 overflow-hidden">
                    <img
                      src="/emily_icon.png"
                      alt="Emily"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h1 className={`text-xl font-bold ${
                      isDarkMode ? 'text-gray-100' : 'text-gray-900'
                    }`}>Emily</h1>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>AI Marketing</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className={`p-2 rounded-lg transition-colors ${
                    isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                  }`}
                >
                  <X size={24} className={isDarkMode ? 'text-gray-300' : ''} />
                </button>
              </div>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const active = item.href ? isActive(item.href) : isSubmenuActive(item.submenu || [])
                const isExpanded = expandedMenus[item.name]
                
                // Special handling for Settings to open slider
                if (item.name === 'Settings') {
                  return (
                    <button
                      key={item.name}
                      onClick={() => {
                        setSettingsSliderTab('profile')
                        setIsSettingsSliderOpen(true)
                        setIsMenuOpen(false)
                      }}
                      className={`w-full flex items-center p-4 rounded-lg transition-all duration-200 group ${
                        isDarkMode
                          ? 'text-gray-300 hover:bg-gray-800 hover:text-gray-100'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="w-6 h-6 mr-4" />
                      <div className="flex-1 text-left">
                        <div className="font-medium text-lg">{item.name}</div>
                      </div>
                    </button>
                  )
                }

                if (item.hasSubmenu) {
                  return (
                    <div key={item.name}>
                      <button
                        onClick={() => toggleSubmenu(item.name)}
                        className={`w-full flex items-center p-4 rounded-lg transition-all duration-200 group ${
                          active
                            ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                            : isDarkMode
                            ? 'text-gray-300 hover:bg-gray-800 hover:text-gray-100'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        <Icon className="w-6 h-6 mr-4" />
                        <div className="flex-1 text-left">
                          <div className="font-medium text-lg">{item.name}</div>
                        </div>
                        {isExpanded ? (
                          <ChevronDown className="w-6 h-6" />
                        ) : (
                          <ChevronRight className="w-6 h-6" />
                        )}
                      </button>
                      
                      {/* Submenu */}
                      {isExpanded && item.submenu && (
                        <div className="ml-6 mt-2 space-y-2">
                          {item.submenu.map((subItem) => {
                            const SubIcon = subItem.icon
                            const subActive = isActive(subItem.href)
                            
                            return (
                              <button
                                key={subItem.name}
                                onClick={() => handleSubmenuClick(subItem)}
                                className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 group ${
                                  subActive
                                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                                    : subItem.action === 'preferences'
                                    ? isDarkMode
                                      ? 'text-gray-300 hover:bg-gray-800 hover:text-gray-100'
                                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    : isDarkMode
                                    ? 'text-gray-300 hover:bg-gray-800 hover:text-gray-100'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                }`}
                              >
                                <SubIcon className="w-5 h-5 mr-3" />
                                <div className="flex-1 text-left">
                                  <div className="font-medium">
                                    {subItem.action === 'preferences'
                                      ? `Theme: ${isDarkMode ? 'Dark' : 'Light'}`
                                      : subItem.name
                                    }
                                  </div>
                                </div>
                                {subItem.action === 'preferences' && (
                                  <div className={`w-4 h-4 rounded-full border-2 transition-colors ${
                                    isDarkMode ? 'bg-gray-600 border-gray-400' : 'bg-yellow-400 border-yellow-300'
                                  }`} />
                                )}
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                }
                
                // Regular menu item
                return (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.href)}
                        className={`w-full flex items-center p-4 rounded-lg transition-all duration-200 group ${
                          active
                            ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                            : isDarkMode
                            ? 'text-gray-300 hover:bg-gray-800 hover:text-gray-100'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                  >
                    <Icon className="w-6 h-6 mr-4" />
                    <div className="flex-1 text-left">
                      <div className="font-medium text-lg">{item.name}</div>
                    </div>
                  </button>
                )
              })}
            </nav>

            {/* User Section */}
            <div className={`p-4 border-t ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setSettingsSliderTab('profile')
                    setIsSettingsSliderOpen(true)
                    setIsMenuOpen(false)
                  }}
                  className={`w-full flex items-center p-4 rounded-lg transition-colors group ${
                    isDarkMode
                      ? 'bg-gray-800 hover:bg-gray-700'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4 overflow-hidden">
                    {profile?.logo_url && (
                      <img 
                        src={profile.logo_url} 
                        alt="Profile Logo" 
                        className="w-full h-full object-cover rounded-full"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className={`text-lg font-medium truncate ${
                      isDarkMode ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      {displayName}
                    </p>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Click to view profile</p>
                  </div>
                </button>
                
                <button
                  onClick={handleLogout}
                  className={`w-full flex items-center p-4 rounded-lg transition-colors group ${
                    isDarkMode
                      ? 'text-gray-300 hover:bg-red-900/20 hover:text-red-400'
                      : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
                  }`}
                >
                  <LogOut className="w-6 h-6 mr-4" />
                  <span className="font-medium text-lg">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Slider */}
      <SettingsMenu 
        isOpen={isSettingsSliderOpen} 
        onClose={() => setIsSettingsSliderOpen(false)} 
        initialTab={settingsSliderTab}
      />
    </>
  )
}

export default MobileNavigation