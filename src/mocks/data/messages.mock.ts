import type { MessageThread, Message, MessagesFilters } from '@/shared/types'

// Mock message threads data
export const MOCK_MESSAGE_THREADS: MessageThread[] = [
  {
    id: 'thread-001',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-16T14:20:00Z',
    subject: 'Question about order #ORD-2024-001',
    lastMessagePreview: 'Thank you for the clarification. We will process your order with the updated specifications.',
    lastMessageAt: '2024-01-16T14:20:00Z',
    unread: false,
    messages: [
      {
        id: 'msg-001',
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T10:30:00Z',
        subject: 'Question about order #ORD-2024-001',
        content: 'Hello, I have a question about my recent order. Can I change the paper type from standard to premium for my business cards?',
        isRead: true,
        priority: 'normal',
        sender: 'user',
        threadId: 'thread-001',
        orderId: 'order-001'
      },
      {
        id: 'msg-002',
        createdAt: '2024-01-15T15:45:00Z',
        updatedAt: '2024-01-15T15:45:00Z',
        subject: 'Re: Question about order #ORD-2024-001',
        content: 'Hello! Yes, we can change the paper type for your business cards. However, this will affect the price. Premium paper adds 25% to the base cost. Would you like us to proceed with this change?',
        isRead: true,
        priority: 'normal',
        sender: 'support',
        threadId: 'thread-001',
        orderId: 'order-001'
      },
      {
        id: 'msg-003',
        createdAt: '2024-01-16T14:20:00Z',
        updatedAt: '2024-01-16T14:20:00Z',
        subject: 'Re: Question about order #ORD-2024-001',
        content: 'Thank you for the clarification. We will process your order with the updated specifications.',
        isRead: true,
        priority: 'normal',
        sender: 'user',
        threadId: 'thread-001',
        orderId: 'order-001'
      }
    ]
  },
  {
    id: 'thread-002',
    createdAt: '2024-01-18T09:15:00Z',
    updatedAt: '2024-01-18T16:30:00Z',
    subject: 'Delivery delay notification',
    lastMessagePreview: 'We apologize for the delay. Your order will be shipped tomorrow and you will receive tracking information.',
    lastMessageAt: '2024-01-18T16:30:00Z',
    unread: true,
    messages: [
      {
        id: 'msg-004',
        createdAt: '2024-01-18T09:15:00Z',
        updatedAt: '2024-01-18T09:15:00Z',
        subject: 'Delivery delay notification',
        content: 'We want to inform you that your order #ORD-2024-002 will be delayed by 2 business days due to high demand. We apologize for any inconvenience.',
        isRead: false,
        priority: 'high',
        sender: 'system',
        threadId: 'thread-002',
        orderId: 'order-002'
      },
      {
        id: 'msg-005',
        createdAt: '2024-01-18T11:45:00Z',
        updatedAt: '2024-01-18T11:45:00Z',
        subject: 'Re: Delivery delay notification',
        content: 'This is quite inconvenient as I need these materials for a presentation. Is there any way to expedite the process?',
        isRead: true,
        priority: 'high',
        sender: 'user',
        threadId: 'thread-002',
        orderId: 'order-002'
      },
      {
        id: 'msg-006',
        createdAt: '2024-01-18T16:30:00Z',
        updatedAt: '2024-01-18T16:30:00Z',
        subject: 'Re: Delivery delay notification',
        content: 'We apologize for the delay. Your order will be shipped tomorrow and you will receive tracking information.',
        isRead: false,
        priority: 'high',
        sender: 'support',
        threadId: 'thread-002',
        orderId: 'order-002'
      }
    ]
  },
  {
    id: 'thread-003',
    createdAt: '2024-01-20T13:00:00Z',
    updatedAt: '2024-01-20T13:00:00Z',
    subject: 'Welcome to our loyalty program!',
    lastMessagePreview: 'Congratulations! You have been automatically enrolled in our Gold membership tier.',
    lastMessageAt: '2024-01-20T13:00:00Z',
    unread: true,
    messages: [
      {
        id: 'msg-007',
        createdAt: '2024-01-20T13:00:00Z',
        updatedAt: '2024-01-20T13:00:00Z',
        subject: 'Welcome to our loyalty program!',
        content: 'Congratulations! You have been automatically enrolled in our Gold membership tier. You now enjoy 15% discount on all orders and priority support.',
        isRead: false,
        priority: 'low',
        sender: 'system',
        threadId: 'thread-003'
      }
    ]
  },
  {
    id: 'thread-004',
    createdAt: '2024-01-12T08:30:00Z',
    updatedAt: '2024-01-14T17:15:00Z',
    subject: 'File format requirements',
    lastMessagePreview: 'Perfect! Your files are now ready for production. We will start printing tomorrow.',
    lastMessageAt: '2024-01-14T17:15:00Z',
    unread: false,
    messages: [
      {
        id: 'msg-008',
        createdAt: '2024-01-12T08:30:00Z',
        updatedAt: '2024-01-12T08:30:00Z',
        subject: 'File format requirements',
        content: 'Hello, I want to order custom flyers but I\'m not sure about the file format requirements. What formats do you accept?',
        isRead: true,
        priority: 'normal',
        sender: 'user',
        threadId: 'thread-004'
      },
      {
        id: 'msg-009',
        createdAt: '2024-01-12T12:20:00Z',
        updatedAt: '2024-01-12T12:20:00Z',
        subject: 'Re: File format requirements',
        content: 'We accept PDF, AI, EPS, and high-resolution PNG/JPG files. For best results, please provide PDF files with 3mm bleed and CMYK color mode. Resolution should be at least 300 DPI.',
        isRead: true,
        priority: 'normal',
        sender: 'support',
        threadId: 'thread-004'
      },
      {
        id: 'msg-010',
        createdAt: '2024-01-14T15:45:00Z',
        updatedAt: '2024-01-14T15:45:00Z',
        subject: 'Re: File format requirements',
        content: 'Thank you for the information. I have prepared the files according to your specifications. Please check the attached files.',
        isRead: true,
        priority: 'normal',
        sender: 'user',
        threadId: 'thread-004'
      },
      {
        id: 'msg-011',
        createdAt: '2024-01-14T17:15:00Z',
        updatedAt: '2024-01-14T17:15:00Z',
        subject: 'Re: File format requirements',
        content: 'Perfect! Your files are now ready for production. We will start printing tomorrow.',
        isRead: true,
        priority: 'normal',
        sender: 'support',
        threadId: 'thread-004'
      }
    ]
  }
]

// Helper functions
export function filterMessageThreads(threads: MessageThread[], filters: MessagesFilters): MessageThread[] {
  let filtered = [...threads]

  // Filter by unread status
  if (filters.unreadOnly) {
    filtered = filtered.filter(thread => thread.unread)
  }

  // Filter by search term
  if (filters.search?.trim()) {
    const searchTerm = filters.search.toLowerCase()
    filtered = filtered.filter(thread => 
      thread.subject.toLowerCase().includes(searchTerm) ||
      thread.lastMessagePreview.toLowerCase().includes(searchTerm) ||
      thread.messages.some(message => 
        message.content.toLowerCase().includes(searchTerm)
      )
    )
  }

  // Sort by last message date (newest first)
  filtered.sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime())

  // Apply pagination
  const startIndex = ((filters.page || 1) - 1) * (filters.pageSize || 20)
  const endIndex = startIndex + (filters.pageSize || 20)
  
  return filtered.slice(startIndex, endIndex)
}

export function getUnreadCount(threads: MessageThread[]): number {
  return threads.filter(thread => thread.unread).length
}

export function formatMessageDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) {
    return 'Just now'
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`
  } else if (diffInHours < 48) {
    return 'Yesterday'
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    })
  }
}

export function getPriorityColor(priority: Message['priority']): string {
  switch (priority) {
    case 'high':
      return 'text-red-600'
    case 'normal':
      return 'text-gray-600'
    case 'low':
      return 'text-gray-400'
    default:
      return 'text-gray-600'
  }
}

export function getSenderColor(sender: Message['sender']): string {
  switch (sender) {
    case 'system':
      return 'text-blue-600 bg-blue-50'
    case 'support':
      return 'text-green-600 bg-green-50'
    case 'user':
      return 'text-indigo-600 bg-indigo-50'
    default:
      return 'text-gray-600 bg-gray-50'
  }
}
