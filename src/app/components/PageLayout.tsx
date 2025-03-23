interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const PageLayout = ({
  children,
  title,
  subtitle,
  className = ''
}: PageLayoutProps) => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className={`container mx-auto px-4 py-6 sm:py-8 ${className}`}>
        {(title || subtitle) && (
          <div className="text-center mb-8">
            {title && (
              <h1 className="text-3xl sm:text-4xl font-medium tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-base sm:text-lg text-white/60 mt-2">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </main>
  );
}; 