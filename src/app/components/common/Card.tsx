interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isSelected?: boolean;
  hoverEffect?: boolean;
}

export const Card = ({
  children,
  className = '',
  onClick,
  isSelected = false,
  hoverEffect = true
}: CardProps) => {
  const baseStyles = 'relative backdrop-blur-xl rounded-2xl transition-all duration-200';
  
  const selectedStyles = isSelected
    ? 'bg-gradient-to-b from-emerald-600/20 to-emerald-600/5 ring-2 ring-emerald-400/50 ring-offset-2 ring-offset-black'
    : 'bg-white/5 border border-white/10';

  const hoverStyles = hoverEffect
    ? 'hover:bg-white/8'
    : '';

  const cursorStyle = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={`${baseStyles} ${selectedStyles} ${hoverStyles} ${cursorStyle} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}; 