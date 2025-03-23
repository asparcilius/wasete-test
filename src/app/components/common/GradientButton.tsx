import { ButtonHTMLAttributes } from 'react';

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export const GradientButton = ({
  children,
  fullWidth = false,
  icon,
  iconPosition = 'right',
  size = 'md',
  disabled = false,
  className = '',
  ...props
}: GradientButtonProps) => {
  const baseStyles = 'flex items-center justify-center font-medium transition-all rounded-xl';
  
  const sizeStyles = {
    sm: 'px-4 py-2.5 text-sm gap-1.5',
    md: 'px-6 py-3 gap-2',
    lg: 'px-6 py-4 gap-2'
  };

  const gradientStyles = disabled
    ? 'bg-white/5 text-white/40 cursor-not-allowed'
    : 'bg-gradient-to-r from-emerald-400 to-teal-400 text-black hover:from-emerald-500 hover:to-teal-500';

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${gradientStyles} ${widthStyle} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="group-hover:-translate-x-0.5 transition-transform">
          {icon}
        </span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="group-hover:translate-x-0.5 transition-transform">
          {icon}
        </span>
      )}
    </button>
  );
}; 