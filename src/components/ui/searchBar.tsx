import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative mb-8 w-full">
      <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
      <Input
        type="text"
        placeholder="Buscar..."
        className="w-full flex-1 bg-amber-50 pl-10"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
