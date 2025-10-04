import { PanelLayout } from '@/features/panel/components'

interface PanelLayoutPageProps {
  children: React.ReactNode
  params: Promise<{
    locale: string
  }>
}

export default async function PanelLayoutPage({ children, params }: PanelLayoutPageProps) {
  const { locale } = await params
  
  return (
    <PanelLayout locale={locale}>
      {children}
    </PanelLayout>
  )
}
