import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless'
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    output:'server',
    adapter: vercel(),
    vite: {
        plugins: [tailwindcss()],
    },
    srcDir: './src',
    outDir: './dist',
    base: '/',
    integrations: [react()],
    session: true,
});