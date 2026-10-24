/**
 * Script de verificação dos dados (npm run data:check).
 * Importar o loader já dispara a validação Zod + integridade referencial.
 */
import { MOVIES, ROWS } from "./loadData";

console.log(`✓ movies.json válido — ${MOVIES.length} filmes`);
console.log(`✓ rows.json válido — ${ROWS.length} fileiras`);
for (const row of ROWS) {
  console.log(`  · ${row.id}: ${row.movieIds.length} filmes`);
}
