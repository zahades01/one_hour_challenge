import { Badge } from '@/components/ui/badge';

interface NavbarProps {
  itemCount: number;
  topScore: number | null;
}

export function Navbar({ itemCount, topScore }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-white/10">
      <div className="max-w-[min(100%,1200px)] mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-purple-400 font-bold text-xl">PS</span>
          <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Priority Scorer
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Badge variant="secondary" className="bg-white/10 text-xs sm:text-sm">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </Badge>
          {topScore !== null && (
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 text-xs sm:text-sm">
              Top: {topScore.toFixed(1)}
            </Badge>
          )}
        </div>
      </div>
    </nav>
  );
}
