'use client';
import type { Icon } from '@phosphor-icons/react/lib';
import { Button } from '@/shared/ui/button';

interface EmptyStateProps {
  icon: Icon;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <Icon size={56} weight="duotone" className="text-blue-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-6 max-w-[240px]">{description}</p>
      {action && <Button onClick={action.onClick}>{action.label}</Button>}
    </div>
  );
}
