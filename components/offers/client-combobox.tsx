import { Check, ChevronsUpDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import type { Client } from '@/types';

interface ClientComboboxProps {
  clients: Client[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function ClientCombobox({ clients, value, onChange, disabled }: ClientComboboxProps) {
  const selectedClient = clients.find((client) => client.id === value);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            'w-full justify-between',
            !value && 'text-muted-foreground'
          )}
          disabled={disabled}
        >
          {selectedClient ? selectedClient.name : 'Select client'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput placeholder="Search clients..." />
          <CommandEmpty>No client found.</CommandEmpty>
          <CommandGroup>
            {clients.map((client) => (
              <CommandItem
                key={client.id}
                onSelect={() => onChange(client.id)}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === client.id ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {client.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
