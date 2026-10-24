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
  /** id do layout de origem — garante que o layoutId do poster seja único por trilho. */
  originId: string | null;
  open: (movie: Movie, originId?: string) => void;
  close: () => void;
}

const SelectionContext = createContext<SelectionValue | null>(null);

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<Movie | null>(null);
  const [originId, setOriginId] = useState<string | null>(null);

  const open = useCallback((movie: Movie, origin?: string) => {
    setSelected(movie);
    setOriginId(origin ?? movie.id);
  }, []);

  const close = useCallback(() => {
    setSelected(null);
    setOriginId(null);
  }, []);

  const value = useMemo<SelectionValue>(
    () => ({ selected, originId, open, close }),
    [selected, originId, open, close],
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
