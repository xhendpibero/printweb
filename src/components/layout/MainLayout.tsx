import { MainHeader } from './MainHeader';
import { MainFooter } from './MainFooter';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function MainLayout({ children, className = '' }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      <main className={`flex-1 ${className}`}>
        {children}
      </main>
      <MainFooter />
    </div>
  );
}
