import { defineCollection } from "astro:content";
import { z } from "astro/zod";
// 1. Importas la función glob de los loaders de Astro
import { glob } from "astro/loaders"; 
import type { url } from "astro:schema";

const prendas = defineCollection({
  // 2. Defines el loader apuntando a la carpeta donde tienes los archivos
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/prendas" }),
  
  schema: z.object({
    title: z.string(),
    price : z.int(),
    season : z.string(),
  })
});

// 3. Exportas la colección
export const collections = { prendas };