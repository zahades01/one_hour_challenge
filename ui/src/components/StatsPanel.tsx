import { Card, CardContent } from '@/components/ui/card';
import type { ScoredItem } from '@/types/item';

interface StatsPanelProps {
  items: ScoredItem[];
}

export function StatsPanel({ items }: StatsPanelProps) {
  if (items.length === 0) return null;

  const avgScore = items.reduce((sum, i) => sum + i.score, 0) / items.length;
  const avgImpact = items.reduce((sum, i) => sum + i.impact, 0) / items.length;
  const avgUrgency = items.reduce((sum, i) => sum + i.urgency, 0) / items.length;
  const avgEffort = items.reduce((sum, i) => sum + i.effort, 0) / items.length;
  const quickWins = items.filter(i => i.impact >= 7 && i.effort <= 3).length;

  return (
    <Card className="glass rounded-xl sm:rounded-2xl overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        <h3 className="font-semibold mb-3 text-sm sm:text-base">Overview</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
          <StatBox label="Avg Score" value={avgScore.toFixed(1)} color="purple" />
          <StatBox label="Avg Impact" value={avgImpact.toFixed(1)} color="blue" />
          <StatBox label="Avg Urgency" value={avgUrgency.toFixed(1)} color="orange" />
          <StatBox label="Avg Effort" value={avgEffort.toFixed(1)} color="emerald" />
          <StatBox label="Quick Wins" value={quickWins.toString()} color="pink" highlight />
        </div>
      </CardContent>
    </Card>
  );
}

function StatBox({ label, value, color, highlight }: { label: string; value: string; color: string; highlight?: boolean }) {
  const colorMap: Record<string, string> = {
    purple: 'text-purple-400',
    blue: 'text-blue-400',
    orange: 'text-orange-400',
    emerald: 'text-emerald-400',
    pink: 'text-pink-400'
  };

  return (
    <div className={`text-center p-2 sm:p-3 rounded-lg ${highlight ? 'bg-pink-500/10 ring-1 ring-pink-500/30' : 'bg-white/5'}`}>
      <div className={`text-lg sm:text-2xl font-bold font-mono ${colorMap[color]}`}>{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
