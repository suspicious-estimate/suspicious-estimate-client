'use client';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';

type ButtonVariant = 'primary' | 'danger' | 'ghost';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center font-medium transition-colors cursor-pointer disabled:cursor-not-allowed';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300',
  danger: 'border border-red-200 text-red-600 rounded-xl hover:bg-red-50',
  ghost: 'text-blue-600 rounded-lg hover:bg-blue-50',
};

const sizes: Record<ButtonSize, string> = {
  xs: 'px-2 py-1 text-sm',
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-6 py-3 text-sm',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  type = 'button',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
      {...props}
    />
  );
}
