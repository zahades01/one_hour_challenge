import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ItemFormProps {
  onAdd: (item: { name: string; impact: number; urgency: number; effort: number }) => void;
}

export function ItemForm({ onAdd }: ItemFormProps) {
  const [name, setName] = useState('');
  const [impact, setImpact] = useState(5);
  const [urgency, setUrgency] = useState(5);
  const [effort, setEffort] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAdd({ name: name.trim(), impact, urgency, effort });
    setName('');
    setImpact(5);
    setUrgency(5);
    setEffort(5);
  };

  return (
    <Card className="glass-strong glow-soft rounded-xl sm:rounded-2xl overflow-hidden">
      <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-2">
        <CardTitle className="text-base sm:text-lg">Add New Item</CardTitle>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter item name..."
              className="mt-1 bg-white/5 border-white/10 focus:border-purple-400/50 transition-colors"
            />
          </div>

          <div>
            <label className="text-sm font-medium flex justify-between">
              <span className="text-blue-400">Impact</span>
              <span className="text-muted-foreground font-mono">{impact}/10</span>
            </label>
            <Slider
              value={[impact]}
              onValueChange={([v]) => setImpact(v)}
              min={1}
              max={10}
              step={1}
              className="mt-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium flex justify-between">
              <span className="text-orange-400">Urgency</span>
              <span className="text-muted-foreground font-mono">{urgency}/10</span>
            </label>
            <Slider
              value={[urgency]}
              onValueChange={([v]) => setUrgency(v)}
              min={1}
              max={10}
              step={1}
              className="mt-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium flex justify-between">
              <span className="text-emerald-400">Effort</span>
              <span className="text-muted-foreground font-mono">{effort}/10</span>
            </label>
            <Slider
              value={[effort]}
              onValueChange={([v]) => setEffort(v)}
              min={1}
              max={10}
              step={1}
              className="mt-2"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 transition-all duration-200"
            disabled={!name.trim()}
          >
            Add Item
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
