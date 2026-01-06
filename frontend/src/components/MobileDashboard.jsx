import React from 'react'
import MobileNavigation from './MobileNavigation'
import ATSNChatbot from './ATSNChatbot'
import { X } from 'lucide-react'

const MobileDashboard = (props) => {
  const { 
    isDarkMode, 
    showChatHistory, 
    setShowChatHistory,
    conversations,
    loadingConversations,
    groupConversationsByDate,
    fetchAllConversations,
    user,
    profile,
    navigate
  } = props;

  return (
    <div className={`h-screen relative flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <MobileNavigation 
        parentIsDarkMode={isDarkMode} 
        onOpenChatHistory={() => {
          setShowChatHistory(true)
          if (!conversations.length && user) fetchAllConversations()
        }}
        showChatHistory={showChatHistory}
      />
      
      {/* Mobile Chat - Full Screen Overlay Flow */}
      <main className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 top-16 z-30 flex flex-col h-[calc(100vh-4rem)]">
          <ATSNChatbot isDarkMode={isDarkMode} />
        </div>
      </main>

      {/* Mobile Chat History Panel */}
      {showChatHistory && (
        <div className={`fixed inset-0 z-50 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="flex flex-col h-full">
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
                      <div key={date} className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors" onClick={() => setShowChatHistory(false)}>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${isUser ? 'bg-pink-400' : 'bg-gradient-to-br from-pink-400 to-purple-500'}`}>
                            {isUser && profile?.logo_url ? <img src={profile.logo_url} className="w-full h-full rounded-full object-cover" alt="U" /> : <span className="text-white font-bold">{isUser ? 'U' : 'E'}</span>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className={`text-sm font-medium ${isUser ? 'text-pink-700' : 'text-purple-700'}`}>{isUser ? 'You' : 'Emily'}</span>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{preview}</p>
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

export default MobileDashboard

