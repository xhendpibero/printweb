// import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

// Can be imported from a shared config
export const locales = ['en', 'pl'] as const
export type Locale = typeof locales[number]

export const defaultLocale: Locale = 'en'

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale
  
  // Ensure that a valid locale is used
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale
  }

  // Load feature-based messages with fallbacks
  const loadMessages = async (namespace: string) => {
    try {
      const messages = await import(`../../messages/${locale}/${namespace}.json`)
      return messages.default
    } catch {
      // Fallback to English if translation doesn't exist
      if (locale !== 'en') {
        try {
          const fallback = await import(`../../messages/en/${namespace}.json`)
          return fallback.default
        } catch {
          return {}
        }
      }
      return {}
    }
  }

  // Load legacy main file as fallback for pages not yet migrated
  const loadLegacyMessages = async () => {
    try {
      const legacy = await import(`../../messages/${locale}.json`)
      return legacy.default
    } catch {
      if (locale !== 'en') {
        try {
          const fallback = await import(`../../messages/en.json`)
          return fallback.default
        } catch {
          return {}
        }
      }
      return {}
    }
  }

  const [
    legacy,
    homepage,
    navigation,
    about,
    contact,
    cart,
    checkout,
    products,
    common,
    panel
  ] = await Promise.all([
    loadLegacyMessages(),
    loadMessages('homepage'),
    loadMessages('navigation'),
    loadMessages('about'),
    loadMessages('contact'),
    loadMessages('cart'),
    loadMessages('checkout'),
    loadMessages('products'),
    loadMessages('common'),
    loadMessages('panel')
  ])

  return {
    locale,
    messages: {
      // Feature-based messages (preferred)
      homepage: Object.keys(homepage).length > 0 ? homepage : legacy.homepage,
      navigation: Object.keys(navigation).length > 0 ? navigation : legacy.navigation,
      about: Object.keys(about).length > 0 ? about : legacy.about,
      contact: Object.keys(contact).length > 0 ? contact : legacy.contact,
      cart,
      checkout,
      products,
      common,
      panel,
      // Legacy fallback for any remaining unmigrated content
      ...legacy
    }
  }
})