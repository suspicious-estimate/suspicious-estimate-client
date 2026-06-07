import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { ProcessCategory, ProcessCategoryInfo, PROCESS_CATEGORIES } from '@/types/timeline';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatCurrency(won: number): string {
  if (won >= 10000) {
    const man = Math.floor(won / 10000);
    const remainder = won % 10000;
    if (remainder === 0) {
      return `${man.toLocaleString()}만원`;
    }
    return `${man.toLocaleString()}만 ${remainder.toLocaleString()}원`;
  }
  return `${won.toLocaleString()}원`;
}

export function formatCurrencyInput(manWon: number): string {
  return `${manWon.toLocaleString()}만원`;
}

export function formatFullCurrency(won: number): string {
  return `${won.toLocaleString()}원`;
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const weekday = weekdays[date.getDay()];
  return `${month}월 ${day}일 ${weekday}`;
}

export function formatDateShort(iso: string): string {
  const date = new Date(iso);
  return `${date.getMonth() + 1}.${date.getDate()}`;
}

export function formatTime(iso: string): string {
  const date = new Date(iso);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours < 12 ? '오전' : '오후';
  const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  return `${period} ${displayHours}:${minutes.toString().padStart(2, '0')}`;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)}GB`;
}

export function getRelativeTime(iso: string): string {
  const now = new Date();
  const date = new Date(iso);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHour = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return '방금 전';
  if (diffMin < 60) return `${diffMin}분 전`;
  if (diffHour < 24) return `${diffHour}시간 전`;
  if (diffDay < 7) return `${diffDay}일 전`;
  return formatDateShort(iso);
}

export function getCategoryInfo(id: ProcessCategory): ProcessCategoryInfo {
  return (
    PROCESS_CATEGORIES.find((c) => c.id === id) || PROCESS_CATEGORIES[PROCESS_CATEGORIES.length - 1]
  );
}

export function getQuotaPercentage(used: number, limit: number): number {
  if (limit === 0) return 0;
  return Math.round((used / limit) * 100);
}

export function getQuotaLevel(percentage: number): 'safe' | 'warn' | 'danger' {
  if (percentage >= 90) return 'danger';
  if (percentage >= 70) return 'warn';
  return 'safe';
}

export function groupTimelineByDate<T extends { occurred_at: string }>(
  items: T[],
): { date: string; items: T[] }[] {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const dateKey = formatDate(item.occurred_at);
    if (!map.has(dateKey)) map.set(dateKey, []);
    map.get(dateKey)!.push(item);
  }
  return Array.from(map.entries()).map(([date, dayItems]) => ({ date, items: dayItems }));
}
