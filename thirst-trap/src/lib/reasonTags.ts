export const severityOrder: Record<string, number> = {
  critical: 1,
  high: 2,
  medium: 3,
  low: 4,
  info: 5,
};

export function severityRank(value?: string): number {
  if (!value) return 99;
  return severityOrder[value.toLowerCase()] ?? 99;
}
