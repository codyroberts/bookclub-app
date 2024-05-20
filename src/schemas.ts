import { z } from "@builder.io/qwik-city";

export const SearchResultSchema = z.object({
  id: z.string(),
  volumeInfo: z
    .object({
      title: z.string(),
      authors: z.array(z.string()),
      publisher: z.string(),
      publishedDate: z.string(),
      description: z.string(),
      industryIdentifiers: z.array(
        z.object({ type: z.string(), identifier: z.string() }),
      ),
      imageLinks: z
        .object({
          smallThumbnail: z.string(),
          thumbnail: z.string(),
          small: z.string(),
          medium: z.string(),
          large: z.string(),
          extraLarge: z.string(),
        })
        .partial(),
    })
    .partial(),
});

export const SearchQuerySchema = z.object({
  error: z.unknown().optional(),
  items: z.array(SearchResultSchema).optional(),
});
export type Volume = z.infer<typeof SearchResultSchema>["volumeInfo"];
