import { useTranslations } from 'next-intl'

// Panel-specific translation hooks
export function usePanelTranslations() {
  return useTranslations('panel')
}

export function useDashboardTranslations() {
  return useTranslations('panel.dashboard')
}

export function useOrdersTranslations() {
  return useTranslations('panel.orders')
}

export function useSettingsTranslations() {
  return useTranslations('panel.settings')
}

export function useOrganizationTranslations() {
  return useTranslations('panel.organization')
}

export function usePanelNavigationTranslations() {
  return useTranslations('panel.navigation')
}

export function usePanelCommonTranslations() {
  return useTranslations('panel.common')
}
