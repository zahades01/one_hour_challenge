import { useState, useMemo, useEffect } from 'react';
import { ItemForm } from '@/components/ItemForm';
import { ItemCard } from '@/components/ItemCard';
import { Navbar } from '@/components/Navbar';
import { StatsPanel } from '@/components/StatsPanel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Item, ScoredItem } from '@/types/item';
import { calculatePriority, compareItems, generateReasoning, calculateBreakdown } from '@/lib/priority';

const STORAGE_KEY = 'priority-scorer-items';

function App() {
  const [items, setItems] = useState<Item[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // Calculate scores and sort
  const sortedItems: ScoredItem[] = useMemo(() => {
    return items
      .map(item => ({
        ...item,
        score: calculatePriority(item.impact, item.urgency, item.effort)
      }))
      .sort(compareItems);
  }, [items]);

  // Get top item and reasoning
  const topItem = sortedItems[0] ?? null;
  const margin = sortedItems.length > 1
    ? sortedItems[0].score - sortedItems[1].score
    : 0;
  const reasoning = topItem ? generateReasoning(topItem, margin) : null;
  const breakdown = topItem ? calculateBreakdown(topItem) : null;

  // CRUD operations
  const addItem = (newItem: Omit<Item, 'id'>) => {
    setItems(prev => [...prev, { ...newItem, id: crypto.randomUUID() }]);
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateItem = (id: string, updates: Partial<Item>) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  return (
    <>
      <Navbar itemCount={items.length} topScore={topItem?.score ?? null} />
      <div className="min-h-screen bg-background bg-gradient-mesh p-4 sm:p-6 md:p-8 lg:p-12 pt-24 sm:pt-28">
        <div className="w-full max-w-[min(100%,640px)] mx-auto space-y-4 sm:space-y-6">

        {/* Add Item Form */}
        <ItemForm onAdd={addItem} />

        {/* Reasoning Panel - Only show if there's a top item */}
        {topItem && reasoning && breakdown && (
          <Card className="glass-primary glow-primary rounded-xl sm:rounded-2xl overflow-hidden">
            <CardHeader className="pb-2 px-4 sm:px-6 pt-4 sm:pt-6">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <span className="text-yellow-400 font-bold">#1</span>
                  <span>Top Priority</span>
                </CardTitle>
                <Badge variant="default" className="text-base sm:text-lg px-2 sm:px-3 py-1 font-mono bg-white/10 backdrop-blur">
                  {topItem.score.toFixed(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              <p className="font-medium text-base sm:text-lg mb-2">{topItem.name}</p>
              <p className="text-muted-foreground text-sm sm:text-base">{reasoning}</p>
              <div className="flex flex-wrap gap-2 sm:gap-4 mt-3 text-xs sm:text-sm">
                <span className="text-blue-400">Impact: {breakdown.impactContrib}%</span>
                <span className="text-orange-400">Urgency: {breakdown.urgencyContrib}%</span>
                <span className="text-emerald-400">Efficiency: {breakdown.efficiencyContrib}%</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Panel */}
        <StatsPanel items={sortedItems} />

        {/* Empty State */}
        {sortedItems.length === 0 && (
          <Card className="glass rounded-xl sm:rounded-2xl">
            <CardContent className="py-8 sm:py-12 text-center text-muted-foreground">
              <p className="text-sm sm:text-base">No items yet. Add your first item above!</p>
            </CardContent>
          </Card>
        )}

        {/* Sorted Items List */}
        {sortedItems.length > 0 && (
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold px-1">
              Ranked Items ({sortedItems.length})
            </h2>
            {sortedItems.map((item, index) => (
              <ItemCard
                key={item.id}
                item={item}
                rank={index + 1}
                onDelete={deleteItem}
                onEdit={updateItem}
              />
            ))}
          </div>
        )}
        </div>
      </div>
    </>
  );
}

export default App;
