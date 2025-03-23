interface GradientHeadingProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const GradientHeading = ({
  children,
  as: Component = 'h1',
  size = 'lg',
  className = ''
}: GradientHeadingProps) => {
  const baseStyles = 'font-medium tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent';
  
  const sizeStyles = {
    sm: 'text-lg sm:text-xl',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-3xl sm:text-4xl'
  };

  return (
    <Component className={`${baseStyles} ${sizeStyles[size]} ${className}`}>
      {children}
    </Component>
  );
}; 