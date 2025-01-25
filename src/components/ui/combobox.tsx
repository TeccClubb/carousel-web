"use client";
import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useId,
  useState,
} from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { cn } from "@/lib/utils";
import { Label } from "./label";

type ComboboxContextType = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  value: string;
  onValueChange?: (value: string) => void;
  tickSide?: "left" | "right";
};

const ComboboxContext = createContext<ComboboxContextType>({
  setOpen: () => {},
  value: "",
  onValueChange: () => {},
  tickSide: "right",
});

const useComboboxContext = (componentName: string) => {
  const context = useContext(ComboboxContext);
  if (!context) throw new Error(`${componentName} not wrapped in Combobox`);
  return context;
};

const ComboboxItem: FC<{
  value?: string;
  onSelect?: (value: string) => void;
  className?: string;
  children?: ReactNode;
}> = ({ value = "", className, onSelect, children, ...props }) => {
  const {
    value: currentValue,
    setOpen,
    onValueChange,
    tickSide = "right",
  } = useComboboxContext("ComboboxItem");

  if(onValueChange && onSelect)
    throw new Error("Not use two functions at a time, please select one onValueChange or onSelect");
  return (
    <CommandItem
      value={value}
      className={className}
      {...props}
      onSelect={(value) => {
        setOpen(false);
        if (onSelect) onSelect(value);
        if (onValueChange) onValueChange(value);
      }}
    >

      {tickSide === "left" && (
        <Check
          className={`mr-1 h-4 w-4 opacity-100 ${
            currentValue === value ? "visible" : "invisible"
          }`}
        />
       )}

      <span className="w-full">{children}</span>

      {tickSide === "right" && (
        <Check
          className={`ml-1 h-4 w-4 opacity-100 ${
            currentValue === value ? "visible" : "invisible"
          }`}
        />
      )}
    </CommandItem>
  );
};

const Combobox: FC<{
  label?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  text?: string;
  icon?: ReactNode;
  placeholder?: string;
  emptyMessage?: string;
  tickSide?: "left" | "right";
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: ReactNode;
}> = ({
  label,
  value = "",
  onValueChange,
  text,
  icon,
  placeholder = "Select option...",
  emptyMessage = "No option found.",
  tickSide = "right",
  size = "md",
  className,
  children,
}) => {
  const sizes: { sm: string; md: string; lg: string } = {
    sm: "px-2 py-1 text-sm h-8",
    md: "px-3 py-2 text-base h-9",
    lg: "px-4 py-3 text-lg h-12",
  };
  const [open, setOpen] = useState<boolean>(false);
  const id = useId();
  return (
    <ComboboxContext.Provider
      value={{ setOpen, value, onValueChange, tickSide }}
    >
      {label && <Label htmlFor={id}>{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("w-[120px] justify-between", sizes[size], className)}
          >
            {icon && icon}
            {text ? text : placeholder}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              placeholder={placeholder}
              className={`${sizes[size]}`}
            />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>{children}</CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </ComboboxContext.Provider>
  );
};

export { ComboboxItem, Combobox };

// const Combobox: FC<{
//   options?: ComboboxOption[];
//   value?: string;
//   label?: string;
//   icon?: ReactNode;
//   emptyMessage?: string;
//   placeholder?: string;
//   showDescription?: boolean;
//   tickSide?: "left" | "right";
//   onSelect?: (value: string, object: ComboboxOption) => void;
//   size?: "sm" | "md" | "lg";
//   className?: string;
//   itemClassName?: string;
// }> = ({
//   options = [],
//   value = "",
//   label,
//   icon,
//   emptyMessage = "No option found.",
//   placeholder = "Select Option...",
//   showDescription = false,
//   tickSide = "right",
//   onSelect,
//   size = "md",
//   className,
//   itemClassName,
// }) => {
//   const sizes: { sm: string; md: string; lg: string } = {
//     sm: "px-2 py-1 text-sm h-8",
//     md: "px-3 py-2 text-base h-9",
//     lg: "px-4 py-3 text-lg h-12",
//   };
//   const [open, setOpen] = useState<boolean>(false);
//   const id = useId();
//   return (
//     <>
//       {label && <Label htmlFor={id}>{label}</Label>}
//       <Popover open={open} onOpenChange={setOpen}>
//         <PopoverTrigger asChild>
//           <Button
//             id={id}
//             variant="outline"
//             role="combobox"
//             aria-expanded={open}
//             className={cn("w-[120px] justify-between", sizes[size], className)}
//           >
//             {icon && icon}
//             {value
//               ? showDescription
//                 ? options.find((option) => option.value === value)?.description
//                 : options.find((option) => option.value === value)?.label
//               : placeholder}
//             <ChevronsUpDown className="opacity-50" />
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-[200px] p-0">
//           <Command>
//             <CommandInput placeholder={placeholder} className="h-9" />
//             <CommandList>
//               <CommandEmpty>{emptyMessage}</CommandEmpty>
//               <CommandGroup>
//                 {options.map((option) => (
//                   <CommandItem
//                     key={option.value}
//                     value={option.value}
//                     className={itemClassName}
//                     onSelect={(currentValue) => {
//                       setOpen(false);
//                       if (onSelect) onSelect(currentValue, option);
//                     }}
//                   >
//                     {tickSide === "left" && (
//                       <Check
//                         className={`mr-1 h-4 w-4 opacity-100 ${
//                           value === option.value ? "visible" : "invisible"
//                         }`}
//                       />
//                     )}

//                     {option.icon && option.icon}

//                     <span className="w-full">
//                       {option.label}
//                       {option.description && (
//                         <span className="text-xs text-gray-500">
//                           &nbsp;({option.description})
//                         </span>
//                       )}
//                     </span>

//                     {tickSide === "right" && (
//                       <Check
//                         className={`ml-1 h-4 w-4 opacity-100 ${
//                           value === option.value ? "visible" : "invisible"
//                         }`}
//                       />
//                     )}
//                   </CommandItem>
//                 ))}
//               </CommandGroup>
//             </CommandList>
//           </Command>
//         </PopoverContent>
//       </Popover>
//     </>
//   );
// };
