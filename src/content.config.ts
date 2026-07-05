import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { pieceSchema, writingSchema } from './content/schemas';

export { pieceSchema, writingSchema };

export const collections = {
  pieces: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/pieces' }),
    schema: pieceSchema,
  }),
  writing: defineCollection({
    loader: glob({ pattern: '*.md', base: './src/content/writing' }),
    schema: writingSchema,
  }),
};
