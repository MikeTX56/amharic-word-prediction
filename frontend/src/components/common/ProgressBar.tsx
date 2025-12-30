import React from 'react';
import clsx from 'clsx';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  color = 'primary',
  size = 'md',
  showLabel = false,
  className,
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  const colors = {
    primary: 'bg-primary-600',
    secondary: 'bg-secondary-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    danger: 'bg-red-600',
  };

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={className}>
      <div className={clsx('w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden', sizes[size])}>
        <div
          className={clsx('h-full transition-all duration-300 ease-out rounded-full', colors[color])}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 text-right">
          {percentage.toFixed(1)}%
        </p>
      )}
    </div>
  );
};

export default ProgressBar;
