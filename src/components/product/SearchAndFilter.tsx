import { Search, RotateCcw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { CATEGORIES } from '@/data/config';

export function SearchAndFilter() {
  const { state, dispatch } = useApp();

  const handleReset = () => {
    dispatch({ type: 'SET_SEARCH', payload: '' });
    dispatch({ type: 'SET_CATEGORY', payload: 'all' });
    dispatch({ type: 'SET_PRICE_RANGE', payload: [0, 1000] });
  };

  return (
    <div className="bg-card rounded-xl shadow-soft p-6 border border-border">
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="ابحث عن منتج..."
            value={state.searchTerm}
            onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
            className="pr-10"
          />
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-bold text-sm mb-3 text-foreground">الفئات</h4>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(category => (
              <Button
                key={category.id}
                variant={state.selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => dispatch({ type: 'SET_CATEGORY', payload: category.id })}
              >
                <span className="ml-1">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h4 className="font-bold text-sm mb-3 text-foreground">نطاق السعر</h4>
          <div className="flex gap-2 items-center">
            <Input
              type="number"
              placeholder="من"
              value={state.priceRange[0]}
              onChange={(e) => dispatch({
                type: 'SET_PRICE_RANGE',
                payload: [parseInt(e.target.value) || 0, state.priceRange[1]]
              })}
              className="flex-1"
            />
            <span className="text-muted-foreground">-</span>
            <Input
              type="number"
              placeholder="إلى"
              value={state.priceRange[1]}
              onChange={(e) => dispatch({
                type: 'SET_PRICE_RANGE',
                payload: [state.priceRange[0], parseInt(e.target.value) || 1000]
              })}
              className="flex-1"
            />
          </div>
        </div>

        {/* Reset */}
        <Button
          variant="ghost"
          className="w-full"
          onClick={handleReset}
        >
          <RotateCcw />
          إعادة تعيين الفلاتر
        </Button>
      </div>
    </div>
  );
}