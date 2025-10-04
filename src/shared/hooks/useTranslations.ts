import { useTranslations } from 'next-intl'

/**
 * Smart i18n hook with fallback support
 * Uses the key as fallback if translation is missing
 */
export function useT(namespace: string) {
  const t = useTranslations(namespace)
  
  return (key: string, fallback?: string): string => {
    try {
      const translation = t(key)
      // If translation returns the key itself, it means it's missing
      if (translation === key && fallback) {
        return fallback
      }
      return translation
    } catch {
      // Return fallback or the key itself as last resort
      return fallback || key.split('.').pop() || key
    }
  }
}

/**
 * Feature-specific hooks for better type safety and autocomplete
 */
export function useCartTranslations() {
  return useT('cart')
}

export function useCheckoutTranslations() {
  return useT('checkout')
}

export function useProductTranslations() {
  return useT('products')
}

export function useCommonTranslations() {
  return useT('common')
}

/**
 * Generic translation hook with namespace detection
 */
export function useFeatureTranslations(feature: 'cart' | 'checkout' | 'products' | 'common') {
  return useT(feature)
}
