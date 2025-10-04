'use client'

import { useState } from 'react'
import { Search, MessageSquare, Send, MoreVertical, AlertCircle, CheckCircle2, Clock } from 'lucide-react'
import { useMessagesTranslations } from '@/shared/hooks'
import type { MessageThread, Message, MessagesFilters, SendMessagePayload } from '@/shared/types'
import { 
  MOCK_MESSAGE_THREADS, 
  filterMessageThreads, 
  getUnreadCount,
  formatMessageDate,
  getPriorityColor,
  getSenderColor
} from '@/mocks/data/messages.mock'

export function MessagesPageContainer() {
  const t = useMessagesTranslations()
  
  const [filters, setFilters] = useState<MessagesFilters>({
    search: '',
    page: 1,
    pageSize: 20,
    unreadOnly: false
  })

  const [selectedThread, setSelectedThread] = useState<MessageThread | null>(null)
  const [replyText, setReplyText] = useState('')
  const [isReplying, setIsReplying] = useState(false)
  const [showCompose, setShowCompose] = useState(false)
  const [composeData, setComposeData] = useState({ subject: '', message: '' })

  // Mock filtered threads (in real app, this would be from API)
  const filteredThreads = filterMessageThreads(MOCK_MESSAGE_THREADS, filters)
  const unreadCount = getUnreadCount(MOCK_MESSAGE_THREADS)

  const handleThreadSelect = (thread: MessageThread) => {
    setSelectedThread(thread)
    // Mark thread as read (mock)
    if (thread.unread) {
      console.log('Mark thread as read:', thread.id)
      // TODO: API call to mark as read
    }
  }

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!replyText.trim() || !selectedThread) return

    setIsReplying(true)

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const replyPayload: SendMessagePayload = {
        threadId: selectedThread.id,
        body: replyText
      }

      console.log('Send reply:', replyPayload)
      // TODO: Add reply to thread and refresh
      
      setReplyText('')
    } catch (error) {
      console.error('Failed to send reply:', error)
    } finally {
      setIsReplying(false)
    }
  }

  const handleComposeMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!composeData.subject.trim() || !composeData.message.trim()) return

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const messagePayload: SendMessagePayload = {
        subject: composeData.subject,
        body: composeData.message
      }

      console.log('Send new message:', messagePayload)
      // TODO: Create new thread and refresh
      
      setComposeData({ subject: '', message: '' })
      setShowCompose(false)
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  const getPriorityIcon = (priority: Message['priority']) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case 'normal':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case 'low':
        return <Clock className="h-4 w-4 text-gray-400" />
      default:
        return null
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Page Header */}
      <div className="flex-shrink-0 border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
            <p className="mt-1 text-gray-600">{t('subtitle')}</p>
          </div>
          
          <button
            onClick={() => setShowCompose(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
          >
            <MessageSquare className="h-4 w-4" />
            {t('compose.title')}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Message List */}
        <div className="w-1/3 border-r border-gray-200 bg-white flex flex-col">
          {/* Filters */}
          <div className="flex-shrink-0 p-4 border-b border-gray-200">
            <div className="space-y-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('filters.search')}
                  value={filters.search || ''}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Filter toggles */}
              <div className="flex items-center gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.unreadOnly || false}
                    onChange={(e) => setFilters(prev => ({ ...prev, unreadOnly: e.target.checked }))}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {t('filters.unread')} {unreadCount > 0 && `(${unreadCount})`}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Message Threads List */}
          <div className="flex-1 overflow-y-auto">
            {filteredThreads.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {filteredThreads.map((thread) => (
                  <div
                    key={thread.id}
                    onClick={() => handleThreadSelect(thread)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${
                      selectedThread?.id === thread.id ? 'bg-indigo-50 border-r-2 border-indigo-500' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className={`text-sm font-medium ${thread.unread ? 'text-gray-900' : 'text-gray-600'}`}>
                        {thread.subject}
                      </h4>
                      <div className="flex items-center gap-1">
                        {thread.unread && (
                          <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                        )}
                        <span className="text-xs text-gray-500">
                          {formatMessageDate(thread.lastMessageAt)}
                        </span>
                      </div>
                    </div>
                    
                    <p className={`text-sm ${thread.unread ? 'text-gray-700' : 'text-gray-500'} line-clamp-2`}>
                      {thread.lastMessagePreview}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-400">
                        {thread.messages.length} {t('thread.messages')}
                      </span>
                      {thread.messages.length > 0 && (
                        <div className="flex items-center gap-1">
                          {getPriorityIcon(thread.messages[thread.messages.length - 1].priority)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <MessageSquare className="h-12 w-12 text-gray-300 mb-3" />
                <p>{t('empty')}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Content - Message Thread */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {selectedThread ? (
            <>
              {/* Thread Header */}
              <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">{selectedThread.subject}</h2>
                    <p className="text-sm text-gray-500">
                      {selectedThread.messages.length} messages • {t('thread.lastMessage')} {formatMessageDate(selectedThread.lastMessageAt)}
                    </p>
                  </div>
                  
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {selectedThread.messages.map((message) => (
                  <div key={message.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSenderColor(message.sender)}`}>
                          {t(`sender.${message.sender}`)}
                        </span>
                        {getPriorityIcon(message.priority)}
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatMessageDate(message.createdAt)}
                      </span>
                    </div>
                    
                    <div className="prose prose-sm max-w-none">
                      <p className="text-gray-700 whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Form */}
              <div className="flex-shrink-0 bg-white border-t border-gray-200 p-6">
                <form onSubmit={handleSendReply} className="space-y-3">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={t('thread.replyPlaceholder')}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                    disabled={isReplying}
                  />
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={!replyText.trim() || isReplying}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isReplying ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                          {t('thread.replying')}
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          {t('thread.reply')}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">Select a message</p>
                <p>Choose a conversation from the list to view messages</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-medium text-gray-900">{t('compose.title')}</h3>
              <button
                onClick={() => setShowCompose(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleComposeMessage} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('compose.subject')}
                </label>
                <input
                  type="text"
                  value={composeData.subject}
                  onChange={(e) => setComposeData(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder={t('compose.subjectPlaceholder')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('compose.message')}
                </label>
                <textarea
                  value={composeData.message}
                  onChange={(e) => setComposeData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder={t('compose.messagePlaceholder')}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCompose(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  {t('compose.cancel')}
                </button>
                <button
                  type="submit"
                  disabled={!composeData.subject.trim() || !composeData.message.trim()}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {t('compose.send')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
