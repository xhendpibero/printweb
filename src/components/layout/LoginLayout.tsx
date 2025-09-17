interface LoginLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function LoginLayout({ children, className = '' }: LoginLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center">
      <div className={`w-full max-w-md ${className}`}>
        {/* Login Header - minimal branding */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600 mb-2">
            Drukarnia Graften
          </h1>
          <p className="text-gray-600">Professional Printing Services</p>
        </div>
        
        {/* Login Content */}
        <main className="bg-white rounded-lg shadow-xl p-8">
          {children}
        </main>
        
        {/* Login Footer */}
        <footer className="text-center mt-8 text-sm text-gray-500">
          © {new Date().getFullYear()} Drukarnia Graften. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
