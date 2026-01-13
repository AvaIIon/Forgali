import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const filters = [
  { label: "Price", options: ["Under $500", "$500 - $1000", "$1000 - $2000", "Over $2000"] },
  { label: "Collection", options: ["Classic", "Modern Farmhouse", "Mid-Century Modern", "Scandinavian"] },
  { label: "Bed Size", options: ["Twin", "Full", "Queen", "Twin XL"] },
  { label: "Color", options: ["White", "Natural", "Espresso", "Grey", "Blue", "Pecan"] },
  { label: "Wood Tone", options: ["White", "Light Wood", "Medium Wood", "Dark Wood"] },
  { label: "Finish", options: ["White", "Natural", "Chestnut", "Pecan", "Walnut", "Driftwood"] },
];

const sortOptions = ["Best Selling", "Newest", "Price: Low to High", "Price: High to Low", "Highest Rated"];

export const CategoryFilters = () => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-6 px-4 max-w-7xl mx-auto border-b border-border">
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((filter) => (
          <DropdownMenu key={filter.label}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-full px-4 py-2 h-auto text-sm font-normal">
                {filter.label}
                <ChevronDown className="w-4 h-4 ml-1.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {filter.options.map((option) => (
                <DropdownMenuItem key={option}>{option}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-full px-4 py-2 h-auto text-sm font-normal">
            Sort by
            <ChevronDown className="w-4 h-4 ml-1.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {sortOptions.map((option) => (
            <DropdownMenuItem key={option}>{option}</DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
