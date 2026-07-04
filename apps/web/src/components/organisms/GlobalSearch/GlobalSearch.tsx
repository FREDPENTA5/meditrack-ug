import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pill, Activity, Building2, Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { fetchDrugs } from '@/features/drugs/api';

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { data: drugs } = useQuery({ queryKey: ['drugs'], queryFn: () => fetchDrugs() });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex h-9 w-full max-w-sm items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      >
        <span className="flex items-center gap-2">
          <Search className="h-4 w-4 shrink-0" />
          <span>Search drugs, facilities...</span>
        </span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Pages">
            <CommandItem onSelect={() => runCommand(() => navigate('/'))}>
              <Activity className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => navigate('/stock/entry'))}>
              <Pill className="mr-2 h-4 w-4" />
              <span>Stock Entry</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => navigate('/facilities'))}>
              <Building2 className="mr-2 h-4 w-4" />
              <span>Facilities</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Drugs">
            {drugs?.slice(0, 5).map((drug) => (
              <CommandItem
                key={drug.id}
                onSelect={() => runCommand(() => navigate('/stock/entry'))}
              >
                <Pill className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{drug.name}</span>
                <span className="ml-auto text-xs text-muted-foreground">{drug.category}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
