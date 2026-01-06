import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useNotifications } from '../contexts/NotificationContext'
import { onboardingAPI } from '../services/onboarding'
import { supabase } from '../lib/supabase'

const getDarkModePreference = () => {
  const saved = localStorage.getItem('darkMode')
  if (saved === null) {
    return window.innerWidth < 768
  }
  return saved === 'true'
}

const useStorageListener = (key, callback) => {
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key) {
        callback(e.newValue === 'true')
      }
    }
    window.addEventListener('storage', handleStorageChange)
    const handleCustomChange = (e) => {
      if (e.detail.key === key) {
        callback(e.detail.newValue === 'true')
      }
    }
    window.addEventListener('localStorageChange', handleCustomChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('localStorageChange', handleCustomChange)
    }
  }, [key, callback])
}

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'https://agent-emily.onrender.com').replace(/\/$/, '')

export const useEmilyDashboard = () => {
  const { user, logout } = useAuth()
  const { showSuccess, showError } = useNotifications()
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isPanelOpen, setIsPanelOpen] = useState(true)
  const [conversations, setConversations] = useState([])
  const [loadingConversations, setLoadingConversations] = useState(false)
  const [messageFilter, setMessageFilter] = useState('all')
  const [showChatHistory, setShowChatHistory] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(getDarkModePreference)
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768)
  const [overdueLeadsCount, setOverdueLeadsCount] = useState(0)
  const [overdueLeadsLoading, setOverdueLeadsLoading] = useState(true)
  const hasSetInitialDate = useRef(false)

  useStorageListener('darkMode', setIsDarkMode)

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const fetchOverdueLeadsCount = async () => {
    try {
      setOverdueLeadsLoading(true)
      const leadsAPI = (await import('../services/leads')).leadsAPI
      let allLeads = []
      let offset = 0
      const limit = 100
      while (true) {
        const response = await leadsAPI.getLeads({ limit, offset })
        const leads = response.data || []
        if (leads.length === 0) break
        allLeads = [...allLeads, ...leads]
        offset += limit
        if (offset > 10000) break
      }
      const overdueCount = allLeads.filter(lead => {
        if (!lead.follow_up_at) return false
        const date = new Date(lead.follow_up_at)
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const followUpDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
        const diffInDays = Math.floor((followUpDate - today) / (1000 * 60 * 60 * 24))
        return diffInDays < 0
      }).length
      setOverdueLeadsCount(overdueCount)
    } catch (error) {
      console.error('Error fetching overdue leads count:', error)
      setOverdueLeadsCount(0)
    } finally {
      setOverdueLeadsLoading(false)
    }
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await onboardingAPI.getProfile()
        setProfile(response.data)
      } catch (error) {
        console.error('Error fetching profile:', error)
        setProfile(null)
      } finally {
        setLoading(false)
      }
    }
    if (user) {
      fetchProfile()
    } else {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (isPanelOpen && user) {
      fetchAllConversations()
    }
  }, [isPanelOpen, user])

  useEffect(() => {
    if (user) {
      fetchOverdueLeadsCount()
      const interval = setInterval(fetchOverdueLeadsCount, 5 * 60 * 1000)
      return () => clearInterval(interval)
    }
  }, [user])

  useEffect(() => {
    if (conversations.length > 0 && !hasSetInitialDate.current) {
      hasSetInitialDate.current = true
    }
  }, [conversations])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', isDarkMode.toString())
  }, [isDarkMode])

  const getAuthToken = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    return session?.access_token
  }

  const fetchAllConversations = async () => {
    setLoadingConversations(true)
    try {
      const authToken = await getAuthToken()
      if (!authToken) return
      const response = await fetch(`${API_BASE_URL}/atsn-chatbot/conversations?all=true`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        if (data.success && data.conversations) {
          setConversations(data.conversations)
        }
      }
    } catch (error) {
      console.error('Error fetching conversations:', error)
    } finally {
      setLoadingConversations(false)
    }
  }

  const groupConversationsByDate = (conversations) => {
    const grouped = {}
    const dateMap = {}
    conversations.forEach(conv => {
      const date = new Date(conv.created_at)
      const dateKey = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      if (!grouped[dateKey]) {
        grouped[dateKey] = []
        const dateForSorting = new Date(date)
        dateForSorting.setHours(0, 0, 0, 0)
        dateMap[dateKey] = dateForSorting
      }
      grouped[dateKey].push(conv)
    })
    const sortedDates = Object.keys(grouped).sort((a, b) => dateMap[b] - dateMap[a])
    return sortedDates.map(date => {
      const dateConversations = grouped[date].sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      const lastConversation = dateConversations[dateConversations.length - 1]
      const dateObj = dateMap[date]
      return { date, dateObj, lastConversation, allConversations: dateConversations }
    })
  }

  return {
    user, profile, loading, isPanelOpen, setIsPanelOpen,
    conversations, loadingConversations, messageFilter, setMessageFilter,
    showChatHistory, setShowChatHistory, isDarkMode, setIsDarkMode,
    isMobileView, overdueLeadsCount, overdueLeadsLoading, logout,
    groupConversationsByDate, fetchAllConversations, navigate
  }
}

