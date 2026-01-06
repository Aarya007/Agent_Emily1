import React from 'react'
import SideNavbar from './SideNavbar'
import ATSNChatbot from './ATSNChatbot'
import { PanelLeft, PanelRight, Clock, X } from 'lucide-react'

const DesktopDashboard = (props) => {
  const { 
    isDarkMode, 
    isPanelOpen, 
    setIsPanelOpen, 
    profile, 
    user,
    messageFilter, 
    setMessageFilter,
    overdueLeadsCount,
    overdueLeadsLoading,
    navigate,
    setShowChatHistory,
    showChatHistory,
    conversations,
    fetchAllConversations,
    groupConversationsByDate,
    loadingConversations
  } = props;

  return (
    <div className={`h-screen overflow-hidden relative ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* 1. Sidebar - Fixed */}
      <SideNavbar isDarkMode={isDarkMode} />

      <div className="md:pl-48 xl:pl-64 h-full flex flex-col min-w-0">
        {/* 2. Persistent Header */}
        <header className={`h-16 flex items-center justify-between px-6 border-b z-40 ${
          isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMessageFilter('all')}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  messageFilter === 'all'
                    ? 'bg-gray-600 text-white ring-2 ring-gray-300'
                    : isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button onClick={() => setMessageFilter('emily')} className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300 hover:opacity-80 transition-opacity">
                <img src="/emily_icon.png" alt="Emily" className="w-full h-full object-cover" />
              </button>
              <button onClick={() => setMessageFilter('chase')} className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300 hover:opacity-80 transition-opacity">
                <img src="/chase_logo.png" alt="Chase" className="w-full h-full object-cover" />
              </button>
              <button onClick={() => setMessageFilter('leo')} className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300 hover:opacity-80 transition-opacity">
                <img src="/leo_logo.png" alt="Leo" className="w-full h-full object-cover" />
              </button>
            </div>
            <span className={isDarkMode ? 'text-gray-700' : 'text-gray-300'}>|</span>
            <div className="text-sm font-medium">
              {profile?.business_name || user?.user_metadata?.name || 'Dashboard'}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setShowChatHistory(true)
                if (!conversations.length && user) fetchAllConversations()
              }}
              className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
              title="Chat History"
            >
              <Clock className="w-5 h-5" />
            </button>

            <button 
              onClick={() => setIsPanelOpen(!isPanelOpen)}
              className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              {isPanelOpen ? <PanelLeft className="w-5 h-5 text-gray-600" /> : <PanelRight className="w-5 h-5 text-gray-600" />}
            </button>
          </div>
        </header>

        <main className="flex-1 flex overflow-hidden">
          {/* 3. Fluid Chat Area - Fluid, left-aligned, no width limits */}
          <div className={`flex-1 flex flex-col min-w-0 overflow-hidden relative ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <ATSNChatbot isDarkMode={isDarkMode} messageFilter={messageFilter} />
          </div>

          {/* 4. Right Reminders Panel */}
          <aside className={`transition-all duration-300 ease-in-out border-l flex flex-col ${
            isPanelOpen ? 'w-48 xl:w-64' : 'w-0 overflow-hidden border-none'
          } ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="p-4 border-b border-inherit font-semibold text-lg flex items-center justify-between">
              <span>Reminders</span>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              <div 
                onClick={() => navigate('/leads?filter=overdue_followups')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-gray-50 border-gray-200 hover:bg-gray-100 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-lg font-bold ${overdueLeadsCount > 0 ? 'text-yellow-500' : 'text-gray-400'}`}>
                    {overdueLeadsLoading ? '...' : overdueLeadsCount}
                  </span>
                  <span className="text-sm font-medium">Leads to follow up</span>
                </div>
                {overdueLeadsCount > 0 && (
                  <p className="text-xs text-gray-500 italic">You have overdue follow-ups</p>
                )}
              </div>
            </div>
          </aside>
        </main>
      </div>

      {/* Chat History Panel */}
      {showChatHistory && (
        <div className={`fixed inset-0 z-50 flex justify-end bg-black/20 backdrop-blur-sm`}>
          <div className={`w-96 h-full flex flex-col shadow-2xl ${isDarkMode ? 'bg-gray-900 border-l border-gray-700' : 'bg-white border-l border-gray-200'}`}>
            <div className={`p-4 border-b flex items-center justify-between ${
              isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
            }`}>
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Chat History</h2>
              <button onClick={() => setShowChatHistory(false)} className="p-2 rounded-md hover:bg-gray-200 transition-colors">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {loadingConversations ? (
                <div className="flex items-center justify-center py-8 text-sm text-gray-500">Loading...</div>
              ) : conversations.length === 0 ? (
                <div className="flex items-center justify-center py-8 text-sm text-gray-500">No conversations yet</div>
              ) : (
                <div className="space-y-4">
                  {groupConversationsByDate(conversations).map(({ date, lastConversation }) => {
                    if (!lastConversation) return null
                    const isUser = lastConversation.message_type === 'user'
                    const preview = lastConversation.content?.substring(0, 50) + (lastConversation.content?.length > 50 ? '...' : '')
                    return (
                      <div key={date} className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        isDarkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
                      }`} onClick={() => setShowChatHistory(false)}>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${isUser ? 'bg-pink-400' : 'bg-gradient-to-br from-pink-400 to-purple-500'}`}>
                            {isUser && profile?.logo_url ? <img src={profile.logo_url} className="w-full h-full rounded-full object-cover" alt="U" /> : <span className="text-white font-bold">{isUser ? 'U' : 'E'}</span>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className={`text-sm font-medium ${isUser ? 'text-pink-700' : 'text-purple-700'}`}>{isUser ? 'You' : 'Emily'}</span>
                            </div>
                            <p className="text-sm line-clamp-2">{preview}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DesktopDashboard
