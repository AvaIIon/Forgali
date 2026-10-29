import { ChevronDown, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/i18n/LocaleContext";
import type { MessageKey } from "@/i18n/messages";
import { ConvertedProduct } from "@/services/shopifyService";
import { useMemo } from "react";

// "Newest" (reversed API order, not recency) and "Highest Rated" (fabricated
// ratings) were removed; "Featured" is honest catalog order.
export type SortOption = 'featured' | 'price-low' | 'price-high';
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
  category?: string;
}

// Labels are dictionary keys (src/i18n/messages.ts); the values are what the
// filters match against, so they stay English.
const priceRanges: { value: string; label: MessageKey }[] = [
  { value: 'under-500', label: 'filter.under500' },
  { value: '500-1000', label: 'filter.500to1000' },
  { value: '1000-2000', label: 'filter.1000to2000' },
  { value: 'over-2000', label: 'filter.over2000' },
];

const bedSizes: { value: string; label: MessageKey }[] = [
  { value: 'Twin', label: 'filter.sizeTwin' },
  { value: 'Full', label: 'filter.sizeFull' },
  { value: 'Queen', label: 'filter.sizeQueen' },
  { value: 'Twin XL', label: 'filter.sizeTwinXl' },
];
// Bed Size only makes sense where products HAVE bed sizes — on Dining/Living
// it guaranteed an empty result for any selection.
const BED_SIZE_CATEGORIES = new Set(['bunk-beds', 'loft-beds', 'single-beds', 'bedroom', 'mattresses']);

const sortOptions: { value: SortOption; label: MessageKey }[] = [
  { value: 'featured', label: 'sort.featured' },
  { value: 'price-low', label: 'sort.priceLow' },
  { value: 'price-high', label: 'sort.priceHigh' },
];

export const CategoryFilters = ({
  filters,
  onFilterChange,
  sortBy,
  onSortChange,
  products,
  category,
}: CategoryFiltersProps) => {
  const { t } = useLocale();

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
  const currentSortLabel = t(sortOptions.find(o => o.value === sortBy)?.label ?? 'filter.sortBy');
  const currentPriceLabel = priceRanges.find(p => p.value === filters.priceRange)?.label;
  const currentBedSizeLabel = bedSizes.find(s => s.value === filters.bedSize)?.label;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-6 px-4 max-w-rail mx-auto border-b border-border">
      <div className="flex flex-wrap items-center gap-2">
        {/* Price Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className={`rounded-full px-4 py-2 h-auto text-sm font-normal ${filters.priceRange ? 'bg-brand text-white border-brand' : ''}`}
            >
              {currentPriceLabel ? t(currentPriceLabel) : t('filter.price')}
              <ChevronDown className="w-4 h-4 ml-1.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {priceRanges.map((range) => (
              <DropdownMenuItem 
                key={range.value}
                onClick={() => handlePriceChange(range.value)}
                className={filters.priceRange === range.value ? 'bg-brand/10' : ''}
              >
                {t(range.label)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Bed Size Filter */}
        {(!category || BED_SIZE_CATEGORIES.has(category)) && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className={`rounded-full px-4 py-2 h-auto text-sm font-normal ${filters.bedSize ? 'bg-brand text-white border-brand' : ''}`}
            >
              {currentBedSizeLabel ? t(currentBedSizeLabel) : t('filter.bedSize')}
              <ChevronDown className="w-4 h-4 ml-1.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {bedSizes.map((size) => (
              <DropdownMenuItem
                key={size.value}
                onClick={() => handleBedSizeChange(size.value)}
                className={filters.bedSize === size.value ? 'bg-brand/10' : ''}
              >
                {t(size.label)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        )}

        {/* Finish Filter */}
        {availableFinishes.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className={`rounded-full px-4 py-2 h-auto text-sm font-normal ${filters.finish ? 'bg-brand text-white border-brand' : ''}`}
              >
                {filters.finish || t('filter.finish')}
                <ChevronDown className="w-4 h-4 ml-1.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {availableFinishes.map((finish) => (
                <DropdownMenuItem 
                  key={finish}
                  onClick={() => handleFinishChange(finish)}
                  className={filters.finish === finish ? 'bg-brand/10' : ''}
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
            {t('filter.clear')}
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
              className={sortBy === option.value ? 'bg-brand/10' : ''}
            >
              {t(option.label)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
