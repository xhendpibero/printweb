"use client"

import { useState, useEffect } from 'react'
import { Check, X, AlertCircle, Info } from 'lucide-react'

export interface ToastProps {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
  onClose: (id: string) => void
}

export function Toast({ id, type, title, message, duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onClose(id), 300) // Allow fade out animation
    }, duration)

    return () => clearTimeout(timer)
  }, [id, duration, onClose])

  const icons = {
    success: Check,
    error: X,
    warning: AlertCircle,
    info: Info,
  }

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  }

  const iconColors = {
    success: 'text-green-600',
    error: 'text-red-600',
    warning: 'text-yellow-600',
    info: 'text-blue-600',
  }

  const Icon = icons[type]

  return (
    <div
      className={`
        fixed top-4 right-4 z-50 max-w-sm w-full
        transform transition-all duration-300 ease-in-out
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
    >
      <div className={`p-4 rounded-lg border shadow-lg ${colors[type]}`}>
        <div className="flex items-start gap-3">
          <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${iconColors[type]}`} />
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm">{title}</h4>
            {message && (
              <p className="text-sm opacity-90 mt-1">{message}</p>
            )}
          </div>
          <button
            onClick={() => {
              setIsVisible(false)
              setTimeout(() => onClose(id), 300)
            }}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-white/50"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Toast container and hook
interface ToastData {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
}

let toastId = 0
const toastListeners: Set<(toasts: ToastData[]) => void> = new Set()
let toasts: ToastData[] = []

export function addToast(toast: Omit<ToastData, 'id'>) {
  const newToast: ToastData = {
    ...toast,
    id: `toast-${++toastId}`,
  }
  
  toasts = [...toasts, newToast]
  toastListeners.forEach(listener => listener(toasts))
  
  return newToast.id
}

export function removeToast(id: string) {
  toasts = toasts.filter(toast => toast.id !== id)
  toastListeners.forEach(listener => listener(toasts))
}

export function useToasts() {
  const [toastList, setToastList] = useState<ToastData[]>(toasts)

  useEffect(() => {
    toastListeners.add(setToastList)
    return () => {
      toastListeners.delete(setToastList)
    }
  }, [])

  return {
    toasts: toastList,
    addToast,
    removeToast,
  }
}

export function ToastContainer() {
  const { toasts, removeToast } = useToasts()

  return (
    <>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={removeToast}
        />
      ))}
    </>
  )
}
