import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = ({
  children,
  variant = 'secondary',
  fullWidth = false,
  icon,
  iconPosition = 'right',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyles = 'flex items-center justify-center font-medium transition-all rounded-xl';
  
  const sizeStyles = {
    sm: 'px-4 py-2.5 text-sm gap-1.5',
    md: 'px-6 py-3 gap-2',
    lg: 'px-6 py-4 gap-2'
  };

  const variantStyles = {
    primary: 'bg-white/5 text-white hover:bg-white/10',
    secondary: 'bg-white/5 text-white/70 hover:bg-white/10'
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
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