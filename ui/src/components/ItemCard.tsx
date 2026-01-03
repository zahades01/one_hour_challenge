import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import type { ScoredItem, Item } from '@/types/item';

interface ItemCardProps {
  item: ScoredItem;
  rank: number;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<Item>) => void;
}

function FactorBar({ label, value, color, invert }: { label: string; value: number; color: string; invert?: boolean }) {
  const colorMap: Record<string, { bg: string; fill: string; text: string }> = {
    blue: { bg: 'bg-blue-500/20', fill: 'bg-blue-500', text: 'text-blue-400' },
    orange: { bg: 'bg-orange-500/20', fill: 'bg-orange-500', text: 'text-orange-400' },
    emerald: { bg: 'bg-emerald-500/20', fill: 'bg-emerald-500', text: 'text-emerald-400' }
  };
  const c = colorMap[color];
  const displayValue = invert ? 11 - value : value;

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className={`w-14 ${c.text}`}>{label}</span>
      <div className={`flex-1 h-1.5 ${c.bg} rounded-full overflow-hidden`}>
        <div
          className={`h-full ${c.fill} rounded-full transition-all duration-300`}
          style={{ width: `${(displayValue / 10) * 100}%` }}
        />
      </div>
      <span className="w-6 text-right text-muted-foreground font-mono">{value}</span>
    </div>
  );
}

export function ItemCard({ item, rank, onDelete, onEdit }: ItemCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    impact: item.impact,
    urgency: item.urgency,
    effort: item.effort
  });

  const handleSave = () => {
    onEdit(item.id, editValues);
    setIsEditing(false);
  };

  return (
    <Card className={`glass rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-200 hover:scale-[1.01] ${rank === 1 ? 'ring-2 ring-purple-400/50 glow-primary' : ''}`}>
      <CardHeader className="pb-2 px-4 sm:px-6 pt-4 sm:pt-5">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2 min-w-0">
            <span className={`text-sm sm:text-base font-mono shrink-0 ${rank === 1 ? 'text-purple-400' : 'text-muted-foreground'}`}>
              #{rank}
            </span>
            <span className="truncate">{item.name}</span>
          </CardTitle>
          <Badge
            variant={rank === 1 ? 'default' : 'secondary'}
            className={`text-base sm:text-lg px-2 sm:px-3 py-1 font-mono shrink-0 ${rank === 1 ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0' : 'bg-white/10'}`}
          >
            {item.score.toFixed(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 pb-4 sm:pb-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="flex-1 space-y-2">
            <FactorBar label="Impact" value={item.impact} color="blue" />
            <FactorBar label="Urgency" value={item.urgency} color="orange" />
            <FactorBar label="Effort" value={item.effort} color="emerald" invert />
          </div>
          <div className="flex gap-2 sm:flex-col">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="flex-1 sm:flex-none bg-white/10 hover:bg-white/20"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(item.id)}
              className="flex-1 sm:flex-none bg-red-500/40 hover:bg-red-500/60 text-red-300 border-red-500/50"
            >
              Delete
            </Button>
          </div>
        </div>

        {isEditing && (
          <div className="mt-3 space-y-3 p-3 bg-white/5 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="w-16 text-xs text-blue-400">Impact</span>
              <Slider value={[editValues.impact]} onValueChange={([v]) => setEditValues(prev => ({...prev, impact: v}))} min={1} max={10} step={1} className="flex-1" />
              <span className="w-6 text-xs font-mono">{editValues.impact}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-16 text-xs text-orange-400">Urgency</span>
              <Slider value={[editValues.urgency]} onValueChange={([v]) => setEditValues(prev => ({...prev, urgency: v}))} min={1} max={10} step={1} className="flex-1" />
              <span className="w-6 text-xs font-mono">{editValues.urgency}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-16 text-xs text-emerald-400">Effort</span>
              <Slider value={[editValues.effort]} onValueChange={([v]) => setEditValues(prev => ({...prev, effort: v}))} min={1} max={10} step={1} className="flex-1" />
              <span className="w-6 text-xs font-mono">{editValues.effort}</span>
            </div>
            <Button size="sm" onClick={handleSave} className="w-full bg-purple-500 hover:bg-purple-600">
              Save Changes
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
