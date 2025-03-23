import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'warning' | 'success' | 'error';
  icon?: ReactNode;
  className?: string;
}

export const Badge = ({
  children,
  variant = 'default',
  icon,
  className = ''
}: BadgeProps) => {
  const baseStyles = 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl backdrop-blur-md text-sm font-medium';

  const variantStyles = {
    default: 'bg-black/50 text-white border border-white/10',
    warning: 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20',
    success: 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20',
    error: 'bg-red-400/10 text-red-400 border border-red-400/20'
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </div>
  );
}; 