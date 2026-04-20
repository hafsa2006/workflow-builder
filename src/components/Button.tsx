import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-[12px] px-6 py-3 text-[15px] font-medium transition-all duration-200 ease-out active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40";
  
  const variants = {
    primary: "bg-[var(--ds-terracotta)] text-[var(--ds-ivory)] shadow-[0_10px_26px_rgba(201,100,66,0.2)] hover:bg-[#b85a3a] hover:shadow-[0_14px_34px_rgba(201,100,66,0.3)] hover:-translate-y-0.5",
    secondary: "bg-[var(--ds-warm-sand)] text-[var(--ds-charcoal)] shadow-[#e8e6dc_0px_0px_0px_0px,var(--ds-ring-warm)_0px_0px_0px_1px] hover:bg-[#dcd9cc] hover:-translate-y-0.5",
    outline: "border border-[var(--ds-border-warm)] text-[var(--app-text)] hover:bg-[var(--ds-border-cream)] hover:-translate-y-0.5"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
