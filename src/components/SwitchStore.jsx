import {
  PlusCircle,
  Store as StoreIcon,
  ChevronsUpDown,
  Check,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import useStoreModal from "../hooks/use-store-modal";
import { useState } from "react";

const SwitchStore = ({ items }) => {
  const [open, setOpen] = useState(false);

  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  // eslint-disable-next-line react/prop-types
  const formattItems = items?.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  console.log(formattItems);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a store"
            className="justify-between w-50"
          >
            <StoreIcon className="w-4 h-4 mr-2" />
            Current Store
            <ChevronsUpDown className="w-4 h-4 ml-auto opacity-50 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search stores" />
              <CommandEmpty>No Store found</CommandEmpty>
              <CommandGroup heading="Store">
                <CommandItem>
                  <StoreIcon className="w-4 h-4 mr-2" />
                  스토어이름
                  <Check className="w-4 h-4 ml-auto" />
                </CommandItem>
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    setOpen(false);
                    onOpen();
                  }}
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Create New Store
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default SwitchStore;
