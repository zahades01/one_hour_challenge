import type { ScoredItem } from '@/types/item';

export const calculatePriority = (impact: number, urgency: number, effort: number): number =>
  impact * 5 + urgency * 3.5 + (11 - effort) * 1.5;

export const compareItems = (a: ScoredItem, b: ScoredItem): number => {
  if (b.score !== a.score) return b.score - a.score;
  if (b.impact !== a.impact) return b.impact - a.impact;
  if (b.urgency !== a.urgency) return b.urgency - a.urgency;
  return a.effort - b.effort;
};

export const calculateBreakdown = (item: ScoredItem) => ({
  impactContrib: Math.round((item.impact * 5 / item.score) * 100),
  urgencyContrib: Math.round((item.urgency * 3.5 / item.score) * 100),
  efficiencyContrib: Math.round(((11 - item.effort) * 1.5 / item.score) * 100)
});

export const getDominantFactor = (breakdown: ReturnType<typeof calculateBreakdown>) => {
  if (breakdown.impactContrib > 55) return 'impact';
  if (breakdown.urgencyContrib > 45) return 'urgency';
  if (breakdown.efficiencyContrib > 25) return 'efficiency';
  return 'balanced';
};

export const generateReasoning = (item: ScoredItem, margin: number): string => {
  const breakdown = calculateBreakdown(item);
  const dominant = getDominantFactor(breakdown);

  const templates: Record<string, string> = {
    impact: `Ranks #1 with ${item.impact >= 8 ? 'transformative' : 'strong'} impact (${item.impact}/10, ${breakdown.impactContrib}% of score). ${item.effort <= 3 ? 'Quick win - ' : ''}Leads by ${margin.toFixed(1)} points.`,
    urgency: `Time-critical: ${item.urgency >= 8 ? 'Critical' : 'High'} urgency (${item.urgency}/10, ${breakdown.urgencyContrib}% of score). Impact ${item.impact}/10 ${item.impact >= 7 ? 'amplifies' : 'supports'} priority.`,
    efficiency: `Best ROI: Strong results (${item.impact}/10) with minimal effort (${item.effort}/10). ${breakdown.efficiencyContrib}% efficiency contribution.`,
    balanced: `Optimal balance: impact ${item.impact}/10, urgency ${item.urgency}/10, effort ${item.effort}/10. Leads by ${margin.toFixed(1)} points.`
  };

  return templates[dominant];
};
