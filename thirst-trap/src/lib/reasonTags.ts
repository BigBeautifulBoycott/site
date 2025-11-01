export const severityOrder: Record<string, number> = {
  critical: 1,
  high: 2,
  medium: 3,
  low: 4,
  info: 5,
};

export function severityRank(value?: string): number {
  return severityOrder[value || "medium"] || 99;
}
