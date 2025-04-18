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
    session: {
        driver: 'cookie',
        options: {
            secret: import.meta.env.SESSION_SECRET || 'una_clave_secreta_muy_larga_y_aleatoria',
            cookie: {
                httpOnly: true,
                path: '/',
                secure: true,
                sameSite: 'none',
                maxAge: 60 * 60 * 24 * 7,
            }
        }
    },
});