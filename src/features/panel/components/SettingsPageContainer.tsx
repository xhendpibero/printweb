'use client'

import { useState } from 'react'
import { Save, User, Lock, CreditCard, Mail, Server } from 'lucide-react'
import { useSettingsTranslations } from '@/shared/hooks'
import { SETTINGS_TABS } from '@/shared/constants'

// Mock user settings
const MOCK_USER_SETTINGS = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+48 123 456 789',
  language: 'en' as 'en' | 'pl',
  currency: 'PLN' as 'PLN' | 'EUR',
  timezone: 'Europe/Warsaw',
  notifications: {
    email: true,
    sms: false,
    push: true,
    orderUpdates: true,
    promotions: false,
    newsletter: true
  }
}

const TAB_ICONS = {
  account: User,
  password: Lock,
  transfer: CreditCard,
  marketing: Mail,
  ftp: Server
} as const

export function SettingsPageContainer() {
  const t = useSettingsTranslations()
  const [activeTab, setActiveTab] = useState('account')
  const [settings, setSettings] = useState(MOCK_USER_SETTINGS)
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    // Mock save operation
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    // Show success message
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{t('account.title')}</h3>
              <p className="mt-1 text-sm text-gray-500">
                Update your account information and preferences.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('account.firstName')}
                </label>
                <input
                  type="text"
                  value={settings.firstName}
                  onChange={(e) => setSettings(prev => ({ ...prev, firstName: e.target.value }))}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('account.lastName')}
                </label>
                <input
                  type="text"
                  value={settings.lastName}
                  onChange={(e) => setSettings(prev => ({ ...prev, lastName: e.target.value }))}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('account.email')}
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.value }))}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('account.phone')}
                </label>
                <input
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => setSettings(prev => ({ ...prev, phone: e.target.value }))}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('account.language')}
                </label>
                <select
                  value={settings.language}
                  onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value as 'en' | 'pl' }))}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="en">English</option>
                  <option value="pl">Polski</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('account.currency')}
                </label>
                <select
                  value={settings.currency}
                  onChange={(e) => setSettings(prev => ({ ...prev, currency: e.target.value as 'PLN' | 'EUR' }))}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="PLN">PLN (Polish Złoty)</option>
                  <option value="EUR">EUR (Euro)</option>
                </select>
              </div>
            </div>

            {/* Notification preferences */}
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-4">{t('notifications.title')}</h4>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.notifications.email}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      notifications: {
                        ...prev.notifications,
                        email: e.target.checked
                      }
                    }))}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label className="ml-3 text-sm text-gray-700">
                    {t('notifications.email')}
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.notifications.sms}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      notifications: {
                        ...prev.notifications,
                        sms: e.target.checked
                      }
                    }))}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label className="ml-3 text-sm text-gray-700">
                    {t('notifications.sms')}
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.notifications.push}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      notifications: {
                        ...prev.notifications,
                        push: e.target.checked
                      }
                    }))}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label className="ml-3 text-sm text-gray-700">
                    {t('notifications.push')}
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.notifications.orderUpdates}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      notifications: {
                        ...prev.notifications,
                        orderUpdates: e.target.checked
                      }
                    }))}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label className="ml-3 text-sm text-gray-700">
                    {t('notifications.orderUpdates')}
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.notifications.promotions}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      notifications: {
                        ...prev.notifications,
                        promotions: e.target.checked
                      }
                    }))}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label className="ml-3 text-sm text-gray-700">
                    {t('notifications.promotions')}
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.notifications.newsletter}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      notifications: {
                        ...prev.notifications,
                        newsletter: e.target.checked
                      }
                    }))}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label className="ml-3 text-sm text-gray-700">
                    {t('notifications.newsletter')}
                  </label>
                </div>
              </div>
            </div>
          </div>
        )

      case 'password':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{t('password.title')}</h3>
              <p className="mt-1 text-sm text-gray-500">
                Update your password to keep your account secure.
              </p>
            </div>

            <div className="max-w-md space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('password.currentPassword')}
                </label>
                <input
                  type="password"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('password.newPassword')}
                </label>
                <input
                  type="password"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <p className="mt-1 text-xs text-gray-500">
                  {t('password.requirements')}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('password.confirmPassword')}
                </label>
                <input
                  type="password"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">This section is under development.</p>
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
        <p className="mt-1 text-sm text-gray-500">{t('subtitle')}</p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
          {/* Sidebar */}
          <aside className="py-6 lg:col-span-3">
            <nav className="space-y-1">
              {SETTINGS_TABS.map((tab) => {
                const Icon = TAB_ICONS[tab.id as keyof typeof TAB_ICONS]
                const isActive = activeTab === tab.id

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full text-left ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 border-indigo-500'
                        : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon
                      className={`flex-shrink-0 -ml-1 mr-3 h-5 w-5 ${
                        isActive
                          ? 'text-indigo-500'
                          : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                    />
                    <span className="truncate">{t(`tabs.${tab.id}`)}</span>
                  </button>
                )
              })}
            </nav>
          </aside>

          {/* Main content */}
          <div className="divide-y divide-gray-200 lg:col-span-9">
            <div className="py-6 px-4 sm:p-6 lg:pb-8">
              {renderTabContent()}
            </div>

            {/* Save button */}
            <div className="py-4 px-4 flex justify-end sm:px-6">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {isLoading ? t('account.saving') : t('account.save')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
