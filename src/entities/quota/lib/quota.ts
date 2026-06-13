export function getQuotaPercentage(used: number, limit: number): number {
  if (limit === 0) return 0;
  return Math.round((used / limit) * 100);
}

export function getQuotaLevel(percentage: number): 'safe' | 'warn' | 'danger' {
  if (percentage >= 90) return 'danger';
  if (percentage >= 70) return 'warn';
  return 'safe';
}
