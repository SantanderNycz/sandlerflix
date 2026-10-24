import moviesJson from "@/data/movies.json";
import rowsJson from "@/data/rows.json";
import { moviesSchema, rowsSchema, type Movie, type Row } from "@/types/movie";

/**
 * Valida o JSON local no carregamento e falha com erro claro.
 * A validação roda uma vez na inicialização do módulo.
 */
function parseOrThrow() {
  const movies = moviesSchema.safeParse(moviesJson);
  if (!movies.success) {
    throw new Error(
      "[data] movies.json inválido:\n" +
        JSON.stringify(movies.error.format(), null, 2),
    );
  }

  const rows = rowsSchema.safeParse(rowsJson);
  if (!rows.success) {
    throw new Error(
      "[data] rows.json inválido:\n" +
        JSON.stringify(rows.error.format(), null, 2),
    );
  }

  // Integridade referencial: todo movieId de uma fileira existe em movies.
  const ids = new Set(movies.data.map((m) => m.id));
  const dangling: string[] = [];
  for (const row of rows.data) {
    for (const id of row.movieIds) {
      if (!ids.has(id)) dangling.push(`${row.id} → ${id}`);
    }
  }
  if (dangling.length > 0) {
    throw new Error(
      "[data] rows.json referencia filmes inexistentes:\n" + dangling.join("\n"),
    );
  }

  return { movies: movies.data, rows: rows.data };
}

const { movies, rows } = parseOrThrow();

export const MOVIES: readonly Movie[] = movies;
export const ROWS: readonly Row[] = rows;

const byId = new Map(movies.map((m) => [m.id, m]));

export function getMovie(id: string): Movie | undefined {
  return byId.get(id);
}

/** Resolve os filmes de uma fileira na ordem curada, ignorando ids ausentes. */
export function moviesForRow(row: Row): Movie[] {
  return row.movieIds
    .map((id) => byId.get(id))
    .filter((m): m is Movie => Boolean(m));
}
