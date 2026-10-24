import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Movie } from "@/types/movie";

interface SelectionValue {
  selected: Movie | null;
  open: (movie: Movie) => void;
  close: () => void;
}

const SelectionContext = createContext<SelectionValue | null>(null);

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<Movie | null>(null);

  const open = useCallback((movie: Movie) => setSelected(movie), []);
  const close = useCallback(() => setSelected(null), []);

  const value = useMemo<SelectionValue>(
    () => ({ selected, open, close }),
    [selected, open, close],
  );

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSelection(): SelectionValue {
  const ctx = useContext(SelectionContext);
  if (!ctx)
    throw new Error("useSelection deve ser usado dentro de <SelectionProvider>");
  return ctx;
}
