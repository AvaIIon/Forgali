import { ChevronDown, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ConvertedProduct } from "@/services/shopifyService";
import { useMemo } from "react";

export type SortOption = 'best-selling' | 'newest' | 'price-low' | 'price-high' | 'highest-rated';
export type FilterState = {
  priceRange?: string;
  finish?: string;
  bedSize?: string;
};

interface CategoryFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  products: ConvertedProduct[];
}

const priceRanges = [
  { value: 'under-500', label: 'Under $500' },
  { value: '500-1000', label: '$500 - $1,000' },
  { value: '1000-2000', label: '$1,000 - $2,000' },
  { value: 'over-2000', label: 'Over $2,000' },
];

const bedSizes = ['Twin', 'Full', 'Queen', 'Twin XL'];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'best-selling', label: 'Best Selling' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'highest-rated', label: 'Highest Rated' },
];

export const CategoryFilters = ({ 
  filters, 
  onFilterChange, 
  sortBy, 
  onSortChange,
  products 
}: CategoryFiltersProps) => {
  
  // Get unique finishes from products
  const availableFinishes = useMemo(() => {
    const finishSet = new Set<string>();
    products.forEach(p => {
      p.finishes.forEach(f => finishSet.add(f));
    });
    return Array.from(finishSet).sort();
  }, [products]);

  const handlePriceChange = (value: string) => {
    onFilterChange({ ...filters, priceRange: filters.priceRange === value ? undefined : value });
  };

  const handleFinishChange = (value: string) => {
    onFilterChange({ ...filters, finish: filters.finish === value ? undefined : value });
  };

  const handleBedSizeChange = (value: string) => {
    onFilterChange({ ...filters, bedSize: filters.bedSize === value ? undefined : value });
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  const hasActiveFilters = filters.priceRange || filters.finish || filters.bedSize;
  const currentSortLabel = sortOptions.find(o => o.value === sortBy)?.label || 'Sort by';

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-6 px-4 max-w-7xl mx-auto border-b border-border">
      <div className="flex flex-wrap items-center gap-2">
        {/* Price Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className={`rounded-full px-4 py-2 h-auto text-sm font-normal ${filters.priceRange ? 'bg-[#4A647C] text-white border-[#4A647C]' : ''}`}
            >
              {filters.priceRange ? priceRanges.find(p => p.value === filters.priceRange)?.label : 'Price'}
              <ChevronDown className="w-4 h-4 ml-1.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {priceRanges.map((range) => (
              <DropdownMenuItem 
                key={range.value}
                onClick={() => handlePriceChange(range.value)}
                className={filters.priceRange === range.value ? 'bg-[#4A647C]/10' : ''}
              >
                {range.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Bed Size Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className={`rounded-full px-4 py-2 h-auto text-sm font-normal ${filters.bedSize ? 'bg-[#4A647C] text-white border-[#4A647C]' : ''}`}
            >
              {filters.bedSize || 'Bed Size'}
              <ChevronDown className="w-4 h-4 ml-1.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {bedSizes.map((size) => (
              <DropdownMenuItem 
                key={size}
                onClick={() => handleBedSizeChange(size)}
                className={filters.bedSize === size ? 'bg-[#4A647C]/10' : ''}
              >
                {size}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Finish Filter */}
        {availableFinishes.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className={`rounded-full px-4 py-2 h-auto text-sm font-normal ${filters.finish ? 'bg-[#4A647C] text-white border-[#4A647C]' : ''}`}
              >
                {filters.finish || 'Finish'}
                <ChevronDown className="w-4 h-4 ml-1.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {availableFinishes.map((finish) => (
                <DropdownMenuItem 
                  key={finish}
                  onClick={() => handleFinishChange(finish)}
                  className={filters.finish === finish ? 'bg-[#4A647C]/10' : ''}
                >
                  {finish}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={clearFilters}
            className="rounded-full px-3 py-1 h-auto text-sm text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>
      
      {/* Sort Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-full px-4 py-2 h-auto text-sm font-normal">
            {currentSortLabel}
            <ChevronDown className="w-4 h-4 ml-1.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {sortOptions.map((option) => (
            <DropdownMenuItem 
              key={option.value}
              onClick={() => onSortChange(option.value)}
              className={sortBy === option.value ? 'bg-[#4A647C]/10' : ''}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
