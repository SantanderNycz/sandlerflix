import { z } from "zod";

/** Enum de gêneros — chaves canônicas neutras (rótulos traduzidos no i18n). */
export const GENRES = [
  "comedy",
  "drama",
  "romance",
  "sports",
  "action",
  "fantasy",
  "family",
  "animation",
  "horror",
  "mystery",
  "thriller",
  "western",
  "sci-fi",
  "adventure",
  "musical",
] as const;

export const genreSchema = z.enum(GENRES);
export type Genre = z.infer<typeof genreSchema>;

const translationSchema = z.object({
  title: z.string().min(1),
  synopsis: z.string().min(1),
});

/**
 * Um filme aparece UMA vez. Campos neutros na raiz; campos traduzíveis
 * (título, sinopse) em translations.pt / translations.en.
 */
export const movieSchema = z.object({
  id: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "id deve ser um slug legível (kebab-case)"),
  year: z.number().int().gte(1900).lte(2100),
  runtime: z.number().int().positive().nullable(), // minutos
  rating: z.number().gte(0).lte(5),
  genres: z.array(genreSchema).min(1),
  sandlerRole: z.string().nullable(),
  poster: z.string().startsWith("/"),
  backdrop: z.string().startsWith("/"),
  trailerId: z.string().nullable(), // id do vídeo do YouTube
  translations: z.object({
    pt: translationSchema,
    en: translationSchema,
  }),
});
export type Movie = z.infer<typeof movieSchema>;

export const moviesSchema = z.array(movieSchema).min(1);

/** Uma fileira curada referencia movieIds — sem duplicar dados do filme. */
export const rowSchema = z.object({
  id: z.string().min(1),
  titleKey: z.string().min(1), // chave de tradução do título da fileira
  movieIds: z.array(z.string()).min(1),
});
export type Row = z.infer<typeof rowSchema>;

export const rowsSchema = z.array(rowSchema).min(1);

export type Locale = "pt" | "en";
